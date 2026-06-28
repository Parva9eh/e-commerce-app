import { loadStripe, Stripe } from '@stripe/stripe-js';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const stripePromise: Promise<Stripe | null> = loadStripe(
  publishableKey ?? ''
);