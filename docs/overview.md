# Hubtel Multi-Project Platform Overview

## Business Context

### Why This System Exists

This repository provides a modular Astro platform for hosting multiple independent projects (portals, dashboards, tools) within a single codebase, sharing UI components and theming per project via configuration to avoid duplication.

_Source: `README.md`_

### Problem Statement

Multiple portals/tools often require the same navigation chrome and UI building blocks (sidebar, navbar, buttons, theming). Duplicating these across repositories increases maintenance cost and visual inconsistency.

_Source: `README.md`_

### Target Users

- Engineers building new Hubtel portals/dashboards/tools that should share a common UI system and theming approach.

_Source: `README.md`_

## System Responsibilities

This system is responsible for:

- Providing a shared layout + template system (dashboard/full-width) used by multiple projects.  
  _Source: `README.md`, `src/layouts/AppLayout.astro`, `src/templates/*`_
- Providing shared, project-agnostic UI components, themed via CSS custom properties.  
  _Source: `README.md`, `src/components/`, `src/styles/themes/tokens.css`_
- Providing a file-based routing structure for multiple projects under `src/pages/`.  
  _Source: `README.md`, `src/pages/`_
- Providing per-project configuration under `src/projects/` to drive navigation, branding, and theming.  
  _Source: `README.md`, `src/projects/`_

### In Scope

- Shared UI components and templates
- Per-project theming and branding via configuration
- Astro page routing and layout composition for projects hosted in this repo

_Source: `README.md`_

### Out of Scope

[NEEDS_INPUT: Confirm whether this repo is intended to include backend APIs, data persistence, or infrastructure components. Current repo evidence indicates a frontend Astro application.]

## Key Integrations

### Internal Services

[TODO: Identify internal service integrations (if any). No internal service clients were verified from the files reviewed so far.]

### External Services

[TODO: Identify external service integrations (if any).]

## Service Tier

- **Priority:** [NEEDS_INPUT: Critical / High / Medium / Low]
- **Business Impact:** [NEEDS_INPUT: Financial/operational impact of downtime]
- **User Base:** [NEEDS_INPUT: Who/what relies on this platform in production?]
- **System Dependencies:** [NEEDS_INPUT: Approximate count of downstream systems/projects depending on this repo]

## External Documentation

[TODO: Add links to briefs/diagrams/meeting notes if/when available]

