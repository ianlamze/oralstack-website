export type WorkflowDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  replaces: string;
  /** Optional related article slug (matched against `content/articles/`). */
  articleSlug?: string;
};

export const workflowsDetailed: WorkflowDetail[] = [
  {
    slug: "front-desk",
    eyebrow: "Front desk",
    title: "Scheduling that keeps up with the front desk.",
    body: "The schedule isn't a thing the front desk consults — it's the thing they drive. Drag a 10:00 to 14:00 in three seconds. Search a returning patient in two keystrokes. Register a new patient inline without leaving the day view.",
    bullets: [
      "Drag-to-reschedule with timezone-correct commits — no UTC drift on reload",
      "Three-chair to multi-chair layouts; provider columns render dynamically",
      "Recall candidates surface 3 weeks before their due date",
      "New-patient registration mirrored from the retired Plato booking form, field-for-field, for migrating clinics",
    ],
    replaces: "Paper diary · WhatsApp confirmations · spreadsheet recall lists",
    articleSlug: "reducing-no-show-rates",
  },
  {
    slug: "billing",
    eyebrow: "Billing & discharge",
    title: "The bill is ready before the patient stands up.",
    body: "Discharging a patient is the highest-conversion moment in dentistry — they're at the chair, the work is done, they want to pay and go. Oralstack pulls treatment lines from the chart automatically, splits insurance from patient portion, and audit-logs every adjustment.",
    bullets: [
      "Treatment-to-line auto-population from the chart — no re-entry",
      "Insurance lines kept structurally separate from patient portion",
      "Audit-logged adjustments — write-offs, discounts, follow-up notes",
      "Same-flow checkout: bill, payment, receipt, recall scheduled, patient on their way",
    ],
    replaces: "End-of-day reconciliation · follow-up collection calls · paper receipts",
    articleSlug: "same-day-billing-dental",
  },
  {
    slug: "charting",
    eyebrow: "Charting & case notes",
    title: "Chart the tooth, not the form.",
    body: "Clinical work shouldn't fight the software. The chart opens to the patient's last visit. Case notes link to specific surfaces. Procedure templates auto-fill the common cases, editable per visit. Notes write back to billing without a second entry.",
    bullets: [
      "Tooth-led charting model with FDI numbering native",
      "Case notes tied to specific surfaces (M, D, B, L, O)",
      "Per-procedure templates, editable per visit",
      "Direct write-back to billing — no double entry",
    ],
    replaces: "Double entry between chart and bill · paper case notes",
  },
  {
    slug: "imaging",
    eyebrow: "Clinical imaging",
    title: "DICOM in the chart, sensor in the room.",
    body: "Imaging that travels with the patient. The DICOM viewer lives inside the patient chart, not as a separate system. Sensor-bridge integration captures chairside imagery directly to the visit. Open the chart, see the radiograph; review the radiograph, see the chart.",
    bullets: [
      "DICOM viewer with multi-frame support, in the patient chart",
      "Sensor-bridge integration for chairside capture (Carestream, Dexis, Sopro, Schick)",
      "Imaging tied to the visit, not a parallel folder on a separate desktop",
      "Annotation and measurement tools (pan, zoom, rotate, ruler) for treatment planning",
    ],
    replaces: 'Separate imaging desktop apps · USB transfers · "where\'s that radiograph" hunts',
    articleSlug: "dicom-in-chart-vs-separate-viewer",
  },
  {
    slug: "recall",
    eyebrow: "Recall & patient messaging",
    title: "Outreach that fires on its own.",
    body: "Recall is where most clinics leak revenue — a patient last seen in November is due in May, and nobody remembers. Oralstack surfaces recall candidates three weeks before due, sends WhatsApp-templated messages on schedule, and tracks responses back to the schedule.",
    bullets: [
      "Recall candidates surface three weeks before due, sorted by recall age",
      "WhatsApp Business API templated messaging (Singapore-region routing)",
      "Two-way patient conversations, audit-logged with delivery and read receipts",
      "Intake forms sent ahead of first visits",
    ],
    replaces:
      "Manual recall lists · spreadsheet tracking · staff personal phones for patient texts",
    articleSlug: "reducing-no-show-rates",
  },
  {
    slug: "operations",
    eyebrow: "Operations & analytics",
    title: "What owners see when they walk in.",
    body: "Chair utilisation, revenue trends, recall coverage, no-show rate — surfaced where the owner actually looks, not buried in an end-of-month spreadsheet pull. Daily snapshot in the dashboard, weekly digest in the inbox, exports to anything that takes CSV or JSON.",
    bullets: [
      "Chair utilisation heatmap across the last 14 days, by chair and day",
      "Revenue per chair, week-over-week, with delta callouts",
      "Recall coverage rate — how many overdue patients are reached this week",
      "No-show rate trend with clinic-local timezone correctness",
      "Weekly owner email digest — clinic snapshot in one scroll",
    ],
    replaces:
      'End-of-month spreadsheet pulls · CFO asking the practice manager · "what was last Tuesday like?"',
  },
];
