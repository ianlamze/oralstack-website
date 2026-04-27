# Roadmap copy: online bookings + auto-surfacing free slots

**Status:** drafted 2026-04-28, not yet shipped — do not import into live content until both features are live in product. When ready, lift the snippets below into the indicated files verbatim and delete this doc.

**Assumptions baked in (flip before publishing if wrong):**

1. **Patient-facing booking link is white-labelled to the clinic** (e.g. `bookings.dfisynergy.com`, or a clinic subdomain on `oralstack.app` if a custom DNS isn't possible). This protects the DFI-Synergy-arms-length framing and reads as a clinic feature rather than a marketplace.
2. **Auto-slot surfacing accepts: procedure type, duration, provider, earliest/latest acceptable date.** Returns the next N available slots ranked by earliest. Surfaces both for staff (inside `/schedule/new`) and for patients (in the booking link).
3. **Competitor cells in the comparison rows below need verification** — I've written what I believe is broadly true, but check each vendor's current module list before publishing.

---

## 1. Add a new bullet to the existing front-desk workflow

**File:** `content/workflows-detailed.ts` — workflow with `slug: "front-desk"`.

Insert as the third bullet (after the multi-chair layout bullet, before the recall-candidates bullet):

```
"Open slots surface automatically — type 'endo, 60 min, Dr. Lim' and see the next three available, no week-by-week clicking",
```

No change to the title, body, or `replaces` line for this workflow — the auto-slot feature is an enhancement of the existing "front desk drives the schedule" story, not a new story.

---

## 2. Add a new workflow card (homepage)

**File:** `content/workflows.ts` — append to the `workflows` array.

```ts
{
  slug: "online-bookings",
  eyebrow: "Online bookings",
  title: "Patients book the slot the schedule actually has open.",
},
```

Order: place fifth (after `imaging`), so the four current cards stay paired the way they are today and online bookings reads as the new addition.

---

## 3. Add the matching workflow detail

**File:** `content/workflows-detailed.ts` — append to the `workflowsDetailed` array (or place between `imaging` and `recall` to keep the schedule-adjacent story together).

```ts
{
  slug: "online-bookings",
  eyebrow: "Online bookings",
  title: "Patients book the slot the schedule actually has open.",
  body: "A clinic-branded link the patient opens on their phone. The system shows only slots that fit the procedure, the duration, and the provider — so the front desk doesn't field a callback to reshuffle, and a patient can't claim a slot the chair doesn't actually have free.",
  bullets: [
    "Clinic-branded booking link — patient sees the clinic, not Oralstack",
    "Slot filter: procedure, duration, provider, preferred window — only fitting slots are shown",
    "Bookings commit straight into the front-desk schedule, timezone-correct, no double-bookings",
    "Recall messages link to the booking page — overdue patients self-serve into the next open slot",
  ],
  replaces:
    'Phone-tree appointment hunting · "let me check Tuesday… no? Wednesday?" · WhatsApp back-and-forth to settle a time',
  articleSlug: "reducing-no-show-rates",
},
```

The `articleSlug` link is intentional — recall and online bookings are the same revenue-leak story, and the existing reducing-no-show-rates article is where this lands naturally.

---

## 4. Comparison-page rows (all four files)

**Files:** `content/comparisons/plato.ts`, `dentrix.ts`, `eaglesoft.ts`, `carestream.ts`.

Add **two new rows** to each `rows` array, ideally placed right after the existing `"Schedule UX"` row so the scheduling story stays grouped.

### Row A — Find next available slot

| File | them | us |
|---|---|---|
| **plato.ts** | `"Click through weeks in the calendar window to find an opening. No filter for procedure, duration, or provider."` | `"Type 'endo, 60 min, Dr. Lim' and see the next three available openings ranked by earliest. One query, no week-by-week clicking."` |
| **dentrix.ts** | `"Calendar grid with limited filtering. Finding the next slot for a specific procedure + provider is a manual scan."` | (same as plato.ts `us`) |
| **eaglesoft.ts** | `"Calendar grid scan. Filter capability is limited and varies by version."` | (same as plato.ts `us`) |
| **carestream.ts** | `"Calendar grid scan; provider/procedure filtering varies by deployment."` | (same as plato.ts `us`) |

### Row B — Patient self-booking

| File | them | us |
|---|---|---|
| **plato.ts** | `"None native. Patients call or WhatsApp the clinic; staff books from the call."` | `"Clinic-branded booking link. Only slots that fit the procedure and provider show up — patients self-serve into the next open slot, commits straight into the schedule."` |
| **dentrix.ts** | `"Self-booking via separate add-on module (e.g. Dentrix Online Booking) — extra cost, extra integration."` | (same as plato.ts `us`) |
| **eaglesoft.ts** | `"Self-booking via separate add-on or third-party integration."` | (same as plato.ts `us`) |
| **carestream.ts** | `"Self-booking via separate add-on or third-party integration."` | (same as plato.ts `us`) |

**One caveat to verify before publishing:** Dentrix, Eaglesoft, and Carestream all have evolving online-booking offerings — confirm the current module status before claiming "separate add-on" is still accurate. If a vendor has rolled it into the base product, soften to `"via included online-booking module; configuration is per-installation."`

---

## 5. Optional: a fourth `reasons` block on each comparison page

The existing `reasons` arrays each carry three entries (drag-driven · discharge-flow billing · DICOM-in-chart). When online bookings ships, a fourth entry pulls its weight on at least the Plato page:

```ts
{
  eyebrow: "Why we built differently · 4",
  title: "Self-booking and the schedule are the same system, not two integrations.",
  body: "When patient self-booking lives in a separate module, slots get claimed twice, the front desk has to reconcile, and the patient hears 'sorry, that's not actually open.' Oralstack's booking link reads from the same schedule the front desk drives — the slot the patient sees is the slot the chair has, and the booking commits straight in, timezone-correct.",
},
```

Skip this for the US-legacy comparisons (Dentrix/Eaglesoft/Carestream) unless the page already feels thin — three reasons still does the job there.

---

## 6. Homepage visual (out of scope for this doc, flag for design)

The current homepage hero shows a 3-chair schedule mock. When online bookings ships, the strongest visual move is a paired second mock showing the auto-slot surface — something like:

```
Find next available
─────────────────────
Endo · 60 min · Dr. Lim · earliest

  Tue 30 Apr  10:00  → Chair 2
  Wed 01 May  14:00  → Chair 1
  Thu 02 May  09:00  → Chair 3
```

This pairs the two features as one visual story ("the schedule books itself") without requiring new headline copy.
