"use client";

import Link from "next/link";
import Compass from "@/components/Compass";
import PricingCard from "@/components/PricingCard";
import { PLANS } from "@/lib/plans";

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Compass size={48} className="animate-spin-slow opacity-60" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Upgrade your plan
          </h1>
          <p className="text-muted max-w-xl mx-auto">
            Unlock priority printing, more materials, and higher print limits. Pick the plan that fits your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-muted mb-4">Secure payments powered by Stripe. Cancel anytime.</p>
          <p className="text-xs text-muted">Use test card <span className="font-mono text-cyan">4242 4242 4242 4242</span> in test mode.</p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="text-sm text-muted hover:text-white transition-colors"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
