"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";

type SourceSystem = "plato" | "dentrix" | "open-dental" | "carestream" | "eaglesoft" | "paper";
type ChairsBucket = "1" | "2-3" | "4-6" | "7+";
type YearsBucket = "<2" | "3-5" | "6-10" | "10+";

const sourceLabel: Record<SourceSystem, string> = {
  plato: "Plato",
  dentrix: "Dentrix",
  "open-dental": "Open Dental",
  carestream: "Carestream",
  eaglesoft: "Eaglesoft",
  paper: "Paper / WhatsApp",
};

const chairsBuckets: ChairsBucket[] = ["1", "2-3", "4-6", "7+"];
const yearsBuckets: YearsBucket[] = ["<2", "3-5", "6-10", "10+"];

type EstimateProps = {
  source: SourceSystem;
  chairs: ChairsBucket;
  years: YearsBucket;
};

type Estimate = {
  days: number;
  weeks: number;
  rationale: string;
};

function estimate({ source, chairs, years }: EstimateProps): Estimate {
  let days = 3;
  let weeks = 3;
  const notes: string[] = [];

  if (chairs === "7+") {
    days += 2;
    weeks += 1;
    notes.push(`${chairs} chairs needs an extra day of prep and a longer audit window`);
  } else if (chairs === "4-6") {
    days += 1;
    notes.push(`${chairs} chairs adds a day of front-desk training`);
  }

  if (years === "10+") {
    weeks += 2;
    notes.push(`${years} years of records lengthens the background data reconciliation`);
  } else if (years === "6-10") {
    weeks += 1;
    notes.push(`${years} years of records adds a week of background reconciliation`);
  }

  if (source !== "paper") {
    days += 1;
    notes.push(`${sourceLabel[source]} → Oralstack data import adds a day of validation`);
  } else {
    notes.push("paper-and-WhatsApp source skips the structured-data import step");
  }

  days = Math.min(days, 7);
  weeks = Math.min(weeks, 6);

  return {
    days,
    weeks,
    rationale: `${notes.join("; ")}.`,
  };
}

function Pill<T extends string>({
  value,
  active,
  onSelect,
  children,
}: {
  value: T;
  active: boolean;
  onSelect: (v: T) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={active}
      className={`min-h-[36px] px-3 py-1.5 rounded-md border text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
        active
          ? "bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)]"
          : "bg-white text-[var(--color-text-muted)] border-[var(--color-border-strong)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
      }`}
    >
      {children}
    </button>
  );
}

export default function MigrationEstimator({
  defaultSource = "plato",
}: {
  defaultSource?: SourceSystem;
}) {
  const [source, setSource] = useState<SourceSystem>(defaultSource);
  const [chairs, setChairs] = useState<ChairsBucket>("2-3");
  const [years, setYears] = useState<YearsBucket>("3-5");
  const reduceMotion = useReducedMotion();

  const sourceId = useId();

  const result = useMemo(() => estimate({ source, chairs, years }), [source, chairs, years]);

  const { days, weeks } = result;
  const dataImportEnd = Math.max(1, days - 1);

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 md:p-8 max-w-[820px]">
      <div className="grid gap-1 mb-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          Migration estimator
        </p>
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-text)]">
          What does a move to Oralstack look like for your clinic?
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mt-1 max-w-[60ch]">
          Pick your current setup. We&apos;ll size the front-desk cutover and full migration window
          using the same calibration we&apos;ve published for the{" "}
          <a
            href="/articles/plato-to-cloud-migration"
            className="text-[var(--color-tide-deep)] underline underline-offset-4"
          >
            three-week playbook
          </a>
          .
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8 items-start">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label
              htmlFor={sourceId}
              className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium"
            >
              Current system
            </label>
            <select
              id={sourceId}
              value={source}
              onChange={(e) => {
                const v = e.target.value as SourceSystem;
                setSource(v);
                track("estimator_input_changed", { field: "source", value: v });
              }}
              className="rounded-md border border-[var(--color-border-strong)] bg-white px-3 py-2 text-sm text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
            >
              {(Object.entries(sourceLabel) as [SourceSystem, string][]).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="grid gap-2 border-0 p-0 m-0">
            <legend className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
              Chairs
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {chairsBuckets.map((b) => (
                <Pill
                  key={b}
                  value={b}
                  active={chairs === b}
                  onSelect={(v) => {
                    setChairs(v);
                    track("estimator_input_changed", { field: "chairs", value: v });
                  }}
                >
                  {b}
                </Pill>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-2 border-0 p-0 m-0">
            <legend className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
              Years of data
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {yearsBuckets.map((b) => (
                <Pill
                  key={b}
                  value={b}
                  active={years === b}
                  onSelect={(v) => {
                    setYears(v);
                    track("estimator_input_changed", { field: "years", value: v });
                  }}
                >
                  {b}
                </Pill>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 md:p-6">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <motion.div
              key={`${days}d`}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="grid gap-0.5"
            >
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                Front desk live
              </p>
              <p className="text-2xl md:text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
                {days} day{days === 1 ? "" : "s"}
              </p>
            </motion.div>
            <motion.div
              key={`${weeks}w`}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: 0.04 }}
              className="grid gap-0.5"
            >
              <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                Full migration
              </p>
              <p className="text-2xl md:text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text-muted)]">
                {weeks} week{weeks === 1 ? "" : "s"}
              </p>
            </motion.div>
          </div>

          <ol
            aria-live="polite"
            className="grid gap-1.5 mt-1 text-[12px] text-[var(--color-text-muted)] leading-snug"
          >
            <li className="grid grid-cols-[60px_1fr] gap-2">
              <span className="text-[var(--color-text-soft)] tabular-nums">
                Day 1–{dataImportEnd}
              </span>
              <span>Data import &amp; validation, staff training on the schedule.</span>
            </li>
            <li className="grid grid-cols-[60px_1fr] gap-2">
              <span className="text-[var(--color-text-soft)] tabular-nums">Day {days}</span>
              <span>
                Front desk cuts over to Oralstack — schedule and discharge billing, no fallback
                diary.
              </span>
            </li>
            <li className="grid grid-cols-[60px_1fr] gap-2">
              <span className="text-[var(--color-text-soft)] tabular-nums">Week 1–2</span>
              <span>Charting online; billing reconciliation cleared; recall list imported.</span>
            </li>
            <li className="grid grid-cols-[60px_1fr] gap-2">
              <span className="text-[var(--color-text-soft)] tabular-nums">Week {weeks}</span>
              <span>Recall outreach live, post-cutover audit, legacy export archived.</span>
            </li>
          </ol>

          <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] mt-1 leading-relaxed">
            Estimate, not a quote — based on{" "}
            <a
              href="/customers/dfi-synergy"
              className="text-[var(--color-tide-deep)] underline underline-offset-4"
            >
              DFI Synergy&apos;s pilot
            </a>{" "}
            and the published playbook. Pilot proposal sized in a 30-minute call.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          Talk to us about your migration →
        </a>
        <a
          href="/articles/plato-to-cloud-migration"
          className="text-sm font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
        >
          See the full playbook
        </a>
      </div>
    </div>
  );
}
