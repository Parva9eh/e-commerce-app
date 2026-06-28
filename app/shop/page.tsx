import { Suspense } from 'react';
import Shop from '@/routes/shop/shop.component';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Shop',
  description: 'Browse all Crown Clothing categories and collections.',
  path: '/shop',
});

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <Shop />
    </Suspense>
  );
}