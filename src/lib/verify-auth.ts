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

export const assertOrderUserIdentity = (
  verifiedUser: VerifiedUser | null,
  userId: string | null | undefined,
  userEmail: string | null | undefined,
): string | null => {
  if (!userId) {
    return null;
  }

  if (!verifiedUser || verifiedUser.uid !== userId) {
    return 'Unauthorized order user';
  }

  if (
    userEmail &&
    verifiedUser.email &&
    userEmail.toLowerCase() !== verifiedUser.email.toLowerCase()
  ) {
    return 'Order email does not match signed-in user';
  }

  return null;
};