export type ProcedureCategory = "restorative" | "preventive" | "endo" | "surgical" | "prosthetic";

export type ToothApplicability = "all" | "molar" | "premolar" | "anterior";

export type Procedure = {
  /** Singapore dental code (DCC* style); illustrative for the demo. */
  code: string;
  name: string;
  category: ProcedureCategory;
  /** Filter the procedure menu by tooth type. "all" = always available. */
  applicableTeeth: ToothApplicability;
  basePriceLow: number;
  basePriceHigh: number;
  /**
   * Blended insurance coverage estimate (0..1). Calibrated against a
   * "CHAS Blue + average IPP" baseline — kept conservative on purpose.
   */
  insuranceCoverage: number;
  /** Default phase for sequencing; user could re-phase later in v2. */
  defaultPhase: 1 | 2 | 3;
};

export type PlanItem = {
  /** Unique per-line id so duplicate same-tooth-same-procedure entries are addressable. */
  id: string;
  procedureCode: string;
  toothNumber: number;
};

export type PhaseTotals = {
  subtotal: number;
  insuranceEst: number;
  patientPortion: number;
};

export type PlanTotals = PhaseTotals & {
  gst: number;
  total: number;
  byPhase: Record<1 | 2 | 3, PhaseTotals>;
};

/**
 * Standard FDI quadrant classification — used to filter the procedure
 * menu by tooth type. Anterior = incisors + canines. Premolar = 4-5.
 * Molar = 6-8.
 */
export function classifyTooth(num: number): ToothApplicability {
  const last = num % 10;
  if (last >= 1 && last <= 3) return "anterior";
  if (last === 4 || last === 5) return "premolar";
  if (last >= 6 && last <= 8) return "molar";
  return "all";
}
