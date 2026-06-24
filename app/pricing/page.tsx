"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Compass from "@/components/Compass";

const FREE_FEATURES = [
  "Basic 3D print ordering",
  "3 prints per month",
  "PLA material only",
  "Standard 7-day turnaround",
  "Community support",
];

const PRO_FEATURES = [
  "Unlimited AI generation",
  "Unlimited prints",
  "Priority 48-hour turnaround",
  "All materials (PLA, PETG, Resin, Nylon)",
  "Priority support",
  "Commercial license",
];

export default function PricingPage() {
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
          Start free, then upgrade when you&apos;re ready for unlimited AI generation and priority printing.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="bg-surface rounded-2xl border border-white/5 p-8 flex flex-col">
            <h3 className="text-lg font-heading font-bold text-white mb-1">Free</h3>
            <p className="text-sm text-muted mb-6">For hobbyists getting started</p>
            <div className="mb-6">
              <span className="text-4xl font-heading font-bold text-white">$0</span>
              <span className="text-muted text-sm">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 text-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="block text-center py-3 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-surface-light transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-surface rounded-2xl border-2 border-indigo/40 p-8 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo text-white text-xs font-bold">
              Most Popular
            </div>
            <h3 className="text-lg font-heading font-bold text-white mb-1">Pro</h3>
            <p className="text-sm text-muted mb-6">For creators who need unlimited prints</p>
            <div className="mb-6">
              <span className="text-4xl font-heading font-bold text-cyan">$29</span>
              <span className="text-muted text-sm">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                  <svg className="w-4 h-4 text-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo to-purple text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Redirecting..." : "Subscribe Now"}
            </button>
          </div>
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
