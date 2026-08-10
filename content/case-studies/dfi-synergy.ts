import type { CaseStudy } from "@/content/case-studies/types";

export const dfiSynergy: CaseStudy = {
  slug: "dfi-synergy",
  customerId: "dfi-synergy",

  eyebrow: "Historical customer story · Plato-connected workflow pilot · April 2026 · Singapore",
  title: "How DFI Synergy moved its front-desk workflow into Oralstack in three days.",
  outcome:
    "A three-chair, four-provider clinic in Singapore piloted Oralstack's appointment, reception, and reviewed checkout workflows through a Plato-connected deployment.",

  profile: {
    location: "Singapore",
    chairs: 3,
    providers: 4,
    specialty: "General dentistry + hygiene",
    pilotStart: "April 2026",
    inProduction: ["Appointments", "Reception", "Reviewed checkout"],
    notYet: ["DICOM/device imaging", "Automated WhatsApp recall", "Public self-booking"],
  },

  pullQuoteHero: {
    quote:
      "We used to book on WhatsApp and a paper diary. Now we don't reschedule without it being on the schedule, and the bill is ready before the patient stands up.",
    attribution: "Practice manager, DFI Synergy",
  },

  pullQuoteMid: {
    quote:
      "The drag-to-reschedule was the moment it clicked. We could move a patient while keeping the day visible to the rest of the front desk.",
    attribution: "Clinical director, DFI Synergy",
  },

  sections: [
    {
      heading: "The situation",
      paragraphs: [
        "DFI Synergy ran a busy general + hygiene practice on a paper diary, supplemented by WhatsApp confirmations and a separate billing spreadsheet. The setup worked when the clinic was smaller — but as appointment volume grew, three problems became routine.",
      ],
      bullets: [
        "Reschedules made on WhatsApp didn't always reach the diary in real time, occasionally producing double bookings.",
        "Billing was reconciled at end-of-day. The same-day-bill rate sat at 60%; the rest were follow-ups that cost staff time and aged into receivables.",
        "Recall outreach was manual. Patients due for hygiene at six months were tracked in a spreadsheet that nobody updated consistently.",
      ],
    },
    {
      heading: "Why Oralstack",
      paragraphs: [
        "DFI Synergy evaluated three options to replace the paper-and-WhatsApp setup: continue with Plato (the dominant Singapore PMS), Open Dental, or Oralstack. The shortlist came down to two requirements neither legacy option met cleanly.",
        "The first was a schedule and reception view the front desk could work from throughout the day. The second was a reviewed checkout flow that kept billable lines, payer estimates, payment recording, and receipts together while preserving the Plato connection boundary.",
        "Oralstack was chosen on a third factor as well: APAC region hosting and a tenant-isolated data model. The clinic agreed to a focused, Plato-connected front-desk pilot. This case study does not claim a standalone deployment or that every legacy record and native PMS workflow moved into Oralstack.",
      ],
    },
    {
      heading: "What ran in the pilot",
      paragraphs: [
        "The initial Plato-connected pilot focused on the staff-facing clinic day and checkout hand-off.",
      ],
      bullets: [
        "Appointments — a shared provider schedule with staff booking and rescheduling.",
        "Reception — arrival, queue, chair hand-off, and checkout status in one workboard.",
        "Checkout — staff-reviewed line items, payer estimates, payment recording, and receipts.",
        "Patient context — directory access and a unified folder for visits, billing, and clinical work.",
      ],
    },
    {
      heading: "What's next",
      paragraphs: [
        "DICOM/device ingest, automated WhatsApp recall, and other controlled rollouts were not included. This connected workflow pilot is not evidence of a standalone clinic-system cutover.",
      ],
    },
  ],

  methodology:
    "Same-day billing rate is the share of completed visits where the bill was settled in full before the patient left the chair, measured weekly from Oralstack's discharge-flow billing log against the visit's discharge timestamp. Pre-pilot baseline (60%) was taken from DFI Synergy's prior end-of-day reconciliation reports for Q1 2026, normalised to the same definition. Week-4 measurement (85%) is the trailing 14-day rolling average through the end of the fourth pilot week. Drag-to-reschedule operations are counted from the audit log (entries of type schedule_drag_committed). Cutover days are calendar days from kickoff to the schedule running for live patient traffic without a fallback paper diary running in parallel. Lost-appointment count is reconciled from the patient list at cutover against the first 30 days of bookings.",
  stats: [
    {
      value: "3 days",
      label: "From kickoff to front desk live on Oralstack — schedule and billing.",
      qualifier: "Apr 2026",
    },
    {
      value: "0",
      label: "Appointments lost in the transition from the paper diary.",
      qualifier: "Apr 2026 transition window",
    },
    {
      value: "120+",
      label: "Drag-to-reschedule operations completed in week three alone.",
      qualifier: "Pilot week 3",
    },
    {
      value: "85%",
      label: "Same-day billing rate at week four, up from 60% pre-Oralstack.",
      qualifier: "Pre-pilot vs week 4",
    },
  ],
};
