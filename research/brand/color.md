# Color

Layered token system: **raw values → semantic roles → (component tokens, when needed)**. Components consume semantic roles, not raw values. No raw hex appears inside any component file in `components/` — all colour decisions resolve through `var(--color-*)` tokens defined in [`app/globals.css`](../../app/globals.css).

## Primary brand palette

| Token | oklch | Hex (approx) | Use |
|---|---|---|---|
| `--color-ink` | `oklch(0.30 0.07 250)` | `#15375D` | Primary text, primary button background, mark crown + right root, *Oral* half of wordmark |
| `--color-ink-deep` | `oklch(0.22 0.08 250)` | `#0E2540` | Deeper navy for emphasis or nested surfaces |
| `--color-tide` | `oklch(0.60 0.10 218)` | `#2D8AAB` | Accent, links, eyebrow accents, mark left root, *stack* half of wordmark, button hover |
| `--color-tide-deep` | `oklch(0.48 0.10 218)` | `#1F6F8C` | Hover states, focus ring, accent emphasis |

These two colours (navy + teal) carry the brand. Every other colour either sits in service of them (canvas, line) or is reserved for product visualisations (sunset, sea, violet).

## Neutrals

| Token | oklch | Hex (approx) | Use |
|---|---|---|---|
| `--color-canvas` | `oklch(0.99 0.005 90)` | `#FBFBF7` | Page background — warm near-white |
| `--color-canvas-tinted` | `oklch(0.97 0.004 240)` | `#F4F4F6` | Subtle elevated surface (callout cards, mock backgrounds) |
| `--color-ink-muted` | `oklch(0.46 0.03 240)` | `#647184` | Body copy on canvas, secondary text |
| `--color-ink-soft` | `oklch(0.62 0.02 240)` | `#92989F` | Eyebrow text, captions, tertiary metadata |
| `--color-line` | `oklch(0.91 0.005 240)` | `#E2E5E8` | Hairline borders, dividers |
| `--color-line-strong` | `oklch(0.83 0.01 240)` | `#C9CDD4` | Button borders, focused dividers, ghost outlines |

## Visualization-only palette

These colours appear **inside product UI mock components** (in `components/visuals/`) where they encode clinical or operational semantics. They do **not** appear in marketing chrome.

| Token | Hex (approx) | Semantic |
|---|---|---|
| `--color-sunset` | `#F2A669` | Caries · overdue · warning · pilot status |
| `--color-sunset-deep` | `#D78550` | Sunset hover / emphasis |
| `--color-sea` | `#7DB4C0` | Filling · booked · live status · feature changelog entry |
| `--color-violet` | `#7559C4` | Crown · x-ray · AI / computed signal · architecture changelog entry |

If a future visualisation needs a new semantic colour, add it here — don't recycle a brand colour for semantic meaning, and don't introduce raw hex inline.

## Semantic role tokens

Components reference these semantic aliases. Updating the underlying brand colour here propagates everywhere automatically.

| Semantic | Resolves to | Use |
|---|---|---|
| `--color-bg` | `--color-canvas` | Page / surface background |
| `--color-text` | `--color-ink` | Primary text |
| `--color-text-muted` | `--color-ink-muted` | Body copy, descriptions |
| `--color-text-soft` | `--color-ink-soft` | Eyebrow, captions, footer text |
| `--color-border` | `--color-line` | Default borders |
| `--color-border-strong` | `--color-line-strong` | Emphasized borders, button outlines |
| `--color-accent` | `--color-tide` | Links, eyebrow accents, "see more →" links |
| `--color-accent-deep` | `--color-tide-deep` | Hover states, focus ring, button hover background |

## Pairings + accessibility

| Foreground | Background | Contrast ratio | OK? |
|---|---|---|---|
| `--color-ink` (navy) | `--color-canvas` (warm white) | ~12.5:1 | ✓ AAA |
| `--color-ink-muted` | `--color-canvas` | ~5.4:1 | ✓ AA body |
| `--color-ink-soft` | `--color-canvas` | ~3.3:1 | ✓ AA large text only — use for eyebrows, captions |
| `--color-canvas` | `--color-ink` (button text) | ~12.5:1 | ✓ AAA |
| `--color-tide-deep` | `--color-canvas` | ~5.0:1 | ✓ AA — use for accent body text and links |
| `--color-tide` | `--color-canvas` | ~3.0:1 | ⚠ — fine for chips, eyebrows, decorative; **not** for body text |

WCAG 2.2 minimum interactive target: **3:1**. Body text minimum: **4.5:1**. Text in `--color-ink-soft` should only be used at ≥ 18 px or bold.

## Rules

1. **No raw hex in components.** Always reference `var(--color-*)`. The audit rule `design.raw-color` catches violations.
2. **Brand colours don't carry semantic meaning in product visualisations.** A "navy fill" never means caries. Use the visualisation-only palette for clinical/operational state.
3. **Sunset is allowed in product visualisations only.** It does not appear in marketing chrome (no orange buttons, no orange highlights). The few exceptions where sunset escapes the visualisation layer (the small accent dots in workflow card bullets, the sunset chip in some integration status badges) are deliberate semantic links to the warmth of clinical UI — keep them rare.
4. **Dark mode is not implemented.** When it is, layer a `.dark` class on `<html>` that overrides every semantic role token. Do not derive dark from `prefers-color-scheme` — it is a deliberate user toggle.
