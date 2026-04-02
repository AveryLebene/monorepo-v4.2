# TODO / Task Board

This is the working task board for the repo.

For a higher-level “what we’ve done so far” snapshot, see `task.md` in the repo root.

## Now

- [ ] Reconcile and commit current Lenders Portal changes
  - [ ] `src/pages/lendscore/lenders-portal/bank-uploaded.astro`
  - [ ] `src/pages/lendscore/lenders-portal/bank-uploaded-details.astro`
  - [ ] Validate navigation links match pages (no 404s)
- [ ] Remove or rename legacy typo folder `src/projects/lenders-portal/lensdcore/` (currently unused)

## Next

- [x] Add a `docs/` folder and establish DAC entrypoint (`docs/index.md`)
- [ ] Add a curated route index for `/lendscore/lenders-portal/` (the folder contains many pages)

## Done

- [x] Multi-project Astro platform foundation (Astro v5 + React + Tailwind v4)
- [x] Config-driven layout, theming, and templates
- [x] Added Lendscore / Lenders Portal pages and config structure (sidebar footer, icons, profile)
- [x] DAC docs generated (index/overview/architecture/flows/operations/adr)

  - [x] `docs/index.md`
  - [x] `docs/overview.md`
  - [x] `docs/architecture/index.md`
  - [x] `docs/flows/app-layout-rendering.md`
  - [x] `docs/flows/add-new-project.md`
  - [x] `docs/operations/index.md`
  - [x] `docs/adr/0001-choose-astro-multi-project-platform.md`

## Review

- Keep `README.md` current with the actual configs and live routes.
- Avoid project-specific logic inside shared components; drive UI via `ProjectConfig`.
- Review and fill all `[NEEDS_INPUT]` / `[TODO]` / `[VERIFY_WITH_TEAM]` markers across `docs/`.
- Ensure Mermaid diagrams render correctly in your markdown viewer and keep diagrams updated when layout/config flows change.

