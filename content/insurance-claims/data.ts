import type { Claim, SchemeMeta } from "./types";

export const schemes: SchemeMeta[] = [
  {
    id: "medisave",
    label: "MediSave",
    blurb: "Surgical procedures · CPF-funded · capped per-procedure.",
  },
  {
    id: "chas",
    label: "CHAS",
    blurb: "Means-tested subsidy · Blue / Orange / Green tiers.",
  },
  {
    id: "ipp",
    label: "IPP",
    blurb: "Integrated Shield Plans · NTUC, AIA, Prudential, Great Eastern.",
  },
];

// Six representative claims across the five statuses. Pavithra R is the
// rejected case — clicking the card shows the reason and a one-click fix.

export const initialClaims: Claim[] = [
  {
    id: "cl1",
    patientName: "Hafiz Yusof",
    procedure: "Surgical wisdom tooth · 38",
    procedureCode: "SF813A",
    scheme: "medisave",
    schemeLabel: "MediSave",
    amountSgd: 950,
    status: "drafted",
    autoDrafted: true,
  },
  {
    id: "cl2",
    patientName: "Mei Lin Tan",
    procedure: "Polish & scale",
    procedureCode: "PR101",
    scheme: "chas",
    schemeLabel: "CHAS Blue",
    amountSgd: 42,
    status: "submitted",
    submittedAgo: "12 hours ago",
  },
  {
    id: "cl3",
    patientName: "Lim Wei Jian",
    procedure: "Root canal · 36",
    procedureCode: "EN302",
    scheme: "ipp",
    schemeLabel: "IPP · NTUC Plus",
    amountSgd: 1280,
    status: "submitted",
    submittedAgo: "3 days ago",
  },
  {
    id: "cl4",
    patientName: "Tan Boon Hwee",
    procedure: "Crown · 24 zirconia",
    procedureCode: "PR402",
    scheme: "ipp",
    schemeLabel: "IPP · AIA Achieva",
    amountSgd: 1450,
    amountApprovedSgd: 1280,
    status: "approved",
    submittedAgo: "Yesterday",
  },
  {
    id: "cl5",
    patientName: "Pavithra R",
    procedure: "Polish & scale",
    procedureCode: "PR101",
    scheme: "chas",
    schemeLabel: "CHAS Orange",
    amountSgd: 32,
    status: "rejected",
    submittedAgo: "2 days ago",
    rejectionReason: "Patient address on claim doesn't match NRIC record.",
    rejectionFixHint: "Refresh from SingPass and resubmit — usually clears in 24 hours.",
  },
  {
    id: "cl6",
    patientName: "Daniel Ong",
    procedure: "Surgical extraction · 47",
    procedureCode: "SF811A",
    scheme: "medisave",
    schemeLabel: "MediSave",
    amountSgd: 300,
    amountApprovedSgd: 300,
    status: "paid",
    submittedAgo: "Last week",
  },
];
