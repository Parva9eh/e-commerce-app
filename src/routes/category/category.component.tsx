'use client';

import { useSelector } from 'react-redux';
import ProductCard from '@/components/product-card/product-card.component';
import { CategoryContainer, Title } from './category.styles';
import { selectCategoriesMap, selectIsCategoriesLoading } from '@/store/categories/category.selector';
import ProductCardSkeleton from '@/components/skeleton/product-card-skeleton.component';
import { SkeletonGrid } from '@/components/skeleton/skeleton.styles';

type CategoryProps = {
  category: string;
};

const Category = ({ category }: CategoryProps) => {
  const isLoading = useSelector(selectIsCategoriesLoading);
  const categoriesMap = useSelector(selectCategoriesMap);
  const products = categoriesMap[category];

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <SkeletonGrid>
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </SkeletonGrid>
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} category={category} />
            ))}
        </CategoryContainer>
      )}
    </>
  );
};

export default Category;