---
description: Scaffold a new /compare/<slug> page — data file, page shell, registration, sitemap entry.
argument-hint: <slug> (kebab-case competitor name, e.g. dentrix or open-dental)
---

Scaffold a new comparison page for `$ARGUMENTS`. Follow [EXTENDING.md](EXTENDING.md) "Add a comparison page" exactly.

Steps:

1. **Sanity check the slug.** `$ARGUMENTS` must be lowercase kebab-case. Bail with a clear error if it has spaces, capitals, or non-ASCII. If `content/comparisons/$ARGUMENTS.ts` already exists, bail.

2. **Read [content/comparisons/plato.ts](content/comparisons/plato.ts) as the template** — it's the most filled-in. Copy its shape into a new file at `content/comparisons/$ARGUMENTS.ts`. Replace every Plato-specific value with a clearly-marked `TODO:` placeholder so the user knows what needs filling in. Keep the same 11 capability rows (Deployment, Schedule UX, Charting, Billing, Imaging, Recall, Multi-clinic, Off-site access, Hosting, Updates, Pricing) — these are the canonical comparison axes.

3. **Register it** in [content/comparisons/index.ts](content/comparisons/index.ts): import the new export, add to the `comparisons` array.

4. **Add the page shell** at `app/compare/$ARGUMENTS/page.tsx`. Match the exact pattern used by other comparison pages (e.g. [app/compare/plato/page.tsx](app/compare/plato/page.tsx)) — they're 4-line shells that just pass the data to `<ComparisonPage>`.

5. **Add to sitemap** in [app/sitemap.ts](app/sitemap.ts) at priority 0.8.

6. **Surface in nav** if relevant — the mega panel at [components/sections/Nav.tsx](components/sections/Nav.tsx) and footer Solutions column at [components/sections/Footer.tsx](components/sections/Footer.tsx). Skip this if the comparison is niche; surface it if it's a high-intent search target.

7. **Run** `npm run typecheck` and `npm run check:content` to confirm the scaffold is valid before reporting back.

Report:
- All files created/edited (with paths).
- A list of every `TODO:` placeholder in the data file the user needs to fill in (capability rows, reasons, concession bullets, CTA copy).
- Whether typecheck and content check pass.

**Voice rules to apply when filling claims (if user asks you to draft content too):**
- Every `them` claim must be factually defensible. Never strawman the competitor.
- The `concession.bullets` list real cases where the competitor wins — not fake.
- No banned words: "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class", "effortless".
- Sentence case for headings.
