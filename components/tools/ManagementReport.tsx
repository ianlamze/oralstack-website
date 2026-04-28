"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { snapshots } from "@/content/management/data";
import {
  type CategoryProduction,
  type Period,
  periodLabel,
  periodShort,
} from "@/content/management/types";
import { track } from "@/lib/analytics";

const PERIODS: Period[] = ["7d", "30d", "90d", "ytd"];
const DEMO_SEQUENCE: Period[] = ["30d", "90d", "ytd"];

type CategoryKey = keyof CategoryProduction;

const CATEGORY_ORDER: CategoryKey[] = ["hygiene", "restorative", "surgical", "prosthetic"];
const CATEGORY_LABEL: Record<CategoryKey, string> = {
  hygiene: "Hygiene",
  restorative: "Restorative",
  surgical: "Surgical",
  prosthetic: "Prosthetic",
};
const CATEGORY_COLOR: Record<CategoryKey, string> = {
  hygiene: "color-mix(in oklch, var(--color-sea), var(--color-ink) 25%)",
  restorative: "color-mix(in oklch, var(--color-sunset), var(--color-ink) 25%)",
  surgical: "color-mix(in oklch, var(--color-tide), var(--color-ink) 30%)",
  prosthetic: "color-mix(in oklch, var(--color-violet), var(--color-ink) 30%)",
};

const AR_BUCKETS: { key: keyof typeof AR_BUCKET_LABELS; color: string }[] = [
  {
    key: "current",
    color: "color-mix(in oklch, var(--color-sea), var(--color-ink) 25%)",
  },
  {
    key: "days30",
    color: "color-mix(in oklch, var(--color-sunset), var(--color-ink) 25%)",
  },
  {
    key: "days60",
    color: "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 30%)",
  },
  {
    key: "days90",
    color: "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 50%)",
  },
];

const AR_BUCKET_LABELS = {
  current: "Current",
  days30: "30 d",
  days60: "60 d",
  days90: "90 d+",
} as const;

function formatSGD(n: number) {
  return `S$${n.toLocaleString("en-SG", { maximumFractionDigits: 0 })}`;
}

function formatPct(n: number, digits = 0) {
  return `${(n * 100).toFixed(digits)}%`;
}

function delta(current: number, prior: number) {
  if (prior === 0) return 0;
  return (current - prior) / prior;
}

