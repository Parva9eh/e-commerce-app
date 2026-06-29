import { describe, expect, test } from 'vitest';
import {
  resolveCategoryBackLink,
  resolveProductBackLink,
} from '@/utils/shop/browse-navigation';

describe('browse navigation utils', () => {
  test('resolveProductBackLink returns only the category link', () => {
    expect(resolveProductBackLink('hats')).toEqual({
      href: '/shop/hats',
      label: 'Back to hats',
    });
  });

  test('resolveCategoryBackLink returns home when browsing started on home', () => {
    expect(resolveCategoryBackLink({ href: '/', label: 'Home' })).toEqual({
      href: '/',
      label: 'Back to Home',
    });
  });

  test('resolveCategoryBackLink returns shop with filters when browsing started on shop', () => {
    expect(
      resolveCategoryBackLink({
        href: '/shop?search=beanie&category=hats',
        label: 'Shop',
      }),
    ).toEqual({
      href: '/shop?search=beanie&category=hats',
      label: 'Back to Shop',
    });
  });

  test('resolveCategoryBackLink returns null when browse origin is missing', () => {
    expect(resolveCategoryBackLink(null)).toBeNull();
  });
});