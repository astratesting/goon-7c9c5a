import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-05-27.dahlia",
  });
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook signature verification failed";
    console.error("Webhook signature error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout completed:", session.id);
        // Fulfill order: mark user as paid, send confirmation email, etc.
        break;
      }
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription created:", subscription.id);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription updated:", subscription.id);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription deleted:", subscription.id);
        break;
      }
      default:
        console.log("Unhandled event type:", event.type);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook handler error";
    console.error("Webhook handler error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
