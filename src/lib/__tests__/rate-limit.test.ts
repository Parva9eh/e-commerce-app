import { describe, expect, test } from 'vitest';
import { checkRateLimit } from '@/lib/rate-limit';

describe('rate limit', () => {
  test('allows requests under the limit', () => {
    const key = `test-${Date.now()}-allow`;

    expect(checkRateLimit(key, 2, 60_000).ok).toBe(true);
    expect(checkRateLimit(key, 2, 60_000).ok).toBe(true);
  });

  test('blocks requests above the limit', () => {
    const key = `test-${Date.now()}-block`;

    expect(checkRateLimit(key, 1, 60_000).ok).toBe(true);

    const blocked = checkRateLimit(key, 1, 60_000);

    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});