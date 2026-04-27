import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  { path: "/", title: /Oralstack/ },
  { path: "/workflows/", title: /Workflows/ },
  { path: "/customers/", title: /Customers/ },
  { path: "/customers/dfi-synergy/", title: /DFI Synergy/ },
  { path: "/pricing/", title: /Pricing/ },
  { path: "/integrations/", title: /Integrations/ },
  { path: "/articles/", title: /Articles/ },
  { path: "/articles/plato-to-cloud-migration/", title: /Plato/ },
  { path: "/compare/", title: /Compare/ },
  { path: "/compare/plato/", title: /vs Plato/ },
  { path: "/compare/open-dental/", title: /vs Open Dental/ },
  { path: "/compare/dentrix/", title: /vs Dentrix/ },
  { path: "/compare/eaglesoft/", title: /vs Eaglesoft/ },
  { path: "/compare/carestream/", title: /vs Carestream/ },
  { path: "/for-solo-clinics/", title: /solo/ },
  { path: "/for-multi-clinic/", title: /multi-clinic/ },
  { path: "/about/", title: /About/ },
  { path: "/faq/", title: /FAQ/ },
  { path: "/book-a-demo/", title: /demo/i },
  { path: "/changelog/", title: /Changelog/ },
  { path: "/security/", title: /Security/ },
  { path: "/privacy/", title: /Privacy/ },
  { path: "/terms/", title: /Terms/ },
];

async function gotoAndCollect(page: Page, path: string) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  const response = await page.goto(path, { waitUntil: "domcontentloaded" });
  return { response, errors };
}

for (const route of ROUTES) {
  test(`${route.path} loads cleanly`, async ({ page }) => {
    const { response, errors } = await gotoAndCollect(page, route.path);
    expect(response?.status(), `HTTP status for ${route.path}`).toBeLessThan(400);
    await expect(page).toHaveTitle(route.title);
    expect(errors, `console errors on ${route.path}: ${errors.join("\n")}`).toEqual([]);
  });
}

// A smaller set of high-traffic routes get pixel-snapshot regression coverage.
// Adding new routes here is a deliberate decision — snapshots cost CI time and
// noise during routine content edits. Keep this list tight.
const SNAPSHOT_ROUTES = [
  "/",
  "/workflows/",
  "/compare/",
  "/compare/plato/",
  "/book-a-demo/",
  "/about/",
];

for (const path of SNAPSHOT_ROUTES) {
  test(`${path} matches visual snapshot`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    // Disable any in-flight animations so snapshots are stable across runs.
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });
    await expect(page).toHaveScreenshot({
      fullPage: true,
      animations: "disabled",
    });
  });
}
