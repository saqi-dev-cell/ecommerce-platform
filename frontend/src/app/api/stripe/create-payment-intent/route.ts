import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    // Check if we have valid Stripe keys
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('PLACEHOLDER')) {
      return NextResponse.json(
        {
          error: 'Stripe not configured. Please add real Stripe test keys to .env.local',
          details: 'Visit https://dashboard.stripe.com/test/apikeys to get your test keys'
        },
        { status: 500 }
      );
    }

    const { amount, currency = 'usd', cartItems, shippingAddress, metadata } = await request.json();

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ...metadata,
        cartItems: JSON.stringify(cartItems),
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);

    // Handle Stripe authentication errors specifically
    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        {
          error: 'Invalid Stripe API keys. Please add real test keys to .env.local',
          details: 'Get your test keys from https://dashboard.stripe.com/test/apikeys',
          stripeError: true
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
