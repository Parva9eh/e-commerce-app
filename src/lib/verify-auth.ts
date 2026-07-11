export type VerifiedUser = {
  uid: string;
  email?: string;
};

/**
 * Verify a Firebase ID token via Identity Toolkit REST (public API key).
 * Does not load firebase-admin — safer on Vercel serverless.
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

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    throw new Error('Firebase Admin credentials are not configured');
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Invalid authentication token');
  }

  const data = (await response.json()) as {
    users?: Array<{ localId?: string; email?: string }>;
  };

  const user = data.users?.[0];

  if (!user?.localId) {
    throw new Error('Invalid authentication token');
  }

  return {
    uid: user.localId,
    email: user.email,
  };
};

/**
 * Ensures a signed-in order claim matches the verified Firebase token.
 * Guests (no userId) skip identity checks; order email is never taken from the client.
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

/** Prefer verified auth email, then Stripe PaymentIntent receipt email — never trust body email. */
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
