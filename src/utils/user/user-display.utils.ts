import { CurrentUser } from '@/store/user/user.types';

export const getUserLabel = (user: CurrentUser): string => {
  const displayName = user.displayName?.trim();

  if (displayName) {
    return displayName;
  }

  if (user.email) {
    return user.email.split('@')[0];
  }

  return 'Account';
};

export const getUserInitial = (user: CurrentUser): string => {
  const label = getUserLabel(user);
  return label.charAt(0).toUpperCase();
};