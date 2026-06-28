export const HERO_IMAGES = {
  primary: {
    src: 'https://i.ibb.co/px2tCc3/jackets.png',
    alt: 'Jackets collection',
  },
  secondary: {
    src: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    alt: 'Sneakers collection',
  },
  accent: {
    src: 'https://i.ibb.co/cvpntL1/hats.png',
    alt: 'Hats collection',
  },
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