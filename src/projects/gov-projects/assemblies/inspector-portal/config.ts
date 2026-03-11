import { extendConfig } from "../../../../config/utils";
import { config as govConfig } from "../config";

/**
 * Inspector Portal — a sub-project under Gov Projects > Assemblies.
 * Extends the gov-projects config but uses its own theme and nav items.
 */
export const config = extendConfig(govConfig, {
  name: "Inspector Portal",
  basePath: "/gov-projects/assemblies/inspector-portal",
  theme: "inspector-portal",
  template: "fullwidth",
  navItems: [
    { label: "Dashboard", href: "/gov-projects/assemblies/inspector-portal/" },
    {
      label: "Inspections",
      href: "/gov-projects/assemblies/inspector-portal/inspections",
    },
    {
      label: "Schedule",
      href: "/gov-projects/assemblies/inspector-portal/schedule",
    },
    {
      label: "Reports",
      href: "/gov-projects/assemblies/inspector-portal/reports",
    },
  ],
});
