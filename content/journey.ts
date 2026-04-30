// Patient journey — the spine for the management-evaluator narrative.
//
// Every Oralstack feature (workflow, tool, article) is mapped to one of seven
// stages of the patient lifecycle, plus a cross-cutting bucket for things
// that observe or instrument the whole journey (compliance, analytics).
//
// This file is the single source of truth shared by:
//   - Public marketing surface (`/journey` or a reframed `/workflows`)
//   - Internal coverage map (`/dev/journey` — every stage tagged live /
//     in-flight / aspirational, with explicit gaps for product backlog)
//   - The biz/product alignment doc — paste the gaps section into a roadmap
//     review and you have the next quarter of feature work pre-prioritised.
//
// Honesty rules:
//   - `industryBaseline` and `oralstackTarget` only cite numbers we can
//     defend. DFI Synergy pilot data from `content/case-studies/dfi-synergy.ts`
//     is citable; everything else is marked with `sourceNote` so the reader
//     knows where the number came from.
//   - Aspirational features stay in this file but are filtered out of the
//     public surface until promoted to `live` or `in-flight`.
//   - Gaps are real product asks, not marketing wishlist. Each is specific
//     enough that a product manager could turn it into a ticket.

export type FeatureStatus = "live" | "in-flight" | "aspirational";

export type FeatureKind = "workflow" | "tool" | "article" | "visual";

export type FeatureRef = {
  /** Stable id, kebab-case. Used as React key and analytics tag. */
  id: string;
  /** Short label shown on the stage card. */
  label: string;
  /** What kind of asset this links to. */
  kind: FeatureKind;
  /**
   * Internal href the feature links to. Omit for aspirational entries with
   * no destination yet.
   */
  href?: string;
  /** Coverage status — drives whether the entry renders publicly. */
  status: FeatureStatus;
  /** Optional one-line note (e.g. why it ties to this stage). */
  note?: string;
};

export type GapPriority = "high" | "medium" | "low";

export type Gap = {
  /** Stable id, kebab-case. */
  id: string;
  /** Short title — verb phrase, what the feature would do. */
  label: string;
  /** 1–2 sentence description of the user need and the gap. */
  body: string;
  /** Hint for product prioritisation. */
  priority: GapPriority;
  /** Optional rationale — why now, why this stage. */
  rationale?: string;
};

export type StageMetric = {
  /** Display name of the metric, e.g. "Same-day-bill rate". */
  label: string;
  /** What the industry typically sits at. */
  industryBaseline: string;
  /** What clinics on Oralstack achieve. */
  oralstackTarget: string;
  /**
   * Where the numbers come from. Be honest: "DFI Synergy pilot" / "industry
   * survey, citation pending" / "internal estimate, validate before quoting
   * publicly".
   */
  sourceNote: string;
};

export type JourneyStage = {
  /** Stable id, kebab-case. Used as URL anchor and analytics tag. */
  id: string;
  /** 1..7 — used for the timeline scrubber. */
  index: number;
  /** Stage name, e.g. "Discovery". */
  name: string;
  /** What the patient experiences at this stage. */
  patientLens: string;
  /** What the clinic/staff is doing at this stage. */
  clinicLens: string;
  /** The question a clinic owner / practice manager asks about this stage. */
  ownerQuestion: string;
  /** The single metric that moves at this stage. */
  anchorMetric: StageMetric;
  /** Bullet list of "what this looks like without Oralstack". */
  before: string[];
  /** Bullet list of "what changes with Oralstack". */
  after: string[];
  /** Features mapped to this stage. */
  features: FeatureRef[];
  /** Gaps — things product should build to round out this stage. */
  gaps: Gap[];
};

export type CrossCutting = {
  /** Stable id, kebab-case. */
  id: string;
  /** Display name. */
  name: string;
  /** Why this is cross-cutting rather than stage-specific. */
  body: string;
  /** Stage ids this concern touches. */
  spans: string[];
  /** Features in this bucket. */
  features: FeatureRef[];
  /** Gaps in this bucket. */
  gaps: Gap[];
};

// ---------------------------------------------------------------------------
// Stages
// ---------------------------------------------------------------------------

