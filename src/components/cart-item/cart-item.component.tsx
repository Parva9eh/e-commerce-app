import { FC, memo } from 'react';
import { CartItemContainer, ItemDetails } from './cart-item.styles';
import { CartItem as TCartItem } from '@/store/cart/cart.types';
import { formatPrice } from '@/utils/format/format-price';

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x {formatPrice(price)}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;