import { createPublicKey, createVerify } from 'crypto';

export type VerifiedUser = {
  uid: string;
  email?: string;
};

type FirebaseIdTokenPayload = {
  user_id?: string;
  sub?: string;
  email?: string;
  aud?: string;
  iss?: string;
  exp?: number;
  iat?: number;
  auth_time?: number;
};

type GoogleCertCache = {
  certs: Record<string, string>;
  expiresAt: number;
};

let googleCertCache: GoogleCertCache | null = null;

const base64UrlToBuffer = (value: string): Buffer => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + pad, 'base64');
};

const getProjectId = (): string => {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error('Firebase project is not configured');
  }

  return projectId;
};

/**
 * Google public certs for Firebase ID tokens.
 * Avoids Identity Toolkit + restricted browser API keys (which break server-side verify).
 */
const getGoogleSecureTokenCerts = async (): Promise<Record<string, string>> => {
  const now = Date.now();

  if (googleCertCache && now < googleCertCache.expiresAt) {
    return googleCertCache.certs;
  }

  const response = await fetch(
    'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com',
    { cache: 'no-store' },
  );

  if (!response.ok) {
    throw new Error('Invalid authentication token');
  }

  const certs = (await response.json()) as Record<string, string>;
  const cacheControl = response.headers.get('cache-control') ?? '';
  const maxAgeMatch = cacheControl.match(/max-age=(\d+)/i);
  const maxAgeSeconds = maxAgeMatch ? Number(maxAgeMatch[1]) : 3600;

  googleCertCache = {
    certs,
    expiresAt: now + Math.max(60, maxAgeSeconds) * 1000,
  };

  return certs;
};

const verifyFirebaseIdToken = async (token: string): Promise<VerifiedUser> => {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid authentication token');
  }

  const [headerB64, payloadB64, signatureB64] = parts;
  const header = JSON.parse(base64UrlToBuffer(headerB64).toString('utf8')) as {
    alg?: string;
    kid?: string;
  };
  const payload = JSON.parse(
    base64UrlToBuffer(payloadB64).toString('utf8'),
  ) as FirebaseIdTokenPayload;

  if (header.alg !== 'RS256' || !header.kid) {
    throw new Error('Invalid authentication token');
  }

  const projectId = getProjectId();
  const nowSeconds = Math.floor(Date.now() / 1000);

  if (payload.aud !== projectId) {
    throw new Error('Invalid authentication token');
  }

  if (payload.iss !== `https://securetoken.google.com/${projectId}`) {
    throw new Error('Invalid authentication token');
  }

  if (!payload.sub || typeof payload.exp !== 'number' || payload.exp <= nowSeconds) {
    throw new Error('Invalid authentication token');
  }

  if (typeof payload.iat === 'number' && payload.iat > nowSeconds + 60) {
    throw new Error('Invalid authentication token');
  }

  const certs = await getGoogleSecureTokenCerts();
  const x509 = certs[header.kid];

  if (!x509) {
    throw new Error('Invalid authentication token');
  }

  const verifier = createVerify('RSA-SHA256');
  verifier.update(`${headerB64}.${payloadB64}`);
  verifier.end();

  const publicKey = createPublicKey(x509);
  const valid = verifier.verify(publicKey, base64UrlToBuffer(signatureB64));

  if (!valid) {
    throw new Error('Invalid authentication token');
  }

  return {
    uid: payload.sub,
    email: payload.email,
  };
};

/**
 * Verify a Firebase ID token using Google public keys (no API key, no firebase-admin).
 */
export const verifyBearerToken = async (
  authorizationHeader: string | null,
): Promise<VerifiedUser | null> => {
  if (!authorizationHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authorizationHeader.slice('Bearer '.length).trim();

  if (!token) {
    return null;
  }

  return verifyFirebaseIdToken(token);
};

/**
 * Ensures a signed-in order claim matches the verified Firebase token.
 * Guests (no userId) skip identity checks.
 */
export const assertOrderUserIdentity = (
  verifiedUser: VerifiedUser | null,
  userId: string | null | undefined,
): string | null => {
  if (!userId) {
    return null;
  }

  if (!verifiedUser || verifiedUser.uid !== userId) {
    return 'Unauthorized order user';
  }

  return null;
};

/** Prefer verified auth email, then Stripe receipt email. */
export const resolveOrderEmail = (
  verifiedUser: VerifiedUser | null,
  paymentIntentReceiptEmail: string | null | undefined,
): string | null => {
  if (verifiedUser?.email) {
    return verifiedUser.email;
  }

  if (paymentIntentReceiptEmail?.trim()) {
    return paymentIntentReceiptEmail.trim();
  }

  return null;
};
