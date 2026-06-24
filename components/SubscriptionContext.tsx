"use client";

import { useEffect, useState, createContext, useContext, useCallback, type ReactNode } from "react";

interface SubscriptionInfo {
  subscribed: boolean;
  plan: string;
  printLimit: number | null;
  subscriptionId?: string;
  surveyResponse?: string;
}

interface SubscriptionContextValue {
  subscription: SubscriptionInfo | null;
  loading: boolean;
  refresh: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue>({
  subscription: null,
  loading: true,
  refresh: () => {},
});

export function useSubscription() {
  return useContext(SubscriptionContext);
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(() => {
    fetch("/api/stripe/check-subscription")
      .then((res) => res.json())
      .then((data) => {
        setSubscription({
          subscribed: data.subscribed ?? false,
          plan: data.plan ?? "free",
          printLimit: data.printLimit ?? 1,
          subscriptionId: data.subscriptionId,
          surveyResponse: data.surveyResponse,
        });
      })
      .catch(() => {
        setSubscription({ subscribed: false, plan: "free", printLimit: 1 });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return (
    <SubscriptionContext.Provider value={{ subscription, loading, refresh: fetchSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
