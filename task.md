# Task Board (Project Work Log)

This file is a **living task board** and work log for what this repository has delivered so far.

## Delivered (so far)

- [x] **Multi-project Astro platform foundation**
  - [x] Astro v5 + React integration (`@astrojs/react`)
  - [x] Tailwind CSS v4 via Vite plugin (`@tailwindcss/vite`)
  - [x] `@` path alias to `src/` (Astro + TypeScript)
- [x] **Config-driven project system**
  - [x] `ProjectConfig` types and helpers (`src/config/types.ts`, `src/config/utils.ts`)
  - [x] Template selection via `config.template` (dashboard vs fullwidth)
  - [x] Theming via CSS tokens + `data-theme` (and optional v5 theme key)
  - [x] Per-project typography support (`fonts`)
- [x] **Shared layout + templates**
  - [x] `BaseLayout.astro` for the HTML shell and theme/font application
  - [x] `AppLayout.astro` to compose BaseLayout + template
  - [x] React templates for page shells (`src/templates/`)
- [x] **Shared navigation UI**
  - [x] Sidebar-based dashboard shell (config-driven nav items + branding)
  - [x] Support in config for:
    - [x] Sidebar footer links
    - [x] Nav icon base path
    - [x] Navbar title, notifications, and user profile + dropdown actions
    - [x] Optional v5 sidebar/navbar props for `@hubtel/react-ui` v5 usage
- [x] **Portals/pages currently present in `src/pages/`**
  - [x] MA Portal (`/ma-portal/*`)
  - [x] Gov Projects + sub-portals (`/gov-projects/*`)
  - [x] Lendscore — Lenders Portal (`/lendscore/lenders-portal/*`)
    - [x] Dashboard (`/lendscore/lenders-portal/`)
    - [x] Flows/pages: report search, reports, borrower reporting, uploads, transactions, etc.
    - [x] Management section under `/lendscore/lenders-portal/manage/*` (API keys/docs, audit logs, employees, bulk downloads)

## In progress / local changes (uncommitted)

- [ ] **Lenders Portal updates**
  - [ ] `src/pages/lendscore/lenders-portal/bank-uploaded.astro`
  - [ ] `src/pages/lendscore/lenders-portal/bank-uploaded-details.astro`
  - [ ] Cleanup: deleted legacy config at `src/projects/lenders-portal/lensdcore/config.ts`

## Known gaps / follow-ups

- [ ] **Docs folder**
  - [ ] Create `docs/` (the README previously referenced `docs/index.md`, but it doesn’t exist yet)
- [ ] **Legacy/typo folder cleanup**
  - [ ] Decide whether to remove `src/projects/lenders-portal/lensdcore/` directory entirely (currently unused)
- [ ] **Route inventory**
  - [ ] Optional: add a generated route index (or a short curated list) for `lendscore/lenders-portal` since it contains many pages

## Git milestones (from history)

- [x] `efe547c` — built basic sidebar and project structure
- [x] `5845226` — font and multi project setup

## Review notes

- **README coverage**: Ensure `README.md` lists the live projects and reflects the current `ProjectConfig` shape (v4/v5, footer, icons, profile).
- **Consistency**: Keep `src/pages/*` and `src/projects/*/config.ts` aligned (base paths, nav hrefs, and themes).

