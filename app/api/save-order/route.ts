import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { FieldValue } from 'firebase-admin/firestore';
import { parseCartLineInputs } from '@/lib/api/cart-request';
import { toApiErrorResponse } from '@/lib/api/http-errors';
import {
  buildCartFingerprint,
  CART_FINGERPRINT_METADATA_KEY,
} from '@/lib/cart-fingerprint';
import { validateCartFromRequest } from '@/lib/catalog';
import { getAdminFirestore } from '@/lib/firebase-admin';
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

type SaveOrderBody = {
  paymentIntentId?: string;
  userId?: string | null;
  items?: Array<{ id?: unknown; quantity?: unknown }>;
};

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit(request, 'save-order', 10, 60_000);

    if (!rateLimit.ok) {
      return rateLimitExceededResponse(
        'Too many order requests. Please try again shortly.',
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

    const body = (await request.json()) as SaveOrderBody;
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

    const db = getAdminFirestore();
    const orderRef = db.collection('orders').doc(paymentIntentId);
    const orderPayload = {
      userId: verifiedUser?.uid ?? null,
      userEmail: resolveOrderEmail(verifiedUser, paymentIntent.receipt_email),
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
      createdAt: FieldValue.serverTimestamp(),
    };

    try {
      await orderRef.create(orderPayload);
    } catch (error) {
      const code =
        error && typeof error === 'object' && 'code' in error
          ? String((error as { code: unknown }).code)
          : '';

      // Idempotent replay: same paymentIntentId already saved.
      if (code === '6' || code === 'already-exists' || /ALREADY_EXISTS/i.test(String(error))) {
        const response = NextResponse.json({ success: true, duplicate: true });
        applyRateLimitHeaders(response, rateLimit);
        return response;
      }

      throw error;
    }

    const response = NextResponse.json({ success: true });
    applyRateLimitHeaders(response, rateLimit);
    return response;
  } catch (error) {
    return toApiErrorResponse(error, 'Unable to save order');
  }
}
