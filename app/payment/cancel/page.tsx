"use client";

import Link from "next/link";
import Compass from "@/components/Compass";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="relative max-w-lg w-full text-center">
        <div className="p-10 rounded-2xl border border-white/10 bg-surface/50">
          <div className="mx-auto w-20 h-20 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center mb-6">
            <Compass size={40} />
          </div>

          <h1 className="font-heading text-3xl font-bold mb-4">
            Payment Cancelled
          </h1>

          <p className="text-muted mb-8">
            No worries — your card wasn&apos;t charged. You can retry whenever you&apos;re ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="flex-1 py-3 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Try Again
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
