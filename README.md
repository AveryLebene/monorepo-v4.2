# Hubtel Multi-Project Platform

A modular Astro project designed to house multiple independent projects (portals, dashboards, tools) under a single codebase. Every shared component — sidebar, navbar, buttons, etc. — is built once and themed per project via configuration. No duplication.

Projects are **auto-discovered** from `src/projects/**/config.ts` and **validated at build time** against pages and theme tokens.

## Table of Contents

- [Documentation](#documentation)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [How It All Fits Together](#how-it-all-fits-together)
- [Auto-Registration & Validation](#auto-registration--validation)
- [Step-by-Step: Add a New Project](#step-by-step-add-a-new-project)
- [Step-by-Step: Add a Sub-Project](#step-by-step-add-a-sub-project)
- [Theming](#theming)
- [Per-Project Fonts](#per-project-fonts)
- [Templates and Layouts](#templates-and-layouts)
- [Creating a New Template](#creating-a-new-template)
- [Shared Components](#shared-components)
- [Configuration Reference](#configuration-reference)
- [Import Conventions](#import-conventions)
- [Commands](#commands)
- [FAQ](#faq)

---

## Documentation

This repository uses Docs-as-Code documentation under [`docs/`](docs/) (start here: [`docs/index.md`](docs/index.md)).

The `README.md` is still useful for onboarding, but DAC documentation should be updated alongside code changes.

---

## Quick Start

```bash
pnpm install
pnpm dev          # → http://localhost:4321/projects/
```

> The app is served under a `/projects` base path (configured in `astro.config.mjs`). All project URLs below include it.

Visit the live projects:

| Project                    | URL                                                       | Template   |
| :------------------------- | :-------------------------------------------------------- | :--------- |
| MA Portal                  | `/projects/ma-portal/`                                    | Dashboard  |
| Assemblies (Gov Projects)  | `/projects/gov-projects/assemblies/`                      | Dashboard  |
| Customer Portal            | `/projects/gov-projects/assemblies/customer-portal/`      | Dashboard  |
| Inspector Portal           | `/projects/gov-projects/assemblies/inspector-portal/`     | Full Width |
| Lendscore (Lenders Portal) | `/projects/lendscore/lenders-portal/`                     | Dashboard  |

The landing page at `/projects/` is built from the auto-discovered project list.

---

## Architecture Overview

The codebase follows a **layered architecture** where each layer has a single responsibility:

```
┌─────────────────────────────────────────────────────────┐
│  PAGES  (src/pages/)                                    │
│  Pure content. Import AppLayout + project config.       │
├─────────────────────────────────────────────────────────┤
│  APP LAYOUT  (src/layouts/AppLayout.astro)              │
│  Single layout: reads config.template and renders       │
│  BaseLayout + the matching React template.              │
├─────────────────────────────────────────────────────────┤
│  BASE LAYOUT  (src/layouts/BaseLayout.astro)            │
│  Pure HTML shell: <head>, styles, data-theme,     │
│  fonts.                                                 │
├─────────────────────────────────────────────────────────┤
│  TEMPLATES  (src/templates/)                            │
│  React components that arrange the page structure       │
│  (sidebar + main, full width, etc.)                     │
├─────────────────────────────────────────────────────────┤
│  COMPONENTS  (src/components/)                          │
│  Fully reusable atoms / molecules / organisms.          │
│  Themed via CSS custom properties — no hardcoded colors.│
├─────────────────────────────────────────────────────────┤
│  THEME TOKENS  (src/styles/themes/tokens.css)           │
│  CSS custom properties per project, activated by the    │
│  data-theme attribute on <html>.                  │
├─────────────────────────────────────────────────────────┤
│  PROJECT REGISTRY  (src/config/)                        │
│  projects.ts auto-discovers src/projects/**/config.ts.  │
│  groups.ts lists top-level groups. types.ts defines     │
│  ProjectConfig + ProjectMeta.                           │
├─────────────────────────────────────────────────────────┤
│  VALIDATION  (src/integrations/validate-projects.ts)    │
│  Astro integration that checks theme/page/nav drift     │
│  on every dev start and `astro build`.                  │
└─────────────────────────────────────────────────────────┘
```

**Key principle:** Data flows downward. Pages import AppLayout and their project's config, then pass both to AppLayout. AppLayout applies the theme and picks the template (dashboard or fullwidth) from `config.template`. Components never know which project they belong to — they read CSS variables and accept props.

---

## Project Structure

```
src/
├── config/                           # Shared types, utilities & registry
│   ├── types.ts                      #   ProjectConfig, ProjectMeta, NavItem, ...
│   ├── utils.ts                      #   getNavWithActive(), extendConfig()
│   ├── groups.ts                     #   Static list of top-level project groups
│   └── projects.ts                   #   Auto-discovered project registry (glob)
│
├── integrations/
│   └── validate-projects.ts          # Astro integration: build-time validator
│
├── styles/
│   ├── global.css                    # Imports Tailwind + reset + tokens
│   ├── base/reset.css                # Minimal CSS reset
│   └── themes/tokens.css             # CSS custom properties per theme
│
├── components/                       # Shared, project-agnostic components
│   ├── atoms/                        #   Small building blocks
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── BrandLogo.tsx
│   │   ├── Button.tsx
│   │   ├── SidebarToggle.tsx
│   │   └── Spinner.tsx
│   ├── molecules/                    #   Composed atoms
│   │   ├── Dropdown.tsx
│   │   ├── DropdownMenuItem.tsx
│   │   ├── IconWithBadge.tsx
│   │   └── UserInfo.tsx
│   └── organisms/                    #   Larger composed components
│       ├── Navbar.tsx                #     v4 navbar (CSS-var themed)
│       ├── NavbarV5.tsx              #     @hubtel/react-ui wrapper
│       ├── Sidebar.tsx               #     v4 sidebar (CSS-var themed)
│       ├── SidebarV5.tsx             #     @hubtel/react-ui wrapper
│       └── UserProfileNavItem.tsx
│
├── templates/                        # React page shells
│   ├── DashboardTemplate.tsx         #   Sidebar + navbar + scrollable main
│   └── FullWidthTemplate.tsx         #   No sidebar, centered content
│
├── layouts/                          # Astro layouts (HTML wrappers)
│   ├── BaseLayout.astro              #   HTML shell + data-theme
│   └── AppLayout.astro               #   BaseLayout + template from config.template
│
├── projects/                         # Per-project configuration (auto-discovered)
│   ├── ma-portal/
│   │   └── config.ts                 #   exports { config, meta }
│   ├── lenders-portal/
│   │   └── config.ts                 #   exports { config, meta }
│   └── gov-projects/
│       └── assemblies/
│           ├── config.ts             #   parent: { config, meta }
│           ├── customer-portal/
│           │   └── config.ts         #   sub-project (extendConfig + parentId)
│           └── inspector-portal/
│               └── config.ts         #   sub-project (extendConfig + parentId)
│
└── pages/                            # Astro file-based routing
    ├── index.astro                   # Landing page (uses auto-discovered groups)
    ├── ma-portal/
    │   ├── index.astro
    │   └── settings.astro
    ├── gov-projects/
    │   └── assemblies/
    │       ├── index.astro
    │       ├── customer-portal/index.astro
    │       └── inspector-portal/index.astro
    └── lendscore/
        ├── index.astro
        └── lenders-portal/
            ├── index.astro
            ├── manage.astro
            ├── manage/                # subroutes (api-docs, api-keys, ...)
            └── ... (~27 pages)
```

---

## How It All Fits Together

Here's what happens when a user visits `/projects/ma-portal/settings`:

```
1. Astro matches → src/pages/ma-portal/settings.astro
2. That page imports AppLayout and the MA Portal config
3. Page passes config to → src/layouts/AppLayout.astro
4. AppLayout wraps with → src/layouts/BaseLayout.astro
     → sets <html data-theme="ma-portal" data-theme="blue">
     → loads global.css (which loads tokens.css)
     → reads config.template ("dashboard") and renders DashboardTemplate with client:load
5. DashboardTemplate (React) renders:
     → Sidebar / SidebarV5  (reads --sidebar-bg, --sidebar-text, etc.)
     → Navbar  / NavbarV5
     → Main content area (the page's <slot /> content)
```

The page file itself (always uses the `@/` path alias):

```astro
---
import AppLayout from "@/layouts/AppLayout.astro";
import { config } from "@/projects/ma-portal/config";
---

<AppLayout config={config} title="Settings">
  <h1>Settings</h1>
</AppLayout>
```

---

## Auto-Registration & Validation

The platform uses **two integrations** to keep the project list and configs honest without manual bookkeeping.

### Auto-discovery

`src/config/projects.ts` discovers every project at build time via Vite's `import.meta.glob`:

```ts
const projectModules = import.meta.glob<ProjectModule>(
  "/src/projects/**/config.ts",
  { eager: true },
);
```

Each `config.ts` MUST export two things:

| Export   | Type            | Purpose                                              |
| :------- | :-------------- | :--------------------------------------------------- |
| `config` | `ProjectConfig` | Drives layout, theme, nav, branding (used at runtime) |
| `meta`   | `ProjectMeta`   | Registry data — id, group, parentId, description, tags |

Projects are then grouped by `meta.group` (matched against `src/config/groups.ts`) and parent/child hierarchies are built from `meta.parentId`. **No manual edits to `projects.ts` are needed** when adding a project.

Missing exports, unknown groups, or unresolved parent ids produce warnings in the dev console — not crashes.

### Build-time validation

`src/integrations/validate-projects.ts` is wired into `astro.config.mjs`. On every dev start and `astro build`, it scans the source tree and reports drift:

| Check        | What it catches                                                                              |
| :----------- | :------------------------------------------------------------------------------------------- |
| `theme`      | A project sets `theme: "foo"` but tokens.css has no `[data-theme="foo"]` block         |
| `basePath`   | A project's `basePath` has no matching page under `src/pages/`                               |
| Nav `href`s  | A nav item links to a page that doesn't exist (skips empty strings and external URLs)        |

Example output when running `pnpm dev`:

```
[validate-projects] 2 issues found:
  ⚠ src/projects/ma-portal/config.ts: nav href "/projects/ma-portal/help" has no matching page under src/pages/
  ⚠ src/projects/foo/config.ts: theme "foo" has no [data-theme="foo"] block in tokens.css
```

To make warnings hard-fail the build, pass an option in `astro.config.mjs`:

```ts
integrations: [react(), validateProjects({ failOnError: true })],
```

---

## Step-by-Step: Add a New Project

Let's say you're adding a project called **"Payments Hub"**.

> Remember: the app is served under `/projects` (set by `astro.config.mjs` `base`). All in-app links must include that prefix.

### 1. Register the group (if it doesn't exist yet)

If the project belongs to an existing group (e.g. `lendscore`, `education`), skip this step. Otherwise add it to `src/config/groups.ts`:

```typescript
export const projectGroupsMeta: ProjectGroupMeta[] = [
  // ...
  {
    id: "payments",
    label: "Payments",
    description: "Money movement tooling.",
    order: 4,
  },
];
```

### 2. Create the project config (with `meta` for auto-registration)

Create `src/projects/payments-hub/config.ts`:

```typescript
import type { ProjectConfig, ProjectMeta } from "@/config/types";

export const meta: ProjectMeta = {
  id: "payments-hub",
  group: "payments",
  description: "Payouts, transactions, and settlements in one view.",
  tags: ["Dashboard"],
  // href defaults to config.basePath + "/" — override only if different
};

export const config: ProjectConfig = {
  name: "Payments Hub",
  basePath: "/projects/payments-hub",
  theme: "payments-hub",
  template: "dashboard",
  branding: {
    logo: "/projects/payments-hub/logo.svg",
    logoLabel: "Payments Hub",
  },
  navItems: [
    { label: "Overview",     href: "/projects/payments-hub/" },
    { label: "Transactions", href: "/projects/payments-hub/transactions" },
    { label: "Settlements",  href: "/projects/payments-hub/settlements" },
    { label: "Settings",     href: "/projects/payments-hub/settings" },
  ],
};
```

**You do NOT need to edit `src/config/projects.ts`** — the file is glob-driven and will pick this up automatically.

### 3. Add a theme

Add a block to `src/styles/themes/tokens.css` (use the **`data-theme`** attribute, not `data-theme`):

```css
[data-theme="payments-hub"] {
  --sidebar-bg: #1e1b4b;
  --sidebar-active-bg: #312e81;
  --sidebar-text: #ffffff;
  --sidebar-hover-bg: rgba(255, 255, 255, 0.1);
  --sidebar-border: rgba(255, 255, 255, 0.15);

  --primary: #4f46e5;
  --primary-light: #6366f1;
  --accent: #f59e0b;

  --content-bg: #f5f3ff;
  --content-text: #1e1b4b;
}
```

### 4. Create pages

Create `src/pages/payments-hub/index.astro`:

```astro
---
import AppLayout from "@/layouts/AppLayout.astro";
import { config } from "@/projects/payments-hub/config";
---

<AppLayout config={config} title="Overview">
  <h1>Payments Hub</h1>
  <p>Your payments overview goes here.</p>
</AppLayout>
```

### 5. Run `pnpm dev`

The validator will tell you immediately if anything is off:

```
[validate-projects] all configs OK
```

If you forgot a page for a nav href, or your theme key doesn't match a tokens block, you'll see a warning pointing at the offending file.

That's it. No per-project Layout file needed. The sidebar, theming, active nav states, responsive behavior, and landing-page card all work automatically.

---

## Step-by-Step: Add a Sub-Project

Sub-projects inherit from a parent using `extendConfig()`. They appear as children of the parent on the landing page when their `meta.parentId` points at the parent.

### Example: Adding "Merchant Portal" under Payments Hub

Create `src/projects/payments-hub/merchant-portal/config.ts`:

```typescript
import { extendConfig } from "@/config/utils";
import type { ProjectMeta } from "@/config/types";
import { config as parentConfig } from "@/projects/payments-hub/config";

export const meta: ProjectMeta = {
  id: "merchant-portal",
  group: "payments",         // same group as the parent
  parentId: "payments-hub",  // parent's meta.id
  description: "Merchant-facing payouts and API keys.",
  tags: ["Dashboard"],
  order: 1,
};

export const config = extendConfig(parentConfig, {
  name: "Merchant Portal",
  basePath: "/projects/payments-hub/merchant-portal",
  theme: "payments-hub", // same theme as parent, or use a different one
  navItems: [
    { label: "Dashboard", href: "/projects/payments-hub/merchant-portal/" },
    { label: "Payouts",   href: "/projects/payments-hub/merchant-portal/payouts" },
    { label: "API Keys",  href: "/projects/payments-hub/merchant-portal/api-keys" },
  ],
});
```

`extendConfig()` does a shallow merge, meaning:
- `name`, `basePath`, `navItems`, `theme`, `template` — overridden by whatever you pass
- `branding` — shallow-merged (parent logo/label used unless you explicitly override)
- `fonts` — fully replaced when set (no inheritance)

Then create page files that import AppLayout and the sub-project config (same pattern as top-level projects). The validator will warn if any nav href doesn't have a matching page.

---

## Theming

Themes are powered by **CSS custom properties** defined in `src/styles/themes/tokens.css`.

### How it works

1. Each project's `config.ts` has a `theme` key (e.g. `"ma-portal"`)
2. `BaseLayout.astro` sets `<html data-theme="ma-portal">`
3. CSS selectors like `[data-theme="ma-portal"]` activate that theme's tokens
4. Components reference tokens with `var(--sidebar-bg)`, `var(--primary)`, etc.

> **Two theme attributes:** `data-theme` is the platform's own token system. `data-theme` is set separately from `config.v5Theme` and powers `@hubtel/react-ui` v5 components (e.g. `data-theme="blue"`). Use them independently.

### Available tokens

| Token               | Used by          | Description                          |
| :------------------ | :--------------- | :----------------------------------- |
| `--sidebar-width`   | Sidebar          | Width of the sidebar                 |
| `--sidebar-bg`      | Sidebar          | Background color                     |
| `--sidebar-active-bg` | Sidebar        | Active nav item background           |
| `--sidebar-text`    | Sidebar          | Text color                           |
| `--sidebar-hover-bg`| Sidebar          | Hovered nav item background          |
| `--sidebar-border`  | Sidebar          | Border color (header/footer dividers)|
| `--navbar-bg`       | Navbar           | Navbar background                    |
| `--navbar-text`     | Navbar           | Navbar text color                    |
| `--navbar-border`   | Navbar           | Navbar bottom border                 |
| `--primary`         | General          | Primary brand color                  |
| `--primary-light`   | General          | Lighter primary variant              |
| `--accent`          | General          | Accent / highlight color             |
| `--content-bg`      | Main area        | Page content background              |
| `--content-text`    | Main area        | Page content text color              |

### Per-Project Fonts

Each project can define its own typography. Fonts apply to both headings and body by default, or you can specify different fonts for each.

**Single font for the whole project:**

```typescript
fonts: "'Inter', sans-serif",
```

**Different fonts for headings vs body:**

```typescript
fonts: {
  body: "'Inter', sans-serif",
  heading: "'Space Grotesk', sans-serif",  // optional; falls back to body if omitted
},
```

Fonts are applied as CSS custom properties (`--font-body`, `--font-heading`) on `<html>`. Body text and headings (h1–h6) use these variables via `global.css`.

**Sub-projects:** When a sub-project sets `fonts`, it **fully replaces** the parent's fonts — no inheritance. A child project's font choice overrides the parent entirely.

### Using tokens in your components

```tsx
// In inline styles (best for dynamic theme values)
<div style={{ backgroundColor: "var(--primary)" }}>...</div>

// In Tailwind v4 shorthand (preferred)
<div className="bg-(--primary) text-(--content-text)">...</div>
```

---

## Templates and Layouts

### What's the difference?

| Concept         | File type   | Purpose                                        |
| :-------------- | :---------- | :--------------------------------------------- |
| **Template**    | `.tsx`      | React component that defines page structure (where sidebar goes, where content goes) |
| **Layout**      | `.astro`    | AppLayout: reads `config.template`, composes BaseLayout + the matching Template, applies theme |

### Available templates

| Template               | Description                                      |
| :--------------------- | :----------------------------------------------- |
| `DashboardTemplate`    | Sidebar on the left, scrollable main content     |
| `FullWidthTemplate`    | No sidebar, centered content (max-width: 7xl)    |

### Available layouts

| Layout                 | Composes                                                                 |
| :--------------------- | :----------------------------------------------------------------------- |
| `BaseLayout.astro`     | HTML shell only — `<head>`, styles, `data-theme` (used internally)       |
| `AppLayout.astro`      | BaseLayout + template chosen by `config.template` (dashboard/fullwidth) |

---

## Creating a New Template

If you need a layout structure that doesn't exist yet (e.g. top navbar + content, split pane, etc.):

### 1. Add the template name to the type

In `src/config/types.ts`, add your template to `TemplateName`:

```typescript
export type TemplateName = "dashboard" | "fullwidth" | "navbar";
```

### 2. Create the React template

Create `src/templates/NavbarTemplate.tsx`:

```tsx
import React from "react";
import type { ProjectConfig } from "@/config/types";

interface NavbarTemplateProps {
  children: React.ReactNode;
  pathname: string;
  config: ProjectConfig;
}

export default function NavbarTemplate({
  children,
  pathname,
  config,
}: Readonly<NavbarTemplateProps>) {
  return (
    <div className="min-h-dvh flex flex-col">
      <header
        className="h-16 flex items-center px-6 border-b"
        style={{
          backgroundColor: "var(--navbar-bg)",
          color: "var(--navbar-text)",
          borderColor: "var(--navbar-border)",
        }}
      >
        <span className="font-bold">{config.name}</span>
        <nav className="ml-8 flex gap-4">
          {config.navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
```

### 3. Add a branch in AppLayout

In `src/layouts/AppLayout.astro`, import the new template and add a conditional branch:

```astro
import NavbarTemplate from "@/templates/NavbarTemplate.tsx";
// ... existing code ...

{config.template === "navbar" && (
  <NavbarTemplate config={config} pathname={pathname} client:load>
    <slot />
  </NavbarTemplate>
)}
```

### 4. Use it in a project config

Set `template: "navbar"` in the project's `config.ts`. Pages already import AppLayout and pass config, so no change there.

---

## Shared Components

All components live in `src/components/` and are organized by atomic design.

### Atoms (`src/components/atoms/`)

| Component       | Description                              |
| :-------------- | :--------------------------------------- |
| `Avatar`        | Round avatar with image or initials fallback |
| `Badge`         | Numeric pill (notification counts, etc.) |
| `BrandLogo`     | Logo image + optional text label         |
| `Button`        | Generic button (variants, loading state) |
| `SidebarToggle` | Mobile hamburger toggle                  |
| `Spinner`       | Loading indicator                        |

### Molecules (`src/components/molecules/`)

| Component          | Description                                       |
| :----------------- | :------------------------------------------------ |
| `Dropdown`         | Generic dropdown shell with controlled open state |
| `DropdownMenuItem` | Item inside a dropdown (link or button)           |
| `IconWithBadge`    | Icon button/link with optional notification badge |
| `UserInfo`         | Name + designation block                          |

### Organisms (`src/components/organisms/`)

| Component             | Description                                                  |
| :-------------------- | :----------------------------------------------------------- |
| `Sidebar`             | v4 sidebar — themed via CSS variables, driven by props       |
| `SidebarV5`           | Thin wrapper around `@hubtel/react-ui` v5 sidebar            |
| `Navbar`              | v4 navbar — bell icon, profile dropdown                      |
| `NavbarV5`            | Thin wrapper around `@hubtel/react-ui` v5 navigation header  |
| `UserProfileNavItem`  | Avatar + name + dropdown menu (used inside Navbar)           |

### Rules for shared components

1. **Never hardcode colors** — use CSS variables (`var(--sidebar-bg)`) or accept them as props
2. **Never import project-specific data** — receive everything via props
3. **Keep them generic** — they should work for any project configuration

---

## Configuration Reference

### `ProjectConfig`

`ProjectConfig` is a typed union that supports both:

- **v4 sidebar/navbar**: prop-driven sidebar + navbar using `navItems`, `branding`, etc.
- **v5 sidebar/navbar**: `@hubtel/react-ui` v5 components via `v5SidebarProps` / `v5NavbarProps`

The base fields (shared for all variants):

```typescript
interface ProjectConfigBase {
  name: string;
  basePath: string;
  /** Theme key — maps to a [data-theme="..."] selector in tokens.css */
  theme: string;
  /** v5 theme key — maps to a [data-theme="..."] selector in tokens.css */
  v5Theme?: string;
  template: "dashboard" | "fullwidth";

  fonts?: ProjectFonts;

  userProfile?: UserProfile;
  navbarTitle?: string;
  notificationCount?: number;
  profileDropdownActions?: NavbarDropdownAction[];
}
```

Sidebar options:

```typescript
// V4 sidebar (default) — REQUIRED: navItems + branding
{
  sidebarType?: "v4";
  navItems: NavItem[];
  branding: ProjectBranding;
  iconBasePath?: string;
  sidebarFooter?: string | NavItem[] | null;
  sidebarFooterBorder?: boolean;
}

// V5 sidebar — REQUIRED: v5SidebarProps
{
  sidebarType: "v5";
  v5SidebarProps: Record<string, any>;
  navItems?: NavItem[];
  branding?: ProjectBranding;
  iconBasePath?: string;
  sidebarFooter?: string | NavItem[] | null;
  sidebarFooterBorder?: boolean;
}
```

Navbar options:

```typescript
// V4 navbar (default)
{ navbarType?: "v4" }

// V5 navbar
{ navbarType: "v5"; v5NavbarProps: Record<string, any> }
```

### `ProjectFonts`

```typescript
// Single font for both body and headings
fonts: "'Inter', sans-serif";

// Or different fonts for each
fonts: {
  body?: string;    // Font for body text (e.g. "'Source Sans 3', sans-serif")
  heading?: string; // Font for h1–h6; falls back to body if omitted
};
```

### `NavItem`

```typescript
interface NavItem {
  label: string;          // Display text
  href: string;           // Full path (e.g. "/ma-portal/settings")
  icon?: string;          // Icon identifier (for future use)
  badgeCount?: number;    // Red badge counter (e.g. notification count)
  badgeColor?: string;    // Badge background color (e.g. "#dc2626" or "var(--accent)")
  children?: NavItem[];   // Nested sub-nav items (for future use)
}
```

### `ProjectBranding`

```typescript
interface ProjectBranding {
  logo: string;           // URL or path to logo image
  logoLabel?: string;     // Text shown next to/below logo
  logoWidth?: number;     // Logo width in pixels (default: 72)
  logoHeight?: number;    // Logo height in pixels (default: 72)
}
```

### `ProjectMeta`

Discovery metadata that each project's `config.ts` exports alongside `config`. It powers the auto-registered `projectGroups` and the landing page.

```typescript
interface ProjectMeta {
  id: string;          // Unique within the group, e.g. "lenders-portal"
  group: string;       // Must match an entry in src/config/groups.ts
  parentId?: string;   // For sub-projects: the parent's meta.id (same group)
  description: string; // Shown on the landing-page card
  tags?: string[];     // Optional pills on the card
  href?: string;       // Defaults to config.basePath + "/"
  order?: number;      // Sort order within the group (default 0)
}
```

### `ProjectGroupMeta`

Static group registration in `src/config/groups.ts`.

```typescript
interface ProjectGroupMeta {
  id: string;          // Referenced by ProjectMeta.group
  label: string;       // Display label on the landing page
  description?: string;
  order?: number;      // Sort order across groups (default 0)
}
```

### `extendConfig(parent, overrides)`

Creates a child config by merging a parent with overrides. Branding is shallow-merged (you can override just `logoLabel` without losing the parent's `logo`). Fonts fully replace the parent when set — no inheritance.

```typescript
const childConfig = extendConfig(parentConfig, {
  name: "Child Project",           // required
  basePath: "/parent/child",       // required
  navItems: [...],                 // required
  theme: "child-theme",           // optional — inherits parent if omitted
  template: "fullwidth",          // optional — inherits parent if omitted
  branding: { logoLabel: "Child" }, // optional — merged with parent branding
  fonts: "'Inter', sans-serif",    // optional — fully replaces parent fonts when set
});
```

---

## Import Conventions

The project uses the `@/` path alias (mapped to `src/` in both `tsconfig.json` and `astro.config.mjs`) for **every** internal import. Relative `../../` imports are not used anywhere in `src/`.

```ts
// ✅ Good — works from any depth
import AppLayout from "@/layouts/AppLayout.astro";
import { config } from "@/projects/lenders-portal/config";
import type { ProjectConfig } from "@/config/types";

// ❌ Avoid
import AppLayout from "../../layouts/AppLayout.astro";
```

External package imports (`react`, `@hubtel/react-ui/*`, etc.) keep their bare-specifier form.

---

## Commands

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `pnpm install`    | Install dependencies                            |
| `pnpm dev`        | Start dev server at `localhost:4321/projects/`  |
| `pnpm build`      | Build production site to `./dist/`              |
| `pnpm preview`    | Preview production build locally                |

The dev/build commands also run the **project validator** (`src/integrations/validate-projects.ts`) and print any drift between configs, pages, and theme tokens.

---

## FAQ

### Do I have to create a project layout for every project?

No. Pages import AppLayout and the project config directly. This keeps project setup minimal: one config file per project, no Layout.astro boilerplate. Just add the theme to `tokens.css` and create pages that pass `config` to AppLayout.

### Do I have to register the project in `projects.ts`?

No. `src/config/projects.ts` auto-discovers every `src/projects/**/config.ts` at build time via `import.meta.glob`. As long as your file exports both `config` and `meta`, the project shows up automatically in `projectGroups` and on the landing page.

### What happens if I forget to add `meta` to a project config?

The auto-registry logs a console warning naming the file and skips it. The dev server keeps running, but the project won't appear in `projectGroups`. The validator will not produce a separate warning for this (it's caught by the registry).

### How do I know my config is valid?

Run `pnpm dev` or `pnpm build`. The validator prints `[validate-projects] all configs OK` on success, or a list of warnings for drifting hrefs, missing pages, and themes without tokens. To turn warnings into a hard build failure, pass `validateProjects({ failOnError: true })` in `astro.config.mjs`.

### Can two projects share the same theme?

Yes. Just use the same `theme` key in both configs. Sub-projects often do this — e.g. Inspector Portal could use `theme: "gov-projects"` to look identical to its parent.

### What if a project needs a page without a sidebar?

Two options:

1. **Whole project without sidebar:** Set `template: "fullwidth"` in the project config. AppLayout picks the template from config automatically — no layout change needed.
2. **Single page without sidebar:** That page can import AppLayout and pass a config with `template: "fullwidth"` (e.g. spread the project config and override template):

```astro
---
import AppLayout from "@/layouts/AppLayout.astro";
import { config } from "@/projects/my-project/config";
---

<AppLayout config={{ ...config, template: "fullwidth" }} title="Special Page">
  <h1>This page has no sidebar</h1>
</AppLayout>
```

### How do I add a navbar to a template?

Create a new `Navbar.tsx` component in `src/components/organisms/`, then include it in whichever template needs it (e.g. `DashboardTemplate` or a new `NavbarTemplate`). The navbar should read from `config.navItems` and theme tokens just like the sidebar does.

### Can sub-projects have completely different looks?

Yes. Sub-projects can override everything — theme, template, nav items, branding, and fonts. The `extendConfig()` helper just provides convenient inheritance for the things you *don't* want to change. Fonts fully replace when set (no merge with parent).

### How do I use per-project fonts?

Add a `fonts` key to your project config — either a single string for both body and headings, or an object with `body` and optionally `heading`. Ensure the font is loaded (e.g. via Google Fonts `<link>` in your layout or a global stylesheet).

### Where do I put project-specific components?

If a component is only used by one project, put it in that project's folder:

```
src/projects/payments-hub/
  config.ts
  components/           ← project-specific components
    PaymentChart.tsx
    TransactionTable.tsx
```

If a component might be used by multiple projects, put it in `src/components/`.

---

## Tech Stack

- [Astro](https://astro.build/) v5 — Static site generator with island architecture
- [React](https://react.dev/) v19 — Interactive components (sidebar toggle, etc.)
- [Tailwind CSS](https://tailwindcss.com/) v4 — Utility-first CSS via Vite plugin
