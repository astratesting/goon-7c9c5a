"use client";

import { useState } from "react";
import Link from "next/link";
import Compass from "@/components/Compass";
import Navbar from "@/components/Navbar";

const plans = [
  {
    name: "Standard",
    earlyPrice: 49,
    regularPrice: 79,
    priceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID || "price_standard_placeholder",
    features: [
      "Single custom 3D figurine",
      "Up to 3 selfie angles",
      "Standard 72-hour print & ship",
      "PLA material, 6-inch figure",
      "Full-color hand painting",
      "Protective display case",
    ],
    popular: false,
    accent: "indigo",
  },
  {
    name: "Premium",
    earlyPrice: 89,
    regularPrice: 149,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || "price_premium_placeholder",
    features: [
      "Single custom 3D figurine",
      "Up to 6 selfie angles for accuracy",
      "Priority 72-hour print & ship",
      "Premium resin, 8-inch figure",
      "Full-color hand painting + fine detail",
      "Protective display case",
      "Pose customization",
      "Revision round included",
    ],
    popular: true,
    accent: "purple",
  },
];

const faqs = [
  {
    q: "How does the figurine creation process work?",
    a: "Upload 2-6 selfies from different angles. Our AI generates a 3D model, which is then printed, hand-painted, and shipped to you within 72 hours. You'll receive tracking updates throughout.",
  },
  {
    q: "What if I'm not happy with my figurine?",
    a: "We stand behind our work. Premium plan includes a revision round. If there's a manufacturing defect on any plan, we'll reprint at no cost. Contact support within 14 days of delivery.",
  },
  {
    q: "Why is the early adopter pricing lower?",
    a: "We're in our founding phase and offering discounted rates to our first customers. These prices are locked in for your purchase — they won't increase later. Early adopter pricing will end once we move to public launch.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover) through our secure Stripe checkout. Your payment information is never stored on our servers.",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleCheckout(priceId: string, planName: string) {
    setLoading(planName);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
        setLoading(null);
      }
    } catch {
      alert("Network error. Please try again.");
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      {/* Hero section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-10">
          <Compass size={400} className="animate-spin-slow" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-white/10 mb-8">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-cyan">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-mono text-cyan">EARLY ADOPTER PRICING</span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            Lock in <span className="text-gradient">founding member</span> rates
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-4">
            Get your custom 3D figurine at early adopter pricing before public launch.
            These rates are available for a limited time — once they&apos;re gone, they&apos;re gone.
          </p>
          <p className="text-sm text-muted/60 font-mono">
            No subscription required · One-time payment · 72-hour turnaround
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="relative px-6 pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border bg-surface/50 transition-all hover:bg-surface/80 ${
                plan.popular
                  ? "border-purple/50 ring-1 ring-purple/20"
                  : "border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo to-purple rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              {/* Early Adopter badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                  plan.popular
                    ? "bg-purple/10 text-purple border border-purple/20"
                    : "bg-indigo/10 text-indigo border border-indigo/20"
                }`}>
                  EARLY ADOPTER
                </div>
                <span className="text-xs text-muted font-mono">
                  Save ${plan.regularPrice - plan.earlyPrice}
                </span>
              </div>

              <div className="mb-8">
                <h3 className="font-heading text-2xl font-bold mb-2">{plan.name} Figurine</h3>
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-5xl font-bold">${plan.earlyPrice}</span>
                  <span className="text-muted line-through text-xl">${plan.regularPrice}</span>
                </div>
                <p className="text-sm text-muted mt-2">One-time payment · Early adopter rate</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.popular ? "text-purple" : "text-cyan"
                    }`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.priceId, plan.name)}
                disabled={loading === plan.name}
                className={`block w-full text-center py-3.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo to-purple hover:opacity-90 glow-indigo"
                    : "border border-white/10 hover:bg-white/5 hover:border-white/20"
                }`}
              >
                {loading === plan.name ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Redirecting to checkout...
                  </span>
                ) : (
                  `Get ${plan.name} — $${plan.earlyPrice}`
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div className="max-w-4xl mx-auto mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure Stripe checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Payment encrypted end-to-end</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            <span>Manufacturing guarantee</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-mono text-indigo mb-4 block">FAQ</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Common <span className="text-gradient">questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl bg-surface/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-heading text-sm font-semibold pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center p-12 rounded-2xl border border-white/10 bg-surface/30">
          <h3 className="font-heading text-2xl font-bold mb-4">
            Ready to create your figurine?
          </h3>
          <p className="text-muted mb-6">
            Join our founding members and lock in early adopter pricing.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity glow-indigo"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Compass size={24} className="animate-spin-slow" />
            <span className="font-heading text-sm font-bold text-gradient">Goon</span>
          </div>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Goon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
