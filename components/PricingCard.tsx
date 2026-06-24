"use client";

import { useState } from "react";
import { SubscriptionPlan } from "@/lib/plans";

interface PricingCardProps {
  plan: SubscriptionPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to start checkout");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const isPopular = plan.popular;

  return (
    <div
      className={`relative p-8 rounded-2xl border bg-surface/50 flex flex-col ${
        isPopular
          ? "border-indigo/40 ring-1 ring-indigo/30"
          : "border-white/5"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo to-purple rounded-full text-xs font-semibold text-white">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-heading text-xl font-semibold text-white mb-1">
          {plan.name}
        </h3>
        <p className="text-sm text-muted">
          {plan.printLimit
            ? `${plan.printLimit} prints per month`
            : "Unlimited prints"}
        </p>
      </div>

      <div className="mb-8">
        <span className="font-heading text-4xl font-bold text-white">
          {plan.monthlyLabel}
        </span>
        <span className="text-muted text-sm">/month</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <svg
              className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 ${
          isPopular
            ? "bg-gradient-to-r from-indigo to-purple hover:opacity-90 text-white"
            : "border border-white/10 hover:bg-white/5 text-white"
        }`}
      >
        {loading ? "Redirecting..." : "Subscribe Now"}
      </button>
    </div>
  );
}
