import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { parseCartLineInputs } from '@/lib/api/cart-request';
import { toApiErrorResponse } from '@/lib/api/http-errors';
import {
  buildCartFingerprint,
  CART_FINGERPRINT_METADATA_KEY,
} from '@/lib/cart-fingerprint';
import { validateCartFromRequest } from '@/lib/catalog';
import { hasAdminCredentials } from '@/lib/firebase-admin';
import {
  applyRateLimitHeaders,
  enforceRateLimit,
  rateLimitExceededResponse,
} from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit(request, 'create-payment-intent', 10, 60_000);

    if (!rateLimit.ok) {
      return rateLimitExceededResponse(
        'Too many payment attempts. Please try again shortly.',
        rateLimit,
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim();

    if (!stripeSecretKey) {
      console.error('[api:config] STRIPE_SECRET_KEY is missing');
      return NextResponse.json(
        { error: 'Payment service is not configured' },
        { status: 500 },
      );
    }

    if (!hasAdminCredentials()) {
      console.error('[api:config] Firebase Admin credentials are missing');
      return NextResponse.json(
        { error: 'Payment service is not configured' },
        { status: 500 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const cartLines = parseCartLineInputs(body as { items?: Array<{ id?: unknown; quantity?: unknown }> });
    const { totalCents, items } = await validateCartFromRequest(cartLines);
    const fingerprint = buildCartFingerprint(
      items.map(({ id, quantity }) => ({ id, quantity })),
    );
    const receiptEmail =
      typeof (body as { receiptEmail?: unknown }).receiptEmail === 'string' &&
      (body as { receiptEmail: string }).receiptEmail.includes('@')
        ? (body as { receiptEmail: string }).receiptEmail.trim()
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

    if (!paymentIntent.client_secret) {
      console.error('[api] Stripe returned no client_secret');
      return NextResponse.json(
        { error: 'Payment initialization failed' },
        { status: 502 },
      );
    }

    const response = NextResponse.json({ clientSecret: paymentIntent.client_secret });
    applyRateLimitHeaders(response, rateLimit);
    return response;
  } catch (error) {
    return toApiErrorResponse(error, 'Payment initialization failed');
  }
}
