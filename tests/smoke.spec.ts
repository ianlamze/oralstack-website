import { expect, test, type Locator, type Page } from "@playwright/test";
import { onRequestPost } from "../functions/api/contact";

const ROUTES = [
  { path: "/", title: /dental clinic operating system/i },
  { path: "/workflows/", title: /Dental clinic workflows/i },
  { path: "/customers/", title: /Customers/ },
  { path: "/customers/dfi-synergy/", title: /DFI Synergy/ },
  { path: "/pricing/", title: /Pricing/ },
  { path: "/integrations/", title: /Clinic connections and rollout status/i },
  { path: "/switching/", title: /Switching to Oralstack/i },
  { path: "/tools/", title: /Product feature guide/i },
  { path: "/for-solo-clinics/", title: /one dental clinic|one clinic/i },
  { path: "/for-multi-clinic/", title: /clinic groups/i },
  { path: "/about/", title: /About/ },
  { path: "/faq/", title: /FAQ/ },
  { path: "/book-a-demo/", title: /demo/i },
  { path: "/contact/", title: /Contact/ },
  { path: "/changelog/", title: /Product updates/ },
  { path: "/security/", title: /Security/ },
  { path: "/status/", title: /Status/ },
  { path: "/accessibility/", title: /Accessibility/ },
  { path: "/privacy/", title: /Privacy/ },
  { path: "/terms/", title: /Terms/ },
];

const FORBIDDEN_CLINIC_FIT_CLAIMS = [
  "one to three chairs",
  "one to four providers",
  "Two people typically decide",
  "What changes month-one",
  "Cancel any time",
  "two to twenty clinics",
  "One version across every clinic",
  "every clinic in the group is on the same version every week",
  "every read and write is logged",
  "No tier upcharges",
  "usually a two-clinic pilot first",
  "clinics 2–5 typically tier down",
  "running 3+ locations",
  "within two working days",
] as const;

async function gotoAndCollect(page: Page, path: string) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  const response = await page.goto(path, { waitUntil: "domcontentloaded" });
  return { response, errors };
}

async function expectFirstViewportAction(page: Page, action: Locator) {
  await expect(action).toBeVisible();
  await expect(action).toBeInViewport();

  const box = await action.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  expect(box.height).toBeGreaterThanOrEqual(44);
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.y + box.height).toBeLessThanOrEqual(page.viewportSize()?.height ?? 0);
}

async function expectEarlyAction(page: Page, action: Locator) {
  await expect(action).toBeVisible();

  const box = await action.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  expect(box.height).toBeGreaterThanOrEqual(44);
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.y + box.height).toBeLessThanOrEqual((page.viewportSize()?.height ?? 0) * 2);
}

async function expectNoForbiddenClinicFitClaims(page: Page) {
  const body = (await page.locator("body").innerText()).toLocaleLowerCase();
  for (const claim of FORBIDDEN_CLINIC_FIT_CLAIMS) {
    expect(body, `forbidden clinic-fit claim: ${claim}`).not.toContain(claim.toLocaleLowerCase());
  }
}

async function fillEvidencePilotProposal(page: Page, suffix: string) {
  const form = page
    .getByRole("button", { name: "Request a pilot proposal", exact: true })
    .locator("xpath=ancestor::form");
  await form.getByLabel(/Your name/).fill(`Demo Practice Manager ${suffix}`);
  await form.getByLabel(/Email/).fill(`practice.manager.${suffix}@example.invalid`);
  await form.getByLabel(/Clinic \/ group name/).fill(`Synthetic Dental Clinic ${suffix}`);
  await form.getByLabel(/Number of locations/).fill("1");
  await form.getByLabel("How would you like to start?").selectOption("new-clinic");
  await form.getByLabel(/Current clinic system/).selectOption("Plato");
  await expect(form.getByLabel(/What should improve first/)).toHaveValue("run-the-day");
}

async function showFirstPartyDemoForm(page: Page) {
  const requestFormChoice = page.getByRole("button", {
    name: "Use Oralstack request form",
    exact: true,
  });
  if ((await requestFormChoice.count()) > 0) {
    await requestFormChoice.click();
    await expect(page.getByRole("region", { name: "Oralstack demo request form" })).toBeFocused();
  }
  await expect(page.getByRole("button", { name: "Send demo request" })).toBeVisible();
}

async function fillDemoRequest(page: Page, suffix: string) {
  const form = page
    .getByRole("button", { name: "Send demo request", exact: true })
    .locator("xpath=ancestor::form");
  await form.getByLabel(/Clinic name/).fill(`Synthetic Demo Clinic ${suffix}`);
  await form.getByLabel(/Location/).fill("Singapore");
  await form.getByLabel(/Your name/).fill(`Demo Operations Lead ${suffix}`);
  await form.getByLabel(/Email/).fill(`demo.${suffix}@example.invalid`);
  await form.getByLabel("How would you like to start?").selectOption("new-clinic");
  const setupDetails = form.locator("details").filter({ hasText: "Add clinic setup details" });
  await setupDetails.locator("summary").click();
  await form.getByLabel("Your role (optional)").fill(`Practice manager ${suffix}`);
  await form
    .getByLabel("Anything else (optional)")
    .fill(`Synthetic workflow notes for ${suffix}; no patient data.`);
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
          "Anonymised Oralstack appointment view using synthetic clinic, provider, patient, and appointment data",
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

  const startMode = page.getByLabel("How would you like to start?");
  await expect(startMode).toBeFocused();
  expect(
    await startMode.evaluate((select: HTMLSelectElement) => select.validationMessage),
  ).not.toBe("");
  await expect(page.getByText("Couldn't reach the server.")).toHaveCount(0);
  expect(contactRequests).toBe(0);
});

test("workflow explorer starts useful and carries the selected area into the demo", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const isCompact = (page.viewportSize()?.width ?? 1280) < 1024;
  const explorerSelect = page.getByLabel("Choose a clinic workflow");
  const initialChoice = page.getByRole("button", {
    name: "Queues and calendars split the clinic day",
  });

  if (isCompact) {
    await expect(explorerSelect).toBeVisible();
    await expect(explorerSelect).toHaveValue("run-the-day");
    await expect(explorerSelect.locator("option")).toHaveCount(7);
  } else {
    await expect(initialChoice).toHaveAttribute("aria-pressed", "true");
  }
  await expect(page.locator("#workflow-recommendation")).toContainText(
    "Run appointments, requests and chair gaps",
  );
  await expect(page.getByText("3 days", { exact: true })).toBeVisible();
  await expect(page.getByText("85%", { exact: true })).toBeVisible();
  await expect(page.getByText("120+", { exact: true })).toBeVisible();

  const checkoutChoice = page.getByRole("button", {
    name: "Checkout handoffs stall at the desk",
  });

  if (isCompact) {
    await explorerSelect.selectOption("checkout-money");
    await expect(explorerSelect).toHaveValue("checkout-money");
    await expect(page.getByText("3 of 7", { exact: true })).toBeVisible();
  } else {
    await checkoutChoice.focus();
    await page.keyboard.press("Enter");
    await expect(checkoutChoice).toHaveAttribute("aria-pressed", "true");
  }
  await expect(page.locator("#workflow-recommendation")).toContainText(
    "Stage checkout, estimates, receipts and follow-up",
  );
  await expect(page.getByRole("link", { name: "Request a focused walkthrough" })).toHaveAttribute(
    "href",
    "/book-a-demo?focus=checkout-money",
  );
  await expect(page.getByRole("link", { name: "Compare all seven workflows" })).toHaveAttribute(
    "href",
    "/workflows#checkout-money",
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test("focused demo requests keep context and ask for a starting point plus four essentials", async ({
  page,
}) => {
  await page.goto("/book-a-demo/?focus=checkout-money", { waitUntil: "domcontentloaded" });

  await expect(page.getByLabel("Start the walkthrough with")).toHaveValue("checkout-money");
  await expect(
    page.getByText("Checkout and money will be the first workflow shown."),
  ).toBeVisible();
  await expect(page.locator("form [required]")).toHaveCount(5);

  await page.getByText("Add clinic setup details").click();
  await expect(page.getByLabel("Your role (optional)")).toBeVisible();
});

test("homepage defaults to standalone positioning and exposes three starting paths", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(await page.title()).toMatch(/dental clinic operating system/i);
  expect(await page.title()).not.toMatch(/plato/i);

  const heroHeading = page.getByRole("heading", {
    level: 1,
    name: "Run the clinic day from one calm system.",
  });
  const hero = heroHeading.locator("xpath=ancestor::section");
  await expect(heroHeading).toBeVisible();
  await expect(hero).not.toContainText(/Plato/i);
  await expect(page.locator("header").first()).not.toContainText(/Plato/i);
  await expect(page.getByRole("contentinfo")).not.toContainText(/Plato/i);
  await expect(hero.getByRole("link", { name: "Book a clinic walkthrough" })).toHaveAttribute(
    "href",
    "/book-a-demo",
  );

  const startingPaths = page.getByTestId("starting-paths");
  await expect(startingPaths.getByRole("link")).toHaveCount(3);
  const paths = [
    { name: "See the new-clinic path", href: "/switching/#start-new" },
    { name: "See the move path", href: "/switching/#move-records" },
    { name: "See the connection path", href: "/switching/#keep-connection" },
  ] as const;
  for (const path of paths) {
    await expect(startingPaths.getByRole("link", { name: path.name })).toHaveAttribute(
      "href",
      path.href,
    );
  }
});

test("switching presents four truthful starting paths without 320px overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/switching/", { waitUntil: "networkidle" });

  const paths = [
    {
      id: "start-new",
      heading: "Set up a new clinic in Oralstack.",
      action: "Plan a new-clinic setup",
      href: "/contact/?intent=migration&source=switching&start=new-clinic#request",
    },
    {
      id: "move-records",
      heading: "Review what should become a digital record.",
      action: "Assess paper and spreadsheets",
      href: "/contact/?intent=migration&source=switching&start=paper-spreadsheets#request",
    },
    {
      id: "move-system",
      heading: "Map the supported records before cutover.",
      action: "Assess the current system",
      href: "/contact/?intent=migration&source=switching&start=existing-pms#request",
    },
    {
      id: "keep-connection",
      heading: "Use Oralstack with Plato where that fits.",
      action: "Review the Plato connection",
      href: "/integrations/#plato",
    },
  ] as const;

  for (const path of paths) {
    const card = page.locator(`#${path.id}`);
    await expect(card.getByRole("heading", { name: path.heading })).toBeVisible();
    await expect(card.getByRole("link", { name: path.action })).toHaveAttribute("href", path.href);
  }
  const paperHref = await page.locator("#move-records a").getAttribute("href");
  const systemHref = await page.locator("#move-system a").getAttribute("href");
  expect(paperHref).not.toBe(systemHref);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );

  await page.getByRole("link", { name: "Choose a starting path" }).click();
  const startingPathHeading = page.getByRole("heading", {
    name: "Start with the clinic you have—not a generic migration promise.",
  });
  const headingBox = await startingPathHeading.boundingBox();
  const stickyHeaderBox = await page.locator("header").boundingBox();
  expect(headingBox?.y ?? 0).toBeGreaterThanOrEqual(stickyHeaderBox?.height ?? 65);
});

