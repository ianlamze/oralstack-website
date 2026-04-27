---
id: CTA_PATTERN_V1
kind: component_pattern
component: components/sections/CTA.tsx
---

# CTA Pattern

## Purpose

Convert visitors who got far enough down the page to consider a real conversation. The CTA section is the closing argument, not the opener.

## Required slots

- Eyebrow: short context label ("Pilot programme")
- Headline: imperative + brand name
- Body: 1-2 sentences naming the migration story or pilot context
- Primary CTA: verb + object ("Book a demo")
- Secondary CTA: alternative path with lower friction (talk about a pilot, ask a question)

## Constraints

- Headline includes the word **oralstack** explicitly.
- Both CTAs use a real `mailto:` or anchor — no fake links.
- No banned phrases.
- No claim of zero risk, free trial, or guaranteed outcome unless we mean it.

## Validation

- Both CTAs are keyboard-accessible and have visible focus.
- `min-height: 44px` on tappable controls.
- Section is reachable via the hero secondary CTA anchor (`#contact`).
