import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const PLAN_CONFIGS: Record<string, { name: string; amount: number; description: string }> = {
  single: {
    name: "Goon Single Figurine",
    amount: 4900,
    description: "Custom 3D figurine — single order with survey",
  },
  premium: {
    name: "Goon Premium Figurine",
    amount: 8900,
    description: "Custom 3D figurine — premium order with survey",
  },
};

export async function GET(req: NextRequest) {
  const stripe = getStripe();
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan") || "single";

  const config = PLAN_CONFIGS[plan];
  if (!config) {
    return NextResponse.json(
      { error: `Unknown plan: ${plan}. Valid plans: ${Object.keys(PLAN_CONFIGS).join(", ")}` },
      { status: 400 }
    );
  }

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: config.name,
              description: config.description,
            },
            unit_amount: config.amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: { plan },
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout session creation failed";
    console.error("Checkout GET error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        priceId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
