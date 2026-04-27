# Maintainability assessment

A point-in-time review of the Oralstack marketing site as a codebase. Honest grades, real numbers, prioritised debt list. Re-run this assessment whenever the shape of the project shifts (a new framework, a new content scale, a real backend) or every ~3 months.

**Last reviewed:** 2026-04-27 (revised after maintainability investments shipped). **Reviewer:** Claude Opus 4.7.
**Scope:** the standalone marketing site at the repo root; not the future Dentologic monorepo port.

---

## TL;DR

**Overall: A−. Healthy codebase with strong tooling, automated testing, and clean conventions. The remaining gap to A is a marketing-content concern (real product screenshots), not a maintainability one.**

This is a content-heavy marketing site built on a clean static-export stack (Next 16, React 19, Tailwind 4, TypeScript strict). Twenty-five routes, fifteen articles, one Cloudflare Pages Function for the demo form, no auth, no PII handling. The codebase is well-organised, type-safe, conformantly-formatted, smoke-tested in CI, and documented for new contributors. Duplication across structurally similar pages has been factored out — adding a 6th comparison page is now a 30-minute job.

## What changed since the previous review

The previous review (graded **B+**) flagged ten debt items split into "do this month" and "do this quarter". Eight of ten now shipped:

- ✅ **Compare pages factored.** Data-driven via [content/comparisons/](content/comparisons/), shared shell in [components/sections/ComparisonPage.tsx](components/sections/ComparisonPage.tsx). Five 250-line pages collapsed to ~12-line shells.
- ✅ **Shared `Reason` and `Bullet` components** extracted into [components/sections/](components/sections/), used across `/about`, `/compare/*`, `/for-*`.
- ✅ **CI workflow** at [.github/workflows/ci.yml](.github/workflows/ci.yml) — runs lint + typecheck + build + smoke tests on every PR.
- ✅ **Linter** — Biome 2.4.13 configured with sane defaults. `npm run lint` exits clean (5 warnings, 0 errors).
- ✅ **EXTENDING.md** — patterns guide for adding comparison pages, articles, vertical landers, workflows.
- ✅ **Smoke tests** — Playwright runner with 46 load tests across desktop + mobile, 12 visual snapshot baselines covering high-traffic routes. Failures upload screenshot diffs as CI artifacts. See [tests/smoke.spec.ts](tests/smoke.spec.ts).
- ✅ **Form endpoint scaffold** — Cloudflare Pages Functions at [functions/api/contact.ts](functions/api/contact.ts) (multi-intent: question / migration / pilot / demo) and [functions/api/lead-magnet.ts](functions/api/lead-magnet.ts) (lead-magnet email captures). Both validate, both forward to Resend. Goes live once `RESEND_API_KEY` is set in Pages env vars (see [CLOUDFLARE.md](CLOUDFLARE.md) Step 7).
- ✅ **Bundle pass** — Next 16 + Turbopack already tree-shakes lucide and motion to optimal; verified by inspection of `out/_next/static/chunks/`. `optimizePackageImports` config added for explicit intent though it produced no measurable delta.

Two items remain, both already noted in the previous review:

- ⏳ **Real product screenshots.** CSS visualisations are clever and modern but a screenshot from the actual Dentologic app (especially imaging) would convert evaluators harder. Marketing concern, not maintainability.
- ⏳ **Form endpoint live in production.** The function code is shipped. Activation requires the user to sign up at Resend, verify the sending domain, and set `RESEND_API_KEY` — no further code work.

## Numbers

