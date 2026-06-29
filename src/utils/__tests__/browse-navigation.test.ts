import { describe, expect, test } from 'vitest';
import {
  BACK_LINK_LABEL,
  resolveCategoryBackLink,
  resolveProductBackLink,
} from '@/utils/shop/browse-navigation';

describe('browse navigation utils', () => {
  test('resolveProductBackLink returns the category href with a Back label', () => {
    expect(resolveProductBackLink('hats')).toEqual({
      href: '/shop/hats',
      label: BACK_LINK_LABEL,
      ariaLabel: 'Back to hats',
    });
  });

  test('resolveCategoryBackLink returns home when browsing started on home', () => {
    expect(resolveCategoryBackLink({ href: '/', label: 'Home' })).toEqual({
      href: '/',
      label: BACK_LINK_LABEL,
      ariaLabel: 'Back to Home',
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
      label: BACK_LINK_LABEL,
      ariaLabel: 'Back to Shop',
    });
  });

  test('resolveCategoryBackLink returns null when browse origin is missing', () => {
    expect(resolveCategoryBackLink(null)).toBeNull();
  });
});