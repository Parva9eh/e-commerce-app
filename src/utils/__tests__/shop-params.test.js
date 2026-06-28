import {
  buildCurrentPath,
  buildShopPath,
  getPreSearchPath,
  PRE_SEARCH_PATH_KEY,
  setPreSearchPath,
  updateShopParam,
} from '@/utils/shop/shop-params';

describe('shop params utils', () => {
  test('buildShopPath returns /shop when params are empty', () => {
    expect(buildShopPath(new URLSearchParams())).toBe('/shop');
  });

  test('buildShopPath serializes query string', () => {
    const params = new URLSearchParams({ search: 'hat', category: 'hats' });
    expect(buildShopPath(params)).toBe('/shop?search=hat&category=hats');
  });

  test('updateShopParam removes search while preserving other filters', () => {
    const params = new URLSearchParams({ search: 'hat', category: 'hats', sort: 'price-asc' });
    expect(updateShopParam(params, 'search', '')).toBe('/shop?category=hats&sort=price-asc');
  });

  test('updateShopParam removes category when set to default value', () => {
    const params = new URLSearchParams({ category: 'hats', search: 'hat' });
    expect(updateShopParam(params, 'category', 'all')).toBe('/shop?search=hat');
  });

  test('updateShopParam adds search while preserving active filters', () => {
    const params = new URLSearchParams({ category: 'hats', sort: 'price-asc' });
    expect(updateShopParam(params, 'search', 'beanie')).toBe(
      '/shop?category=hats&sort=price-asc&search=beanie'
    );
  });

  test('buildCurrentPath serializes the active route', () => {
    const params = new URLSearchParams({ category: 'hats' });
    expect(buildCurrentPath('/shop', params)).toBe('/shop?category=hats');
    expect(buildCurrentPath('/', new URLSearchParams())).toBe('/');
  });

  test('setPreSearchPath and getPreSearchPath persist the previous page', () => {
    sessionStorage.removeItem(PRE_SEARCH_PATH_KEY);

    setPreSearchPath('/');

    expect(getPreSearchPath()).toBe('/');
    sessionStorage.removeItem(PRE_SEARCH_PATH_KEY);
  });
});