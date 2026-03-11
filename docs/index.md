# Hubtel Multi-Project Platform Documentation

Welcome to the Hubtel Multi-Project Platform documentation. This documentation follows Hubtel's Docs-As-Code standards and is maintained alongside the codebase. See the [DAC Guidelines](https://dev-docs.hubtel.com/repositories-docs/guidelines.html) for more information.

## Overview

This platform is a modular Astro-based frontend that hosts multiple independent projects (portals, dashboards, tools) under a single codebase. Shared components—sidebar, navbar, buttons—are built once and themed per project via configuration. No duplication. _Source: `README.md`, `package.json`_

## Documentation Structure

### 📋 [Overview](overview.md)
Business context, system responsibilities, and key integrations.

### 🏗️ [Architecture](architecture/index.md)
System design, major components, dependencies, and architecture diagrams.

### 🔄 [Flows](flows/)
Business and technical process flows with sequence diagrams:

- [Page Request Flow](flows/page-request-flow.md)
- [Theme Application Flow](flows/theme-application-flow.md)
- [Multi-Project Navigation Flow](flows/multi-project-navigation-flow.md)

### ⚙️ [Operations](operations/index.md)
Production behavior, failure modes, logging, monitoring, and operational guidance.

### 📝 [ADR (Architectural Decision Records)](adr/)
Significant technical decisions with context and trade-offs:

- [0001: Astro with React Islands](adr/0001-astro-react-islands.md)
- [0002: Multi-Project Configuration Pattern](adr/0002-multi-project-config-pattern.md)
- [0003: CSS Custom Properties for Theming](adr/0003-css-custom-properties-theming.md)

## Ownership

**Team:** [NEEDS_INPUT: Product/Engineering team name]  
**Maintainers:** [NEEDS_INPUT: Individual maintainers]  
**Last Updated:** 2025-03-05

## Contributing to Documentation

Documentation updates should accompany code changes. When making changes:

1. Update affected documentation sections
2. Generate/update diagrams if architecture or flows change
3. Create ADR entries for significant decisions
4. Run `*validate-docs` to ensure DAC compliance
