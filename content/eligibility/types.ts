export type ChasTier = "none" | "blue" | "orange" | "pioneer" | "merdeka";

export type InsurancePlan = "none" | "ipp-basic" | "ipp-comprehensive" | "employer";

export type ProcedureCategory = "preventive" | "restorative" | "surgical" | "prosthetic";

export type EligibilityProcedure = {
  code: string;
  name: string;
  category: ProcedureCategory;
  basePrice: number;
  /** Whether this procedure can be claimed against MediSave (Singapore-specific). */
  medisaveEligible?: boolean;
};

export const procedures: EligibilityProcedure[] = [
  { code: "DCC301", name: "Polish & scale", category: "preventive", basePrice: 100 },
  {
    code: "DCC108",
    name: "Composite filling (2 surface)",
    category: "restorative",
    basePrice: 220,
  },
  {
    code: "DCC403",
    name: "Root canal therapy (molar)",
    category: "restorative",
    basePrice: 1500,
  },
  { code: "DCC502", name: "Crown, ceramic", category: "prosthetic", basePrice: 1700 },
  {
    code: "DCC601",
    name: "Extraction (simple)",
    category: "surgical",
    basePrice: 140,
    medisaveEligible: true,
  },
  {
    code: "DCC602",
    name: "Extraction (surgical)",
    category: "surgical",
    basePrice: 550,
    medisaveEligible: true,
  },
];

export const chasLabel: Record<ChasTier, string> = {
  none: "None / private rate",
  blue: "CHAS Blue",
  orange: "CHAS Orange",
  pioneer: "Pioneer Generation",
  merdeka: "Merdeka Generation",
};

export const chasSubtitle: Record<ChasTier, string> = {
  none: "—",
  blue: "Lower-income subsidy",
  orange: "Middle-income subsidy",
  pioneer: "≥1949 birth cohort",
  merdeka: "1950–59 birth cohort",
};

export const insuranceLabel: Record<InsurancePlan, string> = {
  none: "None / self-pay",
  "ipp-basic": "IPP basic plan",
  "ipp-comprehensive": "IPP comprehensive",
  employer: "Employer health benefit",
};

/**
 * Subsidy rates per CHAS tier × procedure category (0..1). Indicative — real
 * CHAS subsidies have per-procedure caps the demo simplifies away.
 */
const chasRate: Record<ChasTier, Record<ProcedureCategory, number>> = {
  none: { preventive: 0, restorative: 0, surgical: 0, prosthetic: 0 },
  blue: { preventive: 0.4, restorative: 0.3, surgical: 0.3, prosthetic: 0.15 },
  orange: { preventive: 0.25, restorative: 0.18, surgical: 0.18, prosthetic: 0.1 },
  pioneer: { preventive: 0.55, restorative: 0.45, surgical: 0.45, prosthetic: 0.25 },
  merdeka: { preventive: 0.5, restorative: 0.4, surgical: 0.4, prosthetic: 0.2 },
};

const insuranceRate: Record<InsurancePlan, number> = {
  none: 0,
  "ipp-basic": 0.25,
  "ipp-comprehensive": 0.45,
  employer: 0.6,
};

const MEDISAVE_CAP_PER_PROCEDURE = 300; // SGD; demo simplification

export type EstimateBreakdown = {
  subtotal: number;
  chasSubsidy: number;
  insuranceClaim: number;
  medisaveApplied: number;
  patientPortion: number;
  gst: number;
  total: number;
  /** Per-line breakdown for the card. */
  lines: { code: string; name: string; price: number; coverage: number }[];
};

const GST_RATE = 0.09;

export function computeEstimate(
  selectedCodes: string[],
  chas: ChasTier,
  insurance: InsurancePlan,
): EstimateBreakdown {
  const selected = procedures.filter((p) => selectedCodes.includes(p.code));
  let subtotal = 0;
  let chasSubsidy = 0;
  let insuranceClaim = 0;
  let medisaveApplied = 0;
  const lines: EstimateBreakdown["lines"] = [];

  for (const p of selected) {
    subtotal += p.basePrice;

    const chasOff = p.basePrice * chasRate[chas][p.category];
    chasSubsidy += chasOff;

    const remainingAfterChas = p.basePrice - chasOff;
    const insOff = remainingAfterChas * insuranceRate[insurance];
    insuranceClaim += insOff;

    const remainingAfterInsurance = remainingAfterChas - insOff;
    let medisaveOff = 0;
    if (p.medisaveEligible) {
      medisaveOff = Math.min(MEDISAVE_CAP_PER_PROCEDURE, remainingAfterInsurance);
      medisaveApplied += medisaveOff;
    }

    const linePatient = remainingAfterInsurance - medisaveOff;
    lines.push({
      code: p.code,
      name: p.name,
      price: p.basePrice,
      coverage: p.basePrice - linePatient,
    });
  }

  const patientPortion = subtotal - chasSubsidy - insuranceClaim - medisaveApplied;
  const gst = patientPortion * GST_RATE;

  return {
    subtotal,
    chasSubsidy,
    insuranceClaim,
    medisaveApplied,
    patientPortion,
    gst,
    total: patientPortion + gst,
    lines,
  };
}
