"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SubscriptionStatus {
  subscribed: boolean;
  plan: string;
  printLimit: number | null;
}

export default function SubscriptionGuard({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stripe/check-subscription")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data);
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
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-ink/80 backdrop-blur-sm rounded-2xl">
        <div className="text-center max-w-md px-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-indigo/20 flex items-center justify-center">
            <svg className="w-7 h-7 text-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-heading font-bold text-white mb-2">
            Upgrade to continue
          </h3>
          <p className="text-sm text-muted mb-6">
            You&apos;re on the free tier. Upgrade to Starter or Pro for more prints and premium features.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo text-white font-semibold text-sm hover:bg-indigo/90 transition-colors"
          >
            View Plans
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
