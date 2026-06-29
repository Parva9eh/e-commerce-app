'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button, { BUTTON_TYPE_CLASSES } from '@/components/button/button.component';
import ProductImage from '@/components/product-image/product-image.component';
import { addItemToCart } from '@/store/cart/cart.action';
import { CategoryItem } from '@/store/categories/category.types';
import { formatPrice } from '@/utils/format/format-price';
import {
  resolveProductBackLinks,
  type ProductBackLink,
} from '@/utils/shop/product-navigation';
import { getProductReferrerPath } from '@/utils/shop/shop-params';
import { showSuccess } from '@/utils/toast/toast.utils';
import {
  ProductDetailContainer,
  ImageColumn,
  InfoColumn,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  BackLink,
  BackNav,
} from './product-detail.styles';

type ProductDetailProps = {
  product: CategoryItem;
  category: string;
};

const getDefaultBackLinks = (category: string): ProductBackLink[] =>
  resolveProductBackLinks(null, category);

const ProductDetail = ({ product, category }: ProductDetailProps) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;
  const [backLinks, setBackLinks] = useState(() => getDefaultBackLinks(category));

  useEffect(() => {
    setBackLinks(resolveProductBackLinks(getProductReferrerPath(), category));
  }, [category]);

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    showSuccess(`${name} added to cart`);
  };

  return (
    <>
      <BackNav aria-label="Product navigation">
        {backLinks.map((link) => (
          <BackLink key={link.href} href={link.href}>
            &larr; {link.label}
          </BackLink>
        ))}
      </BackNav>
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