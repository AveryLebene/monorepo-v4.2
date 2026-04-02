# App layout rendering flow

## Description

Describes how a request to an Astro page (example: `/ma-portal/settings`) is routed and rendered through `AppLayout`/`BaseLayout`, selecting a React template based on project configuration.

_Source: `README.md` (“How It All Fits Together”), `src/layouts/AppLayout.astro`_

## Actors

- **User**: navigates to a URL in the browser
- **Astro Router**: matches the URL to an `.astro` page under `src/pages/`
- **Page (`.astro`)**: imports `AppLayout` and project config, renders `<AppLayout ...>`
- **AppLayout**: wraps with `BaseLayout`, selects the React template based on `config.template`
- **BaseLayout**: sets theme attributes, loads global styles
- **React Template**: renders navigation chrome and the page `<slot />` / children

_Source: `README.md`, `src/layouts/AppLayout.astro`, `src/layouts/BaseLayout.astro`, `src/templates/DashboardTemplate.tsx`_

## Flow Steps

1. User visits a URL (example: `/ma-portal/settings`).
2. Astro matches the route to an `.astro` file under `src/pages/` (example cited in README).
3. The page imports `AppLayout` and a project config and renders `<AppLayout config={config} ...>...</AppLayout>`.
4. `AppLayout` reads `config.template` and chooses which React template to render (dashboard vs full-width). It also passes `pathname` to templates.
5. `AppLayout` wraps everything in `BaseLayout`, which loads global CSS and sets theme attributes on `<html>`.
6. The chosen React template renders sidebar/navbar plus the page content.

_Source: `README.md` (“How It All Fits Together”), `src/layouts/AppLayout.astro`, `src/layouts/BaseLayout.astro`_

## Flow Diagram

:::mermaid
sequenceDiagram
  participant User as User
  participant Browser as Browser
  participant Astro as Astro
  participant Page as PageAstro
  participant App as AppLayout
  participant Base as BaseLayout
  participant Dash as DashboardTemplate
  participant UI as SharedUI
  User->>Browser: Navigate(/ma-portal/settings)
  Browser->>Astro: HTTP_GET(/ma-portal/settings)
  Astro->>Page: RouteMatch(src/pages/ma-portal/settings.astro)
  Page->>App: Render(AppLayout, config, title, slot)
  App->>Base: Wrap(BaseLayout, theme, fonts)
  App->>Dash: SelectTemplate(config.template=="dashboard")
  Dash->>UI: Render(Sidebar+Navbar+Main)
  Dash-->>Browser: HTML+HydratedReact
:::

## Edge Cases and Error Handling

- **Unknown route**: Astro will return a 404 for routes not backed by a page file.  
  _[VERIFY_WITH_TEAM: Confirm 404 handling/custom error pages in this repo]_
- **Misconfigured project config**: If `config.template` is not `"dashboard"` or `"fullwidth"`, no template will render and the page may appear blank.  
  _Source: `src/layouts/AppLayout.astro`_

## Related Documentation

- Architecture: [../architecture/index.md](../architecture/index.md)
- Operations: [../operations/index.md](../operations/index.md)

