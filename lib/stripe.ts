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
