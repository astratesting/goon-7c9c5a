import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-05-27.dahlia",
    });
  }
  return stripeInstance;
}

let stripePromise: ReturnType<typeof loadStripe> | null = null;

export function getStripeClient() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

export async function createCheckoutSession({
  email,
  planId,
  planName,
  monthlyPrice,
  printLimit,
  origin,
}: {
  email: string;
  planId: string;
  planName: string;
  monthlyPrice: number;
  printLimit: number | null;
  origin: string;
}) {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Goon ${planName}`,
            description: `${printLimit ? printLimit + " prints/mo" : "Unlimited prints"} — Cancel anytime`,
          },
          unit_amount: monthlyPrice,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/survey?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cancel`,
    metadata: { planId, userEmail: email },
  });

  return session;
}

export async function createCustomerPortal({
  customerId,
  origin,
}: {
  customerId: string;
  origin: string;
}) {
  const stripe = getStripe();

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/dashboard/subscription`,
  });

  return session;
}
