import { buildCurrentPath } from '@/utils/shop/shop-params';

export const BROWSE_ORIGIN_KEY = 'browse-origin';

export type BrowseOrigin = {
  href: string;
  label: 'Home' | 'Shop';
};

export const getBrowseOrigin = (): BrowseOrigin | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = sessionStorage.getItem(BROWSE_ORIGIN_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as BrowseOrigin;
  } catch {
    return null;
  }
};

export const setBrowseOrigin = (origin: BrowseOrigin): void => {
  if (typeof window === 'undefined') {
    return;
  }

  sessionStorage.setItem(BROWSE_ORIGIN_KEY, JSON.stringify(origin));
};

export const trackBrowseOrigin = (
  pathname: string,
  searchParams: URLSearchParams,
): void => {
  if (pathname === '/') {
    setBrowseOrigin({ href: '/', label: 'Home' });
    return;
  }

  if (pathname === '/shop') {
    setBrowseOrigin({
      href: buildCurrentPath(pathname, searchParams),
      label: 'Shop',
    });
  }
};