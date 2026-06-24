"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Compass from "@/components/Compass";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // In production, you'd verify the session server-side
      setVerified(true);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="relative max-w-lg w-full text-center">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-64 h-64 rounded-full bg-cyan blur-[100px]" />
        </div>

        <div className="relative p-10 rounded-2xl border border-white/10 bg-surface/50">
          {/* Success icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-heading text-3xl font-bold mb-4">
            Payment Successful
          </h1>

          <p className="text-muted mb-2">
            Thank you for your order! Your custom figurine is now in the queue.
          </p>

          {sessionId && (
            <p className="text-xs font-mono text-muted/50 mb-6">
              Session: {sessionId.slice(0, 20)}...
            </p>
          )}

          {verified && (
            <div className="bg-surface-light/50 border border-white/5 rounded-xl p-4 mb-8 text-left">
              <h3 className="font-heading text-sm font-semibold mb-3">What happens next:</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-cyan mt-0.5">1.</span>
                  <span>You&apos;ll receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan mt-0.5">2.</span>
                  <span>Upload your selfies from your dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan mt-0.5">3.</span>
                  <span>We&apos;ll 3D print, paint, and ship within 72 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan mt-0.5">4.</span>
                  <span>Track your order in the dashboard</span>
                </li>
              </ul>
            </div>
          )}

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

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ink flex items-center justify-center">
          <div className="text-center">
            <Compass size={48} className="animate-spin-slow mx-auto mb-4" />
            <p className="text-muted text-sm">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
