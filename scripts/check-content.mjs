#!/usr/bin/env node
// Voice + schema lint for content/. Catches invariants TypeScript can't:
//   - banned SaaS phrases (per AGENTS.md voice rules)
//   - "Dentologic" in user-facing copy (brand was renamed to Oralstack)
//   - slug uniqueness within each indexed collection
//   - orphaned content files (not registered in index.ts)
//   - publishedAt format (YYYY-MM-DD) for articles + lead magnets
//
// Static analysis only — no module loading, no TS parser. Conventions in
// content/ are tight enough that regex is sufficient and removes a build step.
//
// Usage:  node scripts/check-content.mjs
// Exits non-zero on any violation.

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CONTENT = join(ROOT, "content");

const BANNED = [
  "all-in-one",
  "seamless",
  "supercharge",
  "unlock",
  "transform",
  "best-in-class",
  "effortless",
];

// Collections rendered through dynamic routes — must register every file in
// index.ts so the route can iterate. case-studies is imported by name in
// dedicated pages and intentionally has no index.ts.
const INDEXED = ["articles", "comparisons", "lead-magnets"];

const VOICE_CHECK_DIRS = ["articles", "comparisons", "case-studies", "lead-magnets"];

const violations = [];
function fail(file, line, msg) {
  violations.push({ file: file.replace(ROOT, ""), line, msg });
}

function stripCommentsAndStrings(text) {
  // Strip block comments and line comments so "transform" inside a CSS comment
  // doesn't trip the voice check. We deliberately keep string contents in place
  // because that's where prose lives.
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

function checkBannedAndBrand(file, text) {
  const cleaned = stripCommentsAndStrings(text);
  const lines = cleaned.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const word of BANNED) {
      const re = new RegExp(`\\b${word.replace(/-/g, "\\-")}\\b`, "i");
      if (re.test(line)) {
        fail(file, i + 1, `banned word "${word}": ${line.trim().slice(0, 100)}`);
      }
    }
    if (/\bDentologic\b/.test(line)) {
      fail(
        file,
        i + 1,
        `"Dentologic" in user-facing copy — use "Oralstack": ${line.trim().slice(0, 100)}`,
      );
    }
  }
}

function extractField(text, field) {
  const re = new RegExp(`${field}:\\s*["']([^"']+)["']`);
  const match = text.match(re);
  return match ? match[1] : null;
}

async function listDataFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && /\.(ts|tsx)$/.test(e.name))
    .map((e) => e.name)
    .filter((n) => n !== "types.ts" && n !== "index.ts");
}

async function checkCollection(name) {
  const dir = join(CONTENT, name);
  let files;
  try {
    files = await listDataFiles(dir);
  } catch {
    return; // collection directory missing — skip
  }

  const indexPath = join(dir, "index.ts");
  let indexText = "";
  try {
    indexText = await readFile(indexPath, "utf8");
  } catch {
    fail(indexPath, 0, `missing index.ts for content/${name}/`);
    return;
  }

  const slugs = new Map();

  for (const fileName of files) {
    const filePath = join(dir, fileName);
    const text = await readFile(filePath, "utf8");

    checkBannedAndBrand(filePath, text);

    // Orphan check: every data file must be imported in index.ts.
    const stem = fileName.replace(/\.(tsx|ts)$/, "");
    if (!indexText.includes(`./${stem}`)) {
      fail(filePath, 0, `not imported by content/${name}/index.ts`);
    }

    const slug = extractField(text, "slug");
    if (!slug) {
      fail(filePath, 0, `missing required field "slug"`);
    } else {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
        fail(filePath, 0, `slug "${slug}" must be kebab-case`);
      }
      if (slugs.has(slug)) {
        fail(filePath, 0, `duplicate slug "${slug}" — also in ${slugs.get(slug)}`);
      }
      slugs.set(slug, fileName);
    }

    if (name === "articles" || name === "lead-magnets") {
      const published = extractField(text, "publishedAt");
      if (!published) {
        fail(filePath, 0, `missing required field "publishedAt"`);
      } else if (!/^\d{4}-\d{2}-\d{2}$/.test(published)) {
        fail(filePath, 0, `publishedAt "${published}" must match YYYY-MM-DD`);
      }
    }
  }
}

async function checkLooseContentFiles() {
  // content/*.ts (workflows.ts, customers.ts, etc.) — voice check only.
  const entries = await readdir(CONTENT, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!/\.(ts|tsx)$/.test(entry.name)) continue;
    const filePath = join(CONTENT, entry.name);
    const text = await readFile(filePath, "utf8");
    checkBannedAndBrand(filePath, text);
  }
}

async function voiceCheckSubdir(name) {
  // Apply banned-word + brand checks to subdirs not covered by INDEXED.
  if (INDEXED.includes(name)) return;
  const dir = join(CONTENT, name);
  let files;
  try {
    files = await listDataFiles(dir);
  } catch {
    return;
  }
  for (const fileName of files) {
    const filePath = join(dir, fileName);
    const text = await readFile(filePath, "utf8");
    checkBannedAndBrand(filePath, text);
  }
}

async function main() {
  for (const name of INDEXED) {
    await checkCollection(name);
  }
  for (const name of VOICE_CHECK_DIRS) {
    await voiceCheckSubdir(name);
  }
  await checkLooseContentFiles();

  if (violations.length === 0) {
    console.log("content check: OK");
    process.exit(0);
  }

  console.error(`content check: ${violations.length} violation(s)\n`);
  for (const v of violations) {
    const where = v.line ? `${v.file}:${v.line}` : v.file;
    console.error(`  ${where}\n    ${v.msg}`);
  }
  process.exit(1);
}

main().catch((err) => {
  console.error("content check: crashed");
  console.error(err);
  process.exit(2);
});
