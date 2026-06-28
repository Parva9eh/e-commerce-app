import { cache } from 'react';
import { getCollectionAndDocuments } from '@/utils/firebase/firebase.utils';
import { Category } from '@/store/categories/category.types';

export const getCategories = cache(async (): Promise<Category[]> => {
  return getCollectionAndDocuments();
});