test("switching links preserve source and clinic starting point into contact", async ({ page }) => {
  const paths = [
    { id: "start-new", action: "Plan a new-clinic setup", startMode: "new-clinic" },
    {
      id: "move-records",
      action: "Assess paper and spreadsheets",
      startMode: "paper-spreadsheets",
    },
    {
      id: "move-system",
      action: "Assess the current system",
      startMode: "existing-pms",
    },
  ] as const;

  for (const path of paths) {
    await page.goto("/switching/", { waitUntil: "networkidle" });
    await page.locator(`#${path.id}`).getByRole("link", { name: path.action }).click();

    const destination = new URL(page.url());
    expect(destination.pathname).toBe("/contact/");
    expect(destination.searchParams.get("intent")).toBe("migration");
    expect(destination.searchParams.get("source")).toBe("switching");
    expect(destination.searchParams.get("start")).toBe(path.startMode);
    expect(destination.hash).toBe("#request");
    await expect(page.getByRole("tab", { name: "Switching & setup" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByTestId("request-context")).toContainText(
      "Continuing from Switching & setup guide",
    );
    await expect(
      page.locator("#contact-panel-migration").getByLabel("How would you like to start?"),
    ).toHaveValue(path.startMode);
  }
});

test("default demo and pilot forms do not preselect Plato", async ({ page }) => {
  await page.goto("/book-a-demo/", { waitUntil: "networkidle" });
  await showFirstPartyDemoForm(page);
  const demoForm = page
    .getByRole("button", { name: "Send demo request", exact: true })
    .locator("xpath=ancestor::form");
  await expect(demoForm.getByLabel("How would you like to start?")).toHaveValue("");
  await expect(demoForm.getByLabel("Current clinic system (optional)")).toHaveValue("");

  await page.goto("/contact/?intent=pilot#request", { waitUntil: "networkidle" });
  const pilotForm = page.locator("#contact-panel-pilot form");
  await expect(page.getByRole("tab", { name: "Pilot proposal" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(pilotForm.getByLabel("How would you like to start?")).toHaveValue("");
  await expect(pilotForm.getByLabel("Current clinic system")).toHaveValue("");
});

test("shared request forms disclose their data boundary and link to a truthful privacy notice", async ({
  page,
}) => {
  if ((page.viewportSize()?.width ?? 1280) < 640) {
    await page.setViewportSize({ width: 320, height: 800 });
  }

  const forms = [
    { path: "/book-a-demo/", submit: "Send demo request", demo: true },
    { path: "/contact/?intent=question#request", submit: "Send question" },
    {
      path: "/contact/?intent=migration#request",
      submit: "Request a setup assessment",
    },
    { path: "/contact/?intent=pilot#request", submit: "Request a pilot proposal" },
    { path: "/contact/?intent=security#request", submit: "Request security review" },
  ] as const;

  for (const formTarget of forms) {
    await page.goto(formTarget.path, { waitUntil: "networkidle" });
    if ("demo" in formTarget && formTarget.demo) await showFirstPartyDemoForm(page);

    const submit = page.getByRole("button", { name: formTarget.submit, exact: true });
    const form = submit.locator("xpath=ancestor::form");
    const notice = form.getByTestId("request-privacy-notice");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText("Clinic details only.");
    await expect(notice).toContainText("patient names");
    await expect(notice).toContainText("clinical records");
    await expect(notice).toContainText("passwords");
    await expect(notice.getByRole("link", { name: "How requests are handled" })).toHaveAttribute(
      "href",
      "/privacy#contact-requests",
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `horizontal overflow around the request notice on ${formTarget.path}`,
    ).toBe(true);
  }

  await page.goto("/privacy/", { waitUntil: "networkidle" });
  const main = page.locator("main");
  await expect(main.getByRole("heading", { name: "Contact and demo requests" })).toBeVisible();
  await expect(main.getByRole("heading", { name: "Optional Cal.com scheduler" })).toBeVisible();
  await expect(
    main.getByRole("heading", { name: "Site requests and interaction telemetry" }),
  ).toBeVisible();
  await expect(
    main.getByRole("heading", { name: "Service providers and international processing" }),
  ).toBeVisible();
  await expect(main.getByRole("heading", { name: "Retention" })).toBeVisible();
  await expect(main.getByRole("heading", { name: "Your choices and questions" })).toBeVisible();
  await expect(main).toContainText("Cloudflare Pages Function");
  await expect(main).toContainText("Resend");
  await expect(main).toContainText("United States");
  await expect(main).toContainText("Global Privacy Control");
  await expect(main).toContainText("Do Not Track");
  await expect(main).toContainText("has not published a fixed deletion schedule");
  await expect(main.locator("#contact-requests")).toBeVisible();

  const privacyCopy = await main.innerText();
  expect(privacyCopy).not.toMatch(
    /does not run analytics yet|do not transfer personal data outside APAC|messages are held in Singapore/i,
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test("demo scheduling keeps Cal.com dormant until explicit activation", async ({ page }) => {
  let calRequests = 0;
  await page.route("https://cal.com/**", async (route) => {
    calRequests += 1;
    await route.abort();
  });

  await page.goto("/book-a-demo/?focus=run-the-day&source=pricing&start=new-clinic", {
    waitUntil: "domcontentloaded",
  });
  const gate = page.getByTestId("cal-scheduler-gate");
  const scheduler = page.getByTitle("Cal.com demo scheduler");
  const fallbackFormSubmit = page.getByRole("button", { name: "Send demo request" });
  await expect(gate.or(fallbackFormSubmit)).toBeVisible();

  if (!(await gate.isVisible())) {
    await expect(fallbackFormSubmit).toBeVisible();
    await expect(page.getByLabel("How would you like to start?")).toHaveValue("new-clinic");
    await expect(scheduler).toHaveCount(0);
    expect(calRequests).toBe(0);
    return;
  }

  await expect(gate).toBeVisible();
  await expect(gate).toContainText("Cal.com is not loaded until you open it");
  await expect(gate).toContainText("Do not enter patient or clinical data");
  await expect(gate.getByRole("link", { name: "Scheduling privacy details" })).toHaveAttribute(
    "href",
    "/privacy#scheduling",
  );
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from Guided pilot pricing",
  );
  await expect(page.getByTestId("request-context")).toContainText(
    "Clinic starting point: Start a new clinic with no existing system.",
  );
  await expect(scheduler).toHaveCount(0);
  expect(calRequests).toBe(0);

  const activate = gate.getByRole("button", { name: "Open Cal.com scheduler" });
  const activateBox = await activate.boundingBox();
  expect(activateBox?.height).toBeGreaterThanOrEqual(44);
  await activate.click();

  const loadedStatus = page.getByRole("status");
  await expect(loadedStatus).toBeFocused();
  await expect(loadedStatus).toContainText("Cal.com is now loaded");
  await expect(scheduler).toBeVisible();
  const schedulerSrc = await scheduler.getAttribute("src");
  expect(schedulerSrc).not.toBeNull();
  const schedulerUrl = new URL(schedulerSrc ?? "https://invalid.example");
  expect(schedulerUrl.hostname).toBe("cal.com");
  expect(schedulerUrl.searchParams.get("metadata[requestSource]")).toBe("pricing");
  expect(schedulerUrl.searchParams.get("metadata[workflowFocus]")).toBe("run-the-day");
  expect(schedulerUrl.searchParams.get("metadata[startMode]")).toBe("new-clinic");
  await expect.poll(() => calRequests).toBeGreaterThan(0);

  await loadedStatus.getByRole("button", { name: "Use request form instead" }).click();
  const firstPartyForm = page.getByRole("region", { name: "Oralstack demo request form" });
  await expect(firstPartyForm).toBeFocused();
  await expect(scheduler).toHaveCount(0);
  await expect(firstPartyForm.getByLabel("How would you like to start?")).toHaveValue("new-clinic");
  await expect(firstPartyForm.getByTestId("request-privacy-notice")).toBeVisible();
});

test("demo requests submit once and keep values available after a delivery error", async ({
  page,
}) => {
  let successRequests = 0;
  let successPayload: Record<string, string> | undefined;
  let releaseSuccess = () => {};
  const successGate = new Promise<void>((resolve) => {
    releaseSuccess = resolve;
  });
  await page.route("**/api/contact", async (route) => {
    successRequests += 1;
    successPayload = route.request().postDataJSON() as Record<string, string>;
    await successGate;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, message: "Demo request received." }),
    });
  });

  await page.goto("/book-a-demo/?focus=run-the-day&source=pricing", {
    waitUntil: "networkidle",
  });
  await showFirstPartyDemoForm(page);
  await fillDemoRequest(page, "success");
  const successForm = page.locator("form");
  const successSubmit = successForm.locator('button[type="submit"]');
  await successSubmit.evaluate((element: HTMLButtonElement) => {
    element.click();
    element.click();
  });

  await expect.poll(() => successRequests).toBe(1);
  await expect(successForm).toHaveAttribute("aria-busy", "true");
  await expect(successSubmit).toBeDisabled();
  await expect(successSubmit).toContainText("Sending");
  expect(successPayload).toEqual(
    expect.objectContaining({
      intent: "demo",
      sourcePage: "pricing",
      focus: "run-the-day",
      startMode: "new-clinic",
      clinicName: "Synthetic Demo Clinic success",
      location: "Singapore",
      name: "Demo Operations Lead success",
      email: "demo.success@example.invalid",
      role: "Practice manager success",
      message: "Synthetic workflow notes for success; no patient data.",
    }),
  );
  releaseSuccess();

  const status = page.locator("main").getByRole("status");
  await expect(status).toBeFocused();
  await expect(status).toContainText("Demo request received.");

  await page.unroute("**/api/contact");
  let errorRequests = 0;
  await page.route("**/api/contact", async (route) => {
    errorRequests += 1;
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, message: "Demo delivery unavailable for this test." }),
    });
  });
  await page.goto("/book-a-demo/?focus=run-the-day&source=pricing", {
    waitUntil: "networkidle",
  });
  await showFirstPartyDemoForm(page);
  await fillDemoRequest(page, "error");
  await page.getByRole("button", { name: "Send demo request" }).click();

  const alert = page.locator("form").getByRole("alert");
  await expect(alert).toBeFocused();
  await expect(alert).toContainText("Demo delivery unavailable for this test.");
  await expect(
    alert.getByRole("link", { name: "Email hello@oralstack.com instead" }),
  ).toHaveAttribute("href", "mailto:hello@oralstack.com");
  expect(errorRequests).toBe(1);
  const errorForm = page.locator("form");
  await expect(errorForm.getByLabel("How would you like to start?")).toHaveValue("new-clinic");
  await expect(errorForm.getByLabel("Start the walkthrough with")).toHaveValue("run-the-day");
  await expect(errorForm.getByLabel(/Clinic name/)).toHaveValue("Synthetic Demo Clinic error");
  await expect(errorForm.getByLabel(/Location/)).toHaveValue("Singapore");
  await expect(errorForm.getByLabel(/Your name/)).toHaveValue("Demo Operations Lead error");
  await expect(errorForm.getByLabel(/Email/)).toHaveValue("demo.error@example.invalid");
  await expect(errorForm.getByLabel("Your role (optional)")).toHaveValue("Practice manager error");
  await expect(errorForm.getByLabel("Anything else (optional)")).toHaveValue(
    "Synthetic workflow notes for error; no patient data.",
  );
  await expect(page.getByTestId("request-privacy-notice")).toBeVisible();
});

