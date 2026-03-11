# Hubtel Multi-Project Platform Overview

## Business Context

### Why This System Exists

[NEEDS_INPUT: Please describe why this multi-project platform exists and what business need it fulfills]

### Problem Statement

[NEEDS_INPUT: What problem does consolidating multiple portals under one codebase solve?]

### Target Users

[NEEDS_INPUT: Who are the primary users? (e.g., internal admins, external customers, partners)]

## System Responsibilities

This system is responsible for:

- Hosting multiple independent web applications (portals) under a single deployment _Source: `README.md`_
- Providing shared UI components (sidebar, navbar, buttons) that are themed per project _Source: `README.md`, `src/components/`_
- Enabling rapid addition of new projects via configuration-only setup _Source: `README.md`, `src/config/`_
- Supporting different layout templates (dashboard with sidebar, full-width) per project _Source: `src/config/types.ts`, `src/templates/`_
- Applying project-specific theming via CSS custom properties _Source: `src/styles/themes/tokens.css`_

### In Scope

- MA Portal, Gov Projects (assemblies), Lenders Portal, and other projects added via config _Source: `src/projects/`, `src/pages/`_
- Shared component library (atoms, organisms) _Source: `src/components/`_
- Theming system (tokens per project) _Source: `src/styles/themes/tokens.css`_
- Project/sub-project inheritance via `extendConfig()` _Source: `src/config/utils.ts`_

### Out of Scope

- Backend API services (this is a static/SSR frontend only)
- Authentication/authorization logic (handled by external systems)
- Database or server-side persistence

## Key Integrations

### Internal Services

[NEEDS_INPUT: List any internal Hubtel services this frontend integrates with (e.g., API endpoints)]

- Lendscore API: `https://api.lendscore.hubtel.com/v1` referenced in lenders-portal _Source: `src/pages/lendscore/lenders-portal/manage/api-docs.astro`_

### External Services

- **@hubtel/react-ui** — Hubtel design system components _Source: `package.json`_
- **@hubtel/react-icons** — Icon library _Source: `package.json`_
- **@hubtel/shared-styles** — Shared CSS utilities _Source: `package.json`_
- External asset URLs for logos (e.g., `https://designs.hubtel.com/v4/`) _Source: `src/projects/ma-portal/config.ts`_

## Service Tier

- **Priority:** [NEEDS_INPUT: Critical / High / Medium / Low]
- **Business Impact:** [NEEDS_INPUT: Describe impact of downtime]
- **User Base:** [NEEDS_INPUT: Estimated user count/type]
- **System Dependencies:** [NEEDS_INPUT: How many downstream systems depend on this?]
