import React from "react";

interface DropdownMenuItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
  /** Called when the item is clicked (e.g. to close the dropdown) */
  onSelect?: () => void;
  className?: string;
}

export default function DropdownMenuItem({
  label,
  href,
  onClick,
  onSelect,
  className = "",
}: Readonly<DropdownMenuItemProps>) {
  const baseClass =
    "block w-full px-4 py-2.5 text-left text-sm transition-colors rounded-none first:rounded-t-none last:rounded-b-none";
  const hoverStyle = { backgroundColor: "var(--navbar-dropdown-item-hover-bg)" };

  if (href != null && href !== "") {
    return (
      <a
        href={href}
        className={`${baseClass} ${className}`.trim()}
        style={{ color: "var(--navbar-text)" }}
        onClick={onSelect}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClass} ${className}`.trim()}
      onClick={() => {
        onClick?.();
        onSelect?.();
      }}
      style={{ color: "var(--navbar-text)" }}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
    >
      {label}
    </button>
  );
}
