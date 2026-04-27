// Capability matrix for /compare's interactive builder.
// Source content adapted from content/comparisons/{plato,dentrix,open-dental,carestream,eaglesoft}.ts
// — kept short for table cells. The per-page comparisons remain authoritative.

export type CompetitorId = "plato" | "dentrix" | "open-dental" | "carestream" | "eaglesoft";

export type CapabilityId =
  | "deployment"
  | "schedule"
  | "billing"
  | "charting"
  | "imaging"
  | "recall"
  | "multi-clinic"
  | "apac"
  | "setup"
  | "pricing";

export type Competitor = {
  id: CompetitorId;
  label: string;
};

export type Capability = {
  id: CapabilityId;
  label: string;
  /** Why this capability matters — one line under the checkbox. */
  rationale: string;
  oralstack: string;
  competitors: Record<CompetitorId, string>;
};

export const competitors: Competitor[] = [
  { id: "plato", label: "Plato" },
  { id: "dentrix", label: "Dentrix" },
  { id: "open-dental", label: "Open Dental" },
  { id: "carestream", label: "Carestream" },
  { id: "eaglesoft", label: "Eaglesoft" },
];

export const capabilities: Capability[] = [
  {
    id: "deployment",
    label: "Deployment",
    rationale: "Cloud SaaS vs desktop-installed clients you maintain.",
    oralstack:
      "Browser-based on any device. Region-hosted in Singapore (asia-southeast1), tenant-isolated.",
    competitors: {
      plato:
        "Windows desktop client, installed per workstation. Front-desk PC is the source of truth.",
      dentrix:
        "Two products: Dentrix (on-prem Windows, dominant) and Dentrix Ascend (newer cloud SaaS).",
      "open-dental":
        "Self-hosted on your server, or hosted with a third-party Open Dental partner.",
      carestream:
        "On-prem the default for SoftDent. Cloud options exist but aren't the primary path.",
      eaglesoft:
        "Windows desktop per workstation; server-based for multi-station. Patterson-managed cloud backup is opt-in.",
    },
  },
  {
    id: "schedule",
    label: "Drag-to-reschedule",
    rationale: "How fast the front desk can move a patient to a new slot.",
    oralstack:
      "Drag-driven. Move a 10:00 → 14:00 in three seconds; commits timezone-correct on reload.",
    competitors: {
      plato: "Form-based booking. Reschedules typically open-edit-save through dialog windows.",
      dentrix:
        "Mature, dense. Reschedules use modal dialogs and form-based flows accumulated over decades.",
      "open-dental":
        "Mature, feature-rich, Windows-leaning. Designed for menu navigation, not drag pace.",
      carestream:
        "Functional schedule tied to PMS. UI evolves slowly; strength is imaging, not scheduling.",
      eaglesoft:
        "Mature appointment book, family scheduling, recall integration. Form-based at its core.",
    },
  },
  {
    id: "billing",
    label: "Discharge-flow billing",
    rationale: "Bill ready while the patient is still at the chair, not at end-of-day.",
    oralstack:
      "Treatment lines pull from the chart at discharge. Insurance + patient portion stay structurally separate. Singapore GST built in.",
    competitors: {
      plato:
        "End-of-day reconciliation common. Treatment lines re-entered manually from the chart.",
      dentrix: "Strong US claims engine — EOB import, X12 837/835. Built around US payer rails.",
      "open-dental":
        "Strong US insurance — claims, EOB, X12. Well-suited for US practices, not APAC fee-for-service.",
      carestream:
        "Per-region billing models. US-style claims in some configurations; less standardised globally.",
      eaglesoft:
        "Strong US insurance: eClaims, EOB import, fee schedules, ANSI 837/835 native. APAC fit weak.",
    },
  },
  {
    id: "charting",
    label: "Tooth-led charting",
    rationale: "FDI numbering with per-surface notes vs free-text per visit.",
    oralstack:
      "FDI numbering with surface-specific notes (M/D/B/L/O) and per-procedure templates editable per visit.",
    competitors: {
      plato: "FDI numbering with free-text clinical notes per visit.",
      dentrix:
        "Tooth chart with treatment-coded fills, perio chart, mix of free-text and structured notes.",
      "open-dental": "Mature charting; surface notes possible via configuration.",
      carestream:
        "Tooth-charting and clinical notes; chart-to-imaging timeline integration is a strength.",
      eaglesoft: "Tooth charting, perio, structured procedure codes tied tightly to billing.",
    },
  },
  {
    id: "imaging",
    label: "DICOM in the patient chart",
    rationale: "Radiograph next to the chart vs separate desktop apps and folders.",
    oralstack:
      "DICOM viewer inside the chart. Sensor-bridge integration across Carestream, Dexis, Sopro, Schick — vendor-neutral.",
    competitors: {
      plato:
        "Separate desktop apps per sensor brand. Radiographs live in folders outside the chart.",
      dentrix:
        "Dentrix Imaging Center plus third-party bridge plugins. Quality varies by integration.",
      "open-dental": "Sensor bridge plugins per vendor. Quality and stability vary by integration.",
      carestream:
        "Tightest with Carestream-brand sensors and CBCT. Other brands integrate via plugins of varying quality.",
      eaglesoft:
        "Patterson Imaging integration is the primary path. Sensor support strongest with Patterson-distributed brands.",
    },
  },
  {
    id: "recall",
    label: "Recall + WhatsApp templates",
    rationale: "Patients due for hygiene surfaced before they age out, outreach templated.",
    oralstack:
      "Recall candidates surface 3 weeks before due, sorted by recall age. WhatsApp Business API templates, audit-logged.",
    competitors: {
      plato:
        "Manual recall list maintenance, often a separate spreadsheet. Outreach via personal phones or WhatsApp.",
      dentrix:
        "Recall reminders via Dentrix's own messaging. WhatsApp not native; SMS/email is the path.",
      "open-dental":
        "Recall lists supported. Outreach typically via SMS/email integrations or third-party plugins.",
      carestream: "Recall functionality exists; templated outreach varies by region package.",
      eaglesoft:
        "Recall integration with appointment book; outreach via Patterson-rec'd messaging tools.",
    },
  },
  {
    id: "multi-clinic",
    label: "Multi-clinic consolidation",
    rationale: "One login across locations vs separate installs and reconciled reporting.",
    oralstack:
      "Tenant-isolated SaaS. Multi-clinic owners see all locations under one login at flat $200/clinic/month.",
    competitors: {
      plato:
        "One install per clinic. Multi-location requires separate logins and reconciled reporting.",
      dentrix:
        "Dentrix Enterprise is a separate product line for multi-location operators. Pricing scales steeply.",
      "open-dental": "Possible with multi-database setups; requires planning and DBA familiarity.",
      carestream: "Possible with multi-database setups; clinic-by-clinic install pattern.",
      eaglesoft:
        "Multi-location requires Eaglesoft Anywhere or custom configurations. Separate licence path.",
    },
  },
  {
    id: "apac",
    label: "APAC + PDPA compliance",
    rationale: "Singapore-region hosting, tenant isolation, GST-aware billing.",
    oralstack:
      "PDPA-aware by design. asia-southeast1 hosting, tenant isolation via Postgres row-level security, audit logs by default.",
    competitors: {
      plato:
        "On-premise on the clinic's hardware. PDPA stance depends on how the clinic configures backups.",
      dentrix:
        "On-prem (Dentrix) or US-hosted (Ascend). Singapore residency requires custom arrangements.",
      "open-dental":
        "No specific Singapore PDPA stance. Compliance is the operator's responsibility.",
      carestream:
        "APAC presence stronger in imaging than PMS. Singapore residency varies by deployment.",
      eaglesoft: "On-prem in clinic; Patterson cloud backup is US-region. APAC presence limited.",
    },
  },
  {
    id: "setup",
    label: "Setup time",
    rationale: "How fast the front desk is operational on Day 1 vs configuration-heavy projects.",
    oralstack:
      "Front desk live in 3 days, full migration in 3 weeks (calibrated to DFI Synergy's pilot). 30-min demo, pilot proposal in 2 working days.",
    competitors: {
      plato: "Familiar, but switching off Plato is a 3-week migration project (no fallback diary).",
      dentrix: "Hours-to-days of IT work plus rep-led training. Onboarding typically multi-week.",
      "open-dental": "Hours-to-days of IT work to install, configure, and train staff. Self-serve.",
      carestream: "Imaging hardware install + PMS setup; varies by reseller. Multi-week typical.",
      eaglesoft:
        "Patterson rep-led implementation. Multi-week, including hardware coordination in some deals.",
    },
  },
  {
    id: "pricing",
    label: "Pricing model",
    rationale: "Predictable monthly cost vs licence + maintenance + per-seat scaling.",
    oralstack:
      "Flat $200 / clinic / month during pilot. No per-seat or per-feature charges. 3 months hands-on onboarding included.",
    competitors: {
      plato: "Licence + maintenance. Costs scale with seats and modules.",
      dentrix:
        "Premium. ~US$8-12K/practice/year on-prem licence + support; Ascend is per-provider subscription.",
      "open-dental": "Free open-source licence; you cover IT, hosting, and paid support tiers.",
      carestream:
        "Software pricing varies by region, often bundled with imaging hardware purchases.",
      eaglesoft:
        "Premium, sold via Patterson reps with maintenance and support tiers. Sometimes bundled with hardware.",
    },
  },
];

export const defaultCapabilityIds: CapabilityId[] = ["schedule", "billing", "imaging", "apac"];
