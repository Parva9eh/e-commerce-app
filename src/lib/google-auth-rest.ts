import { createSign } from 'crypto';
import { normalizePrivateKey } from '@/lib/firebase-admin-env';

type AccessTokenCache = {
  token: string;
  expiresAt: number;
};

let accessTokenCache: AccessTokenCache | null = null;

const base64Url = (value: string | Buffer): string => {
  const buf = typeof value === 'string' ? Buffer.from(value) : value;
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

/**
 * OAuth2 access token for the service account via JWT bearer grant.
 * Avoids loading the full firebase-admin package on Vercel.
 */
export const getServiceAccountAccessToken = async (
  scopes: string[],
): Promise<string> => {
  const now = Date.now();

  if (accessTokenCache && now < accessTokenCache.expiresAt - 60_000) {
    return accessTokenCache.token;
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (!clientEmail || !privateKey) {
    throw new Error('Firebase Admin credentials are not configured');
  }

  const iat = Math.floor(now / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claimSet = base64Url(
    JSON.stringify({
      iss: clientEmail,
      scope: scopes.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      iat,
      exp: iat + 3600,
    }),
  );

  const unsigned = `${header}.${claimSet}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const signature = base64Url(signer.sign(privateKey));
  const assertion = `${unsigned}.${signature}`;

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    cache: 'no-store',
  });

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !data.access_token) {
    console.error(
      '[api:config] service account token failed',
      data.error,
      data.error_description,
    );
    throw new Error('Firebase Admin credentials are not configured');
  }

  accessTokenCache = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600) * 1000,
  };

  return data.access_token;
};