export default function ManagementReport() {
  const [period, setPeriod] = useState<Period>("30d");
  const [focusedStat, setFocusedStat] = useState<string | null>(null);
  const [focusedCategory, setFocusedCategory] = useState<CategoryKey | null>(null);
  const [focusedCell, setFocusedCell] = useState<{
    provider: string;
    procedure: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useReducedMotion();

  const data = snapshots[period];

  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
  }

  function pickPeriod(p: Period) {
    markInteracted();
    setPeriod(p);
    track("mgmt_period_changed", { period: p });
  }

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;
    DEMO_SEQUENCE.forEach((p, i) => {
      const t = setTimeout(
        () => {
          if (hasInteractedRef.current) return;
          setPeriod(p);
        },
        700 + i * 1100,
      );
      demoTimersRef.current.push(t);
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting) return;
        if (hasDemoedRef.current || hasInteractedRef.current) return;
        hasDemoedRef.current = true;
        obs.disconnect();
        runDemo();
      },
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reduceMotion, runDemo]);

  useEffect(() => {
    return () => {
      for (const t of demoTimersRef.current) clearTimeout(t);
      demoTimersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Management report</span>
          <span aria-hidden className="text-[var(--color-text-soft)]">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-[var(--color-tide-deep)] font-semibold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-tide-deep)]"
            />
            Live demo
          </span>
        </span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          DFI Synergy · {periodLabel[period]}
        </span>
      </div>

      <fieldset className="grid gap-2 border-0 p-0 m-0 mb-5">
        <legend className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
          Period
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => pickPeriod(p)}
              aria-pressed={period === p}
              className={`min-h-[36px] px-3 py-1.5 rounded-md border text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                period === p
                  ? "bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)]"
                  : "bg-white text-[var(--color-text-muted)] border-[var(--color-border-strong)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
              }`}
            >
              {periodLabel[p]} <span className="opacity-60 text-[10px] ml-1">{periodShort[p]}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Hero stat cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          id="production"
          label="Production"
          value={formatSGD(data.production.current)}
          delta={delta(data.production.current, data.production.prior)}
          sparkline={data.production.trend}
          focused={focusedStat === "production"}
          onFocus={(id) => {
            markInteracted();
            setFocusedStat((cur) => (cur === id ? null : id));
            track("mgmt_stat_focused", { stat: id });
          }}
          reduceMotion={!!reduceMotion}
        />
        <StatCard
          id="collectionRatio"
          label="Collection ratio"
          value={formatPct(data.collectionRatio.current, 1)}
          delta={delta(data.collectionRatio.current, data.collectionRatio.prior)}
          sparkline={data.collectionRatio.trend.map((v) => v * 1000)}
          focused={focusedStat === "collectionRatio"}
          onFocus={(id) => {
            markInteracted();
            setFocusedStat((cur) => (cur === id ? null : id));
            track("mgmt_stat_focused", { stat: id });
          }}
          reduceMotion={!!reduceMotion}
        />
        <StatCard
          id="newPatients"
          label="New patients"
          value={`${data.newPatients.current}`}
          delta={delta(data.newPatients.current, data.newPatients.prior)}
          sparkline={data.newPatients.trend}
          focused={focusedStat === "newPatients"}
          onFocus={(id) => {
            markInteracted();
            setFocusedStat((cur) => (cur === id ? null : id));
            track("mgmt_stat_focused", { stat: id });
          }}
          reduceMotion={!!reduceMotion}
        />
        <StatCard
          id="hygieneRecareRate"
          label="Hygiene re-care"
          value={formatPct(data.hygieneRecareRate.current, 0)}
          delta={delta(data.hygieneRecareRate.current, data.hygieneRecareRate.prior)}
          sparkline={data.hygieneRecareRate.trend.map((v) => v * 1000)}
          focused={focusedStat === "hygieneRecareRate"}
          onFocus={(id) => {
            markInteracted();
            setFocusedStat((cur) => (cur === id ? null : id));
            track("mgmt_stat_focused", { stat: id });
          }}
          reduceMotion={!!reduceMotion}
        />
      </div>

      {/* Production trend chart */}
      <Section title="Production trend" subtitle="Current period vs prior comparable period">
        <ProductionTrendChart
          buckets={data.trend.buckets}
          current={data.trend.current}
          prior={data.trend.prior}
          reduceMotion={!!reduceMotion}
        />
      </Section>

      {/* Production by category */}
      <Section title="Production by category" subtitle="Click a segment to drill into a category">
        <CategoryBar
          data={data.byCategory}
          focused={focusedCategory}
          onFocus={(c) => {
            markInteracted();
            setFocusedCategory((cur) => (cur === c ? null : c));
            track("mgmt_category_focused", { category: c });
          }}
        />
      </Section>

      {/* AR aging */}
      <Section
        title="AR aging"
        subtitle={`Total outstanding · ${formatSGD(data.arAging.current + data.arAging.days30 + data.arAging.days60 + data.arAging.days90)}`}
      >
        <ARAgingBar data={data.arAging} />
      </Section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] mt-6">
        {/* Provider scorecard */}
        <Section title="Provider scorecard" subtitle="Production · chair hours · per hour">
          <ProviderScorecard providers={data.providers} reduceMotion={!!reduceMotion} />
        </Section>

        {/* Provider × procedure heatmap */}
        <Section
          title="Provider × procedure heatmap"
          subtitle="Where each provider's revenue concentrates — surfaces specialisation gaps"
        >
          <Heatmap
            data={data.heatmap}
            focused={focusedCell}
            onFocus={(cell) => {
              markInteracted();
              setFocusedCell((cur) =>
                cur && cur.provider === cell.provider && cur.procedure === cell.procedure
                  ? null
                  : cell,
              );
              track("mgmt_heatmap_cell_focused", cell);
            }}
            reduceMotion={!!reduceMotion}
          />
        </Section>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          onClick={() => track("mgmt_cta_click", { period })}
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          Wire this up for your clinic → book a demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          The data flows from the same workflows the front desk and clinical team use — no parallel
          reporting tool to maintain.
        </p>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 mb-5">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <p className="text-[11px] font-semibold tracking-tight text-[var(--color-text)]">{title}</p>
        {subtitle ? (
          <p className="text-[10px] text-[var(--color-text-soft)] leading-snug">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function StatCard({
  id,
  label,
  value,
  delta: deltaVal,
  sparkline,
  focused,
  onFocus,
  reduceMotion,
}: {
  id: string;
  label: string;
  value: string;
  delta: number;
  sparkline: number[];
  focused: boolean;
  onFocus: (id: string) => void;
  reduceMotion: boolean;
}) {
  const positive = deltaVal >= 0;
  const deltaText = `${positive ? "▲" : "▼"} ${Math.abs(deltaVal * 100).toFixed(1)}%`;
  return (
    <motion.button
      type="button"
      onClick={() => onFocus(id)}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: focused ? 1.015 : 1,
              boxShadow: focused
                ? "0 18px 40px -16px rgba(20,30,60,0.22)"
                : "0 0 0 0 rgba(0,0,0,0)",
            }
      }
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className={`text-left rounded-md border p-3 grid gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] transition-colors ${
        focused
          ? "border-[var(--color-ink)] bg-white"
          : "border-[var(--color-border)] bg-[var(--color-canvas-tinted)] hover:border-[var(--color-border-strong)]"
      }`}
    >
      <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-soft)] font-medium">
        {label}
      </p>
      <motion.p
        key={value}
        initial={reduceMotion ? false : { opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="text-xl md:text-2xl font-semibold tabular-nums tracking-tight text-[var(--color-text)] leading-none"
      >
        {value}
      </motion.p>
      <p
        className={`text-[10px] tabular-nums font-medium ${
          positive
            ? "text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]"
            : "text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]"
        }`}
      >
        {deltaText} <span className="opacity-60 font-normal">vs prior</span>
      </p>
      <Sparkline values={sparkline} positive={positive} />
    </motion.button>
  );
}

