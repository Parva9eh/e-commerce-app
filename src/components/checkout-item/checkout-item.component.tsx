'use client';

import { FC, memo } from 'react';
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  QuantityButton,
  Value,
  RemoveButton,
} from './checkout-item.styles';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '@/store/cart/cart.action';
import { CartItem } from '@/store/cart/cart.types';
import { formatPrice } from '@/utils/format/format-price';

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();

  const addItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));
  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <QuantityButton type="button" onClick={removeItemHandler} aria-label={`Decrease quantity of ${name}`}>
          &#10094;
        </QuantityButton>
        <Value>{quantity}</Value>
        <QuantityButton type="button" onClick={addItemHandler} aria-label={`Increase quantity of ${name}`}>
          &#10095;
        </QuantityButton>
      </Quantity>
      <BaseSpan>{formatPrice(price)}</BaseSpan>
      <RemoveButton type="button" onClick={clearItemHandler} aria-label={`Remove ${name} from cart`}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;