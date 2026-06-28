import Directory from '@/components/directory/directory.component';
import Hero from '@/components/hero/hero.component';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Home',
  description: 'Discover premium hats, jackets, sneakers, and apparel at Crown Clothing.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Directory />
    </>
  );
}