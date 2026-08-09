import { expect, test, type Locator, type Page } from "@playwright/test";

const ROUTES = [
  { path: "/", title: /Oralstack/ },
  { path: "/workflows/", title: /Dental clinic workflows/i },
  { path: "/customers/", title: /Customers/ },
  { path: "/customers/dfi-synergy/", title: /DFI Synergy/ },
  { path: "/pricing/", title: /Pricing/ },
  { path: "/integrations/", title: /Plato connection and integrations/i },
  { path: "/tools/", title: /Product feature guide/i },
  { path: "/for-solo-clinics/", title: /one dental clinic|one clinic/i },
  { path: "/for-multi-clinic/", title: /clinic groups/i },
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

async function expectNoForbiddenClinicFitClaims(page: Page) {
  const body = (await page.locator("body").innerText()).toLocaleLowerCase();
  for (const claim of FORBIDDEN_CLINIC_FIT_CLAIMS) {
    expect(body, `forbidden clinic-fit claim: ${claim}`).not.toContain(claim.toLocaleLowerCase());
  }
}

async function fillEvidencePilotProposal(page: Page, suffix: string) {
  await page.getByLabel(/Your name/).fill(`Demo Practice Manager ${suffix}`);
  await page.getByLabel(/Email/).fill(`practice.manager.${suffix}@example.invalid`);
  await page.getByLabel(/Clinic \/ group name/).fill(`Synthetic Dental Clinic ${suffix}`);
  await page.getByLabel(/Number of locations/).fill("1");
  await page.getByLabel(/Current clinic system/).selectOption("Plato");
  await expect(page.getByLabel(/What should improve first/)).toHaveValue("run-the-day");
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
    "Historical customer story · April 2026 pilot · Singapore",
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
  await expect(demoContext).toContainText("Continuing from DFI Synergy · April 2026 pilot");
  await expect(demoContext).toContainText("historical and clinic-specific");
  await expect(page.getByLabel("Start the walkthrough with")).toHaveValue("run-the-day");
  await expect(page.locator("form [required]").first()).toHaveAccessibleName(/Clinic name/);
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
  await expect(pilotContext).toContainText("Continuing from DFI Synergy · April 2026 pilot");
  await expect(pilotContext).toContainText("historical and clinic-specific");
  await expect(page.getByLabel(/What should improve first/)).toHaveValue("run-the-day");
});

test("contact tabs keep keyboard focus visible and below the sticky navigation", async ({
  page,
}) => {
  await page.goto("/contact/?intent=pilot&source=dfi-synergy#request", {
    waitUntil: "networkidle",
  });

  const questionTab = page.getByRole("tab", { name: "Quick question" });
  const migrationTab = page.getByRole("tab", { name: "Connection & rollout" });
  const pilotTab = page.getByRole("tab", { name: "Pilot proposal" });
  await pilotTab.focus();
  await pilotTab.press("ArrowLeft");
  await expect(migrationTab).toBeFocused();
  await expect(migrationTab).toHaveAttribute("aria-selected", "true");
  await migrationTab.press("Home");
  await expect(questionTab).toBeFocused();
  await expect(questionTab).toHaveAttribute("aria-selected", "true");
  await questionTab.press("End");
  await expect(pilotTab).toBeFocused();
  await expect(pilotTab).toHaveAttribute("aria-selected", "true");

  await pilotTab.press("Tab");
  const panel = page.getByRole("tabpanel", { name: "Pilot proposal" });
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
  await page.goto("/contact/?intent=pilot&source=dfi-synergy#request", {
    waitUntil: "networkidle",
  });
  await fillEvidencePilotProposal(page, "preserved");
  await page.getByRole("button", { name: "Request a pilot proposal" }).click();

  const alert = page.locator("form").getByRole("alert");
  await expect(alert).toBeFocused();
  await expect(alert).toContainText("Request service unavailable for this test.");
  await expect(
    alert.getByRole("link", { name: "Email hello@oralstack.com instead" }),
  ).toHaveAttribute("href", "mailto:hello@oralstack.com");
  await expect(page.getByLabel(/Your name/)).toHaveValue("Demo Practice Manager preserved");
  await expect(page.getByLabel(/Email/)).toHaveValue("practice.manager.preserved@example.invalid");
  await expect(page.getByLabel(/Clinic \/ group name/)).toHaveValue(
    "Synthetic Dental Clinic preserved",
  );
  await expect(page.getByLabel(/Number of locations/)).toHaveValue("1");
  await expect(page.getByLabel(/Current clinic system/)).toHaveValue("Plato");
  await expect(page.getByLabel(/What should improve first/)).toHaveValue("run-the-day");
});