test("contact delivery preserves each allowlisted request source in the provider email", async () => {
  const sourceLabels = {
    "dfi-synergy": "DFI Synergy · April 2026 Plato-connected pilot evidence",
    about: "About Oralstack",
    pricing: "Guided pilot pricing",
    "solo-clinic": "One-clinic guide",
    "clinic-group": "Clinic-group guide",
    integrations: "Connections guide",
    switching: "Switching & setup guide",
    security: "Security & compliance overview",
    status: "Capability status snapshot",
    changelog: "Product updates and rollout notes",
    faq: "FAQ evaluation guide",
  } as const;
  const originalFetch = globalThis.fetch;

  try {
    for (const [sourcePage, expectedLabel] of Object.entries(sourceLabels)) {
      let providerPayload: { text?: string } | undefined;
      globalThis.fetch = async (_input, init) => {
        providerPayload = JSON.parse(String(init?.body)) as { text?: string };
        return Response.json({ id: "synthetic-provider-message" });
      };

      const response = await onRequestPost({
        request: new Request("https://oralstack.example/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            intent: "pilot",
            name: "Synthetic Operations Lead",
            email: "operations@example.invalid",
            clinicName: "Synthetic Dental Group",
            numLocations: 1,
            sourcePage,
          }),
        }),
        env: {
          RESEND_API_KEY: "re_synthetic_test_key",
          CONTACT_INBOX: "inbox@example.invalid",
          CONTACT_FROM: "sender@example.invalid",
        },
        waitUntil: () => undefined,
      });

      expect(response.status).toBe(200);
      expect(providerPayload?.text).toContain(`Request source: ${expectedLabel}`);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("contact delivery validates security and clinic-start allowlists without breaking legacy clients", async () => {
  const originalFetch = globalThis.fetch;
  let providerPayload:
    | { subject?: string; text?: string; html?: string; reply_to?: string }
    | undefined;
  let providerCalls = 0;
  const validPayload: Record<string, unknown> = {
    intent: "security",
    name: "Synthetic Procurement Lead",
    email: "procurement@example.invalid",
    clinicName: "Synthetic Procurement Clinic",
    role: "Procurement lead",
    requestType: "security-questionnaire",
    timeline: "1-2-weeks",
    message: "Synthetic security-review notes; no patient data.",
    sourcePage: "security",
    startMode: "new-clinic",
  };
  const env = {
    RESEND_API_KEY: "re_synthetic_test_key",
    CONTACT_INBOX: "inbox@example.invalid",
    CONTACT_FROM: "sender@example.invalid",
  };
  const postContact = (payload: Record<string, unknown>) =>
    onRequestPost({
      request: new Request("https://oralstack.example/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }),
      env,
      waitUntil: () => undefined,
    });

  try {
    globalThis.fetch = async (_input, init) => {
      providerCalls += 1;
      providerPayload = JSON.parse(String(init?.body)) as {
        subject?: string;
        text?: string;
        html?: string;
        reply_to?: string;
      };
      return Response.json({ id: `synthetic-provider-message-${providerCalls}` });
    };

    const accepted = await postContact(validPayload);
    expect(accepted.status).toBe(200);
    expect(providerCalls).toBe(1);
    expect(providerPayload).toEqual(
      expect.objectContaining({
        subject: "[oralstack contact] Security review request — Synthetic Procurement Lead",
        reply_to: "procurement@example.invalid",
      }),
    );
    expect(providerPayload?.text).toContain("Request source: Security & compliance overview");
    expect(providerPayload?.text).toContain("Role: Procurement lead");
    expect(providerPayload?.text).toContain("Clinic: Synthetic Procurement Clinic");
    expect(providerPayload?.text).toContain("Security review request: Security questionnaire");
    expect(providerPayload?.text).toContain(
      "How the clinic wants to start: Start a new clinic with no existing system",
    );
    expect(providerPayload?.html).toContain("Start a new clinic with no existing system");
    expect(providerPayload?.text).toContain("Timeline: 1-2-weeks");
    expect(providerPayload?.text).toContain("Synthetic security-review notes; no patient data.");

    const invalidRequiredFields = [
      { field: "name", value: "x", message: "Please enter your name." },
      { field: "email", value: "not-an-email", message: "Please enter a valid email." },
      {
        field: "clinicName",
        value: undefined,
        message: "Please tell us your organization or clinic name.",
      },
      {
        field: "role",
        value: undefined,
        message: "Please tell us your role or team.",
      },
      {
        field: "requestType",
        value: undefined,
        message: "Please choose what your review needs.",
      },
      {
        field: "timeline",
        value: undefined,
        message: "Please choose a review timeline.",
      },
      {
        field: "requestType",
        value: "constructor",
        message: "Please choose what your review needs.",
      },
      {
        field: "requestType",
        value: "__proto__",
        message: "Please choose what your review needs.",
      },
      {
        field: "startMode",
        value: "constructor",
        message: "Please pick a valid clinic starting point.",
      },
      {
        field: "startMode",
        value: "unknown-start",
        message: "Please pick a valid clinic starting point.",
      },
    ] as const;

    for (const invalid of invalidRequiredFields) {
      const response = await postContact({ ...validPayload, [invalid.field]: invalid.value });
      expect(response.status, `${invalid.field}=${String(invalid.value)}`).toBe(400);
      expect(await response.json()).toEqual({ ok: false, message: invalid.message });
      expect(providerCalls, `provider called for ${invalid.field}=${String(invalid.value)}`).toBe(
        1,
      );
    }

    for (const inheritedSourceKey of ["constructor", "__proto__"] as const) {
      providerPayload = undefined;
      const callsBeforeRequest = providerCalls;
      const response = await postContact({
        ...validPayload,
        sourcePage: inheritedSourceKey,
      });
      expect(response.status).toBe(200);
      expect(providerCalls).toBe(callsBeforeRequest + 1);
      expect(providerPayload).toBeDefined();
      const inheritedSourceText = (providerPayload as { text?: string } | undefined)?.text;
      expect(inheritedSourceText).not.toContain("Request source:");
      expect(inheritedSourceText).not.toContain(inheritedSourceKey);
    }

    providerPayload = undefined;
    const callsBeforeLegacyRequest = providerCalls;
    const legacyResponse = await postContact({ ...validPayload, startMode: undefined });
    expect(legacyResponse.status).toBe(200);
    expect(providerCalls).toBe(callsBeforeLegacyRequest + 1);
    expect((providerPayload as { text?: string } | undefined)?.text).not.toContain(
      "How the clinic wants to start:",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("security, status, and pricing preserve procurement truth and request context", async ({
  page,
}) => {
  await page.goto("/security/", { waitUntil: "networkidle" });

  const securityActions = page.getByTestId("security-trust-actions");
  const securityRequest = securityActions.getByRole("link", { name: "Request security review" });
  await expectEarlyAction(page, securityRequest);
  await expect(securityRequest).toHaveAttribute(
    "href",
    "/contact/?intent=security&source=security&request=security-questionnaire#request",
  );
  await expect(
    securityActions.getByRole("link", { name: "View capability snapshot" }),
  ).toHaveAttribute("href", "/status");
  await expect(page.getByText("Through 6 August 2026", { exact: true })).toBeVisible();
  await expect(
    page.getByText("CE-HIMS, SOC 2 and ISO 27001 not held", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText(
    "the latest recorded production-flag snapshot is dated 20 July 2026",
  );
  await expect(page.locator("main")).toContainText(
    "Deployment details must be reconfirmed during procurement",
  );
  expect(await page.locator("main").textContent()).toContain(
    "It is not presented as a live telemetry or uptime monitor.",
  );
  expect(
    await page.locator("main a[href='mailto:security@oralstack.com']").count(),
  ).toBeGreaterThan(0);

  const securityDocumentRoutes = [
    {
      name: /^Product agreement/,
      href: "/contact/?intent=security&source=security&request=product-agreement#request",
    },
    {
      name: /^Data processing terms/,
      href: "/contact/?intent=security&source=security&request=data-processing-terms#request",
    },
    {
      name: /^Security evidence pack/,
      href: "/contact/?intent=security&source=security&request=evidence-pack#request",
    },
    {
      name: /^Deployment-specific subprocessor information/,
      href: "/contact/?intent=security&source=security&request=subprocessor-information#request",
    },
  ] as const;
  for (const documentRoute of securityDocumentRoutes) {
    const documentLinks = page.locator(`main a[href="${documentRoute.href}"]`);
    expect(await documentLinks.count(), String(documentRoute.name)).toBeGreaterThan(0);
  }

  await securityRequest.click();
  await expect(page).toHaveURL(
    /\/contact\/\?intent=security&source=security&request=security-questionnaire#request$/,
  );
  await expect(page.getByRole("tab", { name: "Security review" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from Security & compliance overview",
  );
  await expect(page.getByTestId("request-context")).toContainText("Repository evidence is dated");
  await expect(page.getByLabel("What do you need?")).toHaveValue("security-questionnaire");

  await page.goto("/status/", { waitUntil: "networkidle" });
  const statusActions = page.getByTestId("status-trust-actions");
  const statusRequest = statusActions.getByRole("link", {
    name: "Request current confirmation",
  });
  await expectEarlyAction(page, statusRequest);
  await expect(statusRequest).toHaveAttribute(
    "href",
    "/contact/?intent=security&source=status&request=deployment-status#request",
  );
  await expect(
    statusActions.getByText("Evidence reviewed, not live-monitored", { exact: true }),
  ).toBeVisible();
  await expect(statusActions).toContainText("Source reviewed through 6 August 2026");
  await expect(statusActions).toContainText("production-flag snapshot recorded 20 July 2026");
  await expect(statusActions).toContainText("This page has no automated uptime feed");
  const standaloneStatus = page.locator("li").filter({ hasText: "Standalone clinic workspace" });
  await expect(standaloneStatus.getByText("Configured pilot", { exact: true })).toBeVisible();
  const nativeRecordStatus = page
    .locator("li")
    .filter({ hasText: "Native scheduling, invoicing, and payer setup" });
  await expect(nativeRecordStatus.getByText("Configured pilot", { exact: true })).toBeVisible();
  const optionalPlatoStatus = page.locator("li").filter({ hasText: "Optional Plato connection" });
  await expect(
    optionalPlatoStatus.getByText("Available with clinic setup", { exact: true }),
  ).toBeVisible();

  await statusRequest.click();
  await expect(page).toHaveURL(
    /\/contact\/\?intent=security&source=status&request=deployment-status#request$/,
  );
  await expect(page.getByRole("tab", { name: "Security review" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from Capability status snapshot",
  );
  await expect(page.getByTestId("request-context")).toContainText("not a live uptime feed");
  await expect(page.getByLabel("What do you need?")).toHaveValue("deployment-status");

  await page.goto("/pricing/", { waitUntil: "networkidle" });
  const corePrice = page.getByText("What the core price covers", { exact: true }).locator("..");
  await expect(corePrice).toContainText("Guided setup of the agreed native clinic workflows");
  const separatelyScoped = page
    .getByText("Scoped separately before kickoff", { exact: true })
    .locator("..");
  await expect(separatelyScoped).toContainText("Bulk legacy-record migration");
  await expect(separatelyScoped).toContainText("Plato or another bespoke connector");
  const pricingSecurityReview = page.getByRole("link", { name: "the security review form" });
  await expect(pricingSecurityReview).toHaveAttribute(
    "href",
    "/contact/?intent=security&source=pricing&request=product-agreement#request",
  );
  await pricingSecurityReview.click();
  await expect(page).toHaveURL(
    /\/contact\/\?intent=security&source=pricing&request=product-agreement#request$/,
  );
  await expect(page.getByRole("tab", { name: "Security review" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from Guided pilot pricing",
  );
  await expect(page.getByLabel("What do you need?")).toHaveValue("product-agreement");
});

test("security review submits the selected source and provider-ready fields once", async ({
  page,
}) => {
  let requestCount = 0;
  let reviewPayload: Record<string, string> | undefined;
  await page.route("**/api/contact", async (route) => {
    requestCount += 1;
    reviewPayload = route.request().postDataJSON() as Record<string, string>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Security review request received for this test.",
      }),
    });
  });

  await page.goto(
    "/contact/?intent=security&source=security&request=security-questionnaire#request",
    { waitUntil: "networkidle" },
  );
  const form = page.locator("#contact-panel-security form");
  await expect(page.getByRole("tab", { name: "Security review" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(form.getByLabel("What do you need?")).toHaveValue("security-questionnaire");
  await form.getByLabel("Your name").fill("Synthetic Security Reviewer");
  await form.getByLabel("Work email").fill("security.reviewer@example.invalid");
  await form.getByLabel("Organization / clinic").fill("Synthetic Review Clinic");
  await form.getByLabel("Your role / team").fill("Security and procurement");
  await form.getByLabel("Review timeline").selectOption("1-2-weeks");
  await form
    .getByLabel("Scope or format notes (optional)")
    .fill("Synthetic questionnaire scope; no patient data or security findings.");
  await form.getByRole("button", { name: "Request security review" }).click();

  const status = page.locator("#contact-panel-security").getByRole("status");
  await expect(status).toBeFocused();
  await expect(status).toContainText("Security review request received for this test.");
  expect(requestCount).toBe(1);
  expect(reviewPayload).toEqual(
    expect.objectContaining({
      intent: "security",
      sourcePage: "security",
      name: "Synthetic Security Reviewer",
      email: "security.reviewer@example.invalid",
      clinicName: "Synthetic Review Clinic",
      role: "Security and procurement",
      requestType: "security-questionnaire",
      timeline: "1-2-weeks",
      message: "Synthetic questionnaire scope; no patient data or security findings.",
    }),
  );

  await page.unroute("**/api/contact");
  await page.route("**/api/contact", async (route) => {
    requestCount += 1;
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        ok: false,
        message: "Security review delivery unavailable for this test.",
      }),
    });
  });
  await page.reload({ waitUntil: "networkidle" });

  const retryForm = page.locator("#contact-panel-security form");
  await expect(retryForm.getByLabel("What do you need?")).toHaveValue("security-questionnaire");
  await retryForm.getByLabel("Your name").fill("Synthetic Retry Reviewer");
  await retryForm.getByLabel("Work email").fill("security.retry@example.invalid");
  await retryForm.getByLabel("Organization / clinic").fill("Synthetic Retry Clinic");
  await retryForm.getByLabel("Your role / team").fill("Security retry owner");
  await retryForm.getByLabel("Review timeline").selectOption("this-month");
  await retryForm
    .getByLabel("Scope or format notes (optional)")
    .fill("Synthetic retry scope; no patient data or security findings.");
  await retryForm.getByRole("button", { name: "Request security review" }).click();

  const alert = retryForm.getByRole("alert");
  await expect(alert).toBeFocused();
  await expect(alert).toContainText("Security review delivery unavailable for this test.");
  await expect(
    alert.getByRole("link", { name: "Email security@oralstack.com instead" }),
  ).toHaveAttribute("href", "mailto:security@oralstack.com");
  expect(requestCount).toBe(2);
  await expect(retryForm.getByLabel("Your name")).toHaveValue("Synthetic Retry Reviewer");
  await expect(retryForm.getByLabel("Work email")).toHaveValue("security.retry@example.invalid");
  await expect(retryForm.getByLabel("Organization / clinic")).toHaveValue("Synthetic Retry Clinic");
  await expect(retryForm.getByLabel("Your role / team")).toHaveValue("Security retry owner");
  await expect(retryForm.getByLabel("What do you need?")).toHaveValue("security-questionnaire");
  await expect(retryForm.getByLabel("Review timeline")).toHaveValue("this-month");
  await expect(retryForm.getByLabel("Scope or format notes (optional)")).toHaveValue(
    "Synthetic retry scope; no patient data or security findings.",
  );
});

test("customers page presents one named historical pilot and contextual request paths", async ({
  page,
}) => {
  await page.goto("/customers/", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", { name: "One named pilot, documented in detail." }),
  ).toBeVisible();
  const evidenceIndex = page.getByTestId("customer-evidence-index");
  await expect(evidenceIndex.getByRole("article")).toHaveCount(1);
  await expect(evidenceIndex.getByText("Historical pilot", { exact: true })).toBeVisible();
  await expect(
    page.getByText("not a broader customer roster or a general performance promise", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(
    evidenceIndex.getByRole("link", { name: "Read the case study and methodology" }),
  ).toHaveAttribute("href", "/customers/dfi-synergy");
  await expect(
    evidenceIndex.getByRole("link", { name: "Request a pilot proposal" }),
  ).toHaveAttribute("href", "/contact/?intent=pilot&source=dfi-synergy#request");
  await expect(
    evidenceIndex.getByRole("link", { name: "See the front-desk workflow" }),
  ).toHaveAttribute("href", "/book-a-demo/?focus=run-the-day&source=dfi-synergy");
  await expect(evidenceIndex.locator("a[href^='mailto:']")).toHaveCount(0);

  const body = await page.locator("main").innerText();
  expect(body).not.toMatch(/Early pilots across APAC|small group of dental clinics|each quarter/i);
});

test("DFI evidence carries qualified context into demo and pilot requests", async ({ page }) => {
  await page.goto("/customers/dfi-synergy/", { waitUntil: "networkidle" });

  const earlyActions = page.getByTestId("case-study-early-actions");
  const historicalBoundary = page.getByText(
    "Historical customer story · Plato-connected workflow pilot · April 2026 · Singapore",
    { exact: true },
  );
  const proposal = earlyActions.getByRole("link", { name: "Request a scoped pilot proposal" });
  const walkthrough = earlyActions.getByRole("link", { name: "See the front-desk workflow" });
  await expect(historicalBoundary).toBeVisible();
  await expect(proposal).toHaveAttribute(
    "href",
    "/contact/?intent=pilot&source=dfi-synergy#request",
  );
  await expect(walkthrough).toHaveAttribute(
    "href",
    "/book-a-demo/?focus=run-the-day&source=dfi-synergy",
  );

  const viewport = page.viewportSize();
  const actionsBox = await earlyActions.boundingBox();
  const historicalBoundaryBox = await historicalBoundary.boundingBox();
  expect(actionsBox).not.toBeNull();
  expect(historicalBoundaryBox).not.toBeNull();
  if (actionsBox && viewport) {
    expect(actionsBox.y + actionsBox.height).toBeLessThanOrEqual(viewport.height * 2);
  }
  if (actionsBox && historicalBoundaryBox) {
    expect(historicalBoundaryBox.y).toBeLessThan(actionsBox.y);
  }
  for (const action of [proposal, walkthrough]) {
    const box = await action.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  await expect(page.getByRole("link", { name: "ask about the methodology" })).toHaveAttribute(
    "href",
    "/contact/?intent=question&source=dfi-synergy#request",
  );
  await expect(earlyActions.locator("a[href^='mailto:']")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "All customers" })).toHaveCount(0);
  expect(await page.locator("main").innerText()).not.toMatch(/each quarter|quarterly cohort/i);

  await walkthrough.click();
  await expect(page).toHaveURL(/\/book-a-demo\/\?focus=run-the-day&source=dfi-synergy$/);
  const demoContext = page.getByTestId("request-context");
  await expect(demoContext).toContainText(
    "Continuing from DFI Synergy · April 2026 Plato-connected pilot",
  );
  await expect(demoContext).toContainText("historical, clinic-specific, and connected");
  await expect(page.getByLabel("Start the walkthrough with")).toHaveValue("run-the-day");
  await expect(page.locator("form [required]").first()).toHaveAccessibleName(
    /How would you like to start/,
  );
  if ((page.viewportSize()?.width ?? 0) < 640) {
    const firstRequired = page.locator("form [required]").first();
    await expect(firstRequired).toBeInViewport();
    const firstRequiredBox = await firstRequired.boundingBox();
    expect(
      (firstRequiredBox?.y ?? Number.POSITIVE_INFINITY) + (firstRequiredBox?.height ?? 0),
    ).toBeLessThanOrEqual(page.viewportSize()?.height ?? 0);
  }

  await page.goto("/customers/dfi-synergy/", { waitUntil: "networkidle" });
  await page
    .getByTestId("case-study-early-actions")
    .getByRole("link", { name: "Request a scoped pilot proposal" })
    .click();
  await expect(page).toHaveURL(/\/contact\/\?intent=pilot&source=dfi-synergy#request$/);
  await expect(page.getByRole("tab", { name: "Pilot proposal" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  const pilotContext = page.getByTestId("request-context");
  await expect(pilotContext).toContainText(
    "Continuing from DFI Synergy · April 2026 Plato-connected pilot",
  );
  await expect(pilotContext).toContainText("historical, clinic-specific, and connected");
  await expect(page.getByLabel(/What should improve first/)).toHaveValue("run-the-day");
});

test("contact tabs keep keyboard focus visible and below the sticky navigation", async ({
  page,
}) => {
  await page.goto(
    "/contact/?intent=security&source=security&request=security-questionnaire#request",
    {
      waitUntil: "networkidle",
    },
  );

  const questionTab = page.getByRole("tab", { name: "Quick question" });
  const migrationTab = page.getByRole("tab", { name: "Switching & setup" });
  const pilotTab = page.getByRole("tab", { name: "Pilot proposal" });
  const securityTab = page.getByRole("tab", { name: "Security review" });
  await expect(page.getByRole("tab")).toHaveCount(4);
  await expect(securityTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByLabel("What do you need?")).toHaveValue("security-questionnaire");

  await securityTab.focus();
  await securityTab.press("ArrowRight");
  await expect(questionTab).toBeFocused();
  await expect(questionTab).toHaveAttribute("aria-selected", "true");
  await questionTab.press("ArrowLeft");
  await expect(securityTab).toBeFocused();
  await expect(securityTab).toHaveAttribute("aria-selected", "true");
  await securityTab.press("Home");
  await expect(questionTab).toBeFocused();
  await expect(questionTab).toHaveAttribute("aria-selected", "true");
  await questionTab.press("End");
  await expect(securityTab).toBeFocused();
  await expect(securityTab).toHaveAttribute("aria-selected", "true");
  await expect(migrationTab).toHaveAttribute("aria-selected", "false");
  await expect(pilotTab).toHaveAttribute("aria-selected", "false");

  await securityTab.press("Tab");
  const panel = page.getByRole("tabpanel", { name: "Security review" });
  await expect(panel).toBeFocused();
  const hasVisibleFocus = await panel.evaluate((element) => {
    const style = getComputedStyle(element);
    return (
      (style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) > 0) ||
      style.boxShadow !== "none"
    );
  });
  expect(hasVisibleFocus).toBe(true);

  const banner = page.getByRole("banner");
  await expect
    .poll(async () => {
      const [panelBox, bannerBox] = await Promise.all([panel.boundingBox(), banner.boundingBox()]);
      if (!panelBox || !bannerBox) return Number.NEGATIVE_INFINITY;
      return panelBox.y - (bannerBox.y + bannerBox.height);
    })
    .toBeGreaterThanOrEqual(0);
});

test("contact tabs retain drafts and source context through browser history", async ({ page }) => {
  await page.goto(
    "/contact/?intent=question&source=security&request=security-questionnaire#request",
    { waitUntil: "networkidle" },
  );

  const questionTab = page.getByRole("tab", { name: "Quick question" });
  const migrationTab = page.getByRole("tab", { name: "Switching & setup" });
  const pilotTab = page.getByRole("tab", { name: "Pilot proposal" });
  const securityTab = page.getByRole("tab", { name: "Security review" });
  const questionPanel = page.locator("#contact-panel-question");
  const migrationPanel = page.locator("#contact-panel-migration");
  const pilotPanel = page.locator("#contact-panel-pilot");
  const securityPanel = page.locator("#contact-panel-security");
  await expect(page.locator("[role='tabpanel']")).toHaveCount(4);
  await expect(questionPanel).toBeVisible();
  await expect(migrationPanel).toBeHidden();
  await expect(pilotPanel).toBeHidden();
  await expect(securityPanel).toBeHidden();
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from Security & compliance overview",
  );

  await questionPanel.getByLabel(/Your name/).fill("Question Draft Owner");
  await questionPanel.getByLabel(/Email/).fill("question.draft@example.invalid");
  await questionPanel
    .getByLabel("What's your question?")
    .fill("How does the reviewed Plato connection work?");

  await migrationTab.click();
  await expect(migrationTab).toHaveAttribute("aria-selected", "true");
  await expect(questionPanel).toBeHidden();
  await expect(migrationPanel).toBeVisible();
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from Security & compliance overview",
  );
  await migrationPanel.getByLabel(/Your name/).fill("Migration Draft Owner");
  await migrationPanel.getByLabel(/Email/).fill("migration.draft@example.invalid");
  await migrationPanel.getByLabel(/Clinic name/).fill("Synthetic Migration Clinic");
  await migrationPanel.getByLabel("How would you like to start?").selectOption("plato-connected");
  await migrationPanel.getByLabel("Current clinic system").selectOption("Plato");
  await migrationPanel.getByLabel("What should improve first?").selectOption("run-the-day");

  await pilotTab.click();
  await expect(pilotTab).toHaveAttribute("aria-selected", "true");
  await expect(migrationPanel).toBeHidden();
  await expect(pilotPanel).toBeVisible();
  await pilotPanel.getByLabel(/Your name/).fill("Pilot Draft Owner");
  await pilotPanel.getByLabel("Clinic / group name").fill("Synthetic Pilot Group");
  await pilotPanel.getByLabel("Number of locations").fill("2");

  await securityTab.click();
  await expect(securityTab).toHaveAttribute("aria-selected", "true");
  await expect(pilotPanel).toBeHidden();
  await expect(securityPanel).toBeVisible();
  await securityPanel.getByLabel("Your name").fill("Security Draft Owner");
  await securityPanel.getByLabel("Work email").fill("security.draft@example.invalid");
  await securityPanel.getByLabel("Organization / clinic").fill("Synthetic Review Clinic");
  await securityPanel.getByLabel("Your role / team").fill("Security reviewer");
  await expect(securityPanel.getByLabel("What do you need?")).toHaveValue("security-questionnaire");
  await securityPanel.getByLabel("Review timeline").selectOption("this-month");
  await securityPanel
    .getByLabel("Scope or format notes (optional)")
    .fill("Synthetic draft scope; no patient data or security findings.");

  await page.goBack();
  await expect(pilotTab).toHaveAttribute("aria-selected", "true");
  await expect(pilotPanel).toBeVisible();

  await page.goBack();
  await expect(migrationTab).toHaveAttribute("aria-selected", "true");
  await expect(migrationPanel).toBeVisible();
  await expect(migrationPanel.getByLabel(/Clinic name/)).toHaveValue("Synthetic Migration Clinic");
  await expect(migrationPanel.getByLabel("How would you like to start?")).toHaveValue(
    "plato-connected",
  );
  await expect(migrationPanel.getByLabel("What should improve first?")).toHaveValue("run-the-day");

  await page.goBack();
  await expect(questionTab).toHaveAttribute("aria-selected", "true");
  await expect(questionPanel).toBeVisible();
  await expect(questionPanel.getByLabel(/Your name/)).toHaveValue("Question Draft Owner");
  await expect(questionPanel.getByLabel("What's your question?")).toHaveValue(
    "How does the reviewed Plato connection work?",
  );

  await page.goForward();
  await expect(migrationTab).toHaveAttribute("aria-selected", "true");
  await page.goForward();
  await expect(pilotTab).toHaveAttribute("aria-selected", "true");
  await expect(pilotPanel).toBeVisible();
  await expect(pilotPanel.getByLabel(/Your name/)).toHaveValue("Pilot Draft Owner");
  await expect(pilotPanel.getByLabel("Clinic / group name")).toHaveValue("Synthetic Pilot Group");
  await expect(pilotPanel.getByLabel("Number of locations")).toHaveValue("2");

  await page.goForward();
  await expect(securityTab).toHaveAttribute("aria-selected", "true");
  await expect(securityPanel).toBeVisible();
  await expect(securityPanel.getByLabel("Your name")).toHaveValue("Security Draft Owner");
  await expect(securityPanel.getByLabel("Work email")).toHaveValue(
    "security.draft@example.invalid",
  );
  await expect(securityPanel.getByLabel("Organization / clinic")).toHaveValue(
    "Synthetic Review Clinic",
  );
  await expect(securityPanel.getByLabel("Your role / team")).toHaveValue("Security reviewer");
  await expect(securityPanel.getByLabel("What do you need?")).toHaveValue("security-questionnaire");
  await expect(securityPanel.getByLabel("Review timeline")).toHaveValue("this-month");
  await expect(securityPanel.getByLabel("Scope or format notes (optional)")).toHaveValue(
    "Synthetic draft scope; no patient data or security findings.",
  );
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from Security & compliance overview",
  );
  await expect
    .poll(() =>
      page.evaluate(() => ({
        intent: new URL(window.location.href).searchParams.get("intent"),
        source: new URL(window.location.href).searchParams.get("source"),
        request: new URL(window.location.href).searchParams.get("request"),
        hash: window.location.hash,
      })),
    )
    .toEqual({
      intent: "security",
      source: "security",
      request: "security-questionnaire",
      hash: "#request",
    });
});

test("request feedback focuses success and error states without losing form values", async ({
  page,
}) => {
  let deliveredPayload: Record<string, string> | undefined;
  await page.route("**/api/contact", async (route) => {
    deliveredPayload = route.request().postDataJSON() as Record<string, string>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, message: "Pilot request received." }),
    });
  });
  await page.goto("/contact/?intent=pilot&source=dfi-synergy#request", {
    waitUntil: "networkidle",
  });
  await fillEvidencePilotProposal(page, "success");
  await page.getByRole("button", { name: "Request a pilot proposal" }).click();

  const status = page.locator("main").getByRole("status");
  await expect(status).toBeFocused();
  await expect(status).toContainText("Request received.");
  expect(deliveredPayload).toEqual(
    expect.objectContaining({
      intent: "pilot",
      sourcePage: "dfi-synergy",
      startMode: "new-clinic",
      workflowGoal: "run-the-day",
    }),
  );

  await page.unroute("**/api/contact");
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ ok: false, message: "Request service unavailable for this test." }),
    });
  });
  await page.reload({ waitUntil: "networkidle" });
  await fillEvidencePilotProposal(page, "preserved");
  await page.getByRole("button", { name: "Request a pilot proposal" }).click();

  const alert = page.locator("form").getByRole("alert");
  await expect(alert).toBeFocused();
  await expect(alert).toContainText("Request service unavailable for this test.");
  await expect(
    alert.getByRole("link", { name: "Email hello@oralstack.com instead" }),
  ).toHaveAttribute("href", "mailto:hello@oralstack.com");
  const preservedForm = page.locator("#contact-panel-pilot form");
  await expect(preservedForm.getByLabel(/Your name/)).toHaveValue(
    "Demo Practice Manager preserved",
  );
  await expect(preservedForm.getByLabel(/Email/)).toHaveValue(
    "practice.manager.preserved@example.invalid",
  );
  await expect(preservedForm.getByLabel(/Clinic \/ group name/)).toHaveValue(
    "Synthetic Dental Clinic preserved",
  );
  await expect(preservedForm.getByLabel(/Number of locations/)).toHaveValue("1");
  await expect(preservedForm.getByLabel("How would you like to start?")).toHaveValue("new-clinic");
  await expect(preservedForm.getByLabel(/Current clinic system/)).toHaveValue("Plato");
  await expect(preservedForm.getByLabel(/What should improve first/)).toHaveValue("run-the-day");
});

