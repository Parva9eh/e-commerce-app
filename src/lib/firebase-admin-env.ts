/** Env helpers for Firebase Admin — no firebase-admin package import (safe for light routes). */

/** Normalize private keys pasted into Vercel/hosting env UIs. */
export const normalizePrivateKey = (raw: string | undefined): string | undefined => {
  if (!raw) {
    return undefined;
  }

  let key = raw.trim();

  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

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
