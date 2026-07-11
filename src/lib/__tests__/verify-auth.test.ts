import { describe, expect, test } from 'vitest';
import { assertOrderUserIdentity, resolveOrderEmail } from '@/lib/verify-auth';

describe('assertOrderUserIdentity', () => {
  test('allows guest checkout when userId is missing', () => {
    expect(assertOrderUserIdentity(null, null)).toBeNull();
  });

  test('rejects signed-in orders without a verified token', () => {
    expect(assertOrderUserIdentity(null, 'user-1')).toBe('Unauthorized order user');
  });

  test('rejects mismatched user ids', () => {
    expect(
      assertOrderUserIdentity({ uid: 'user-1', email: 'test@example.com' }, 'user-2'),
    ).toBe('Unauthorized order user');
  });

  test('allows matching signed-in user identity', () => {
    expect(
      assertOrderUserIdentity({ uid: 'user-1', email: 'test@example.com' }, 'user-1'),
    ).toBeNull();
  });
});

describe('resolveOrderEmail', () => {
  test('prefers verified user email', () => {
    expect(
      resolveOrderEmail(
        { uid: 'user-1', email: 'user@example.com' },
        'receipt@example.com',
      ),
    ).toBe('user@example.com');
  });

  test('falls back to Stripe receipt email for guests', () => {
    expect(resolveOrderEmail(null, 'receipt@example.com')).toBe('receipt@example.com');
  });

  test('returns null when no trusted email is available', () => {
    expect(resolveOrderEmail(null, null)).toBeNull();
  });
});
