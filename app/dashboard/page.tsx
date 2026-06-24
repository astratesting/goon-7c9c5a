"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  mockPrintJobs,
  mockDesigns,
  mockStats,
} from "@/lib/demo-data";
import PricingCalculator from "@/components/PricingCalculator";
import { FREE_TIER_PRINT_LIMIT } from "@/lib/plans";

/* ------------------------------------------------------------------ */
/*  Empty state sample data                                            */
/* ------------------------------------------------------------------ */
const sampleProjects = [
  {
    name: "Custom Miniature",
    description: "A detailed tabletop gaming miniature — perfect for D&D or Warhammer campaigns.",
    format: "STL",
    size: "32 mm scale",
    gradient: "from-indigo to-purple",
    icon: (
      <svg className="w-8 h-8 text-indigo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: "Cosplay Prop Blade",
    description: "A lightweight cosplay sword with internal channels for LED wiring.",
    format: "OBJ",
    size: "60 cm long",
    gradient: "from-purple to-cyan",
    icon: (
      <svg className="w-8 h-8 text-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="14.5 2 17.5 5 7.5 15 4.5 18 2 14.5 12 4.5" />
        <line x1="2" y1="22" x2="7" y2="17" />
        <line x1="14" y1="10" x2="18" y2="14" />
      </svg>
    ),
  },
  {
    name: "Desk Cable Gadget",
    description: "A snap-fit cable organizer for your workspace — functional and clean.",
    format: "3MF",
    size: "8 × 4 × 3 cm",
    gradient: "from-cyan to-indigo",
    icon: (
      <svg className="w-8 h-8 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 7V5a4 4 0 0 0-8 0v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Guided tour steps                                                  */
/* ------------------------------------------------------------------ */
const tourSteps = [
  {
    title: "Upload your design",
    body: "Drag & drop an STL, OBJ, 3MF, or STEP file. We accept files up to 100 MB and support all major CAD exports.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    title: "We review & quote",
    body: "Our team checks your file for printability and sends back a detailed quote with material options — usually within 24 hours.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "Receive your print",
    body: "Approve the quote, and we print & ship. Track progress in real-time from your dashboard.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const statusColors: Record<string, string> = {
  printing: "bg-cyan/10 text-cyan border-cyan/20",
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
  queued: "bg-purple/10 text-purple border-purple/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [subscribed, setSubscribed] = useState(true); // default true to avoid flash

  useEffect(() => {
    fetch("/api/stripe/check-subscription")
      .then((r) => r.json())
      .then((d) => setSubscribed(d.subscribed))
      .catch(() => {});
  }, []);

  const hasActivity = mockStats.totalPrints > 0;
  const printsUsed = mockStats.totalPrints;
  const hitFreeLimit = !subscribed && printsUsed >= FREE_TIER_PRINT_LIMIT;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">
            {hasActivity
              ? `Welcome back, ${session?.user?.name || "Maker"}`
              : `Welcome to Goon, ${session?.user?.name || "Maker"}`}
          </h1>
          <p className="text-muted text-sm mt-1">
            {hasActivity
              ? "Here's an overview of your prints and designs."
              : "Let's get your first print started."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!hasActivity && (
            <button
              type="button"
              onClick={() => { setTourOpen(true); setTourStep(0); }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-indigo border border-indigo/30 hover:bg-indigo/10 transition-colors"
            >
              How it works
            </button>
          )}
          <Link
            href={hasActivity ? "/dashboard/new-project" : "/dashboard/upload"}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {hasActivity ? "+ New Project" : "Start Your First Print"}
          </Link>
        </div>
      </div>

      {/* Free tier limit paywall */}
      {hitFreeLimit && (
        <div className="bg-gradient-to-r from-indigo/10 to-purple/10 border border-indigo/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo/20 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-bold text-white">You&apos;ve used your free print</h3>
            <p className="text-sm text-muted mt-0.5">
              Free tier includes {FREE_TIER_PRINT_LIMIT} print per month. Upgrade to Starter ($9.99/mo) for 3 prints or Pro ($29.99/mo) for unlimited.
            </p>
          </div>
          <Link
            href="/pricing"
            className="px-5 py-2.5 bg-indigo text-white rounded-xl text-sm font-semibold hover:bg-indigo/90 transition-colors shrink-0"
          >
            Upgrade Plan
          </Link>
        </div>
      )}

      {/* ---- EMPTY STATE ---- */}
      {!hasActivity && (
        <>
          {/* 3-step guide */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tourSteps.map((s, i) => (
              <div
                key={s.title}
                className="bg-surface border border-white/5 rounded-xl p-5 relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo/10 flex items-center justify-center">
                  <span className="text-xs font-mono text-indigo">{i + 1}</span>
                </div>
                <div className={`mb-3 w-10 h-10 rounded-lg flex items-center justify-center ${
                  i === 0 ? "bg-indigo/10 text-indigo" : i === 1 ? "bg-purple/10 text-purple" : "bg-cyan/10 text-cyan"
                }`}>
                  {s.icon}
                </div>
                <h3 className="font-heading text-sm font-semibold mb-1">{s.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Sample projects */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-heading text-xl font-semibold">Sample Projects</h2>
              <span className="px-2 py-0.5 rounded-full bg-surface-light text-xs font-mono text-muted border border-white/5">
                Examples
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sampleProjects.map((p) => (
                <div
                  key={p.name}
                  className="bg-surface border border-white/5 rounded-xl p-5 hover:border-indigo/20 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center opacity-80`}>
                      {p.icon}
                    </div>
                    <span className="text-xs font-mono text-muted">{p.format}</span>
                  </div>
                  <h3 className="font-heading text-sm font-semibold mb-1 group-hover:text-indigo transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted mb-3 leading-relaxed">{p.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted/60">
                    <span>{p.size}</span>
                    <span className="italic">Sample</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/dashboard/upload"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Start Your First Print
              </Link>
            </div>
          </div>

          {/* Pricing calculator */}
          <PricingCalculator />
        </>
      )}

      {/* ---- POPULATED STATE (existing) ---- */}
      {hasActivity && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Designs" value={mockStats.totalDesigns} icon="cube" />
            <StatCard label="Total Prints" value={mockStats.totalPrints} icon="printer" />
            <StatCard label="Active Prints" value={mockStats.activePrints} icon="spinner" />
            <StatCard label="Total Spent" value={`$${mockStats.totalSpent}`} icon="dollar" />
          </div>

          {/* Recent prints */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-semibold">Recent Print Jobs</h2>
              <Link href="/dashboard/jobs" className="text-sm text-cyan hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-xs font-mono text-muted px-5 py-3">Name</th>
                    <th className="text-left text-xs font-mono text-muted px-5 py-3">Status</th>
                    <th className="text-left text-xs font-mono text-muted px-5 py-3 hidden md:table-cell">Material</th>
                    <th className="text-left text-xs font-mono text-muted px-5 py-3 hidden lg:table-cell">Dimensions</th>
                    <th className="text-right text-xs font-mono text-muted px-5 py-3">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPrintJobs.map((job) => (
                    <tr key={job.id} className="border-b border-white/5 last:border-0 hover:bg-surface-light/50 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium">{job.name}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${statusColors[job.status]}`}>
                          {job.status === "printing" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          )}
                          {job.status}
                        </span>
                        {job.status === "printing" && (
                          <div className="mt-1.5 w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cyan rounded-full transition-all"
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm text-muted hidden md:table-cell">
                        {job.material} &middot; {job.color}
                      </td>
                      <td className="px-5 py-4 text-sm text-muted hidden lg:table-cell font-mono text-xs">
                        {job.dimensions}
                      </td>
                      <td className="px-5 py-4 text-sm text-right font-mono">
                        ${job.cost.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent designs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-semibold">Your Designs</h2>
              <Link href="/dashboard/projects" className="text-sm text-cyan hover:underline">
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockDesigns.slice(0, 3).map((design) => (
                <div
                  key={design.id}
                  className="bg-surface border border-white/5 rounded-xl p-5 hover:border-indigo/20 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                    <span className="text-xs font-mono text-muted">{design.format}</span>
                  </div>
                  <h3 className="font-heading text-sm font-semibold mb-1 group-hover:text-indigo transition-colors">
                    {design.name}
                  </h3>
                  <p className="text-xs text-muted mb-3">
                    {design.dimensions} &middot; {design.fileSize}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted/60">
                    <span>{design.printCount} print{design.printCount !== 1 ? "s" : ""}</span>
                    <span>{design.lastModified}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ---- GUIDED TOUR OVERLAY ---- */}
      {tourOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={() => setTourOpen(false)}
          />
          {/* Modal */}
          <div className="relative bg-surface border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setTourOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {tourSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= tourStep ? "bg-indigo" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Step content */}
            <div className={`mb-3 w-12 h-12 rounded-xl flex items-center justify-center ${
              tourStep === 0 ? "bg-indigo/10 text-indigo" : tourStep === 1 ? "bg-purple/10 text-purple" : "bg-cyan/10 text-cyan"
            }`}>
              {tourSteps[tourStep].icon}
            </div>
            <h2 className="font-heading text-xl font-bold mb-2">
              Step {tourStep + 1}: {tourSteps[tourStep].title}
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8">
              {tourSteps[tourStep].body}
            </p>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setTourStep(Math.max(0, tourStep - 1))}
                disabled={tourStep === 0}
                className="px-4 py-2 text-sm text-muted hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                &larr; Previous
              </button>
              {tourStep < tourSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setTourStep(tourStep + 1)}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Next &rarr;
                </button>
              ) : (
                <Link
                  href="/dashboard/upload"
                  onClick={() => setTourOpen(false)}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Upload Your Design
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  const iconPaths: Record<string, JSX.Element> = {
    cube: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    printer: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    ),
    spinner: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
      </svg>
    ),
    dollar: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  };

  return (
    <div className="bg-surface border border-white/5 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-muted">{label}</span>
        <div className="text-indigo">{iconPaths[icon]}</div>
      </div>
      <p className="font-heading text-2xl font-bold">{value}</p>
    </div>
  );
}
