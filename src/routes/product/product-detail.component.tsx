'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Button, { BUTTON_TYPE_CLASSES } from '@/components/button/button.component';
import ProductImage from '@/components/product-image/product-image.component';
import { addItemToCart } from '@/store/cart/cart.action';
import { CategoryItem } from '@/store/categories/category.types';
import { formatPrice } from '@/utils/format/format-price';
import { showSuccess } from '@/utils/toast/toast.utils';
import {
  ProductDetailContainer,
  ImageColumn,
  InfoColumn,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  BackLink,
} from './product-detail.styles';

type ProductDetailProps = {
  product: CategoryItem;
  category: string;
};

const ProductDetail = ({ product, category }: ProductDetailProps) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    showSuccess(`${name} added to cart`);
  };

  return (
    <>
      <BackLink as={Link} href={`/shop/${category}`}>
        &larr; Back to {category}
      </BackLink>
      <ProductDetailContainer>
        <ImageColumn>
          <ProductImage src={imageUrl} alt={name} priority sizes="(max-width: 800px) 100vw, 50vw" />
        </ImageColumn>
        <InfoColumn>
          <ProductTitle>{name}</ProductTitle>
          <ProductPrice>{formatPrice(price)}</ProductPrice>
          <ProductDescription>
            Premium {category} piece from Crown Clothing. Crafted for comfort and everyday style.
          </ProductDescription>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={handleAddToCart}>
            Add to cart
          </Button>
        </InfoColumn>
      </ProductDetailContainer>
    </>
  );
};

export default ProductDetail;