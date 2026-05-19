import { extendConfig } from "@/config/utils";
import type { ProjectMeta } from "@/config/types";
import { config as govConfig } from "@/projects/gov-projects/assemblies/config";

export const meta: ProjectMeta = {
  id: "customer-portal",
  group: "gov-projects",
  parentId: "assemblies",
  description:
    "Citizen-facing portal to submit and track service requests.",
  tags: ["Citizens", "Dashboard"],
  order: 1,
};

/**
 * Customer Portal — a sub-project under Gov Projects > Assemblies.
 * Uses the purple theme. Demonstrates how sub-projects can diverge
 * from the parent while still inheriting base branding.
 */
export const config = extendConfig(govConfig, {
  name: "Customer Portal",
  basePath: "/projects/gov-projects/assemblies/customer-portal",
  theme: "customer-portal",
  template: "dashboard",
  branding: {
    logo: "https://designs.hubtel.com/v4//lendscore//assets/images/images/albrim-logo.svg",
    logoLabel: "Customer Projects",
  },
  navItems: [
    { label: "Home", href: "/projects/gov-projects/assemblies/customer-portal/" },
    {
      label: "My Requests",
      href: "/projects/gov-projects/assemblies/customer-portal/requests",
    },
    {
      label: "Track Status",
      href: "/projects/gov-projects/assemblies/customer-portal/track",
    },
    {
      label: "Support",
      href: "/projects/gov-projects/assemblies/customer-portal/support",
    },
  ],
  sidebarFooter: "Copyright © 2026 Gov Projects",
});
