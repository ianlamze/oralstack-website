# Research Map

The router for any agent working on this repo. Read this immediately after `AGENTS.md`. Do not load files outside the table below at startup.

## Task classes

| Task | Load | Then |
|---|---|---|
| Add a new page | `playbooks/new-page-add.playbook.md` | one or two relevant patterns |
| Edit a case study | `playbooks/edit-case-study.playbook.md` | `primitives/copy-voice.md` |
| Add a changelog entry | `playbooks/add-changelog-entry.playbook.md` | `primitives/copy-voice.md` |
| Add a product visualization | `playbooks/add-visualization.playbook.md` | `components/visuals/README.md` |
| Redeploy to production | `playbooks/redeploy.playbook.md` | `../CLOUDFLARE.md` if auth/setup issues |
| Edit hero copy | `patterns/components/hero.pattern.md` | `primitives/copy-voice.md` |
| Edit CTA copy | `patterns/components/cta.pattern.md` | `primitives/copy-voice.md` |
| Update workflow content | `primitives/content.md` | `primitives/copy-voice.md` |
| Adjust colors / spacing / type | `primitives/color-tokens.md` | `app/globals.css` |
| Brand or naming change | `primitives/brand-identity.md` | `primitives/copy-voice.md` |
| Add or modify motion / animation | `brand/motion.md` | `primitives/visuals.md` if it touches a visual |
| Where does this code go? | `architecture.md` | the matching primitive or pattern |

## Primitives (reference, load only when relevant)

- `primitives/brand-identity.md` — what Oralstack is, what it stands for
- `primitives/copy-voice.md` — ranked copy rules, banned phrases, templates
- `primitives/color-tokens.md` — palette, semantic roles, contrast targets
- `primitives/content.md` — typed content files, editing rules
- `primitives/visuals.md` — product-UI visualizations library (`components/visuals/`)

## Brand identity (deep guidelines — load when designing or extending the visual system)

- `brand/README.md` — index + 5 quick rules
- `brand/logo.md` — mark, wordmark, lockup variants, do/don't
- `brand/color.md` — full palette with oklch / hex / RGB / contrast pairings
- `brand/typography.md` — type scale, weight system, two-tone wordmark treatment
- `brand/motion.md` — 8 motion components, timing tokens, when to use each, reduced-motion rules

## Architecture + history

- `architecture.md` — directory tree, layer model, where-does-new-code-go decision table
- `../CHANGES.md` — engineering changelog (decisions, milestones)
- `website-audit.md` — competitive teardown of dental + premium SaaS sites that informed the v1 page structure

## Sources (full reference docs — load only for governance, teaching, or deep lookups)

- `sources/agentic-workspace.md` — the pattern this repo follows (heavy; rarely load)
- `sources/copywriting-system.md` — full ranked rulebook + templates + lint spec
- `sources/design-system-rules.md` — full token + accessibility + state model rules

## Output contract for any task

After completion, report:
- Files changed
- Copy rules confirmed (no banned phrases, dental-specific where relevant)
- Design rules confirmed (tokens only, contrast OK, focus visible, motion respects `prefers-reduced-motion`)
- `npm run typecheck` and `npm run build` results
- Whether redeploy was triggered (and the `*.pages.dev` URL if so)
