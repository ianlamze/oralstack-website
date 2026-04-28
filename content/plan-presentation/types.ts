export type PlanPriority = "urgent" | "health" | "cosmetic";

export type PlanProcedure = {
  code: string;
  label: string;
  toothLabel?: string;
  qty: number;
  unitPriceSgd: number;
  /** Estimated coverage from MediSave / CHAS / IPP. */
  insuranceSgd: number;
};

export type PlanPhase = {
  id: string;
  name: string;
  priority: PlanPriority;
  description: string;
  procedures: PlanProcedure[];
  acceptedByDefault: boolean;
};

export type PlanContext = {
  patientName: string;
  greeting: string;
  presentedAt: string;
  presentedBy: string;
  insuranceLabel: string; // "IPP · NTUC Plus" or similar
};

export type PlanConversion = {
  presentedThisWeek: number;
  acceptedToday: number;
  acceptanceRate90d: number; // percent
};
