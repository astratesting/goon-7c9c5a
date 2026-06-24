import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

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

  const supabase = await createServiceClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const planId = session.metadata?.planId || "free";
        const userEmail = session.metadata?.userEmail || session.customer_email;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        console.log(`Checkout completed: session=${session.id} plan=${planId} customer=${customerId}`);

        if (userEmail) {
          const { error } = await supabase
            .from("subscriptions")
            .upsert(
              {
                user_email: userEmail,
                stripe_customer_id: customerId,
                stripe_subscription_id: subscriptionId,
                plan_id: planId,
                status: "active",
                updated_at: new Date().toISOString(),
              },
              { onConflict: "user_email" }
            );
          if (error) {
            console.error("Failed to persist checkout session:", error.message);
          }
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const planId = subscription.metadata?.planId;
        const customerId = subscription.customer as string;

        console.log(`Subscription ${event.type}: id=${subscription.id} status=${subscription.status}`);

        const updates: Record<string, unknown> = {
          stripe_subscription_id: subscription.id,
          status: subscription.status === "active" ? "active" : subscription.status,
          updated_at: new Date().toISOString(),
        };
        if (planId) updates.plan_id = planId;

        const { error } = await supabase
          .from("subscriptions")
          .update(updates)
          .eq("stripe_customer_id", customerId);
        if (error) {
          console.error("Failed to update subscription:", error.message);
        }
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        console.log(`Subscription deleted: id=${subscription.id}`);

        const { error } = await supabase
          .from("subscriptions")
          .update({
            plan_id: "free",
            status: "active",
            stripe_subscription_id: null,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", customerId);
        if (error) {
          console.error("Failed to downgrade subscription:", error.message);
        }
        break;
      }
      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook handler failed";
    console.error("Webhook handler error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
