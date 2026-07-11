import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { parseCartLineInputs } from '@/lib/api/cart-request';
import { toApiErrorResponse } from '@/lib/api/http-errors';
import {
  buildCartFingerprint,
  CART_FINGERPRINT_METADATA_KEY,
} from '@/lib/cart-fingerprint';
import { validateCartFromRequest } from '@/lib/catalog';
import {
  applyRateLimitHeaders,
  enforceRateLimit,
  rateLimitExceededResponse,
} from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit(request, 'create-payment-intent', 10, 60_000);

    if (!rateLimit.ok) {
      return rateLimitExceededResponse(
        'Too many payment attempts. Please try again shortly.',
        rateLimit,
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Payment service is not configured' },
        { status: 500 },
      );
    }

    const body = await request.json();
    const cartLines = parseCartLineInputs(body);
    const { totalCents, items } = await validateCartFromRequest(cartLines);
    const fingerprint = buildCartFingerprint(
      items.map(({ id, quantity }) => ({ id, quantity })),
    );
    const receiptEmail =
      typeof body.receiptEmail === 'string' && body.receiptEmail.includes('@')
        ? body.receiptEmail.trim()
        : undefined;

    const stripe = new Stripe(stripeSecretKey);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'usd',
      payment_method_types: ['card'],
      ...(receiptEmail ? { receipt_email: receiptEmail } : {}),
      metadata: {
        [CART_FINGERPRINT_METADATA_KEY]: fingerprint,
        item_count: String(items.length),
      },
    });

    const response = NextResponse.json({ clientSecret: paymentIntent.client_secret });
    applyRateLimitHeaders(response, rateLimit);
    return response;
  } catch (error) {
    return toApiErrorResponse(error, 'Payment initialization failed');
  }
}
