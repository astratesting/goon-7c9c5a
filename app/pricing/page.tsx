"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Compass from "@/components/Compass";
import PricingCard from "@/components/PricingCard";
import { PLANS } from "@/lib/plans";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center">
        <div className="flex justify-center mb-6">
          <Compass size={48} />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Choose your plan
        </h1>
        <p className="text-muted max-w-xl mx-auto">
          From single prototypes to unlimited production runs — pick the plan that fits your workflow.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-muted mb-4">Secure payments powered by Stripe. Cancel anytime.</p>
          <div className="flex justify-center gap-6 text-xs text-muted">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SSL Encrypted
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Cancel Anytime
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Instant Access
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
