import { describe, expect, test } from 'vitest';
import { normalizePrivateKey } from '@/lib/firebase-admin-env';

describe('normalizePrivateKey', () => {
  test('converts escaped newlines and strips wrapping quotes', () => {
    const raw = '"-----BEGIN PRIVATE KEY-----\\nABC\\n-----END PRIVATE KEY-----\\n"';
    expect(normalizePrivateKey(raw)).toBe(
      '-----BEGIN PRIVATE KEY-----\nABC\n-----END PRIVATE KEY-----\n',
    );
  });

  test('returns undefined for empty input', () => {
    expect(normalizePrivateKey(undefined)).toBeUndefined();
    expect(normalizePrivateKey('')).toBeUndefined();
  });
});
