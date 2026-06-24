"use client";

import { SessionProvider } from "next-auth/react";
import { SubscriptionProvider } from "@/components/SubscriptionContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SubscriptionProvider>{children}</SubscriptionProvider>
    </SessionProvider>
  );
}
