import React from "react";

export function Dots() {
  return (
    <button type="button" className="p-1.5 rounded hover:bg-gray-100 cursor-pointer">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
      </svg>
    </button>
  );
}
