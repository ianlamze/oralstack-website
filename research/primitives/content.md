---
id: CONTENT_PRIMITIVE_V1
kind: primitive
type: content
---

# Content Primitive

Sources of truth for all editable content. Components import from `content/*.ts` — do not put copy in JSX.

## Files in v1

| File | What it holds |
|---|---|
| `content/site-meta.ts` | site title, description, canonical URL — drives `<head>` metadata |
| `content/workflows.ts` | 4 workflow blocks (front desk, billing, charting, imaging) — used by the `Workflows` section |

## Files to add later

| File | What it will hold | Trigger to populate |
|---|---|---|
| `content/customers.ts` | customer name, location, status (live / pilot) | once a clinic agrees to be named |
| `content/testimonials.ts` | named quote + role + clinic | once a quote is written and approved |
| `content/pricing.ts` | tier name + starting price + feature bullets | once positioning is locked |

## Editing rules

- Edit copy in `content/*.ts`, not in `components/*.tsx`.
- Run the copy through `research/primitives/copy-voice.md` before merging.
- Numbers in copy must be defensible. If a stat is aspirational, qualify it ("designed to support", "built for") or omit it.
