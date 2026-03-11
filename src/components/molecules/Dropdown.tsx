import React, { useRef, useEffect } from "react";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  align?: "left" | "right";
}

export default function Dropdown({
  trigger,
  children,
  open,
  onOpenChange,
  align = "right",
}: Readonly<DropdownProps>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        className="inline-flex cursor-pointer items-center border-0 bg-transparent p-0 text-left"
        tabIndex={0}
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {trigger}
      </button>
      {open && (
        <div
          className="absolute z-50 mt-1 min-w-[12rem] rounded-md border shadow-lg"
          style={{
            [align === "right" ? "right" : "left"]: 0,
            backgroundColor: "var(--navbar-dropdown-bg)",
            borderColor: "var(--navbar-dropdown-border)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
