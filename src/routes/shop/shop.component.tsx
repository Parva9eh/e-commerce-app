'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import CategoryPreview from '@/components/category-preview/category-preview.component';
import ShopFilters from '@/routes/shop/shop-filters.component';
import { selectCategoriesMap, selectIsCategoriesLoading } from '@/store/categories/category.selector';
import { CategoryItem } from '@/store/categories/category.types';
import ProductCardSkeleton from '@/components/skeleton/product-card-skeleton.component';
import { SkeletonGrid } from '@/components/skeleton/skeleton.styles';

const ShopContent = () => {
  const searchParams = useSearchParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsCategoriesLoading);
  const search = (searchParams.get('search') ?? '').toLowerCase().trim();
  const categoryFilter = searchParams.get('category') ?? 'all';
  const sort = searchParams.get('sort') ?? 'default';

  if (isLoading) {
    return (
      <SkeletonGrid>
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </SkeletonGrid>
    );
  }

  const filteredEntries = Object.entries(categoriesMap)
    .filter(([title]) => categoryFilter === 'all' || title === categoryFilter)
    .map(([title, products]) => {
      let filteredProducts = products as CategoryItem[];

      if (search) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(search)
        );
      }

      if (sort === 'price-asc') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
      }

      if (sort === 'price-desc') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
      }

      return [title, filteredProducts] as const;
    })
    .filter(([, products]) => products.length > 0);

  if (!filteredEntries.length) {
    return <p>No products match your filters.</p>;
  }

  return (
    <>
      {filteredEntries.map(([title, products]) => (
        <CategoryPreview key={title} title={title} products={products} />
      ))}
    </>
  );
};

const Shop = () => (
  <>
    <Suspense fallback={null}>
      <ShopFilters />
    </Suspense>
    <Suspense
      fallback={
        <SkeletonGrid>
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </SkeletonGrid>
      }
    >
      <ShopContent />
    </Suspense>
  </>
);

export default Shop;