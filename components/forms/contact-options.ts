export const PMS_OPTIONS = [
  { value: "None / new clinic", label: "No current system / new clinic" },
  { value: "Paper or spreadsheets", label: "Paper or spreadsheets" },
  { value: "Plato", label: "Plato" },
  { value: "Open Dental", label: "Open Dental" },
  { value: "Dentrix", label: "Dentrix" },
  { value: "Eaglesoft", label: "Eaglesoft" },
  { value: "Carestream", label: "Carestream" },
  { value: "Practice-Web", label: "Practice-Web" },
  { value: "Other", label: "Another system / not sure" },
];

export const START_MODE_OPTIONS = [
  { value: "new-clinic", label: "Start a new clinic with no existing system" },
  { value: "paper-spreadsheets", label: "Move from paper or spreadsheets" },
  { value: "existing-pms", label: "Move from an existing clinic system" },
  { value: "plato-connected", label: "Keep Plato connected" },
  { value: "exploring", label: "I'm still exploring" },
];

export const WORKFLOW_OPTIONS = [
  { value: "run-the-day", label: "Reception, schedule, or daily flow" },
  { value: "patient-care", label: "Patient folder or chairside care" },
  { value: "checkout-money", label: "Checkout, billing, or reconciliation" },
  { value: "patient-access", label: "Patient access, intake, or portal" },
  { value: "clinic-operations", label: "Inventory, staff, or clinic operations" },
  { value: "insights", label: "Insights or multi-clinic oversight" },
  { value: "organization-security", label: "Organization access or security controls" },
  { value: "not-sure", label: "Not sure yet" },
];

export const SECURITY_REQUEST_OPTIONS = [
  { value: "security-questionnaire", label: "Security questionnaire" },
  { value: "controls-walkthrough", label: "Controls walkthrough" },
  { value: "evidence-pack", label: "Current security evidence pack" },
  { value: "product-agreement", label: "Product agreement" },
  { value: "data-processing-terms", label: "Data processing terms" },
  { value: "subprocessor-information", label: "Deployment-specific subprocessors" },
  { value: "deployment-status", label: "Current deployment confirmation" },
  { value: "other", label: "Another procurement question" },
];

export const REQUEST_SOURCES = {
  "dfi-synergy": {
    label: "DFI Synergy · April 2026 Plato-connected pilot",
    context:
      "Evidence is historical, clinic-specific, and connected; it is not proof of a standalone clinic-system cutover.",
  },
  pricing: {
    label: "Guided pilot pricing",
    context:
      "The core pilot price is documented; data migration, optional connections, and clinic-specific setup are confirmed before kickoff.",
  },
  "solo-clinic": {
    label: "One-clinic guide",
    context:
      "Choose a guided standalone setup or keep an existing connection; the clinic record boundary is confirmed before a pilot.",
  },
  "clinic-group": {
    label: "Clinic-group guide",
    context:
      "Start mode, clinic-scoped access, group visibility, and enabled modules are reviewed location by location.",
  },
  integrations: {
    label: "Connections guide",
    context:
      "Oralstack can start through a guided standalone pilot; optional connector readiness and record ownership are confirmed for your clinic.",
  },
  switching: {
    label: "Switching & setup guide",
    context:
      "Tell us whether you are starting fresh, moving from another record, or keeping Plato connected so we can scope the right setup path.",
  },
  security: {
    label: "Security & compliance overview",
    context:
      "Repository evidence is dated; deployment-specific controls, processors, and open readiness work are reconfirmed during review.",
  },
  status: {
    label: "Capability status snapshot",
    context:
      "The public snapshot is dated and is not a live uptime feed; current deployment state still needs direct confirmation.",
  },
  about: {
    label: "About Oralstack",
    context:
      "Standalone use is currently scoped through a guided pilot; clinic workflow, record ownership, roles, setup, and optional connections are reviewed before kickoff.",
  },
} as const;

export type RequestSourceId = keyof typeof REQUEST_SOURCES;

export function getRequestSourceId(value: string | null): RequestSourceId | null {
  if (!value || !Object.hasOwn(REQUEST_SOURCES, value)) return null;
  return value as RequestSourceId;
}

const WORKFLOW_VALUES = new Set(WORKFLOW_OPTIONS.map((option) => option.value));
const SECURITY_REQUEST_VALUES = new Set(SECURITY_REQUEST_OPTIONS.map((option) => option.value));
const START_MODE_VALUES = new Set(START_MODE_OPTIONS.map((option) => option.value));

export function getWorkflowOptionValue(value: string | null): string | undefined {
  return value && WORKFLOW_VALUES.has(value) ? value : undefined;
}

export function getSecurityRequestOptionValue(value: string | null): string | undefined {
  return value && SECURITY_REQUEST_VALUES.has(value) ? value : undefined;
}

export function getStartModeOptionValue(value: string | null): string | undefined {
  return value && START_MODE_VALUES.has(value) ? value : undefined;
}
