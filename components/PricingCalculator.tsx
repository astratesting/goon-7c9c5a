"use client";

import { useState } from "react";

const materials = [
  {
    name: "PLA",
    description: "Easy to print, great for prototypes and decorative items",
    prices: { small: [3, 8], medium: [8, 18], large: [18, 45] },
    color: "indigo",
  },
  {
    name: "Resin",
    description: "High detail, smooth finish — perfect for miniatures and figurines",
    prices: { small: [5, 12], medium: [12, 28], large: [28, 65] },
    color: "purple",
  },
  {
    name: "Nylon",
    description: "Strong and flexible, ideal for functional parts and cosplay",
    prices: { small: [8, 15], medium: [15, 35], large: [35, 80] },
    color: "cyan",
  },
];

const sizes = ["small", "medium", "large"] as const;
const sizeLabels: Record<string, string> = {
  small: "Small (~5 cm)",
  medium: "Medium (~10 cm)",
  large: "Large (~20 cm)",
};

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  indigo: {
    border: "border-indigo/30",
    bg: "bg-indigo/10",
    text: "text-indigo",
    glow: "glow-indigo",
  },
  purple: {
    border: "border-purple/30",
    bg: "bg-purple/10",
    text: "text-purple",
    glow: "glow-purple",
  },
  cyan: {
    border: "border-cyan/30",
    bg: "bg-cyan/10",
    text: "text-cyan",
    glow: "glow-cyan",
  },
};

export default function PricingCalculator() {
  const [sizeIdx, setSizeIdx] = useState(1);

  return (
    <section className="rounded-2xl border border-surface-light bg-surface p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold text-white">
            Instant Price Estimate
          </h3>
          <p className="mt-1 text-sm text-muted">
            Get a ballpark figure before you upload
          </p>
        </div>
        <a
          href="/dashboard/upload"
          className="rounded-lg bg-indigo px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo/80"
        >
          Get Exact Quote
        </a>
      </div>

      {/* Size slider */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-muted">
            Approximate Size
          </span>
          <span className="font-mono text-sm text-white">
            {sizeLabels[sizes[sizeIdx]]}
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={sizeIdx}
            onChange={(e) => setSizeIdx(Number(e.target.value))}
            className="slider-goon w-full"
          />
          <div className="mt-2 flex justify-between text-xs text-muted">
            {sizes.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setSizeIdx(i)}
                className={`${i === sizeIdx ? "text-indigo" : ""}`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Material cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {materials.map((mat) => {
          const c = colorMap[mat.color];
          const range = mat.prices[sizes[sizeIdx]];
          return (
            <div
              key={mat.name}
              className={`rounded-xl border ${c.border} ${c.bg} p-4 transition-all hover:border-opacity-60`}
            >
              <h4 className={`font-heading text-base font-semibold ${c.text}`}>
                {mat.name}
              </h4>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                {mat.description}
              </p>
              <div className="mt-4">
                <span className="text-xs uppercase tracking-wider text-muted">
                  Estimated
                </span>
                <p className="font-mono text-xl font-semibold text-white">
                  ${range[0]} – ${range[1]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Estimates based on typical prints. Final price depends on geometry,
        material, and quantity.
      </p>
    </section>
  );
}
