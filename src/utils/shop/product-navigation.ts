export type ProductBackLink = {
  href: string;
  label: string;
};

export const resolveProductBackLinks = (
  referrerPath: string | null,
  category: string,
): ProductBackLink[] => {
  const categoryHref = `/shop/${category}`;
  const categoryLink: ProductBackLink = {
    href: categoryHref,
    label: `Back to ${category}`,
  };

  if (!referrerPath) {
    return [categoryLink];
  }

  const [pathname] = referrerPath.split('?');

  if (pathname === categoryHref) {
    return [categoryLink];
  }

  if (pathname === '/') {
    return [
      { href: '/', label: 'Back to Home' },
      categoryLink,
    ];
  }

  if (pathname === '/shop') {
    return [
      { href: referrerPath, label: 'Back to Shop' },
      categoryLink,
    ];
  }

  return [categoryLink];
};