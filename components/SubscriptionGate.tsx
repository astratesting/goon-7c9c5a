"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SubscriptionStatus {
  subscribed: boolean;
  plan: string;
}

export default function SubscriptionGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/stripe/check-subscription")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data);
        setLoading(false);
        if (data.subscribed) return;
        router.replace("/upgrade");
      })
      .catch(() => {
        setStatus({ subscribed: false, plan: "free" });
        setLoading(false);
        router.replace("/upgrade");
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-6 h-6 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!status?.subscribed) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <p className="text-muted text-sm mb-4">Redirecting to upgrade...</p>
          <Link href="/upgrade" className="text-indigo text-sm hover:underline">
            Go to Upgrade Page
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
