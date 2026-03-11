import type { ProjectConfig } from "../../../config/types";

/**
 * Gov Projects — top-level project.
 * Sub-projects (assemblies, inspector-portal, etc.) can extend this
 * via extendConfig() to inherit theme/branding and override nav items.
 */
export const config: ProjectConfig = {
  name: "Assemblies",
  basePath: "/gov-projects/assemblies",
  theme: "assemblies",
  v5Theme: "green",
  template: "dashboard",
  branding: {
    logo: "https://designs.hubtel.com/v4//lendscore//assets/images/images/albrim-logo.svg",
    logoLabel: "Assemblies",
  },
  navItems: [
    { label: "Overview", href: "/gov-projects/assemblies/" },
    { label: "Assemblies", href: "/gov-projects/assemblies" },
    { label: "Reports", href: "/gov-projects/assemblies/reports" },
    { label: "Settings", href: "/gov-projects/assemblies/settings" },
  ],
};
