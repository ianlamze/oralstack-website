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
      "A named April 2026 pilot of Oralstack's appointment, reception, and reviewed checkout workflows for a three-chair clinic.",
    caseStudySlug: "dfi-synergy",
  },
];
