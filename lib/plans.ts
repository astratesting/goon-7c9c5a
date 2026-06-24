export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number; // cents
  monthlyLabel: string;
  features: string[];
  printLimit: number | null; // null = unlimited
  stripePriceId: string; // env var name
  popular?: boolean;
}

export const PLANS: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 999,
    monthlyLabel: "$9.99",
    printLimit: 3,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "price_starter_placeholder",
    features: [
      "3 custom prints per month",
      "PLA & PETG materials",
      "Standard 5-day turnaround",
      "Email support",
      "Basic pose options",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 2999,
    monthlyLabel: "$29.99",
    printLimit: null,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_pro_placeholder",
    popular: true,
    features: [
      "Unlimited custom prints",
      "All materials (PLA, PETG, Resin, Nylon)",
      "Priority 48-hour turnaround",
      "Priority support",
      "Advanced pose customization",
      "Revision rounds included",
      "Commercial license",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 0,
    monthlyLabel: "Custom",
    printLimit: null,
    stripePriceId: "",
    features: [
      "Everything in Pro",
      "Volume discounts",
      "Dedicated account manager",
      "Custom SLA & turnaround",
      "API access",
      "Team management",
      "Invoice billing",
    ],
  },
];

export const FREE_TIER_PRINT_LIMIT = 1;
