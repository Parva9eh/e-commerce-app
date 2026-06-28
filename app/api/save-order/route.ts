import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { FieldValue } from 'firebase-admin/firestore';
import { parseCartLineInputs } from '@/lib/api/cart-request';
import { validateCartFromRequest } from '@/lib/catalog';
import { getAdminFirestore } from '@/lib/firebase-admin';
import { enforceRateLimit } from '@/lib/rate-limit';

type SaveOrderBody = {
  paymentIntentId?: string;
  userId?: string | null;
  userEmail?: string | null;
  items?: Array<{ id?: unknown; quantity?: unknown }>;
};

export async function POST(request: NextRequest) {
  try {
    const rateLimit = enforceRateLimit(request, 'save-order');

    if (!rateLimit.ok) {
      return NextResponse.json(
        { error: 'Too many order requests. Please try again shortly.' },
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

    const body = (await request.json()) as SaveOrderBody;
    const paymentIntentId = body.paymentIntentId;

    if (!paymentIntentId || typeof paymentIntentId !== 'string') {
      return NextResponse.json({ error: 'Payment intent is required' }, { status: 400 });
    }

    const cartLines = parseCartLineInputs(body);
    const { items, totalCents, totalDollars } = await validateCartFromRequest(cartLines);

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

    const db = getAdminFirestore();

    await db.collection('orders').add({
      userId: body.userId ?? null,
      userEmail: body.userEmail ?? null,
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
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to save order';

    console.error('Save order failed:', error);

    return NextResponse.json({ error: message }, { status: 400 });
  }
}