# 0001. Choose Astro multi-project platform structure

**Date:** 2026-03-18

**Status:** Accepted

## Context

This repository is positioned as a “Hubtel Multi-Project Platform”: a modular Astro project intended to host multiple independent projects (portals, dashboards, tools) under one codebase, sharing components and theming via configuration.

_Source: `README.md`_

### Problem Statement

Building multiple portals/tools repeatedly requires the same navigation chrome (sidebar/navbar), shared UI components, and consistent theming. Duplicating this across separate codebases increases maintenance cost and makes it harder to keep UI/UX consistent.

_Source: `README.md`_

### Requirements

- Support multiple independent “projects” under distinct URL base paths.
- Provide shared UI components and reusable page chrome.
- Support per-project branding and theming without component duplication.
- Keep pages simple, focused on content and composition.

_Source: `README.md` (“Architecture Overview”, “Project Structure”)_

## Decision

Adopt an Astro-based multi-project platform with:

- Astro file-based routing (`src/pages/`) for URL structure
- A single `AppLayout` that selects a React template based on per-project configuration
- Reusable React templates (`dashboard` vs `fullwidth`) for page chrome
- Shared UI components themed via CSS custom properties (tokens)
- Per-project configs under `src/projects/**/config.ts` defining `ProjectConfig` (theme, template, nav, branding)

_Source: `README.md`, `src/layouts/AppLayout.astro`, `src/layouts/BaseLayout.astro`, `src/templates/*`, `src/config/types.ts`, `src/styles/themes/tokens.css`_

### Rationale

- Astro provides a clear file-based routing and page composition model for multi-project hosting.  
  _Source: `src/pages/` (routing), `package.json` (Astro dependency)_
- React templates allow a consistent, reusable layout shell (sidebar/navbar) while keeping `.astro` pages thin.  
  _Source: `src/templates/DashboardTemplate.tsx`, `src/layouts/AppLayout.astro`_
- CSS custom properties keyed by `data-theme` (via `@projects/styles`) support theming across projects without hardcoding colors inside components.  
  _Source: `src/styles/themes/tokens.css`, `README.md`_

## Alternatives Considered

### Alternative 1: Separate repositories per portal/tool

- Pros:
  - Clear ownership boundaries per portal/tool
  - Independent release cycles
- Cons:
  - UI/theming duplication across repos
  - Harder to maintain consistent shared components
  - Higher overhead to propagate shared improvements

_⚠️ INFERRED from common multi-repo tradeoffs; verify with team_

### Alternative 2: Single app with framework-specific routing (non-Astro)

- Pros:
  - Potentially deeper ecosystem alignment depending on framework
- Cons:
  - Would require re-implementing the same config-driven theming and template composition approach

_⚠️ INFERRED; no competing framework decision record was found in-repo_

## Consequences

### Positive

- Shared components/templates can be built once and reused across projects.
- Adding a new project is a repeatable workflow (config + tokens + pages).
- Theming is centralized and consistent via tokens.

_Source: `README.md`, `src/styles/themes/tokens.css`, `src/layouts/AppLayout.astro`_

### Negative

- Changes to shared components/templates can affect multiple projects simultaneously.
- Ownership and release processes may need coordination across projects hosted in the same repo.

_⚠️ INFERRED; verify with team_

### Risks

- Without strong conventions, `basePath`, route structure, and theme keys can drift and cause navigation/theming inconsistencies.

_⚠️ INFERRED; see `docs/flows/add-new-project.md`_

## Implementation Notes

- `AppLayout` renders either `DashboardTemplate` or `FullWidthTemplate` based on `config.template`.  
  _Source: `src/layouts/AppLayout.astro`_
- `BaseLayout` sets `data-theme` on `<html>` and imports global styles.  
  _Source: `src/layouts/BaseLayout.astro`, `src/styles/global.css`_

## References

- Architecture overview and workflow narratives: `README.md`
- DAC Guidelines: https://dev-docs.hubtel.com/repositories-docs/guidelines.html

