import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { PLANS } from "@/lib/plans";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "You must be signed in to subscribe" }, { status: 401 });
  }

  const stripe = getStripe();
  const { planId } = await req.json();

  const plan = PLANS.find((p) => p.id === planId);
  if (!plan || !plan.stripePriceId || !plan.monthlyPrice) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Goon ${plan.name}`,
              description: `${plan.printLimit ? plan.printLimit + " prints/mo" : "Unlimited prints"} — Cancel anytime`,
            },
            unit_amount: plan.monthlyPrice,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/survey?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
      metadata: { planId: plan.id, userEmail: session.user.email },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
