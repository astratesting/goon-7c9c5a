"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  mockPrintJobs,
  mockDesigns,
  mockStats,
} from "@/lib/demo-data";

const statusColors: Record<string, string> = {
  printing: "bg-cyan/10 text-cyan border-cyan/20",
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
  queued: "bg-purple/10 text-purple border-purple/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">
            Welcome back, {session?.user?.name || "Maker"}
          </h1>
          <p className="text-muted text-sm mt-1">
            Here&apos;s an overview of your prints and designs.
          </p>
        </div>
        <Link
          href="/dashboard/new-project"
          className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New Project
        </Link>
      </div>

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
