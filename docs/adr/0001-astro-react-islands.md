# 1. Astro with React Islands

**Date:** 2025-03-05

**Status:** Accepted

## Context

The platform needed a framework that could host multiple projects with shared components while allowing interactivity where needed (e.g., sidebar toggle, dropdowns). A purely static approach would limit UX; a full React SPA would increase bundle size and complexity for mostly static content.

### Problem Statement

How do we build a multi-project portal platform that:
- Serves mostly static content with fast initial load
- Supports interactive components (sidebar, navbar, modals) where needed
- Enables easy addition of new projects without duplicating infrastructure
- Integrates with Hubtel's design system (React components)

### Requirements

- Fast first-load performance
- Support for React components
- File-based routing for predictability
- SSR/SSG capabilities
- Good DX for adding pages and projects

## Decision

Use **Astro** as the primary framework with **React** via `@astrojs/react` integration. Use the "islands" architecture: mostly static HTML with React components loaded only where needed via `client:load` (or similar directives).

### Rationale

- Astro ships zero JS by default; React is only loaded for components that need it. _Source: Astro docs_
- File-based routing in `src/pages/` maps naturally to project structure (ma-portal, gov-projects, lendscore).
- `@astrojs/react` provides seamless integration; React components (Sidebar, DashboardTemplate) receive props from Astro. _Source: `astro.config.mjs`, `src/templates/`_
- Astro 5 with Vite offers fast dev experience and optimized production builds. _Source: `package.json`_

## Alternatives Considered

### Alternative 1: Full React (Next.js, Remix, etc.)
- **Pros**: Single framework, rich ecosystem
- **Cons**: Heavier bundle, more complexity for static content, different routing model

### Alternative 2: Pure Astro (no React)
- **Pros**: Minimal JS, maximum performance
- **Cons**: Would require rewriting @hubtel/react-ui and shared components or using different patterns; limits design system reuse

### Alternative 3: Static HTML + Vanilla JS
- **Pros**: No framework overhead
- **Cons**: No design system integration, more custom code for interactivity, harder to maintain at scale

## Consequences

### Positive

- Optimal performance for static content; React only where needed
- Clean integration with Hubtel React design system
- Simple mental model: Astro pages + React islands
- Fast dev and build times via Vite

### Negative

- Two frameworks to understand (Astro + React)
- Hydration boundaries require care (server vs client render must match)
- Some Astro-specific learning curve for contributors

### Risks

- React version upgrades must stay compatible with @astrojs/react
- Hydration mismatches can cause runtime errors if server and client output diverge

## Implementation Notes

- Templates (DashboardTemplate, FullWidthTemplate) are React components with `client:load`
- Sidebar, Navbar, and other interactive components live in `src/components/` as React
- Astro pages compose via Layout and slot; config flows from Astro to React via props
- See `astro.config.mjs` for integration setup

## References

- [Astro Documentation](https://docs.astro.build/)
- [Astro React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Hubtel React UI](https://www.npmjs.com/package/@hubtel/react-ui)
