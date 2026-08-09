export const PMS_OPTIONS = [
  { value: "Plato", label: "Plato" },
  { value: "Open Dental", label: "Open Dental" },
  { value: "Dentrix", label: "Dentrix" },
  { value: "Eaglesoft", label: "Eaglesoft" },
  { value: "Practice-Web", label: "Practice-Web" },
  { value: "Other", label: "Other / not sure" },
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

export const REQUEST_SOURCES = {
  "dfi-synergy": {
    label: "DFI Synergy · April 2026 pilot",
    context:
      "Evidence is historical and clinic-specific; the current product boundary still applies.",
  },
} as const;

export type RequestSourceId = keyof typeof REQUEST_SOURCES;

export function getRequestSourceId(value: string | null): RequestSourceId | null {
  if (!value || !Object.hasOwn(REQUEST_SOURCES, value)) return null;
  return value as RequestSourceId;
}

const WORKFLOW_VALUES = new Set(WORKFLOW_OPTIONS.map((option) => option.value));

export function getWorkflowOptionValue(value: string | null): string | undefined {
  return value && WORKFLOW_VALUES.has(value) ? value : undefined;
}
