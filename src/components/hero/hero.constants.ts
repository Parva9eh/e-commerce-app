import { MARKETING_IMAGES } from '@/lib/marketing-images';

export const HERO_IMAGES = {
  primary: MARKETING_IMAGES.jackets,
  secondary: MARKETING_IMAGES.sneakers,
  accent: MARKETING_IMAGES.hats,
} as const;

export const HERO_CATEGORIES = [
  { label: 'Hats', href: '/shop/hats' },
  { label: 'Jackets', href: '/shop/jackets' },
  { label: 'Sneakers', href: '/shop/sneakers' },
  { label: 'Womens', href: '/shop/womens' },
  { label: 'Mens', href: '/shop/mens' },
] as const;

export const HERO_FEATURES = [
  'Curated seasonal drops',
  'Premium everyday essentials',
  'Thoughtfully sourced materials',
] as const;