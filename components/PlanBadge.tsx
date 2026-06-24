"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PlanInfo {
  subscribed: boolean;
  plan: string;
}

const planStyles: Record<string, { label: string; bg: string; text: string; border: string }> = {
  free: {
    label: "Free",
    bg: "bg-white/5",
    text: "text-muted",
    border: "border-white/10",
  },
  starter: {
    label: "Starter",
    bg: "bg-purple/10",
    text: "text-purple",
    border: "border-purple/20",
  },
  pro: {
    label: "Pro",
    bg: "bg-cyan/10",
    text: "text-cyan",
    border: "border-cyan/20",
  },
  enterprise: {
    label: "Enterprise",
    bg: "bg-indigo/10",
    text: "text-indigo",
    border: "border-indigo/20",
  },
};

export default function PlanBadge({ showLink = false }: { showLink?: boolean }) {
  const [info, setInfo] = useState<PlanInfo | null>(null);

  useEffect(() => {
    fetch("/api/stripe/check-subscription")
      .then((res) => res.json())
      .then((data) => setInfo({ subscribed: data.subscribed, plan: data.plan || "free" }))
      .catch(() => setInfo({ subscribed: false, plan: "free" }));
  }, []);

  if (!info) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-muted">
        ...
      </span>
    );
  }

  const style = planStyles[info.plan] || planStyles.free;
  const badge = (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${style.bg} ${style.text} ${style.border}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {style.label}
    </span>
  );

  if (showLink && !info.subscribed) {
    return (
      <Link href="/pricing" className="hover:opacity-80 transition-opacity">
        {badge}
      </Link>
    );
  }

  return badge;
}
