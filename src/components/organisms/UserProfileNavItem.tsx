import React, { useState } from "react";
import Avatar from "../atoms/Avatar";
import UserInfo from "../molecules/UserInfo";
import Dropdown from "../molecules/Dropdown";
import DropdownMenuItem from "../molecules/DropdownMenuItem";
import type { UserProfile, NavbarDropdownAction } from "../../config/types";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0][0] ?? "";
    const last = parts.at(-1)?.[0] ?? "";
    return (first + last).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase() || "?";
}

function ChevronDown() {
  return (
    <svg
      className="h-4 w-4 shrink-0 opacity-70"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

interface UserProfileNavItemProps {
  profile: UserProfile;
  actions: NavbarDropdownAction[];
  onActionClick?: (action: NavbarDropdownAction) => void;
}

export default function UserProfileNavItem({
  profile,
  actions,
  onActionClick,
}: Readonly<UserProfileNavItemProps>) {
  const [open, setOpen] = useState(false);

  const trigger = (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:opacity-90"
      style={{ color: "var(--navbar-text)" }}
    >
      <Avatar
        src={profile.avatar}
        alt={profile.name}
        fallback={getInitials(profile.name)}
      />
      <span className="hidden md:block">
        <UserInfo name={profile.name} designation={profile.designation} />
      </span>
      <span className="hidden md:flex">
        <ChevronDown />
      </span>
    </div>
  );

  return (
    <Dropdown
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      align="right"
    >
      <div
        className="px-4 py-3"
        style={{
          backgroundColor: "var(--navbar-dropdown-header-bg)",
          color: "var(--primary)",
        }}
      >
        <UserInfo
          name={profile.name}
          designation={profile.designation}
          className="text-left"
          inheritColor
        />
      </div>
      <div
        className="border-t py-1"
        style={{ borderColor: "var(--navbar-dropdown-border)" }}
      >
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            label={action.label}
            href={action.href}
            onClick={
              action.onClick
                ? () => {
                    onActionClick?.(action);
                    action.onClick?.();
                  }
                : undefined
            }
            onSelect={() => setOpen(false)}
          />
        ))}
      </div>
    </Dropdown>
  );
}
