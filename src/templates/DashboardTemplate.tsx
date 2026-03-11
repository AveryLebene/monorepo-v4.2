import React, { useState } from "react";
import Sidebar from "../components/organisms/Sidebar";
import SidebarV5 from "../components/organisms/SidebarV5";
import Navbar from "../components/organisms/Navbar";
import NavbarV5 from "../components/organisms/NavbarV5";
import SidebarToggle from "../components/atoms/SidebarToggle";
import type { ProjectConfig } from "../config/types";

interface DashboardTemplateProps {
  children: React.ReactNode;
  pathname: string;
  config: ProjectConfig;
  title?: string;
  showNavArrows?: boolean;
  noPadding?: string | boolean;
}

export default function DashboardTemplate({
  children,
  pathname,
  config,
  title: pageTitle,
  showNavArrows = false,
  noPadding,
}: DashboardTemplateProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navbarTitle = pageTitle ?? config.navbarTitle ?? config.name;

  return (
    <div className="flex h-dvh">
      {config.sidebarType === "v5" ? (
        <SidebarV5 {...(config.v5SidebarProps || {})} />
      ) : (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          navItems={config.navItems}
          pathname={pathname}
          branding={config.branding}
          footer={config.sidebarFooter ?? undefined}
          footerBorder={config.sidebarFooterBorder}
          iconBasePath={config.iconBasePath}
        />
      )}

      <SidebarToggle onClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className="flex-1 flex flex-col overflow-hidden"
        style={{
          backgroundColor: "var(--content-bg)",
          color: "var(--content-text)",
        }}
      >
        <div className="shrink-0">
          {config.navbarType === "v5" ? (
            <NavbarV5 {...(config.v5NavbarProps || {})} />
          ) : (
            <Navbar
              title={navbarTitle}
              notificationCount={config.notificationCount}
              userProfile={config.userProfile}
              profileDropdownActions={config.profileDropdownActions}
              showNavArrows={showNavArrows}
            />
          )}
        </div>
        <div
          className={`flex-1 overflow-y-auto min-h-0 ${noPadding ? "" : "px-6 py-6"}`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
