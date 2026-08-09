/** @deprecated Kept for the legacy StatusBadge component. */
export type IntegrationStatus = "Live" | "Beta" | "Roadmap";

export type IntegrationAvailability = "Available" | "Configured pilot" | "Not enabled";

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
