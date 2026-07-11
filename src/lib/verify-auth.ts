import { getAdminAuth } from '@/lib/firebase-admin';

export type VerifiedUser = {
  uid: string;
  email?: string;
};

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

  const decoded = await getAdminAuth().verifyIdToken(token);

  return {
    uid: decoded.uid,
    email: decoded.email,
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
