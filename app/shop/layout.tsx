import { getCategories } from '@/lib/categories';
import ShopCategoriesHydrator from '@/providers/shop-categories-hydrator';
import { Category } from '@/store/categories/category.types';

export const revalidate = 3600;

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  let categories: Category[] = [];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Failed to prefetch shop categories:', error);
  }

  return (
    <>
      <ShopCategoriesHydrator categories={categories} />
      {children}
    </>
  );
}