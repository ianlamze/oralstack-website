# Maintainability assessment

A point-in-time review of the Oralstack marketing site as a codebase. Honest grades, real numbers, prioritised debt list. Re-run this assessment whenever the shape of the project shifts (a new framework, a new content scale, a real backend) or every ~3 months.

**Last reviewed:** 2026-04-27. **Reviewer:** Claude Opus 4.7. **Scope:** the standalone marketing site at the repo root; not the future Dentologic monorepo port.

---

## TL;DR

**Overall: B+. Highly maintainable for current scale; will need three small investments before it scales another 2×.**

This is a content-heavy marketing site built on a clean static-export stack (Next 16, React 19, Tailwind 4, TypeScript strict). Twenty-five routes, fifteen articles, no backend, no auth, no PII handling. The codebase is well-organised, type-safe, and consistent in its conventions. The biggest open issues are duplication across structurally similar pages (five comparison pages, two vertical landing pages), zero CI, and zero tests — all defensible today, all worth fixing before the site doubles.

## Numbers

```
File counts and LOC by directory (.ts/.tsx/.css/.mjs):

  app/           32 files   5,212 LOC
  components/    33 files   2,845 LOC
  content/       25 files   4,511 LOC
  lib/            1 file        5 LOC
  scripts/        1 file       65 LOC
  TOTAL                    12,638 LOC

Routes:    25 page.tsx files producing 46 generated pages
Articles:  15 (3 just added; clusters: front-desk, billing, clinical, migration, compliance)
Bundles:   one ~70 KB JS chunk (motion + lucide), one ~50 KB chunk (page code)
```

Hot spots (largest source files):

| File | Lines | Notes |
|---|---|---|
| `app/dev/deck/page.tsx` | 621 | Internal dev tool. Not user-facing. Acceptable. |
| `components/sections/Nav.tsx` | 470 | Mega panel + mobile drawer. Approaching split threshold. |
| `app/faq/page.tsx` | 354 | Content-heavy. Q&A entries are data. Acceptable. |
| `content/articles/*.tsx` | 270–321 | Prose articles. Each is its own data file. Acceptable. |

## Architecture — grade A−

**Strengths.** Static export at build time means no server runtime, no database, no auth boundary to defend. Cloudflare Pages serves the `out/` directory globally. There is exactly one place where dynamic content enters the build (`NEXT_PUBLIC_*` env vars, baked at compile time). Failure modes are limited to "page renders wrong" or "build fails" — never "data breach" or "request times out", because there is no server.

**Choices that are paying off:**
- Tailwind 4 with `@theme` tokens defined once in `app/globals.css`. Every colour, radius, font is referenced through CSS custom properties. One global change (e.g. darkening `--color-ink-soft` for WCAG AA) propagates to every component.
- Content-as-code: workflows, articles, customers, integrations all live as typed TypeScript files in `content/`. No CMS overhead; type-checked at build time.
- Path alias `@/*` keeps imports stable as the tree grows.

**Where it'll bend.** Static export caps interactivity. The demo form is the canary — currently mailto-fallback with optional Formspree-style endpoint. A real form-to-CRM pipeline will eventually need either Cloudflare Pages Functions (which keeps everything on Cloudflare) or a third-party endpoint (Formspree, Web3Forms). When that lands, the architecture grows one new surface with its own threat model. Plan it; don't accidentally fall into it.

## Code quality — grade B+

**Strengths.**
- TypeScript strict mode is on. `npm run typecheck` is clean.
- Naming is consistent: file naming, component naming, prop naming. The `eyebrow / title / body` triplet appears identically across every reason-style block.
- No `any` casts; no `as unknown as` ladders; no JSON parsing of untyped strings.
- Components are short and single-purpose. Section, PageHeader, MarkBullet, Wordmark, etc. — each is one job, ≤60 lines.
- Brand-rule discipline holds: I scanned for "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class" — none. Defensible-claims voice is consistent across articles, comparisons, vertical pages.

**The single biggest weakness: structural duplication.**

The five `/compare/*` pages share ~80% of their JSX. Each defines its own `<Reason>` and `<Bullet>` helper components — identical implementations across files. Each has the same table-rendering grid. The data (`rows: Row[]`) is what actually differs. ~250 lines × 5 = ~1,250 lines of which ~1,000 are duplication.

The two `/for-*` vertical landing pages have the same shape, and `/about` reuses the same `<Reason>`/`<Bullet>` pair. Total duplicated mini-component code across pages: maybe 200 lines.

