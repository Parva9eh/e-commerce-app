type ShopParamKey = 'search' | 'category' | 'sort';

const SHOP_PARAM_DEFAULTS: Partial<Record<ShopParamKey, string>> = {
  category: 'all',
  sort: 'default',
};

export const PRE_SEARCH_PATH_KEY = 'pre-search-path';

export const buildCurrentPath = (pathname: string, searchParams: URLSearchParams): string => {
  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
};

export const getPreSearchPath = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return sessionStorage.getItem(PRE_SEARCH_PATH_KEY);
};

export const setPreSearchPath = (path: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  sessionStorage.setItem(PRE_SEARCH_PATH_KEY, path);
};

export const buildShopPath = (params: URLSearchParams): string => {
  const query = params.toString();
  return query ? `/shop?${query}` : '/shop';
};

export const updateShopParam = (
  currentParams: URLSearchParams,
  key: ShopParamKey,
  value: string
): string => {
  const params = new URLSearchParams(currentParams.toString());
  const defaultValue = SHOP_PARAM_DEFAULTS[key];

  if (!value || (defaultValue !== undefined && value === defaultValue)) {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  return buildShopPath(params);
};