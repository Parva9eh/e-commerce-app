import { describe, expect, test } from 'vitest';
import { resolveProductBackLinks } from '@/utils/shop/product-navigation';

describe('resolveProductBackLinks', () => {
  test('returns only the category link when referrer is missing', () => {
    expect(resolveProductBackLinks(null, 'hats')).toEqual([
      { href: '/shop/hats', label: 'Back to hats' },
    ]);
  });

  test('returns only the category link when referrer matches the category page', () => {
    expect(resolveProductBackLinks('/shop/hats', 'hats')).toEqual([
      { href: '/shop/hats', label: 'Back to hats' },
    ]);
  });

  test('returns home and category links when referrer is the home page', () => {
    expect(resolveProductBackLinks('/', 'jackets')).toEqual([
      { href: '/', label: 'Back to Home' },
      { href: '/shop/jackets', label: 'Back to jackets' },
    ]);
  });

  test('returns shop and category links when referrer is the shop page', () => {
    expect(resolveProductBackLinks('/shop?search=beanie&category=hats', 'hats')).toEqual([
      { href: '/shop?search=beanie&category=hats', label: 'Back to Shop' },
      { href: '/shop/hats', label: 'Back to hats' },
    ]);
  });
});