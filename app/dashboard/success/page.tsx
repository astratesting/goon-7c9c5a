"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardSuccessPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subInfo, setSubInfo] = useState<{ plan: string; survey?: string } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/stripe/check-subscription")
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data) {
            setSubInfo({ plan: data.plan || "free", survey: data.surveyResponse || undefined });
          }
        })
        .catch(() => {});
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-ink text-white px-6 py-16 flex items-center justify-center">
      <div className="relative max-w-lg w-full">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-64 h-64 rounded-full bg-cyan blur-[100px]" />
        </div>

        <div className="relative p-10 rounded-2xl border border-white/10 bg-surface/50">
          <div className="mx-auto w-20 h-20 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-heading text-3xl font-bold mb-2 text-center">
            Subscription Active{subInfo?.plan && subInfo.plan !== "free" ? ` — ${subInfo.plan.charAt(0).toUpperCase() + subInfo.plan.slice(1)}` : ""}
          </h1>
          <p className="text-muted text-center mb-8">
            Your account has been upgraded. You can now access all features included in your plan.
          </p>

          {subInfo?.survey && (
            <div className="mb-8 p-4 rounded-xl bg-ink border border-white/5">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Your feedback</p>
              <p className="text-sm text-white/80 italic">&ldquo;{subInfo.survey}&rdquo;</p>
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
              href="/pricing"
              className="flex-1 py-3 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/5 transition-all text-center"
            >
              Manage Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
