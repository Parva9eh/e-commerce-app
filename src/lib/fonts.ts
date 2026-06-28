import localFont from 'next/font/local';

export const openSansCondensed = localFont({
  src: [
    {
      path: '../../public/fonts/open-sans-condensed-latin-300-normal.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/open-sans-condensed-latin-300-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/open-sans-condensed-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});