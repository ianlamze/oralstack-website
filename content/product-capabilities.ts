export type CapabilityAvailability = "available" | "configured";

export type CapabilityVisual = "schedule" | "odontogram" | "checkout" | "analytics";

export type CapabilityFeature = {
  title: string;
  description: string;
  availability: CapabilityAvailability;
};

export type ProductCapability = {
  slug: string;
  legacySlugs: readonly string[];
  eyebrow: string;
  title: string;
  summary: string;
  availability: CapabilityAvailability;
  visual?: CapabilityVisual;
  features: readonly CapabilityFeature[];
  keepsTogether: string;
  boundary: string;
};

export const capabilityAvailabilityLabels: Record<CapabilityAvailability, string> = {
  available: "Available now",
  configured: "Available with clinic setup",
};

export const productCapabilities: readonly ProductCapability[] = [
  {
    slug: "run-the-day",
    legacySlugs: ["front-desk", "scheduling"],
    eyebrow: "Run the day",
    title: "Move patients from arrival to checkout without losing the handoff.",
    summary:
      "Reception works from the Plato-connected schedule, confirms arrivals, handles walk-ins, seats patients, tracks chair status, and sends completed visits to checkout.",
    availability: "configured",
    visual: "schedule",
    features: [
      {
        title: "Work from the connected schedule",
        description:
          "Read provider availability and create or cancel Plato-backed appointments from the same workspace.",
        availability: "configured",
      },
      {
        title: "Keep reschedules reviewable",
        description:
          "For Plato-backed clinics, oralstack stages a proposed move for staff to apply in Plato and then resolve.",
        availability: "configured",
      },
      {
        title: "Run reception and chair flow",
        description:
          "Confirm arrival, check in, seat the patient, update chair status, and hand the visit to checkout.",
        availability: "available",
      },
    ],
    keepsTogether:
      "provider availability, arrivals, walk-ins, chair status, handoffs, and checkout readiness",
    boundary:
      "Plato remains the scheduling source of truth for API-connected clinics. oralstack does not present a staged reschedule as a completed Plato write.",
  },
  {
    slug: "patient-care",
    legacySlugs: ["charting", "imaging"],
    eyebrow: "Patient care",
    title: "Open one patient folder from timeline to chairside record.",
    summary:
      "The patient folder brings together clinical history, visits, billing context, subsidy details, membership, and patient-scoped administration without splitting the chairside record across windows.",
    availability: "available",
    visual: "odontogram",
    features: [
      {
        title: "Chart teeth and periodontal findings",
        description:
          "Record dental chart findings, full-mouth periodontal sessions, risk context, review status, and exports.",
        availability: "available",
      },
      {
        title: "Document the visit",
        description:
          "Write, sign, and amend notes; build treatment plans; issue prescriptions; and prepare clinical letters for review.",
        availability: "available",
      },
      {
        title: "Keep evidence attached",
        description:
          "Upload clinical media, link it to notes, add annotations, and review the patient-level clinical audit history.",
        availability: "available",
      },
    ],
    keepsTogether:
      "charting, perio, case notes, treatment plans, prescriptions, clinical media, letters, and audit history",
    boundary:
      "External AI providers, DICOM, the X-ray bridge, NEHR submission, treatment-plan sharing, and visit summaries remain outside current live claims.",
  },
  {
    slug: "checkout-money",
    legacySlugs: ["billing"],
    eyebrow: "Checkout and money",
    title: "Build the checkout, record payment, and leave a receipt trail.",
    summary:
      "Staff review billable lines, tax, discounts, CHAS details, and payer portions before recording payment and issuing a receipt.",
    availability: "configured",
    visual: "checkout",
    features: [
      {
        title: "Prepare the bill",
        description:
          "Use the clinic catalogue, frequently used items, fee presets, manual lines, tax profiles, and payer rules to build a reviewable draft.",
        availability: "available",
      },
      {
        title: "Separate who owes what",
        description:
          "Track patient, payer, corporate, and CHAS portions with manual status and reconciliation notes.",
        availability: "available",
      },
      {
        title: "Close with a receipt",
        description:
          "Record the payment method, preview the receipt, and send or resend the final receipt from the checkout record.",
        availability: "configured",
      },
    ],
    keepsTogether:
      "billable lines, payer portions, CHAS context, payment records, receipts, credits, and settlements",
    boundary:
      "Online payment processing, refunds, self-checkout, SmartCMS submission, and native invoicing are controlled rollouts and are not presented as live.",
  },
  {
    slug: "patient-access",
    legacySlugs: ["online-bookings", "recall"],
    eyebrow: "Patient access",
    title: "Give patients a secure path into the clinic.",
    summary:
      "Token-based intake and the patient portal let patients complete registration, review balances and visits, accept treatment consent, request a suitable time, and message the clinic.",
    availability: "configured",
    features: [
      {
        title: "Collect intake before the chair",
        description:
          "Issue expiring intake sessions with returning-patient prefill, draft saving, consent, signature, kiosk, and staff-assisted paths.",
        availability: "available",
      },
      {
        title: "Keep a patient portal open",
        description:
          "Share balances, payment history, upcoming visits, treatment consents, and a first-party message thread through a revocable link.",
        availability: "configured",
      },
      {
        title: "Request a time with the dentist",
        description:
          "Patients can choose an available slot and send an interest request for staff confirmation. The request is not an automatic booking.",
        availability: "configured",
      },
      {
        title: "Retrieve identity details with Singpass",
        description:
          "Clinics with approved MyInfo setup can offer Singpass retrieval as an intake option while retaining the manual form path.",
        availability: "configured",
      },
    ],
    keepsTogether:
      "registration, consent, portal history, time requests, and first-party patient messages",
    boundary:
      "Public self-booking, booking deposits, the patient-form builder, dynamic consent builder, and automated WhatsApp or SMS outreach are not live claims.",
  },
  {
    slug: "clinic-operations",
    legacySlugs: [],
    eyebrow: "Clinic operations",
    title: "Track the work that keeps a clinic supplied and staffed.",
    summary:
      "Managers can work from operational records for stock, suppliers, receiving, staff time, lab cases, contracts, and payroll preparation.",
    availability: "available",
    features: [
      {
        title: "Manage stock and suppliers",
        description:
          "Record inventory movements, dispensing, supplier items, reorder requests, purchase status, receiving, and usage recipes.",
        availability: "available",
      },
      {
        title: "Review staff time",
        description:
          "Capture clock events, review corrections, approve timesheets and commissions, and prepare payroll exports.",
        availability: "available",
      },
      {
        title: "Work through clinic finance",
        description:
          "Track lab suppliers, invoices and cases alongside dentist contracts, commission runs, payslips, and clawbacks.",
        availability: "available",
      },
    ],
    keepsTogether:
      "inventory, suppliers, receiving, staff time, lab work, contracts, commissions, and payroll preparation",
    boundary:
      "Nurse base salary processing is a controlled rollout. Staff operations are described as clinic records, not as a payroll service.",
  },
  {
    slug: "insights",
    legacySlugs: ["operations"],
    eyebrow: "Insights",
    title: "Read the day from clinic activity, not a parallel spreadsheet.",
    summary:
      "Managers can review daily huddle metrics, operational queues, receivables, schedule pressure, provider activity, and product-usage signals from the records staff already use.",
    availability: "available",
    visual: "analytics",
    features: [
      {
        title: "Start with the daily huddle",
        description:
          "Review production booked and collected, outstanding payer money, patient mix, today-only chair utilisation, and clearly labeled no-show or recall estimates.",
        availability: "available",
      },
      {
        title: "Work operational pressure",
        description:
          "Inspect daily close, receivables, schedule queues, inventory and lab totals, and owner-assigned operational tasks.",
        availability: "available",
      },
      {
        title: "Review provider and workflow signals",
        description:
          "Use read-only provider performance, workflow completion, friction, and web-vital reports to find where the day is slowing down.",
        availability: "available",
      },
    ],
    keepsTogether:
      "daily huddle metrics, receivables, schedule pressure, provider performance, and workflow friction",
    boundary:
      "The separate lapsing-patient and unscheduled-treatment Insights worklists remain a controlled rollout and are not marketed as live.",
  },
  {
    slug: "organization-security",
    legacySlugs: ["compliance"],
    eyebrow: "Organization and security",
    title: "Control clinic access and keep the audit trail reviewable.",
    summary:
      "Staff access, organization roles, clinic membership, tenant boundaries, and audit evidence sit behind the workflows that handle patient and clinic data.",
    availability: "available",
    features: [
      {
        title: "Invite and recover staff access",
        description:
          "Admins can issue revocable email invitations, assign supported roles, and let staff complete one-time password recovery.",
        availability: "available",
      },
      {
        title: "Operate across an organization",
        description:
          "Organization administrators can manage people and clinic membership while each request remains scoped to an active clinic.",
        availability: "available",
      },
      {
        title: "Keep security evidence",
        description:
          "Row-level tenant controls, required PII encryption keys, origin checks, and chained audit evidence protect the current production boundary.",
        availability: "available",
      },
    ],
    keepsTogether:
      "staff invitations, role-based access, organization membership, clinic scope, and audit evidence",
    boundary:
      "These are product controls, not a certification claim. Granular custom-role enforcement, SCIM, device trust, and mandatory MFA remain outside current live claims.",
  },
];

