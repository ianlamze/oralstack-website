export type CustomerStatus = "live" | "pilot" | "in-conversation";

export type Customer = {
  id: string;
  name: string;
  location: string;
  status: CustomerStatus;
  specialty?: string;
  size?: string;
  pilotStart?: string;
  blurb: string;
  caseStudySlug?: string;
};

export const customers: Customer[] = [
  {
    id: "dfi-synergy",
    name: "DFI Synergy",
    location: "Singapore",
    status: "pilot",
    specialty: "General + hygiene",
    size: "3 chairs · 4 providers",
    pilotStart: "April 2026",
    blurb:
      "Replaced a paper-and-WhatsApp booking workflow with Oralstack's drag-to-reschedule schedule and discharge-flow billing in three weeks.",
    caseStudySlug: "dfi-synergy",
  },
];
