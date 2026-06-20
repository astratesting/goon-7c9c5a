"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Settings</h1>
        <p className="text-muted text-sm mt-1">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile */}
      <form onSubmit={handleSave} className="bg-surface border border-white/5 rounded-xl p-6 space-y-6">
        <h2 className="font-heading text-lg font-semibold">Profile</h2>

        <div>
          <label className="block text-xs font-medium text-muted mb-1.5">Display Name</label>
          <input
            type="text"
            defaultValue={session?.user?.name || ""}
            className="w-full px-4 py-3 bg-ink border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/30 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
          <input
            type="email"
            defaultValue={session?.user?.email || ""}
            disabled
            className="w-full px-4 py-3 bg-ink/50 border border-white/5 rounded-xl text-sm text-muted cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-muted/50">Email cannot be changed in demo mode.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-sm text-cyan">Saved!</span>
          )}
        </div>
      </form>

      {/* Preferences */}
      <div className="bg-surface border border-white/5 rounded-xl p-6 space-y-6">
        <h2 className="font-heading text-lg font-semibold">Preferences</h2>

        <div className="flex items-center justify-between py-3 border-b border-white/5">
          <div>
            <p className="text-sm font-medium">Default Material</p>
            <p className="text-xs text-muted">Used when creating new projects</p>
          </div>
          <span className="text-sm text-muted font-mono">PLA</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-white/5">
          <div>
            <p className="text-sm font-medium">Default Layer Height</p>
            <p className="text-xs text-muted">Quality vs speed tradeoff</p>
          </div>
          <span className="text-sm text-muted font-mono">0.20mm</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium">Email Notifications</p>
            <p className="text-xs text-muted">Get notified when prints complete</p>
          </div>
          <div className="w-10 h-6 bg-indigo rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="bg-surface border border-white/5 rounded-xl p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold">Account</h2>
        <p className="text-sm text-muted">
          Signed in as <span className="text-white font-mono">{session?.user?.email}</span>
        </p>
        <div className="pt-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-cyan/10 text-cyan border border-cyan/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            Demo Account
          </span>
        </div>
      </div>
    </div>
  );
}