test("about explains accountability and preserves the walkthrough context", async ({ page }) => {
  await page.goto("/about/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Built around what dental clinics actually run.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Founder bios are being written up.")).toHaveCount(0);
  await expect(page.getByText("a real engineer is on every call", { exact: false })).toHaveCount(0);

  const actions = page.getByTestId("about-top-actions");
  const walkthrough = actions.getByRole("link", { name: "Book a clinic walkthrough" });
  await expect(walkthrough).toHaveAttribute("href", "/book-a-demo/?source=about");
  await expectFirstViewportAction(page, walkthrough);
  await expect(actions.getByRole("link", { name: "Request a pilot proposal" })).toHaveAttribute(
    "href",
    "/contact/?intent=pilot&source=about#request",
  );

  const engagement = page.getByTestId("about-engagement-model");
  await expect(
    engagement.getByRole("heading", {
      level: 2,
      name: "Three reviewed steps from clinic day to pilot.",
    }),
  ).toBeVisible();
  await expect(engagement.getByRole("listitem")).toHaveCount(3);
  await expect(engagement.getByText("Clinic responsibility")).toHaveCount(3);
  await expect(engagement.getByText("Oralstack responsibility")).toHaveCount(3);
  const engagementDetails = engagement.locator("details");
  await expect(engagementDetails.first()).toHaveAttribute("open", "");
  await expect(engagementDetails.nth(1)).not.toHaveAttribute("open", "");
  await engagement.locator("summary").nth(1).press("Enter");
  await expect(engagementDetails.nth(1)).toHaveAttribute("open", "");
  await expect(
    engagementDetails.nth(1).getByText("Confirm record ownership", { exact: false }),
  ).toBeVisible();

  const evidence = page.getByRole("navigation", { name: "Oralstack product evidence" });
  const evidenceLinks = [
    ["See the clinic workflows", "/workflows"],
    ["Choose how your clinic starts", "/switching"],
    ["Review the security boundary", "/security"],
    ["Check capability status", "/status"],
  ] as const;
  for (const [name, href] of evidenceLinks) {
    await expect(evidence.getByRole("link", { name: new RegExp(name) })).toHaveAttribute(
      "href",
      href,
    );
  }

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/about/", { waitUntil: "networkidle" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  const mobileWalkthrough = page
    .getByTestId("about-top-actions")
    .getByRole("link", { name: "Book a clinic walkthrough" });
  await expectFirstViewportAction(page, mobileWalkthrough);
  await mobileWalkthrough.click();
  await expect(page).toHaveURL(/\/book-a-demo\/\?source=about$/);
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from About Oralstack",
  );
});

