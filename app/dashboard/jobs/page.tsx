"use client";

import Link from "next/link";
import { mockPrintJobs } from "@/lib/demo-data";

const statusColors: Record<string, string> = {
  printing: "bg-cyan/10 text-cyan border-cyan/20",
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
  queued: "bg-purple/10 text-purple border-purple/20",
  failed: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Print Jobs</h1>
          <p className="text-muted text-sm mt-1">
            Track the status of all your print jobs.
          </p>
        </div>
        <Link
          href="/dashboard/new-project"
          className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New Job
        </Link>
      </div>

      <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs font-mono text-muted px-5 py-3">Name</th>
              <th className="text-left text-xs font-mono text-muted px-5 py-3">Status</th>
              <th className="text-left text-xs font-mono text-muted px-5 py-3">Material</th>
              <th className="text-left text-xs font-mono text-muted px-5 py-3 hidden md:table-cell">Layer Height</th>
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
                <td className="px-5 py-4 text-sm text-muted">
                  {job.material} &middot; {job.color}
                </td>
                <td className="px-5 py-4 text-sm text-muted hidden md:table-cell font-mono text-xs">
                  {job.layerHeight}
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
  );
}
