import type { NavItem, ProjectConfig, ProjectConfigBase } from "./types";

/**
 * Returns nav items with an `active` flag based on the current pathname.
 */
export function getNavWithActive(
  items: NavItem[],
  currentPath: string,
): (NavItem & { active: boolean })[] {
  const normalize = (path: string) => path.replace(/\/+$/, "").toLowerCase();
  const normalizedCurrent = normalize(currentPath);

  return items.map((item) => ({
    ...item,
    active: normalize(item.href) === normalizedCurrent,
  }));
}

/**
 * Create a child project config by extending a parent config.
 * Useful for sub-projects that share a theme/branding but override nav items.
 *
 * @example
 * const inspectorConfig = extendConfig(govProjectsConfig, {
 *   name: "Inspector Portal",
 *   basePath: "/gov-projects/assemblies/inspector-portal",
 *   navItems: [...],
 * });
 */
export function extendConfig(
  parent: ProjectConfig,
  overrides: Partial<ProjectConfig> &
    Pick<ProjectConfigBase, "name" | "basePath">,
): ProjectConfig {
  return {
    ...parent,
    ...overrides,
    branding: {
      ...(parent as any).branding,
      ...(overrides as any).branding,
    },
    /* Fonts fully replace parent when set — no inheritance so each project owns its typography */
    fonts:
      (overrides as any).fonts !== undefined
        ? (overrides as any).fonts
        : (parent as any).fonts,
  } as ProjectConfig;
}
