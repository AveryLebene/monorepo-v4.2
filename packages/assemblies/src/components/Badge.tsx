import React from "react";

const variants: Record<string, string> = {
  success: "text-emerald-700 bg-emerald-50 border-emerald-200",
  failed: "text-red-600 bg-red-50 border-red-200",
  pending: "text-amber-600 bg-amber-50 border-amber-200",
};

export function Badge({ variant = "pending", children }: { variant?: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${variants[variant] ?? variants.pending}`}>
      {children}
    </span>
  );
}
