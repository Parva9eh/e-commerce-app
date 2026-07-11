'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Category, CategoryItem, CategoryMap } from '@/store/categories/category.types';

type ShopCategoriesContextValue = {
  categories: Category[];
  categoriesMap: CategoryMap;
  isLoading: boolean;
  error: Error | null;
};

const ShopCategoriesContext = createContext<ShopCategoriesContextValue | null>(null);

const toCategoriesMap = (categories: Category[]): CategoryMap =>
  categories.reduce((acc, { title, items }) => {
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoryMap);

type ShopCategoriesProviderProps = {
  initialCategories: Category[];
  children: React.ReactNode;
};

/**
 * Server-fetched categories are the source of truth for shop routes.
 * Client Firebase fetch is only a fallback when the server returned nothing.
 */
export default function ShopCategoriesProvider({
  initialCategories,
  children,
}: ShopCategoriesProviderProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isLoading, setIsLoading] = useState(!initialCategories.length);
  const [error, setError] = useState<Error | null>(null);

  const loadClientFallback = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { getCollectionAndDocuments } = await import('@/utils/firebase/firebase.utils');
      const next = await getCollectionAndDocuments();
      setCategories(next);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load categories'));
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialCategories.length) {
      setCategories(initialCategories);
      setIsLoading(false);
      setError(null);
      return;
    }

    void loadClientFallback();
  }, [initialCategories, loadClientFallback]);

  const value = useMemo<ShopCategoriesContextValue>(
    () => ({
      categories,
      categoriesMap: toCategoriesMap(categories),
      isLoading,
      error,
    }),
    [categories, isLoading, error],
  );

  return (
    <ShopCategoriesContext.Provider value={value}>{children}</ShopCategoriesContext.Provider>
  );
}

export const useShopCategories = (): ShopCategoriesContextValue => {
  const ctx = useContext(ShopCategoriesContext);

  if (!ctx) {
    throw new Error('useShopCategories must be used within ShopCategoriesProvider');
  }

  return ctx;
};

export type { CategoryItem };
