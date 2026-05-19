import React from "react";

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-5">
      <h4 className="text-2xl font-bold text-gray-900 mb-1">{value}</h4>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
