// src/components/templates/DashboardTemplate.tsx
import React, { useState } from "react";
import Sidebar from "../components/organisms/Sidebar";
import { navItems } from "../data/NavItems";

interface DashboardTemplateProps {
  children: React.ReactNode;
  pathname: string;
}

export default function DashboardTemplate({
  children,
  pathname,
}: DashboardTemplateProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-dvh">
      <Sidebar isOpen={isSidebarOpen} navItems={navItems} pathname={pathname} />

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
