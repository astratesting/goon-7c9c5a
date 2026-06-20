"use client";

import Link from "next/link";

const plans = [
  {
    name: "Maker",
    description: "For hobbyists and occasional prints",
    price: "Pay per print",
    features: [
      "Up to 5 active designs",
      "PLA and PETG materials",
      "Standard resolution (0.2mm)",
      "Email support",
      "7-day delivery",
    ],
    cta: "Get Started",
    popular: false,
    color: "border-white/10",
  },
  {
    name: "Pro",
    description: "For serious makers and small teams",
    price: "$29/mo",
    features: [
      "Unlimited designs",
      "All materials including Nylon & TPU",
      "High resolution (0.08mm)",
      "Priority print queue",
      "3-day delivery",
      "Real-time print tracking",
    ],
    cta: "Start Pro Trial",
    popular: true,
    color: "border-indigo/50",
  },
  {
    name: "Workshop",
    description: "For studios and maker spaces",
    price: "$99/mo",
    features: [
      "Everything in Pro",
      "Team collaboration (up to 10)",
      "API access for automation",
      "Dedicated print capacity",
      "Next-day delivery",
      "Custom material sourcing",
    ],
    cta: "Contact Us",
    popular: false,
    color: "border-cyan/30",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-indigo mb-4 block">PRICING</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Simple, transparent <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            No hidden fees. No surprise charges. Pay for what you print, or subscribe for better rates.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-2xl border ${plan.color} bg-surface/50 ${
                plan.popular ? "ring-1 ring-indigo/30" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo to-purple rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="font-heading text-3xl font-bold">{plan.price}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo to-purple hover:opacity-90"
                    : "border border-white/10 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
