import React from "react";
import type { ProjectConfig } from "@/config/types";

interface FullWidthTemplateProps {
  children: React.ReactNode;
  pathname: string;
  config: ProjectConfig;
}

/**
 * Full-width template — no sidebar.
 * Use for projects/pages that don't need navigation chrome
 * (landing pages, auth screens, standalone tools, etc.)
 */
export default function FullWidthTemplate({
  children,
  pathname,
  config,
}: Readonly<FullWidthTemplateProps>) {
  return (
    <div
      className="min-h-dvh"
      style={{
        backgroundColor: "var(--content-bg)",
        color: "var(--content-text)",
      }}
    >
      <main className="mx-auto max-w-7xl p-6">{children}</main>
    </div>
  );
}
