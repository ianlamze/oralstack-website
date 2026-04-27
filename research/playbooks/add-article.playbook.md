---
id: ADD_ARTICLE_V1
kind: playbook
triggers:
  - write a new article
  - add a blog post
  - add an article to /articles
---

# Add an Article

## Required inputs

- Article angle (one-sentence reader takeaway)
- Cluster: `front-desk` · `billing` · `clinical` · `migration` · `compliance`
- Primary keyword (the search query this article should win)

## Steps

1. Read [`research/seo/playbook.md`](../seo/playbook.md). Confirm the angle aligns with the cluster strategy.
2. Confirm the angle isn't a duplicate of an existing article in `content/articles/`.
3. Pick a slug — kebab-case, ≤ 60 chars, includes the primary keyword: e.g. `plato-to-cloud-migration`, `reducing-no-show-rates`, `singapore-pdpa-dental-records`.
4. Create `content/articles/{slug}.tsx`. Match the pattern of an existing article — typed metadata + `Body` component returning the prose.
5. Add the export to `content/articles/index.ts`.
6. Run [`research/primitives/copy-voice.md`](../primitives/copy-voice.md) banned-phrase check on the body. No "all-in-one", no "supercharge", no unsupported numerical claims.
7. Confirm the article includes:
   - Lede paragraph naming who it's for
   - At least one H2 section
   - At least one internal link to a product page (`/workflows`, `/pricing`, `/security`, `/integrations`, `/customers/dfi-synergy`)
   - At least one internal link to another article (when ≥1 related article exists)
   - "What to do next" section near the end
8. Run `npm run typecheck` and `npm run build` — both must pass.
9. Update `app/sitemap.ts` if not already auto-pulling from the registry (it does — sitemap auto-includes via the articles list).
10. Deploy with `npm run deploy`.

## Validation

- Article appears at `https://oralstack.com/articles/{slug}/`
- Article appears in `https://oralstack.com/articles/` (index page)
- Article URL is in `sitemap.xml`
- Reading time matches `wordCount / 220` (rough)
- Primary keyword appears in title (h1) and at least once in body, naturally
- Article schema JSON-LD is rendered (handled by template)
- Breadcrumb schema is rendered (handled by template)
- Internal link count: ≥ 2

## Output contract

- Files changed: list
- Cluster + primary keyword reported
- Word count + reading time
- Deploy URL if redeploy was triggered