export const journeyStages: JourneyStage[] = [
  {
    id: "discovery",
    index: 1,
    name: "Discovery",
    patientLens:
      "A potential patient hears about the clinic — Google search, friend's referral, social, insurance directory.",
    clinicLens:
      "Marketing spend, Google Business profile, referrals from existing patients. The clinic mostly can't measure what's working.",
    ownerQuestion: "Where are new patients actually coming from, and what does each cost me?",
    anchorMetric: {
      label: "Cost per acquired patient",
      industryBaseline: "S$80–S$200 across mixed channels (estimate)",
      oralstackTarget: "Visible per channel, attributed back to first visit",
      sourceNote:
        "Internal estimate based on conversations with Singapore practice managers — validate before quoting publicly.",
    },
    before: [
      "Spreadsheet of where patients said they heard about us",
      "No source-to-first-visit attribution; ad spend is a black box",
      "Referrals tracked on paper at the front desk, lost when staff turn over",
    ],
    after: [
      "Source captured at intake and tied to lifetime value",
      "Referral-tracking links so referring patients get credit automatically",
      "Reviews & referrals tool consolidates Google / Carousell / friend-of-friend",
    ],
    features: [
      {
        id: "reviews-referrals-tool",
        label: "Reviews & referrals",
        kind: "tool",
        href: "/tools/reviews-referrals",
        status: "live",
      },
    ],
    gaps: [
      {
        id: "source-attribution",
        label: "Source-to-LTV attribution",
        body: "Tie acquisition source (Google, Carousell, referral, walk-in) captured at intake to the patient record, then surface lifetime value by source in the management report.",
        priority: "high",
        rationale:
          "Discovery is the stage with the least Oralstack coverage today, and the metric (cost per acquired patient) is the one clinic owners ask about most often without an answer.",
      },
      {
        id: "google-business-sync",
        label: "Google Business Profile sync",
        body: "Pull Google reviews into the reviews tool and post replies back to Google from inside Oralstack — never leaving the app to manage online reputation.",
        priority: "medium",
      },
      {
        id: "referral-link-tracking",
        label: "Personalised referral links",
        body: "Generate per-patient short links (oralstack.com/r/<patient>) that auto-credit the referrer when a new patient books — replaces the manual 'who sent you?' question at the desk.",
        priority: "medium",
      },
    ],
  },

  {
    id: "booking",
    index: 2,
    name: "Booking",
    patientLens:
      "Patient picks a time. Either they call the clinic, message on WhatsApp, or self-book online.",
    clinicLens:
      "Front desk juggles the diary across chairs and providers; phone tag for slot confirmation; double-booking risk on busy days.",
    ownerQuestion: "How many bookings happen on first contact, and how many slots stay empty?",
    anchorMetric: {
      label: "No-show rate",
      industryBaseline: "12–18% across Singapore general practices",
      oralstackTarget: "Below 8% with WhatsApp confirmations + 24h reminders",
      sourceNote:
        "Industry range cited in /articles/reducing-no-show-rates; Oralstack target validated against DFI Synergy pilot — week-4 no-show rate to confirm.",
    },
    before: [
      "Phone-tree slot hunting — 'how about Tuesday? No? Wednesday?'",
      "Online bookings (where they exist) show slots the chair doesn't actually have free",
      "WhatsApp confirmations sent from staff personal phones, lost on turnover",
    ],
    after: [
      "Drag-to-reschedule with timezone-correct commits across chairs and providers",
      "Hosted online booking page — patient sees only slots that fit procedure / duration / provider",
      "WhatsApp Business API confirmations from a clinic-owned number, audit-logged",
      "Waitlist auto-fill: cancellation surfaces to the next patient on the list within minutes",
    ],
    features: [
      {
        id: "front-desk-workflow",
        label: "Schedule & front desk",
        kind: "workflow",
        href: "/workflows#front-desk",
        status: "live",
      },
      {
        id: "online-bookings-workflow",
        label: "Online bookings",
        kind: "workflow",
        href: "/workflows#online-bookings",
        status: "live",
      },
      {
        id: "online-booking-tool",
        label: "Online booking page",
        kind: "tool",
        href: "/tools/online-booking",
        status: "live",
      },
      {
        id: "waitlist-auto-fill-tool",
        label: "Waitlist auto-fill",
        kind: "tool",
        href: "/tools/waitlist-auto-fill",
        status: "live",
      },
      {
        id: "no-show-calculator-tool",
        label: "No-show revenue calculator",
        kind: "tool",
        href: "/tools/no-show-calculator",
        status: "live",
      },
      {
        id: "reducing-no-show-rates-article",
        label: "Reducing no-show rates",
        kind: "article",
        href: "/articles/reducing-no-show-rates",
        status: "live",
      },
      {
        id: "drag-to-reschedule-article",
        label: "Drag-to-reschedule",
        kind: "article",
        href: "/articles/drag-to-reschedule-dental-schedule",
        status: "live",
      },
    ],
    gaps: [
      {
        id: "ai-whatsapp-booking",
        label: "AI booking via WhatsApp",
        body: "Patient messages the clinic number in plain language ('can I see Dr Lim Friday afternoon?') and an agent proposes slots, confirms, and books — front desk reviews the queue rather than typing every booking.",
        priority: "high",
        rationale:
          "Largest staff-time sink at the front desk is conversational booking. WhatsApp Business API is already wired; layering an LLM agent is incremental.",
      },
      {
        id: "deposit-holds",
        label: "Deposit holding for high-value bookings",
        body: "For procedures over a threshold (implant consults, full clearance), collect a deposit at booking via PayNow that's credited against the bill — reduces no-show losses on the appointments that hurt most.",
        priority: "medium",
      },
      {
        id: "dynamic-slot-shaping",
        label: "Dynamic slot shaping by procedure",
        body: "Auto-resize slots based on procedure complexity and provider history (Dr A averages 70 min on a molar RCT, Dr B averages 90 min) — front desk stops over- or under-booking.",
        priority: "medium",
      },
    ],
  },

  {
    id: "pre-visit",
    index: 3,
    name: "Pre-visit",
    patientLens:
      "Patient gets a confirmation, fills in intake forms, gets a reminder the day before, knows where to park.",
    clinicLens:
      "Front desk sends paper forms or PDFs, chases incomplete forms on arrival, manually checks CHAS/insurance eligibility before the visit.",
    ownerQuestion:
      "How many patients arrive with their intake done, and how many minutes does my front desk burn on pre-visit admin?",
    anchorMetric: {
      label: "Same-day-form-complete rate",
      industryBaseline: "30–50% for paper / PDF intake (estimate)",
      oralstackTarget: "85%+ with WhatsApp-delivered forms and pre-visit nudges",
      sourceNote: "Internal estimate — validate against DFI Synergy pilot data when available.",
    },
    before: [
      "PDF intake form emailed; patient prints, fills, scans, returns — or arrives blank",
      "Eligibility checks (CHAS / insurance / MediSave) done on arrival, holding up the chair",
      "Day-before reminders sent from the practice manager's WhatsApp on her personal phone",
    ],
    after: [
      "Templated WhatsApp reminder with a tap-to-fill intake link, completed on the patient's phone",
      "Eligibility pre-checked the day before — Private / CHAS Blue / Orange / Pioneer / Merdeka tier known on arrival",
      "Patient communication center keeps every message tied to the patient record",
    ],
    features: [
      {
        id: "patient-comms-tool",
        label: "Patient communication center",
        kind: "tool",
        href: "/tools/patient-communications",
        status: "live",
      },
      {
        id: "eligibility-estimate-tool",
        label: "Eligibility & estimate",
        kind: "tool",
        href: "/tools/eligibility-estimate",
        status: "live",
      },
      {
        id: "whatsapp-business-article",
        label: "WhatsApp Business for clinics",
        kind: "article",
        href: "/articles/whatsapp-business-dental-clinic-singapore",
        status: "live",
      },
    ],
    gaps: [
      {
        id: "digital-intake-pdpa",
        label: "Digital intake forms with PDPA consent",
        body: "Mobile-first form sent via WhatsApp link, PDPA consent captured with timestamp and IP, completed forms write directly to the patient record (medical history, allergies, medications).",
        priority: "high",
        rationale:
          "Pre-visit is currently the thinnest stage — eligibility is covered, intake is not. Digital intake unblocks chairside efficiency at stage 5.",
      },
      {
        id: "pre-visit-radiograph-review",
        label: "Pre-visit radiograph review",
        body: "Dentist reviews the patient's last bitewings/PA on the morning huddle screen so the chair time starts with context, not with image hunting.",
        priority: "medium",
      },
    ],
  },

  {
    id: "arrival",
    index: 4,
    name: "Arrival & huddle",
    patientLens:
      "Patient arrives, checks in, waits briefly, gets called back. Should feel known, not processed.",
    clinicLens:
      "Front desk verifies eligibility, flags medical alerts to the dentist, runs the morning huddle with the team to align on the day.",
    ownerQuestion:
      "How long from patient arrival to chair, and is the dentist getting the medical alerts they need?",
    anchorMetric: {
      label: "Arrival → chair time",
      industryBaseline: "8–15 minutes typical",
      oralstackTarget: "Under 5 minutes when intake is pre-completed",
      sourceNote: "Internal estimate — instrument and validate during pilot.",
    },
    before: [
      "Eligibility checked manually at the desk while the patient waits",
      "Medical alerts written on a sticky note attached to the paper chart",
      "Morning huddle on a whiteboard or not at all",
    ],
    after: [
      "Eligibility already resolved; patient signs in and is shown to the chair",
      "Medical alerts surface to the chairside view automatically (allergies, anticoagulants, premed, recent surgery)",
      "Daily huddle dashboard renders the day at a glance — chairs, providers, expected revenue, alerts",
    ],
    features: [
      {
        id: "front-desk-workflow-2",
        label: "Schedule & front desk",
        kind: "workflow",
        href: "/workflows#front-desk",
        status: "live",
        note: "Same workflow as booking, observed at the arrival moment.",
      },
      {
        id: "daily-huddle-tool",
        label: "Daily huddle dashboard",
        kind: "tool",
        href: "/tools/daily-huddle",
        status: "live",
      },
      {
        id: "medical-alerts-tool",
        label: "Patient medical alerts",
        kind: "tool",
        href: "/tools/medical-alerts",
        status: "live",
      },
    ],
    gaps: [
      {
        id: "self-checkin-qr",
        label: "QR self-check-in",
        body: "Patient scans a QR at the door, confirms identity and intake completion, status flips to 'arrived' on the front-desk view — desk handles exceptions, not every arrival.",
        priority: "medium",
      },
      {
        id: "alert-escalation",
        label: "Real-time alert escalation",
        body: "When a high-severity medical alert (anticoagulant + invasive procedure planned) is detected at check-in, escalate to the treating dentist via in-app notification before the chair starts.",
        priority: "medium",
        rationale:
          "Medical-alerts tool exists; escalation behavior closes the loop from passive display to active prevention.",
      },
    ],
  },

  {
    id: "chair",
    index: 5,
    name: "Chair",
    patientLens:
      "Patient is in the chair. The clinical work happens. Should feel competent, unhurried, communicated.",
    clinicLens:
      "Dentist examines, charts findings, takes radiographs, performs the procedure, dictates case notes, presents the treatment plan.",
    ownerQuestion:
      "How much chair time goes to clinical work versus admin (charting, billing prep, image hunting)?",
    anchorMetric: {
      label: "Charting + admin overhead per visit",
      industryBaseline: "10–15 min per visit on form-led PMS (estimate)",
      oralstackTarget: "Under 4 min with case-note parser + tooth-led charting",
      sourceNote:
        "Internal estimate based on `/articles/tooth-led-vs-form-led-charting` analysis — validate against DFI Synergy timing data.",
    },
    before: [
      "Findings entered through dropdowns, separately from the case note prose",
      "DICOM radiographs opened in a separate desktop app, parallel to the PMS",
      "Treatment plans built in PowerPoint or printed handouts the morning of",
    ],
    after: [
      "Case-note parser turns prose into chart entries and billing lines simultaneously — '46MOD filling done' becomes a tooth-46 MOD composite finding plus an SVC121 line",
      "Tooth-led odontogram with FDI numbering, surfaces tied to findings",
      "DICOM viewer lives inside the chart — sensor-bridge integration captures chairside imagery directly to the visit",
      "Treatment plan builder generates the patient-facing presentation from the chart, no slide deck needed",
    ],
    features: [
      {
        id: "charting-workflow",
        label: "Charting & case notes",
        kind: "workflow",
        href: "/workflows#charting",
        status: "live",
      },
      {
        id: "imaging-workflow",
        label: "Clinical imaging",
        kind: "workflow",
        href: "/workflows#imaging",
        status: "live",
      },
      {
        id: "perio-chart-tool",
        label: "Periodontal chart",
        kind: "tool",
        href: "/tools/perio-chart",
        status: "live",
      },
      {
        id: "treatment-plan-builder-tool",
        label: "Treatment plan builder",
        kind: "tool",
        href: "/tools/treatment-plan-builder",
        status: "live",
      },
      {
        id: "plan-presentation-tool",
        label: "Treatment plan presentation",
        kind: "tool",
        href: "/tools/plan-presentation",
        status: "live",
      },
      {
        id: "case-note-parser-article",
        label: "Case-note parser",
        kind: "article",
        href: "/articles/case-note-parser",
        status: "live",
      },
      {
        id: "tooth-led-article",
        label: "Tooth-led vs form-led charting",
        kind: "article",
        href: "/articles/tooth-led-vs-form-led-charting",
        status: "live",
      },
      {
        id: "dicom-in-chart-article",
        label: "DICOM in the chart",
        kind: "article",
        href: "/articles/dicom-in-chart-vs-separate-viewer",
        status: "live",
      },
      {
        id: "sensor-bridge-article",
        label: "Sensor-bridge integration",
        kind: "article",
        href: "/articles/dental-sensor-bridge-integration",
        status: "live",
      },
    ],
    gaps: [
      {
        id: "voice-dictation",
        label: "Voice-dictated case notes",
        body: "Dentist speaks, transcript runs through the same case-note parser — chart and billing populate without the dentist touching a keyboard during the procedure.",
        priority: "high",
        rationale:
          "Hands-busy moment is the largest remaining charting friction even after the parser. Voice closes that gap.",
      },
      {
        id: "ai-radiograph-findings",
        label: "AI-assisted radiograph findings",
        body: "On capturing a bitewing, surface candidate findings (caries, calculus, bone loss) for the dentist to confirm or reject — never auto-applied, always assistive.",
        priority: "high",
        rationale:
          "Differentiation: most APAC PMS doesn't ship this; dental AI radiograph tools (Pearl, Overjet) are separate apps. Inline saves the context switch.",
      },
      {
        id: "intra-op-photography",
        label: "Intraoral photo workflow",
        body: "Phone or intraoral-camera capture pinned to the visit, auto-tagged by tooth/surface based on the case note context, no separate folder hunt.",
        priority: "medium",
      },
    ],
  },

  {
    id: "discharge",
    index: 6,
    name: "Discharge",
    patientLens:
      "Patient pays, gets a receipt, books their next visit, walks out. Should feel handled, not chased.",
    clinicLens:
      "Front desk reviews the bill, takes payment, generates the receipt, schedules the recall, files the insurance claim.",
    ownerQuestion:
      "What share of visits get billed and paid the same day, before the patient leaves?",
    anchorMetric: {
      label: "Same-day-bill rate",
      industryBaseline: "60–65% on legacy PMS",
      oralstackTarget: "85%+",
      sourceNote: "DFI Synergy pilot, weeks 1–4. Cited in homepage stats and case study.",
    },
    before: [
      "Treatment notes typed in the chart, then re-typed into the invoice",
      "Insurance and patient portion conflated, fixed at end-of-day reconciliation",
      "Recall booked as a separate task, often skipped — patient leaves without their next visit on the books",
    ],
    after: [
      "Billing lines extracted from the case note itself (the parser fans out to chart and bill)",
      "Patient billing tier inferred (Private / CHAS Blue / Orange / Pioneer / Merdeka) from the eligibility record",
      "Insurance and patient portion structurally separate, with audit-logged adjustments",
      "Same-flow checkout: bill → payment (PayNow / card / cash) → receipt → recall → done",
    ],
    features: [
      {
        id: "billing-workflow",
        label: "Billing & discharge",
        kind: "workflow",
        href: "/workflows#billing",
        status: "live",
      },
      {
        id: "insurance-claims-tool",
        label: "Insurance claims & MediSave",
        kind: "tool",
        href: "/tools/insurance-claims",
        status: "live",
      },
      {
        id: "eod-reconciliation-tool",
        label: "End-of-day reconciliation",
        kind: "tool",
        href: "/tools/end-of-day-reconciliation",
        status: "live",
      },
      {
        id: "same-day-billing-article",
        label: "Same-day billing",
        kind: "article",
        href: "/articles/same-day-billing-dental",
        status: "live",
      },
      {
        id: "gst-billing-article",
        label: "GST for dental billing",
        kind: "article",
        href: "/articles/gst-singapore-dental-billing",
        status: "live",
      },
      {
        id: "insurance-vs-patient-article",
        label: "Insurance vs patient portion",
        kind: "article",
        href: "/articles/insurance-vs-patient-portion-singapore",
        status: "live",
      },
    ],
    gaps: [
      {
        id: "instalment-plans",
        label: "Instalment plans",
        body: "Split a high-value bill (implant, full-mouth rehab) into a structured payment plan with auto-debited PayNow each month — clinic captures the case it would otherwise lose to a 'let me think about it'.",
        priority: "high",
        rationale:
          "Conversion lever at the highest-value chair moments. Singapore patients ask for this; legacy PMS forces a manual workaround.",
      },
      {
        id: "auto-medisave-claim",
        label: "Automated MediSave claim filing",
        body: "When a MediSave-eligible procedure (surgical extraction, wisdom tooth, certain endo) lands on the bill, file the claim with HSA from the discharge view rather than as a parallel paperwork track.",
        priority: "high",
      },
      {
        id: "whatsapp-receipt-delivery",
        label: "WhatsApp receipt delivery",
        body: "Receipt goes to the patient's WhatsApp instead of email — Singapore patients open WhatsApp messages immediately, email rarely.",
        priority: "low",
      },
    ],
  },

  {
    id: "follow-up",
    index: 7,
    name: "Follow-up & recall",
    patientLens:
      "Patient hears from the clinic at the right cadence — recall reminder, post-visit check-in, review request — never spam.",
    clinicLens:
      "Recall queue surfacing 3 weeks before due, lapsed patients reactivated, reviews requested, lifetime value tracked.",
    ownerQuestion:
      "What share of overdue patients are we actually reaching, and how many come back?",
    anchorMetric: {
      label: "Recall coverage rate",
      industryBaseline: "40–60% of due patients reached (estimate)",
      oralstackTarget: "85%+ with surfacing 3 weeks ahead and templated outreach",
      sourceNote:
        "Internal estimate; clinic-specific baseline depends on existing recall practice.",
    },
    before: [
      "Recall list maintained in a spreadsheet, often months out of date",
      "Outreach done from staff personal WhatsApp, no audit trail, no two-way thread",
      "Lapsed patients (≥18 months since last visit) never reactivated — pure revenue leak",
    ],
    after: [
      "Recall candidates surface 3 weeks before due, sorted by recall age",
      "WhatsApp Business templated outreach from a clinic-owned number, audit-logged with delivery and read receipts",
      "Two-way conversations tied to the patient record",
    ],
    features: [
      {
        id: "recall-workflow",
        label: "Recall & messaging",
        kind: "workflow",
        href: "/workflows#recall",
        status: "live",
      },
      {
        id: "patient-comms-tool-2",
        label: "Patient communication center",
        kind: "tool",
        href: "/tools/patient-communications",
        status: "live",
      },
      {
        id: "reviews-referrals-tool-2",
        label: "Reviews & referrals",
        kind: "tool",
        href: "/tools/reviews-referrals",
        status: "live",
      },
      {
        id: "no-show-article-2",
        label: "Reducing no-show rates",
        kind: "article",
        href: "/articles/reducing-no-show-rates",
        status: "live",
      },
    ],
    gaps: [
      {
        id: "post-visit-nps",
        label: "Post-visit NPS survey",
        body: "Auto-send a 1-tap rating 24h after discharge; high scores route to a Google review prompt, low scores route to the practice manager for service recovery before a public review forms.",
        priority: "high",
        rationale:
          "Closes the loop between discharge and reviews-referrals; reuses the patient communication channel.",
      },
      {
        id: "lapsed-patient-winback",
        label: "Lapsed-patient win-back campaigns",
        body: "Identify patients ≥18 months since last visit, segment by lifetime value, send a templated win-back offer — recovers a stage that's currently invisible.",
        priority: "high",
      },
      {
        id: "ltv-cohorts",
        label: "Lifetime-value cohort analysis",
        body: "Group patients by acquisition source, first-procedure type, and recall behaviour — surfaces which cohorts deserve more marketing investment vs which churn fast.",
        priority: "medium",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Cross-cutting concerns — observe or instrument the whole journey
// ---------------------------------------------------------------------------

export const crossCutting: CrossCutting[] = [
  {
    id: "operations",
    name: "Operations & analytics",
    body: "Observability across every stage. Chair utilisation, revenue by chair / provider, no-show rate, recall coverage — surfaced where the owner actually looks, not buried in an end-of-month spreadsheet.",
    spans: ["booking", "arrival", "chair", "discharge", "follow-up"],
    features: [
      {
        id: "operations-workflow",
        label: "Operations & analytics",
        kind: "workflow",
        href: "/workflows#operations",
        status: "live",
      },
      {
        id: "management-report-tool",
        label: "Management report",
        kind: "tool",
        href: "/tools/management-report",
        status: "live",
      },
      {
        id: "provider-productivity-tool",
        label: "Provider productivity & commissions",
        kind: "tool",
        href: "/tools/provider-productivity",
        status: "live",
      },
    ],
    gaps: [
      {
        id: "stage-funnel-dashboard",
        label: "Patient-journey funnel dashboard",
        body: "Visualise patient progression through the seven stages over time — where they drop off, how long each stage takes, which stage is the throughput bottleneck this month.",
        priority: "high",
        rationale:
          "Dogfoods this very journey model. The dashboard becomes the on-ramp for clinic owners who want to act on the framing the marketing site sells.",
      },
    ],
  },
  {
    id: "compliance",
    name: "Compliance & traceability",
    body: "Sterilisation, lab cases, inventory, claims — the parts of clinic life felt only when something goes wrong. Stamp every step so an audit (or a spore-test fail) is one click, not a binder hunt.",
    spans: ["arrival", "chair", "discharge"],
    features: [
      {
        id: "compliance-workflow",
        label: "Compliance & traceability",
        kind: "workflow",
        href: "/workflows#compliance",
        status: "live",
      },
      {
        id: "sterilization-tool",
        label: "Sterilisation traceability",
        kind: "tool",
        href: "/tools/sterilization",
        status: "live",
      },
      {
        id: "inventory-tool",
        label: "Inventory & consumables",
        kind: "tool",
        href: "/tools/inventory",
        status: "live",
      },
      {
        id: "lab-orders-tool",
        label: "Lab order tracking",
        kind: "tool",
        href: "/tools/lab-orders",
        status: "live",
      },
      {
        id: "audit-logs-article",
        label: "Dental audit logs",
        kind: "article",
        href: "/articles/dental-audit-logs",
        status: "live",
      },
      {
        id: "pdpa-article",
        label: "Singapore PDPA for clinics",
        kind: "article",
        href: "/articles/singapore-pdpa-dental-clinics",
        status: "live",
      },
    ],
    gaps: [
      {
        id: "moh-incident-reporting",
        label: "MOH incident reporting templates",
        body: "Pre-filled incident report forms (needlestick, drug error, equipment failure) tied to the visit, the staff, and the patient — reduces the friction that keeps incidents underreported.",
        priority: "medium",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const stageById = new Map(journeyStages.map((s) => [s.id, s]));

export function getStageById(id: string): JourneyStage | undefined {
  return stageById.get(id);
}

export function getLiveFeaturesByStage(id: string): FeatureRef[] {
  const stage = stageById.get(id);
  if (!stage) return [];
  return stage.features.filter((f) => f.status === "live");
}

export function getGapsByPriority(priority: GapPriority): Array<Gap & { stageId: string }> {
  const out: Array<Gap & { stageId: string }> = [];
  for (const stage of journeyStages) {
    for (const gap of stage.gaps) {
      if (gap.priority === priority) out.push({ ...gap, stageId: stage.id });
    }
  }
  for (const cross of crossCutting) {
    for (const gap of cross.gaps) {
      if (gap.priority === priority) out.push({ ...gap, stageId: cross.id });
    }
  }
  return out;
}

export type CoverageReport = {
  stageId: string;
  stageName: string;
  live: number;
  inFlight: number;
  aspirational: number;
  totalFeatures: number;
  totalGaps: number;
  highPriorityGaps: number;
};

export function buildCoverageReport(): CoverageReport[] {
  const reports: CoverageReport[] = [];
  for (const stage of journeyStages) {
    const live = stage.features.filter((f) => f.status === "live").length;
    const inFlight = stage.features.filter((f) => f.status === "in-flight").length;
    const aspirational = stage.features.filter((f) => f.status === "aspirational").length;
    const highPriorityGaps = stage.gaps.filter((g) => g.priority === "high").length;
    reports.push({
      stageId: stage.id,
      stageName: stage.name,
      live,
      inFlight,
      aspirational,
      totalFeatures: stage.features.length,
      totalGaps: stage.gaps.length,
      highPriorityGaps,
    });
  }
  return reports;
}
