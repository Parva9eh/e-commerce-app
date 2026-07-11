import { describe, expect, test } from 'vitest';
import { buildCartFingerprint } from '@/lib/cart-fingerprint';

describe('buildCartFingerprint', () => {
  test('is stable regardless of input order', () => {
    expect(
      buildCartFingerprint([
        { id: 2, quantity: 1 },
        { id: 1, quantity: 3 },
      ]),
    ).toBe(
      buildCartFingerprint([
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ]),
    );
  });

  test('encodes id and quantity pairs', () => {
    expect(
      buildCartFingerprint([
        { id: 1, quantity: 2 },
        { id: 5, quantity: 1 },
      ]),
    ).toBe('1x2,5x1');
  });

  test('differs when quantities differ', () => {
    expect(buildCartFingerprint([{ id: 1, quantity: 1 }])).not.toBe(
      buildCartFingerprint([{ id: 1, quantity: 2 }]),
    );
  });
});
