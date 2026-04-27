# Oralstack — Brand Identity

Authoritative brand guidelines for Oralstack. Designed for the website (`apps/website` ≈ this repo) and any future surface that needs to render the brand consistently — pitch decks, sales collateral, social, internal docs.

## Documents

- [logo.md](logo.md) — mark, wordmark, lockup variants, clear-space, sizing, do/don't
- [color.md](color.md) — full palette with hex / oklch / RGB, semantic roles, contrast pairings
- [typography.md](typography.md) — type scale, weight system, two-tone wordmark treatment, mono usage
- [motion.md](motion.md) — 8 motion components, timing tokens, patterns, accessibility

For the agent-facing summary used during code work, see [`research/primitives/brand-identity.md`](../primitives/brand-identity.md). The primitive is the short version; this folder is the long version with the rules and examples a designer or contractor needs.

## Quick rules (memorise these five)

1. **Brand name in prose: "Oralstack"** — one word, capital O. Never `oralstack` or `Oral Stack`.
2. **Mark = stylized molar.** Three segments: navy crown, teal left root, navy right root. Lives at [`app/icon.svg`](../../app/icon.svg).
3. **Primary palette: navy + teal.** Navy `#15375D` for ink + buttons. Teal `#2D8AAB` for accent + links.
4. **Wordmark is two-tone.** *Oral* navy, *stack* teal. Component: [`components/sections/Wordmark.tsx`](../../components/sections/Wordmark.tsx).
5. **Sunset / sea / violet are visualization-only.** They appear in the product-UI mock components for caries / filling / crown semantic cues. They do not appear in marketing chrome.

## Where the brand lives in code

| Asset | Path |
|---|---|
| Brand mark (favicon) | [`app/icon.svg`](../../app/icon.svg) |
| Apple touch icon | [`app/apple-icon.tsx`](../../app/apple-icon.tsx) — 180×180 PNG generated at build |
| OG image | [`app/opengraph-image.tsx`](../../app/opengraph-image.tsx) — 1200×630 PNG generated at build |
| Wordmark component | [`components/sections/Wordmark.tsx`](../../components/sections/Wordmark.tsx) |
| Color tokens | [`app/globals.css`](../../app/globals.css) — Tailwind 4 `@theme` block |
| Voice rules | [`research/primitives/copy-voice.md`](../primitives/copy-voice.md) |
