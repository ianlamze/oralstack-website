---
id: HERO_PATTERN_V1
kind: component_pattern
component: components/sections/Hero.tsx
---

# Hero Pattern

## Purpose

Tell the visitor what oralstack is in three seconds, with the strongest verbal claim available and the clearest path to the next step.

## Required slots

- Eyebrow: brand wordmark or short context label
- Headline: verb-stack + brand promise (two-line construction)
- Subhead: 1 sentence, dental + APAC specificity
- Primary CTA: verb-led, links to contact or pilot
- Secondary CTA: verb-led, anchors to a deeper section
- Hero visual: product UI at density (currently a CSS-built schedule mock; replace with a real screenshot when available)

## Constraints

- Headline must contain at least 5 dental verbs OR 1 dental noun + 1 dental verb.
- No banned phrases (`research/primitives/copy-voice.md`).
- Primary CTA must be a verb + object (`Book a demo`, not `Get started`).
- Visual must NOT be a stock photo of a dentist, a laptop mockup, or a generic illustration.
- Above-the-fold render budget: ≤ 50 KB JS, ≤ 80 KB CSS, no blocking external fonts.

## Validation

- `Hero.tsx` matches this contract.
- Headline string passes the banned-phrase audit.
- CTAs link to anchors or `mailto:` only — no third-party form embeds without review.

## When to update

- New positioning lock (lead claim changes from imaging to something else).
- Real customer logo or stat becomes available — fold into the trust strip below the hero.
- Real product screenshot becomes available — swap the schedule mock.
