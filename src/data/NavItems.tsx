export interface NavItem {
  label: string;
  href: string;
  badgeCount?: number;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/ma-portal/" },
  { label: "Notifications", href: "/ma-portal/notifications", badgeCount: 3 },
  { label: "Settings", href: "/ma-portal/settings" },
  { label: "Profile", href: "/ma-portal/profile" },
  { label: "Help", href: "/ma-portal/help" },
  { label: "Logout", href: "/ma-portal/logout" },
];

export function getNavWithActive(
  items: NavItem[],
  currentPath: string
): (NavItem & { active: boolean })[] {
  const normalize = (path: string) => path.replace(/\/+$/, "").toLowerCase();

  const normalizedCurrent = normalize(currentPath);

  return items.map((item) => ({
    ...item,
    active: normalize(item.href) === normalizedCurrent,
  }));
}