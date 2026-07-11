import { cache } from 'react';
import { Category, CategoryItem } from '@/store/categories/category.types';
import { getCollectionAndDocuments } from '@/utils/firebase/firebase.utils';

/**
 * Normalize Firestore payloads into plain JSON-safe category objects.
 * Strips Timestamps / extra fields so RSC → client props never fail serialization.
 */
export const toPlainCategories = (categories: Category[]): Category[] => {
  return categories.map((category) => ({
    title: String(category?.title ?? ''),
    imagUrl: String((category as Category & { imageUrl?: string })?.imagUrl ?? ''),
    items: (category?.items ?? []).map(
      (item: CategoryItem): CategoryItem => ({
        id: Number(item.id),
        name: String(item.name ?? ''),
        price: Number(item.price),
        imageUrl: String(item.imageUrl ?? ''),
      }),
    ),
  }));
};

/**
 * Public catalog for Server Components / shop UI.
 * Uses the client Firebase SDK (NEXT_PUBLIC_* only) so shop pages do not depend
 * on Admin credentials. Payment routes keep using Admin via `@/lib/catalog`.
 */
export const getCategories = cache(async (): Promise<Category[]> => {
  const categories = await getCollectionAndDocuments();
  return toPlainCategories(categories);
});
