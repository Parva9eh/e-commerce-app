import { afterEach, describe, expect, test } from 'vitest';
import {
  BROWSE_ORIGIN_KEY,
  getBrowseOrigin,
  setBrowseOrigin,
  trackBrowseOrigin,
} from '@/utils/shop/browse-origin';

describe('browse origin utils', () => {
  afterEach(() => {
    sessionStorage.removeItem(BROWSE_ORIGIN_KEY);
  });

  test('trackBrowseOrigin stores home when pathname is /', () => {
    trackBrowseOrigin('/', new URLSearchParams());

    expect(getBrowseOrigin()).toEqual({ href: '/', label: 'Home' });
  });

  test('trackBrowseOrigin stores shop path with active filters', () => {
    trackBrowseOrigin('/shop', new URLSearchParams({ search: 'hat', category: 'hats' }));

    expect(getBrowseOrigin()).toEqual({
      href: '/shop?search=hat&category=hats',
      label: 'Shop',
    });
  });

  test('trackBrowseOrigin does not overwrite home when visiting a category page', () => {
    setBrowseOrigin({ href: '/', label: 'Home' });

    trackBrowseOrigin('/shop/jackets', new URLSearchParams());

    expect(getBrowseOrigin()).toEqual({ href: '/', label: 'Home' });
  });
});