export const getAuthErrorMessage = (error: Error | null): string | null => {
  if (!error) return null;

  const code = (error as { code?: string }).code;

  switch (code) {
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect password for email';
    case 'auth/user-not-found':
      return 'No user associated with this email';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    default:
      return error.message || 'Authentication failed';
  }
};