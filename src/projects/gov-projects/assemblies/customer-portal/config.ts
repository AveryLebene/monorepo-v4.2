import { extendConfig } from "../../../../config/utils";
import { config as govConfig } from "../config";

/**
 * Customer Portal — a sub-project under Gov Projects > Assemblies.
 * Uses the purple theme. Demonstrates how sub-projects can diverge
 * from the parent while still inheriting base branding.
 */
export const config = extendConfig(govConfig, {
  name: "Customer Portal",
  basePath: "/gov-projects/assemblies/customer-portal",
  theme: "customer-portal",
  template: "dashboard",
  branding: {
    logo: "https://designs.hubtel.com/v4//lendscore//assets/images/images/albrim-logo.svg",
    logoLabel: "Customer Projects",
  },
  navItems: [
    { label: "Home", href: "/gov-projects/assemblies/customer-portal/" },
    {
      label: "My Requests",
      href: "/gov-projects/assemblies/customer-portal/requests",
    },
    {
      label: "Track Status",
      href: "/gov-projects/assemblies/customer-portal/track",
    },
    {
      label: "Support",
      href: "/gov-projects/assemblies/customer-portal/support",
    },
  ],
  sidebarFooter: "Copyright © 2026 Gov Projects",
});
