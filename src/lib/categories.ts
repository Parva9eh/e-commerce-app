import { getCachedCatalogCategories } from '@/lib/catalog';
import { Category } from '@/store/categories/category.types';

/**
 * Server-side catalog fetch via Admin SDK (TTL-cached in catalog module).
 * Prefer this over the client Firebase SDK in Server Components / layouts.
 */
export const getCategories = async (): Promise<Category[]> => {
  return getCachedCatalogCategories();
};
