import { describe, expect, test } from 'vitest';
import { getUserInitial, getUserLabel } from '@/utils/user/user-display.utils';
import { CurrentUser } from '@/store/user/user.types';

const baseUser: CurrentUser = {
  id: 'user-1',
  displayName: 'Jane Doe',
  email: 'jane@example.com',
  createdAt: new Date('2024-01-01'),
};

describe('user display utils', () => {
  test('getUserLabel prefers display name', () => {
    expect(getUserLabel(baseUser)).toBe('Jane Doe');
  });

  test('getUserLabel falls back to email username', () => {
    expect(getUserLabel({ ...baseUser, displayName: '' })).toBe('jane');
  });

  test('getUserLabel falls back to Account', () => {
    expect(getUserLabel({ ...baseUser, displayName: '', email: '' })).toBe('Account');
  });

  test('getUserInitial returns the first letter of the label', () => {
    expect(getUserInitial(baseUser)).toBe('J');
    expect(getUserInitial({ ...baseUser, displayName: '', email: 'alex@example.com' })).toBe('A');
  });
});