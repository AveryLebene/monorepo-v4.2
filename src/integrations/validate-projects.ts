import type { AstroIntegration } from "astro";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Astro integration: validate project configs against pages + theme tokens.
 *
 * Runs on dev-server startup and at build time (via Vite plugin hooks) and
 * reports drift between:
 *   - `projectGroups[*].href` (and project basePaths) and actual `src/pages/**`
 *   - `config.theme` values and `[data-project-theme="..."]` blocks in @projects/styles
 *   - `navItems[*].href` values and actual `src/pages/**`
 *
 * Implemented as regex-based static parsing on the config/css/page files so
 * it has zero extra dependencies and works equally in dev and `astro build`.
 */
export default function validateProjects(
  options: { failOnError?: boolean } = {},
): AstroIntegration {
  const { failOnError = false } = options;

  return {
    name: "validate-projects",
    hooks: {
      "astro:config:setup": ({ updateConfig, command, config }) => {
        const root = fileURLToPath(config.root);
        const baseUrl = (config.base ?? "/").replace(/\/+$/, "");

        updateConfig({
          vite: {
            plugins: [
              {
                name: "validate-projects",
                apply() {
                  return true;
                },
                async buildStart() {
                  const issues = await runValidation(root, baseUrl);
                  reportIssues(issues, command, failOnError);
                },
              },
            ],
          },
        });
      },
    },
  };
}

interface Issue {
  level: "error" | "warn";
  message: string;
}

async function runValidation(root: string, baseUrl: string): Promise<Issue[]> {
  const srcDir = path.join(root, "src");
  const projectsDir = path.join(srcDir, "projects");
  const pagesDir = path.join(srcDir, "pages");
  const tokensPath = path.join(root, "packages", "styles", "dist", "all.css");

  const [configFiles, pageFiles, tokensSrc] = await Promise.all([
    walk(projectsDir, /config\.ts$/),
    walk(pagesDir, /\.astro$/),
    fs.readFile(tokensPath, "utf8").catch(() => ""),
  ]);

  const definedThemes = extractDefinedThemes(tokensSrc);
  const pageRoutes = pageFilesToRoutes(pageFiles, pagesDir, baseUrl);

  const issues: Issue[] = [];
  for (const file of configFiles) {
    const src = await fs.readFile(file, "utf8");
    const rel = path.relative(root, file);
    const info = parseConfigFile(src);

    /* Theme must have a corresponding tokens block. */
    if (info.theme && !definedThemes.has(info.theme)) {
      issues.push({
        level: "warn",
        message: `${rel}: theme "${info.theme}" has no [data-project-theme="${info.theme}"] block in tokens.css`,
      });
    }

    /* basePath should resolve to a real page. */
    if (info.basePath) {
      if (!isRouteCovered(info.basePath, pageRoutes)) {
        issues.push({
          level: "warn",
          message: `${rel}: basePath "${info.basePath}" has no matching page under src/pages/`,
        });
      }
    }

    /* Each nav href should resolve to a real page (skip empty / external hrefs). */
    for (const href of info.navHrefs) {
      if (!href || /^(https?:)?\/\//.test(href)) continue;
      if (!href.startsWith(baseUrl + "/") && !href.startsWith("/")) continue;
      if (!isRouteCovered(href, pageRoutes)) {
        issues.push({
          level: "warn",
          message: `${rel}: nav href "${href}" has no matching page under src/pages/`,
        });
      }
    }
  }

  return issues;
}

/* ─── Static parsers (regex-based; configs are well-structured) ─── */

interface ConfigInfo {
  theme?: string;
  basePath?: string;
  navHrefs: string[];
}

function parseConfigFile(src: string): ConfigInfo {
  const stripped = stripCommentsAndStrings(src);
  return {
    theme: firstMatch(src, /\btheme\s*:\s*["']([^"']+)["']/),
    basePath: firstMatch(src, /\bbasePath\s*:\s*["']([^"']+)["']/),
    navHrefs: allHrefMatches(stripped),
  };
}

function firstMatch(src: string, re: RegExp): string | undefined {
  const m = re.exec(src);
  return m ? m[1] : undefined;
}

function allHrefMatches(src: string): string[] {
  const hrefs: string[] = [];
  const re = /\bhref\s*:\s*["']([^"']*)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) hrefs.push(m[1]);
  return hrefs;
}

/** Remove `/* ... *​/` and `// ...` lines (and template literals) to avoid false matches. */
function stripCommentsAndStrings(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

function extractDefinedThemes(css: string): Set<string> {
  const themes = new Set<string>();
  const re = /\[data-project-theme\s*=\s*["']([^"']+)["']\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) themes.add(m[1]);
  return themes;
}

interface PageRouteSet {
  exact: Set<string>;
  prefixes: Set<string>; // e.g. "/projects/foo/manage" → "/projects/foo/manage.astro" exists
}

function pageFilesToRoutes(
  files: string[],
  pagesDir: string,
  baseUrl: string,
): PageRouteSet {
  const exact = new Set<string>();
  const prefixes = new Set<string>();
  for (const file of files) {
    const rel = path.relative(pagesDir, file).replace(/\\/g, "/");
    /* index.astro → directory route; others → exact file route */
    const noExt = rel.replace(/\.astro$/, "");
    const isIndex = noExt.endsWith("/index") || noExt === "index";
    const dirRoute = isIndex
      ? "/" + noExt.replace(/\/?index$/, "")
      : "/" + noExt;
    const full = (baseUrl + dirRoute).replace(/\/+$/, "");
    exact.add(full === "" ? "/" : full);
    prefixes.add(full);
  }
  return { exact, prefixes };
}

function isRouteCovered(href: string, routes: PageRouteSet): boolean {
  const normalized = href.replace(/\/+$/, "") || "/";
  if (routes.exact.has(normalized)) return true;
  /* Allow trailing slash variants and "directory" matches. */
  for (const p of routes.prefixes) {
    if (p === normalized) return true;
  }
  return false;
}

/* ─── fs helpers ─── */

async function walk(dir: string, match: RegExp): Promise<string[]> {
  const out: string[] = [];
  let entries: import("node:fs").Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(p, match)));
    } else if (match.test(entry.name)) {
      out.push(p);
    }
  }
  return out;
}

/* ─── Reporting ─── */

function reportIssues(
  issues: Issue[],
  command: "dev" | "build" | "preview" | "sync",
  failOnError: boolean,
) {
  if (issues.length === 0) {
    /* Quiet success — only log on dev for confidence. */
    if (command === "dev") {
      console.log("\u001b[36m[validate-projects]\u001b[0m all configs OK");
    }
    return;
  }
  const header = `\u001b[33m[validate-projects]\u001b[0m ${issues.length} issue${issues.length === 1 ? "" : "s"} found:`;
  console.warn(header);
  for (const issue of issues) {
    const prefix = issue.level === "error" ? "\u001b[31m✖\u001b[0m" : "\u001b[33m⚠\u001b[0m";
    console.warn(`  ${prefix} ${issue.message}`);
  }
  if (failOnError && command === "build" && issues.some((i) => i.level === "error")) {
    throw new Error("[validate-projects] build aborted due to validation errors");
  }
}
