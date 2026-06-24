import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { PLANS } from "@/lib/plans";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ planId: "free", planName: "Free", features: [] });
  }

  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Get plan details from session metadata
    const planId = session.metadata?.planId;
    if (!planId) {
      return NextResponse.json({ planId: "free", planName: "Free", features: [] });
    }

    const plan = PLANS.find((p) => p.id === planId);

    return NextResponse.json({
      planId: planId,
      planName: plan?.name || planId,
      features: plan?.features || [],
    });
  } catch (err) {
    console.error("Failed to retrieve checkout session:", err);
    return NextResponse.json({ planId: "free", planName: "Free", features: [] });
  }
}
