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
    id: "single",
    name: "Single",
    monthlyPrice: 2900,
    monthlyLabel: "$29",
    printLimit: 3,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "price_single_placeholder",
    features: [
      "3 custom prints per month",
      "PLA & PETG materials",
      "Standard 5-day turnaround",
      "Email support",
      "Basic pose options",
    ],
  },
  {
    id: "bundle",
    name: "Bundle",
    monthlyPrice: 7900,
    monthlyLabel: "$79",
    printLimit: 10,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_bundle_placeholder",
    popular: true,
    features: [
      "10 custom prints per month",
      "All materials (PLA, PETG, Resin, Nylon)",
      "Priority 48-hour turnaround",
      "Priority support",
      "Advanced pose customization",
      "Revision rounds included",
    ],
  },
  {
    id: "bulk",
    name: "Bulk",
    monthlyPrice: 11900,
    monthlyLabel: "$119",
    printLimit: null,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID || "price_bulk_placeholder",
    features: [
      "Unlimited custom prints",
      "All materials (PLA, PETG, Resin, Nylon)",
      "Priority 24-hour turnaround",
      "Dedicated account manager",
      "Commercial license",
      "Custom SLA & turnaround",
      "API access",
    ],
  },
];

export const FREE_TIER_PRINT_LIMIT = 1;
