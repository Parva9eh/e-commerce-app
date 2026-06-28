'use client';

import ProductCardSkeleton from './product-card-skeleton.component';
import { SkeletonGrid } from './skeleton.styles';

const PageLoading = () => (
  <SkeletonGrid>
    {Array.from({ length: 4 }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </SkeletonGrid>
);

export default PageLoading;