'use client';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/utils/stripe';

type StripeCheckoutProviderProps = {
  children: React.ReactNode;
};

export default function StripeCheckoutProvider({ children }: StripeCheckoutProviderProps) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}