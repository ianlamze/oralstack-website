import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  { path: "/", title: /Oralstack/ },
  { path: "/workflows/", title: /Dental clinic workflows/i },
  { path: "/customers/", title: /Customers/ },
  { path: "/customers/dfi-synergy/", title: /DFI Synergy/ },
  { path: "/pricing/", title: /Pricing/ },
  { path: "/integrations/", title: /Integrations/ },
  { path: "/tools/", title: /Product feature guide/i },
  { path: "/for-solo-clinics/", title: /solo/ },
  { path: "/for-multi-clinic/", title: /multi-clinic/ },
  { path: "/about/", title: /About/ },
  { path: "/faq/", title: /FAQ/ },
  { path: "/book-a-demo/", title: /demo/i },
  { path: "/contact/", title: /Contact/ },
  { path: "/changelog/", title: /Changelog/ },
  { path: "/security/", title: /Security/ },
  { path: "/status/", title: /Status/ },
  { path: "/accessibility/", title: /Accessibility/ },
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

function isExcludedReleaseHref(href: string) {
  if (!href.startsWith("/")) return false;
  const pathname = href.split(/[?#]/, 1)[0];
  if (
    ["/dev", "/journey", "/compare", "/articles", "/lead-magnets"].some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
    )
  ) {
    return true;
  }
  return pathname.startsWith("/tools/") && pathname !== "/tools/";
}

test("released pages do not link to archived routes", async ({ request }) => {
  const staleLinks: string[] = [];
  for (const route of ROUTES) {
    const response = await request.get(route.path);
    const html = await response.text();
    for (const match of html.matchAll(/href=(["'])(.*?)\1/g)) {
      const href = match[2];
      if (isExcludedReleaseHref(href)) staleLinks.push(`${route.path} -> ${href}`);
    }
  }
  expect(staleLinks).toEqual([]);
});

const PRIVACY_ROUTES = ["/", "/workflows/", "/tools/"];

const FORBIDDEN_PERSONAL_DATA =
  /(?:\+65\s?\d{4}\s?\d{4}|(?:Dr|Ms|Mr|Mrs|Mdm)\.?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+|\b[A-Z]{1,3}\d{5,}\b)/;

for (const path of PRIVACY_ROUTES) {
  test(`${path} keeps demo identities synthetic`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(FORBIDDEN_PERSONAL_DATA);

    if (path === "/") {
      await expect(
        page.getByAltText(
          "Anonymised Oralstack appointment workspace using synthetic clinic, provider, patient, and appointment data",
        ),
      ).toHaveAttribute("src", /oralstack-app-schedule-anonymised\.webp$/);
    }
  });
}

const EXCLUDED_RELEASE_ROUTES = [
  "/dev/visuals/",
  "/dev/deck/",
  "/journey/",
  "/compare/",
  "/compare/carestream/",
  "/compare/dentrix/",
  "/compare/eaglesoft/",
  "/compare/open-dental/",
  "/compare/plato/",
  "/articles/",
  "/articles/choosing-dental-pms-apac-2026/",
  "/articles/case-note-parser/",
  "/articles/dental-audit-logs/",
  "/articles/dental-sensor-bridge-integration/",
  "/articles/dicom-in-chart-vs-separate-viewer/",
  "/articles/drag-to-reschedule-dental-schedule/",
  "/articles/gst-singapore-dental-billing/",
  "/articles/insurance-vs-patient-portion-singapore/",
  "/articles/open-dental-to-managed-pms-migration/",
  "/articles/plato-to-cloud-migration/",
  "/articles/reducing-no-show-rates/",
  "/articles/same-day-billing-dental/",
  "/articles/singapore-pdpa-dental-clinics/",
  "/articles/tenant-isolation-dental-saas/",
  "/articles/tooth-led-vs-form-led-charting/",
  "/articles/whatsapp-business-dental-clinic-singapore/",
  "/lead-magnets/",
  "/lead-magnets/dental-imaging-vendor-question-pack/",
  "/lead-magnets/front-desk-daily-playbook/",
  "/lead-magnets/pdpa-compliance-checklist-singapore-dental/",
  "/lead-magnets/plato-cloud-migration-runbook/",
  "/lead-magnets/singapore-dental-insurance-billing-checklist/",
  "/tools/daily-huddle/",
  "/tools/day-in-the-life/",
  "/tools/eligibility-estimate/",
  "/tools/end-of-day-reconciliation/",
  "/tools/online-booking/",
  "/tools/insurance-claims/",
  "/tools/inventory/",
  "/tools/lab-orders/",
  "/tools/management-report/",
  "/tools/medical-alerts/",
  "/tools/no-show-calculator/",
  "/tools/patient-communications/",
  "/tools/perio-chart/",
  "/tools/plan-presentation/",
  "/tools/provider-productivity/",
  "/tools/reviews-referrals/",
  "/tools/sterilization/",
  "/tools/treatment-plan-builder/",
  "/tools/waitlist-auto-fill/",
];

for (const path of EXCLUDED_RELEASE_ROUTES) {
  test(`${path} is excluded from the production export`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
  });
}

test("demo form validates required fields before submitting", async ({ page }) => {
  let contactRequests = 0;
  page.on("request", (request) => {
    if (request.url().includes("/api/contact")) contactRequests += 1;
  });

  await page.goto("/book-a-demo/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Send demo request" }).click();

  const clinicName = page.getByLabel(/Clinic name/);
  await expect(clinicName).toBeFocused();
  expect(await clinicName.evaluate((input: HTMLInputElement) => input.validationMessage)).not.toBe(
    "",
  );
  await expect(page.getByText("Couldn't reach the server.")).toHaveCount(0);
  expect(contactRequests).toBe(0);
});

test("workflow explorer starts useful and carries the selected area into the demo", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const initialChoice = page.getByRole("button", {
    name: "Queues and calendars split the clinic day",
  });
  await expect(initialChoice).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#workflow-recommendation")).toContainText(
    "Run appointments, requests and chair gaps",
  );
  await expect(page.getByText("3 days", { exact: true })).toBeVisible();
  await expect(page.getByText("85%", { exact: true })).toBeVisible();
  await expect(page.getByText("120+", { exact: true })).toBeVisible();

  const checkoutChoice = page.getByRole("button", {
    name: "Checkout handoffs stall at the desk",
  });
  await checkoutChoice.focus();
  await page.keyboard.press("Enter");

  await expect(checkoutChoice).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#workflow-recommendation")).toContainText(
    "Stage checkout, estimates, receipts and follow-up",
  );
  await expect(page.getByRole("link", { name: "Request a focused walkthrough" })).toHaveAttribute(
    "href",
    "/book-a-demo?focus=checkout-money",
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test("focused demo requests keep context and ask for four essentials", async ({ page }) => {
  await page.goto("/book-a-demo/?focus=checkout-money", { waitUntil: "domcontentloaded" });

  await expect(page.getByLabel("Start the walkthrough with")).toHaveValue("checkout-money");
  await expect(
    page.getByText("Checkout and money will be the first workflow shown."),
  ).toBeVisible();
  await expect(page.locator("form [required]")).toHaveCount(4);

  await page.getByText("Add clinic setup details").click();
  await expect(page.getByLabel("Your role (optional)")).toBeVisible();
});

test("workflow deep links keep the section heading below the sticky navigation", async ({
  page,
}) => {
  await page.goto("/workflows/#checkout-money", { waitUntil: "networkidle" });

  await expect(page.getByRole("navigation", { name: "Workflow sections" })).toBeVisible();
  const heading = page.getByRole("heading", {
    name: "Build the checkout, record payment, and leave a receipt trail.",
  });
  await expect(heading).toBeInViewport();
  const box = await heading.boundingBox();
  expect(box?.y).toBeGreaterThan(100);
  await expect(page.getByRole("link", { name: "Walk through this area" }).nth(2)).toHaveAttribute(
    "href",
    "/book-a-demo?focus=checkout-money",
  );
});

test("workflow explorer has focused visual regression coverage", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
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

  const explorer = page.locator("#workflow-explorer");
  await expect(explorer).toHaveScreenshot("workflow-explorer-initial.png", {
    animations: "disabled",
  });

  await page.getByRole("button", { name: "Checkout handoffs stall at the desk" }).click();
  await expect(explorer).toHaveScreenshot("workflow-explorer-checkout.png", {
    animations: "disabled",
  });
});

test("tablet navigation stays compact and exposes keyboard escape", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();

  const menuButton = page.getByRole("button", { name: "Open menu" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

// A smaller set of high-traffic routes get pixel-snapshot regression coverage.
// Adding new routes here is a deliberate decision — snapshots cost CI time and
// noise during routine content edits. Keep this list tight.
const SNAPSHOT_ROUTES = ["/", "/workflows/", "/book-a-demo/", "/about/"];

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
