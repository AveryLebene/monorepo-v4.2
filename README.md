# Hubtel Multi-Project Platform

A modular Astro project designed to house multiple independent projects (portals, dashboards, tools) under a single codebase. Every shared component — sidebar, navbar, buttons, etc. — is built once and themed per project via configuration. No duplication.

## Table of Contents

- [Documentation](#documentation)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [How It All Fits Together](#how-it-all-fits-together)
- [Step-by-Step: Add a New Project](#step-by-step-add-a-new-project)
- [Step-by-Step: Add a Sub-Project](#step-by-step-add-a-sub-project)
- [Theming](#theming)
- [Per-Project Fonts](#per-project-fonts)
- [Templates and Layouts](#templates-and-layouts)
- [Creating a New Template](#creating-a-new-template)
- [Shared Components](#shared-components)
- [Configuration Reference](#configuration-reference)
- [Commands](#commands)
- [FAQ](#faq)

---

## Documentation

This repository uses Docs-as-Code documentation under [`docs/`](docs/) (start here: [`docs/index.md`](docs/index.md)).

The `README.md` is still useful for onboarding, but DAC documentation should be updated alongside code changes.

---

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:4321
```

Visit the live projects:

| Project                  | URL                                                      | Template   |
| :----------------------- | :------------------------------------------------------- | :--------- |
| MA Portal                | `/ma-portal/`                                            | Dashboard  |
| Gov Projects             | `/gov-projects/`                                         | Dashboard  |
| Customer Portal          | `/gov-projects/assemblies/customer-portal/`              | Dashboard  |
| Inspector Portal         | `/gov-projects/assemblies/inspector-portal/`             | Full Width |
| Lendscore (Lenders Portal) | `/lendscore/lenders-portal/`                           | Dashboard  |

---

## Architecture Overview

The codebase follows a **layered architecture** where each layer has a single responsibility:

```
┌─────────────────────────────────────────────────────────┐
│  PAGES  (src/pages/)                                    │
│  Pure content. Import AppLayout + project config.      │
├─────────────────────────────────────────────────────────┤
│  APP LAYOUT  (src/layouts/AppLayout.astro)              │
│  Single layout: reads config.template and renders       │
│  BaseLayout + the matching React template.              │
├─────────────────────────────────────────────────────────┤
│  BASE LAYOUT  (src/layouts/BaseLayout.astro)            │
│  Pure HTML shell: <head>, styles, data-theme, fonts.     │
├─────────────────────────────────────────────────────────┤
│  TEMPLATES  (src/templates/)                            │
│  React components that arrange the page structure       │
│  (sidebar + main, full width, etc.)                     │
├─────────────────────────────────────────────────────────┤
│  COMPONENTS  (src/components/)                          │
│  Fully reusable atoms & organisms. Project-agnostic.    │
│  Themed via CSS custom properties — no hardcoded colors.│
├─────────────────────────────────────────────────────────┤
│  THEME TOKENS  (src/styles/themes/tokens.css)           │
│  CSS custom properties per project, activated by the    │
│  data-theme attribute on <html>.                        │
└─────────────────────────────────────────────────────────┘
```

**Key principle:** Data flows downward. Pages import AppLayout and their project's config, then pass both to AppLayout. AppLayout applies the theme and picks the template (dashboard or fullwidth) from `config.template`. Components never know which project they belong to — they read CSS variables and accept props.

---

## Project Structure

```
src/
├── config/                           # Shared types & utilities
│   ├── types.ts                      #   ProjectConfig, NavItem, ProjectBranding
│   └── utils.ts                      #   getNavWithActive(), extendConfig()
│
├── styles/
│   ├── global.css                    # Imports Tailwind + reset + tokens
│   ├── base/reset.css                # Minimal CSS reset
│   └── themes/tokens.css             # CSS custom properties per theme
│
├── components/                       # Shared, project-agnostic components
│   ├── atoms/                        #   Small building blocks
│   │   ├── BrandLogo.tsx             #     Logo + label
│   │   ├── Button.tsx                #     Generic button
│   │   ├── SidebarToggle.tsx         #     Mobile hamburger toggle
│   │   └── Spinner.tsx               #     Loading spinner
│   └── organisms/                    #   Larger composed components
│       └── Sidebar.tsx               #     Sidebar — fully driven by props + CSS vars
│
├── templates/                        # React page shells
│   ├── DashboardTemplate.tsx         #   Sidebar + scrollable main area
│   └── FullWidthTemplate.tsx         #   No sidebar, centered content
│
├── layouts/                          # Astro layouts (HTML wrappers)
│   ├── BaseLayout.astro              #   HTML shell: <head>, <body>, data-theme
│   └── AppLayout.astro               #   BaseLayout + template from config.template
│
├── projects/                         # Per-project configuration
│   ├── ma-portal/
│   │   └── config.ts                 #   Nav items, theme, branding, template
│   └── gov-projects/
│       └── assemblies/
│           ├── config.ts             #   Assemblies root config
│           ├── inspector-portal/
│           │   └── config.ts         #   Extends gov-projects; template: "fullwidth"
│           └── customer-portal/
│               └── config.ts        #   Extends gov-projects; template: "dashboard"
│
│   └── lenders-portal/
│       ├── config.ts                 #   Lendscore / Lenders Portal config (sidebar footer, icons, profile)
│       └── lensdcore/                #   (legacy/typo folder; currently unused)
│
└── pages/                            # Astro file-based routing (actual page files)
    ├── ma-portal/
    │   ├── index.astro
    │   └── settings.astro
    └── gov-projects/
        ├── index.astro
        └── assemblies/
            ├── inspector-portal/
            │   └── index.astro
            └── customer-portal/
                └── index.astro
    └── lendscore/
        ├── index.astro
        └── lenders-portal/
            ├── index.astro
            ├── manage.astro
            ├── bank-uploaded.astro
            ├── bank-uploaded-details.astro
            ├── upload-data.astro
            ├── credit-report.astro
            ├── credit-transactions.astro
            └── manage/
                ├── api-docs.astro
                ├── api-keys.astro
                ├── audit-logs.astro
                ├── bulk-downloads.astro
                └── employees.astro
```

---

## How It All Fits Together

Here's what happens when a user visits `/ma-portal/settings`:

```
1. Astro matches → src/pages/ma-portal/settings.astro
2. That page imports AppLayout and the MA Portal config
3. Page passes config to → src/layouts/AppLayout.astro
4. AppLayout wraps with → src/layouts/BaseLayout.astro
     → sets <html data-theme="ma-portal">
     → loads global.css (which loads tokens.css)
     → reads config.template ("dashboard") and renders DashboardTemplate with client:load
5. DashboardTemplate (React) renders:
     → Sidebar  (reads --sidebar-bg, --sidebar-text, etc. from CSS vars)
     → Main content area (the page's <slot /> content)
```

The page file itself (optionally using the `@/` path alias):

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

## Step-by-Step: Add a New Project

Let's say you're adding a project called **"Payments Hub"**.

### 1. Create the project config

Create `src/projects/payments-hub/config.ts`:

```typescript
import type { ProjectConfig } from "../../config/types";

export const config: ProjectConfig = {
  name: "Payments Hub",
  basePath: "/payments-hub",
  theme: "payments-hub",
  template: "dashboard",
  branding: {
    logo: "/images/payments-logo.svg",
    logoLabel: "Payments Hub",
  },
  navItems: [
    { label: "Overview", href: "/payments-hub/" },
    { label: "Transactions", href: "/payments-hub/transactions" },
    { label: "Settlements", href: "/payments-hub/settlements" },
    { label: "Settings", href: "/payments-hub/settings" },
  ],
};
```

### 2. Add a theme

Add a block to `src/styles/themes/tokens.css`:

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

### 3. Create pages

Create `src/pages/payments-hub/index.astro`:

```astro
---
import AppLayout from "../../layouts/AppLayout.astro";
import { config } from "../../projects/payments-hub/config";
---

<AppLayout config={config} title="Overview">
  <h1>Payments Hub</h1>
  <p>Your payments overview goes here.</p>
</AppLayout>
```

That's it. No per-project Layout file needed. The sidebar, theming, active nav states, and responsive behavior all work automatically.

---

## Step-by-Step: Add a Sub-Project

Sub-projects inherit from a parent using `extendConfig()`. They get the parent's branding by default but can override anything.

### Example: Adding "Merchant Portal" under Payments Hub

Create `src/projects/payments-hub/merchant-portal/config.ts`:

```typescript
import { extendConfig } from "../../../config/utils";
import { config as parentConfig } from "../config";

export const config = extendConfig(parentConfig, {
  name: "Merchant Portal",
  basePath: "/payments-hub/merchant-portal",
  theme: "payments-hub",  // same theme as parent, or use a different one
  navItems: [
    { label: "Dashboard", href: "/payments-hub/merchant-portal/" },
    { label: "Payouts", href: "/payments-hub/merchant-portal/payouts" },
    { label: "API Keys", href: "/payments-hub/merchant-portal/api-keys" },
  ],
});
```

`extendConfig()` does a shallow merge, meaning:
- `name`, `basePath`, `navItems`, `theme`, `template` — overridden by whatever you pass
- `branding` — shallow-merged (parent logo/label used unless you explicitly override)

Then create page files that import AppLayout and the sub-project config (same pattern as top-level projects).

---

## Theming

Themes are powered by **CSS custom properties** defined in `src/styles/themes/tokens.css`.

### How it works

1. Each project's `config.ts` has a `theme` key (e.g. `"ma-portal"`)
2. `BaseLayout.astro` sets `<html data-theme="ma-portal">`
3. CSS selectors like `[data-theme="ma-portal"]` activate that theme's tokens
4. Components reference tokens with `var(--sidebar-bg)`, `var(--primary)`, etc.

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

// In Tailwind arbitrary values
<div className="bg-[var(--primary)] text-[var(--content-text)]">...</div>
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
import type { ProjectConfig } from "../config/types";

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
import NavbarTemplate from "../templates/NavbarTemplate.tsx";
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

All components live in `src/components/` and are organized by atomic design:

### Atoms (`src/components/atoms/`)

Small, single-purpose building blocks:

| Component         | Props                                                   | Description                |
| :---------------- | :------------------------------------------------------ | :------------------------- |
| `BrandLogo`       | `imgSrc`, `label?`, `direction?`, `width?`, `height?`   | Logo image + optional text |
| `Button`          | `label`, `onClick`, `variant?`, `size?`, `loading?`, etc. | Generic button           |
| `SidebarToggle`   | `onClick`                                               | Hamburger menu button      |
| `Spinner`         | —                                                       | Loading indicator          |

### Organisms (`src/components/organisms/`)

Larger composed components:

| Component  | Props                                        | Description                              |
| :--------- | :------------------------------------------- | :--------------------------------------- |
| `Sidebar`  | `isOpen`, `navItems`, `pathname`, `branding`, etc. | Full sidebar with nav, branding, theming |
| `Navbar`   | —                                            | Top navbar (used by DashboardTemplate)   |

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
  /** Theme key — maps to a [data-theme-astro="..."] selector in tokens.css */
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

## Commands

| Command              | Action                                         |
| :------------------- | :--------------------------------------------- |
| `npm install`        | Install dependencies                           |
| `npm run dev`        | Start dev server at `localhost:4321`            |
| `npm run build`      | Build production site to `./dist/`              |
| `npm run preview`    | Preview production build locally                |

---

## FAQ

### Do I have to create a project layout for every project?

No. Pages import AppLayout and the project config directly. This keeps project setup minimal: one config file per project, no Layout.astro boilerplate. Just add the theme to `tokens.css` and create pages that pass `config` to AppLayout.

### Can two projects share the same theme?

Yes. Just use the same `theme` key in both configs. Sub-projects often do this — e.g. Inspector Portal could use `theme: "gov-projects"` to look identical to its parent.

### What if a project needs a page without a sidebar?

Two options:

1. **Whole project without sidebar:** Set `template: "fullwidth"` in the project config. AppLayout picks the template from config automatically — no layout change needed.
2. **Single page without sidebar:** That page can import AppLayout and pass a config with `template: "fullwidth"` (e.g. spread the project config and override template):

```astro
---
import AppLayout from "../../layouts/AppLayout.astro";
import { config } from "../../projects/my-project/config";
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