function Sparkline({ values, positive }: { values: number[]; positive: boolean }) {
  const W = 120;
  const H = 24;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = W / Math.max(1, values.length - 1);
  const points = values
    .map((v, i) => {
      const x = i * stepX;
      const y = H - ((v - min) / span) * H;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const stroke = positive
    ? "color-mix(in oklch, var(--color-sea), var(--color-ink) 35%)"
    : "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 30%)";
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      width="100%"
      height="24"
      role="img"
      aria-label="Trend sparkline"
    >
      <title>Trend sparkline</title>
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProductionTrendChart({
  buckets,
  current,
  prior,
  reduceMotion,
}: {
  buckets: string[];
  current: number[];
  prior: number[];
  reduceMotion: boolean;
}) {
  const W = 700;
  const H = 180;
  const padX = 28;
  const padY = 18;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  const allValues = [...current, ...prior];
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const span = max - min || 1;
  const stepX = buckets.length > 1 ? innerW / (buckets.length - 1) : 0;

  const toPoints = (vals: number[]) =>
    vals
      .map((v, i) => {
        const x = padX + i * stepX;
        const y = padY + innerH - ((v - min) / span) * innerH;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  const gridLines = 4;

  return (
    <div className="rounded-md border border-[var(--color-border)] bg-white p-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        width="100%"
        height="180"
        role="img"
        aria-label="Production trend over the selected period vs prior comparable period"
      >
        <title>Production trend</title>
        {/* horizontal grid */}
        {Array.from({ length: gridLines + 1 }, (_, i) => {
          const y = padY + (i * innerH) / gridLines;
          return (
            <line
              key={`grid-${y}`}
              x1={padX}
              x2={W - padX}
              y1={y}
              y2={y}
              stroke="color-mix(in oklch, var(--color-line), white 30%)"
              strokeWidth={1}
            />
          );
        })}
        {/* prior period (lighter) */}
        <motion.polyline
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          points={toPoints(prior)}
          fill="none"
          stroke="color-mix(in oklch, var(--color-text-soft), white 30%)"
          strokeWidth={2}
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        {/* current period (bold) */}
        <motion.polyline
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          points={toPoints(current)}
          fill="none"
          stroke="color-mix(in oklch, var(--color-tide-deep), var(--color-ink) 10%)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        {/* x-axis labels — only label every Nth bucket to avoid overlap */}
        {buckets.map((b, i) => {
          const stride = Math.max(1, Math.ceil(buckets.length / 8));
          if (i % stride !== 0 && i !== buckets.length - 1) return null;
          return (
            <text
              key={b}
              x={padX + i * stepX}
              y={H - 4}
              textAnchor="middle"
              fontSize="9"
              fill="var(--color-text-soft)"
            >
              {b}
            </text>
          );
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-[var(--color-text-soft)]">
        <Legend
          color="color-mix(in oklch, var(--color-tide-deep), var(--color-ink) 10%)"
          label="Current"
        />
        <Legend
          color="color-mix(in oklch, var(--color-text-soft), white 30%)"
          dashed
          label="Prior comparable period"
        />
      </div>
    </div>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className={`inline-block h-0 w-4 ${dashed ? "border-t-2 border-dashed" : "border-t-2"}`}
        style={{ borderColor: color }}
      />
      {label}
    </span>
  );
}

function CategoryBar({
  data,
  focused,
  onFocus,
}: {
  data: CategoryProduction;
  focused: CategoryKey | null;
  onFocus: (k: CategoryKey) => void;
}) {
  const total = CATEGORY_ORDER.reduce((s, k) => s + data[k], 0);
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-white p-4">
      <div className="grid gap-1">
        <div className="flex h-8 w-full overflow-hidden rounded-sm border border-[var(--color-border)]">
          {CATEGORY_ORDER.map((k) => {
            const pct = (data[k] / total) * 100;
            const isFocused = focused === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => onFocus(k)}
                aria-pressed={isFocused}
                aria-label={`${CATEGORY_LABEL[k]} · ${formatSGD(data[k])} · ${pct.toFixed(0)}% of production`}
                className="grid place-items-center text-[10px] font-medium tracking-tight transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-tide-deep)]"
                style={{
                  width: `${pct}%`,
                  backgroundColor: CATEGORY_COLOR[k],
                  color: "white",
                  opacity: focused === null || isFocused ? 1 : 0.45,
                }}
              >
                {pct >= 8 ? `${pct.toFixed(0)}%` : ""}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-[10px]">
          {CATEGORY_ORDER.map((k) => {
            const pct = (data[k] / total) * 100;
            const isFocused = focused === k;
            return (
              <div
                key={k}
                className={`grid gap-0.5 rounded-md border px-2 py-1.5 transition-colors ${
                  isFocused
                    ? "border-[var(--color-ink)] bg-[var(--color-canvas-tinted)]"
                    : "border-[var(--color-border)] bg-white"
                }`}
              >
                <span className="flex items-center gap-1.5 font-medium text-[var(--color-text)]">
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLOR[k] }}
                  />
                  {CATEGORY_LABEL[k]}
                </span>
                <span className="tabular-nums text-[var(--color-text-muted)]">
                  {formatSGD(data[k])} <span className="opacity-60">· {pct.toFixed(0)}%</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ARAgingBar({
  data,
}: {
  data: { current: number; days30: number; days60: number; days90: number };
}) {
  const total = data.current + data.days30 + data.days60 + data.days90;
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-white p-4">
      <div className="flex h-7 w-full overflow-hidden rounded-sm border border-[var(--color-border)]">
        {AR_BUCKETS.map(({ key, color }) => {
          const value = data[key as keyof typeof data];
          const pct = (value / total) * 100;
          return (
            <div
              key={key}
              className="grid place-items-center text-[10px] font-medium tracking-tight"
              style={{
                width: `${pct}%`,
                backgroundColor: color,
                color: "white",
              }}
              title={`${AR_BUCKET_LABELS[key]} · ${formatSGD(value)} (${pct.toFixed(0)}%)`}
            >
              {pct >= 8 ? `${pct.toFixed(0)}%` : ""}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-[10px]">
        {AR_BUCKETS.map(({ key, color }) => {
          const value = data[key as keyof typeof data];
          return (
            <div
              key={key}
              className="grid gap-0.5 rounded-md border border-[var(--color-border)] bg-white px-2 py-1.5"
            >
              <span className="flex items-center gap-1.5 font-medium text-[var(--color-text)]">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {AR_BUCKET_LABELS[key]}
              </span>
              <span className="tabular-nums text-[var(--color-text-muted)]">
                {formatSGD(value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProviderScorecard({
  providers,
  reduceMotion,
}: {
  providers: { name: string; production: number; chairHours: number; acceptanceRate?: number }[];
  reduceMotion: boolean;
}) {
  const max = Math.max(...providers.map((p) => p.production));
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-white p-4 grid gap-2">
      {providers.map((p) => {
        const pct = (p.production / max) * 100;
        const perHour = p.chairHours === 0 ? 0 : p.production / p.chairHours;
        return (
          <div key={p.name} className="grid gap-1">
            <div className="flex items-baseline justify-between gap-3 text-[11px]">
              <span className="font-semibold text-[var(--color-text)]">{p.name}</span>
              <span className="text-[var(--color-text-soft)] tabular-nums">
                {formatSGD(p.production)} · {p.chairHours}h ·{" "}
                <span className="text-[var(--color-text-muted)]">
                  {formatSGD(Math.round(perHour))}/h
                </span>
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--color-canvas-tinted)] overflow-hidden">
              <motion.div
                initial={reduceMotion ? false : { width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.45 }}
                className="h-full"
                style={{
                  backgroundColor:
                    "color-mix(in oklch, var(--color-tide-deep), var(--color-ink) 15%)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Heatmap({
  data,
  focused,
  onFocus,
  reduceMotion,
}: {
  data: { providers: string[]; procedures: string[]; matrix: number[][] };
  focused: { provider: string; procedure: string } | null;
  onFocus: (cell: { provider: string; procedure: string }) => void;
  reduceMotion: boolean;
}) {
  const flat = data.matrix.flat();
  const max = Math.max(...flat, 1);

  return (
    <div className="rounded-md border border-[var(--color-border)] bg-white p-4 overflow-x-auto">
      <table className="w-full text-[10px] border-collapse">
        <thead>
          <tr>
            <th className="text-left font-medium text-[var(--color-text-soft)] uppercase tracking-[0.12em] py-1.5 pr-2">
              Provider
            </th>
            {data.procedures.map((proc) => (
              <th
                key={proc}
                className="font-medium text-[var(--color-text-soft)] uppercase tracking-[0.12em] py-1.5 px-2"
              >
                {proc}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.providers.map((prov, i) => (
            <tr key={prov}>
              <td className="font-semibold text-[var(--color-text)] py-1 pr-2 whitespace-nowrap text-[11px]">
                {prov}
              </td>
              {data.procedures.map((proc, j) => {
                const value = data.matrix[i][j];
                const intensity = value / max;
                const isFocused =
                  focused !== null && focused.provider === prov && focused.procedure === proc;
                return (
                  <td key={`${prov}-${proc}`} className="p-0.5">
                    <motion.button
                      type="button"
                      onClick={() => onFocus({ provider: prov, procedure: proc })}
                      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                      animate={reduceMotion ? undefined : { scale: isFocused ? 1.05 : 1 }}
                      aria-label={`${prov} · ${proc} · ${formatSGD(value)}`}
                      className={`w-full grid place-items-center min-h-[36px] rounded-sm border-2 tabular-nums font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-tide-deep)] transition-colors ${
                        isFocused ? "border-[var(--color-ink)]" : "border-transparent"
                      }`}
                      style={{
                        backgroundColor: `color-mix(in oklch, var(--color-tide-deep) ${Math.round(
                          intensity * 100,
                        )}%, white)`,
                        color: intensity > 0.55 ? "white" : "var(--color-text)",
                      }}
                    >
                      {formatSGD(value)}
                    </motion.button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {focused !== null ? (
        <p className="mt-2 text-[10px] text-[var(--color-text-soft)]">
          <strong className="text-[var(--color-text)] font-semibold">{focused.provider}</strong> ·{" "}
          {focused.procedure} — drill-in available in the full report.
        </p>
      ) : (
        <p className="mt-2 text-[10px] text-[var(--color-text-soft)]">
          Click any cell to drill in. Darker = more revenue from that provider × procedure
          combination.
        </p>
      )}
    </div>
  );
}
