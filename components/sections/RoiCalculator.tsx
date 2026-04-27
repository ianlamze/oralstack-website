"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";

type ChairsBucket = "1" | "2-3" | "4-6" | "7+";

const chairsBuckets: ChairsBucket[] = ["1", "2-3", "4-6", "7+"];
const chairCount: Record<ChairsBucket, number> = { "1": 1, "2-3": 2.5, "4-6": 5, "7+": 8 };

// Singapore clinic averages — conservative defaults.
const APPTS_PER_CHAIR_PER_DAY = 10;
const WORKING_DAYS_PER_WEEK = 5;
const WORKING_WEEKS_PER_YEAR = 50;
const AVG_APPT_VALUE_SGD = 300;
const MIN_PER_FOLLOWUP_RECONCILIATION = 10;
const BAD_DEBT_RATE_LOW = 0.05;
const BAD_DEBT_RATE_HIGH = 0.08;

function format(n: number) {
  return n.toLocaleString("en-SG", { maximumFractionDigits: 0 });
}

type Result = {
  currentRate: number;
  targetRateLow: number;
  targetRateHigh: number;
  weeklyApptCount: number;
  hoursReclaimedLow: number;
  hoursReclaimedHigh: number;
  revenueRecoveredLow: number;
  revenueRecoveredHigh: number;
};

function compute(chairs: ChairsBucket, currentRatePct: number): Result {
  const chairs_n = chairCount[chairs];
  const weeklyAppts = chairs_n * APPTS_PER_CHAIR_PER_DAY * WORKING_DAYS_PER_WEEK;
  const yearlyAppts = weeklyAppts * WORKING_WEEKS_PER_YEAR;

  // DFI lift was 60 → 85 (+25pp). Range scaled toward 90% ceiling.
  const headroom = Math.max(0, 90 - currentRatePct);
  const improvementMid = headroom * 0.7;
  const improvementLow = improvementMid * 0.75;
  const improvementHigh = Math.min(improvementMid * 1.0, headroom);

  const targetLow = currentRatePct + improvementLow;
  const targetHigh = currentRatePct + improvementHigh;

  // Follow-up reduction = appts that move from follow-up to same-day
  const reductionLow = (weeklyAppts * improvementLow) / 100;
  const reductionHigh = (weeklyAppts * improvementHigh) / 100;

  const hoursLow = (reductionLow * MIN_PER_FOLLOWUP_RECONCILIATION) / 60;
  const hoursHigh = (reductionHigh * MIN_PER_FOLLOWUP_RECONCILIATION) / 60;

  const yearlyReductionLow = (yearlyAppts * improvementLow) / 100;
  const yearlyReductionHigh = (yearlyAppts * improvementHigh) / 100;

  const revenueLow = yearlyReductionLow * AVG_APPT_VALUE_SGD * BAD_DEBT_RATE_LOW;
  const revenueHigh = yearlyReductionHigh * AVG_APPT_VALUE_SGD * BAD_DEBT_RATE_HIGH;

  return {
    currentRate: currentRatePct,
    targetRateLow: Math.round(targetLow),
    targetRateHigh: Math.round(targetHigh),
    weeklyApptCount: Math.round(weeklyAppts),
    hoursReclaimedLow: Math.round(hoursLow),
    hoursReclaimedHigh: Math.round(hoursHigh),
    revenueRecoveredLow: Math.round(revenueLow / 1000) * 1000,
    revenueRecoveredHigh: Math.round(revenueHigh / 1000) * 1000,
  };
}

