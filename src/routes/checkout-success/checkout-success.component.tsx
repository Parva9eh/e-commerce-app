'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/button/button.component';
import { SuccessContainer, SuccessTitle, SuccessMessage } from './checkout-success.styles';

const CheckoutSuccessContent = () => {
  const searchParams = useSearchParams();
  const orderSaved = searchParams.get('saved') !== 'false';

  return (
    <SuccessContainer>
      <SuccessTitle>Thank you for your order</SuccessTitle>
      <SuccessMessage>
        {orderSaved
          ? 'Your payment was successful. A confirmation has been saved to your account history.'
          : 'Your payment was successful, but we could not save your order confirmation. Please keep your Stripe receipt and contact support if you need help.'}
      </SuccessMessage>
      <Link href="/shop">
        <Button>Continue shopping</Button>
      </Link>
    </SuccessContainer>
  );
};

const CheckoutSuccess = () => (
  <Suspense fallback={null}>
    <CheckoutSuccessContent />
  </Suspense>
);

export default CheckoutSuccess;