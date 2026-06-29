import { describe, expect, test } from 'vitest';
import { assertOrderUserIdentity } from '@/lib/verify-auth';

describe('assertOrderUserIdentity', () => {
  test('allows guest checkout when userId is missing', () => {
    expect(assertOrderUserIdentity(null, null, null)).toBeNull();
  });

  test('rejects signed-in orders without a verified token', () => {
    expect(assertOrderUserIdentity(null, 'user-1', 'test@example.com')).toBe(
      'Unauthorized order user',
    );
  });

  test('rejects mismatched user ids', () => {
    expect(
      assertOrderUserIdentity(
        { uid: 'user-1', email: 'test@example.com' },
        'user-2',
        'test@example.com',
      ),
    ).toBe('Unauthorized order user');
  });

  test('rejects mismatched emails', () => {
    expect(
      assertOrderUserIdentity(
        { uid: 'user-1', email: 'test@example.com' },
        'user-1',
        'other@example.com',
      ),
    ).toBe('Order email does not match signed-in user');
  });

  test('allows matching signed-in user identity', () => {
    expect(
      assertOrderUserIdentity(
        { uid: 'user-1', email: 'test@example.com' },
        'user-1',
        'test@example.com',
      ),
    ).toBeNull();
  });
});