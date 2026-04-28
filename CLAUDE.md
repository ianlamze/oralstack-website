# CLAUDE.md

Project-level memory for agents working on the **Oralstack** marketing site. Always loaded — keep tight. For deeper context, see [AGENTS.md](AGENTS.md), [EXTENDING.md](docs/EXTENDING.md), [MAINTAINABILITY.md](docs/MAINTAINABILITY.md).

## What this is

Static Next.js 16 marketing site at https://oralstack.com. Static export to `out/`, deployed to Cloudflare Pages. No server runtime. The product was previously **Dentologic** — never use that name in new copy or code.

## Five rules that trip agents most

1. **Brand name** — "Oralstack" in prose (capital O), `oralstack` in code/URLs. Never "Dentologic" in user-facing copy.
2. **DFI Synergy framing** — DFI Synergy is an arms-length cornerstone customer, never the operator-founder. No "our own clinic", "built where it ships", "operator-founder", "design partner". Quote attribution uses roles only ("Practice manager", "Clinical director"), never "Founder, DFI Synergy & Oralstack".
3. **Banned SaaS words** — "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class", "effortless". `npm run check:content` catches these.
4. **Content is data, not JSX** — articles, comparisons, customers, workflows, case studies, lead magnets all live in [content/](content/) as typed `.ts`/`.tsx`. Pages in [app/](app/) are thin shells consuming that data. **Edit the data file, not the page.**
5. **Sentence case** for headings and buttons. CTAs name the action ("Book a demo", not "Get started").

## Where to find what

| Need to change | Edit here |
|---|---|
| Article copy | [content/articles/<slug>.tsx](content/articles/) |
| Comparison page | [content/comparisons/<slug>.ts](content/comparisons/) — `/compare/<slug>` page is auto-generated |
| Customer / case study | [content/case-studies/<slug>.ts](content/case-studies/), [content/customers.ts](content/customers.ts) |
| Workflow copy or order | [content/workflows.ts](content/workflows.ts) (homepage) + [content/workflows-detailed.ts](content/workflows-detailed.ts) (`/workflows`) |
| Lead magnet | [content/lead-magnets/<slug>.tsx](content/lead-magnets/) |
| Nav / footer links | [components/sections/Nav.tsx](components/sections/Nav.tsx), [components/sections/Footer.tsx](components/sections/Footer.tsx) |
| Visual mock | [components/visuals/](components/visuals/) — CSS-only, no images |
| Brand colors / motion / type | [research/brand/](research/brand/) (color, logo, motion, typography) |
| Voice rules (long form) | [research/sources/copywriting-system.md](research/sources/copywriting-system.md) |
| Design tokens (long form) | [research/sources/design-system-rules.md](research/sources/design-system-rules.md) |
| Site metadata, env-flagged URLs | [content/site-meta.ts](content/site-meta.ts) |
| Sitemap | [app/sitemap.ts](app/sitemap.ts) |

When adding a comparison, article, vertical page, or workflow — **read [EXTENDING.md](docs/EXTENDING.md) first**. It has copy-paste-ready patterns that match the conventions.

## Scripts

```bash
npm run dev              # local server on :3000
npm run lint             # Biome — exits 0 if no errors
npm run typecheck        # tsc --noEmit
npm run build            # static export to out/
npm run test:smoke       # Playwright smoke + visual snapshots
npm run check:content    # voice rules + content schema validation
npm run deploy           # manual fallback only — see Deploy below

node scripts/browse.mjs <url> [--width N] [--height N]   # screenshot any URL (local or remote)
```

## Deploy

Cloudflare Pages is **Git-connected**. Pushing to `main` auto-builds and ships in ~60s — no CLI step. Watch the deploy at Cloudflare → Workers & Pages → `oralstack-website` → Deployments.

`npm run deploy` is a manual fallback for out-of-band hotfixes or shipping a dirty working tree. Don't run it after a routine `git push` — you'll just queue a duplicate of the auto-deploy. See [docs/CLOUDFLARE.md](docs/CLOUDFLARE.md) and [research/playbooks/redeploy.playbook.md](research/playbooks/redeploy.playbook.md).

## Slash commands (in `.claude/commands/`)

- `/predeploy` — runs lint + typecheck + build + content check, reports each
- `/preview <route>` — screenshots a local route at desktop + mobile widths
- `/new-comparison <slug>` — scaffolds a `/compare/<slug>` page from the comparison template
- `/new-article <slug>` — scaffolds a content/articles entry

## Pre-push checklist

Before opening a PR or pushing to `main` (which auto-deploys):

1. `npm run lint` — clean
2. `npm run typecheck` — clean
3. `npm run build` — clean static export
4. `npm run check:content` — no banned words, slugs unique, required fields present
5. For UI-touching changes: `npm run dev` + `node scripts/browse.mjs http://localhost:3000/<route>` at desktop and mobile

CI runs all of these on every PR and on every push to `main` ([.github/workflows/ci.yml](.github/workflows/ci.yml)). A pre-commit hook also runs lint + typecheck locally — installed automatically by `npm install` via `npm run prepare`.

## Out of bounds (do not do)

- No backend, database, or API routes — this is a **static export**. Cloudflare Pages Functions live in [functions/](functions/) for the contact / lead-magnet endpoints; that's the entire dynamic surface.
- No CMS until non-engineers need to edit copy.
- No Storybook or visual regression beyond the existing Playwright snapshots.
- No new shared components until a pattern is duplicated across 3+ pages with ≥30 LOC each (see [EXTENDING.md](docs/EXTENDING.md) "When to factor out").
- No multi-paragraph comments or docstrings.
- No raw hex / px / shadow values inside components — everything goes through tokens in [app/globals.css](app/globals.css).

## When you finish

Report:
- files changed
- copy and design rules confirmed
- whether `npm run typecheck`, `npm run build`, `npm run check:content` pass
