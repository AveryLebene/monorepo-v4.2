import React from "react";

interface SidebarToggleProps {
  isOpen?: boolean;
  onClick: () => void;
}

const SidebarToggle = ({ isOpen, onClick }: SidebarToggleProps) => {
  return (
    <button
      className="lg:hidden fixed top-7 left-4 z-50 rounded-lg text-black focus:outline-none"
      onClick={onClick}
      aria-label="Toggle sidebar"
      // style={{ backgroundColor: "var(--sidebar-bg, #376e8e)" }}
    >
      {isOpen ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      )}
    </button>
  );
};

export default SidebarToggle;
