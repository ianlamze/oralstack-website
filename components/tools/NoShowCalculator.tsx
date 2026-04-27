"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Info } from "lucide-react";

type Currency = "SGD" | "MYR" | "USD" | "AUD" | "GBP";

const CURRENCY_META: Record<Currency, { symbol: string; defaultPerVisit: number }> = {
  SGD: { symbol: "S$", defaultPerVisit: 220 },
  MYR: { symbol: "RM", defaultPerVisit: 380 },
  USD: { symbol: "$", defaultPerVisit: 240 },
  AUD: { symbol: "A$", defaultPerVisit: 260 },
  GBP: { symbol: "£", defaultPerVisit: 180 },
};

const RECOVERY_LO = 0.3;
const RECOVERY_HI = 0.5;

export default function NoShowCalculator() {
  const [currency, setCurrency] = useState<Currency>("SGD");
  const [chairs, setChairs] = useState(3);
  const [apptsPerChair, setApptsPerChair] = useState(8);
  const [daysPerMonth, setDaysPerMonth] = useState(22);
  const [noShowPct, setNoShowPct] = useState(8);
  const [perVisit, setPerVisit] = useState(CURRENCY_META.SGD.defaultPerVisit);

  const meta = CURRENCY_META[currency];

  function onCurrencyChange(c: Currency) {
    setPerVisit(CURRENCY_META[c].defaultPerVisit);
    setCurrency(c);
  }

  const calc = useMemo(() => {
    const missedPerMonth = chairs * apptsPerChair * daysPerMonth * (noShowPct / 100);
    const monthlyLost = missedPerMonth * perVisit;
    const annualLost = monthlyLost * 12;
    const annualRecoveredLo = annualLost * RECOVERY_LO;
    const annualRecoveredHi = annualLost * RECOVERY_HI;
    return {
      missedPerMonth,
      monthlyLost,
      annualLost,
      annualRecoveredLo,
      annualRecoveredHi,
    };
  }, [chairs, apptsPerChair, daysPerMonth, noShowPct, perVisit]);

  function fmt(n: number): string {
    return `${meta.symbol}${Math.round(n).toLocaleString("en-US")}`;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 lg:items-start">
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 md:p-8 grid gap-7">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Inputs
          </p>
          <div className="flex items-center gap-1.5">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white px-2.5 py-1.5 text-xs font-medium tabular-nums text-[var(--color-text)] focus:outline-none focus:border-[var(--color-tide-deep)]"
            >
              {(Object.keys(CURRENCY_META) as Currency[]).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Slider label="Active chairs" min={1} max={20} value={chairs} onChange={setChairs} />
        <Slider
          label="Appointments per chair / day"
          min={1}
          max={20}
          value={apptsPerChair}
          onChange={setApptsPerChair}
        />
        <Slider
          label="Operating days per month"
          min={10}
          max={30}
          value={daysPerMonth}
          onChange={setDaysPerMonth}
        />
        <Slider
          label="Current no-show rate"
          min={1}
          max={30}
          value={noShowPct}
          onChange={setNoShowPct}
          suffix="%"
        />
        <Slider
          label="Average appointment value"
          min={50}
          max={1500}
          step={10}
          value={perVisit}
          onChange={setPerVisit}
          prefix={meta.symbol}
        />
      </div>

      <div className="grid gap-5">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-6 md:p-8 grid gap-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            What you&apos;re losing today
          </p>
          <div className="grid gap-1">
            <p className="text-sm text-[var(--color-text-muted)]">Missed appointments per month</p>
            <p className="text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
              ~{Math.round(calc.missedPerMonth).toLocaleString("en-US")}
            </p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm text-[var(--color-text-muted)]">Lost revenue per month</p>
            <p className="text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
              {fmt(calc.monthlyLost)}
            </p>
          </div>
          <div className="grid gap-1 border-t border-[var(--color-border)] pt-5">
            <p className="text-sm text-[var(--color-text-muted)]">Annualised</p>
            <p className="text-4xl md:text-5xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
              {fmt(calc.annualLost)}
            </p>
          </div>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-tide)] bg-white p-6 md:p-8 grid gap-4 shadow-[0_4px_14px_-4px_rgba(20,30,60,0.10)]">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
            Modeled recovery range with Oralstack
          </p>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text)]">
            {fmt(calc.annualRecoveredLo)} – {fmt(calc.annualRecoveredHi)}
          </p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Based on a 30–50% reduction in no-shows for clinics that adopt automated WhatsApp / SMS
            confirmations and same-day rebook from the schedule. Range, not guarantee.
          </p>
          <a
            href="/book-a-demo"
            className="inline-flex w-fit items-center gap-2 min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
          >
            <span>Book a 30-min walkthrough</span>
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>

        <div className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3.5 text-xs leading-relaxed text-[var(--color-text-muted)]">
          <Info className="mt-0.5 size-3.5 shrink-0 text-[var(--color-text-soft)]" aria-hidden />
          <p>
            Modeled, not measured. The 30–50% range is Oralstack&apos;s internal planning band based
            on what we&apos;ve seen reduce no-shows in dental practice: confirmed messaging within
            48 hours of the appointment, same-day rebook from the schedule, and a deposit policy on
            higher-value visits. Your clinic&apos;s actual reduction depends on patient mix and how
            firmly rebook is enforced.
          </p>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  value,
  onChange,
  step = 1,
  suffix = "",
  prefix = "",
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  suffix?: string;
  prefix?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-baseline justify-between text-sm font-medium text-[var(--color-text)]">
        <span>{label}</span>
        <span className="tabular-nums text-[var(--color-tide-deep)]">
          {prefix}
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--color-tide-deep)]"
      />
      <span className="flex justify-between text-[10px] tabular-nums text-[var(--color-text-soft)]">
        <span>
          {prefix}
          {min}
          {suffix}
        </span>
        <span>
          {prefix}
          {max}
          {suffix}
        </span>
      </span>
    </label>
  );
}
