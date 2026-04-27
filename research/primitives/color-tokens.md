---
id: COLOR_TOKENS_V1
kind: primitive
type: design
---

# Color Tokens

Defined in `app/globals.css` via Tailwind 4 `@theme`. Components consume **semantic** roles, not raw values.

## Layered model

raw → semantic → component (when component-specific tokens are added later)

## Raw palette (preserved from Dentologic)

| Token | Value | Notes |
|---|---|---|
| `--color-canvas` | `oklch(0.99 0.005 90)` | warm near-white background |
| `--color-canvas-tinted` | `oklch(0.97 0.01 60)` | subtle peach-tinted surface |
| `--color-ink` | `oklch(0.18 0.02 250)` | deep cool gray, primary text |
| `--color-ink-muted` | `oklch(0.45 0.02 250)` | secondary text |
| `--color-ink-soft` | `oklch(0.62 0.02 250)` | tertiary / eyebrow text |
| `--color-line` | `oklch(0.92 0.005 250)` | hairline borders |
| `--color-line-strong` | `oklch(0.84 0.01 250)` | button borders, focused dividers |
| `--color-sunset` | `oklch(0.78 0.14 50)` | warm peach accent |
| `--color-sunset-deep` | `oklch(0.66 0.16 40)` | accent hover/active |
| `--color-violet` | `oklch(0.55 0.18 290)` | AI / computed signal |
| `--color-sea` | `oklch(0.72 0.10 200)` | secondary state, focus ring |

## Semantic roles

| Role | Source |
|---|---|
| `--color-bg` | `--color-canvas` |
| `--color-text` | `--color-ink` |
| `--color-text-muted` | `--color-ink-muted` |
| `--color-text-soft` | `--color-ink-soft` |
| `--color-border` | `--color-line` |
| `--color-border-strong` | `--color-line-strong` |
| `--color-accent` | `--color-sunset` |
| `--color-accent-deep` | `--color-sunset-deep` |

## Accessibility

- Body text on canvas: contrast ratio target ≥ 4.5:1. Verify when palette changes.
- Interactive borders / focus ring: ≥ 3:1.
- Never use color alone to communicate state — pair with text, icon, or border.

## Dark mode

Not implemented in v1. When added: layer a `.dark` class on `<html>` that overrides every semantic token. Do not derive dark from `prefers-color-scheme` — make it a deliberate user toggle (matches the Dentologic app decision).
