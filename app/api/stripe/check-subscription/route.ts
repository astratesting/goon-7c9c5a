import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { FREE_TIER_PRINT_LIMIT } from "@/lib/plans";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({
      subscribed: false,
      plan: "free",
      printLimit: FREE_TIER_PRINT_LIMIT,
    });
  }

  const supabase = await createServiceClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("plan_id, stripe_subscription_id, status, survey_response")
    .eq("user_email", userEmail)
    .single();

  if (!data || data.plan_id === "free") {
    return NextResponse.json({
      subscribed: false,
      plan: "free",
      printLimit: FREE_TIER_PRINT_LIMIT,
    });
  }

  return NextResponse.json({
    subscribed: true,
    plan: data.plan_id,
    printLimit: null,
    subscriptionId: data.stripe_subscription_id,
    surveyResponse: data.survey_response || undefined,
  });
}
