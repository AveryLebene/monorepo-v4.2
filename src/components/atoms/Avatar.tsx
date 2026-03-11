import React from "react";
import Badge from "./Badge";

interface AvatarProps {
  src?: string;
  alt?: string;
  /** Fallback when no image (e.g. initial or icon) */
  fallback?: React.ReactNode;
  /** Optional badge count overlay (e.g. unread indicator) */
  badgeCount?: number;
  className?: string;
}

export default function Avatar({
  src,
  alt = "",
  fallback,
  badgeCount,
  className = "",
}: Readonly<AvatarProps>) {
  const sizeClasses = "h-10 w-10 shrink-0 rounded-full flex items-center justify-center overflow-hidden";
  const bgStyle = { backgroundColor: "var(--navbar-dropdown-border, #e5e7eb)" };

  return (
    <div className={`relative ${sizeClasses} ${className}`.trim()}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-sm font-medium"
          style={{
            ...bgStyle,
            color: "var(--navbar-text, #111827)",
          }}
        >
          {fallback ?? (
            <span aria-hidden>?</span>
          )}
        </div>
      )}
      {badgeCount !== undefined && badgeCount > 0 && (
        <Badge count={badgeCount} />
      )}
    </div>
  );
}
