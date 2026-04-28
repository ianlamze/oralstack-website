export type ProviderRole = "owner" | "associate" | "hygienist";

export type ProcedureMix = {
  category: string;
  productionSgd: number;
};

export type RecallCredit = {
  patientName: string;
  procedure: string;
  /** Production attributed back to the hygienist for the recall conversion. */
  productionSgd: number;
};

export type Provider = {
  id: string;
  name: string;
  role: ProviderRole;
  /** Commission rule shown verbatim to the provider — every figure traces back to this. */
  ruleDescription: string;
  /** Base monthly numbers — periods scale these. */
  productionSgd: number;
  collectionSgd: number;
  commissionSgd: number;
  hours: number;
  procedureMix: ProcedureMix[];
  /** Hygienists only: recall reminders that converted into procedures. */
  recallCredits?: RecallCredit[];
};

export type Period = {
  id: "wtd" | "mtd" | "qtd";
  label: string;
  daysLabel: string;
  scale: number; // multiplier applied to base monthly numbers
};
