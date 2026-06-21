"use client";

import Compass from "./Compass";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />
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

        {/* Coming Soon badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan/30 bg-cyan/5 mb-8">
          <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-sm font-mono text-cyan tracking-widest uppercase">
            Coming Soon
          </span>
        </div>

        {/* Brand name */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
          <span className="text-gradient">Goon</span>
        </h1>

        {/* Tagline */}
        <p className="font-heading text-2xl md:text-3xl font-semibold text-white mb-8">
          Describe It. Print It. Ship It.
        </p>

        {/* Value prop */}
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Goon turns your ideas into ultra-detailed, full-color 3D prints — no
          modeling skills needed. Describe what you want, and we handle the
          design, printing, and shipping. Custom figurines for tabletop gamers,
          cosplayers, and makers, delivered to your door in 72 hours.
        </p>

        {/* Scroll hint */}
        <a
          href="#features"
          className="inline-flex items-center gap-2 text-sm text-muted/60 hover:text-cyan transition-colors"
        >
          <span>Learn more</span>
          <svg
            className="w-4 h-4 animate-bounce"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
