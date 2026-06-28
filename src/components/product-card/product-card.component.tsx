'use client';

import { FC } from 'react';
import { ProductCardContainer, Footer, Name, Price } from './product-card.styles';
import ProductImage from '@/components/product-image/product-image.component';
import { useDispatch } from 'react-redux';
import Button, { BUTTON_TYPE_CLASSES } from '@/components/button/button.component';
import { addItemToCart } from '@/store/cart/cart.action';
import { CategoryItem } from '@/store/categories/category.types';
import { formatPrice } from '@/utils/format/format-price';

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>{formatPrice(price)}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;