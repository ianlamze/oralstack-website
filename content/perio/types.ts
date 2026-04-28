export type SiteCode = "DB" | "B" | "MB"; // distobuccal, midbuccal, mesiobuccal

export type ToothPerio = {
  num: number;
  /** Probing depths (mm) per site. 0 means unrecorded. */
  depths: Record<SiteCode, number>;
  /** Bleeding on probe — single per-tooth flag for the demo (a real perio
   *  chart records BoP per site; we simplify for marketing density). */
  bop: boolean;
};

/**
 * Color thresholds for probing depth display:
 *  - 0..3mm  → healthy (sea green)
 *  - 4..5mm  → caution (sunset amber)
 *  - 6+ mm   → severe (sunset deep)
 */
export function depthSeverity(mm: number): "unrecorded" | "healthy" | "caution" | "severe" {
  if (mm <= 0) return "unrecorded";
  if (mm <= 3) return "healthy";
  if (mm <= 5) return "caution";
  return "severe";
}
