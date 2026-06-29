import { describe, expect, test } from 'vitest';
import { checkRateLimit } from '@/lib/rate-limit';

describe('rate limit', () => {
  test('allows requests under the limit', () => {
    const key = `test-${Date.now()}-allow`;

    expect(checkRateLimit(key, 2, 60_000)).toMatchObject({
      ok: true,
      limit: 2,
      remaining: 1,
    });
    expect(checkRateLimit(key, 2, 60_000)).toMatchObject({
      ok: true,
      limit: 2,
      remaining: 0,
    });
  });

  test('blocks requests above the limit', () => {
    const key = `test-${Date.now()}-block`;

    expect(checkRateLimit(key, 1, 60_000).ok).toBe(true);

    const blocked = checkRateLimit(key, 1, 60_000);

    expect(blocked.ok).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  test('cleans up expired buckets before evaluating a new request', () => {
    const key = `test-${Date.now()}-cleanup`;

    expect(checkRateLimit(key, 1, 1).ok).toBe(true);
    expect(checkRateLimit(key, 1, 1).ok).toBe(false);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(checkRateLimit(key, 1, 1).ok).toBe(true);
        resolve();
      }, 5);
    });
  });
});