**Why this is acceptable today:** five comparison pages is the threshold where duplication starts to itch. Below that, factoring is premature abstraction; above it, it pays back. We're at the threshold. If a sixth comparison page is incoming, factor first.

**Recommended factoring (~2 hours of work):**
- Extract `components/sections/Reason.tsx` and `components/sections/Bullet.tsx` from the inline duplicates.
- Extract `components/sections/ComparisonTable.tsx` taking a `rows: Row[]` prop.
- Move comparison content to `content/comparisons/{slug}.ts` data files; pages become thin shells calling the table component.

After that, adding a new comparison is a 30-minute job: write the rows file, add a 15-line page.tsx.

## Testing — grade C (acceptable now, urgent within 2 months)

**Status:** zero tests. Zero CI. Verification is `npm run typecheck && npm run build && eyeball the screenshots`.

**Why this is defensible today.** No business logic to test. No state machines that aren't trivial (Nav's mega-panel open/close is the most complex; it works). All routes are static-rendered, so any error surfaces at build time. The browse.mjs Playwright tool means visual smoke-testing the live site is a one-command operation.

**Why it stops being defensible.** As soon as forms send to a real endpoint, that's untested integration. As soon as an article gets a typo that breaks the SSG render, the first to find it is the user. As soon as the nav grows another dropdown, the existing one's behaviour gets at-risk for regression.

**The cheap path forward:**
- Smoke tests with Playwright (already installed): for each top-level route, load it, check the title, check no console errors, take a screenshot. Save screenshots as a Playwright snapshot baseline. ~3 hours of work; turns the manual verification into a CI gate.
- Extend `scripts/browse.mjs` into `scripts/smoke.mjs` that runs the above against either a local `next dev` or the deployed URL.

## Tooling — grade A−

**What's wired:**
- `npm run dev` / `build` / `typecheck` / `deploy` — all in `package.json`.
- `scripts/browse.mjs` — Playwright-based CLI for fetching JS-rendered pages. Self-documented.
- Lighthouse — invoked via `npx lighthouse@latest` against the live URL. Used to catch and fix two contrast violations + a heading-order issue this week.
- `wrangler` — Cloudflare CLI in devDependencies. `npm run deploy` calls `next build && wrangler pages deploy out --project-name=oralstack`.

**Gaps:**
- **No linter.** ESLint or Biome would catch unused imports, missing keys in lists, missing alt text. ~30 minutes to set up; frees TypeScript to focus on types.
- **No formatter pin.** Editors handle this individually; consistent on first read but drifts under multi-author work.
- **No CI.** Every commit goes straight to whatever local state the author had. A GitHub Action running `typecheck && build` on PRs is ~10 lines of YAML and prevents the obvious regressions.

## Documentation — grade B+

**What exists:**
- [README.md](README.md) — stack, run commands, layout, brand rules.
- [AGENTS.md](AGENTS.md) — agent-collaboration contract.
- [CHANGES.md](CHANGES.md) — engineering changelog. Honest, well-maintained, easy to skim.
- [CLOUDFLARE.md](CLOUDFLARE.md) — six-step deploy guide with steps 1–7 (auth, deploy, custom domain, analytics, email routing, Cal.com, demo form endpoint).
- [SEARCH_CONSOLE.md](SEARCH_CONSOLE.md) — Google Search Console setup.
- [.env.example](.env.example) — every `NEXT_PUBLIC_*` variable with a comment explaining what happens if it's empty.

**Gaps:**
- **No "how to extend" guide.** Adding a new comparison page, vertical landing page, or article requires reading existing examples to infer the convention. Fine for one author; friction-heavy when a second person joins.
- **The compare-page pattern is undocumented.** A `EXTENDING.md` covering "add a comparison page", "add an article", "add a vertical landing page" would cut the time-to-first-PR for a new contributor from a day to an hour. Estimated 1 hour to write.
- **The `scripts/browse.mjs` tool is documented in the file header and in agent memory, but not in README.** Worth a one-line callout.

## Tech debt — ordered by impact

**Do this month** (each ≤ 2 hours):

1. **Factor compare pages.** Extract `<ComparisonTable>`, `<Reason>`, `<Bullet>` components. Move comparison data to `content/comparisons/{slug}.ts`. Adding a sixth comparison becomes a 30-min job.
2. **Add a CI workflow.** GitHub Action: on PR, run `npm run typecheck && npm run build`. ~10 lines of YAML.
3. **Add a linter.** ESLint or Biome (Biome is faster). Prevents unused-imports drift, missing keys, missing alt.
4. **Write `EXTENDING.md`.** Cover: add a compare page, add a vertical, add an article, add a workflow. ~1 hour.

