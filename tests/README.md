# Tests

Playwright smoke + visual snapshots. The only test layer in this repo, by design.
CI gates every PR ([.github/workflows/ci.yml](../.github/workflows/ci.yml)).

## What's covered

For every route in [`smoke.spec.ts`](smoke.spec.ts):

- HTTP response < 400
- Document `<title>` matches the expected pattern
- No `pageerror` events fire on load
- No `console.error` events fire on load

For a tighter list of high-traffic routes (`/`, `/workflows/`, `/integrations/`,
`/book-a-demo/`, `/about/`):

- Full-page pixel snapshot vs committed baseline (animations disabled)
- `maxDiffPixelRatio: 0.02`, `threshold: 0.2` (see [`playwright.config.ts`](../playwright.config.ts))

The standalone-first release also verifies that:

- The default title, hero, navigation, footer, and demo CTA do not position Plato as a prerequisite.
- The homepage links to three starting paths, while `/switching/` distinguishes new-clinic,
  paper/spreadsheet, existing-PMS, and optional-connection paths without 320 px overflow.
- Switching links preserve their allowlisted source and clinic starting point into the contact form.
- Default demo and pilot forms do not preselect Plato; submitted starting points are mapped to
  human-readable provider-email labels, invalid values are rejected, and legacy requests without a
  starting point remain accepted.
- Legacy `?intent=migration`, `#migration`, and `/integrations#plato` links remain compatible.
- Integrations lead with standalone rollout, while status and pricing keep native setup, migration,
  and optional connector boundaries distinct.
- About replaces placeholder team copy with a three-step accountability model and preserves its
  source through the walkthrough and pilot-request handoffs.
- Changelog keeps current public and source-reviewed notes date-ordered, closes historical
  prototypes in a keyboard-operable archive, and preserves its source into the walkthrough.
- FAQ starts with four clinic decisions, keeps the standalone answer visible, exposes 19 more
  answers through keyboard-operable disclosures, and preserves its source and exploratory start
  mode into the walkthrough.

## What's not covered

- **Successful inbox delivery.** Required-field validation, workflow-to-demo context,
  evidence-to-request context, switching-to-assessment and optional-Plato handoffs,
  pricing-to-pilot payload mapping,
  security/status/pricing procurement routing, shared request privacy notices, duplicate-submit
  prevention, accessible form feedback, four-tab contact drafts/history/keyboard behavior, and
  mobile navigation interactions are covered. The Cloudflare contact handler is also exercised
  in-process for security-review validation, allowlist boundaries, source mapping, and provider
  payload formatting, but Resend acceptance and inbox delivery are mocked rather than performed.
- **Configured Cal.com network behavior in default CI.** The suite proves that the first-party
  fallback does not contact Cal.com. When the scheduler variables are present in the build, the same
  adaptive test also proves that the iframe stays absent until explicit activation and that the
  allowlisted source/workflow context is preserved.
- **Cross-browser.** Mobile uses Chromium with an iPhone 13 viewport, not real
  WebKit. Adequate for a static site without Safari-specific JS; switch to
  webkit if a Safari-specific bug surfaces.
- **Cloudflare runtime integration.** The contact handler contract runs in Node with a mocked Resend
  request; the suite does not reproduce Cloudflare's production runtime or make provider network
  calls.

## Counts

| | Desktop | Mobile | Total |
|---|---:|---:|---:|
| Public route loads (20 routes) | 20 | 20 | **40** |
| Synthetic-identity checks (3 routes) | 3 | 3 | **6** |
| Archived-route exclusions (51 routes) | 51 | 51 | **102** |
| Released-link crawl | 1 | 1 | **2** |
| Required-field form validation | 1 | 1 | **2** |
| Journey and interaction checks | 30 | 30 | **60** |
| Focused component snapshots | 19 | 19 | **38** |
| Full-page snapshot tests (5 routes) | 5 | 5 | **10** |
| **Total** | **130** | **130** | **260** |

The complete suite expects 52 baseline PNGs in
[`__snapshots__/smoke.spec.ts/`](__snapshots__/smoke.spec.ts/). Generate new baselines on Linux so
the committed images match CI rendering. The security trust actions, status trust actions, and
security review form account for six desktop/mobile baselines. The standalone-first suite adds four
new expected baselines—`homepage-starting-paths-{desktop,mobile}.png` and
`switching-start-paths-{desktop,mobile}.png`—on top of the previous 42; this repository update does
not generate those PNGs locally. The About accountability update adds
`about-accountability-{desktop,mobile}.png`; its existing full-page baselines must also be reviewed
after they are regenerated in the authoritative Linux snapshot workflow. The Changelog release
record adds `changelog-release-record-{desktop,mobile}.png`; this repository update does not
generate those PNGs locally. The FAQ evaluation journey adds
`faq-evaluation-journey-{desktop,mobile}.png`; this repository update does not generate those PNGs
locally.

## Viewports

Both projects run Chromium. From [`playwright.config.ts`](../playwright.config.ts):

- `desktop` — 1280 × 800
- `mobile` — 390 × 844 with `isMobile`, `hasTouch`, `deviceScaleFactor: 3`

## Run locally

```bash
npm run build         # tests serve from out/
npm run test:smoke    # 260 tests across desktop + mobile
```

The Playwright config spins up `npx serve out -p 3000` automatically when
`BASE_URL` isn't set. Run against a deployed URL with
`BASE_URL=https://oralstack.com npm run test:smoke`.

## Update snapshots

```bash
npm run test:smoke:update
```

**Only run this when an intentional UI change has landed.** A snapshot failure
in CI is a signal, not noise — read the diff before regenerating. Acceptable
reasons:

- You shipped a visual change (new section, restyled component, brand-token bump).
- A baseline drifted on a deliberate font/spacing/colour update.

Not acceptable reasons:

- Test failed and you want green CI.
- Local rendering looks "close enough".

Commit the regenerated PNGs in the same PR as the visual change.

## Add a new route to the smoke suite

Most new routes only need a load-test entry. Add to `ROUTES` in
[`smoke.spec.ts`](smoke.spec.ts):

```ts
const ROUTES = [
  // ...existing entries
  { path: "/your-new-route/", title: /Your title pattern/ },
];
```

Add to `SNAPSHOT_ROUTES` only if the route is a high-traffic landing page
(homepage tier or demo CTA). Snapshots cost CI time and
generate noise on routine content edits — keep the list tight.

```ts
const SNAPSHOT_ROUTES = [
  // ...existing entries
  "/your-new-route/",
];
```

After adding a snapshot route, run `npm run test:smoke:update` in the Linux snapshot workflow to
generate the baselines, then commit the PNGs.

## CI artifacts on failure

When the suite fails on CI, the workflow uploads:

- `playwright-report/` — HTML report with traces
- `tests/results/` — screenshot diffs and per-test attachments

Retention: 14 days. Download from the failed run's Summary page on GitHub
Actions.
