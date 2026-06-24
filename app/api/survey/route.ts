import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { session_id, answer } = await req.json();

  if (!session_id || !answer?.trim()) {
    return NextResponse.json({ error: "session_id and answer are required" }, { status: 400 });
  }

  const stripe = getStripe();
  const supabase = await createServiceClient();

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const userEmail = session.metadata?.userEmail || session.customer_email;
    const subscriptionId = session.subscription as string | null;

    if (!userEmail) {
      return NextResponse.json({ error: "Could not determine user" }, { status: 400 });
    }

    const { error } = await supabase.from("survey_responses").upsert(
      {
        session_id,
        stripe_subscription_id: subscriptionId,
        user_email: userEmail,
        answer: answer.trim(),
      },
      { onConflict: "session_id" }
    );

    if (error) {
      console.error("Failed to save survey response:", error.message);
      return NextResponse.json({ error: "Failed to save response" }, { status: 500 });
    }

    // Also update the subscriptions table with the survey response
    if (subscriptionId) {
      await supabase
        .from("subscriptions")
        .update({ survey_response: answer.trim() })
        .eq("stripe_subscription_id", subscriptionId);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Survey submission failed";
    console.error("Survey API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
