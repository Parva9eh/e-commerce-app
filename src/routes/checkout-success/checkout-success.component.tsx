'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/button/button.component';
import { SuccessContainer, SuccessTitle, SuccessMessage } from './checkout-success.styles';

const CheckoutSuccessContent = () => {
  const searchParams = useSearchParams();
  const orderSaved = searchParams.get('saved') !== 'false';
  const store = searchParams.get('store');

  let message =
    'Your payment was successful, but we could not save your order confirmation. Please keep your receipt.';

  if (orderSaved && store === 'stripe') {
    message = 'Your payment was successful. Please keep your receipt for your records.';
  } else if (orderSaved) {
    message = 'Your payment was successful. A confirmation has been saved.';
  }

  return (
    <SuccessContainer>
      <SuccessTitle>Thank you for your order</SuccessTitle>
      <SuccessMessage>{message}</SuccessMessage>
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
