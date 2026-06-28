import { describe, expect, test } from 'vitest';
import { parseCartLineInputs } from '@/lib/api/cart-request';

describe('cart request parsing', () => {
  test('parses cart line inputs', () => {
    expect(
      parseCartLineInputs({
        items: [
          { id: 1, quantity: 2 },
          { id: 3, quantity: 1 },
        ],
      }),
    ).toEqual([
      { id: 1, quantity: 2 },
      { id: 3, quantity: 1 },
    ]);
  });

  test('rejects empty carts', () => {
    expect(() => parseCartLineInputs({ items: [] })).toThrow('Cart items are required');
  });
});