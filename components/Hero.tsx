"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Compass from "./Compass";

export default function Hero() {
  const { data: session } = useSession();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Compass motif */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Compass size={120} className="animate-spin-slow opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-cyan rounded-full opacity-80" />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo/30 bg-indigo/5 mb-8">
          <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-sm font-mono text-cyan">Custom 3D Printing for Makers</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
          <span className="text-white">Describe it.</span>
          <br />
          <span className="text-gradient">Sketch it.</span>
          <br />
          <span className="text-white">Print it.</span>
        </h1>

        {/* Value prop */}
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Goon turns your ideas into physical objects. Upload a design or describe what you need
          — we handle the slicing, materials, and printing so you can focus on creating.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {session ? (
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-indigo to-purple rounded-xl text-lg font-semibold hover:opacity-90 transition-all glow-indigo"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-indigo to-purple rounded-xl text-lg font-semibold hover:opacity-90 transition-all glow-indigo"
              >
                Start Printing
              </Link>
              <Link
                href="/login?demo=true"
                className="px-8 py-4 border border-white/10 rounded-xl text-lg font-medium hover:bg-white/5 transition-all"
              >
                View Live Demo
              </Link>
            </>
          )}
        </div>

        {/* Trust line — honest, no fake metrics */}
        <p className="mt-12 text-sm text-muted/60">
          No account required to browse. Sign in to start your first print.
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
