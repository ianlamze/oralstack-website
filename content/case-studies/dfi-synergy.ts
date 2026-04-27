import type { CaseStudy } from "@/content/case-studies/types";

export const dfiSynergy: CaseStudy = {
  slug: "dfi-synergy",
  customerId: "dfi-synergy",

  eyebrow: "Customer story · Pilot · Singapore",
  title: "How DFI Synergy moved their front desk into Oralstack in three weeks.",
  outcome:
    "A three-chair, four-provider clinic in Singapore replaced a paper diary and WhatsApp-led rescheduling with Oralstack's drag-driven schedule and discharge-flow billing — with no migration downtime and no fallback diary in parallel.",

  profile: {
    location: "Singapore",
    chairs: 3,
    providers: 4,
    specialty: "General dentistry + hygiene",
    pilotStart: "April 2026",
    inProduction: ["Scheduling", "Billing", "Charting", "Recall"],
    notYet: ["Imaging (v13 rollout)", "Patient portal", "WhatsApp recall templates"],
  },

  pullQuoteHero: {
    quote:
      "We used to book on WhatsApp and a paper diary. Now we don't reschedule without it being on the schedule, and the bill is ready before the patient stands up.",
    attribution: "Practice manager, DFI Synergy",
  },

  pullQuoteMid: {
    quote:
      "The drag-to-reschedule was the moment it clicked. We move a patient from 10:00 to 14:00 in three seconds, and the confirmation message goes out before they've hung up the phone.",
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
        "The first was a schedule the front desk could drive in seconds, not consult through forms — drag-to-reschedule with timezone-correct commits, inline new-patient registration, recall candidates surfaced before they aged. The second was billing tied to the chart so treatment lines populated themselves at discharge, with insurance and patient portion structurally separate.",
        "Oralstack was chosen on a third factor as well: APAC region hosting, with a tenant-isolated data model designed against Singapore PDPA from day one. The clinic agreed to a three-week handover with no fallback diary kept in parallel — a deliberate forcing function.",
      ],
    },
    {
      heading: "What's running today",
      paragraphs: ["Three workflows went live in the first week. A fourth followed in week two."],
      bullets: [
        "Schedule — 3 chairs, 4 providers, drag-to-reschedule with timezone-correct commits.",
        "Billing — discharge-and-bill in the same flow, with treatment lines auto-populated from the chart.",
        "Charting — tooth-led charting; case notes link to specific surfaces.",
        "Recall — hygiene candidates surface three weeks before the due date, sorted by recall age.",
      ],
    },
    {
      heading: "What's next",
      paragraphs: [
        "DFI Synergy is the v13 imaging cohort: DICOM viewer in the patient chart, plus sensor-bridge integration for chairside capture. WhatsApp-templated recall messaging and insurance-line separation in billing follow in the next phase.",
      ],
    },
  ],

  stats: [
    {
      value: "3 weeks",
      label: "From kickoff to all four workflows live in production.",
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
