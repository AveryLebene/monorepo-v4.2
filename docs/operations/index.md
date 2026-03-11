# Hubtel Multi-Project Platform Operations

## Normal System Behavior

### Expected Performance

- **Build**: Astro builds a static site. Expected build time depends on page count and asset size. _Source: `package.json` scripts_
- **Dev server**: `npm run dev` starts Vite dev server at `http://localhost:4321`. Hot module replacement (HMR) for fast iteration. _Source: `README.md`, `package.json`_
- **Preview**: `npm run preview` serves the production build locally for verification. _Source: `package.json`_

### Health Checks

- [NEEDS_INPUT: Production deployment URL and health check endpoint, if any]
- Dev server: `http://localhost:4321` returns 200 when running.
- Build: `npm run build` exits 0 on success.

### Resource Usage

- Static frontend; no long-running server processes in production (when deployed as static site).
- [NEEDS_INPUT: Expected CPU/memory for build process and production hosting]

## Failure Modes

### Common Failure Scenarios

- **Build fails**: Dependency issues, TypeScript errors, or missing env vars. Check `npm run build` output.
- **Dev server won't start**: Port 4321 in use, or module resolution errors. Check terminal output.
- **Page 404**: No matching `src/pages/` file for the requested URL. Verify file-based routing.
- **Broken styles**: Theme not applied if `data-theme` is wrong or token missing in `tokens.css`.
- **Component errors**: React hydration mismatch if server/client render differs; check `client:load` usage. _Source: Astro/React docs_

### Degraded Operation

- If external assets (e.g., designs.hubtel.com) are unavailable, logos/images may fail to load.
- If Lendscore API is down, lenders-portal API-dependent features will fail. _Source: `src/pages/lendscore/lenders-portal/manage/api-docs.astro`_

## Logging

### Log Levels

- Astro/Vite dev server: Standard dev output (info, warnings, errors).
- [NEEDS_INPUT: Production logging strategy if using SSR or custom server]

### Key Log Patterns

- `[astro]` — Astro-specific messages
- `[vite]` — Vite/build messages
- `Error:` / `WARN:` — Build or runtime errors

### Log Location

- Dev: stdout/stderr of the terminal running `npm run dev`
- Build: stdout/stderr of the terminal running `npm run build`
- [NEEDS_INPUT: Production log location]

## Monitoring and Alerts

### Metrics

- [NEEDS_INPUT: Key metrics — e.g., page load time, error rate, build duration]

### Dashboards

- [NEEDS_INPUT: Links to monitoring dashboards]

### Alert Thresholds

- [NEEDS_INPUT: When to alert — build failures, deploy failures, uptime]

## Operational Notes

### On-Call Runbook

1. **Site down**: Check deployment pipeline, CDN/hosting status. Verify build succeeds locally.
2. **Broken page**: Check recent deploys. Verify route exists in `src/pages/`. Check browser console for JS errors.
3. **Style/theme broken**: Verify `tokens.css` has the theme. Check `data-theme` on `<html>`.
4. **API integration failing**: Check external service status (e.g., Lendscore API). Verify CORS and auth if client-side calls.

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Port 4321 in use | Use `--port` flag: `astro dev --port 3000` |
| Module not found | Run `npm install`, check import paths |
| Hydration mismatch | Ensure server and client render same content; review `client:load` usage |
| Theme not applied | Verify `config.theme` matches a selector in `tokens.css` |

### Escalation Path

[NEEDS_INPUT: Who to contact for different severities — e.g., Platform team, Product owner]

## Deployment

### Deployment Process

- [NEEDS_INPUT: CI/CD pipeline, build command, deploy target (e.g., S3, Vercel, Netlify)]
- Build command: `npm run build` _Source: `package.json`_
- Output directory: `./dist/` (Astro default) _Source: `README.md`_

### Rollback Procedure

[NEEDS_INPUT: How to roll back a failed deployment]
