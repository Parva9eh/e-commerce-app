import { FC, memo } from 'react';
import { CartItemContainer, ItemDetails, ImageWrapper } from './cart-item.styles';
import ProductImageThumbnail from '@/components/product-image/product-image-thumbnail.component';
import { CartItem as TCartItem } from '@/store/cart/cart.types';
import { formatPrice } from '@/utils/format/format-price';

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <ImageWrapper>
        <ProductImageThumbnail src={imageUrl} alt={name} />
      </ImageWrapper>
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