import React from "react";

interface BadgeProps {
  /** Number to show; omit for a dot-only badge */
  count?: number;
  className?: string;
  style?: React.CSSProperties;
}

function formatCount(count: number): string | number {
  return count > 99 ? "99+" : count;
}

export default function Badge({
  count,
  className = "",
  style,
}: Readonly<BadgeProps>) {
  const content =
    count === undefined ? null : formatCount(count);
  return (
    <span
      className={`absolute -top-0.5 -right-0.5 flex min-w-[1.25rem] w-5 h-5 items-center justify-center rounded-full px-1.5 py-0 text-xs font-medium leading-none ${className}`}
      style={{
        backgroundColor: "var(--navbar-badge-bg, var(--sidebar-badge-bg, #dc2626))",
        color: "var(--navbar-badge-text, var(--sidebar-badge-text, #ffffff))",
        ...style,
      }}
    >
      {content}
    </span>
  );
}
