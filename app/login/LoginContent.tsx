"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Compass from "@/components/Compass";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const isDemo = searchParams.get("demo") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Auto-login demo user when ?demo=true
  useEffect(() => {
    if (isDemo && status === "unauthenticated") {
      setLoading(true);
      signIn("credentials", {
        email: "demo@demo.app",
        password: "demo123",
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          router.push("/dashboard");
        } else {
          setLoading(false);
          setError("Demo login failed. Please try again.");
        }
      });
    }
  }, [isDemo, status, router]);

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setLoading(false);
      setError("Invalid email or password. Try demo@demo.app / demo123");
    }
  }

  if (status === "loading" || (isDemo && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink">
        <div className="flex flex-col items-center gap-4">
          <Compass size={60} className="animate-spin-slow opacity-60" />
          <p className="text-muted text-sm font-mono">Signing in...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple/5 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <Compass size={36} className="animate-spin-slow" />
            <span className="font-heading text-2xl font-bold text-gradient">Goon</span>
          </Link>
        </div>

        {/* Auth card */}
        <div className="bg-surface border border-white/5 rounded-2xl p-8">
          <h1 className="font-heading text-2xl font-bold text-center mb-2">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted text-sm text-center mb-8">
            {mode === "login"
              ? "Sign in to access your dashboard"
              : "Get started with Goon"}
          </p>

          {/* Demo login button */}
          <button
            onClick={() => {
              setLoading(true);
              signIn("credentials", {
                email: "demo@demo.app",
                password: "demo123",
                redirect: false,
              }).then((res) => {
                if (res?.ok) {
                  router.push("/dashboard");
                } else {
                  setLoading(false);
                  setError("Demo login failed.");
                }
              });
            }}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-cyan/30 bg-cyan/5 text-cyan font-medium text-sm hover:bg-cyan/10 transition-colors mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            View Live Demo
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-muted/50 font-mono">OR</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Email/password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-muted mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-ink border border-white/10 rounded-xl text-sm text-white placeholder:text-muted/40 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/30 transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-muted mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3 bg-ink border border-white/10 rounded-xl text-sm text-white placeholder:text-muted/40 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/30 transition-all"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 glow-indigo"
            >
              {loading ? "Signing in..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Toggle login/signup */}
          <p className="mt-6 text-center text-sm text-muted">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
              className="text-cyan hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted hover:text-white transition-colors">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
