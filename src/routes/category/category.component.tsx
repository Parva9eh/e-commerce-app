'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '@/components/product-card/product-card.component';
import { getBrowseOrigin } from '@/utils/shop/browse-origin';
import {
  resolveCategoryBackLink,
  type BrowseBackLink,
} from '@/utils/shop/browse-navigation';
import { CategoryContainer, Title, BackNav, BackLink } from './category.styles';
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
  const [backLink, setBackLink] = useState<BrowseBackLink | null>(null);

  useEffect(() => {
    setBackLink(resolveCategoryBackLink(getBrowseOrigin()));
  }, []);

  return (
    <>
      {backLink && (
        <BackNav aria-label="Category navigation">
          <BackLink href={backLink.href}>&larr; {backLink.label}</BackLink>
        </BackNav>
      )}
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