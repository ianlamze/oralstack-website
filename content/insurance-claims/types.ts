export type ClaimScheme = "medisave" | "chas" | "ipp";

export type ClaimStatus = "drafted" | "submitted" | "approved" | "rejected" | "paid";

export type Claim = {
  id: string;
  patientName: string;
  procedure: string;
  procedureCode: string; // e.g. "SF813A"
  scheme: ClaimScheme;
  schemeLabel: string; // e.g. "MediSave", "CHAS Blue", "IPP · NTUC Plus"
  amountSgd: number; // claim amount
  amountApprovedSgd?: number; // populated for approved/paid
  status: ClaimStatus;
  submittedAgo?: string; // "12 hours ago"
  rejectionReason?: string;
  rejectionFixHint?: string;
  /** Auto-packaged from a completed procedure — show "auto-drafted" badge. */
  autoDrafted?: boolean;
};

export type SchemeMeta = {
  id: ClaimScheme;
  label: string;
  blurb: string;
};
