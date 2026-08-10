/** @deprecated Kept for the legacy StatusBadge component. */
export type IntegrationStatus = "Live" | "Beta" | "Roadmap";

export type IntegrationAvailability =
  | "Available"
  | "Available with clinic setup"
  | "Configured pilot"
  | "Not enabled";

export type IntegrationIcon =
  | "Camera"
  | "Aperture"
  | "MessageSquare"
  | "CreditCard"
  | "KeyRound"
  | "FileSpreadsheet"
  | "ArrowRightLeft";

export type Integration = {
  name: string;
  status: IntegrationAvailability;
  description: string;
};

export type IntegrationCategory = {
  title: string;
  description: string;
  icon: IntegrationIcon;
  items: Integration[];
};

export const integrationsPageContent = {
  metadata: {
    title: "Clinic connections and rollout status",
    description:
      "See how Oralstack runs as a guided standalone clinic workspace, when clinic setup is required, and which optional connections are available, in pilot, or not enabled.",
  },
  eyebrow: "Connections",
  title: "Start with Oralstack. Connect only what your clinic needs.",
  intro:
    "The default path is a guided standalone pilot. Patient, schedule, clinical, checkout, and operations modules become the clinic's working record only after their setup and ownership boundaries are verified.",
  primaryAction: {
    label: "Plan a standalone rollout",
    href: "/switching",
  },
  secondaryAction: {
    label: "Review the optional Plato connection",
    href: "#plato",
  },
  summaryEyebrow: "Standalone rollout",
  summary: [
    { label: "Default path", value: "Guided standalone pilot" },
    { label: "Record ownership", value: "Agreed module by module" },
    { label: "Plato", value: "Optional clinic connection" },
    { label: "External services", value: "Enabled by rollout state" },
  ],
  platoEyebrow: "Optional clinic connection",
  rolloutAction: {
    title: "Plan the record model before connecting another system.",
    body: "Start with the guided standalone path, then identify any existing records, exports, or optional connections the clinic needs before go-live.",
    primaryLabel: "Plan your rollout",
    primaryHref: "/switching",
    secondaryLabel: "Ask about another connection",
    secondaryHref: "/contact/?intent=question&source=integrations#request",
  },
} as const;

export const platoConnection = {
  status: "Available with clinic setup" as IntegrationAvailability,
  snapshot: "Production-state snapshot recorded 20 July 2026",
  title: "Keep Plato authoritative when your clinic needs it.",
  description:
    "Plato is an optional clinic-configured connection. When selected, Oralstack coordinates the reception, chairside, checkout, and manager handoffs around the Plato record without silently changing which system is authoritative.",
  stages: [
    {
      eyebrow: "Connect",
      title: "Connect the existing clinic record",
      description:
        "A clinic that chooses this path can use supported Plato-backed provider availability, patient context, and appointments inside the Oralstack workspace after connector review.",
    },
    {
      eyebrow: "Work",
      title: "Coordinate the handoffs around the record",
      description:
        "Run reception, chair status, requests, patient context, checkout preparation, clinic operations, and manager review while Plato remains authoritative for the agreed records.",
    },
    {
      eyebrow: "Review",
      title: "Keep changes back to Plato explicit",
      description:
        "Appointment creation and cancellation use reviewed Plato-backed paths. A reschedule remains a staff-applied proposal, and checkout work never implies a silent claim or payment posting.",
    },
  ],
  guarantees: [
    "For clinics using this connection, Plato remains the system of record for patient identity, supported schedule writes, and invoice writeback.",
    "Sync health, update status, and audit history remain visible to staff.",
    "A local fallback is never described as a delivered Plato writeback.",
    "Clinic credentials, connector access, enabled modules, and rollout scope are reviewed before a pilot starts.",
  ],
} as const;