test("faq routes clinic evaluation decisions into accessible answers and a contextual walkthrough", async ({
  page,
}) => {
  await page.goto("/faq/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Answers for the clinic decision in front of you.",
    }),
  ).toBeVisible();

  const startHere = page.getByTestId("faq-start-here");
  const alwaysVisibleQuestion = startHere.getByRole("heading", {
    level: 2,
    name: "Can Oralstack run without Plato?",
  });
  const questionDetails = page.locator(
    'main section[aria-label="Frequently asked questions"] details',
  );
  await expect(alwaysVisibleQuestion).toBeVisible();
  await expect(
    startHere.getByText("Yes, through a clinic-configured guided pilot", { exact: false }),
  ).toBeVisible();
  await expect(questionDetails).toHaveCount(19);
  expect((await alwaysVisibleQuestion.count()) + (await questionDetails.count())).toBe(20);
  await expect(
    page.locator('main section[aria-label="Frequently asked questions"] details[open]'),
  ).toHaveCount(0);

  const decisionNav = page.getByRole("navigation", {
    name: "Go straight to the evidence you need.",
  });
  const decisionAnchors = [
    "commercial-fit",
    "setup-records",
    "clinical-connections",
    "security-continuity",
  ] as const;
  const decisionLinks = decisionNav.locator('a[href^="#"]');
  await expect(decisionLinks).toHaveCount(4);
  for (const anchor of decisionAnchors) {
    await expect(decisionNav.locator(`a[href="#${anchor}"]`)).toHaveCount(1);
    await expect(page.locator(`section#${anchor}`)).toHaveCount(1);
  }

  const heroActions = page.getByTestId("faq-hero-actions");
  const walkthrough = heroActions.getByRole("link", { name: "Book a clinic walkthrough" });
  const question = heroActions.getByRole("link", { name: "Ask a clinic-specific question" });
  await expect(walkthrough).toHaveAttribute("href", "/book-a-demo/?source=faq&start=exploring");
  await expect(question).toHaveAttribute("href", "/contact/?intent=question&source=faq#request");
  await expectFirstViewportAction(page, walkthrough);
  for (const action of [walkthrough, question]) {
    const box = await action.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }

  const summaries = questionDetails.locator("summary");
  const summaryHeights = await summaries.evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().height),
  );
  expect(summaryHeights).toHaveLength(19);
  expect(summaryHeights.every((height) => height >= 44)).toBe(true);

  const firstDetails = questionDetails.first();
  const firstSummary = firstDetails.locator("summary");
  await firstSummary.focus();
  await firstSummary.press("Enter");
  await expect(firstDetails).toHaveAttribute("open", "");
  await firstSummary.press("Space");
  await expect(firstDetails).not.toHaveAttribute("open", "");

  await walkthrough.click();
  await expect(page).toHaveURL(/\/book-a-demo\/\?source=faq&start=exploring$/);
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from FAQ evaluation guide",
  );
  await expect(page.getByLabel("How would you like to start?")).toHaveValue("exploring");

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/faq/", { waitUntil: "networkidle" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
  await page
    .getByRole("navigation", { name: "Go straight to the evidence you need." })
    .locator('a[href="#commercial-fit"]')
    .click();
  await expect(page).toHaveURL(/\/faq\/#commercial-fit$/);
  const targetHeading = page.locator("#commercial-fit-heading");
  await expect(targetHeading).toBeInViewport();
  const targetBox = await targetHeading.boundingBox();
  const stickyHeaderBox = await page.locator("body > header").boundingBox();
  expect(targetBox?.y ?? 0).toBeGreaterThanOrEqual(stickyHeaderBox?.height ?? 65);
});

