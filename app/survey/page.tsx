"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Compass from "@/components/Compass";

function SurveyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [planName, setPlanName] = useState<string>("");
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/payment/success?session_id=${sessionId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.planName) setPlanName(data.planName);
      })
      .catch(() => {});
  }, [sessionId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId || !answer.trim()) return;

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, answer: answer.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center p-10 rounded-2xl border border-white/10 bg-surface/50">
          <h1 className="font-heading text-3xl font-bold mb-4">Missing Session</h1>
          <p className="text-muted mb-6">No session ID found. Please complete a purchase first.</p>
          <Link
            href="/pricing"
            className="inline-block py-3 px-6 bg-indigo text-white rounded-xl text-sm font-semibold hover:bg-indigo/90 transition-colors"
          >
            View Plans
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
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
            <h1 className="font-heading text-3xl font-bold mb-4">Thanks for subscribing{planName ? ` to ${planName}` : ""}!</h1>
            <p className="text-muted mb-8">Your feedback helps us build better tools for makers like you.</p>
            <Link
              href="/dashboard/success"
              className="inline-block py-3 px-6 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="relative max-w-lg w-full">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-64 h-64 rounded-full bg-indigo blur-[100px]" />
        </div>

        <div className="relative p-10 rounded-2xl border border-white/10 bg-surface/50">
          <div className="flex justify-center mb-6">
            <Compass size={40} />
          </div>

          <h1 className="font-heading text-3xl font-bold mb-2 text-center">Welcome{planName ? ` to ${planName}` : ""}!</h1>
          <p className="text-muted text-center mb-8">Quick question — help us understand you better.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Why did you decide to subscribe today?
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                placeholder="Tell us what convinced you..."
                className="w-full bg-ink border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-muted focus:outline-none focus:border-indigo/50 resize-none transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting || !answer.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
              <Link
                href="/dashboard/success"
                className="py-3 px-5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/5 transition-all text-center text-muted"
              >
                Skip
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SurveyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ink flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SurveyContent />
    </Suspense>
  );
}
