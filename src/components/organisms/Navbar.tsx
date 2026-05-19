import React from "react";
import IconWithBadge from "@/components/molecules/IconWithBadge";
import UserProfileNavItem from "@/components/organisms/UserProfileNavItem";
import type { UserProfile, NavbarDropdownAction } from "@/config/types";

function BellIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

export interface NavbarProps {
  title: string;
  notificationCount?: number;
  userProfile?: UserProfile;
  profileDropdownActions?: NavbarDropdownAction[];
  showNavArrows?: boolean;
  onPreviousClick?: () => void;
  onForwardClick?: () => void;
  onNotificationClick?: () => void;
}

export default function Navbar({
  title,
  notificationCount,
  userProfile,
  profileDropdownActions = [],
  showNavArrows = false,
  onPreviousClick,
  onForwardClick,
  onNotificationClick,
}: Readonly<NavbarProps>) {
  return (
    <nav
      className="flex items-center justify-between gap-4 border-b pl-14 lg:pl-4 pr-4 py-3"
      style={{
        backgroundColor: "var(--navbar-bg)",
        color: "var(--navbar-text)",
        borderColor: "var(--navbar-border)",
      }}
    >
      {/* Left: navigation arrows + title */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {showNavArrows && (
          <>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-1 transition-colors hover:opacity-80"
              style={{ color: "var(--navbar-text)" }}
              aria-label="Go back"
              onClick={onPreviousClick ?? (() => window.history.back())}
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-1 transition-colors hover:opacity-80"
              style={{ color: "var(--navbar-text)" }}
              aria-label="Go forward"
              onClick={onForwardClick ?? (() => window.history.forward())}
            >
              <ArrowRightIcon />
            </button>
          </>
        )}

        <h1 className="truncate text-base font-semibold ml-1">{title}</h1>
      </div>

      {/* Right: notification bell + user profile */}
      <div className="flex shrink-0 items-center gap-1">
        <IconWithBadge
          icon={<BellIcon />}
          badgeCount={notificationCount}
          ariaLabel="Notifications"
          onClick={onNotificationClick}
        />

        {userProfile && (
          <UserProfileNavItem
            profile={userProfile}
            actions={profileDropdownActions}
          />
        )}
      </div>
    </nav>
  );
}
