# Visuals Library

Reusable, brand-consistent React visualizations of oralstack's core product surfaces. Each visual is a **pure CSS/HTML React component** — no images, no external assets, no live data. They mirror the actual app UI (data shapes and visual hierarchy taken from the Dentologic codebase) but use Singapore-fictional names so nothing real ever leaks.

## Philosophy

- **Source of truth: the app codebase.** When a visual stops matching the real app, update the visual — don't let them diverge.
- **Pure CSS over screenshots.** Crisp at any size, no asset pipeline, no DPI issues, no risk of patient-data leakage.
- **Brand tokens only.** No raw hex outside this folder. All visuals consume `--color-*` and `--radius-*` tokens from `app/globals.css` so theming/dark-mode changes propagate automatically.
- **Unmistakably synthetic labels.** Every visual uses the same canonical demo-patient set (Demo patient 101–106) so cross-visual consistency reads as "same clinic" without resembling a real identity.

## Conventions

| Concern | Rule |
|---|---|
| File naming | `{Feature}Mock.tsx` (e.g. `ScheduleMock.tsx`) |
| Default export | The component |
| Container | Outer card: `rounded-[var(--radius-lg)] border bg-white p-4 sm:p-5 md:p-6 shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]` |
| Width | `max-w-[xxx]px` set on the outer card; sized to feel "real product UI" at ~360–560px |
| Header | Eyebrow on left (uppercase, `text-[var(--color-text-soft)]`), context (clinic / patient / count) on right |
| Footer | Single-line tag bar in soft text color, optional |
| Accessibility | Outer container has `role="img"` and a sentence-long `aria-label` describing what's depicted |
| Color palette | sunset = caries / overdue / sunset accent; sea = filling / booked / "live" state; violet = crown / xray / AI; neutrals = watch / contacted / line dividers |
| Data | Inline `const` arrays of typed objects, mirroring real app data shapes; never imported from a live source |

## Catalog

| Component | File | Source app surface | Default width | Use cases |
|---|---|---|---|---|
| `ScheduleMock` | [ScheduleMock.tsx](ScheduleMock.tsx) | `apps/app/app/(authenticated)/schedule/` | 560px | Hero on homepage; "Front desk" workflow section; case study schedule reference |
| `OdontogramMock` | [OdontogramMock.tsx](OdontogramMock.tsx) | `apps/app/app/(authenticated)/patients/[id]/` (dental-chart, odontogram, tooth-detail-panel) | 520px | "Charting & case notes" workflow section; case study charting visual |
| `CaseNoteParseMock` | [CaseNoteParseMock.tsx](CaseNoteParseMock.tsx) | `apps/app/app/(authenticated)/patients/[id]/` (case-note → chart + billing parser) | 560px | "Charting & case notes" workflow section; pairs naturally with `OdontogramMock` (note → chart shading); journey page Chair stage |
| `CheckoutMock` | [CheckoutMock.tsx](CheckoutMock.tsx) | `apps/app/app/(authenticated)/checkout/` (invoice editor, payment panel) | 480px | "Billing & discharge" workflow section; case study billing visual; journey page Discharge stage |
| `BeforeDiscoveryMock` | [BeforeDiscoveryMock.tsx](BeforeDiscoveryMock.tsx) | Legacy reality — handwritten attribution + ad-spend black box | 480px | Journey page Discovery stage "before" pane |
| `AfterDiscoveryMock` | [AfterDiscoveryMock.tsx](AfterDiscoveryMock.tsx) | Reviews & referrals dashboard — Google sync, referral-at-intake (live feature) | 480px | Journey page Discovery stage "after" pane |
| `BeforeBookingMock` | [BeforeBookingMock.tsx](BeforeBookingMock.tsx) | Legacy reality (paper diary + phone tag) — counterpart to `ScheduleMock` | 560px | Journey page Booking stage "before" pane |
| `BeforePreVisitMock` | [BeforePreVisitMock.tsx](BeforePreVisitMock.tsx) | Legacy reality — PDF intake queue + manual eligibility hold-ups | 480px | Journey page Pre-visit stage "before" pane |
| `AfterPreVisitMock` | [AfterPreVisitMock.tsx](AfterPreVisitMock.tsx) | WhatsApp Business intake link + form completion + tier resolved | 480px | Journey page Pre-visit stage "after" pane |
| `BeforeArrivalMock` | [BeforeArrivalMock.tsx](BeforeArrivalMock.tsx) | Legacy reality — sticky-note allergies on paper chart, manual eligibility verification at the desk | 480px | Journey page Arrival stage "before" pane |
| `AfterArrivalMock` | [AfterArrivalMock.tsx](AfterArrivalMock.tsx) | Arrival check-in card + medical alerts surfaced chairside + chair-ready countdown | 480px | Journey page Arrival stage "after" pane |
| `BeforeChairMock` | [BeforeChairMock.tsx](BeforeChairMock.tsx) | Legacy reality (form-led PMS modal + separate DICOM viewer) — counterpart to `CaseNoteParseMock` | 560px | Journey page Chair stage "before" pane |
| `BeforeDischargeMock` | [BeforeDischargeMock.tsx](BeforeDischargeMock.tsx) | Legacy reality (hand-corrected paper invoice + EOD reconciliation) — counterpart to `CheckoutMock` | 480px | Journey page Discharge stage "before" pane |
| `BeforeFollowUpMock` | [BeforeFollowUpMock.tsx](BeforeFollowUpMock.tsx) | Legacy reality — stale recall spreadsheet, personal-WhatsApp outreach — counterpart to `RecallMock` | 560px | Journey page Follow-up stage "before" pane |
| `ImagingMock` | [ImagingMock.tsx](ImagingMock.tsx) | `apps/app/app/(authenticated)/imaging/` (asset grid + categories) | 480px | "Clinical imaging" workflow section |
| `RecallMock` | [RecallMock.tsx](RecallMock.tsx) | `apps/app/app/(authenticated)/reminders/recall-table.tsx` | 560px | "Recall & messaging" workflow section; case study lifecycle visual |
| `MessagingMock` | [MessagingMock.tsx](MessagingMock.tsx) | `apps/app/app/(authenticated)/reminders/` + WhatsApp Business API | 440px | Patient communication / two-way messaging story; pairs naturally with `RecallMock` (queue → conversation) |
| `DicomViewerMock` | [DicomViewerMock.tsx](DicomViewerMock.tsx) | `apps/app/app/(authenticated)/imaging/` (v13 single-image viewer) | 520px | Imaging deep-view; pairs naturally with `ImagingMock` (grid → single image); v13 signature feature |
| `AnalyticsMock` | [AnalyticsMock.tsx](AnalyticsMock.tsx) | `apps/app/scripts/analyze:chairs` (chair utilisation analysis) | 540px | Operational reporting / chair utilisation story; standalone for an `/analytics` or operations workflow surface |

