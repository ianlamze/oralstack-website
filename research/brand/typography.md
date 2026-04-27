# Typography

## Typeface

**System sans-serif stack** — no custom font is loaded. The CSS stack:

```
ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif
```

This means SF Pro on Apple platforms, Segoe UI on Windows, the platform default elsewhere. Loads instantly, renders crisply, no FOUC, no third-party request.

**Mono stack** for code / route labels / metadata:

```
ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace
```

A custom typeface (Geist, Inter, or similar) is a deliberate later decision. It would buy a small amount of brand distinctiveness at the cost of an extra network request and a possible FOUC. Hold until/unless brand insists.

## Type scale

| Role | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| Display | 60–84 px | 600 | -0.025em | Deck cover, OG image |
| H1 hero | 36–60 px | 600 | -0.02em | Page hero headlines |
| H2 section | 24–40 px | 600 | -0.015em | Section headings |
| H3 subsection | 18–22 px | 600 | -0.01em | Workflow card titles, subsection heads |
| Body large | 16–18 px | 400 | normal | Lede paragraphs |
| Body | 14–16 px | 400 | normal | Default body |
| Eyebrow | 10–12 px | 500 | 0.16–0.18em uppercase | Section labels above titles |
| Caption | 10–12 px | 400 | 0.04em | Footer text, fine print, qualifiers |
| Mono | 11–13 px | 400 | normal | Routes, code, technical metadata |

Sizes are responsive — Tailwind responsive prefixes (`md:`, `lg:`) scale up at breakpoints.

## Weight

The system uses three weights only:

- **400** (regular) — body, captions, mono
- **500** (medium) — eyebrows, button labels, table headers, status pills
- **600** (semibold) — headings (h1, h2, h3), wordmark, CTA labels

No 700/800/900 used. Restraint is part of the premium feel.

## Two-tone wordmark

The "Oralstack" wordmark splits the colour mid-word: *Oral* in navy, *stack* in teal. This is the single most distinctive typographic move in the brand. Implementation is plain inline `<span>` colour switching at the React level — no special font features required.

```jsx
<span className="font-semibold tracking-tight">
  <span style={{ color: "var(--color-ink)" }}>Oral</span>
  <span style={{ color: "var(--color-tide)" }}>stack</span>
</span>
```

Always render this way when displaying the brand visually. In plain-text contexts (alt text, page titles, paragraph copy), write the brand name as `Oralstack` — single colour is fine.

## Tabular numerals

For any numeric content (times, prices, stats, counts), apply `tabular-nums` so digits align cleanly across rows:

```jsx
<span className="tabular-nums">$200.00</span>
```

This matters for the schedule mock, the case study stat grid, the analytics heatmap, and the changelog dates.

## Hierarchy patterns

The standard page rhythm:

```
[ Eyebrow — uppercase, soft grey, tight tracking ]
[ Title — large semibold, tight tracking ]
[ Body — body large, muted ]
[ Bullets — body, muted, with sunset-deep dot bullets ]
```

This is the pattern used by the Hero, every workflow section, the case study sections, the security cards, and the integrations categories. Consistency is the point.

## Mono usage

Mono is reserved for technical content:

- Route paths (`/customers/dfi-synergy`)
- File paths (`components/visuals/ScheduleMock.tsx`)
- Code identifiers and tokens (`var(--color-tide)`)
- Schema field names (`appointment.startIso`)

Do not use mono for emphasis or decorative effect in body copy. Use semibold or italic instead.

## Don't

- Don't introduce a 4th weight (700+). The 400/500/600 ladder is the system.
- Don't apply `text-uppercase` to body copy. Eyebrows are the only uppercase usage.
- Don't use serif typefaces. The brand is sans-only.
- Don't render the wordmark as a single colour in visual contexts.
- Don't change tracking ad hoc. Use the values in the scale.
