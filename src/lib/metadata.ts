import type { Metadata } from 'next';

const SITE_NAME = 'Crown Clothing';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://e-commerce-crwn-clothing.vercel.app';

export const createPageMetadata = ({
  title,
  description,
  path = '',
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata => ({
  title: `${title} | ${SITE_NAME}`,
  description,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    type: 'website',
  },
});