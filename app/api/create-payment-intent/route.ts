import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Stripe secret key is not configured' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Payment initialization failed' },
      { status: 400 }
    );
  }
}