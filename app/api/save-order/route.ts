import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminFirestore } from '@/lib/firebase-admin';
import { CartItem } from '@/store/cart/cart.types';

type SaveOrderBody = {
  paymentIntentId: string;
  userId: string | null;
  userEmail: string | null;
  amount: number;
  items: CartItem[];
};

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Stripe secret key is not configured' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as SaveOrderBody;
    const { paymentIntentId, userId, userEmail, amount, items } = body;

    if (!paymentIntentId || !Array.isArray(items) || !items.length || !Number.isFinite(amount)) {
      return NextResponse.json({ error: 'Invalid order payload' }, { status: 400 });
    }

    const stripe = new Stripe(stripeSecretKey);
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: 'Payment is not completed' }, { status: 400 });
    }

    const db = getAdminFirestore();

    await db.collection('orders').add({
      userId: userId ?? null,
      userEmail: userEmail ?? null,
      amount,
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
    console.error('Save order failed:', error);
    return NextResponse.json({ error: 'Unable to save order' }, { status: 500 });
  }
}