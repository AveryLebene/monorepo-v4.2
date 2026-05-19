import type { ProjectConfig, ProjectMeta } from "@/config/types";

export const meta: ProjectMeta = {
  id: "assemblies",
  group: "gov-projects",
  description:
    "Top-level government workspace. Coordinates assemblies, reports, and settings across sub-portals.",
  tags: ["Dashboard", "Parent"],
};

/**
 * Gov Projects — top-level project.
 * Sub-projects (assemblies, inspector-portal, etc.) can extend this
 * via extendConfig() to inherit theme/branding and override nav items.
 */
export const config: ProjectConfig = {
  name: "Assemblies",
  basePath: "/projects/gov-projects/assemblies",
  theme: "assemblies",
  v5Theme: "black",
  template: "dashboard",
  branding: {
    logo: "https://designs.hubtel.com/v4//lendscore//assets/images/images/albrim-logo.svg",
    logoLabel: "Assemblies",
  },
  navItems: [
    { label: "Overview", href: "/projects/gov-projects/assemblies/" },
    { label: "Business Operating Permit", href: "/projects/gov-projects/assemblies/backoffice/bop" },
    { label: "Assemblies", href: "/projects/gov-projects/assemblies" },
    { label: "Reports", href: "/projects/gov-projects/assemblies/reports" },
    { label: "Settings", href: "/projects/gov-projects/assemblies/settings" },
  ],
};
