# Hubtel Multi-Project Platform Documentation

Welcome to the Hubtel Multi-Project Platform documentation. This documentation follows Hubtel's Docs-As-Code standards and is maintained alongside the codebase.

_Source: `README.md`_

## Overview

This repository is an Astro-based multi-project platform intended to host multiple independent portals/dashboards/tools under a single codebase, with shared UI/components themed per project via configuration.

_Source: `README.md`_

## Documentation Structure

### [Overview](overview.md)

Business context, system responsibilities, and key integrations.

### [Architecture](architecture/index.md)

System design, major components, dependencies, and architecture diagrams.

### [Flows](flows/)

Business and technical process flows with sequence diagrams:

- [App layout rendering flow](flows/app-layout-rendering.md)
- [Add a new project flow](flows/add-new-project.md)

### [Operations](operations/)

Production behavior, failure modes, logging, monitoring, and operational guidance.

### [ADR (Architectural Decision Records)](adr/)

Significant technical decisions with context and trade-offs:

- [0001: Choose Astro multi-project platform structure](adr/0001-choose-astro-multi-project-platform.md)

## Ownership

**Team:** UX&Marketing  
**Maintainers:** AveryL.Korto, Kingsley Okine, Vera Owusu  
**Last Updated:** 2026-03-18

## Contributing to Documentation

Documentation updates should accompany code changes. When making changes:

1. Update affected documentation sections
2. Generate/update diagrams if architecture or flows change
3. Create ADR entries for significant decisions
4. Run `*validate-docs` to ensure DAC compliance

For more information on Docs-As-Code at Hubtel, see the [DAC Guidelines](https://dev-docs.hubtel.com/repositories-docs/guidelines.html).

