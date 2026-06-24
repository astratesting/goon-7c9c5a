import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";
import { PLANS } from "@/lib/plans";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "You must be signed in to subscribe" }, { status: 401 });
  }

  const { planId } = await req.json();

  const plan = PLANS.find((p) => p.id === planId);
  if (!plan || !plan.monthlyPrice) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const checkoutSession = await createCheckoutSession({
      email: session.user.email,
      planId: plan.id,
      planName: plan.name,
      monthlyPrice: plan.monthlyPrice,
      printLimit: plan.printLimit,
      origin,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Create checkout session error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
