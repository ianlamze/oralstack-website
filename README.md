# oralstack — Marketing Website

Local-first marketing site for **oralstack** (the dental clinic OS, formerly Dentologic). This is a standalone Next.js project that will eventually be ported into the Dentologic monorepo at `apps/website/`.

## Stack

- Next.js 16.2 (App Router, static export)
- React 19
- TypeScript 5.7
- Tailwind CSS 4.2 (CSS-first config via `@theme`)
- Motion 12 (formerly Framer Motion)
- Lucide React (icons)

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produces ./out/ — fully static HTML, drop on any static host
npm run typecheck
```

## Layout

- `app/` — Next.js App Router pages and global styles
- `components/primitives/` — `Button`, `Section`
- `components/sections/` — `Hero`, `TrustStrip`, `Workflows`, `CTA`, `Footer`, `ScheduleMock`
- `content/` — typed content (workflows, site metadata) — edit copy here, not in JSX
- `lib/` — small utilities
- `research/` — agent-collaboration scaffold (see `AGENTS.md`):
  - `sources/` — three reference docs verbatim (agentic-workspace, copywriting-system, design-system-rules)
  - `index/research-map.md` — entry point for routing tasks
  - `primitives/` — brand-identity, color-tokens, content, copy-voice, visuals
  - `brand/` — brand v2 guidelines (color, logo, motion, typography)
  - `playbooks/` — task procedures (add-article, add-changelog-entry, add-visualization, edit-case-study, new-page-add, redeploy)
  - `seo/playbook.md` — SEO/keyword strategy
  - `architecture.md` — deployment & data-flow architecture
  - `website-audit.md` — competitive teardown of dental + premium SaaS sites (the rationale for the v1 page structure)
- `CLAUDE.md` — project memory always loaded into agent sessions
- `AGENTS.md` — root agent contract
- `MAINTAINABILITY.md` — point-in-time codebase health check (architecture, code quality, tooling, debt list, conventions)
- `CHANGES.md` — engineering changelog
- `CLOUDFLARE.md` — deploy and infra setup
- `scripts/browse.mjs` — Playwright-based CLI for visual verification and competitor research

## Brand rules (4 lines)

1. Use **oralstack**, not Dentologic.
2. Lead with dental clinic operations, not generic SaaS.
3. No "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class".
4. Every claim is defensible (real customer, real integration, real compliance fact) or qualified.

Full rules: `research/primitives/copy-voice.md` and `research/sources/copywriting-system.md`.

## Port plan (later)

When the site is ready, replace `apps/website/` in the Dentologic monorepo with the contents of this directory, align `package.json` with the workspace conventions, and re-point the brand-audit CLI (`npm run dl:audit:copy`) at the new path.
