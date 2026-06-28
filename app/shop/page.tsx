import CategoriesPreview from '@/routes/categories-preview/categories-preview.component';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Shop',
  description: 'Browse all Crown Clothing categories and collections.',
  path: '/shop',
});

export default function ShopPage() {
  return <CategoriesPreview />;
}