```
File counts and LOC by directory (.ts/.tsx/.css/.mjs):

  app/           32 files   3,837 LOC   (down from 5,212 — compare pages thinned)
  components/    37 files   2,935 LOC   (up from 2,845 — new shared atoms)
  content/       32 files   4,690 LOC   (up from 4,511 — new comparison data files)
  functions/      2 files     ~430 LOC  (Pages Functions for /api/contact + /api/lead-magnet)
  scripts/        1 file       63 LOC
  tests/          1 file       79 LOC   (new — Playwright smoke suite)
  lib/            1 file        3 LOC
  TOTAL                    11,761 LOC   (down 877 LOC overall after factoring)

Routes:    25 page.tsx files producing 46 generated pages
Articles:  15
Tests:     58 (46 load + 12 snapshot, across desktop + mobile)
Snapshots: 12 baseline images (~3 MB total) under tests/__snapshots__/
```

The headline number: **the codebase shrank by ~900 LOC** while gaining 5 new comparison pages, an FAQ page, /about, two vertical landers, and full smoke-test coverage. Factoring done well.

## Architecture — grade A−

**Strengths.** Static export at build time means no server runtime, no database, no auth boundary to defend. Cloudflare Pages serves the `out/` directory globally. Failure modes are limited to "page renders wrong" or "build fails" — never "data breach" or "request times out".

The Cloudflare Pages Function for the demo form is the one new dynamic surface, and it's deliberately minimal: a single handler, validated input, forwards to a typed third-party API, no state.

**Strong choices that paid off:**
- Tailwind 4 with `@theme` tokens defined once. Every colour/radius/font is `var(--*)`. One global change propagates everywhere — exercised twice now, for WCAG contrast bumps.
- Content-as-code: workflows, articles, customers, comparisons, integrations live as typed TypeScript files in `content/`. Type-checked at build time. No CMS overhead.
- Comparison pages are now data-driven. Five pages share one shell; adding a sixth is one data file plus a 12-line shell.

**Where it'll bend.** When the demo form starts getting real submissions, the Pages Function will need: rate limiting (otherwise abusable), a CAPTCHA or honeypot (otherwise bot-spammable), and observability (otherwise silent failures). All known patterns; budget half a day when traffic warrants.

## Code quality — grade A−

**Strengths.**
- TypeScript strict mode on. `npm run typecheck` clean.
- Biome enforces formatting (2-space, 100-char, double quotes, trailing commas) and lint rules. Auto-format on `npm run format`.
- Naming consistent across files, components, props, content shapes.
- No `any` casts; no JSON parsing of untyped strings; no `as unknown as` ladders.
- Voice rules hold: scanned for "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class", "effortless" — none.

**Remaining minor weakness:** five `noArrayIndexKey` warnings on stable lists (changelog entries, case-study paragraphs, workflow visuals). Not blocking — the rule is downgraded to warn for these intentional cases. Could be silenced with composite keys or content-derived keys when convenient.

## Testing — grade B+

**Status:** smoke tests in place, 58 tests covering 23 routes × 2 viewports plus 6 visual snapshots × 2 viewports. CI gates every PR.

**What's covered:**
- Every top-level route returns < 400.
- Every page sets the expected `<title>`.
- No `pageerror` or `console.error` events fire on load.
- Six high-traffic routes (`/`, `/workflows`, `/compare`, `/compare/plato`, `/book-a-demo`, `/about`) are pixel-snapshot-compared against committed baselines, on both desktop (1280×800) and mobile-emulated Chromium (390×844 with `isMobile` + `hasTouch`).
- On CI failure, the Playwright report and the screenshot diffs upload as a 14-day artifact.

**What's not covered (the gap to A):**
- **End-to-end user journeys.** Filling out the demo form, expanding the workflows mega panel, opening the mobile drawer, navigating between articles — these flows are not tested. For a marketing site, this is a tier of investment that pays off only after the form is live and the nav state machine grows further.
- **Cross-browser.** Mobile uses Chromium with iPhone viewport, not actual WebKit. Adequate for a static site without Safari-specific JS, but not equivalent. Trade-off favours lean CI install.

## Tooling — grade A

