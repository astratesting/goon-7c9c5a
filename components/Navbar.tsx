"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Compass from "./Compass";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Compass size={32} className="animate-spin-slow" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">
            <span className="text-gradient">Goon</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm text-muted hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-muted hover:text-white transition-colors">
            FAQ
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-muted hover:text-white transition-colors">
                Sign in
              </Link>
              <Link
                href="/login"
                className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-muted hover:text-white"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <a href="#features" onClick={() => setMobileOpen(false)} className="text-sm text-muted hover:text-white">
            Features
          </a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-sm text-muted hover:text-white">
            How It Works
          </a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="text-sm text-muted hover:text-white">
            Pricing
          </a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="text-sm text-muted hover:text-white">
            FAQ
          </a>
          <hr className="border-white/5" />
          {session ? (
            <Link href="/dashboard" className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-lg text-sm font-semibold text-center">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-lg text-sm font-semibold text-center">
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
