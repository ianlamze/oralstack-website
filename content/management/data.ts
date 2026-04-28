import type { ManagementSnapshot, Period } from "./types";

// Calibrated to a 3-chair, 4-provider clinic running ~150 visits/week with
// blended SG private-rate billing. All numbers indicative — shape and ratios
// matter more than absolute precision for a marketing demo.

const PROVIDERS = ["Dr Lim", "Dr Pereira", "Dr Tan", "Dr Wong"];
const PROCEDURES = ["Hygiene", "Restorative", "Endo", "Surgical", "Prosthetic"];

// Synthetic but plausible trend generator — gentle variance + slow drift.
function makeTrend(base: number, n: number, seed: number, drift = 0.04): number[] {
  const out: number[] = [];
  let value = base;
  for (let i = 0; i < n; i++) {
    const noise = Math.sin(seed + i * 1.7) * 0.08 + Math.cos(seed * 1.3 + i * 0.9) * 0.05;
    value = base * (1 + drift * (i / n)) * (1 + noise);
    out.push(Math.max(0, Math.round(value)));
  }
  return out;
}

function makeRateTrend(base: number, n: number, seed: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const noise = Math.sin(seed + i * 1.3) * 0.04;
    out.push(Math.max(0, Math.min(1, base + noise)));
  }
  return out;
}

function makeBucketLabels(period: Period): string[] {
  if (period === "7d") return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  if (period === "30d") return Array.from({ length: 4 }, (_, i) => `W${i + 1}`);
  if (period === "90d") return Array.from({ length: 13 }, (_, i) => `W${i + 1}`);
  return Array.from({ length: 17 }, (_, i) => `W${i + 1}`); // YTD ≈ April → 17 weeks
}

function buildSnapshot(period: Period): ManagementSnapshot {
  // Period multipliers vs the base 30-day window. Values are rough.
  const m: Record<Period, number> = { "7d": 0.23, "30d": 1, "90d": 3.0, ytd: 4.0 };
  const mult = m[period];
  const trendN = period === "7d" ? 7 : period === "30d" ? 30 : period === "90d" ? 30 : 30; // sparkline length
  const bucketLabels = makeBucketLabels(period);
  const bucketsN = bucketLabels.length;

  // Stat cards
  const productionBase = 84_000;
  const newPatientsBase = 38;
  const collectionBase = 0.94;
  const hygieneBase = 0.78;

  const production = {
    current: Math.round(productionBase * mult),
    prior: Math.round(productionBase * mult * 0.91),
    trend: makeTrend(productionBase / trendN, trendN, 11 + period.length, 0.06),
  };

  const newPatients = {
    current: Math.round(newPatientsBase * mult),
    prior: Math.round(newPatientsBase * mult * 0.86),
    trend: makeTrend(newPatientsBase / trendN, trendN, 7 + period.length, 0.08),
  };

  const collectionRatio = {
    current: collectionBase + (period === "7d" ? -0.02 : 0.01),
    prior: collectionBase - 0.03,
    trend: makeRateTrend(collectionBase, trendN, 19 + period.length),
  };

  const hygieneRecareRate = {
    current: hygieneBase + (period === "ytd" ? 0.05 : 0.02),
    prior: hygieneBase - 0.04,
    trend: makeRateTrend(hygieneBase, trendN, 23 + period.length),
  };

  // Production by category (sums roughly to production.current)
  const totalProduction = production.current;
  const byCategory = {
    hygiene: Math.round(totalProduction * 0.18),
    restorative: Math.round(totalProduction * 0.34),
    surgical: Math.round(totalProduction * 0.12),
    prosthetic: Math.round(totalProduction * 0.36),
  };

  // AR aging (snapshot, not period-multiplied — debt is what's outstanding now)
  // Modulate slightly by period so the demo "looks alive" when flipping.
  const arBase = 14_500;
  const arAging = {
    current: Math.round(arBase * (period === "7d" ? 0.62 : 0.55)),
    days30: Math.round(arBase * 0.24),
    days60: Math.round(arBase * 0.13),
    days90: Math.round(arBase * (period === "ytd" ? 0.04 : 0.08)),
  };

  // Provider scorecard
  const providerSplits = [0.32, 0.28, 0.22, 0.18];
  const providers = PROVIDERS.map((name, i) => ({
    name,
    production: Math.round(totalProduction * providerSplits[i]),
    chairHours: Math.round((100 + i * 12) * mult * 0.6),
    acceptanceRate: 0.71 + i * 0.04,
  }));

  // Heatmap: provider × procedure production. Each provider has a profile.
  const profiles: number[][] = [
    // Dr Lim: implant/prosthetic specialist
    [0.12, 0.18, 0.05, 0.1, 0.55],
    // Dr Pereira: endo + restorative
    [0.1, 0.4, 0.42, 0.05, 0.03],
    // Dr Tan: GP balanced
    [0.25, 0.32, 0.13, 0.18, 0.12],
    // Dr Wong: hygiene-heavy + surgical
    [0.55, 0.1, 0.04, 0.28, 0.03],
  ];
  const heatmap = {
    providers: PROVIDERS,
    procedures: PROCEDURES,
    matrix: profiles.map((profile, pi) =>
      profile.map((share) => Math.round(providers[pi].production * share)),
    ),
  };

  const trendCurrent: number[] = [];
  const trendPrior: number[] = [];
  const perBucket = totalProduction / bucketsN;
  for (let i = 0; i < bucketsN; i++) {
    const noiseC = Math.sin(13 + i * 1.4) * 0.12;
    const noiseP = Math.sin(17 + i * 1.6) * 0.1;
    trendCurrent.push(Math.round(perBucket * (1 + noiseC + i * 0.005)));
    trendPrior.push(Math.round(perBucket * 0.91 * (1 + noiseP)));
  }

  return {
    production,
    collectionRatio,
    newPatients,
    hygieneRecareRate,
    byCategory,
    arAging,
    providers,
    heatmap,
    trend: {
      buckets: bucketLabels,
      current: trendCurrent,
      prior: trendPrior,
    },
  };
}

export const snapshots: Record<Period, ManagementSnapshot> = {
  "7d": buildSnapshot("7d"),
  "30d": buildSnapshot("30d"),
  "90d": buildSnapshot("90d"),
  ytd: buildSnapshot("ytd"),
};