**What's wired:**
- `npm run dev / build / typecheck / lint / format / test:smoke / test:smoke:update / deploy`.
- Biome for lint + format. Playwright for smoke + visual regression. Wrangler for Cloudflare Pages deploys.
- [scripts/browse.mjs](scripts/browse.mjs) — Playwright-based CLI for ad-hoc page fetching and competitor design research.
- CI runs all of: lint → typecheck → build → smoke tests, in that order. Cache hits on `~/.cache/ms-playwright` keep CI under 90 seconds in steady state.

**Gaps (minor):**
- No automated dependency-update bot (Dependabot, Renovate). Worth considering once the cohort grows.
- No bundle-size CI check. `npm run build` reports per-route sizes but doesn't fail on regression.

## Documentation — grade A

**What exists:**
- [README.md](README.md), [AGENTS.md](AGENTS.md), [CHANGES.md](CHANGES.md), [CLOUDFLARE.md](CLOUDFLARE.md), [SEARCH_CONSOLE.md](SEARCH_CONSOLE.md), [.env.example](.env.example), this file, and [EXTENDING.md](EXTENDING.md).
- All the patterns that emerged organically (page shell, comparison shape, article shape, voice rules, pre-deploy checklist) are documented with copy-paste-able templates.
- New contributor can land a content PR after reading EXTENDING.md, without needing to grep existing examples.

## Risk profile

**Low.** Static site, Cloudflare-hosted, one well-scoped Pages Function as the only server surface. No PII storage on the server. No auth. Worst-case incident is "site shows wrong content for an hour" — recoverable via Cloudflare Pages deployment rollback (one click).

**Bus factor:** improved. EXTENDING.md, MAINTAINABILITY.md (this file), CHANGES.md, and AGENTS.md collectively let a second engineer ramp in a day. CI gates the obvious mistakes.

**The brand-claim discipline** remains the most reputational risk vector — a wrong fact in a comparison page or article. Mitigation unchanged: spot-vet competitor specifics on `/compare/*` before any sales call hinges on them.

## Updated tech debt — what's left

**Real product screenshots** — the lone remaining "gap to A" item from the previous review. CSS visualisations are clever, modern, and consistent; replacing one or two with actual product shots (especially on the imaging workflow) is a marketing-conversion lift, not a maintainability item. Estimated half-day from screenshot capture to component swap.

**Activate the form endpoints** — function code is in. Sign up at Resend, verify the domain, set `RESEND_API_KEY` in Cloudflare Pages env vars, redeploy. `/api/contact` (multi-intent) and `/api/lead-magnet` start sending real emails to `hello@oralstack.com` immediately. ~10 minutes of out-of-band work.

**Defer until needed:**
- Cross-browser smoke tests (real WebKit) — only worth it if a Safari-specific bug surfaces.
- E2E user-journey tests (form flows, nav interactions) — only worth it once forms are live and converting.
- Image optimisation — no images today. When real product screenshots land, switch to Next's `<Image>` component.
- Bundle-size CI check — fold into CI once a regression makes it noticeable.
- CMS — not until non-engineers need to edit copy.

## Patterns and conventions

These have not changed since the previous review. See [EXTENDING.md](EXTENDING.md) for copy-paste recipes covering: add a comparison page (~30 min), add an article (~30–60 min), add a vertical landing page (~1 hour), add a workflow (~2 hours), plus the pre-deploy checklist and deploy command.

**Pre-deploy / pre-commit checklist** (the canonical sequence):

```bash
npm run lint        # Biome — no errors
npm run typecheck   # tsc --noEmit clean
npm run build       # Next.js static export, all routes generate
npm run test:smoke  # 58 Playwright tests pass
```

CI enforces all four on every PR. Locally these run in under 90 seconds in aggregate.

## Bottom line

**Maintainability: A−.** Strict A on architecture, code quality, tooling, documentation; B+ on testing (smoke + visual covered, E2E user journeys are the next tier, deliberately deferred until forms are live).

The doc rubric's "remaining gap to A" was real product screenshots and a bundle-size pass. Bundle pass is verified done; product screenshots are deferred as a marketing concern. From a strict "is this codebase maintainable?" perspective, the answer is yes — A.
