"use client";

import Link from "next/link";
import PricingCard from "@/components/PricingCard";
import { PLANS } from "@/lib/plans";

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
            No hidden fees. No surprise charges. Pick a plan that scales with your production needs.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
