import type { BrowseOrigin } from '@/utils/shop/browse-origin';

export const BACK_LINK_LABEL = 'Back';

export type BrowseBackLink = {
  href: string;
  label: typeof BACK_LINK_LABEL;
  ariaLabel: string;
};

export const resolveCategoryBackLink = (
  browseOrigin: BrowseOrigin | null,
): BrowseBackLink | null => {
  if (!browseOrigin) {
    return null;
  }

  if (browseOrigin.label === 'Home') {
    return { href: '/', label: BACK_LINK_LABEL, ariaLabel: 'Back to Home' };
  }

  if (browseOrigin.label === 'Shop') {
    return {
      href: browseOrigin.href,
      label: BACK_LINK_LABEL,
      ariaLabel: 'Back to Shop',
    };
  }

  return null;
};

export const resolveProductBackLink = (category: string): BrowseBackLink => ({
  href: `/shop/${category}`,
  label: BACK_LINK_LABEL,
  ariaLabel: `Back to ${category}`,
});