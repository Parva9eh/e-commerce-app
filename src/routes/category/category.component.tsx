'use client';

import { useSelector } from 'react-redux';
import ProductCard from '@/components/product-card/product-card.component';
import { CategoryContainer, Title } from './category.styles';
import { selectCategoriesMap, selectIsCategoriesLoading } from '@/store/categories/category.selector';
import Spinner from '@/components/spinner/spinner.components';

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
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </>
  );
};

export default Category;