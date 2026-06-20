"use client";

import Link from "next/link";
import { mockDesigns } from "@/lib/demo-data";

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Projects</h1>
          <p className="text-muted text-sm mt-1">
            Manage your 3D designs and upload new files.
          </p>
        </div>
        <Link
          href="/dashboard/new-project"
          className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDesigns.map((design) => (
          <div
            key={design.id}
            className="bg-surface border border-white/5 rounded-xl p-5 hover:border-indigo/20 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <span className="text-xs font-mono text-muted px-2 py-0.5 bg-surface-light rounded">{design.format}</span>
            </div>
            <h3 className="font-heading text-base font-semibold mb-1 group-hover:text-indigo transition-colors">
              {design.name}
            </h3>
            <p className="text-xs text-muted mb-4">
              {design.dimensions} &middot; {design.fileSize}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-xs text-muted">
                {design.printCount} print{design.printCount !== 1 ? "s" : ""}
              </span>
              <span className="text-xs text-muted/60">{design.lastModified}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
