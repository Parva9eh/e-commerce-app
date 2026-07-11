import { describe, expect, test } from 'vitest';
import { isClientSafeErrorMessage } from '@/lib/api/http-errors';

describe('isClientSafeErrorMessage', () => {
  test('allows known validation messages', () => {
    expect(isClientSafeErrorMessage('Cart is empty')).toBe(true);
    expect(isClientSafeErrorMessage('Invalid cart line')).toBe(true);
    expect(isClientSafeErrorMessage('Cart does not match payment')).toBe(true);
  });

  test('allows unknown product messages', () => {
    expect(isClientSafeErrorMessage('Unknown product: 42')).toBe(true);
  });

  test('blocks internal/provider error messages', () => {
    expect(isClientSafeErrorMessage('Firebase Admin credentials are not configured')).toBe(
      false,
    );
    expect(isClientSafeErrorMessage('No API key provided')).toBe(false);
  });
});