export const integrationCategories: IntegrationCategory[] = [
  {
    title: "Patient communication",
    description:
      "The transport, credentials, consent, and sending mode determine what can be enabled for each clinic.",
    icon: "MessageSquare",
    items: [
      {
        name: "Meta WhatsApp Business Cloud API",
        status: "Configured pilot",
        description:
          "Clinic-owned Meta credentials can enable webhooks, a shared inbox, manual replies, and approved templates after a readiness review.",
      },
      {
        name: "WhatsApp Flows and reminder automation",
        status: "Not enabled",
        description:
          "Automated intake, reminder, and live-send worker controls are off in the latest recorded production configuration.",
      },
    ],
  },
  {
    title: "Payer workflows",
    description:
      "Oralstack can support the clinic-side estimate and reconciliation workflow without claiming an external government submission.",
    icon: "CreditCard",
    items: [
      {
        name: "CHAS estimate and payer tracking",
        status: "Available",
        description:
          "Tier guidance, an Oralstack estimate, checkout splitting, and manual reconciliation. CHAS and the clinic's existing system remain authoritative.",
      },
      {
        name: "SmartCMS electronic submission",
        status: "Not enabled",
        description:
          "The claim lifecycle is implemented locally, but the outbound SmartCMS gateway is deliberately not connected.",
      },
      {
        name: "MediSave electronic claims",
        status: "Not enabled",
        description:
          "Eligibility can be represented in the local workflow; no production MediSave submission transport is claimed.",
      },
    ],
  },
  {
    title: "Accounting and exports",
    description:
      "Reviewed exports are available for handoff. Direct accounting-system posting is a separate capability and is not implied.",
    icon: "FileSpreadsheet",
    items: [
      {
        name: "Finance reconciliation CSV",
        status: "Available",
        description:
          "Copy reviewed finance reconciliation data as CSV for an accountant or an existing accounting workflow.",
      },
      {
        name: "Clinic insights CSV",
        status: "Available",
        description:
          "Export the currently displayed clinic-insights view for local review and analysis.",
      },
      {
        name: "Direct Xero OAuth and posting",
        status: "Not enabled",
        description:
          "There is no direct Xero connection or automatic posting. Use the reviewed CSV handoff instead.",
      },
    ],
  },
  {
    title: "Identity and access",
    description:
      "Current access controls are native to Oralstack. External identity-provider support is listed separately so it is not mistaken for active SSO.",
    icon: "KeyRound",
    items: [
      {
        name: "Password sign-in and TOTP MFA",
        status: "Available",
        description:
          "TOTP enrolment and sign-in checks are implemented. Clinic-wide MFA enforcement is not enabled in the latest recorded production configuration.",
      },
      {
        name: "Organization and clinic access",
        status: "Available",
        description:
          "Authorized organization owners and managers can administer membership and exact clinic access across a multi-clinic group.",
      },
      {
        name: "Google Workspace or Microsoft Entra SSO",
        status: "Not enabled",
        description: "No production Google or Microsoft staff SSO is currently represented.",
      },
      {
        name: "SCIM provisioning",
        status: "Not enabled",
        description: "The route surface is dark and the latest recorded production flag is off.",
      },
    ],
  },
  {
    title: "Imaging exchange",
    description:
      "Generic DICOM work has been built and tested behind dark-launch controls; that is not the same as a production imaging integration.",
    icon: "Aperture",
    items: [
      {
        name: "Generic DICOMweb ingest and viewer",
        status: "Not enabled",
        description:
          "Tenant-scoped ingest and viewing exist for controlled evaluation, but the latest recorded production flags are off.",
      },
      {
        name: "Calibrated image measurements",
        status: "Not enabled",
        description:
          "Requires calibration metadata plus clinical and regulatory approval; uncalibrated images do not fabricate millimetre values.",
      },
      {
        name: "Named sensor-device bridges",
        status: "Not enabled",
        description: "No production sensor SDK connector is currently advertised as available.",
      },
    ],
  },
];
