import React from "react";
import BrandLogo from "../atoms/BrandLogo";
import type { NavItem } from "../../data/NavItems";
import { getNavWithActive } from "../../data/NavItems";

interface SidebarProps {
  isOpen: boolean;
  navItems: NavItem[];
  pathname: string;
}

export default function Sidebar({ isOpen, navItems, pathname }: SidebarProps) {
  const activeNavItem = getNavWithActive(navItems, pathname);
  console.log("active=", activeNavItem);
  console.log("pathname=", pathname);

  return (
    <aside
      className={`bg-[#082e4d] text-white h-dvh  top-0 left-0 transition-transform duration-300 z-50 w-[260px] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static`}
    >
      <div className="flex items-center  justify-center  border-b border-gray-700 p-4 pt-6">
        <BrandLogo
          imgSrc="https://designs.hubtel.com/v4//lendscore//assets/images/images/albrim-logo.svg"
          label="Logo"
        />
      </div>

      <nav className="flex flex-col gap-2 p-3">
        {activeNavItem.map(({ label, href, active, badgeCount }) => (
          <a
            key={label}
            href={href}
            className={`px-4 py-3 rounded-md hover:bg-gray-700 relative ${
              active ? "bg-[#010810]" : ""
            }`}
          >
            {label}
            {badgeCount !== undefined && (
              <span className="absolute right-4 top-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {badgeCount}
              </span>
            )}
          </a>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-700">
        <p className="text-sm"></p>
      </div>
    </aside>
  );
}
