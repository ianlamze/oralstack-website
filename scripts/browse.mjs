#!/usr/bin/env node
// Minimal Playwright CLI: load a URL in headless Chromium, save a full-page
// screenshot, and print page text to stdout. Used for design research and
// verifying live UIs the static fetch tools can't render.
//
// Usage:
//   node scripts/browse.mjs <url> [--out <path>] [--width 1280] [--height 800] [--wait <selector>]
//
// Example:
//   node scripts/browse.mjs https://dribbble.com/search/mega-menu --out /tmp/dribbble.png

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.error(
    "Usage: node scripts/browse.mjs <url> [--out path] [--width N] [--height N] [--wait selector]",
  );
  process.exit(1);
}

const url = args[0];
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const out = flag("--out", `/tmp/browse-${Date.now()}.png`);
const width = parseInt(flag("--width", "1280"), 10);
const height = parseInt(flag("--height", "800"), 10);
const waitSel = flag("--wait", null);

mkdirSync(dirname(out), { recursive: true });

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
  await page.screenshot({ path: out, fullPage: true });
  const text = await page.evaluate(() =>
    document.body.innerText.replace(/\n{3,}/g, "\n\n").trim(),
  );
  const title = await page.title();
  console.log(`URL: ${url}`);
  console.log(`Title: ${title}`);
  console.log(`Screenshot: ${out}`);
  console.log("---");
  console.log(text.slice(0, 8000));
  if (text.length > 8000) console.log(`\n[truncated, ${text.length} chars total]`);
} finally {
  await browser.close();
}
