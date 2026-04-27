---
id: ADD_CHANGELOG_ENTRY_V1
kind: playbook
triggers:
  - add a changelog entry
  - log a feature shipped
  - log a fix
  - log a pilot milestone
---

# Add a changelog entry

The runtime changelog at [`/changelog`](https://oralstack.com/changelog/) is generated from [`content/changelog.ts`](../../content/changelog.ts). This is the **public-facing** changelog — what customers and prospects see. For internal engineering history, use the root-level [`CHANGES.md`](../../CHANGES.md) instead.

## Required inputs

- ISO date (`YYYY-MM-DD`)
- Type — one of `Feature` / `Fix` / `Architecture` / `Pilot` / `Branch` / `Compliance` / `Sweep`
- Title — one short sentence (under ~12 words)
- Body — 1–3 sentences in Oralstack copy voice

## Steps

1. Open [`content/changelog.ts`](../../content/changelog.ts).
2. Add a new entry **at the top of the array** (latest-first ordering — the page renders the array in order).
3. Pick the type from the existing union — don't introduce a new type without a reason. The styles map in [`app/changelog/page.tsx`](../../app/changelog/page.tsx) only colours the existing types.
4. Body should pass [`research/primitives/copy-voice.md`](../primitives/copy-voice.md) — dental-specific where relevant, no banned phrases, no unsupported claims.
5. Run `npm run build` to verify.
6. Redeploy via the `redeploy` playbook so the entry appears on the public site.

## Validation

- Date in `YYYY-MM-DD` ISO format
- Type matches the existing enum exactly
- Title under ~12 words, sentence case
- Body under ~50 words
- Build passes

## Convention reminders

- Latest entries first
- Each entry stands alone — don't reference "yesterday's release" because order can change
- Pilot milestones (e.g. "X clinic now live") use type `Pilot`
- Internal architecture changes that affect the product story use `Architecture`; pure-internal refactors don't go here (use `CHANGES.md` instead)

## Output

- One line added to `content/changelog.ts`
- Build status
- Redeploy URL
