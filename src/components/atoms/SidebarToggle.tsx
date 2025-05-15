
import React from 'react';

interface SidebarToggleProps {
  onClick: () => void;
}

const SidebarToggle = ({ onClick }: SidebarToggleProps) => {
  return (
    <button
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-gray-800 text-white focus:outline-none"
      onClick={onClick}
      aria-label="Toggle sidebar"
    >
      ☰
    </button>
  );
};

export default SidebarToggle;
