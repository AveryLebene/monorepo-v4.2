import { extendConfig } from "@/config/utils";
import type { ProjectMeta } from "@/config/types";
import { config as govConfig } from "@/projects/gov-projects/assemblies/config";

export const meta: ProjectMeta = {
  id: "inspector-portal",
  group: "gov-projects",
  parentId: "assemblies",
  description:
    "Field inspector workspace — inspections, schedules, and reports.",
  tags: ["Field Ops", "Full-width"],
  order: 2,
};

/**
 * Inspector Portal — a sub-project under Gov Projects > Assemblies.
 * Extends the gov-projects config but uses its own theme and nav items.
 */
export const config = extendConfig(govConfig, {
  name: "Inspector Portal",
  basePath: "/projects/gov-projects/assemblies/inspector-portal",
  theme: "inspector-portal",
  v5Theme: "black",
  template: "fullwidth",
  navItems: [
    { label: "Dashboard", href: "/projects/gov-projects/assemblies/inspector-portal/" },
    {
      label: "Inspections",
      href: "/projects/gov-projects/assemblies/inspector-portal/inspections",
    },
    {
      label: "Schedule",
      href: "/projects/gov-projects/assemblies/inspector-portal/schedule",
    },
    {
      label: "Reports",
      href: "/projects/gov-projects/assemblies/inspector-portal/reports",
    },
  ],
});
