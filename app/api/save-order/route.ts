import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { parseCartLineInputs } from '@/lib/api/cart-request';
import { toApiErrorResponse } from '@/lib/api/http-errors';
import {
  buildCartFingerprint,
  CART_FINGERPRINT_METADATA_KEY,
} from '@/lib/cart-fingerprint';
import { validateCartFromRequest } from '@/lib/catalog';
import { hasAdminCredentials } from '@/lib/firebase-admin-env';
import { createOrderDocument } from '@/lib/firestore-rest';
import {
  applyRateLimitHeaders,
  enforceRateLimit,
  rateLimitExceededResponse,
} from '@/lib/rate-limit';
import {
  assertOrderUserIdentity,
  resolveOrderEmail,
  verifyBearerToken,
} from '@/lib/verify-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type SaveOrderBody = {
  paymentIntentId?: string;
  userId?: string | null;
  items?: Array<{ id?: unknown; quantity?: unknown }>;
};

type OrderPersistence = 'firestore' | 'stripe';

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit(request, 'save-order', 10, 60_000);

    if (!rateLimit.ok) {
      return rateLimitExceededResponse(
        'Too many order requests. Please try again shortly.',
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

    let body: SaveOrderBody;
    try {
      body = (await request.json()) as SaveOrderBody;
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const paymentIntentId = body.paymentIntentId;

    if (!paymentIntentId || typeof paymentIntentId !== 'string') {
      return NextResponse.json({ error: 'Payment intent is required' }, { status: 400 });
    }

    let verifiedUser = null;

    try {
      verifiedUser = await verifyBearerToken(request.headers.get('authorization'));
    } catch {
      return NextResponse.json({ error: 'Invalid authentication token' }, { status: 401 });
    }

    const identityError = assertOrderUserIdentity(verifiedUser, body.userId ?? null);

    if (identityError) {
      return NextResponse.json({ error: identityError }, { status: 401 });
    }

    const cartLines = parseCartLineInputs(body);
    const { items, totalCents, totalDollars } = await validateCartFromRequest(cartLines);
    const fingerprint = buildCartFingerprint(
      items.map(({ id, quantity }) => ({ id, quantity })),
    );

    const stripe = new Stripe(stripeSecretKey);
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: 'Payment is not completed' }, { status: 400 });
    }

    if (paymentIntent.amount !== totalCents) {
      return NextResponse.json(
        { error: 'Payment amount does not match order total' },
        { status: 400 },
      );
    }

    if (paymentIntent.currency !== 'usd') {
      return NextResponse.json({ error: 'Unsupported payment currency' }, { status: 400 });
    }

    const paidFingerprint = paymentIntent.metadata?.[CART_FINGERPRINT_METADATA_KEY];

    if (!paidFingerprint || paidFingerprint !== fingerprint) {
      return NextResponse.json({ error: 'Cart does not match payment' }, { status: 400 });
    }

    const orderEmail = resolveOrderEmail(verifiedUser, paymentIntent.receipt_email);
    const orderUserId = verifiedUser?.uid ?? null;
    const orderPayload = {
      userId: orderUserId,
      userEmail: orderEmail,
      amount: totalDollars,
      amountCents: totalCents,
      items: items.map(({ id, name, price, imageUrl, quantity }) => ({
        id,
        name,
        price,
        imageUrl,
        quantity,
      })),
      paymentIntentId,
      cartFingerprint: fingerprint,
    };

    let persistence: OrderPersistence = 'stripe';
    let duplicate = false;

    if (hasAdminCredentials()) {
      try {
        const result = await createOrderDocument(paymentIntentId, orderPayload);
        persistence = 'firestore';
        duplicate = result.duplicate;
      } catch (error) {
        console.error('[api] order write failed', error instanceof Error ? error.message : error);
      }
    }

    // Fallback confirmation on the PaymentIntent when Firestore is unavailable.
    if (persistence === 'stripe') {
      const itemSummary = items
        .map((item) => `${item.id}x${item.quantity}`)
        .join(',')
        .slice(0, 450);

      await stripe.paymentIntents.update(paymentIntentId, {
        metadata: {
          ...paymentIntent.metadata,
          [CART_FINGERPRINT_METADATA_KEY]: fingerprint,
          order_confirmed: 'true',
          order_total_cents: String(totalCents),
          order_item_count: String(items.length),
          order_items: itemSummary,
          order_user_id: orderUserId ?? 'guest',
          order_email: (orderEmail ?? '').slice(0, 450),
        },
      });
    }

    const response = NextResponse.json({
      success: true,
      persistence,
      ...(duplicate ? { duplicate: true } : {}),
    });
    applyRateLimitHeaders(response, rateLimit);
    return response;
  } catch (error) {
    return toApiErrorResponse(error, 'Unable to save order');
  }
}
