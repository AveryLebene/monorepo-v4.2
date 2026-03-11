import React from "react";
import Badge from "../atoms/Badge";

interface IconWithBadgeProps {
  icon: React.ReactNode;
  badgeCount?: number;
  badgeColor?: string;
  ariaLabel?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function IconWithBadge({
  icon,
  badgeCount,
  badgeColor,
  ariaLabel,
  onClick,
  href,
  className = "",
}: Readonly<IconWithBadgeProps>) {
  const isButton = href == null;
  const wrapperClass = `relative inline-flex items-center justify-center rounded-full p-2 transition-colors hover:opacity-80 ${className}`.trim();

  const content = (
    <>
      {icon}
      {badgeCount !== undefined && badgeCount > 0 && (
        <Badge
          count={badgeCount}
          style={
            badgeColor
              ? {
                  backgroundColor: badgeColor,
                  color: "var(--navbar-badge-text, #ffffff)",
                }
              : undefined
          }
        />
      )}
    </>
  );

  if (isButton) {
    return (
      <button
        type="button"
        className={wrapperClass}
        onClick={onClick}
        aria-label={ariaLabel}
        style={{ color: "var(--navbar-text)" }}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={wrapperClass}
      aria-label={ariaLabel}
      style={{ color: "var(--navbar-text)" }}
    >
      {content}
    </a>
  );
}
