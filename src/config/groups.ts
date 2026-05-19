import type { ProjectGroupMeta } from "@/config/types";

/**
 * Static registry of project groups.
 * Add a new group here, then point any project's `meta.group` at its `id`.
 * Projects themselves are auto-discovered from `src/projects/**\/config.ts`.
 */
export const projectGroupsMeta: ProjectGroupMeta[] = [
  {
    id: "gov-projects",
    label: "Government Projects",
    description:
      "Public sector workspaces.",
    order: 1,
  },
  {
    id: "lendscore",
    label: "Lendscore",
    description: "Credit reporting suite for Ghanaian lenders.",
    order: 2,
  },
  {
    id: "education",
    label: "Education",
    description: "School administration tooling.",
    order: 3,
  },
];