test("changelog separates current releases from the archive and preserves walkthrough context", async ({
  page,
}) => {
  await page.goto("/changelog/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Product changes, with rollout state attached.",
    }),
  ).toBeVisible();

  const heroActions = page.getByTestId("changelog-hero-actions");
  const walkthrough = heroActions.getByRole("link", { name: "Book a clinic walkthrough" });
  await expect(walkthrough).toHaveAttribute("href", "/book-a-demo/?source=changelog");
  await expectFirstViewportAction(page, walkthrough);
  await expect(heroActions.getByRole("link", { name: "Review capability status" })).toHaveAttribute(
    "href",
    "/status",
  );

  const releaseRecord = page.getByTestId("changelog-release-record");
  await expect(
    releaseRecord.getByRole("heading", {
      level: 2,
      name: "Standalone-first setup and an accountable clinic rollout.",
    }),
  ).toBeVisible();
  await expect(releaseRecord.locator('time[datetime="2026-08-10"]')).toHaveCount(1);
  await expect(releaseRecord.getByText("Public now", { exact: true })).toBeVisible();

  const currentNotes = page.getByTestId("current-release-notes");
  await expect(currentNotes.getByRole("listitem")).toHaveCount(5);
  await expect(currentNotes.getByText("Public now", { exact: true })).toHaveCount(4);
  await expect(currentNotes.getByText("Source reviewed", { exact: true })).toHaveCount(1);
  await expect(currentNotes.getByRole("listitem").first().locator("time")).toHaveText(
    "10 Aug 2026",
  );
  const currentDates = await currentNotes
    .locator("time[datetime]")
    .evaluateAll((times) => times.map((time) => time.getAttribute("datetime") ?? ""));
  expect(currentDates).toEqual([...currentDates].sort((a, b) => b.localeCompare(a)));

  const history = page.getByTestId("changelog-history");
  await expect(history).not.toHaveAttribute("open", "");
  await expect(
    history.getByText("10 notes from March and April 2026", { exact: false }),
  ).toBeVisible();
  await expect(
    history
      .locator("h3")
      .filter({ hasText: "Controlled rollout: DICOM and sensor-bridge evaluation." }),
  ).toBeHidden();
  await history.locator("summary").press("Enter");
  await expect(history).toHaveAttribute("open", "");
  await expect(history.getByRole("listitem")).toHaveCount(10);
  const historicalDates = await history
    .locator("time[datetime]")
    .evaluateAll((times) => times.map((time) => time.getAttribute("datetime") ?? ""));
  expect(historicalDates).toEqual([...historicalDates].sort((a, b) => b.localeCompare(a)));
  expect(historicalDates[0]?.localeCompare(currentDates.at(-1) ?? "")).toBeLessThan(0);

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/changelog/", { waitUntil: "networkidle" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  const mobileWalkthrough = page
    .getByTestId("changelog-hero-actions")
    .getByRole("link", { name: "Book a clinic walkthrough" });
  await expectFirstViewportAction(page, mobileWalkthrough);
  await mobileWalkthrough.click();
  await expect(page).toHaveURL(/\/book-a-demo\/\?source=changelog$/);
  await expect(page.getByTestId("request-context")).toContainText(
    "Continuing from Product updates and rollout notes",
  );
});

test("evidence and security request journeys reflow without horizontal overflow at 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  const paths = [
    "/customers/",
    "/customers/dfi-synergy/",
    "/book-a-demo/?focus=run-the-day&source=dfi-synergy",
    "/contact/?intent=pilot&source=dfi-synergy#request",
    "/security/",
    "/status/",
    "/pricing/",
    "/contact/?intent=security&source=security&request=security-questionnaire#request",
  ];

  for (const path of paths) {
    await page.goto(path, { waitUntil: "networkidle" });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `horizontal overflow at 320px on ${path}`,
    ).toBe(true);

    if (path === "/security/") {
      await expectEarlyAction(
        page,
        page.getByTestId("security-trust-actions").getByRole("link", {
          name: "Request security review",
        }),
      );
    }
    if (path === "/status/") {
      await expectEarlyAction(
        page,
        page.getByTestId("status-trust-actions").getByRole("link", {
          name: "Request current confirmation",
        }),
      );
    }
  }
});

test("pricing carries one-clinic buyers into a structured pilot proposal", async ({ page }) => {
  let pilotPayload: Record<string, string> | undefined;
  await page.route("**/api/contact", async (route) => {
    pilotPayload = route.request().postDataJSON() as Record<string, string>;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, message: "Pilot request received." }),
    });
  });

  await page.goto("/pricing/", { waitUntil: "networkidle" });
  const proposalLinks = page.getByRole("link", { name: "Request a pilot proposal" });
  await expect(proposalLinks).toHaveCount(2);
  await expect(proposalLinks.first()).toHaveAttribute(
    "href",
    "/contact/?intent=pilot&source=pricing#request",
  );
  await expect(proposalLinks.last()).toHaveAttribute(
    "href",
    "/contact/?intent=pilot&source=pricing#request",
  );
  const proposalBox = await proposalLinks.first().boundingBox();
  expect(proposalBox?.height).toBeGreaterThanOrEqual(44);
  await expect(page.locator("main a[href^='mailto:'][href*='pilot']")).toHaveCount(0);
  await proposalLinks.first().click();

  await expect(page).toHaveURL(/\/contact\/\?intent=pilot&source=pricing#request$/);
  await expect(page.getByRole("tab", { name: "Pilot proposal" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  const pilotHeading = page.getByRole("heading", {
    name: "Tell us the clinic shape and first workflow.",
  });
  await expect(pilotHeading).toBeVisible();
  await expect(pilotHeading).toBeInViewport();
  await expect(page.getByText("single clinics", { exact: false })).toBeVisible();

  const pilotForm = page
    .getByRole("button", { name: "Request a pilot proposal", exact: true })
    .locator("xpath=ancestor::form");
  await pilotForm.getByLabel(/Your name/).fill("Demo Practice Manager");
  await pilotForm.getByLabel(/Email/).fill("practice.manager@example.invalid");
  await pilotForm.getByLabel(/Clinic \/ group name/).fill("Sample Dental Clinic");
  const locationCount = pilotForm.getByLabel(/Number of locations/);
  await expect(locationCount).toHaveAttribute("min", "1");
  await locationCount.fill("1");
  await pilotForm.getByLabel("How would you like to start?").selectOption("new-clinic");
  await pilotForm.getByLabel(/Current clinic system/).selectOption("Plato");
  const workflowGoal = pilotForm.getByLabel(/What should improve first/);
  await expect(workflowGoal.locator('option[value="patient-access"]')).toHaveText(
    "Patient access, intake, or portal",
  );
  await expect(workflowGoal.locator('option[value="organization-security"]')).toHaveText(
    "Organization access or security controls",
  );
  await workflowGoal.selectOption("run-the-day");
  await page.getByRole("button", { name: "Request a pilot proposal" }).click();

  await expect(page.getByRole("status")).toContainText("Pilot request received.");
  expect(pilotPayload).toEqual(
    expect.objectContaining({
      intent: "pilot",
      clinicName: "Sample Dental Clinic",
      numLocations: "1",
      startMode: "new-clinic",
      currentPms: "Plato",
      workflowGoal: "run-the-day",
    }),
  );
});

test("clinic-fit discovery carries both clinic shapes into the canonical pilot journey", async ({
  page,
}) => {
  await page.goto("/pricing/", { waitUntil: "networkidle" });

  const viewportWidth = page.viewportSize()?.width ?? 0;
  if (viewportWidth >= 1024) {
    await page.getByRole("button", { name: "Product", exact: true }).click();
    const productMenu = page.getByRole("region", { name: "Product" });
    await expect(productMenu).toBeVisible();
    await expect(productMenu.getByRole("link", { name: /For one clinic/ })).toHaveAttribute(
      "href",
      "/for-solo-clinics",
    );
    await expect(productMenu.getByRole("link", { name: /For clinic groups/ })).toHaveAttribute(
      "href",
      "/for-multi-clinic",
    );
    await page.keyboard.press("Escape");
    await expect(productMenu).toHaveCount(0);
    await page.mouse.move(0, page.viewportSize()?.height ?? 800);
  } else {
    await page.getByRole("button", { name: "Open menu" }).click();
    const drawer = page.getByRole("dialog", { name: "Site navigation" });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("link", { name: "For one clinic", exact: true })).toHaveAttribute(
      "href",
      "/for-solo-clinics",
    );
    await expect(
      drawer.getByRole("link", { name: "For clinic groups", exact: true }),
    ).toHaveAttribute("href", "/for-multi-clinic");
    await page.keyboard.press("Escape");
    await expect(drawer).toHaveCount(0);
  }

  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "For one clinic", exact: true })).toHaveAttribute(
    "href",
    "/for-solo-clinics",
  );
  await expect(
    footer.getByRole("link", { name: "For clinic groups", exact: true }),
  ).toHaveAttribute("href", "/for-multi-clinic");

  const chooser = page.getByTestId("clinic-fit-chooser");
  const choices = chooser.getByTestId("clinic-fit-choice");
  await expect(chooser).toBeVisible();
  await expect(choices).toHaveCount(2);
  const soloChoice = chooser.locator('a[href="/for-solo-clinics"]');
  const groupChoice = chooser.locator('a[href="/for-multi-clinic"]');
  await expect(soloChoice).toBeVisible();
  await expect(groupChoice).toBeVisible();

  const [soloChoiceBox, groupChoiceBox] = await Promise.all([
    soloChoice.boundingBox(),
    groupChoice.boundingBox(),
  ]);
  expect(soloChoiceBox).not.toBeNull();
  expect(groupChoiceBox).not.toBeNull();
  if (soloChoiceBox && groupChoiceBox) {
    const minimumChoiceHeight = viewportWidth >= 768 ? 190 : 170;
    expect(soloChoiceBox.height).toBeGreaterThanOrEqual(minimumChoiceHeight);
    expect(groupChoiceBox.height).toBeGreaterThanOrEqual(minimumChoiceHeight);
    expect(Math.abs(soloChoiceBox.width - groupChoiceBox.width)).toBeLessThanOrEqual(1);
  }
  await expectNoForbiddenClinicFitClaims(page);

  const audiencePages = [
    {
      path: "/for-solo-clinics/",
      source: "solo-clinic",
      crossLinkName: /See the clinic-group path/,
      crossLinkHref: "/for-multi-clinic",
    },
    {
      path: "/for-multi-clinic/",
      source: "clinic-group",
      crossLinkName: /See the one-clinic path/,
      crossLinkHref: "/for-solo-clinics",
    },
  ] as const;

  for (const audience of audiencePages) {
    await page.goto(audience.path, { waitUntil: "networkidle" });
    if (viewportWidth >= 1024) {
      await page.keyboard.press("Escape");
      await expect(page.locator("#product-mega")).toHaveCount(0);
    }
    await expectNoForbiddenClinicFitClaims(page);

    const actions = page.getByTestId("audience-hero-actions");
    const primary = actions.getByRole("link", { name: /Request a pilot proposal/ });
    const secondary = actions.getByRole("link", { name: /Request a 30-min walkthrough/ });
    await expect(primary).toHaveAttribute(
      "href",
      `/contact/?intent=pilot&source=${audience.source}#request`,
    );
    await expect(secondary).toHaveAttribute("href", `/book-a-demo/?source=${audience.source}`);
    await expectFirstViewportAction(page, primary);
    await expectFirstViewportAction(page, secondary);
    await expect(page.getByRole("link", { name: audience.crossLinkName })).toHaveAttribute(
      "href",
      audience.crossLinkHref,
    );

    await primary.click();
    await expect(page).toHaveURL(
      new RegExp(`/contact/\\?intent=pilot&source=${audience.source}#request$`),
    );
    await expect(page.getByRole("tab", { name: "Pilot proposal" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  }

  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of ["/pricing/", ...audiencePages.map(({ path }) => path)]) {
    await page.goto(path, { waitUntil: "networkidle" });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `horizontal overflow at 320px on ${path}`,
    ).toBe(true);
  }
});

