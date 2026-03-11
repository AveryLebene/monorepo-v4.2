# 3. CSS Custom Properties for Theming

**Date:** 2025-03-05

**Status:** Accepted

## Context

The platform has multiple projects, each with distinct branding (colors, sidebar style, etc.). Components (Sidebar, Navbar, Button) must be shared and project-agnostic—they cannot hardcode colors or import project-specific styles. We needed a theming mechanism that works with both Astro and React and supports dynamic theme switching per project.

### Problem Statement

How do we:
- Theme shared components per project without passing color props everywhere?
- Support multiple themes without duplicating component code?
- Allow themes to be defined in one place and applied at runtime?
- Work with Tailwind and arbitrary values?

### Requirements

- Single set of components; no project-specific variants
- Theme defined as data (not hardcoded in components)
- Easy to add new themes
- Works with Tailwind utility classes
- No runtime theme "objects" passed through React—prefer CSS cascade

## Decision

Use **CSS custom properties (variables)** defined in `tokens.css`, scoped by `[data-theme="..."]` on `<html>`. BaseLayout sets `data-theme={config.theme}`. Components reference `var(--sidebar-bg)`, `var(--primary)`, etc. Each theme block in tokens.css defines the variables for that theme.

### Rationale

- **Cascade**: CSS variables inherit; setting them at `:root` or `[data-theme="x"]` means all descendants can use them. _Source: `src/styles/themes/tokens.css`_
- **No prop drilling**: Components don't need theme as a prop; they read from the environment. _Source: `src/components/organisms/Sidebar.tsx`_
- **Tailwind compatibility**: Use arbitrary values like `bg-[var(--primary)]` or inline styles `style={{ backgroundColor: 'var(--sidebar-bg)' }}`. _Source: `README.md`_
- **Single source**: All themes live in `tokens.css`; adding a theme is adding a block. _Source: `README.md` "Theming"_

## Alternatives Considered

### Alternative 1: Theme object passed as React context
- **Pros**: Full TypeScript; theme could include non-CSS values
- **Cons**: Requires context provider in every tree; more boilerplate; doesn't help non-React (Astro) parts

### Alternative 2: SCSS/LESS variables per theme file
- **Pros**: Compile-time theming
- **Cons**: Would require separate builds or many theme files; harder to switch at runtime; Tailwind integration trickier

### Alternative 3: Tailwind theme extension per project
- **Pros**: Native Tailwind approach
- **Cons**: Would require multiple Tailwind configs or dynamic config; more complex for multi-project

## Consequences

### Positive

- Zero theme-related props in shared components
- New theme = new block in tokens.css
- Works with Tailwind arbitrary values
- Theme switch is instant (just change `data-theme`)

### Negative

- CSS variable names must be consistent across themes; typos cause fallback to default
- No TypeScript validation for variable names
- Designers must know the token names

### Risks

- Token name drift: new tokens added in one theme but forgotten in others. Documentation and review help.

## Implementation Notes

- Tokens defined in `src/styles/themes/tokens.css`
- Standard tokens: `--sidebar-bg`, `--sidebar-active-bg`, `--sidebar-text`, `--sidebar-hover-bg`, `--sidebar-border`, `--navbar-bg`, `--navbar-text`, `--primary`, `--primary-light`, `--accent`, `--content-bg`, `--content-text`
- BaseLayout sets `<html data-theme={config.theme}>`
- global.css imports tokens.css
- See README "Theming" and "Available tokens" for full list

## References

- [README: Theming](../../README.md#theming)
- [README: Using tokens in components](../../README.md#using-tokens-in-your-components)
- `src/styles/themes/tokens.css`
- `src/layouts/BaseLayout.astro`
