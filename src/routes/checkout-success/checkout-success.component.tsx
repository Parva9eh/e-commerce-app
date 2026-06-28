'use client';

import Link from 'next/link';
import Button from '@/components/button/button.component';
import { SuccessContainer, SuccessTitle, SuccessMessage } from './checkout-success.styles';

const CheckoutSuccess = () => (
  <SuccessContainer>
    <SuccessTitle>Thank you for your order</SuccessTitle>
    <SuccessMessage>
      Your payment was successful. A confirmation has been saved to your account history.
    </SuccessMessage>
    <Link href="/shop">
      <Button>Continue shopping</Button>
    </Link>
  </SuccessContainer>
);

export default CheckoutSuccess;