test("evidence request journey reflows without horizontal overflow at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  const paths = [
    "/customers/",
    "/customers/dfi-synergy/",
    "/book-a-demo/?focus=run-the-day&source=dfi-synergy",
    "/contact/?intent=pilot&source=dfi-synergy#request",
  ];

  for (const path of paths) {
    await page.goto(path, { waitUntil: "networkidle" });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      `horizontal overflow at 320px on ${path}`,
    ).toBe(true);
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
  await expect(proposalLinks.first()).toHaveAttribute("href", "/contact/?intent=pilot#request");
  await expect(proposalLinks.last()).toHaveAttribute("href", "/contact/?intent=pilot#request");
  const proposalBox = await proposalLinks.first().boundingBox();
  expect(proposalBox?.height).toBeGreaterThanOrEqual(44);
  await expect(page.locator("main a[href^='mailto:'][href*='pilot']")).toHaveCount(0);
  await proposalLinks.first().click();

  await expect(page).toHaveURL(/\/contact\/\?intent=pilot#request$/);
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

  await page.getByLabel(/Your name/).fill("Demo Practice Manager");
  await page.getByLabel(/Email/).fill("practice.manager@example.invalid");
  await page.getByLabel(/Clinic \/ group name/).fill("Sample Dental Clinic");
  const locationCount = page.getByLabel(/Number of locations/);
  await expect(locationCount).toHaveAttribute("min", "1");
  await locationCount.fill("1");
  await page.getByLabel(/Current clinic system/).selectOption("Plato");
  const workflowGoal = page.getByLabel(/What should improve first/);
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
      crossLinkName: /See the clinic-group path/,
      crossLinkHref: "/for-multi-clinic",
    },
    {
      path: "/for-multi-clinic/",
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
    await expect(primary).toHaveAttribute("href", "/contact/?intent=pilot#request");
    await expect(secondary).toHaveAttribute("href", "/book-a-demo");
    await expectFirstViewportAction(page, primary);
    await expectFirstViewportAction(page, secondary);
    await expect(page.getByRole("link", { name: audience.crossLinkName })).toHaveAttribute(
      "href",
      audience.crossLinkHref,
    );

    await primary.click();
    await expect(page).toHaveURL(/\/contact\/\?intent=pilot#request$/);
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

test("Plato connection explains ownership and leads into a structured assessment", async ({
  page,
}) => {
  await page.goto("/integrations/#plato", { waitUntil: "networkidle" });

  const plato = page.locator("#plato");
  await expect(plato).toBeInViewport();
  await expect(
    plato.getByRole("heading", {
      name: "Plato stays authoritative. Oralstack makes the work around it visible.",
    }),
  ).toBeVisible();
  await expect(
    plato.getByText("Plato remains the system of record", { exact: false }),
  ).toBeVisible();
  await expect(plato.getByText("Available with clinic setup", { exact: true })).toBeVisible();
  const assessmentLinks = plato.getByRole("link", { name: "Request a connection assessment" });
  await expect(assessmentLinks).toHaveCount(2);
  await expect(assessmentLinks.first()).toHaveAttribute(
    "href",
    "/contact/?intent=migration#request",
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
  await expect(page).toHaveURL(/\/contact\/\?intent=migration#request$/);
  await expect(page.getByRole("tab", { name: "Connection & rollout" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    page.getByRole("heading", { name: "Connect Plato or plan a reviewed rollout." }),
  ).toBeVisible();
  await expect(page.getByLabel(/What should improve first/)).toBeVisible();
});

test("homepage Plato proof keeps the connection path and assessment intent", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const platoProof = page.getByRole("link", { name: "Plato stays the system of record" });
  await expect(platoProof).toHaveAttribute("href", "/integrations#plato");
  await platoProof.click();
  await expect(page).toHaveURL(/\/integrations\/?#plato$/);
  await expect(page.locator("#plato")).toBeInViewport();

  await page.goto("/contact/?intent=migration#request", { waitUntil: "networkidle" });
  await expect(page.getByRole("tab", { name: "Connection & rollout" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    page.getByRole("heading", { name: "Connect Plato or plan a reviewed rollout." }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Request connection assessment" })).toBeVisible();
  const requestSection = page.locator("#request");
  await expect(requestSection).toBeInViewport();
  const requestBox = await requestSection.boundingBox();
  expect(requestBox?.y).toBeGreaterThan(60);
  expect(requestBox?.y).toBeLessThan(240);

  await page.goto("/contact/#migration", { waitUntil: "networkidle" });
  await expect(page.getByRole("tab", { name: "Connection & rollout" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  await page.goto("/status/", { waitUntil: "domcontentloaded" });
  const platoStatus = page.locator("li").filter({ hasText: "Plato-connected workflow path" });
  await expect(platoStatus.getByText("Available with clinic setup", { exact: true })).toBeVisible();
});

test("homepage turns named pilot evidence into the released conversion paths", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const evidence = page.locator("#customer-evidence");
  await expect(evidence).toHaveCount(1);
  await expect(
    evidence.getByRole("heading", { name: "What changed in four weeks at DFI Synergy." }),
  ).toBeVisible();
  await expect(evidence.getByText("historical results", { exact: false })).toBeVisible();
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
    .getByRole("link", { name: "Request a 30-min walkthrough" });
  await expect(walkthroughLinks).toHaveCount(2);
  await expect(walkthroughLinks.first()).toHaveAttribute("href", "/book-a-demo");
  await expect(walkthroughLinks.last()).toHaveAttribute("href", "/book-a-demo");
  const firstWalkthroughBox = await walkthroughLinks.first().boundingBox();
  expect(
    (firstWalkthroughBox?.y ?? Number.POSITIVE_INFINITY) + (firstWalkthroughBox?.height ?? 0),
  ).toBeLessThanOrEqual(viewport?.height ?? 800);

  const pilotProposal = page.getByRole("link", { name: "Request a pilot proposal" });
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

  await page.getByRole("button", { name: "Checkout handoffs stall at the desk" }).click();
  await expect(explorer).toHaveScreenshot("workflow-explorer-checkout.png", {
    animations: "disabled",
  });
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
  const finalDrawerAction = drawer.getByRole("link", { name: "Request a 30-min walkthrough" });
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
