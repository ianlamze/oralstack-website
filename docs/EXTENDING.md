# Extending the site

How to add the most common content surfaces. Each pattern is copy-paste-able and matches the conventions already in the codebase. If you're touching shared components or adding a new pattern type, see [MAINTAINABILITY.md](MAINTAINABILITY.md) first for the architectural shape.

> **Release boundary:** comparison, article, lead-magnet, journey, and tool-detail
> routes are retained as local source but removed from the production export by
> `scripts/finalize-export.mjs`. Releasing one requires a current product-truth
> review, navigation and sitemap updates, and removal from the exclusion contract.

## Conventions, in three lines

- Pages live at `app/<route>/page.tsx`. Each exports `metadata` (Next-typed) and a default component returning `<main>` with `<PageHeader>` first.
- Content lives in `content/`. Workflows, articles, customers, comparisons each have a typed data file. Pages are thin shells consuming that data.
- Shared atoms: `Section` (max-width container), `PageHeader` (h1 + eyebrow), `Reason` (eyebrow + h2 + body), `Bullet` (mark-prefixed list item). Use them — don't reinvent.

## Add a comparison page (~30 minutes)

1. **Create the data file** at `content/comparisons/<slug>.ts`. Copy from [content/comparisons/plato.ts](content/comparisons/plato.ts) and edit the rows, reasons, concession, and CTA. The shape is enforced by [content/comparisons/types.ts](content/comparisons/types.ts).

2. **Register it** in [content/comparisons/index.ts](content/comparisons/index.ts):
   ```ts
   import { yourSlug } from "./your-slug";
   export const comparisons: Comparison[] = [plato, openDental, /* ... */, yourSlug];
   ```

3. **Add the page shell** at `app/compare/<slug>/page.tsx`:
   ```tsx
   import type { Metadata } from "next";
   import ComparisonPage from "@/components/sections/ComparisonPage";
   import { yourSlug } from "@/content/comparisons/your-slug";

   export const metadata: Metadata = {
     title: yourSlug.metaTitle,
     description: yourSlug.metaDescription,
     alternates: { canonical: `/compare/${yourSlug.slug}` },
   };

   export default function Page() {
     return <ComparisonPage data={yourSlug} />;
   }
   ```

4. **Keep it local by default.** Do not add it to the sitemap until its competitor
   claims have been reverified and the route is approved for release.

5. **Release deliberately.** A published comparison also needs navigation review,
   sitemap inclusion, smoke coverage, and a finalizer-policy change.

That's it. The page renders with the standard 11-row table, three Reason blocks, concession card, and CTA. No JSX changes needed.

**Voice rules for comparison content:**
- Every row's `them` claim must be factually defensible. Spot-check competitor specifics (pricing, integrations, hosting model) before publishing.
- The `concession.bullets` must include real cases where the competitor wins. A strawman concession is worse than no concession.
- No banned words: "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class", "effortless".

## Add an article (~30–60 minutes)

1. **Pick a cluster** from `ArticleCluster` in [content/articles/types.ts](content/articles/types.ts): `front-desk`, `billing`, `clinical`, `migration`, `compliance`. The cluster determines where the article surfaces in the article hub and related-article logic.

2. **Create the file** at `content/articles/<slug>.tsx`. Skeleton:
   ```tsx
   import type { Article } from "./types";

   export const yourSlug: Article = {
     slug: "your-slug",
     title: "Your article title",
     description: "SEO description, ~155 chars.",
     excerpt: "1-2 sentence pull quote shown on the article hub card.",
     publishedAt: "2026-04-27",
     author: "Oralstack team",
     cluster: "migration",
     tags: ["tag1", "tag2"],
     readingMinutes: 7,
     Body: ArticleBody,
   };

   function ArticleBody() {
     return (
       <>
         <p>Lede paragraph.</p>
         <h2>Section heading</h2>
         <p>Body.</p>
       </>
     );
   }
   ```

3. **Register it** in [content/articles/index.ts](content/articles/index.ts) — add the
   import + array entry. The local route auto-generates from the array, but remains
   excluded from production until it passes a current product-truth review.

**Article voice rules:**
- Lead with the dental job, not the SaaS abstraction. "Recall fires three weeks before due" beats "leverage automation to drive engagement".
- Every numeric claim has a source (a customer, an article, a vendor doc). Use the dental industry numbers consistently across the site (60% → 85% same-day-bill, three weeks to live, asia-southeast1).
- Cross-link only to released routes. `/workflows` and `/security` are safe defaults;
  archived article and comparison URLs will return 404 in production.
- Use `&apos;` for apostrophes and `&ldquo;`/`&rdquo;` for quotes inside JSX text. Plain `'` works inside string literals (data files), not inside JSX text content.

## Add a vertical landing page (~1 hour)

Vertical pages segment messaging for different buyer shapes (solo clinic vs DSO). Pattern is in [app/for-solo-clinics/page.tsx](../app/for-solo-clinics/page.tsx) and [app/for-multi-clinic/page.tsx](../app/for-multi-clinic/page.tsx).

