---
id: BRAND_IDENTITY_V2
kind: primitive
type: brand
---

# Oralstack — Brand Identity

## Brand name

**Oralstack** — one word, capital O. Use this in all prose and display copy.

- Wordmark display: "Oralstack" (one word, capital O), with two-tone treatment — *Oral* in navy, *stack* in teal
- URL: `oralstack.com` (lowercase)
- Code / npm package name: `oralstack` (lowercase)
- Email: `hello@oralstack.com`, `security@oralstack.com`, `legal@oralstack.com` (lowercase)

Never write `oralstack` in prose copy or `Oral Stack` (two words) anywhere.

## What it is

The modern operating system for dental clinics — APAC-first, premium, clinical, speed-led.

## Promise

Make busy dental clinics faster without making clinical work feel generic, bloated, or decorative.

## Personality

- **Precise**: decisions feel measured and operationally useful.
- **Premium**: looks expensive through restraint, not decoration.
- **Clinical**: trust matters; the system is not sterile.
- **APAC-aware**: first deployment context is Singapore and regional clinic operations.
- **Speed-first**: every visible choice helps someone scan, decide, or act faster.

## Visual identity

### Brand mark

A stylised molar in three segments:
1. **Crown** — top, navy, rounded blob
2. **Left root** — bottom-left, teal, smaller
3. **Right root** — bottom-right, navy, larger

Lives at `app/icon.svg` (favicon) + `app/apple-icon.tsx` (180×180 PNG) + the `Wordmark` component.

### Wordmark

"Oralstack" with two-tone colour split — *Oral* in navy (`var(--color-ink)`), *stack* in teal (`var(--color-tide)`). Rendered by `components/sections/Wordmark.tsx`.

### Colours

- **Navy** (`--color-ink`, `oklch(0.30 0.07 250)`) — primary text, primary button background, brand mark crown + right root
- **Teal** (`--color-tide`, `oklch(0.60 0.10 218)`) — accent, links, eyebrows, brand mark left root, "stack" half of wordmark
- **Canvas** (`--color-canvas`, near-white warm) — background
- **Sunset** (`--color-sunset`, warm peach) — retained for product visualisations only (caries, overdue, warning, pilot status)
- **Sea** (`--color-sea`, lighter teal) — retained for product visualisations only (filling, booked, live status)
- **Violet** (`--color-violet`, purple) — retained for product visualisations only (crown, x-ray, AI signal)

Full palette in `research/primitives/color-tokens.md` and `app/globals.css`.

## Preferred language

Use these nouns: *dental clinic, front desk, patient record, patient chart, case notes, clinical imaging, checkout, billing, queue, audit log, recall, discharge, chair, provider, hygienist*.

Avoid: *workspace, platform, solution* when a dental noun fits.

## Boundaries (hard rules)

- Do not imply automated diagnosis.
- Do not claim guaranteed clinical, revenue, compliance, or risk outcomes.
- Do not make the website sound like generic B2B SaaS.
- Use **Oralstack** in prose. Never `oralstack` (lowercase) or `Oral Stack` (two words).

## Source

Updated 2026-04-27 with the v2 brand: tooth mark, navy + teal palette, "Oralstack" capitalisation, $200/clinic/month pilot pricing.
