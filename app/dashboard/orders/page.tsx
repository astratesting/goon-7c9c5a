"use client";

import Link from "next/link";
import SubscriptionGate from "@/components/SubscriptionGate";

const mockOrders = [
  { id: "ORD-001", name: "Dragon Figurine", status: "completed", date: "2026-06-10", cost: 24.99 },
  { id: "ORD-002", name: "Phone Stand v3", status: "printing", date: "2026-06-18", cost: 12.50, progress: 72 },
  { id: "ORD-003", name: "Gear Mechanism", status: "queued", date: "2026-06-20", cost: 18.00 },
];

const statusColors: Record<string, string> = {
  printing: "bg-cyan/10 text-cyan border-cyan/20",
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
  queued: "bg-purple/10 text-purple border-purple/20",
};

export default function OrdersPage() {
  return (
    <SubscriptionGate>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">My Orders</h1>
            <p className="text-muted text-sm mt-1">
              Track your print orders and their status.
            </p>
          </div>
          <Link
            href="/dashboard/upload"
            className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            + New Order
          </Link>
        </div>

        <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs font-mono text-muted px-5 py-3">Order ID</th>
                <th className="text-left text-xs font-mono text-muted px-5 py-3">Name</th>
                <th className="text-left text-xs font-mono text-muted px-5 py-3">Status</th>
                <th className="text-left text-xs font-mono text-muted px-5 py-3 hidden md:table-cell">Date</th>
                <th className="text-right text-xs font-mono text-muted px-5 py-3">Cost</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 last:border-0 hover:bg-surface-light/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono text-muted">{order.id}</td>
                  <td className="px-5 py-4 text-sm font-medium">{order.name}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${statusColors[order.status]}`}>
                      {order.status === "printing" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      )}
                      {order.status}
                    </span>
                    {order.status === "printing" && "progress" in order && (
                      <div className="mt-1.5 w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan rounded-full" style={{ width: `${order.progress}%` }} />
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted hidden md:table-cell font-mono text-xs">{order.date}</td>
                  <td className="px-5 py-4 text-sm text-right font-mono">${order.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SubscriptionGate>
  );
}
