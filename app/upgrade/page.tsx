"use client";

import { useState } from "react";
import Link from "next/link";
import Compass from "@/components/Compass";

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: "pro" }),
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

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-8">
          <Compass size={56} className="animate-spin-slow opacity-60" />
        </div>

        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          Upgrade to Pro
        </h1>
        <p className="text-muted mb-8 leading-relaxed">
          Unlock AI generation, priority printing, and unlimited prints. Upgrade your account to access the full Goon experience.
        </p>

        <div className="bg-surface rounded-2xl border border-indigo/20 p-8 mb-8">
          <div className="mb-6">
            <span className="text-4xl font-heading font-bold text-cyan">$29</span>
            <span className="text-muted text-sm">/month</span>
          </div>
          <ul className="space-y-3 mb-8 text-left max-w-sm mx-auto">
            {[
              "Unlimited AI generation",
              "Unlimited prints",
              "Priority 48-hour turnaround",
              "All materials",
              "Priority support",
              "Commercial license",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                <svg className="w-4 h-4 text-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo to-purple text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Redirecting to checkout..." : "Upgrade to Pro — $29/mo"}
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-muted mb-8">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure payments via Stripe
          </span>
          <span>Cancel anytime</span>
        </div>

        <Link
          href="/dashboard"
          className="text-sm text-muted hover:text-white transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