**Do this quarter** (each ≤ 1 day):

5. **Smoke tests.** `scripts/smoke.mjs` running Playwright against every top-level route, with screenshot snapshots. Wire into CI.
6. **Real form endpoint.** Sign up for Formspree (or write a Cloudflare Pages Function), set `NEXT_PUBLIC_DEMO_FORM_ENDPOINT`. The form code already handles both paths.
7. **Real product screenshots.** The CSS visualisations are clever and modern, but a screenshot from the live Dentologic app on the imaging page would convert evaluators harder. Already noted in CHANGES.md.

**Defer until needed:**

8. **Image optimisation.** No images today. When they land, Next's `<Image>` component plus a CDN is the standard path.
9. **CMS.** Not until non-engineers need to edit copy. Today, content-as-TypeScript is faster than any CMS for a single-author flow.
10. **Bundle splitting.** Lucide imports the whole index; tree-shaking would save ~30 KB. Worth ~5 perf points in Lighthouse mobile, not worth a half-day yet.

## Patterns and conventions

These are the conventions in use today. Documenting here so they don't drift.

**Page shell pattern.** Every route file starts with `export const metadata` (Next-typed `Metadata`), then a default-exported component returning `<main>`. First child is `<PageHeader eyebrow="..." title="..." />`, then a lede `<Section>` with a single paragraph, then the content sections, then a CTA section, then any final section. See [`app/compare/plato/page.tsx`](app/compare/plato/page.tsx) for the canonical example.

**Reason / Bullet helpers.** Currently inlined per page (technical debt, see #1 above). Each page's bottom defines a `Reason({ eyebrow, title, body })` and a `Bullet({ children })` mini-component. Same shape everywhere.

**Comparison page pattern.** Top of file: `type Row = { capability, them, us }` plus a `const rows: Row[]`. Body: PageHeader, lede, comparison table, three Reason blocks, "where they're the right call" concession, demo CTA.

**Article pattern.** Each article is one `.tsx` file in `content/articles/`. Exports a single named const matching the article's slug, of type `Article`. The `Body` field is a function component returning JSX prose. Add the import + array entry to [`content/articles/index.ts`](content/articles/index.ts).

**Token usage.** Every colour, radius, font is `var(--color-*)`, `var(--radius-*)`, etc. — never raw hex or px. Defined in [`app/globals.css`](app/globals.css) under `@theme`.

**Voice rules.** Forbidden words: "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class". Every claim is qualified or sourced. Sentence-case for headings and buttons. Lead with the dental job ("schedule", "bill", "chart"), not the SaaS abstraction.

**Pre-deploy checklist** (current manual sequence):

```
1. npm run typecheck
2. npm run build
3. npm run dev + visual check on key routes (browse.mjs at 1280×900 and 390×844)
4. Lighthouse on at least the homepage (mobile profile)
5. Commit on feature branch with ASCII-only message
6. Fast-forward main from parent repo
7. Deploy: wrangler pages deploy out --project-name=oralstack --branch=main
   --commit-message="ASCII description"
8. curl -I oralstack.com/<new-route> to confirm 200
```

A `make ship` or `npm run ship` script that bundles steps 1–4 + 7 + 8 would be a small but worthwhile next addition.

## Risk profile

**Low.** Static site, no PII handling on the server (forms are mailto today; will become Formspree-bound), no auth, no DB. Worst-case incident is "site shows wrong content for an hour" — recoverable via Cloudflare Pages deployment rollback (one click). The brand-claim discipline is the most reputational risk vector — a wrong fact in a comparison page or article. Mitigate by spot-vetting competitor claims on the compare pages before any sales call hinges on them.

**Single-point-of-failure: the author.** One person currently knows where every convention lives, why each decision was made, and which articles are due for refresh. The maintainability investments above (linter, CI, EXTENDING.md, smoke tests) directly de-risk the bus factor.

## What "good" looks like in 90 days

- All four "do this month" items shipped.
- CI runs on every PR; broken-build PRs cannot land.
- Smoke-test screenshots checked in as snapshots; visual regressions surface as a CI artefact.
- Real form endpoint live; form submissions land in `hello@oralstack.com` directly.
- Compare pages factored; a 6th comparison takes < 1 hour.
- One additional engineer can land a content PR without reading existing examples to infer conventions.

If you hit those, the grade goes from B+ to A−. The remaining gap to A is real product screenshots and a small bundle-size pass.
