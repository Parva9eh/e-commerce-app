import type { BrowseOrigin } from '@/utils/shop/browse-origin';

export type BrowseBackLink = {
  href: string;
  label: string;
};

export const resolveCategoryBackLink = (
  browseOrigin: BrowseOrigin | null,
): BrowseBackLink | null => {
  if (!browseOrigin) {
    return null;
  }

  if (browseOrigin.label === 'Home') {
    return { href: '/', label: 'Back to Home' };
  }

  if (browseOrigin.label === 'Shop') {
    return { href: browseOrigin.href, label: 'Back to Shop' };
  }

  return null;
};

export const resolveProductBackLink = (category: string): BrowseBackLink => ({
  href: `/shop/${category}`,
  label: `Back to ${category}`,
});