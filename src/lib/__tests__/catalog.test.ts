import { describe, expect, test } from 'vitest';
import {
  buildCatalogIndex,
  validateAndPriceCartLines,
} from '@/lib/catalog';
import { Category } from '@/store/categories/category.types';

const mockCategories: Category[] = [
  {
    title: 'Hats',
    imagUrl: '/images/hats.png',
    items: [
      { id: 1, name: 'Brown Hat', price: 25, imageUrl: '/hat.png' },
      { id: 2, name: 'Blue Hat', price: 18.5, imageUrl: '/hat-2.png' },
    ],
  },
];

describe('catalog validation', () => {
  test('buildCatalogIndex indexes products by id', () => {
    const index = buildCatalogIndex(mockCategories);

    expect(index.get(1)?.name).toBe('Brown Hat');
    expect(index.get(2)?.price).toBe(18.5);
  });

  test('validateAndPriceCartLines computes totals from catalog prices', () => {
    const result = validateAndPriceCartLines(
      [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
      ],
      buildCatalogIndex(mockCategories),
    );

    expect(result.totalCents).toBe(6850);
    expect(result.totalDollars).toBe(68.5);
    expect(result.items).toHaveLength(2);
    expect(result.items[0]).toMatchObject({ id: 1, quantity: 2, price: 25 });
  });

  test('validateAndPriceCartLines rejects unknown products', () => {
    expect(() =>
      validateAndPriceCartLines(
        [{ id: 999, quantity: 1 }],
        buildCatalogIndex(mockCategories),
      ),
    ).toThrow('Unknown product');
  });

  test('validateAndPriceCartLines rejects tampered quantities', () => {
    expect(() =>
      validateAndPriceCartLines(
        [{ id: 1, quantity: 0 }],
        buildCatalogIndex(mockCategories),
      ),
    ).toThrow('Invalid cart line');
  });

  test('validateAndPriceCartLines rejects totals below Stripe minimum', () => {
    expect(() =>
      validateAndPriceCartLines(
        [{ id: 10, quantity: 1 }],
        buildCatalogIndex([
          {
            title: 'Cheap',
            imagUrl: '/cheap.png',
            items: [{ id: 10, name: 'Sticker', price: 0.25, imageUrl: '/sticker.png' }],
          },
        ]),
      ),
    ).toThrow('below the minimum');
  });
});