import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

/** Normalize private keys pasted into Vercel/hosting env UIs. */
export const normalizePrivateKey = (raw: string | undefined): string | undefined => {
  if (!raw) {
    return undefined;
  }

  let key = raw.trim();

  // Strip wrapping quotes from dashboard copy/paste
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // Vercel often stores PEM newlines as the two-character sequence \n
  key = key.replace(/\\n/g, '\n');

  return key;
};

export const hasAdminCredentials = (): boolean => {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  return Boolean(projectId && clientEmail && privateKey);
};

export const ensureAdminApp = () => {
  if (getApps().length) {
    return;
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin credentials are not configured');
  }

  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
};

export const getAdminFirestore = () => {
  ensureAdminApp();
  return getFirestore();
};

export const getAdminAuth = () => {
  ensureAdminApp();
  return getAuth();
};