## Where each visual is currently used

| Visual | Pages |
|---|---|
| `ScheduleMock` | `/` (Hero), `/workflows#front-desk`, `/customers/dfi-synergy` |
| `OdontogramMock` | `/workflows#charting`, `/customers/dfi-synergy`, `/` (homepage Workflows card) |
| `CaseNoteParseMock` | `/workflows#charting` (paired with `OdontogramMock`); `/journey` (Chair stage) |
| `CheckoutMock` | `/workflows#billing`, `/customers/dfi-synergy`, `/` (homepage Workflows card); `/journey` (Discharge stage) |
| `ScheduleMock` (re-use) | adds `/journey` (Booking stage) |
| `RecallMock` (re-use) | adds `/journey` (Follow-up stage) |
| `BeforeDiscoveryMock` / `AfterDiscoveryMock` | `/journey` (Discovery stage) |
| `BeforeBookingMock` | `/journey` (Booking stage, before pane) |
| `BeforePreVisitMock` / `AfterPreVisitMock` | `/journey` (Pre-visit stage) |
| `BeforeArrivalMock` / `AfterArrivalMock` | `/journey` (Arrival stage) |
| `BeforeChairMock` | `/journey` (Chair stage, before pane) |
| `BeforeDischargeMock` | `/journey` (Discharge stage, before pane) |
| `BeforeFollowUpMock` | `/journey` (Follow-up stage, before pane) |
| `ImagingMock` | `/workflows#imaging`, `/` (homepage Workflows card) |
| `RecallMock` | `/workflows#recall`, `/customers/dfi-synergy` |
| `MessagingMock` | `/workflows#recall` (paired with `RecallMock`) |
| `DicomViewerMock` | `/workflows#imaging` (paired with `ImagingMock`) |
| `AnalyticsMock` | `/workflows#operations` (anchors the Operations & analytics section) |

## How to add a new visual

1. **Recon the source app surface.** Open the matching route under `apps/app/app/`. Note the data shape, distinctive UI elements, color cues. Don't guess — match what's there.
2. **Create the file** `components/visuals/{Name}Mock.tsx`.
3. **Match the conventions table above** — outer card classes, `role="img"`, brand tokens only.
4. **Use the canonical demo-patient labels** (Demo patient 101–106) for cross-visual consistency. Use Provider A/B/C for clinicians and `.invalid` addresses or `+65 0000 0000` where contact detail is unavoidable.
5. **Add an entry** to the Catalog and Where-used tables in this README.
6. **Add to the dev catalog page** at `/dev/visuals` (`app/dev/visuals/page.tsx`) so it shows up in visual review.
7. **Use it.** Import from `@/components/visuals/{Name}Mock`.

## Future visuals to build (TODO)

- **InsuranceClaimMock** — claim form with line splits between insurer and patient (Singapore TPAs / HSA / Medisave)
- **OnboardingWizardMock** — clinic provisioning flow (covers tenancy work; would support `/security` or a future `/onboarding` story)
- **AuditLogMock** — audit-log table with row-level events, useful for the `/security` page
- **NewPatientFormMock** — the inline new-patient registration form (mirrors the retired Plato booking form)
- **DashboardMock** — at-a-glance owner dashboard (today's revenue, chair utilisation summary, recall count, outstanding A/R)

## Reviewing visuals

The `/dev/visuals` route renders all visuals on one page for at-a-glance local review.
It is removed from the production export, so use the localhost URL only.

Run `npm run dev` and open <http://localhost:3000/dev/visuals> to view.
