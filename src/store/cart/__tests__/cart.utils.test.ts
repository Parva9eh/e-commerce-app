import { describe, expect, test } from 'vitest';
import { MAX_CART_LINE_QTY } from '@/lib/cart-limits';
import { addCartItem } from '@/store/cart/cart.utils';

const product = { id: 1, name: 'Hat', price: 25, imageUrl: '/hat.png' };

describe('addCartItem', () => {
  test('caps quantity at MAX_CART_LINE_QTY', () => {
    let items = [{ ...product, quantity: MAX_CART_LINE_QTY }];
    items = addCartItem(items, product);
    expect(items[0].quantity).toBe(MAX_CART_LINE_QTY);
  });

  test('increments below the cap', () => {
    let items = [{ ...product, quantity: 2 }];
    items = addCartItem(items, product);
    expect(items[0].quantity).toBe(3);
  });
});
