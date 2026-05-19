# Add a new project flow

## Description

Describes how to add a new project to this mono-repo style Astro platform using a new `ProjectConfig`, theme tokens, and page routes.

_Source: `README.md` (“Step-by-Step: Add a New Project”)_

## Actors

- **Engineer**: adds project configuration, theme tokens, and page routes
- **ProjectConfig**: drives theme, navigation, branding, and template selection
- **AppLayout**: renders the project based on config

_Source: `README.md`, `src/config/types.ts`, `src/layouts/AppLayout.astro`_

## Flow Steps

1. Create a project config file under `src/projects/<project-key>/config.ts` exporting `config: ProjectConfig` with `name`, `basePath`, `theme`, and `template` (dashboard/fullwidth).  
   _Source: `README.md`, `src/config/types.ts`_
2. Add a new theme block in `packages/tokens/src/themes/<theme>.css` keyed by the same theme identifier (using `[data-theme="<theme>"]`).  
   _Source: `README.md`, `src/styles/themes/tokens.css`_
3. Create page routes under `src/pages/<project-base>/...` that import `AppLayout` and your `config`, and render `<AppLayout config={config} ...>...</AppLayout>`.  
   _Source: `README.md`, `src/layouts/AppLayout.astro`_
4. Start the dev server and navigate to the new base path to verify it renders.  
   _Source: `README.md`, `package.json`_

## Flow Diagram

:::mermaid
sequenceDiagram
  participant Eng as Engineer
  participant Repo as Repo
  participant Tokens as tokens_css
  participant Pages as src_pages
  participant Config as ProjectConfig
  participant App as AppLayout
  Eng->>Repo: Add(src/projects/<key>/config.ts)
  Eng->>Tokens: Add([data-theme="<key>"] tokens)
  Eng->>Pages: Add(src/pages/<base>/index.astro)
  Pages->>App: Render(AppLayout, config)
  App->>Config: Read(config.template, config.theme)
  App-->>Eng: PageRenders
:::

## Edge Cases and Error Handling

- **Theme key mismatch**: If `config.theme` doesn’t match a `[data-theme="..."]` block, components will fall back to `:root` token defaults.  
  _Source: `src/layouts/BaseLayout.astro`, `src/styles/themes/tokens.css`_
- **Incorrect basePath/pages mismatch**: If `basePath` and route folder structure diverge, navigation URLs may not match actual pages.  
  _[VERIFY_WITH_TEAM: Standardize conventions for `basePath` vs `src/pages/` paths]_

## Related Documentation

- Architecture: [../architecture/index.md](../architecture/index.md)
- Operations: [../operations/index.md](../operations/index.md)

