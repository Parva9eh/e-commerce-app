import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { normalizePrivateKey } from '@/lib/firebase-admin-env';

export { hasAdminCredentials, normalizePrivateKey } from '@/lib/firebase-admin-env';

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
