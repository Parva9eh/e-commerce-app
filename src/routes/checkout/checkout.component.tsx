'use client';

import Link from 'next/link';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total, EmptyMessage } from './checkout.styles';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '@/store/cart/cart.selector';
import CheckoutItem from '@/components/checkout-item/checkout-item.component';
import PaymentForm from '@/components/payment-form/payment-form.component';
import StripeCheckoutProvider from '@/providers/stripe-checkout-provider';
import { formatPrice } from '@/utils/format/format-price';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (!cartItems.length) {
    return (
      <CheckoutContainer>
        <EmptyMessage>Your cart is empty.</EmptyMessage>
        <Link href="/shop">Continue shopping</Link>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: {formatPrice(cartTotal)}</Total>
      <StripeCheckoutProvider>
        <PaymentForm />
      </StripeCheckoutProvider>
    </CheckoutContainer>
  );
};

export default Checkout;