import React from "react";

export function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
      {children}
    </td>
  );
}
