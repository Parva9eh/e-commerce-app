'use client';

import CategoryPreview from '@/components/category-preview/category-preview.component';
import Spinner from '@/components/spinner/spinner.components';
import { useShopCategories } from '@/providers/shop-categories-provider';

const CategoriesPreview = () => {
  const { categoriesMap, isLoading } = useShopCategories();

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products} />;
      })}
    </>
  );
};

export default CategoriesPreview;
