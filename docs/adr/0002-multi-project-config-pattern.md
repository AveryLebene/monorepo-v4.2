# 2. Multi-Project Configuration Pattern

**Date:** 2025-03-05

**Status:** Accepted

## Context

The platform hosts multiple independent projects (MA Portal, Gov Projects, Lenders Portal, etc.) under one codebase. Each project has its own navigation, theme, branding, and layout template. Sub-projects (e.g., Inspector Portal under Gov Projects) share some config with the parent but override others. We needed a pattern that avoids duplication and keeps page files minimal.

### Problem Statement

How do we:
- Define per-project behavior (nav, theme, template, branding) without duplicating layout logic?
- Support sub-projects that inherit from a parent (e.g., shared theme, different nav)?
- Keep page files to a single layout import and content?

### Requirements

- Single source of truth for layout logic (AppLayout)
- Per-project config as data, not code duplication
- Sub-project inheritance with override capability
- Type safety for config structure

## Decision

Use a **configuration-driven layout pattern**:

1. Each project has a `config.ts` exporting a `ProjectConfig` object (name, basePath, theme, template, navItems, branding, etc.)
2. Pages import AppLayout and the project config directly — no per-project Layout.astro
3. Sub-projects use `extendConfig(parentConfig, overrides)` to inherit and override
4. AppLayout reads `config.template` to pick template; BaseLayout reads `config.theme` for theming; templates receive full config for Sidebar/Navbar

**Update (2025-03):** Per-project Layout.astro wrappers were removed. Pages now import AppLayout and config directly, simplifying project setup (config + theme only).

### Rationale

- **Separation of concerns**: Layout logic lives in AppLayout/Templates; project-specific data lives in config. _Source: `src/layouts/AppLayout.astro`, `src/projects/*/config.ts`_
- **extendConfig()** does shallow merge: child overrides name, basePath, navItems; branding is merged so child can override just logoLabel. _Source: `src/config/utils.ts`_
- **Type safety**: `ProjectConfig` is a discriminated union (v4 vs v5 sidebar, v4 vs v5 navbar) ensuring valid combinations. _Source: `src/config/types.ts`_
- **Page simplicity**: Pages import AppLayout and config—two imports, zero layout logic. _Source: `src/pages/`_

## Alternatives Considered

### Alternative 1: One Layout per project with full logic
- **Pros**: Maximum flexibility per project
- **Cons**: Duplication of layout logic, harder to maintain consistency

### Alternative 2: URL-based config resolution (no explicit Layout import)
- **Pros**: Pages could be even simpler
- **Cons**: Magic routing; harder to reason about; some projects share basePath patterns

### Alternative 3: Monorepo with separate apps per project
- **Pros**: Full isolation
- **Cons**: Shared component duplication, more infra, harder to add projects

## Consequences

### Positive

- Adding a new project: create config + theme + pages (no Layout.astro needed)
- Sub-projects get inheritance with minimal boilerplate
- Consistent behavior across all projects
- Easy to add new config fields (e.g., v5SidebarProps) with type safety

### Negative

- Pages require two imports (AppLayout + config) instead of one
- Config can grow complex for projects with many overrides (e.g., v5 sidebar props)
- Two sidebar models (v4 vs v5) add complexity to types

### Risks

- Config drift: teams may add project-specific hacks. Code review and documentation help.

## Implementation Notes

- `ProjectConfig` in `src/config/types.ts` defines the full shape
- `extendConfig()` in `src/config/utils.ts` handles parent-child merge
- Gov Projects assemblies (inspector-portal, customer-portal) extend gov-projects config
- No per-project Layout.astro; pages import AppLayout and config directly
- See README "Step-by-Step: Add a New Project" for workflow

## References

- [README: Step-by-Step: Add a New Project](../../README.md#step-by-step-add-a-new-project)
- [README: Step-by-Step: Add a Sub-Project](../../README.md#step-by-step-add-a-sub-project)
- `src/config/types.ts`, `src/config/utils.ts`
