---
description: Scaffold a new content/articles/<slug>.tsx entry, register it, and confirm it builds.
argument-hint: <slug> (kebab-case article slug)
---

Scaffold a new article at `content/articles/$ARGUMENTS.tsx`. Follow [EXTENDING.md](EXTENDING.md) "Add an article" exactly.

Steps:

1. **Sanity check the slug.** `$ARGUMENTS` must be lowercase kebab-case. Bail if it has spaces, capitals, or non-ASCII. If `content/articles/$ARGUMENTS.tsx` already exists, bail.

2. **Ask the user for the cluster** (one of `front-desk`, `billing`, `clinical`, `migration`, `compliance`) if not obvious from the slug. Cluster determines the article hub grouping and the default CTA — see `clusterDefaultCTA` in [content/articles/types.ts](content/articles/types.ts).

3. **Create the file** at `content/articles/$ARGUMENTS.tsx`. Use this skeleton, with `TODO:` placeholders for everything not yet decided:

   ```tsx
   import type { Article } from "./types";

   export const $ARGUMENTS: Article = {
     slug: "$ARGUMENTS",
     title: "TODO: article title",
     description: "TODO: SEO description, ~155 chars.",
     excerpt: "TODO: 1-2 sentence pull quote shown on the article hub card.",
     publishedAt: "<today's date in YYYY-MM-DD>",
     author: "Oralstack team",
     cluster: "<chosen cluster>",
     tags: ["TODO"],
     readingMinutes: 7,
     Body: ArticleBody,
   };

   function ArticleBody() {
     return (
       <>
         <p>TODO: lede paragraph.</p>
         <h2>TODO: section heading</h2>
         <p>TODO: body.</p>
       </>
     );
   }
   ```

   Use the actual current date for `publishedAt`. The slug constant name must be a valid JS identifier — if `$ARGUMENTS` contains hyphens, convert to camelCase for the const name (e.g. `dental-audit-logs` → `dentalAuditLogs`).

4. **Register it** in [content/articles/index.ts](content/articles/index.ts): add the import and append to the array. The `/articles/[slug]` route auto-generates from the array.

5. **Run** `npm run typecheck` and `npm run check:content` to confirm the scaffold is valid.

Report:
- Files created/edited.
- Every `TODO:` placeholder the user needs to fill in.
- Whether typecheck and content check pass.

**Article voice rules** (apply when drafting content):
- Lead with the dental job. "Recall fires three weeks before due" beats "leverage automation to drive engagement".
- Every numeric claim has a source. Use site-consistent numbers (60% → 85% same-day-bill, three weeks to live, asia-southeast1).
- Cross-link to other articles, `/compare/<slug>`, `/workflows#section`, `/security` where it helps.
- Use `&apos;` / `&ldquo;` / `&rdquo;` inside JSX text content. Plain `'` is fine inside string literals.
- No banned words: "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class", "effortless".
