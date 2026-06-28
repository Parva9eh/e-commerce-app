import { MARKETING_IMAGES } from '@/lib/marketing-images';

export type DirectoryCategory = {
  id: number;
  title: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
};

export const DIRECTORY_CATEGORIES: DirectoryCategory[] = [
  {
    id: 1,
    title: 'hats',
    imageUrl: MARKETING_IMAGES.hats.src,
    imageAlt: MARKETING_IMAGES.hats.alt,
    href: '/shop/hats',
  },
  {
    id: 2,
    title: 'jackets',
    imageUrl: MARKETING_IMAGES.jackets.src,
    imageAlt: MARKETING_IMAGES.jackets.alt,
    href: '/shop/jackets',
  },
  {
    id: 3,
    title: 'sneakers',
    imageUrl: MARKETING_IMAGES.sneakers.src,
    imageAlt: MARKETING_IMAGES.sneakers.alt,
    href: '/shop/sneakers',
  },
  {
    id: 4,
    title: 'womens',
    imageUrl: MARKETING_IMAGES.womens.src,
    imageAlt: MARKETING_IMAGES.womens.alt,
    href: '/shop/womens',
  },
  {
    id: 5,
    title: 'mens',
    imageUrl: MARKETING_IMAGES.mens.src,
    imageAlt: MARKETING_IMAGES.mens.alt,
    href: '/shop/mens',
  },
];