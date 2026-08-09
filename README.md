# oralstack — Marketing Website

Local-first marketing site for **oralstack**, the Plato-connected clinic operations workspace. This is a standalone Next.js project that will eventually be ported into the Dentologic monorepo at `apps/website/`.

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

## Documentation

Start with [CLAUDE.md](CLAUDE.md) — it's the always-loaded agent memory and has a where-to-find-what table for the rest. Below is the full index.

**Working on the site (devs + agents):**

| Doc | What's in it |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Five rules that trip agents most, where-to-find-what table, scripts, pre-deploy checklist |
| [AGENTS.md](AGENTS.md) | Agent contract: startup order, context budget, copy/design rules, output format |
| [EXTENDING.md](docs/EXTENDING.md) | Copy-paste patterns for adding a comparison, article, vertical page, or workflow |
| [MAINTAINABILITY.md](docs/MAINTAINABILITY.md) | Point-in-time codebase health check: architecture, tooling grades, debt list |
| [CHANGES.md](docs/CHANGES.md) | Engineering changelog (different audience from the public `/changelog`) |
| [ENV_VARS.md](docs/ENV_VARS.md) | Master inventory of every env var: scope, required, used by, purpose |

**Subsystem READMEs:**

| Doc | What's in it |
|---|---|
| [functions/README.md](functions/README.md) | Cloudflare Pages Functions: endpoints, request/response shapes, env vars, error modes |
| [tests/README.md](tests/README.md) | Playwright smoke + visual snapshots: coverage, run, update, add a route |
| [components/visuals/README.md](components/visuals/README.md) | CSS-only product mock catalogue |

**Operations + deploy:**

| Doc | What's in it |
|---|---|
| [CLOUDFLARE.md](docs/CLOUDFLARE.md) | 7-step Cloudflare Pages setup + troubleshooting runbook |
| [CONTACT_SETUP.md](docs/CONTACT_SETUP.md) | Contact-form system: intents, anti-spam, WhatsApp number |
| [SEARCH_CONSOLE.md](docs/SEARCH_CONSOLE.md) | Google Search Console verification + sitemap submission |

**Brand + voice (long-form references):**

[`research/`](research/) is the agent-collaboration scaffold — read selectively, not all at once:

- [`research/index/research-map.md`](research/index/research-map.md) — entry point for routing tasks
- [`research/primitives/`](research/primitives/) — brand-identity, color-tokens, content, copy-voice, visuals
- [`research/brand/`](research/brand/) — brand v2 guidelines (color, logo, motion, typography)
- [`research/playbooks/`](research/playbooks/) — task procedures (add-article, add-changelog-entry, add-visualization, edit-case-study, new-page-add, redeploy)
- [`research/sources/`](research/sources/) — three verbatim reference docs (agentic-workspace, copywriting-system, design-system-rules)
- [`research/architecture.md`](research/architecture.md), [`research/seo/playbook.md`](research/seo/playbook.md), [`research/website-audit.md`](research/website-audit.md)

## Code layout

- `app/` — Next.js App Router pages, layouts, global styles
- `components/primitives/` — atomic UI (Button, Section)
- `components/sections/` — composed sections (Hero, Nav, Footer, ComparisonPage, etc.)
- `components/visuals/` — CSS-only product mocks (ScheduleMock, OdontogramMock, …)
- `components/forms/` — form components (QuickQuestion, MigrationAssessment, PilotProposal, ContactTabs)
- `content/` — typed content (articles, comparisons, workflows, lead magnets) — **edit copy here, not in JSX**
- `lib/` — small utilities
- `functions/` — Cloudflare Pages Functions (the only dynamic surface)
- `tests/` — Playwright smoke + visual snapshots
- `scripts/` — `browse.mjs` (Playwright CLI), `check-content.mjs` (voice + schema lint), `generate-deck-pdf.sh`
- `.claude/commands/` — slash commands for repeated agent workflows
- `.githooks/` — pre-commit hook (lint + typecheck + content check)

## Brand rules (4 lines)

1. Use **oralstack**, not Dentologic.
2. Lead with dental clinic operations, not generic SaaS.
3. No "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class".
4. Every claim is defensible (real customer, real integration, real compliance fact) or qualified.

Full rules: `research/primitives/copy-voice.md` and `research/sources/copywriting-system.md`.

## Port plan (later)

When the site is ready, replace `apps/website/` in the Dentologic monorepo with the contents of this directory, align `package.json` with the workspace conventions, and re-point the brand-audit CLI (`npm run dl:audit:copy`) at the new path.
