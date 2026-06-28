'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserSession } from '@/store/user/user.action';
import { fetchCategoriesStart } from '@/store/categories/category.action';

export default function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return null;
}