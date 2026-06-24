import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

/**
 * POST /api/test-payment
 *
 * Creates a Stripe test customer, PaymentIntent, and Subscription using the
 * configured test keys. Returns the payment intent ID (pi_xxx) and
 * subscription ID (sub_xxx) for verification.
 *
 * Uses Stripe test card 4242424242424242 (handled client-side via Stripe Checkout).
 * In test mode Stripe accepts any future expiry, CVC, and zip.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();

  try {
    // 1. Create a test customer
    const customer = await stripe.customers.create({
      email: "test@example.com",
      name: "Test Customer",
      metadata: { source: "test-payment-route" },
    });

    // 2. Create a PaymentIntent (will return pi_xxx)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 4900,
      currency: "usd",
      customer: customer.id,
      payment_method: "pm_card_visa",
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      metadata: { purpose: "test-checkout" },
    });

    // 3. Create a test product + price for the subscription
    const product = await stripe.products.create({
      name: "Goon Test Subscription",
      metadata: { purpose: "test-checkout" },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 4900,
      currency: "usd",
      recurring: { interval: "month" },
    });

    // 4. Create a Subscription (will return sub_xxx)
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      metadata: { purpose: "test-checkout" },
    });

    return NextResponse.json({
      success: true,
      payment_intent_id: paymentIntent.id,
      subscription_id: subscription.id,
      customer_id: customer.id,
      product_id: product.id,
      price_id: price.id,
      note: "Test objects created with Stripe test keys. Clean up in Stripe dashboard or via API.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Test payment creation failed";
    console.error("Test payment error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
