"use client";

import { Suspense } from "react";
import Compass from "@/components/Compass";
import LoginContent from "./LoginContent";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-ink">
          <div className="flex flex-col items-center gap-4">
            <Compass size={60} className="animate-spin-slow opacity-60" />
            <p className="text-muted text-sm font-mono">Loading...</p>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
