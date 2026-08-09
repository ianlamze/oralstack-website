"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  categoryLabel,
  phaseLabel,
  procedureByCode,
  procedures,
} from "@/content/treatments/procedures";
import {
  type PlanItem,
  type PlanTotals,
  type Procedure,
  type ProcedureCategory,
  classifyTooth,
} from "@/content/treatments/types";
import { track } from "@/lib/analytics";

// Standard FDI quadrants — full mouth.
const UPPER_RIGHT = [18, 17, 16, 15, 14, 13, 12, 11];
const UPPER_LEFT = [21, 22, 23, 24, 25, 26, 27, 28];
const LOWER_RIGHT = [48, 47, 46, 45, 44, 43, 42, 41];
const LOWER_LEFT = [31, 32, 33, 34, 35, 36, 37, 38];

const GST_RATE = 0.09;

const categoryOrder: ProcedureCategory[] = [
  "preventive",
  "restorative",
  "endo",
  "surgical",
  "prosthetic",
];

const categoryAccent: Record<ProcedureCategory, string> = {
  preventive: "var(--color-sea)",
  restorative: "var(--color-sunset)",
  endo: "var(--color-violet)",
  surgical: "var(--color-tide)",
  prosthetic: "var(--color-ink)",
};

function midpoint(p: Procedure) {
  return (p.basePriceLow + p.basePriceHigh) / 2;
}

function format(n: number) {
  return `S$${n.toLocaleString("en-SG", { maximumFractionDigits: 0 })}`;
}

function formatRange(low: number, high: number) {
  return `S$${low.toLocaleString("en-SG")}–${high.toLocaleString("en-SG")}`;
}

function computeTotals(items: PlanItem[]): PlanTotals {
  const empty = { subtotal: 0, insuranceEst: 0, patientPortion: 0 };
  const byPhase = { 1: { ...empty }, 2: { ...empty }, 3: { ...empty } } as PlanTotals["byPhase"];
  let subtotal = 0;
  let insuranceEst = 0;

  for (const it of items) {
    const proc = procedureByCode[it.procedureCode];
    if (!proc) continue;
    const price = midpoint(proc);
    const ins = price * proc.insuranceCoverage;
    const patient = price - ins;
    subtotal += price;
    insuranceEst += ins;
    const phase = byPhase[proc.defaultPhase];
    phase.subtotal += price;
    phase.insuranceEst += ins;
    phase.patientPortion += patient;
  }

  const patientPortion = subtotal - insuranceEst;
  const gst = patientPortion * GST_RATE;
  return {
    subtotal,
    insuranceEst,
    patientPortion,
    gst,
    total: patientPortion + gst,
    byPhase,
  };
}

