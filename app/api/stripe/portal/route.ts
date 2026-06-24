import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/login", origin), 303);
  }

  const supabase = await createServiceClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_email", session.user.email)
    .single();

  if (!data?.stripe_customer_id) {
    return NextResponse.redirect(new URL("/pricing", origin), 303);
  }

  const stripe = getStripe();

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: data.stripe_customer_id,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.redirect(portalSession.url, 303);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Portal session creation failed";
    console.error("Stripe portal error:", message);
    return NextResponse.redirect(new URL("/pricing", origin), 303);
  }
}
