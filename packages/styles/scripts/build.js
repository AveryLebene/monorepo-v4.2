#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir, rm, stat, cp } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "../..");
const repoRoot = join(root, "../..");
const srcDir = join(root, "src");
const themesDir = join(srcDir, "themes");
const groupsDir = join(srcDir, "groups");
const distDir = join(root, "dist");
const publicDir = join(repoRoot, "public", "styles");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await mkdir(join(distDir, "json"), { recursive: true });

const baseCss = await readFile(join(srcDir, "base.css"), "utf8");

const groupCache = {};
async function loadGroup(name) {
  if (groupCache[name]) return groupCache[name];
  const css = await readFile(join(groupsDir, `${name}.css`), "utf8");
  groupCache[name] = css;
  return css;
}

const hasGroups = await stat(groupsDir).then(() => true).catch(() => false);
const groupFiles = hasGroups
  ? (await readdir(groupsDir)).filter((f) => extname(f) === ".css")
  : [];

for (const file of groupFiles) {
  const name = basename(file, ".css");
  const groupCss = await loadGroup(name);

  const bundled = [
    `/* @projects/styles — ${name} (group) */`,
    baseCss.trim(),
    "",
    `/* ${name} group tokens */`,
    groupCss.trim(),
    "",
  ].join("\n");

  await writeFile(join(distDir, `${name}.css`), bundled);

  const json = extractTokensToJson(name, groupCss, baseCss, "");
  await writeFile(join(distDir, "json", `${name}.json`), JSON.stringify(json, null, 2) + "\n");
}

const themeFiles = (await readdir(themesDir)).filter((f) => extname(f) === ".css");

for (const file of themeFiles) {
  const name = basename(file, ".css");
  const themeCss = await readFile(join(themesDir, file), "utf8");

  const groupName = extractGroup(themeCss);
  let groupCss = "";
  if (groupName) {
    groupCss = await loadGroup(groupName);
  }

  const mergedBlock = mergeThemeBlock(name, groupCss, groupName, themeCss);

  const bundled = [
    `/* @projects/styles — ${name}${groupName ? ` (extends ${groupName})` : ""} */`,
    baseCss.trim(),
    "",
    mergedBlock.trim(),
    "",
  ].join("\n");

  await writeFile(join(distDir, `${name}.css`), bundled);

  const json = extractTokensToJson(name, themeCss, baseCss, groupCss);
  await writeFile(join(distDir, "json", `${name}.json`), JSON.stringify(json, null, 2) + "\n");
}

await writeFile(join(distDir, "base.css"), baseCss);

const baseJson = extractTokensToJson("base", "", baseCss, "");
await writeFile(join(distDir, "json", "base.json"), JSON.stringify(baseJson, null, 2) + "\n");

const allCss = [baseCss.trim()];
for (const file of groupFiles) {
  allCss.push((await readFile(join(groupsDir, file), "utf8")).trim());
}
for (const file of themeFiles) {
  allCss.push((await readFile(join(themesDir, file), "utf8")).trim());
}
await writeFile(join(distDir, "all.css"), `/* @projects/styles — all themes */\n${allCss.join("\n\n")}\n`);

const globalCss = await readFile(join(srcDir, "global.css"), "utf8");
await writeFile(join(distDir, "global.css"), globalCss);

await rm(publicDir, { recursive: true, force: true });
await cp(distDir, publicDir, { recursive: true });

console.log(`Built ${groupFiles.length} groups + ${themeFiles.length} themes + global.css → dist/ + public/styles/`);

/**
 * Reads `group: <name>` from a comment in the theme file.
 */
function extractGroup(css) {
  const m = /\bgroup:\s*([\w-]+)/.exec(css);
  return m ? m[1] : null;
}

/**
 * Merges group tokens + theme overrides into a single [data-project-theme="<theme>"] block.
 * Group tokens come first; theme tokens override them.
 */
function mergeThemeBlock(themeName, groupCss, groupName, themeCss) {
  const groupProps = parsePropertiesRaw(groupCss);
  const themeProps = parsePropertiesRaw(themeCss);
  const merged = { ...groupProps, ...themeProps };

  if (Object.keys(merged).length === 0) {
    return themeCss;
  }

  const lines = Object.entries(merged).map(([k, v]) => `  --${k}: ${v};`);
  return `[data-project-theme="${themeName}"] {\n${lines.join("\n")}\n}`;
}

function extractTokensToJson(theme, themeCss, baseCss, groupCss) {
  const base = parseProperties(baseCss);
  const group = parseProperties(groupCss);
  const overrides = parseProperties(themeCss);
  const merged = { ...base, ...group, ...overrides };
  return { theme, tokens: merged };
}

function parseProperties(css) {
  const props = {};
  const re = /--([\w-]+)\s*:\s*([^;]+)/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    const key = m[1].trim();
    const value = m[2].trim();
    if (!value.startsWith("var(")) {
      props[key] = value;
    }
  }
  return props;
}

function parsePropertiesRaw(css) {
  const props = {};
  const re = /--([\w-]+)\s*:\s*([^;]+)/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    props[m[1].trim()] = m[2].trim();
  }
  return props;
}
