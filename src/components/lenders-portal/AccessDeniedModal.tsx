import React from "react";
import { Modal } from "@hubtel/react-ui/modal";

export default function AccessDeniedModal() {
  return (
    <Modal
      type="alert"
      state="warning"
      header="Access denied"
      subtext="You don't have access to this page"
      trigger={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-500 cursor-not-allowed opacity-90"
          aria-disabled="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          MANAGEMENT RESTRICTED
        </button>
      }
      buttonGroup={{
        type: "stretch",
        primaryButton: {
          text: "Go back",
          onClick: () => globalThis.history.back(),
        },
        tertiaryButton: {
          text: "Report An Issue",
          onClick: () => {},
        },
      }}
    />
  );
}