test("workflow deep links keep the section heading below the sticky navigation", async ({
  page,
}) => {
  await page.goto("/workflows/#checkout-money", { waitUntil: "networkidle" });

  await expect(page.getByRole("navigation", { name: "Workflow sections" })).toBeVisible();
  const isCompact = (page.viewportSize()?.width ?? 1280) < 1280;
  if (isCompact) {
    await expect(page.getByTestId("workflow-section-select")).toHaveValue("checkout-money");
  }
  const heading = page.getByRole("heading", {
    name: "Build the checkout, record payment, and leave a receipt trail.",
  });
  await expect(heading).toBeInViewport();
  const box = await heading.boundingBox();
  expect(box?.y).toBeGreaterThan(100);
  const section = page.locator(isCompact ? "#checkout-money" : "#desktop-checkout-money");
  await expect(section.getByRole("link", { name: "Walk through this area" })).toHaveAttribute(
    "href",
    "/book-a-demo?focus=checkout-money",
  );
});

test("mobile workflow catalogue keeps one deep-linked area open and fully navigable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    const calls: string[] = [];
    (window as Window & { __workflowScrollBehaviors?: string[] }).__workflowScrollBehaviors = calls;
    Element.prototype.scrollIntoView = function scrollIntoView(
      options?: boolean | ScrollIntoViewOptions,
    ) {
      calls.push(typeof options === "object" ? (options.behavior ?? "auto") : "auto");
      return originalScrollIntoView.call(this, options);
    };
  });
  await page.goto("/workflows/#organization-security", { waitUntil: "networkidle" });

  const catalog = page.getByTestId("mobile-workflow-catalog");
  const select = page.getByTestId("workflow-section-select");
  await expect(catalog).toBeVisible();
  await expect(select).toHaveValue("organization-security");
  await expect(select.locator("option")).toHaveCount(7);
  const workflowPanels = catalog.locator("section[aria-labelledby^='mobile-workflow-button-']");
  await expect(workflowPanels).toHaveCount(7);
  await expect(
    catalog.locator("section[aria-labelledby^='mobile-workflow-button-'][hidden]"),
  ).toHaveCount(6);
  await expect(
    catalog.locator("section[aria-labelledby^='mobile-workflow-button-']:not([hidden])"),
  ).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      name: "Control clinic access and keep the audit trail reviewable.",
    }),
  ).toBeInViewport();

  const patientCare = catalog.getByRole("button", { name: /Patient care/ });
  await patientCare.focus();
  await page.keyboard.press("Enter");
  await expect(patientCare).toHaveAttribute("aria-expanded", "true");
  await expect(select).toHaveValue("patient-care");
  await expect(page).toHaveURL(/\/workflows\/#patient-care$/);
  await expect(workflowPanels).toHaveCount(7);
  await expect(
    catalog.locator("section[aria-labelledby^='mobile-workflow-button-'][hidden]"),
  ).toHaveCount(6);
  await expect(
    catalog.locator("section[aria-labelledby^='mobile-workflow-button-']:not([hidden])"),
  ).toHaveCount(1);

  await select.selectOption("checkout-money");
  await expect(page).toHaveURL(/\/workflows\/#checkout-money$/);
  await expect(
    page.getByRole("heading", {
      name: "Build the checkout, record payment, and leave a receipt trail.",
    }),
  ).toBeInViewport();
  await expect(page.getByRole("button", { name: "Previous workflow" })).toBeEnabled();
  await expect(page.getByRole("button", { name: "Next workflow" })).toBeEnabled();
  const scrollBehaviors = await page.evaluate(
    () =>
      (window as Window & { __workflowScrollBehaviors?: string[] }).__workflowScrollBehaviors ?? [],
  );
  expect(scrollBehaviors).toContain("auto");
  expect(scrollBehaviors).not.toContain("smooth");

  const mobileHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  expect(mobileHeight).toBeLessThan(8200);

  await page.setViewportSize({ width: 1280, height: 800 });
  const desktopPresentation = await page.evaluate(() => {
    const mobile = document.querySelector<HTMLElement>('[data-testid="mobile-workflow-catalog"]');
    const desktop = document.querySelector<HTMLElement>('[data-testid="desktop-workflow-catalog"]');
    return {
      desktopMatches: window.matchMedia("(min-width: 80rem)").matches,
      desktopVisible: desktop ? window.getComputedStyle(desktop).display !== "none" : false,
      mobileVisible: mobile ? window.getComputedStyle(mobile).display !== "none" : false,
    };
  });
  expect(desktopPresentation).toEqual({
    desktopMatches: true,
    desktopVisible: true,
    mobileVisible: false,
  });
  const desktopNavigation = page.getByRole("navigation", { name: "Workflow sections" });
  await expect(desktopNavigation.getByRole("link", { name: /Checkout and money/ })).toHaveAttribute(
    "aria-current",
    "location",
  );
  await expect(
    page.getByRole("heading", {
      name: "Build the checkout, record payment, and leave a receipt trail.",
    }),
  ).toBeInViewport();

  await desktopNavigation.getByRole("link", { name: /Insights/ }).click();
  await expect(page).toHaveURL(/\/workflows\/#insights$/);
  await page.setViewportSize({ width: 390, height: 844 });
  const mobilePresentation = await page.evaluate(() => {
    const mobile = document.querySelector<HTMLElement>('[data-testid="mobile-workflow-catalog"]');
    const desktop = document.querySelector<HTMLElement>('[data-testid="desktop-workflow-catalog"]');
    return {
      desktopMatches: window.matchMedia("(min-width: 80rem)").matches,
      desktopVisible: desktop ? window.getComputedStyle(desktop).display !== "none" : false,
      mobileVisible: mobile ? window.getComputedStyle(mobile).display !== "none" : false,
    };
  });
  expect(mobilePresentation).toEqual({
    desktopMatches: false,
    desktopVisible: false,
    mobileVisible: true,
  });
  await expect(select).toHaveValue("insights");
  await expect(catalog.getByRole("button", { name: /Insights/ })).toHaveAttribute(
    "aria-expanded",
    "true",
  );

  await page.setViewportSize({ width: 320, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/workflows/", { waitUntil: "networkidle" });
  await select.selectOption("insights");
  await expect(page).toHaveURL(/\/workflows\/#insights$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/workflows\/$/);
  await expect(select).toHaveValue("run-the-day");
  await expect(catalog.getByRole("button", { name: /Run the day/ })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(
    page.getByRole("heading", {
      name: "Move patients from arrival to checkout without losing the handoff.",
    }),
  ).toBeInViewport();
  await page.goForward();
  await expect(page).toHaveURL(/\/workflows\/#insights$/);
  await expect(select).toHaveValue("insights");
});

test("connections lead with standalone and keep Plato as an optional assessed path", async ({
  page,
}) => {
  await page.goto("/integrations/#plato", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Start with Oralstack. Connect only what your clinic needs.",
    }),
  ).toBeVisible();
  await expect(page.locator("main")).toContainText("The default path is a guided standalone pilot");
  await expect(page.getByRole("link", { name: "Plan a standalone rollout" })).toHaveAttribute(
    "href",
    "/switching",
  );
  await expect(
    page.getByRole("link", { name: "Review the optional Plato connection" }),
  ).toHaveAttribute("href", "#plato");

  const plato = page.locator("#plato");
  await expect(plato).toBeInViewport();
  await expect(
    plato.getByRole("heading", {
      name: "Keep Plato authoritative when your clinic needs it.",
    }),
  ).toBeVisible();
  await expect(plato).toContainText("Plato is an optional clinic-configured connection");
  await expect(plato.getByText("Available with clinic setup", { exact: true })).toBeVisible();
  const assessmentLinks = plato.getByRole("link", { name: "Request a connection assessment" });
  await expect(assessmentLinks).toHaveCount(2);
  await expect(assessmentLinks.first()).toHaveAttribute(
    "href",
    "/contact/?intent=migration&source=integrations#request",
  );
  await expect(page.locator("main a[href^='mailto:']")).toHaveCount(0);

  const externalCategory = page.locator("details").filter({ hasText: "Patient communication" });
  await expect(externalCategory).not.toHaveAttribute("open", "");
  const categorySummary = externalCategory.locator("summary");
  await categorySummary.focus();
  await categorySummary.press("Enter");
  await expect(externalCategory).toHaveAttribute("open", "");
  await expect(externalCategory.getByText("Meta WhatsApp Business Cloud API")).toBeVisible();
  const payerCategory = page.locator("details").filter({ hasText: "Payer workflows" });
  const externalBox = await externalCategory.boundingBox();
  const payerBox = await payerCategory.boundingBox();
  expect(payerBox?.height).toBeLessThan(externalBox?.height ?? 0);
  await categorySummary.press("Space");
  await expect(externalCategory).not.toHaveAttribute("open", "");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );

  await assessmentLinks.first().click();
  await expect(page).toHaveURL(/\/contact\/\?intent=migration&source=integrations#request$/);
  await expect(page.getByRole("tab", { name: "Switching & setup" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    page.getByRole("heading", { name: "Plan how your clinic starts with Oralstack." }),
  ).toBeVisible();
  await expect(
    page.locator("#contact-panel-migration").getByLabel(/What should improve first/),
  ).toBeVisible();
});

test("legacy migration intent, hash alias, and Plato anchor remain compatible", async ({
  page,
}) => {
  await page.goto("/integrations#plato", { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/integrations\/?#plato$/);
  await expect(page.locator("#plato")).toBeInViewport();

  await page.goto("/contact/?intent=migration#request", { waitUntil: "networkidle" });
  await expect(page.getByRole("tab", { name: "Switching & setup" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    page.getByRole("heading", { name: "Plan how your clinic starts with Oralstack." }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Request a setup assessment" })).toBeVisible();
  await expect(
    page.locator("#contact-panel-migration").getByLabel("How would you like to start?"),
  ).toHaveValue("");
  const requestSection = page.locator("#request");
  await expect(requestSection).toBeInViewport();
  const requestBox = await requestSection.boundingBox();
  expect(requestBox?.y).toBeGreaterThan(60);
  expect(requestBox?.y).toBeLessThan(240);

  await page.goto("/contact/#migration", { waitUntil: "networkidle" });
  await expect(page.getByRole("tab", { name: "Switching & setup" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("homepage turns named pilot evidence into the released conversion paths", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const evidence = page.locator("#customer-evidence");
  await expect(evidence).toHaveCount(1);
  await expect(
    evidence.getByRole("heading", { name: "What changed in four weeks at DFI Synergy." }),
  ).toBeVisible();
  await expect(
    evidence.getByText("Historical connected-pilot evidence", { exact: false }),
  ).toBeVisible();
  await expect(
    evidence.getByRole("link", { name: "Read the pilot and measurement notes" }),
  ).toHaveAttribute("href", "/customers/dfi-synergy");
  await expect(
    page.getByRole("heading", {
      name: "DFI Synergy moved their front desk into Oralstack in three days.",
    }),
  ).toHaveCount(0);

  const explorer = page.locator("#workflow-explorer");
  const evidenceBox = await evidence.boundingBox();
  const explorerBox = await explorer.boundingBox();
  const viewport = page.viewportSize();
  expect(evidenceBox?.y).toBeLessThan(explorerBox?.y ?? Number.POSITIVE_INFINITY);
  expect(evidenceBox?.y).toBeLessThan((viewport?.height ?? 800) * 2);

  const walkthroughLinks = page
    .locator("main")
    .getByRole("link", { name: "Book a clinic walkthrough" });
  await expect(walkthroughLinks).toHaveCount(2);
  await expect(walkthroughLinks.first()).toHaveAttribute("href", "/book-a-demo");
  await expect(walkthroughLinks.last()).toHaveAttribute("href", "/book-a-demo");
  const firstWalkthroughBox = await walkthroughLinks.first().boundingBox();
  expect(
    (firstWalkthroughBox?.y ?? Number.POSITIVE_INFINITY) + (firstWalkthroughBox?.height ?? 0),
  ).toBeLessThanOrEqual(viewport?.height ?? 800);

  const pilotProposal = page.getByRole("link", { name: "Request a standalone pilot" });
  await expect(pilotProposal).toHaveAttribute("href", "/contact/?intent=pilot#request");
  const pilotBox = await pilotProposal.boundingBox();
  expect(pilotBox?.height).toBeGreaterThanOrEqual(44);
  await expect(page.locator("main a[href^='mailto:'][href*='pilot']")).toHaveCount(0);

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/?proof=narrow", { waitUntil: "networkidle" });
  const narrowOverflow = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth - window.innerWidth,
    supportingMetrics: Array.from(
      document.querySelectorAll<HTMLElement>("[data-testid='supporting-metric']"),
    ).map((metric) => metric.scrollWidth - metric.clientWidth),
  }));
  expect(narrowOverflow.document).toBeLessThanOrEqual(0);
  expect(narrowOverflow.supportingMetrics.every((overflow) => overflow <= 0)).toBe(true);

  await pilotProposal.click();
  await expect(page).toHaveURL(/\/contact\/\?intent=pilot#request$/);
  await expect(page.getByRole("tab", { name: "Pilot proposal" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    page.getByRole("heading", { name: "Tell us the clinic shape and first workflow." }),
  ).toBeInViewport();
});

test("Plato connection has focused visual regression coverage", async ({ page }) => {
  await page.goto("/integrations/#plato", { waitUntil: "networkidle" });
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

  await expect(page.locator("#plato")).toHaveScreenshot("plato-connection.png", {
    animations: "disabled",
  });

  const patientCommunication = page.locator("details").filter({ hasText: "Patient communication" });
  await patientCommunication.locator("summary").click();
  await expect(patientCommunication).toHaveScreenshot("patient-communication-open.png", {
    animations: "disabled",
  });
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

  const explorerSelect = page.getByLabel("Choose a clinic workflow");
  if (await explorerSelect.isVisible()) {
    await explorerSelect.selectOption("checkout-money");
  } else {
    await page.getByRole("button", { name: "Checkout handoffs stall at the desk" }).click();
  }
  await expect(explorer).toHaveScreenshot("workflow-explorer-checkout.png", {
    animations: "disabled",
  });
});

test("mobile workflow selector has focused visual regression coverage", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/workflows/#checkout-money", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
  });

  await expect(page.getByRole("navigation", { name: "Workflow sections" })).toHaveScreenshot(
    "mobile-workflow-selector.png",
    { animations: "disabled" },
  );
});

test("homepage named pilot evidence has focused visual regression coverage", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
  });

  await expect(page.locator("#customer-evidence")).toHaveScreenshot("customer-evidence.png", {
    animations: "disabled",
  });
});

test("homepage starting paths have focused visual regression coverage", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      '*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; } header, a[href="#main-content"], body > [aria-hidden="true"] { display: none !important; }',
  });

  await expect(page.getByTestId("starting-paths")).toHaveScreenshot("homepage-starting-paths.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0.005,
  });
});

test("switching start paths have focused visual regression coverage", async ({ page }) => {
  await page.goto("/switching/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      '*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; } header, a[href="#main-content"], body > [aria-hidden="true"] { display: none !important; }',
  });

  const startPaths = page
    .getByRole("heading", {
      name: "Start with the clinic you have—not a generic migration promise.",
    })
    .locator("xpath=ancestor::section");
  await expect(startPaths).toHaveScreenshot("switching-start-paths.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0.005,
  });
});

const CLINIC_FIT_SNAPSHOT_REGIONS = [
  {
    path: "/pricing/",
    testId: "clinic-fit-chooser",
    snapshot: "pricing-clinic-fit-chooser.png",
  },
  {
    path: "/for-solo-clinics/",
    testId: "audience-hero-actions",
    snapshot: "solo-clinic-hero-actions.png",
  },
  {
    path: "/for-multi-clinic/",
    testId: "audience-hero-actions",
    snapshot: "multi-clinic-hero-actions.png",
  },
] as const;

for (const region of CLINIC_FIT_SNAPSHOT_REGIONS) {
  test(`${region.path} clinic-fit region has focused visual regression coverage`, async ({
    page,
  }) => {
    await page.goto(region.path, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content:
        "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
    });

    await expect(page.getByTestId(region.testId)).toHaveScreenshot(region.snapshot, {
      animations: "disabled",
    });
  });
}

const EVIDENCE_REQUEST_SNAPSHOT_REGIONS = [
  {
    path: "/customers/",
    testId: "customer-evidence-index",
    snapshot: "customer-evidence-index.png",
  },
  {
    path: "/customers/dfi-synergy/",
    testId: "case-study-early-actions",
    snapshot: "case-study-early-actions.png",
  },
  {
    path: "/contact/?intent=pilot&source=dfi-synergy#request",
    testId: "request-context",
    snapshot: "request-context.png",
  },
] as const;

for (const region of EVIDENCE_REQUEST_SNAPSHOT_REGIONS) {
  test(`${region.path} evidence-request region has focused visual regression coverage`, async ({
    page,
  }) => {
    await page.goto(region.path, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content:
        "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
    });

    await expect(page.getByTestId(region.testId)).toHaveScreenshot(region.snapshot, {
      animations: "disabled",
    });
  });
}

const TRUST_REVIEW_SNAPSHOT_REGIONS = [
  {
    path: "/security/",
    testId: "security-trust-actions",
    snapshot: "security-trust-actions.png",
  },
  {
    path: "/status/",
    testId: "status-trust-actions",
    snapshot: "status-trust-actions.png",
  },
] as const;

async function removeFixedPageChrome(page: Page) {
  await page
    .locator('body > a[href="#main-content"], body > header, body > [aria-hidden="true"]')
    .evaluateAll((elements) => {
      for (const element of elements) element.remove();
    });
}

test("about accountability has focused visual regression coverage", async ({ page }) => {
  const viewport = page.viewportSize();
  if (viewport) {
    await page.setViewportSize({ width: viewport.width, height: 2200 });
  }
  await page.goto("/about/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
  });
  await removeFixedPageChrome(page);

  await expect(page.getByTestId("about-engagement-model")).toHaveScreenshot(
    "about-accountability.png",
    {
      animations: "disabled",
      maxDiffPixelRatio: 0,
    },
  );
});

test("changelog release record has focused visual regression coverage", async ({ page }) => {
  const viewport = page.viewportSize();
  if (viewport) {
    await page.setViewportSize({ width: viewport.width, height: 2200 });
  }
  await page.goto("/changelog/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
  });
  await removeFixedPageChrome(page);

  await expect(page.getByTestId("changelog-release-record")).toHaveScreenshot(
    "changelog-release-record.png",
    {
      animations: "disabled",
      maxDiffPixelRatio: 0,
    },
  );
});

