#!/usr/bin/env node
// Minimal Playwright CLI: load a URL in headless Chromium and capture screenshots.
//
// Modes:
//   --mode fullpage  (default) full-page screenshot to a single file at --out.
//   --mode viewport  visible-viewport-only screenshot at --out. Cheap fold check.
//   --mode sections  one screenshot per top-level section under <main>, written
//                    into the directory at --out. Index file index.md lists each
//                    capture with heading and dimensions. Use this for visual
//                    review — keeps each image bounded so they read back cleanly.
//
// Usage:
//   node scripts/browse.mjs <url> [--mode <m>] [--out <path>]
//                                 [--width 1280] [--height 800] [--wait <selector>]
//
// Examples:
//   node scripts/browse.mjs http://localhost:3000/ --mode sections --out /tmp/home-desktop
//   node scripts/browse.mjs http://localhost:3000/ --mode viewport --out /tmp/home-fold.png

import { chromium } from "playwright";
import { mkdirSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.error(
    "Usage: node scripts/browse.mjs <url> [--mode fullpage|viewport|sections] [--out path] [--width N] [--height N] [--wait selector]",
  );
  process.exit(1);
}

const url = args[0];
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const mode = flag("--mode", "fullpage");
if (!["fullpage", "viewport", "sections"].includes(mode)) {
  console.error(`Unknown --mode "${mode}". Use fullpage, viewport, or sections.`);
  process.exit(1);
}

const defaultOut =
  mode === "sections" ? `/tmp/browse-${Date.now()}` : `/tmp/browse-${Date.now()}.png`;
const out = flag("--out", defaultOut);
const width = parseInt(flag("--width", "1280"), 10);
const height = parseInt(flag("--height", "800"), 10);
const waitSel = flag("--wait", null);

if (mode === "sections") {
  mkdirSync(out, { recursive: true });
} else {
  mkdirSync(dirname(out), { recursive: true });
}

const slugify = (s) =>
  (s || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "untitled";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width, height },
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});
const page = await ctx.newPage();

try {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  if (waitSel) {
    await page.waitForSelector(waitSel, { timeout: 15000 });
  } else {
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  }
  const title = await page.title();

  if (mode === "viewport") {
    await page.screenshot({ path: out, fullPage: false });
    const { size } = statSync(out);
    console.log(`URL: ${url}`);
    console.log(`Title: ${title}`);
    console.log(`Mode: viewport (${width}x${height})`);
    console.log(`Screenshot: ${out} (${(size / 1024).toFixed(0)} KB)`);
  } else if (mode === "sections") {
    // Scroll the full page first so any lazy/animated content has rendered.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        const totalHeight = document.body.scrollHeight;
        let y = 0;
        const step = window.innerHeight;
        const tick = () => {
          window.scrollTo(0, y);
          y += step;
          if (y >= totalHeight + step) {
            window.scrollTo(0, 0);
            resolve();
          } else {
            setTimeout(tick, 30);
          }
        };
        tick();
      });
    });
    await page.waitForTimeout(200);

    // Pull metadata for every direct child of <main>: bounding box + heading text.
    const sections = await page.evaluate(() => {
      const main = document.querySelector("main") || document.body;
      const children = Array.from(main.children);
      return children.map((el, i) => {
        const rect = el.getBoundingClientRect();
        const heading = el.querySelector("h1,h2,h3")?.textContent?.trim().slice(0, 80) || "";
        return {
          index: i,
          tag: el.tagName.toLowerCase(),
          heading,
          height: Math.round(rect.height),
        };
      });
    });

    const captures = [];
    let captureIdx = 0;
    for (const s of sections) {
      // Skip dividers / spacers
      if (s.height < 40) continue;
      const main = page.locator("main");
      const exists = (await main.count()) > 0;
      const root = exists ? main : page.locator("body");
      const el = root.locator(`> :nth-child(${s.index + 1})`);
      const slug = slugify(s.heading || `${s.tag}-${s.index}`);
      const filename = `${String(captureIdx).padStart(2, "0")}-${slug}.png`;
      const filepath = join(out, filename);
      try {
        await el.scrollIntoViewIfNeeded({ timeout: 3000 });
        await page.waitForTimeout(120);
        await el.screenshot({ path: filepath, timeout: 8000 });
        const { size } = statSync(filepath);
        captures.push({ ...s, file: filename, bytes: size });
        captureIdx++;
      } catch (err) {
        captures.push({ ...s, file: null, error: String(err?.message || err) });
      }
    }

    const indexLines = [
      `# ${title}`,
      ``,
      `URL: ${url}`,
      `Viewport: ${width}x${height}`,
      `Mode: sections`,
      ``,
      `| # | Heading | Tag | Height | File | Size |`,
      `|---|---------|-----|--------|------|------|`,
      ...captures.map(
        (c) =>
          `| ${c.index} | ${c.heading || "(no heading)"} | ${c.tag} | ${c.height}px | ${c.file ?? `_skipped: ${c.error}_`} | ${c.bytes ? `${(c.bytes / 1024).toFixed(0)} KB` : "-"} |`,
      ),
      ``,
    ];
    writeFileSync(join(out, "index.md"), indexLines.join("\n"));

    console.log(`URL: ${url}`);
    console.log(`Title: ${title}`);
    console.log(`Mode: sections (viewport ${width}x${height})`);
    console.log(`Output dir: ${out}`);
    console.log(`Captured ${captures.filter((c) => c.file).length} of ${sections.length} sections`);
    console.log(`Index: ${join(out, "index.md")}`);
  } else {
    // fullpage (default, backward compatible)
    await page.screenshot({ path: out, fullPage: true });
    const text = await page.evaluate(() =>
      document.body.innerText.replace(/\n{3,}/g, "\n\n").trim(),
    );
    console.log(`URL: ${url}`);
    console.log(`Title: ${title}`);
    console.log(`Screenshot: ${out}`);
    console.log("---");
    console.log(text.slice(0, 8000));
    if (text.length > 8000) console.log(`\n[truncated, ${text.length} chars total]`);
  }
} finally {
  await browser.close();
}
