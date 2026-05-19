import React from "react";

export function Empty({ title = "No records found", description = "No data to display at the moment" }: { title?: string; description?: string }) {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-12 text-center">
      <div className="text-sm font-semibold text-gray-700 mb-1">{title}</div>
      <div className="text-xs text-gray-400">{description}</div>
    </div>
  );
}
