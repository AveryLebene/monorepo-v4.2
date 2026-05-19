import type {
  ProjectConfig,
  ProjectGroupMeta,
  ProjectMeta,
} from "@/config/types";
import { projectGroupsMeta } from "@/config/groups";

/**
 * A single project entry — can have children (sub-projects) to express
 * hierarchies like Government Projects > Assemblies > Customer Portal.
 */
export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  href: string;
  logo?: string;
  theme?: string;
  tags?: string[];
  children?: ProjectEntry[];
  config?: ProjectConfig;
}

/** A top-level group of projects shown as a section on the landing page. */
export interface ProjectGroup {
  id: string;
  label: string;
  description?: string;
  projects: ProjectEntry[];
}

/* ─── Auto-registration ───────────────────────────────────────
 * Every project under `src/projects/**\/config.ts` is discovered at
 * build time via Vite's `import.meta.glob`. Each module MUST export:
 *   - `config: ProjectConfig`  (drives layout/theme/nav)
 *   - `meta:   ProjectMeta`    (registry/discovery data)
 *
 * Add a new project by creating the folder + `config.ts` — no edits
 * to this file required. Groups are registered in `src/config/groups.ts`.
 */
type ProjectModule = { config?: ProjectConfig; meta?: ProjectMeta };

const projectModules = import.meta.glob<ProjectModule>(
  "/src/projects/**/config.ts",
  { eager: true },
);

interface DiscoveredProject {
  meta: ProjectMeta;
  config: ProjectConfig;
  modulePath: string;
}

/** Collect, validate, and order all discovered project modules. */
function collectProjects(): DiscoveredProject[] {
  const projects: DiscoveredProject[] = [];

  for (const [modulePath, mod] of Object.entries(projectModules)) {
    if (!mod.config) {
      console.warn(
        `[projects] ${modulePath} has no exported "config" — skipped.`,
      );
      continue;
    }
    if (!mod.meta) {
      console.warn(
        `[projects] ${modulePath} has no exported "meta" — skipped.\n` +
          `  Add an exported \`meta: ProjectMeta\` so the project appears in the registry.`,
      );
      continue;
    }
    projects.push({
      meta: mod.meta,
      config: mod.config,
      modulePath,
    });
  }

  return projects;
}

/** Default href for a project = basePath with trailing slash. */
function defaultHref(basePath: string): string {
  return basePath.endsWith("/") ? basePath : `${basePath}/`;
}

/** Build a single ProjectEntry from a discovered project. */
function toEntry(p: DiscoveredProject): ProjectEntry {
  return {
    id: p.meta.id,
    name: p.config.name,
    description: p.meta.description,
    href: p.meta.href ?? defaultHref(p.config.basePath),
    logo: p.config.branding?.logo,
    theme: p.config.theme,
    tags: p.meta.tags,
    config: p.config,
  };
}

/** Build the final `projectGroups` array from discovered projects + group meta. */
function buildProjectGroups(
  discovered: DiscoveredProject[],
  groupsMeta: ProjectGroupMeta[],
): ProjectGroup[] {
  const byGroup = new Map<string, DiscoveredProject[]>();
  for (const p of discovered) {
    const list = byGroup.get(p.meta.group) ?? [];
    list.push(p);
    byGroup.set(p.meta.group, list);
  }

  /* Warn for any project whose group isn't registered. */
  const knownGroupIds = new Set(groupsMeta.map((g) => g.id));
  for (const p of discovered) {
    if (!knownGroupIds.has(p.meta.group)) {
      console.warn(
        `[projects] ${p.modulePath} references unknown group "${p.meta.group}".\n` +
          `  Add it to src/config/groups.ts or fix meta.group.`,
      );
    }
  }

  const sortedGroups = [...groupsMeta].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return sortedGroups
    .map((g) => {
      const members = byGroup.get(g.id) ?? [];

      /* Build parent/child hierarchy inside the group. */
      const byId = new Map(members.map((m) => [m.meta.id, m]));
      const roots: DiscoveredProject[] = [];
      const childrenByParent = new Map<string, DiscoveredProject[]>();

      for (const m of members) {
        if (m.meta.parentId && byId.has(m.meta.parentId)) {
          const list = childrenByParent.get(m.meta.parentId) ?? [];
          list.push(m);
          childrenByParent.set(m.meta.parentId, list);
        } else {
          if (m.meta.parentId && !byId.has(m.meta.parentId)) {
            console.warn(
              `[projects] ${m.modulePath} declares parentId "${m.meta.parentId}" ` +
                `but no such project exists in group "${g.id}".`,
            );
          }
          roots.push(m);
        }
      }

      const sortByOrder = (a: DiscoveredProject, b: DiscoveredProject) =>
        (a.meta.order ?? 0) - (b.meta.order ?? 0);

      const projects: ProjectEntry[] = roots.sort(sortByOrder).map((root) => {
        const entry = toEntry(root);
        const kids = (childrenByParent.get(root.meta.id) ?? [])
          .sort(sortByOrder)
          .map(toEntry);
        if (kids.length) entry.children = kids;
        return entry;
      });

      return {
        id: g.id,
        label: g.label,
        description: g.description,
        projects,
      };
    })
    .filter((group) => group.projects.length > 0);
}

const discoveredProjects = collectProjects();

export const projectGroups: ProjectGroup[] = buildProjectGroups(
  discoveredProjects,
  projectGroupsMeta,
);

/** Flat count of all entries (including children) — useful for the hero badge. */
export function countAllProjects(
  groups: ProjectGroup[] = projectGroups,
): number {
  const countEntry = (e: ProjectEntry): number =>
    1 + (e.children?.reduce((n, c) => n + countEntry(c), 0) ?? 0);
  return groups.reduce(
    (n, g) => n + g.projects.reduce((m, p) => m + countEntry(p), 0),
    0,
  );
}
