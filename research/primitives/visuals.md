---
id: VISUALS_LIBRARY_V1
kind: primitive
type: design
---

# Visuals Library

The oralstack website has a dedicated, documented library of product visualizations at [`components/visuals/`](../../components/visuals/). All product UI mockups across the site come from this library. **Do not create one-off product mocks elsewhere — extend the library instead.**

## What's in it

5 React components, each a pure CSS/HTML rendering of a real product surface in the Dentologic app:

- **ScheduleMock** — day schedule (3 chairs × 9 hours, color-coded appointments)
- **OdontogramMock** — patient chart (FDI teeth, surface conditions, tooth detail panel)
- **CheckoutMock** — discharge billing (line items, GST, payment modes)
- **ImagingMock** — imaging asset grid (CSS-rendered radiograph + photo + PDF thumbnails)
- **RecallMock** — recall queue (overdue patients with status pills)

## Source of truth

Each visual mirrors a real surface in `apps/app/app/(authenticated)/`. The mapping is documented in [`components/visuals/README.md`](../../components/visuals/README.md). When the real app changes, update the matching visual.

## Conventions (enforced)

- Pure CSS/HTML — no images, no external assets
- Brand tokens only (`--color-*`, `--radius-*`) — no raw hex inside visual components
- Singapore-fictional canonical patient names: Lim Wei Jian, Devi Krishnan, Aaron Teo, Mei Lin Tan, Hafiz Yusof (consistent across visuals so they read as "same clinic")
- `role="img"` + descriptive `aria-label` on each outer container
- Outer card pattern: rounded `--radius-lg`, white bg, subtle shadow, sized via `max-w-[xxx]px`
- Data shapes mirror real app schemas (condition codes, FDI numbering, payment modes, etc.)

## Internal review surface

[`/dev/visuals`](../../app/dev/visuals/page.tsx) renders every visual side-by-side with file path, source-app-surface reference, and "used on" pages. Marked `noindex`, not in sitemap, not linked from production pages. Use it for design review.

## How to extend

See the "How to add a new visual" section in [`components/visuals/README.md`](../../components/visuals/README.md). Steps:

1. Recon the source app surface (don't guess at the data shape)
2. Create `components/visuals/{Name}Mock.tsx` matching conventions
3. Update the README catalog table
4. Add to `app/dev/visuals/page.tsx`
5. Use it on production pages

## TODO list (next visuals to build)

Documented at the bottom of [`components/visuals/README.md`](../../components/visuals/README.md):
- MessagingMock (WhatsApp two-way conversation)
- DicomViewerMock (single-image viewer with annotation tools — v13 signature)
- InsuranceClaimMock
- AnalyticsMock
- OnboardingWizardMock

## Why a library and not just one-off components

The visuals are reused across 4+ pages already (homepage, /workflows, case study, /dev/visuals). Without the library, every page would have its own near-duplicate of the schedule, billing, etc. — and they would drift. The library makes "show the schedule" a one-line import everywhere it's needed, and a single-file edit when the schedule UI evolves.
