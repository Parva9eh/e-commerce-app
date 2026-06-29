import { describe, expect, test } from 'vitest';
import { resolveProductBackLinks } from '@/utils/shop/product-navigation';

describe('resolveProductBackLinks', () => {
  test('returns only the category link when browse origin is missing', () => {
    expect(resolveProductBackLinks(null, 'hats')).toEqual([
      { href: '/shop/hats', label: 'Back to hats' },
    ]);
  });

  test('returns home and category links when browsing started on home', () => {
    expect(resolveProductBackLinks({ href: '/', label: 'Home' }, 'jackets')).toEqual([
      { href: '/', label: 'Back to Home' },
      { href: '/shop/jackets', label: 'Back to jackets' },
    ]);
  });

  test('returns shop and category links when browsing started on shop', () => {
    expect(
      resolveProductBackLinks(
        { href: '/shop?search=beanie&category=hats', label: 'Shop' },
        'hats',
      ),
    ).toEqual([
      { href: '/shop?search=beanie&category=hats', label: 'Back to Shop' },
      { href: '/shop/hats', label: 'Back to hats' },
    ]);
  });
});