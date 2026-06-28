import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { parseCartLineInputs } from '@/lib/api/cart-request';
import { validateCartFromRequest } from '@/lib/catalog';
import { enforceRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const rateLimit = enforceRateLimit(request, 'create-payment-intent');

    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: 'Too many payment attempts. Please try again shortly.' },
        {
          status: 429,
          headers: rateLimit.retryAfterSeconds
            ? { 'Retry-After': String(rateLimit.retryAfterSeconds) }
            : undefined,
        },
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Stripe secret key is not configured' },
        { status: 500 },
      );
    }

    const body = await request.json();
    const cartLines = parseCartLineInputs(body);
    const { totalCents } = await validateCartFromRequest(cartLines);

    const stripe = new Stripe(stripeSecretKey);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Payment initialization failed';

    console.error('Create payment intent failed:', error);

    return NextResponse.json({ error: message }, { status: 400 });
  }
}