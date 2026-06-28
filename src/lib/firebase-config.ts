// Use static process.env access so Next.js can inline NEXT_PUBLIC_* in the client bundle.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
};

const envKeys = {
  apiKey: 'NEXT_PUBLIC_FIREBASE_API_KEY',
  authDomain: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  projectId: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  storageBucket: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'NEXT_PUBLIC_FIREBASE_APP_ID',
} as const;

export const getFirebaseConfig = () => {
  const missing = (Object.keys(envKeys) as Array<keyof typeof envKeys>).filter(
    (configKey) => !firebaseConfig[configKey]
  );

  if (missing.length > 0) {
    const missingEnvVars = missing.map((configKey) => envKeys[configKey]);

    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}. ` +
        'Copy .env.example to .env, add your Firebase values, and restart the dev server.'
    );
  }

  return firebaseConfig;
};