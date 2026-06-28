'use client';

import { FC } from 'react';
import Link from 'next/link';
import { ProductCardContainer, Footer, Name, Price, ProductLink } from './product-card.styles';
import ProductImage from '@/components/product-image/product-image.component';
import { useDispatch } from 'react-redux';
import Button, { BUTTON_TYPE_CLASSES } from '@/components/button/button.component';
import { addItemToCart } from '@/store/cart/cart.action';
import { CategoryItem } from '@/store/categories/category.types';
import { formatPrice } from '@/utils/format/format-price';

type ProductCardProps = {
  product: CategoryItem;
  category?: string;
};

const ProductCard: FC<ProductCardProps> = ({ product, category }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl, id } = product;
  const addProductToCart = () => dispatch(addItemToCart(product));
  const productHref = category ? `/shop/${category}/${id}` : undefined;

  return (
    <ProductCardContainer>
      {productHref ? (
        <ProductLink href={productHref}>
          <ProductImage src={imageUrl} alt={name} />
        </ProductLink>
      ) : (
        <ProductImage src={imageUrl} alt={name} />
      )}
      <Footer>
        {productHref ? (
          <Name as={Link} href={productHref}>
            {name}
          </Name>
        ) : (
          <Name>{name}</Name>
        )}
        <Price>{formatPrice(price)}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;