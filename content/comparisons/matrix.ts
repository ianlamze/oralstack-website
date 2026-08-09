// Current-scope matrix for the archived comparison builder. Competitor cells
// deliberately avoid stale feature claims; vendor capabilities and pricing
// should be confirmed from the vendor during an evaluation.

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

const confirmWithVendor: Record<CompetitorId, string> = {
  plato: "Confirm current Plato scope, deployment, and commercial terms directly with Plato.",
  dentrix:
    "Confirm the current Dentrix product edition, deployment, and terms with Henry Schein One.",
  "open-dental": "Confirm the intended hosting model, support plan, and modules with Open Dental.",
  carestream:
    "Confirm the exact Carestream product, regional availability, and device scope with the vendor.",
  eaglesoft: "Confirm current Eaglesoft deployment, modules, and regional support with Patterson.",
};

export const capabilities: Capability[] = [
  {
    id: "deployment",
    label: "Product role",
    rationale: "Whether the product is the system of record or an operational layer around it.",
    oralstack:
      "A browser-based operations and clinical workflow layer that currently extends Plato through reviewed connections and writebacks.",
    competitors: confirmWithVendor,
  },
  {
    id: "schedule",
    label: "Clinic-day workflow",
    rationale: "How reception moves from the schedule to queue, chair, and checkout.",
    oralstack:
      "My Day, Command, Appointments, Inbox, Requests, Daily huddle, Reception, Chairside, and Checkout share one staff shell.",
    competitors: confirmWithVendor,
  },
  {
    id: "billing",
    label: "Checkout & money",
    rationale: "How staff review line items, payer portions, payment records, and follow-up.",
    oralstack:
      "Reviewed checkout drafts, CHAS and payer estimates, manual payment recording, receipts, and billing/AR worklists. External payer systems remain authoritative.",
    competitors: confirmWithVendor,
  },
  {
    id: "charting",
    label: "Patient & clinical workspace",
    rationale: "The clinical record and the visit context staff can reach from one patient folder.",
    oralstack:
      "Chart, perio, notes, plans, Rx, ordinary clinical media, letters, diagnoses, and audit beside timeline, visits, billing, subsidy, and membership.",
    competitors: confirmWithVendor,
  },
  {
    id: "imaging",
    label: "Clinical media",
    rationale: "What image and document handling is generally available today.",
    oralstack:
      "Uploads for photos, radiographs, scans, documents, and other clinical media, with captions, annotations, note links, and archive. DICOM/device ingest is not generally enabled.",
    competitors: confirmWithVendor,
  },
  {
    id: "recall",
    label: "Patient access",
    rationale: "How patients send information and requests without implying automated outreach.",
    oralstack:
      "Intake portal, patient portal, staff-approved find-a-time requests, first-party secure messaging, and Singpass MyInfo where configured.",
    competitors: confirmWithVendor,
  },
  {
    id: "multi-clinic",
    label: "Organization & group view",
    rationale: "How authorized managers work across clinics and control access.",
    oralstack:
      "Organization staff/access management, authorized clinic switching, group health, and today-KPI rollups with clinic-scoped permissions.",
    competitors: confirmWithVendor,
  },
  {
    id: "apac",
    label: "Security boundary",
    rationale: "The concrete controls currently enforced around tenant and patient data.",
    oralstack:
      "Singapore-region hosting, PostgreSQL row-level tenant isolation, selected-field encryption, origin guardrails, and tamper-evident audit chaining.",
    competitors: confirmWithVendor,
  },
  {
    id: "setup",
    label: "Integration boundary",
    rationale: "Which actions remain reviewed, external, or controlled rollouts.",
    oralstack:
      "Plato remains the connected source for core legacy workflows. Public booking, automated messaging, DICOM, AI providers, and integrated claims/payments are controlled or disabled—not base scope.",
    competitors: confirmWithVendor,
  },
  {
    id: "pricing",
    label: "Commercial scope",
    rationale:
      "Pricing and availability should be tied to a dated proposal, not assumed from a feature table.",
    oralstack:
      "Pilot terms are confirmed per clinic and deployment. Ask for a current written scope covering enabled modules, onboarding, and any configured integrations.",
    competitors: confirmWithVendor,
  },
];

export const defaultCapabilityIds: CapabilityId[] = [
  "deployment",
  "schedule",
  "charting",
  "billing",
];
