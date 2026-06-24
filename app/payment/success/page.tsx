"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

type PlanInfo = {
  planId: string;
  planName: string;
  features: string[];
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [plan, setPlan] = useState<PlanInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/payment/success?session_id=${sessionId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((data) => setPlan(data))
      .catch(() => setError(true));
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="relative max-w-lg w-full text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-64 h-64 rounded-full bg-cyan blur-[100px]" />
        </div>

        <div className="relative p-10 rounded-2xl border border-white/10 bg-surface/50">
          <div className="mx-auto w-20 h-20 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-heading text-3xl font-bold mb-4">
            Welcome{plan ? ` to ${plan.planName}` : ""}!
          </h1>

          <p className="text-muted mb-4">
            Your subscription is active. You now have unlimited prints, priority turnaround, and all premium materials.
          </p>

          {plan?.features && (
            <ul className="text-left space-y-2 mb-6 max-w-sm mx-auto">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <svg className="w-4 h-4 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          )}

          {sessionId && (
            <p className="text-xs font-mono text-muted/50 mb-6">
              Session: {sessionId.slice(0, 20)}...
            </p>
          )}

          <div className="flex items-center gap-2 justify-center mb-6 text-cyan text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Subscription confirmed
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="flex-1 py-3 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/5 transition-all text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
