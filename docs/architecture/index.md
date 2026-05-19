# Hubtel Multi-Project Platform Architecture

## Overall System Structure

This is a frontend Astro application organized as a layered system:

- **Pages** under `src/pages/` define file-based routes and compose the app by importing `AppLayout` plus a project config.
- **Layouts** under `src/layouts/` provide the HTML shell (`BaseLayout.astro`) and the project-aware composition (`AppLayout.astro`).
- **Templates** under `src/templates/` are React components that define page chrome (dashboard vs full-width).
- **Components** under `src/components/` are shared, project-agnostic building blocks themed via CSS variables.
- **Theme tokens** from `@projects/styles` define per-project CSS custom properties activated by `data-theme`.

_Source: `README.md` (“Architecture Overview”, “Project Structure”), `src/layouts/AppLayout.astro`, `src/layouts/BaseLayout.astro`, `src/styles/themes/tokens.css`_

## Major Components

### Routing and page composition (`src/pages/`)

Astro file-based routing maps URL paths to `.astro` files under `src/pages/`.

_Source: `README.md`, `src/pages/`_

### App layout (`src/layouts/AppLayout.astro`)

`AppLayout` is the single composition point for all projects: it wraps content in `BaseLayout` and chooses which React template to render based on `config.template` (`dashboard` or `fullwidth`).

_Source: `src/layouts/AppLayout.astro`_

### Base HTML shell (`src/layouts/BaseLayout.astro`)

`BaseLayout` imports global styles, sets `data-theme` (and optionally `data-v5-theme` for @hubtel/react-ui v5), and applies font CSS variables. It does not render navigation chrome directly.

_Source: `src/layouts/BaseLayout.astro`, `src/styles/global.css`_

### React templates (`src/templates/`)

- `DashboardTemplate.tsx`: renders sidebar + navbar variants and a scrollable main content area.
- `FullWidthTemplate.tsx`: renders content without sidebar chrome.

_Source: `src/templates/DashboardTemplate.tsx`, `src/templates/FullWidthTemplate.tsx`_

### Configuration model (`src/config/types.ts`, `src/projects/**/config.ts`)

Each project defines a `ProjectConfig` which includes routing base path, theme keys, template selection, branding, navigation items, and (optionally) v5 sidebar/navbar props.

_Source: `src/config/types.ts`, `src/projects/ma-portal/config.ts`_

### Theming (`src/styles/themes/tokens.css`)

Themes are implemented as CSS custom properties. Each project theme corresponds to a `[data-theme="<theme>"]` selector in `@projects/styles`; components use variables rather than hard-coded colors.

_Source: `src/styles/themes/tokens.css`, `README.md`_

## Dependencies

### Internal Dependencies

[TODO: Identify internal Hubtel services this repo depends on, if any.]

### External Dependencies

- **Astro** (core framework)  
  _Source: `package.json`_
- **React** (template layer via `@astrojs/react`)  
  _Source: `package.json`, `astro.config.mjs`_
- **Tailwind CSS** (styling/tooling)  
  _Source: `package.json`, `astro.config.mjs`_
- **Hubtel UI packages** (`@hubtel/react-ui`, `@hubtel/shared-styles`, `@hubtel/react-icons`)  
  _Source: `package.json`, `src/styles/global.css`_

### Technology Stack

- **Language/Runtime:** Node.js (required to run Astro)  
  _Source: `package.json` scripts_
- **Framework:** Astro + React integration  
  _Source: `package.json`, `astro.config.mjs`_
- **Database:** [VERIFY_WITH_TEAM: No database configuration detected in `package.json`/repo files reviewed so far]  
- **Cache:** [VERIFY_WITH_TEAM: No cache configuration detected]  
- **Message Queue:** [VERIFY_WITH_TEAM: No message queue configuration detected]  
- **Other:** Tailwind CSS, Hubtel UI packages  
  _Source: `package.json`_

## Architecture Diagrams

### System Architecture

:::mermaid
flowchart TB
  browser[Browser] --> astroRouter[Astro_Router]
  astroRouter --> pageAstro[PageAstro_src_pages]
  pageAstro --> appLayout[AppLayout_src_layouts]
  appLayout --> baseLayout[BaseLayout_src_layouts]
  baseLayout --> globalCss[global_css_and_tokens]
  appLayout --> templateChoice{config_template}
  templateChoice --> dashboard[DashboardTemplate_React]
  templateChoice --> fullwidth[FullWidthTemplate_React]
  dashboard --> sharedComponents[SharedComponents_src_components]
  fullwidth --> sharedComponents
  sharedComponents --> cssVars[CSS_Custom_Properties_tokens_css]
  globalCss --> cssVars
  pageAstro --> projectConfig[ProjectConfig_src_projects]
  projectConfig --> templateChoice
  projectConfig --> baseLayout
::: 

### Component Interactions

:::mermaid
sequenceDiagram
  participant User as User
  participant Astro as Astro
  participant Page as PageAstro
  participant App as AppLayout
  participant Base as BaseLayout
  participant Tpl as ReactTemplate
  participant Cmp as SharedComponents
  User->>Astro: GET /some-route
  Astro->>Page: RouteMatch(src/pages/**)
  Page->>App: Render(AppLayout, config, props)
  App->>Base: Wrap(BaseLayout, theme/fonts)
  App->>Tpl: SelectTemplate(config.template)
  Tpl->>Cmp: Render(Sidebar/Navbar/Content)
  Tpl-->>User: HTML+HydratedReact
:::

## Data Flow

Page-level `.astro` files pass a `ProjectConfig` into `AppLayout`. `AppLayout` selects the template and sets theme keys on the root HTML element via `BaseLayout`. React templates render UI using config + CSS variables (tokens) and pass the `pathname` down to navigation components for active states.

_Source: `README.md` (“Key principle”, “How It All Fits Together”), `src/layouts/AppLayout.astro`, `src/layouts/BaseLayout.astro`, `src/templates/DashboardTemplate.tsx`_

## Security Considerations

[NEEDS_INPUT: Describe any authentication/authorization model, if applicable. No auth mechanism was verified from the files reviewed so far.]