export default function TreatmentPlanBuilder() {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [pickerForTooth, setPickerForTooth] = useState<number | null>(null);
  const [postDemoNudge, setPostDemoNudge] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const totals = useMemo(() => computeTotals(items), [items]);
  const itemCount = items.length;

  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
    setPostDemoNudge(false);
  }

  function pickTooth(num: number) {
    markInteracted();
    setPickerForTooth((cur) => (cur === num ? null : num));
  }

  function addProcedure(toothNumber: number, procedureCode: string) {
    markInteracted();
    const proc = procedureByCode[procedureCode];
    if (!proc) return;
    const id = `${toothNumber}-${procedureCode}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setItems((prev) => [...prev, { id, procedureCode, toothNumber }]);
    setPickerForTooth(null);
    track("treatment_plan_procedure_added", {
      code: procedureCode,
      tooth: toothNumber,
      category: proc.category,
    });
  }

  function removeItem(id: string) {
    markInteracted();
    const target = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (target) {
      track("treatment_plan_procedure_removed", {
        code: target.procedureCode,
        tooth: target.toothNumber,
      });
    }
  }

  // Click-outside to dismiss picker.
  useEffect(() => {
    if (pickerForTooth === null) return;
    function onPointerDown(e: PointerEvent) {
      if (!pickerRef.current) return;
      if (pickerRef.current.contains(e.target as Node)) return;
      // Skip if the click landed on a tooth button — pickTooth handles toggling.
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-tooth]")) return;
      setPickerForTooth(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPickerForTooth(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [pickerForTooth]);

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;

    const openFirst = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setPickerForTooth(16);
    }, 700);

    const pickFirst = setTimeout(() => {
      if (hasInteractedRef.current) return;
      const id = `demo-16-DCC107-${Date.now()}`;
      setItems((prev) => [...prev, { id, procedureCode: "DCC107", toothNumber: 16 }]);
      setPickerForTooth(null);
    }, 700 + 1100);

    const openSecond = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setPickerForTooth(24);
      },
      700 + 1100 + 1100,
    );

    const pickSecond = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        const id = `demo-24-DCC502-${Date.now()}`;
        setItems((prev) => [...prev, { id, procedureCode: "DCC502", toothNumber: 24 }]);
        setPickerForTooth(null);
      },
      700 + 1100 + 1100 + 1100,
    );

    const nudgeOn = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setPostDemoNudge(true);
      },
      700 + 1100 + 1100 + 1100 + 800,
    );

    const nudgeOff = setTimeout(
      () => {
        setPostDemoNudge(false);
      },
      700 + 1100 + 1100 + 1100 + 800 + 3500,
    );

    demoTimersRef.current = [openFirst, pickFirst, openSecond, pickSecond, nudgeOn, nudgeOff];
  }, []);

  useEffect(() => {
    if (hasDemoedRef.current) return;
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasDemoedRef.current || hasInteractedRef.current) return;
        hasDemoedRef.current = true;
        observer.disconnect();
        runDemo();
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [runDemo]);

  useEffect(() => {
    return () => {
      for (const t of demoTimersRef.current) clearTimeout(t);
      demoTimersRef.current = [];
    };
  }, []);

  // Index items by tooth for chart rendering, and by phase for the plan card.
  const itemsByTooth = useMemo(() => {
    const map = new Map<number, PlanItem[]>();
    for (const it of items) {
      const bucket = map.get(it.toothNumber) ?? [];
      bucket.push(it);
      map.set(it.toothNumber, bucket);
    }
    return map;
  }, [items]);

  const itemsByPhase = useMemo(() => {
    const grouped: Record<1 | 2 | 3, PlanItem[]> = { 1: [], 2: [], 3: [] };
    for (const it of items) {
      const proc = procedureByCode[it.procedureCode];
      if (!proc) continue;
      grouped[proc.defaultPhase].push(it);
    }
    return grouped;
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-3 sm:p-6 md:p-8"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Treatment plan builder</span>
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8 items-start">
        {/* Odontogram — 4 quadrants, full mouth */}
        <div className="grid gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3 sm:gap-x-6 sm:gap-y-0">
            <Quadrant
              label="Upper right"
              numbers={UPPER_RIGHT}
              align="right"
              selected={pickerForTooth}
              itemsByTooth={itemsByTooth}
              onPick={pickTooth}
              pickerRef={pickerRef}
              onAdd={addProcedure}
            />
            <Quadrant
              label="Upper left"
              numbers={UPPER_LEFT}
              align="left"
              selected={pickerForTooth}
              itemsByTooth={itemsByTooth}
              onPick={pickTooth}
              pickerRef={pickerRef}
              onAdd={addProcedure}
            />
          </div>
          <div className="border-t border-[var(--color-border)] my-1" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3 sm:gap-x-6 sm:gap-y-0">
            <Quadrant
              label="Lower right"
              numbers={LOWER_RIGHT}
              align="right"
              selected={pickerForTooth}
              itemsByTooth={itemsByTooth}
              onPick={pickTooth}
              pickerRef={pickerRef}
              onAdd={addProcedure}
            />
            <Quadrant
              label="Lower left"
              numbers={LOWER_LEFT}
              align="left"
              selected={pickerForTooth}
              itemsByTooth={itemsByTooth}
              onPick={pickTooth}
              pickerRef={pickerRef}
              onAdd={addProcedure}
            />
          </div>
          <p className="text-[10px] tracking-[0.04em] mt-2 min-h-[14px]">
            <AnimatePresence mode="wait" initial={false}>
              {postDemoNudge ? (
                <motion.span
                  key="nudge"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1 font-semibold text-[var(--color-tide-deep)]"
                >
                  <span aria-hidden>↕</span>
                  Now you try — click any tooth
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-[var(--color-text-soft)]"
                >
                  FDI numbering · click a tooth to add a procedure
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>

        {/* Plan card */}
        <aside className="grid gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
              Treatment plan
            </p>
            <p className="text-[10px] text-[var(--color-text-soft)] tabular-nums">
              {itemCount === 0 ? "Empty" : `${itemCount} item${itemCount === 1 ? "" : "s"}`}
            </p>
          </div>

          {itemCount === 0 ? (
            <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] p-5 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">No procedures added yet.</p>
              <p className="mt-1 text-[11px] text-[var(--color-text-soft)]">
                Click any tooth to start — the plan totals up here.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {(Object.keys(itemsByPhase) as unknown as (keyof typeof itemsByPhase)[])
                .map(Number)
                .sort((a, b) => a - b)
                .filter((p) => itemsByPhase[p as 1 | 2 | 3].length > 0)
                .map((p) => {
                  const phase = p as 1 | 2 | 3;
                  const phaseItems = itemsByPhase[phase];
                  const phaseTotals = totals.byPhase[phase];
                  return (
                    <motion.div
                      key={phase}
                      layout
                      transition={{ layout: { type: "spring", stiffness: 420, damping: 36 } }}
                      className="grid gap-1.5 rounded-md bg-white border border-[var(--color-border)] p-3"
                    >
                      <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-soft)] font-semibold">
                        {phaseLabel[phase]}
                      </p>
                      <ul className="grid divide-y divide-[var(--color-border)]">
                        <AnimatePresence initial={false}>
                          {phaseItems.map((it) => {
                            const proc = procedureByCode[it.procedureCode];
                            if (!proc) return null;
                            return (
                              <motion.li
                                key={it.id}
                                layout
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                transition={{ duration: 0.16 }}
                                className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] gap-2 items-center py-1.5"
                              >
                                <span className="text-[10px] font-mono text-[var(--color-text-soft)] tabular-nums">
                                  #{it.toothNumber}
                                </span>
                                <span className="text-[12px] text-[var(--color-text)] truncate">
                                  {proc.name}
                                </span>
                                <span className="text-[11px] tabular-nums text-[var(--color-text-muted)] whitespace-nowrap">
                                  {formatRange(proc.basePriceLow, proc.basePriceHigh)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeItem(it.id)}
                                  aria-label={`Remove ${proc.name} on tooth ${it.toothNumber}`}
                                  className="text-[var(--color-text-soft)] hover:text-[var(--color-text)] text-[14px] leading-none px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-tide-deep)] rounded"
                                >
                                  ×
                                </button>
                              </motion.li>
                            );
                          })}
                        </AnimatePresence>
                      </ul>
                      <p className="text-[10px] text-[var(--color-text-soft)] tabular-nums text-right mt-1">
                        Phase subtotal · {format(phaseTotals.subtotal)}
                      </p>
                    </motion.div>
                  );
                })}
            </div>
          )}

          {itemCount > 0 && (
            <motion.div
              layout
              className="grid gap-1 border-t border-[var(--color-border)] pt-3 text-[12px]"
            >
              <Row label="Subtotal" value={format(totals.subtotal)} muted />
              <Row
                label="Estimated insurance"
                value={`− ${format(totals.insuranceEst)}`}
                muted
                color="text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)]"
              />
              <Row label="Patient portion" value={format(totals.patientPortion)} muted />
              <Row label="GST (9%)" value={format(totals.gst)} muted />
              <Row label="Total due" value={format(totals.total)} bold />
            </motion.div>
          )}

          <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] leading-relaxed">
            Indicative — based on CHAS Blue + average IPP coverage. Your insurer&apos;s split
            decides the final amount.
          </p>

          <a
            href="/book-a-demo"
            onClick={() => track("treatment_plan_cta_click", { item_count: itemCount })}
            className="inline-flex items-center justify-center min-h-[40px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2.5 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
          >
            Present to a real patient → book a demo
          </a>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  bold,
  color,
}: {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`grid grid-cols-[1fr_auto] ${
        bold ? "font-semibold text-[var(--color-text)] mt-1 text-[13px]" : ""
      } ${muted && !bold ? "text-[var(--color-text-muted)]" : ""} ${color ?? ""}`}
    >
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function Quadrant({
  label,
  numbers,
  align,
  selected,
  itemsByTooth,
  onPick,
  pickerRef,
  onAdd,
}: {
  label: string;
  numbers: number[];
  align: "left" | "right";
  selected: number | null;
  itemsByTooth: Map<number, PlanItem[]>;
  onPick: (n: number) => void;
  pickerRef: React.RefObject<HTMLDivElement | null>;
  onAdd: (tooth: number, code: string) => void;
}) {
  return (
    <div>
      <p
        className={`text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] mb-1.5 ${
          align === "left" ? "text-left" : "text-right"
        }`}
      >
        {label}
      </p>
      <div
        className={`flex gap-0.5 sm:gap-1 ${align === "right" ? "justify-end" : "justify-start"}`}
      >
        {numbers.map((n) => {
          const planItems = itemsByTooth.get(n) ?? [];
          const isOpen = selected === n;
          return (
            <div key={n} className="relative">
              <Tooth
                num={n}
                hasItems={planItems.length > 0}
                primaryCategory={
                  planItems[0] ? procedureByCode[planItems[0].procedureCode]?.category : undefined
                }
                isOpen={isOpen}
                onSelect={() => onPick(n)}
              />
              {isOpen ? (
                <ProcedurePicker
                  ref={pickerRef}
                  toothNumber={n}
                  onPick={(code) => onAdd(n, code)}
                  align={align}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Tooth({
  num,
  hasItems,
  primaryCategory,
  isOpen,
  onSelect,
}: {
  num: number;
  hasItems: boolean;
  primaryCategory: ProcedureCategory | undefined;
  isOpen: boolean;
  onSelect: () => void;
}) {
  const accent = primaryCategory ? categoryAccent[primaryCategory] : null;
  return (
    <button
      type="button"
      data-tooth={num}
      onClick={onSelect}
      aria-pressed={isOpen}
      aria-label={`Tooth ${num}${hasItems ? ", has procedure" : ""}${isOpen ? ", picker open" : ""}`}
      className="grid gap-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
    >
      <span className="text-[9px] text-[var(--color-text-soft)] tabular-nums text-center leading-none">
        {num}
      </span>
      <motion.span
        animate={{ scale: isOpen ? 1.08 : 1, y: isOpen ? -1 : 0 }}
        whileHover={isOpen ? undefined : { scale: 1.04, y: -0.5 }}
        transition={{ type: "spring", stiffness: 520, damping: 30 }}
        className={`block h-6 w-4 sm:h-7 sm:w-6 rounded-md border bg-white transition-colors ${
          isOpen
            ? "ring-2 ring-offset-1 ring-[var(--color-tide-deep)]"
            : "hover:border-[var(--color-border-strong)]"
        }`}
        style={
          accent
            ? {
                backgroundColor: `color-mix(in oklch, ${accent}, white 70%)`,
                borderColor: `color-mix(in oklch, ${accent}, var(--color-ink) 30%)`,
              }
            : { borderColor: "var(--color-border)" }
        }
      />
    </button>
  );
}

function ProcedurePicker({
  toothNumber,
  onPick,
  align,
  ref,
}: {
  toothNumber: number;
  onPick: (code: string) => void;
  align: "left" | "right";
  ref?: React.Ref<HTMLDivElement>;
}) {
  const grouped = useMemo(() => {
    const toothType = classifyTooth(toothNumber);
    const map = new Map<ProcedureCategory, Procedure[]>();
    for (const cat of categoryOrder) map.set(cat, []);
    for (const p of procedures) {
      if (p.applicableTeeth === "all" || p.applicableTeeth === toothType) {
        map.get(p.category)?.push(p);
      }
    }
    return map;
  }, [toothNumber]);

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-label={`Add procedure to tooth ${toothNumber}`}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.16 }}
      // On narrow viewports the popover centers on the tooth and clamps to the
      // viewport (max-w accounts for ~32px of page padding). On sm+ it falls
      // back to the alignment hint from the parent quadrant.
      className={`absolute z-30 top-full mt-2 w-[260px] max-w-[calc(100vw-32px)] rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-white shadow-[0_18px_60px_-24px_rgba(20,30,60,0.35)] p-3 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-auto ${
        align === "right" ? "sm:right-0" : "sm:left-0"
      }`}
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-soft)] mb-2">
        Tooth {toothNumber} · add a procedure
      </p>
      <div className="grid gap-2">
        {categoryOrder.map((cat) => {
          const list = grouped.get(cat) ?? [];
          if (list.length === 0) return null;
          return (
            <div key={cat} className="grid gap-1">
              <p
                className="text-[9px] uppercase tracking-[0.12em] font-medium"
                style={{
                  color: `color-mix(in oklch, ${categoryAccent[cat]}, var(--color-ink) 45%)`,
                }}
              >
                {categoryLabel[cat]}
              </p>
              <ul className="grid">
                {list.map((p) => (
                  <li key={p.code}>
                    <button
                      type="button"
                      onClick={() => onPick(p.code)}
                      className="w-full grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 px-2 py-1.5 text-left rounded hover:bg-[var(--color-canvas-tinted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-tide-deep)]"
                    >
                      <span className="text-[12px] text-[var(--color-text)] truncate">
                        {p.name}
                      </span>
                      <span className="text-[10px] tabular-nums text-[var(--color-text-soft)] whitespace-nowrap">
                        {formatRange(p.basePriceLow, p.basePriceHigh)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
