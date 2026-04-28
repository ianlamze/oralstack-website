export type Period = "7d" | "30d" | "90d" | "ytd";

export const periodLabel: Record<Period, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  ytd: "Year to date",
};

export const periodShort: Record<Period, string> = {
  "7d": "7d",
  "30d": "30d",
  "90d": "90d",
  ytd: "YTD",
};

export type StatTrend = {
  /** Current period value. */
  current: number;
  /** Same metric over the prior comparable period (for delta). */
  prior: number;
  /** Trend points across the current period (length 12–30 — drives sparklines). */
  trend: number[];
};

export type CategoryProduction = {
  hygiene: number;
  restorative: number;
  surgical: number;
  prosthetic: number;
};

export type ARAging = {
  current: number;
  days30: number;
  days60: number;
  days90: number;
};

export type ProviderRow = {
  name: string;
  production: number;
  chairHours: number;
  /** Treatment plans presented vs accepted, optional context. */
  acceptanceRate?: number;
};

export type HeatmapData = {
  providers: string[];
  procedures: string[];
  /** matrix[providerIdx][procedureIdx] = production in SGD for that combo. */
  matrix: number[][];
};

export type ProductionTrend = {
  /** Bucket labels (weeks for 30d/90d/ytd, days for 7d). */
  buckets: string[];
  /** Current-period production per bucket. */
  current: number[];
  /** Prior-period production per bucket (same number of buckets, shifted back). */
  prior: number[];
};

export type ManagementSnapshot = {
  production: StatTrend;
  collectionRatio: StatTrend; // values are 0..1
  newPatients: StatTrend;
  hygieneRecareRate: StatTrend; // 0..1
  byCategory: CategoryProduction;
  arAging: ARAging;
  providers: ProviderRow[];
  heatmap: HeatmapData;
  trend: ProductionTrend;
};