export default function RoiCalculator() {
  const [chairs, setChairs] = useState<ChairsBucket>("2-3");
  const [rate, setRate] = useState(60);
  const reduceMotion = useReducedMotion();

  const chairsId = useId();
  const rateId = useId();

  const result = useMemo(() => compute(chairs, rate), [chairs, rate]);

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 md:p-8 max-w-[820px]">
      <div className="grid gap-1 mb-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          ROI snapshot
        </p>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-text)]">
          What does $200/clinic/month earn back?
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-1 max-w-[60ch]">
          Calibrated to{" "}
          <a
            href="/customers/dfi-synergy"
            className="text-[var(--color-tide-deep)] underline underline-offset-4"
          >
            DFI Synergy&apos;s pilot
          </a>{" "}
          (60% → 85% same-day-billing rate) and Singapore clinic averages ({APPTS_PER_CHAIR_PER_DAY}{" "}
          appts/chair/day, S${AVG_APPT_VALUE_SGD} avg visit). Conservative ranges — assumptions are
          visible below.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-8 items-start">
        <div className="grid gap-5">
          <fieldset className="grid gap-2 border-0 p-0 m-0">
            <legend
              id={chairsId}
              className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium"
            >
              Chairs
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {chairsBuckets.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    setChairs(b);
                    track("roi_input_changed", { field: "chairs", value: b });
                  }}
                  aria-pressed={chairs === b}
                  className={`min-h-[36px] px-3 py-1.5 rounded-md border text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                    chairs === b
                      ? "bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)]"
                      : "bg-white text-[var(--color-text-muted)] border-[var(--color-border-strong)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-2">
            <label
              htmlFor={rateId}
              className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium flex items-baseline justify-between"
            >
              <span>Current same-day-billing rate</span>
              <span className="tabular-nums text-[var(--color-text)] text-sm font-semibold">
                {rate}%
              </span>
            </label>
            <input
              id={rateId}
              type="range"
              min={30}
              max={85}
              step={5}
              value={rate}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                setRate(v);
                track("roi_input_changed", { field: "rate", value: v });
              }}
              className="w-full accent-[var(--color-ink)]"
            />
            <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] flex justify-between">
              <span>30%</span>
              <span>most clinics on legacy PMS sit at 50–65%</span>
              <span>85%</span>
            </p>
          </div>
        </div>

        <motion.div
          layout={!reduceMotion}
          transition={{ layout: { duration: 0.18 } }}
          className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 md:p-6"
        >
          <div className="grid gap-1">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
              Same-day-billing target
            </p>
            <motion.p
              key={`${result.targetRateLow}-${result.targetRateHigh}`}
              initial={reduceMotion ? false : { opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16 }}
              className="text-2xl md:text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]"
            >
              {result.targetRateLow}–{result.targetRateHigh}
              <span className="text-[var(--color-text-muted)] text-base font-normal">
                {" "}
                % at week 4
              </span>
            </motion.p>
            <p className="text-[11px] text-[var(--color-text-soft)] leading-snug">
              Up from your {result.currentRate}% — the lift compounds with discharge-flow billing.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-3">
            <div className="grid gap-0.5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                Front-desk hours saved
              </p>
              <motion.p
                key={`${result.hoursReclaimedLow}-${result.hoursReclaimedHigh}h`}
                initial={reduceMotion ? false : { opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16 }}
                className="text-xl md:text-2xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]"
              >
                {result.hoursReclaimedLow}–{result.hoursReclaimedHigh}
                <span className="text-[var(--color-text-muted)] text-sm font-normal"> hr/wk</span>
              </motion.p>
              <p className="text-[10px] text-[var(--color-text-soft)] leading-snug">
                Fewer follow-up reconciliations · ~{MIN_PER_FOLLOWUP_RECONCILIATION} min each.
              </p>
            </div>

            <div className="grid gap-0.5">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                Revenue recovered
              </p>
              <motion.p
                key={`${result.revenueRecoveredLow}-${result.revenueRecoveredHigh}r`}
                initial={reduceMotion ? false : { opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16 }}
                className="text-xl md:text-2xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]"
              >
                S${format(result.revenueRecoveredLow)}–{format(result.revenueRecoveredHigh)}
                <span className="text-[var(--color-text-muted)] text-sm font-normal"> /yr</span>
              </motion.p>
              <p className="text-[10px] text-[var(--color-text-soft)] leading-snug">
                {(BAD_DEBT_RATE_LOW * 100).toFixed(0)}–{(BAD_DEBT_RATE_HIGH * 100).toFixed(0)}% of
                old follow-ups never get paid. That stops.
              </p>
            </div>
          </div>

          <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] mt-1 leading-relaxed">
            Estimate based on {result.weeklyApptCount} appts/wk at S${AVG_APPT_VALUE_SGD} average,
            scaled from DFI&apos;s 60→85% lift. Not a guarantee — your numbers will land somewhere
            in the band.
          </p>
        </motion.div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          Walk through the numbers on your data →
        </a>
        <a
          href="/articles/same-day-billing-dental"
          className="text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
        >
          How DFI moved 60% → 85%
        </a>
      </div>
    </div>
  );
}
