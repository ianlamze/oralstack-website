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

## What's not covered

- **Successful inbox delivery.** Required-field validation, workflow-to-demo context,
  Plato-to-assessment handoff, pricing-to-pilot payload mapping, and mobile navigation
  interactions are covered, but the Cloudflare contact endpoint and inbox delivery are not.
- **Cross-browser.** Mobile uses Chromium with an iPhone 13 viewport, not real
  WebKit. Adequate for a static site without Safari-specific JS; switch to
  webkit if a Safari-specific bug surfaces.
- **Functions.** The Cloudflare Pages Functions in [`functions/`](../functions/)
  are not exercised by the smoke suite.

## Counts

| | Desktop | Mobile | Total |
|---|---:|---:|---:|
| Public route loads (19 routes) | 19 | 19 | **38** |
| Synthetic-identity checks (3 routes) | 3 | 3 | **6** |
| Archived-route exclusions (51 routes) | 51 | 51 | **102** |
| Released-link crawl | 1 | 1 | **2** |
| Required-field form validation | 1 | 1 | **2** |
| Journey and interaction checks | 8 | 8 | **16** |
| Focused component snapshots | 3 | 3 | **6** |
| Full-page snapshot tests (5 routes) | 5 | 5 | **10** |
| **Total** | **91** | **91** | **182** |

20 baseline PNGs live in [`__snapshots__/smoke.spec.ts/`](__snapshots__/smoke.spec.ts/).

## Viewports

Both projects run Chromium. From [`playwright.config.ts`](../playwright.config.ts):

- `desktop` — 1280 × 800
- `mobile` — 390 × 844 with `isMobile`, `hasTouch`, `deviceScaleFactor: 3`

## Run locally

```bash
npm run build         # tests serve from out/
npm run test:smoke    # 182 tests across desktop + mobile
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

After adding a snapshot route, run `npm run test:smoke:update` once locally
to generate the baselines, then commit the PNGs.

## CI artifacts on failure

When the suite fails on CI, the workflow uploads:

- `playwright-report/` — HTML report with traces
- `tests/results/` — screenshot diffs and per-test attachments

Retention: 14 days. Download from the failed run's Summary page on GitHub
Actions.
