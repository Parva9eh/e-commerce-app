'use client';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoriesStart, fetchCategoriesSuccess } from '@/store/categories/category.action';
import { Category } from '@/store/categories/category.types';

type ShopCategoriesHydratorProps = {
  categories: Category[];
};

export default function ShopCategoriesHydrator({ categories }: ShopCategoriesHydratorProps) {
  const dispatch = useDispatch();
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;

    if (categories.length) {
      dispatch(fetchCategoriesSuccess(categories));
    } else {
      dispatch(fetchCategoriesStart());
    }

    hydrated.current = true;
  }, [categories, dispatch]);

  return null;
}