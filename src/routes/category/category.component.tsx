'use client';

import { useLayoutEffect, useState } from 'react';
import ProductCard from '@/components/product-card/product-card.component';
import { getBrowseOrigin } from '@/utils/shop/browse-origin';
import {
  resolveCategoryBackLink,
  type BrowseBackLink,
} from '@/utils/shop/browse-navigation';
import { CategoryContainer, Title, BackNav, BackLink } from './category.styles';
import ProductCardSkeleton from '@/components/skeleton/product-card-skeleton.component';
import { SkeletonGrid } from '@/components/skeleton/skeleton.styles';
import { useShopCategories } from '@/providers/shop-categories-provider';

type CategoryProps = {
  category: string;
};

const readCategoryBackLink = () => resolveCategoryBackLink(getBrowseOrigin());

const Category = ({ category }: CategoryProps) => {
  const { categoriesMap, isLoading } = useShopCategories();
  const products = categoriesMap[category];
  const [backLink, setBackLink] = useState<BrowseBackLink | null>(null);

  useLayoutEffect(() => {
    const syncBackLink = () => {
      const link = readCategoryBackLink();
      if (link) {
        setBackLink(link);
      }
    };

    syncBackLink();

    const timeoutId = window.setTimeout(syncBackLink, 0);

    return () => window.clearTimeout(timeoutId);
  }, [category]);

  return (
    <>
      {backLink && (
        <BackNav aria-label="Category navigation">
          <BackLink href={backLink.href} aria-label={backLink.ariaLabel}>
            &larr; {backLink.label}
          </BackLink>
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