export const workflowsPageContent = {
  metadata: {
    title: "Dental clinic workflows",
    description:
      "Explore the oralstack workflows available now for Plato-connected dental clinics: reception, patient care, checkout, patient access, clinic operations, insights, and organization security.",
  },
  eyebrow: "Product capabilities",
  title: "Seven connected workflows in the current oralstack app.",
  intro:
    "Follow a patient from the front desk to the chair, checkout, follow-up, and the records managers review after the day closes. Every capability below is available now or available after documented clinic setup.",
  keepsTogetherLabel: "Keeps together",
  boundaryLabel: "Product boundary",
  platoBoundary: {
    eyebrow: "Plato-reviewed boundary",
    title: "oralstack adds the workflow layer. Plato stays the source of truth.",
    body: "For API-connected clinics, oralstack reads and extends the existing Plato record. Patient identity, Plato schedule writes, and invoice writeback stay inside reviewed paths. A proposed reschedule still needs staff confirmation in Plato, and a local fallback is never described as a delivered writeback.",
  },
  rolloutPolicy: {
    eyebrow: "Availability standard",
    title: "Current app, not roadmap.",
    body: "The seven groups above contain only shipped capabilities and features that become available after explicit clinic setup. Code behind controlled rollout gates is not presented as live product functionality.",
    items: [
      "Public self-booking, deposits, online payment processing, refunds, and self-checkout",
      "DICOM, the X-ray bridge, NEHR, SmartCMS, teleconsultation, and external clinical AI providers",
      "Automated WhatsApp or SMS outreach, waitlist backfill, treatment packages, patient merge, and paper-record migration",
    ],
  },
  cta: {
    title: "See the current workflows with your clinic setup in mind.",
    body: "A 30-minute demo follows the front desk, clinician, and clinic manager through the shipped oralstack paths on a representative Singapore clinic dataset.",
    label: "Book a demo",
    href: "/book-a-demo",
  },
} as const;

export const workflowsSectionContent = {
  eyebrow: "Product capabilities",
  title: "The workflows busy dental clinics run every day.",
  body: "Seven audited capability groups from the current oralstack app, with clinic setup called out where it is required.",
  cardAction: "Explore this workflow",
  pageAction: "See all seven workflows",
} as const;
