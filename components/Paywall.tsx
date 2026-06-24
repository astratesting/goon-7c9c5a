"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SubscriptionInfo {
  subscribed: boolean;
  plan: string;
  printLimit: number | null;
}

interface PaywallProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Paywall({ children, title, description }: PaywallProps) {
  const [status, setStatus] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stripe/check-subscription")
      .then((res) => res.json())
      .then((data) => {
        setStatus({
          subscribed: data.subscribed ?? false,
          plan: data.plan ?? "free",
          printLimit: data.printLimit ?? 1,
        });
        setLoading(false);
      })
      .catch(() => {
        setStatus({ subscribed: false, plan: "free", printLimit: 1 });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-6 h-6 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status?.subscribed) {
    return <>{children}</>;
  }

  return (
    <div className="bg-surface border border-indigo/20 rounded-2xl p-8 text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-indigo/20 flex items-center justify-center">
        <svg className="w-7 h-7 text-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h3 className="text-lg font-heading font-bold text-white mb-2">
        {title || "Subscribe to Goon Pro — $29/month"}
      </h3>
      <p className="text-sm text-muted mb-6 max-w-md mx-auto">
        {description || "Unlock unlimited prints, all materials, priority turnaround, and premium features with Goon Pro."}
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link
          href="/upgrade"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo to-purple text-white font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Subscribe to Pro
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <Link
          href="/dashboard/subscription"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-surface-light transition-colors"
        >
          View Plans
        </Link>
      </div>
    </div>
  );
}
