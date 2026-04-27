# Logo

## The mark

A stylized molar in three segments:

- **Crown** — top half, navy (`var(--color-ink)` / `#15375D`), rounded blob shape
- **Left root** — bottom-left, teal (`var(--color-tide)` / `#2D8AAB`), smaller and slightly narrower
- **Right root** — bottom-right, navy, larger

The asymmetric two-root colouring creates a memorable "off-balance" character and gives the mark its brand colour story in a single glyph.

## File / component locations

| Use | Source |
|---|---|
| Browser favicon (SVG) | [`app/icon.svg`](../../app/icon.svg) |
| Apple touch icon (180×180 PNG, generated) | [`app/apple-icon.tsx`](../../app/apple-icon.tsx) |
| OG share image (1200×630 PNG, generated) | [`app/opengraph-image.tsx`](../../app/opengraph-image.tsx) |
| In-React rendering | `<Wordmark size="…">` from [`components/sections/Wordmark.tsx`](../../components/sections/Wordmark.tsx) |

## Wordmark

"Oralstack" rendered with a **two-tone colour split** — *Oral* in navy, *stack* in teal. Always one word, always capital O, never spaced as "Oral Stack."

```html
<span class="font-semibold tracking-tight">
  <span style="color: var(--color-ink)">Oral</span><span style="color: var(--color-tide)">stack</span>
</span>
```

## Lockups

| Lockup | When to use |
|---|---|
| **Mark + wordmark** (default) | Nav, footer, hero header — anywhere the brand needs to identify itself in full |
| **Mark only** | Favicons, OG image accent, social avatars, anywhere too small for the wordmark to be legible (under ~80px wide) |
| **Wordmark only** | Plain-text contexts (alt text, page titles, screen reader announcements) — no visual lockup needed |

A circular "badge" lockup (mark + wordmark inside a rounded container) is acceptable for social avatars and presentation slides, but is **not** the canonical brand mark.

## Sizing

| Size token | Mark dimension | Use |
|---|---|---|
| `sm` | 18 px | Footer, dense UI chrome |
| `md` (default) | 24 px | Nav, page headers, deck slide footers |
| `lg` | 36 px | Hero, deck slide cover |

The mark scales cleanly via SVG. Below 16 px the three segments start to muddle visually — prefer the `sm` size as the practical lower bound.

For ad / display contexts above 200 px, the mark holds up. For very large applications (poster, billboard), the SVG paths are clean enough to scale arbitrarily without redrawing.

## Clear space

Maintain a clear space around the mark equal to **the height of the crown segment** (roughly 1/3 the mark height) on all sides. Do not place text, other marks, or busy textures inside this clear space.

## Do

- Use the mark on the warm canvas background (`var(--color-canvas)` ≈ `#FBFBF7`) or on white
- Use the navy/teal default colouring whenever possible
- Pair the mark with the two-tone wordmark for the standard lockup
- Allow generous clear space around the mark in marketing surfaces

## Don't

- Don't recolour the mark to a single colour without reason
- Don't render the mark on a busy photographic background
- Don't apply effects (drop shadow, glow, gradient overlays) on the mark
- Don't stretch, skew, or rotate the mark
- Don't write the brand name as `oralstack` (lowercase) or `Oral Stack` (two words)
- Don't render the wordmark as a single colour — the two-tone split is part of the identity
- Don't add a tagline directly underneath the mark in tight lockups; if a tagline is needed, give it its own line of vertical clear space

## Dark mode (planned, not implemented)

When dark mode lands, the mark needs a dark-bg variant: navy crown + right root become a lighter navy or near-white; teal left root brightens slightly to maintain visibility on the dark surface. Document the variant here once shipped.

## Accessibility

The mark is decorative in most contexts and should carry `aria-hidden`. The wordmark text — "Oralstack" — provides the accessible name. Where the mark is the only brand identifier (favicon, social avatar), the page `<title>` and OG metadata carry the brand name.
