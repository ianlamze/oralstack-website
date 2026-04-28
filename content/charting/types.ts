/** FDI tooth numbering: 11-18, 21-28, 31-38, 41-48 */
export type ToothNumber = number;

/** Five standard dental surfaces */
export type Surface = "M" | "D" | "O" | "B" | "L";

export type ConditionStatus = "active" | "planned" | "completed";
export type ParserConfidence = "low" | "medium" | "high";
export type ChartFilter = "all" | ConditionStatus;
export type ChartTool = ConditionCode | "clear" | null;

export type ConditionCode =
  | "caries"
  | "filling_composite"
  | "filling_amalgam"
  | "crown"
  | "missing"
  | "extracted"
  | "implant"
  | "extraction_planned"
  | "impacted"
  | "partially_erupted"
  | "unerupted"
  | "retained_root"
  | "non_carious_lesion"
  | "inlay"
  | "onlay"
  | "root_canal"
  | "post_core"
  | "bridge_pontic"
  | "bridge_abutment"
  | "denture_tooth"
  | "periodontal_treatment"
  | "splint"
  | "veneer"
  | "sealant"
  | "fracture"
  | "abscess"
  | "mobility"
  | "recession"
  | "furcation"
  | "apicoectomy"
  | "watch";

export interface ToothCondition {
  id: string;
  condition: ConditionCode;
  surfaces?: Surface[];
  date: string;
  doctor?: string;
  notes?: string;
  status: ConditionStatus;
  parser_confidence?: ParserConfidence;
  parser_section?: string;
}

export interface PatientChart {
  patient_id: string;
  updated_at: string;
  teeth: Record<number, ToothCondition[]>;
}

export const WHOLE_TOOTH_CONDITIONS: ConditionCode[] = [
  "missing",
  "extracted",
  "implant",
  "extraction_planned",
  "crown",
  "impacted",
  "partially_erupted",
  "unerupted",
  "retained_root",
  "root_canal",
  "post_core",
  "bridge_pontic",
  "bridge_abutment",
  "denture_tooth",
  "periodontal_treatment",
  "splint",
  "veneer",
  "mobility",
  "abscess",
  "apicoectomy",
];

export const CONDITION_LABELS: Record<ConditionCode, string> = {
  caries: "Caries",
  filling_composite: "Filling (Composite)",
  filling_amalgam: "Filling (Amalgam)",
  crown: "Crown",
  missing: "Missing",
  extracted: "Extracted",
  implant: "Implant",
  extraction_planned: "Extraction Planned",
  impacted: "Impacted",
  partially_erupted: "Partially Erupted",
  unerupted: "Unerupted",
  retained_root: "Retained Root",
  non_carious_lesion: "Non-Carious Lesion",
  inlay: "Inlay",
  onlay: "Onlay",
  root_canal: "Root Canal",
  post_core: "Post & Core",
  bridge_pontic: "Bridge Pontic",
  bridge_abutment: "Bridge Abutment",
  denture_tooth: "Denture Tooth",
  periodontal_treatment: "Periodontal Treatment",
  splint: "Splint",
  veneer: "Veneer",
  sealant: "Sealant",
  fracture: "Fracture",
  abscess: "Abscess",
  mobility: "Mobility",
  recession: "Recession",
  furcation: "Furcation",
  apicoectomy: "Apicoectomy",
  watch: "Watch",
};

/** Resolves to CSS custom properties defined in app/globals.css.
 *  Edit token values there, not here. */
export const CONDITION_COLORS: Record<ConditionCode, string> = {
  caries: "var(--color-chart-caries)",
  filling_composite: "var(--color-chart-filling-composite)",
  filling_amalgam: "var(--color-chart-filling-amalgam)",
  crown: "var(--color-chart-crown)",
  missing: "var(--color-chart-missing)",
  extracted: "var(--color-chart-extracted)",
  implant: "var(--color-chart-implant)",
  extraction_planned: "var(--color-chart-extraction-planned)",
  impacted: "var(--color-chart-impacted)",
  partially_erupted: "var(--color-chart-partially-erupted)",
  unerupted: "var(--color-chart-unerupted)",
  retained_root: "var(--color-chart-retained-root)",
  non_carious_lesion: "var(--color-chart-non-carious-lesion)",
  inlay: "var(--color-chart-inlay)",
  onlay: "var(--color-chart-onlay)",
  root_canal: "var(--color-chart-root-canal)",
  post_core: "var(--color-chart-post-core)",
  bridge_pontic: "var(--color-chart-bridge-pontic)",
  bridge_abutment: "var(--color-chart-bridge-abutment)",
  denture_tooth: "var(--color-chart-denture-tooth)",
  periodontal_treatment: "var(--color-chart-periodontal-treatment)",
  splint: "var(--color-chart-splint)",
  veneer: "var(--color-chart-veneer)",
  sealant: "var(--color-chart-sealant)",
  fracture: "var(--color-chart-fracture)",
  abscess: "var(--color-chart-abscess)",
  mobility: "var(--color-chart-mobility)",
  recession: "var(--color-chart-recession)",
  furcation: "var(--color-chart-furcation)",
  apicoectomy: "var(--color-chart-apicoectomy)",
  watch: "var(--color-chart-watch)",
};

