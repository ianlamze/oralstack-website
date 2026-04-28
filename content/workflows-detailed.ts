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
      "Open slots surface automatically — type 'endo, 60 min, Dr. Lim' and see the next three available, no week-by-week clicking",
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
    body: "Discharging a patient is the highest-conversion moment in dentistry — they're at the chair, the work is done, they want to pay and go. The case note the dentist already typed becomes the bill: fillings, crowns, scaling, fluoride pulled out as coded line items, with the patient's billing tier (Private, CHAS Blue, CHAS Orange, Pioneer, Merdeka) inferred from their profile. Front desk reviews and confirms — they don't re-key.",
    bullets: [
      "Billing lines extracted from the case note itself — 'fluoride done', 'scaling and polishing', '46MOD filling' resolve to SVC087, SVC093, SVC121 ready to charge",
      "Patient billing tier inferred from CHAS / Pioneer / Merdeka eligibility — the right rate appears, dentist confirms before save",
      "Insurance and patient portion kept structurally separate, with an audit log on every adjustment",
      "Same-flow checkout: bill, payment, receipt, recall scheduled, patient on their way",
    ],
    replaces:
      "End-of-day reconciliation · re-keying treatment into the invoice · follow-up collection calls · paper receipts",
    articleSlug: "same-day-billing-dental",
  },
  {
    slug: "charting",
    eyebrow: "Charting & case notes",
    title: "Chart the tooth, not the form.",
    body: "Clinical work shouldn't fight the software. The dentist types case notes the way they already speak them — '46MOD filling A3 CR done, 47MO done, fluoride done, SAP done' — and Oralstack parses the prose into chart updates and billing lines at the same time. The odontogram fills in. The bill fills in. The dentist reviews, doesn't re-key.",
    bullets: [
      "Case-note parser turns clinical prose into structured chart entries — '46MOD filling A3 CR' becomes a tooth-46 MOD composite finding, 'PFM crown 21' becomes a whole-tooth crown on 21",
      "Tooth-led model with FDI numbering native; surfaces (M, D, B, L, O) tied to each finding; abbreviations (RCT, exo, SRP, GIC, fmc, NCCL) recognised out of the box",
      "Same prose drives the billing lines — fillings, crowns, fluoride, scaling, periodontal therapy extracted as coded items the front desk can charge",
      "Each parsed entry returns a confidence score and a section tag — ambiguous phrases surface for the dentist to confirm, never silently guessed",
    ],
    replaces:
      "Double entry between chart and bill · paper case notes · clicking through dropdowns to log a finding the dentist already wrote",
    articleSlug: "case-note-parser",
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
    slug: "online-bookings",
    eyebrow: "Online bookings",
    title: "Patients book the slot the schedule actually has open.",
    body: "An Oralstack booking page the clinic shares with patients. The patient sees only slots that fit the procedure, the duration, and the provider — so the front desk doesn't field a callback to reshuffle, and a patient can't claim a slot the chair doesn't actually have free.",
    bullets: [
      "Hosted on Oralstack — no DNS or web setup needed from the clinic",
      "Slot filter: procedure, duration, provider, preferred window — only fitting slots are shown",
      "Bookings commit straight into the front-desk schedule, timezone-correct, no double-bookings",
      "Recall messages link to the booking page — overdue patients self-serve into the next open slot",
    ],
    replaces:
      'Phone-tree appointment hunting · "let me check Tuesday… no? Wednesday?" · WhatsApp back-and-forth to settle a time',
    articleSlug: "reducing-no-show-rates",
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
  {
    slug: "compliance",
    eyebrow: "Compliance & traceability",
    title: "The audit chain writes itself.",
    body: "Sterilisation, lab cases, inventory, claims — the parts of clinic life that are felt only when something goes wrong. Oralstack stamps every step so when an auditor asks (or a spore test fails), the answer is one click, not a binder hunt. Every consumable, every tray, every claim ties back to the patient and the procedure.",
    bullets: [
      "Autoclave cycle data captured per load — ISO 17665 chain stamped automatically (class B vacuum and type N gravity supported)",
      "Every tray linked to the patient and procedure that consumed it — spore-test fail surfaces the recall list in seconds",
      "Lab cases stamped sent → received → seated — when the lab slips, the seat appointment auto-reschedules",
      "Consumables auto-deducted from procedure templates — bill-of-materials traceable per visit",
      "Insurance claims with submission, decision, and payment timestamps — auditable end to end",
    ],
    replaces:
      "Paper sterilisation log books · separate compliance binder · WhatsApp threads with the lab tech · spreadsheet stock counts",
  },
];
