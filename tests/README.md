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
  evidence-to-request context, Plato-to-assessment handoff, pricing-to-pilot payload mapping,
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
| Public route loads (19 routes) | 19 | 19 | **38** |
| Synthetic-identity checks (3 routes) | 3 | 3 | **6** |
| Archived-route exclusions (51 routes) | 51 | 51 | **102** |
| Released-link crawl | 1 | 1 | **2** |
| Required-field form validation | 1 | 1 | **2** |
| Journey and interaction checks | 23 | 23 | **46** |
| Focused component snapshots | 14 | 14 | **28** |
| Full-page snapshot tests (5 routes) | 5 | 5 | **10** |
| **Total** | **117** | **117** | **234** |

The complete suite expects 42 baseline PNGs in
[`__snapshots__/smoke.spec.ts/`](__snapshots__/smoke.spec.ts/). Generate new baselines on Linux so
the committed images match CI rendering. The security trust actions, status trust actions, and
security review form account for six desktop/mobile baselines.

## Viewports

Both projects run Chromium. From [`playwright.config.ts`](../playwright.config.ts):

- `desktop` — 1280 × 800
- `mobile` — 390 × 844 with `isMobile`, `hasTouch`, `deviceScaleFactor: 3`

## Run locally

```bash
npm run build         # tests serve from out/
npm run test:smoke    # 234 tests across desktop + mobile
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