export const CONDITION_GROUPS: { label: string; conditions: ConditionCode[] }[] = [
  {
    label: "Pathology",
    conditions: [
      "caries",
      "non_carious_lesion",
      "fracture",
      "abscess",
      "recession",
      "furcation",
      "retained_root",
      "watch",
    ],
  },
  {
    label: "Restorative",
    conditions: [
      "filling_composite",
      "filling_amalgam",
      "inlay",
      "onlay",
      "crown",
      "veneer",
      "sealant",
      "post_core",
      "splint",
    ],
  },
  {
    label: "Endo / Surgery",
    conditions: [
      "root_canal",
      "apicoectomy",
      "implant",
      "extracted",
      "extraction_planned",
      "periodontal_treatment",
    ],
  },
  {
    label: "Eruption / Status",
    conditions: ["missing", "impacted", "partially_erupted", "unerupted", "mobility"],
  },
  {
    label: "Prosthetic",
    conditions: ["bridge_pontic", "bridge_abutment", "denture_tooth", "implant"],
  },
];

export const CONDITION_SHORT_LABELS: Record<ConditionCode, string> = {
  caries: "C",
  filling_composite: "TCF",
  filling_amalgam: "AM",
  crown: "CR",
  missing: "X",
  extracted: "EXT",
  implant: "IMP",
  extraction_planned: "X-P",
  impacted: "IM",
  partially_erupted: "PE",
  unerupted: "UN",
  retained_root: "RR",
  non_carious_lesion: "NCL",
  inlay: "IN",
  onlay: "ON",
  root_canal: "RCT",
  post_core: "P&C",
  bridge_pontic: "PON",
  bridge_abutment: "ABT",
  denture_tooth: "DEN",
  periodontal_treatment: "PER",
  splint: "SPL",
  veneer: "VEN",
  sealant: "SEAL",
  fracture: "FX",
  abscess: "ABS",
  mobility: "MOB",
  recession: "REC",
  furcation: "FUR",
  apicoectomy: "APX",
  watch: "OBS",
};

export const SURFACE_CAPABLE_CONDITIONS: ConditionCode[] = [
  "caries",
  "filling_composite",
  "filling_amalgam",
  "non_carious_lesion",
  "inlay",
  "onlay",
  "veneer",
  "sealant",
  "fracture",
  "recession",
  "furcation",
  "watch",
];

const LEGACY_SURFACELESS_CONDITIONS = new Set<ConditionCode>(["furcation", "recession"]);

export function conditionDisplaysAsWholeTooth(
  condition: Pick<ToothCondition, "condition" | "surfaces">,
): boolean {
  return (
    WHOLE_TOOTH_CONDITIONS.includes(condition.condition) ||
    (LEGACY_SURFACELESS_CONDITIONS.has(condition.condition) &&
      (!condition.surfaces || condition.surfaces.length === 0))
  );
}

export const TOOTH_NAMES: Record<number, string> = {
  11: "Upper Right Central Incisor",
  12: "Upper Right Lateral Incisor",
  13: "Upper Right Canine",
  14: "Upper Right First Premolar",
  15: "Upper Right Second Premolar",
  16: "Upper Right First Molar",
  17: "Upper Right Second Molar",
  18: "Upper Right Third Molar",
  21: "Upper Left Central Incisor",
  22: "Upper Left Lateral Incisor",
  23: "Upper Left Canine",
  24: "Upper Left First Premolar",
  25: "Upper Left Second Premolar",
  26: "Upper Left First Molar",
  27: "Upper Left Second Molar",
  28: "Upper Left Third Molar",
  31: "Lower Left Central Incisor",
  32: "Lower Left Lateral Incisor",
  33: "Lower Left Canine",
  34: "Lower Left First Premolar",
  35: "Lower Left Second Premolar",
  36: "Lower Left First Molar",
  37: "Lower Left Second Molar",
  38: "Lower Left Third Molar",
  41: "Lower Right Central Incisor",
  42: "Lower Right Lateral Incisor",
  43: "Lower Right Canine",
  44: "Lower Right First Premolar",
  45: "Lower Right Second Premolar",
  46: "Lower Right First Molar",
  47: "Lower Right Second Molar",
  48: "Lower Right Third Molar",
};

export const ALL_TEETH: number[] = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42, 41,
  31, 32, 33, 34, 35, 36, 37, 38,
];

export const UPPER_RIGHT: number[] = [18, 17, 16, 15, 14, 13, 12, 11];
export const UPPER_LEFT: number[] = [21, 22, 23, 24, 25, 26, 27, 28];
export const LOWER_RIGHT: number[] = [48, 47, 46, 45, 44, 43, 42, 41];
export const LOWER_LEFT: number[] = [31, 32, 33, 34, 35, 36, 37, 38];

export function isMaxillary(tooth: number): boolean {
  return tooth >= 11 && tooth <= 28;
}

export function isAnterior(tooth: number): boolean {
  const unit = tooth % 10;
  return unit >= 1 && unit <= 3;
}

export function formatSurfaceCode(surface: Surface | string, tooth: number): string {
  if (surface === "O" && isAnterior(tooth)) return "I";
  if (surface === "L" && isMaxillary(tooth)) return "P";
  return surface;
}

export function formatSurfaceCodes(
  surfaces: Array<Surface | string> | undefined,
  tooth: number,
): string {
  if (!surfaces || surfaces.length === 0) return "";
  return surfaces.map((surface) => formatSurfaceCode(surface, tooth)).join("");
}

export function createEmptyChart(patientId: string): PatientChart {
  return {
    patient_id: patientId,
    updated_at: new Date().toISOString().replace("T", " ").substring(0, 19),
    teeth: {},
  };
}
