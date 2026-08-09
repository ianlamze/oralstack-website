import type { Comparison } from "./types";

export const plato: Comparison = {
  slug: "plato",
  competitor: "Plato",
  metaTitle: "Oralstack vs Plato",
  metaDescription:
    "An honest, side-by-side comparison of Oralstack and Plato for Singapore dental clinics — deployment, schedule UX, charting, imaging, billing, recall, and where each is the right call.",
  indexOneLine: "Cloud-native vs on-prem Windows desktop, for Singapore practices.",
  indexBlurb:
    "Plato is the dominant Singapore PMS — reliable, familiar, two decades old. The comparison covers schedule UX, billing, imaging, and the three-week migration path.",
  pageTitle: "Oralstack vs Plato.",
  lede: "Plato has been the dominant practice management system in Singapore for two decades. It is reliable, familiar, and Singapore-fit. It is also a Windows desktop client built around the front-desk PC. Oralstack was built differently — for the schedule the front desk drives, the bill that's ready before the patient stands up, and the DICOM that lives inside the chart. Here's what changes, line by line.",
  lastReviewed: "April 2026",
  rows: [
    {
      capability: "Deployment",
      them: "Windows desktop client installed on each workstation. Front-desk PC is the source of truth.",
      us: "Browser-based on any device. Region-hosted in Singapore (asia-southeast1) with tenant isolation.",
    },
    {
      capability: "Schedule UX",
      them: "Form-based booking. Reschedules typically require open-edit-save through dialog windows.",
      us: "Drag-driven. Move a 10:00 to 14:00 in three seconds; commits are timezone-correct on reload.",
    },
    {
      capability: "Find next available slot",
      them: "Calendar grid with slot rules; finding next available for a specific procedure + provider is a manual scan.",
      us: "Type 'endo, 60 min, Provider B' and see the next three openings ranked by earliest. One query, no calendar scanning.",
    },
    {
      capability: "Patient self-booking",
      them: "Native online booking on the on-prem product — the booking page syncs back to the clinic's Plato server.",
      us: "Included in the base price. Bookings commit straight into the same schedule the front desk drives — no sync layer.",
    },
    {
      capability: "Charting",
      them: "FDI numbering with free-text clinical notes per visit.",
      us: "FDI numbering with surface-specific notes (M/D/B/L/O) and per-procedure templates editable per visit.",
    },
    {
      capability: "Billing",
      them: "End-of-day reconciliation is common. Treatment lines re-entered manually from the chart.",
      us: "Discharge-flow billing. Treatment lines pull from the chart automatically; insurance and patient portion stay structurally separate.",
    },
    {
      capability: "Imaging",
      them: "Separate desktop apps per sensor brand. Radiographs live in folders outside the chart.",
      us: "DICOM viewer inside the patient chart. Sensor-bridge integration captures chairside imagery to the visit (Carestream, Dexis, Sopro, Schick).",
    },
    {
      capability: "Recall & messaging",
      them: "Manual recall list maintenance, often a separate spreadsheet. Outreach via personal phones or WhatsApp.",
      us: "Recall candidates surface three weeks before due, sorted by recall age. WhatsApp Business API templated messaging, audit-logged.",
    },
    {
      capability: "Multi-clinic",
      them: "One install per clinic. Multi-location requires separate logins and reconciled reporting.",
      us: "Tenant-isolated SaaS. Multi-clinic owners see all locations under one login, with row-level data separation per clinic.",
    },
    {
      capability: "Off-site access",
      them: "Limited to remote desktop into the clinic PC, or unavailable.",
      us: "Browser, any device. Owner can check today's schedule and revenue from anywhere.",
    },
    {
      capability: "Hosting & data residency",
      them: "On-premise on the clinic's hardware. Backups are the clinic's responsibility.",
      us: "Singapore region (asia-southeast1) on Google Cloud. Tenant-isolated, audit-logged, daily backups, PDPA-aware by design.",
    },
    {
      capability: "Updates",
      them: "Manual upgrades. Different clinics often run different versions for months at a time.",
      us: "Continuous deployment. Every clinic is on the same version every week.",
    },
    {
      capability: "Pricing model",
      them: "License + maintenance. Costs scale with seats and modules.",
      us: "Flat $200 / clinic / month during pilot. No per-seat or per-feature charges. Three months of hands-on onboarding included.",
    },
  ],
  reasons: [
    {
      eyebrow: "Why we built differently · 1",
      title: "Drag-driven beats form-based at the front desk.",
      body: "A 3-second reschedule on a busy day is the difference between fielding the next patient call and putting them on hold. We built the schedule as a thing the front desk drives all day, not a thing they consult through forms. Reschedules commit timezone-correct so they don't drift on reload, and provider columns render dynamically as you add chairs.",
    },
    {
      eyebrow: "Why we built differently · 2",
      title: "Discharge-flow billing beats end-of-day reconciliation.",
      body: "The highest-conversion moment in dentistry is at the chair, immediately after treatment — the patient is there, the work is done, they want to pay and go. End-of-day reconciliation breaks that moment into two transactions across two days. Oralstack pulls treatment lines from the chart automatically, splits insurance from patient portion, and audit-logs every adjustment, so the bill is ready before the patient stands up.",
    },
    {
      eyebrow: "Why we built differently · 3",
      title: "DICOM in the chart beats parallel desktop apps.",
      body: "If the radiograph lives in a folder on a separate desktop, every imaging review is a context switch. Oralstack runs the DICOM viewer inside the patient chart, with sensor-bridge integration for chairside capture across Carestream, Dexis, Sopro, and Schick. Open the chart, see the radiograph; review the radiograph, see the chart.",
    },
    {
      eyebrow: "Why we built differently · 4",
      title: "Self-booking and the schedule are the same system, not two integrations.",
      body: "When the booking page syncs from a separate portal back to the clinic server, slot ownership gets fuzzy: the patient claims one, the front desk claims another, the chair has neither. Oralstack's booking page and the front-desk schedule are the same system. The slot the patient sees is the slot the chair has, and the booking commits straight in, timezone-correct.",
    },
  ],
  concession: {
    title: "Where Plato is the right call",
    intro: "We're not the right answer for every clinic.",
    bullets: [
      "Twenty years of front-desk muscle memory is real. If your team is productive on Plato and you don't have a workflow problem, changing PMS will cost more than it gains.",
      "If you don't need cloud access, multi-device, or multi-clinic consolidation, on-prem is fine.",
      "Plato has a Singapore presence stretching back to the 1990s. That track record is meaningful for risk-averse clinic owners.",
    ],
  },
  cta: {
    title: "See it on your clinic's data.",
    body: "A 30-minute walkthrough on a sample dataset that mirrors a typical Singapore practice. We'll show what changes day-one and what the three-week migration looks like.",
    sideLink: {
      label: "Read the migration playbook →",
      href: "/articles/plato-to-cloud-migration",
    },
  },
};