test("faq evaluation journey has focused visual regression coverage", async ({ page }) => {
  const viewport = page.viewportSize();
  if (viewport) {
    await page.setViewportSize({ width: viewport.width, height: 2200 });
  }
  await page.goto("/faq/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
  });
  await removeFixedPageChrome(page);

  await expect(page.getByTestId("faq-evaluation-journey")).toHaveScreenshot(
    "faq-evaluation-journey.png",
    {
      animations: "disabled",
      maxDiffPixelRatio: 0,
    },
  );
});

for (const region of TRUST_REVIEW_SNAPSHOT_REGIONS) {
  test(`${region.path} trust action region has focused visual regression coverage`, async ({
    page,
  }) => {
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 640) {
      await page.setViewportSize({ width: viewport.width, height: 2200 });
    }
    await page.goto(region.path, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content:
        "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
    });
    await removeFixedPageChrome(page);

    await expect(page.getByTestId(region.testId)).toHaveScreenshot(region.snapshot, {
      animations: "disabled",
      maxDiffPixelRatio: 0,
    });
  });
}

test("security review form has focused visual regression coverage", async ({ page }) => {
  const viewport = page.viewportSize();
  if (viewport && viewport.width < 640) {
    await page.setViewportSize({ width: viewport.width, height: 2200 });
  }
  await page.goto(
    "/contact/?intent=security&source=security&request=security-questionnaire#request",
    { waitUntil: "networkidle" },
  );
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
  });
  await removeFixedPageChrome(page);

  const reviewForm = page.locator("#contact-panel-security form");
  await expect(reviewForm.getByLabel("What do you need?")).toHaveValue("security-questionnaire");
  await expect(reviewForm).toHaveScreenshot("security-review-form.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0,
  });
});

test("source-aware demo form has focused visual regression coverage", async ({ page }) => {
  await page.goto("/book-a-demo/?focus=run-the-day&source=dfi-synergy", {
    waitUntil: "networkidle",
  });
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }",
  });

  const formCard = page.locator("main form").locator("..");
  await expect(formCard).toHaveScreenshot("source-aware-demo-form.png", {
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
  const drawer = page.getByRole("dialog", { name: "Site navigation" });
  await expect(drawer).toBeVisible();

  const closeButton = drawer.getByRole("button", { name: "Close menu" });
  const finalDrawerAction = drawer.getByRole("link", { name: "Book a clinic walkthrough" });
  await expect(closeButton).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(finalDrawerAction).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(drawer).toHaveCount(0);
  await expect(menuButton).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

// A smaller set of high-traffic routes get pixel-snapshot regression coverage.
// Adding new routes here is a deliberate decision — snapshots cost CI time and
// noise during routine content edits. Keep this list tight.
const SNAPSHOT_ROUTES = ["/", "/workflows/", "/integrations/", "/book-a-demo/", "/about/"];

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
