"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSubscription } from "@/components/SubscriptionContext";

export default function SubscriptionPage() {
  const { data: session, status } = useSession();
  const { subscription, loading: subLoading } = useSubscription();
  const router = useRouter();
  const [managing, setManaging] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  async function handleManageBilling() {
    setManaging(true);
    try {
      const res = await fetch("/api/create-portal-session", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Could not open billing portal");
        setManaging(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setManaging(false);
    }
  }

  async function handleUpgrade() {
    setUpgrading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: "pro" }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to start checkout");
        setUpgrading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setUpgrading(false);
    }
  }

  if (status === "loading" || subLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-6 h-6 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const isSubscribed = subscription?.subscribed ?? false;
  const currentPlan = subscription?.plan ?? "free";

  const planDetails: Record<string, { name: string; price: string; features: string[] }> = {
    free: {
      name: "Free",
      price: "$0",
      features: [
        "1 print per month",
        "PLA material only",
        "Standard 5-day turnaround",
        "Community support",
      ],
    },
    starter: {
      name: "Starter",
      price: "$9.99/mo",
      features: [
        "3 custom prints per month",
        "PLA & PETG materials",
        "Standard 5-day turnaround",
        "Email support",
        "Basic pose options",
      ],
    },
    pro: {
      name: "Pro",
      price: "$29/mo",
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
  };

  const current = planDetails[currentPlan] || planDetails.free;

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-white">Subscription</h1>
        <p className="text-muted text-sm mt-1">Manage your plan and billing.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-surface border border-white/5 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted font-mono uppercase tracking-wider">Current Plan</p>
            <h2 className="text-2xl font-heading font-bold text-white mt-1">{current.name}</h2>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border ${
              isSubscribed
                ? "bg-cyan/10 text-cyan border-cyan/20"
                : "bg-white/5 text-muted border-white/10"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {isSubscribed ? "Active" : "Free"}
          </span>
        </div>

        <div className="mb-4">
          <span className="text-xl font-heading font-bold text-white">{current.price}</span>
          {isSubscribed && (
            <span className="text-muted text-sm ml-2">billed monthly</span>
          )}
        </div>

        <ul className="space-y-2 mb-6">
          {current.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
              <svg className="w-4 h-4 text-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {isSubscribed ? (
          <div className="flex gap-3">
            <button
              onClick={handleManageBilling}
              disabled={managing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo to-purple text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {managing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              Manage Billing
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleUpgrade}
              disabled={upgrading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo to-purple text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {upgrading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
              Subscribe to Pro — $29/month
            </button>
          </div>
        )}
      </div>

      {/* Plan Comparison */}
      <div className="bg-surface border border-white/5 rounded-xl p-6">
        <h3 className="font-heading text-lg font-bold text-white mb-4">All Plans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(planDetails).map(([id, plan]) => (
            <div
              key={id}
              className={`rounded-xl p-4 border ${
                id === currentPlan
                  ? "border-indigo/40 bg-indigo/5"
                  : "border-white/5"
              }`}
            >
              <p className="font-heading font-bold text-white text-sm">{plan.name}</p>
              <p className="text-cyan font-mono text-lg font-bold mt-1">{plan.price}</p>
              {id === currentPlan && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo/20 text-indigo border border-indigo/30">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-muted text-xs mt-4">
          Upgrade or downgrade anytime. Changes take effect at your next billing cycle.
        </p>
      </div>
    </div>
  );
}
