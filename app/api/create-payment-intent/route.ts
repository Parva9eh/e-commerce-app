import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { parseCartLineInputs } from '@/lib/api/cart-request';
import { validateCartFromRequest } from '@/lib/catalog';
import {
  applyRateLimitHeaders,
  enforceRateLimit,
  rateLimitExceededResponse,
} from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const rateLimit = enforceRateLimit(request, 'create-payment-intent', 10, 60_000);

    if (!rateLimit.ok) {
      return rateLimitExceededResponse(
        'Too many payment attempts. Please try again shortly.',
        rateLimit,
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

    const response = NextResponse.json({ clientSecret: paymentIntent.client_secret });
    applyRateLimitHeaders(response, rateLimit);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Payment initialization failed';

    return NextResponse.json({ error: message }, { status: 400 });
  }
}