---
id: EDIT_CASE_STUDY_V1
kind: playbook
triggers:
  - edit a case study
  - update DFI Synergy quotes
  - change a stat in the case study
  - rewrite a case study section
---

# Edit a case study

## Required inputs

- Case study slug (currently only `dfi-synergy`)
- What changed (which fields, which sections)
- Whether numbers are now real / measured (matters for confidence framing)

## Steps

1. Read [`research/primitives/copy-voice.md`](../primitives/copy-voice.md) and confirm any new prose passes the banned-phrase list.
2. Read [`research/primitives/brand-identity.md`](../primitives/brand-identity.md) and the [DFI Synergy framing memory](file:///Users/ianlam/.claude/projects/-Users-ianlam-Documents-Agent-Projects-Dentologic/memory/project_dfi_synergy_framing.md). **Hard rule:** no operator-founder framing. No "built where it ships", "our own clinic", "design partner". Quotes attributed to roles only ("Practice manager, DFI Synergy" / "Clinical director, DFI Synergy"), never "Founder, DFI Synergy & Oralstack".
3. Edit `content/case-studies/{slug}.ts` — data only. The component layer rarely needs touching.
4. If the change introduces a new section structure (e.g. an extra body section between the existing four), the matching `app/customers/{slug}/page.tsx` may need a section index bump (`study.sections.slice(0, 2)` etc.). Check before saving.
5. If you're updating stats, decide qualifier text:
   - `Apr 2026` / `Pilot week 3` etc. — for measured numbers
   - drop the qualifier entirely if you're confident the number stands without it
   - never use "Illustrative" — we removed that framing deliberately
6. Run `npm run build` to verify no TypeScript regressions.
7. If the change is significant (new section, new quote, materially different stat), redeploy via the `redeploy` playbook.

## Validation

- Build passes
- No banned phrases (run `npm run dl:audit:copy` if/when wired into oralstack)
- Quote attribution still by role, never by named individual without explicit permission
- Numbers are defensible — either real measured, or qualified with timeframe
- The DFI Synergy framing rule still holds — no implication of operator-founder relationship

## Output

- Files changed (always at least `content/case-studies/{slug}.ts`)
- Whether the change requires a redeploy
- Build status
