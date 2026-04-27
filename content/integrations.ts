export type IntegrationStatus = "Live" | "Beta" | "Roadmap";

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
  status: IntegrationStatus;
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
    title: "Imaging sensors & devices",
    description:
      "Direct sensor-bridge integration so chairside imagery captures into the patient chart, not a parallel folder on a separate desktop.",
    icon: "Camera",
    items: [
      { name: "Carestream sensors", status: "Beta", description: "Intraoral and panoramic." },
      { name: "Dexis sensors", status: "Beta", description: "Intraoral series." },
      { name: "Sopro intraoral cameras", status: "Beta", description: "SoproCare and SoproLife." },
      { name: "Planmeca sensors", status: "Roadmap", description: "ProSensor and ProMax." },
      { name: "Schick sensors", status: "Roadmap", description: "Schick 33 and Schick AE." },
      { name: "Generic TWAIN", status: "Roadmap", description: "Fallback for legacy or unsupported devices." },
    ],
  },
  {
    title: "Imaging exchange & viewers",
    description:
      "DICOM-native exchange so radiographs and 3D scans move between Oralstack and external viewers without lossy conversion.",
    icon: "Aperture",
    items: [
      { name: "DICOM C-STORE / C-FIND", status: "Live", description: "Standard DICOM network protocol." },
      { name: "OHIF Viewer", status: "Live", description: "Embedded open-source DICOM viewer." },
      { name: "Romexis", status: "Roadmap", description: "Planmeca viewer + workflow integration." },
      { name: "Dolphin", status: "Roadmap", description: "Orthodontic imaging + treatment planning." },
    ],
  },
  {
    title: "Patient communication",
    description: "Region-routed messaging so reminders, recalls, and intake forms reach patients on the channel they use.",
    icon: "MessageSquare",
    items: [
      { name: "WhatsApp Business API", status: "Beta", description: "Singapore-region routing, templated messaging." },
      { name: "SMS via Twilio", status: "Live", description: "Worldwide SMS delivery." },
      { name: "Email (SMTP / SendGrid)", status: "Live", description: "Transactional and templated email." },
    ],
  },
  {
    title: "Payments",
    description: "Take payment at discharge, in the same flow as billing.",
    icon: "CreditCard",
    items: [
      { name: "Stripe", status: "Beta", description: "Card payments in supported regions." },
      { name: "PayNow (Singapore)", status: "Roadmap", description: "Local instant transfer via QR." },
      { name: "Card terminal integration", status: "Roadmap", description: "Tap-to-pay devices via partner." },
    ],
  },
  {
    title: "Identity & SSO",
    description: "Sign in with what your team and patients already use.",
    icon: "KeyRound",
    items: [
      { name: "Google Workspace SSO", status: "Live", description: "OAuth-based staff sign-in." },
      { name: "Microsoft 365 SSO", status: "Live", description: "Azure AD / Entra ID." },
      { name: "SingPass", status: "Beta", description: "Patient identity verification for Singapore deployments." },
    ],
  },
  {
    title: "Accounting & exports",
    description: "Hand financial data to the systems your accountants already run.",
    icon: "FileSpreadsheet",
    items: [
      { name: "Xero", status: "Beta", description: "Daily revenue + invoice export." },
      { name: "QuickBooks", status: "Roadmap", description: "Daily revenue + invoice export." },
      { name: "CSV / JSON export", status: "Live", description: "Audit-ready exports of any clinical or financial table." },
    ],
  },
  {
    title: "Migration",
    description: "Move from legacy PMS to Oralstack without losing patient history.",
    icon: "ArrowRightLeft",
    items: [
      { name: "Plato → Oralstack", status: "Beta", description: "Field-for-field migration tooling for the dominant Singapore PMS." },
      { name: "Open Dental CSV import", status: "Live", description: "Standard schema import." },
      { name: "Generic CSV import", status: "Live", description: "For clinics on home-grown systems or spreadsheets." },
    ],
  },
];
