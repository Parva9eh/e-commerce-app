import type { BrowseOrigin } from '@/utils/shop/browse-origin';

export type ProductBackLink = {
  href: string;
  label: string;
};

export const resolveProductBackLinks = (
  browseOrigin: BrowseOrigin | null,
  category: string,
): ProductBackLink[] => {
  const categoryHref = `/shop/${category}`;
  const categoryLink: ProductBackLink = {
    href: categoryHref,
    label: `Back to ${category}`,
  };

  if (!browseOrigin) {
    return [categoryLink];
  }

  if (browseOrigin.label === 'Home') {
    return [
      { href: '/', label: 'Back to Home' },
      categoryLink,
    ];
  }

  if (browseOrigin.label === 'Shop') {
    return [
      { href: browseOrigin.href, label: 'Back to Shop' },
      categoryLink,
    ];
  }

  return [categoryLink];
};