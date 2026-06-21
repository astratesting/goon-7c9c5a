"use client";

import { useState } from "react";
import Compass from "./Compass";

export default function Waitlist() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Compass accent */}
        <div className="flex justify-center mb-8">
          <Compass size={80} className="animate-spin-slow opacity-30" />
        </div>

        <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">
          Be first in <span className="text-gradient">line</span>
        </h2>
        <p className="text-lg text-muted max-w-xl mx-auto mb-10">
          Join the waitlist to get early access when Goon launches. No
          commitment, no spam — just a heads up when we&apos;re ready for you.
        </p>

        {/* Email form */}
        <WaitlistForm />
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  function validateEmail(e: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-cyan/30 bg-cyan/5">
        <svg
          className="w-5 h-5 text-cyan"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-cyan font-medium">
          You&apos;re on the list! We&apos;ll be in touch.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto"
    >
      <div className="flex-1 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setErrorMsg("");
            }
          }}
          placeholder="you@example.com"
          className="w-full px-5 py-3.5 bg-surface border border-white/10 rounded-xl text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/30 transition-all"
          disabled={status === "loading"}
        />
        {status === "error" && errorMsg && (
          <p className="mt-1 text-xs text-red-400">{errorMsg}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-8 py-3.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap glow-indigo disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                opacity="0.25"
              />
              <path
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                fill="currentColor"
                opacity="0.75"
              />
            </svg>
            Joining...
          </span>
        ) : (
          "Join the Waitlist"
        )}
      </button>
    </form>
  );
}