1. **Create** `app/for-<segment>/page.tsx`. Shape:
   - `<PageHeader eyebrow="For X" title="..." />`
   - Lede `<Section>` (one paragraph)
   - "Built for ..." callout — `<AnimateInView>` wrapping a tinted card explaining who buys at this segment
   - Three `<Reason>` blocks describing what changes day-one, month-one, etc.
   - "What it costs" card with the segment-relevant pricing framing
   - "Questions clinics like yours ask" — `<Bullet>` list with cross-links
   - CTA section to `/book-a-demo`

2. **Add to sitemap** at priority 0.8.

3. **Surface in nav mega panel** resource strip and mobile drawer (see existing entries in [components/sections/Nav.tsx](components/sections/Nav.tsx)).

4. **Surface in footer** under the "Solutions" column ([components/sections/Footer.tsx](components/sections/Footer.tsx)).

Vertical pages are unique enough (different audience, different proof, different CTA framing) that templating doesn't pay off. Copy from an existing vertical and edit.

## Add a workflow (rare, ~2 hours)

Workflows are the core jobs the product is built around — front-desk, billing, charting, imaging, online-bookings, recall, operations, compliance. Adding one means the product has actually grown a new lever — confirm with the user before adding.

1. **Add a visualisation mock** at `components/visuals/<NameMock>.tsx`. Look at existing mocks (ScheduleMock, OdontogramMock) — they're CSS-only, no images, no asset pipeline.

2. **Add the workflow data** to both [content/workflows.ts](content/workflows.ts) (short version, used on homepage) and [content/workflows-detailed.ts](content/workflows-detailed.ts) (long version, used on `/workflows`).

3. **Wire the visual to the workflow** in [app/workflows/page.tsx](../app/workflows/page.tsx) — the `visualsBySlug` map.

4. **Surface in nav** mega panel — the `workflowItems` array in [components/sections/Nav.tsx](components/sections/Nav.tsx) needs the new entry with a Lucide icon, label, and one-line description.

5. **Anchor link** — the new workflow becomes available at `/workflows#<slug>`. Compare-page CTAs and articles can link there.

## The pre-deploy checklist

For any content addition, before opening a PR:

```bash
npm run lint        # Biome — exits 0 if no errors (warnings ok)
npm run typecheck   # tsc --noEmit
npm run build       # next build, generates ./out/
```

CI runs the same three on every PR (see [.github/workflows/ci.yml](.github/workflows/ci.yml)).

For visual confidence on UI-touching changes:

```bash
npm run dev         # http://localhost:3000
node scripts/browse.mjs http://localhost:3000/<route> --width 1280 --height 1100
node scripts/browse.mjs http://localhost:3000/<route> --width 390 --height 844
```

Both screenshots save to `/tmp/browse-<ts>.png`. Open and eyeball.

## Deploy

**Production auto-deploys on push to `main`.** The `oralstack-website` Cloudflare Pages project is Git-connected; every commit on `main` triggers a build and replaces oralstack.com once it's green. No manual step needed.

Manual fallback (out-of-band hotfixes, or shipping a dirty working tree):

```bash
npm run deploy   # runs `npm run build:cf && wrangler pages deploy out --project-name=oralstack-website --commit-dirty=true --branch=main`
```

For a preview / branch deploy via wrangler directly (don't pass `--branch`):

```bash
npm run build:cf && npx wrangler pages deploy out --project-name=oralstack-website --commit-dirty=true
```

Notes:
- Wrangler's deploy API rejects non-ASCII commit messages (en-dash, arrows). Pass `--commit-message="ASCII only"` to override the auto-detected git message.
- Cloudflare Pages keeps deployment history; rollback to a previous deploy is a one-click action in the dashboard.
- After deploy, verify with `curl -I https://oralstack.com/<route>/` — expect 200 (or 308 redirect to trailing-slash, which is fine).

See [CLOUDFLARE.md](CLOUDFLARE.md) for the full deploy and infra setup, including domain wiring, analytics, email routing, and the demo-form endpoint.

## When to factor out shared components

The current shared components in `components/sections/`:
- `Reason` — eyebrow + h2 + body block. Used in /about, /compare/*, /for-*, etc.
- `Bullet` — mark-prefixed list item. Used in concession lists, FAQ, vertical pages.
- `ComparisonTable` — the 3-column table. Used by every /compare/* page via ComparisonPage.
- `ComparisonPage` — the full page shell for comparison routes.
- `PageHeader` — h1 + eyebrow + animated mark.
- `Section` — max-width container with horizontal padding.

Add a new shared component when:
- A pattern is duplicated across 3+ pages with the same shape.
- The duplicated code is ≥ 30 lines per instance.
- Future pages of the same type are likely.

Don't add one when:
- Only 1–2 pages share the pattern (premature abstraction).
- The duplication is under 20 lines (faster to inline).
- The pages have meaningfully different shapes that share a subset of content.

For comparisons specifically: data-driven via `content/comparisons/<slug>.ts` is the path. Every comparison page renders the same JSX from a typed data structure.
