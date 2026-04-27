---
id: ADD_VISUALIZATION_V1
kind: playbook
triggers:
  - add a new visualization
  - create a new product mock
  - add to the visuals library
  - build a mock for {feature}
---

# Add a visualization

Add a new product-UI visualisation to [`components/visuals/`](../../components/visuals/). Conventions are enforced by the library README; do not break them.

## Required inputs

- **Feature name** the visual represents (e.g. "treatment plan", "audit log")
- **Source app surface** in the Dentologic codebase (route or component path)
- **Default width** (typically 360–560 px, sized to feel like real product UI)
- **Intended placement** (which page section it lands in, or `dev/visuals` only)

## Pre-reading

1. [`research/primitives/visuals.md`](../primitives/visuals.md) — primitive overview
2. [`components/visuals/README.md`](../../components/visuals/README.md) — full conventions, catalog, how-to-extend
3. The actual source app surface — open the matching file in `apps/app/app/(authenticated)/...` and note the data shape, distinctive UI elements, color cues. **Don't guess at the data shape.** Real component recon is required.

## Steps

1. Create `components/visuals/{Name}Mock.tsx` matching conventions:
   - Outer card: `rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)] max-w-[XXXpx]`
   - `role="img"` on the outer container with a sentence-long descriptive `aria-label`
   - Header row: eyebrow (uppercase soft text) on left, context (clinic/patient/count) on right
   - Body using brand tokens only (no raw hex)
   - Singapore-fictional canonical patient names: Lim Wei Jian, Devi Krishnan, Aaron Teo, Mei Lin Tan, Hafiz Yusof
   - Optional footer caption in soft text

2. Use the right colour cues per semantic intent:
   - `--color-sunset` → caries / overdue / warning / pilot
   - `--color-sea` → filling / booked / live status
   - `--color-violet` → crown / x-ray / AI / computed
   - `--color-tide` → brand accent (for buttons / links inside the mock, not for semantic state)
   - Neutral via `--color-ink-*` and `--color-line` tokens

3. Update [`components/visuals/README.md`](../../components/visuals/README.md):
   - Add a row to the Catalog table (Component / file / source app surface / default width / use cases)
   - Add a row to the "Where each visual is currently used" table
   - Remove from the TODO list at the bottom if it was listed there
   - Add to TODO list any follow-on visuals this surfaces

4. Add the visual to [`app/dev/visuals/page.tsx`](../../app/dev/visuals/page.tsx) so it shows in the internal catalog:
   ```tsx
   {
     name: "{Name}Mock",
     file: "components/visuals/{Name}Mock.tsx",
     source: "apps/app/app/(authenticated)/...",
     used: ["..."],  // production pages it's used on, or "(not yet wired)" if pending
     Component: {Name}Mock,
   },
   ```

5. (Optional) Wire into a production page. Pattern: import in the page file, render with appropriate sizing wrapper. See [`app/workflows/page.tsx`](../../app/workflows/page.tsx) for the multi-visual-per-section pattern.

6. Run `npm run build` — TypeScript compilation will catch mistakes.

7. Verify at `/dev/visuals` that the visual renders correctly side-by-side with the others.

8. Redeploy if wired into a production page.

## Validation

- Outer container has `role="img"` and a descriptive `aria-label`
- No raw hex anywhere in the file (only `var(--color-*)` and `color-mix(...)`)
- Singapore-fictional names used (no "Patient A" or "John Doe")
- Outer card classes match the convention
- Catalog table updated
- `/dev/visuals` shows the new entry
- Build passes

## Output

- Component created at `components/visuals/{Name}Mock.tsx`
- Catalog README updated
- Dev catalog page updated
- Production page(s) updated (if wired)
- Build + deploy status
