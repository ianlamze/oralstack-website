# AGENTS.md — oralstack website

## Mission

You are working on the **oralstack** marketing website. Work retrieval-first. Do not solve from memory when a project primitive, playbook, or pattern file exists.

## Brand

oralstack is the modern operating system for dental clinics — APAC-first, premium, clinical, speed-led. The product was previously named Dentologic; **always use "oralstack" in any new copy, code, or asset.**

Brand wiki rules (preserved from the previous brand) still apply verbatim — see `research/primitives/brand-identity.md`.

## Startup (read in this order)

0. `CLAUDE.md` is auto-loaded on every session — its where-to-find-what table is your navigation aid. No re-read needed.
1. `AGENTS.md` (this file)
2. `research/index/research-map.md`
3. The one playbook the task class routes to (do not read multiple)

Then classify the task and load only the smallest correct context bundle.

## Context budget

- One playbook
- Up to two pattern files
- The directly affected source files
- Do **not** read the whole `research/sources/` tree at startup; those are reference material for specific lookups, not boot context.
- Do **not** read unrelated playbooks.

## Editing policy

- Prefer delta edits over full-file rewrites.
- Edit the smallest valid component, content node, or section.
- Preserve unrelated imports, copy, metadata, and layout.

## Copy rules (memorise; full ranked rulebook in `research/sources/copywriting-system.md`)

1. Use **oralstack**, not Dentologic.
2. Lead with the dental job: book, chart, bill, image, message, recall, discharge.
3. No generic SaaS phrases: "all-in-one", "seamless", "supercharge", "unlock", "transform", "best-in-class", "effortless".
4. No claims of guaranteed revenue, automated diagnosis, or zero-risk outcomes.
5. CTAs name the action: "Book a demo", not "Get started".
6. Sentence case for headings and buttons.

## Design rules (full source: `research/sources/design-system-rules.md`)

1. All visual decisions flow through tokens — no raw hex, px, or shadow values inside components.
2. Tokens layered raw → semantic → component, defined in `app/globals.css` via Tailwind `@theme`.
3. Accessibility floor: text contrast ≥ 4.5:1 (3:1 large), interactive boundary ≥ 3:1, target ≥ 24×24 CSS px (44 ergonomic), visible focus, label-in-name aligned.
4. Motion is opt-in and respects `prefers-reduced-motion`.
5. Performance budget: p75 LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 on the homepage.

## Output contract

After completion, report:
- files changed
- copy rules and design rules confirmed
- whether `npm run typecheck` passes
- whether `npm run build` produces a clean static export to `out/`

## Skip / do not do

- Do not introduce a backend, database, or API routes — this is a static export site.
- Do not add a CMS until non-engineers need to edit copy.
- Do not add SemVer / RFC governance until the site has more than one consumer.
- Do not add Storybook or visual regression for v1 — `next dev` + manual review is enough.
- Do not write multi-paragraph comments or docstrings.
