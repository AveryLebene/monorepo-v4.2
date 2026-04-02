# Hubtel Multi-Project Platform Operations

## Normal System Behavior

### Expected Performance

[NEEDS_INPUT: Define expected performance characteristics (TTFB, bundle size budgets, page load targets) and how performance is measured for this platform.]

### Health Checks

[VERIFY_WITH_TEAM: This is a frontend Astro app. Confirm if there are any health endpoints (e.g. platform hosting checks) or if health is managed at the hosting layer.]

### Resource Usage

[NEEDS_INPUT: Provide expected CPU/memory usage for dev server and for production hosting environment.]

## Failure Modes

### Common Failure Scenarios

- **Build failures** due to dependency or TypeScript issues.  
  _Source: `package.json`, `tsconfig.json`_
- **Runtime UI issues** due to missing/mismatched theme tokens (components fall back to defaults).  
  _Source: `src/styles/themes/tokens.css`, `src/layouts/BaseLayout.astro`_

### Degraded Operation

[NEEDS_INPUT: Define degraded behavior expectations (e.g. what should still work if some projects/routes fail).]

## Logging

### Log Levels

[VERIFY_WITH_TEAM: Confirm logging approach. For typical Astro deployments, server logs come from the hosting/runtime; client errors are visible in browser console.]

### Key Log Patterns

[TODO: Add log patterns once logging/observability approach is defined.]

### Log Location

[NEEDS_INPUT: Where are logs viewed (hosting provider logs, browser error reporting, Sentry, etc.)?]

## Monitoring and Alerts

### Metrics

[NEEDS_INPUT: Define metrics (availability, error rate, Web Vitals, build times).]

### Dashboards

[TODO: Add links to dashboards (if any).]

### Alert Thresholds

[NEEDS_INPUT: Define alert thresholds and paging rules.]

## Operational Notes

### On-Call Runbook

[NEEDS_INPUT: Add runbook procedures for support/on-call.]

### Common Issues and Solutions

- **Dev server won’t start**: verify dependencies are installed and run `npm install`, then `npm run dev`.  
  _Source: `README.md`, `package.json`_
- **Theme looks wrong**: verify the page uses the correct project config and that `config.theme` matches a `[data-theme-astro="..."]` block in `tokens.css`.  
  _Source: `src/layouts/BaseLayout.astro`, `src/styles/themes/tokens.css`, `src/config/types.ts`_

### Escalation Path

[NEEDS_INPUT: Escalation contacts/process.]

## Deployment

### Deployment Process

[NEEDS_INPUT: Describe how this repo is deployed (CI/CD, environment promotion, hosting target).]

### Rollback Procedure

[NEEDS_INPUT: Describe rollback procedure for failed deployments.]

