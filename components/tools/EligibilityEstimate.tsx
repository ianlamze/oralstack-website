"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  type ChasTier,
  type InsurancePlan,
  chasLabel,
  chasSubtitle,
  computeEstimate,
  insuranceLabel,
  procedures,
} from "@/content/eligibility/types";
import { track } from "@/lib/analytics";

const CHAS_TIERS: ChasTier[] = ["none", "blue", "orange", "pioneer", "merdeka"];
const INSURANCE_PLANS: InsurancePlan[] = ["none", "ipp-basic", "ipp-comprehensive", "employer"];

function format(n: number) {
  return `S$${n.toLocaleString("en-SG", { maximumFractionDigits: 0 })}`;
}

const DEMO_PICKS = ["DCC108", "DCC602"];
const DEMO_CHAS: ChasTier = "blue";
const DEMO_INSURANCE: InsurancePlan = "ipp-basic";

export default function EligibilityEstimate() {
  const [chas, setChas] = useState<ChasTier>("none");
  const [insurance, setInsurance] = useState<InsurancePlan>("none");
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
  }

  function pickChas(t: ChasTier) {
    markInteracted();
    setChas(t);
    track("eligibility_chas_changed", { tier: t });
  }

  function pickInsurance(p: InsurancePlan) {
    markInteracted();
    setInsurance(p);
    track("eligibility_insurance_changed", { plan: p });
  }

  function toggleProcedure(code: string) {
    markInteracted();
    setSelected((prev) => {
      const next = new Set(prev);
      const willBeOn = !next.has(code);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      track("eligibility_procedure_toggled", { code, on: willBeOn });
      return next;
    });
  }

  const result = useMemo(
    () => computeEstimate(Array.from(selected), chas, insurance),
    [selected, chas, insurance],
  );

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;

    const tier = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setChas(DEMO_CHAS);
    }, 700);

    const ins = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setInsurance(DEMO_INSURANCE);
    }, 700 + 800);

    DEMO_PICKS.forEach((code, i) => {
      const t = setTimeout(
        () => {
          if (hasInteractedRef.current) return;
          setSelected((prev) => {
            const next = new Set(prev);
            next.add(code);
            return next;
          });
        },
        700 + 800 + 700 + i * 700,
      );
      demoTimersRef.current.push(t);
    });

    demoTimersRef.current.push(tier, ins);
  }, []);

  useEffect(() => {
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
      { threshold: 0.45 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [runDemo]);

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
          <span>Pre-treatment estimate</span>
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
          Patient · #1042
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 items-start">
        <div className="grid gap-5">
          <fieldset className="grid gap-2 border-0 p-0 m-0">
            <legend className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
              CHAS subsidy
            </legend>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {CHAS_TIERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => pickChas(t)}
                  aria-pressed={chas === t}
                  className={`text-left rounded-md border px-3 py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                    chas === t
                      ? "border-[var(--color-ink)] bg-[var(--color-canvas-tinted)]"
                      : "border-[var(--color-border)] bg-white hover:border-[var(--color-border-strong)]"
                  }`}
                >
                  <span className="block text-[12px] font-semibold text-[var(--color-text)]">
                    {chasLabel[t]}
                  </span>
                  <span className="block text-[10px] text-[var(--color-text-soft)]">
                    {chasSubtitle[t]}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-2 border-0 p-0 m-0">
            <legend className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
              Insurance plan
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {INSURANCE_PLANS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => pickInsurance(p)}
                  aria-pressed={insurance === p}
                  className={`min-h-[36px] px-3 py-1.5 rounded-md border text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                    insurance === p
                      ? "bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)]"
                      : "bg-white text-[var(--color-text-muted)] border-[var(--color-border-strong)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
                  }`}
                >
                  {insuranceLabel[p]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="grid gap-2 border-0 p-0 m-0">
            <legend className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
              Procedures
            </legend>
            <ul className="grid gap-1.5">
              {procedures.map((p) => {
                const on = selected.has(p.code);
                return (
                  <li key={p.code}>
                    <button
                      type="button"
                      onClick={() => toggleProcedure(p.code)}
                      aria-pressed={on}
                      className={`w-full grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md border px-3 py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                        on
                          ? "border-[var(--color-ink)] bg-[var(--color-canvas-tinted)]"
                          : "border-[var(--color-border)] bg-white hover:border-[var(--color-border-strong)]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm border ${
                          on
                            ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-[var(--color-canvas)]"
                            : "border-[var(--color-border-strong)] bg-white"
                        }`}
                      >
                        {on ? <span className="text-[10px] leading-none">✓</span> : null}
                      </span>
                      <span className="text-left text-[12px] font-medium text-[var(--color-text)] truncate">
                        {p.name}
                      </span>
                      <span className="text-[11px] tabular-nums text-[var(--color-text-soft)]">
                        {format(p.basePrice)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </div>

        <aside className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
            Estimate breakdown
          </p>

          {selected.size === 0 ? (
            <div className="rounded-md border border-dashed border-[var(--color-border-strong)] p-5 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                Pick procedures to see the patient&apos;s portion before treatment.
              </p>
            </div>
          ) : (
            <div className="grid gap-2.5 rounded-md bg-white border border-[var(--color-border)] p-4 text-[12px]">
              <ul className="grid divide-y divide-[var(--color-border)]">
                {result.lines.map((l) => (
                  <li key={l.code} className="grid grid-cols-[minmax(0,1fr)_auto] py-1.5">
                    <span className="truncate text-[var(--color-text)]">{l.name}</span>
                    <span className="tabular-nums text-[var(--color-text-muted)]">
                      {format(l.price)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="grid gap-1 border-t border-[var(--color-border)] pt-2">
                <Row label="Subtotal" value={format(result.subtotal)} />
                {result.chasSubsidy > 0 && (
                  <Row
                    label={`CHAS subsidy (${chasLabel[chas]})`}
                    value={`− ${format(result.chasSubsidy)}`}
                    color="text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]"
                  />
                )}
                {result.insuranceClaim > 0 && (
                  <Row
                    label={`Insurance claim (${insuranceLabel[insurance]})`}
                    value={`− ${format(result.insuranceClaim)}`}
                    color="text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]"
                  />
                )}
                {result.medisaveApplied > 0 && (
                  <Row
                    label="MediSave applied"
                    value={`− ${format(result.medisaveApplied)}`}
                    color="text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]"
                  />
                )}
                <Row label="Patient portion" value={format(result.patientPortion)} muted />
                <Row label="GST (9%)" value={format(result.gst)} muted />
                <motion.div
                  key={result.total}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.16 }}
                  className="grid grid-cols-[1fr_auto] mt-1 font-semibold text-[13px] text-[var(--color-text)]"
                >
                  <span>Patient pays today</span>
                  <span className="tabular-nums">{format(result.total)}</span>
                </motion.div>
              </div>
            </div>
          )}

          <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] leading-relaxed">
            Indicative — CHAS subsidies have per-procedure caps the demo simplifies. Insurance claim
            varies by plan year-to-date. Real number generated at chair from the patient&apos;s
            actual coverage on file.
          </p>

          <a
            href="/book-a-demo"
            onClick={() => track("eligibility_cta_click", { item_count: selected.size })}
            className="inline-flex items-center justify-center min-h-[40px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2.5 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
          >
            Run on a real patient → book a demo
          </a>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  color,
  muted,
}: {
  label: string;
  value: string;
  color?: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[1fr_auto] ${muted ? "text-[var(--color-text-muted)]" : ""} ${color ?? ""}`}
    >
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
