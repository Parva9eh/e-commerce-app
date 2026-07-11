import { getCategories } from '@/lib/categories';
import ShopCategoriesProvider from '@/providers/shop-categories-provider';
import { Category } from '@/store/categories/category.types';

export const revalidate = 3600;

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  let categories: Category[] = [];

  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return (
    <ShopCategoriesProvider initialCategories={categories}>{children}</ShopCategoriesProvider>
  );
}
