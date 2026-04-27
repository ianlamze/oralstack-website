"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Condition = "caries" | "filling" | "crown" | "watch";

type ToothFinding = { cond: Condition; surface: string; note: string };

const conditionStyles: Record<
  Condition,
  { bg: string; border: string; dot: string; label: string }
> = {
  caries: {
    bg: "color-mix(in oklch, var(--color-sunset), white 65%)",
    border: "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 25%)",
    dot: "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 25%)",
    label: "Caries",
  },
  filling: {
    bg: "color-mix(in oklch, var(--color-sea), white 65%)",
    border: "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)",
    dot: "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)",
    label: "Filling",
  },
  crown: {
    bg: "color-mix(in oklch, var(--color-violet), white 78%)",
    border: "color-mix(in oklch, var(--color-violet), var(--color-ink) 30%)",
    dot: "color-mix(in oklch, var(--color-violet), var(--color-ink) 30%)",
    label: "Crown",
  },
  watch: {
    bg: "transparent",
    border: "var(--color-border-strong)",
    dot: "var(--color-text-soft)",
    label: "Watch",
  },
};

const upperRight = [18, 17, 16, 15, 14, 13, 12, 11];
const lowerRight = [48, 47, 46, 45, 44, 43, 42, 41];

const DEFAULT_TOOTH = 16;
const DEMO_TOOTH = 14;

const toothNames: Record<number, string> = {
  11: "Maxillary central incisor",
  12: "Maxillary lateral incisor",
  13: "Maxillary canine",
  14: "Maxillary first premolar",
  15: "Maxillary second premolar",
  16: "Maxillary first molar",
  17: "Maxillary second molar",
  18: "Maxillary third molar",
  41: "Mandibular central incisor",
  42: "Mandibular lateral incisor",
  43: "Mandibular canine",
  44: "Mandibular first premolar",
  45: "Mandibular second premolar",
  46: "Mandibular first molar",
  47: "Mandibular second molar",
  48: "Mandibular third molar",
};

const findings: Record<number, ToothFinding[]> = {
  16: [
    { cond: "caries", surface: "(O)", note: "Active" },
    { cond: "watch", surface: "(M)", note: "Watch" },
  ],
  14: [{ cond: "filling", surface: "(O)", note: "Composite, 2024" }],
  12: [{ cond: "watch", surface: "(M)", note: "Watch" }],
  46: [{ cond: "filling", surface: "(M-O)", note: "Composite, 2023" }],
  47: [{ cond: "filling", surface: "(O)", note: "Composite, 2023" }],
  44: [{ cond: "watch", surface: "(B)", note: "Watch" }],
};

const primaryCondition: Record<number, Condition | undefined> = Object.fromEntries(
  Object.entries(findings).map(([n, fs]) => [Number(n), fs[0]?.cond]),
);

export default function OdontogramMock() {
  const [selected, setSelected] = useState<number>(DEFAULT_TOOTH);
  const [postDemoNudge, setPostDemoNudge] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useReducedMotion();

  const selectedFindings = findings[selected] ?? [];

  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
    setPostDemoNudge(false);
  }

  function pickTooth(n: number) {
    markInteracted();
    setSelected(n);
  }

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;

    // Move to demo tooth, hold so the user sees the sidebar update, then move
    // back so the post-demo state matches the initial state — clean handoff.
    const moveTo = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setSelected(DEMO_TOOTH);
    }, 700);

    const moveBack = setTimeout(() => {
      if (hasInteractedRef.current) return;
      setSelected(DEFAULT_TOOTH);
    }, 700 + 1500);

    const nudgeOn = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setPostDemoNudge(true);
      },
      700 + 1500 + 400,
    );

    const nudgeOff = setTimeout(
      () => {
        setPostDemoNudge(false);
      },
      700 + 1500 + 400 + 3000,
    );

    demoTimersRef.current = [moveTo, moveBack, nudgeOn, nudgeOff];
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
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
      { threshold: 0.55 },
    );
    observer.observe(node);
    return () => observer.disconnect();
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
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[520px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Patient chart</span>
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
          Lim Wei Jian · #1042
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] gap-4 sm:gap-5 items-start">
        <div className="grid gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] mb-1.5">
              Upper right
            </p>
            <div className="flex gap-1">
              {upperRight.map((n) => (
                <Tooth
                  key={n}
                  num={n}
                  cond={primaryCondition[n]}
                  selected={selected === n}
                  onSelect={() => pickTooth(n)}
                  onHoverIntent={markInteracted}
                  reduceMotion={!!reduceMotion}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] my-1" />

          <div>
            <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] mb-1.5">
              Lower right
            </p>
            <div className="flex gap-1">
              {lowerRight.map((n) => (
                <Tooth
                  key={n}
                  num={n}
                  cond={primaryCondition[n]}
                  selected={selected === n}
                  onSelect={() => pickTooth(n)}
                  onHoverIntent={markInteracted}
                  reduceMotion={!!reduceMotion}
                />
              ))}
            </div>
          </div>

          <p className="text-[9px] tracking-[0.04em] mt-2 min-h-[14px]">
            <AnimatePresence mode="wait" initial={false}>
              {postDemoNudge ? (
                <motion.span
                  key="nudge"
                  initial={reduceMotion ? false : { opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-1 font-semibold text-[var(--color-tide-deep)]"
                >
                  <span aria-hidden>↕</span>
                  Now you try — click any tooth
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-[var(--color-text-soft)]"
                >
                  FDI numbering · 5 surfaces (M/D/B/L/O) · click a tooth
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>

        <aside className="border-l border-[var(--color-border)] pl-4 grid gap-3 min-w-[140px]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
              Selected
            </p>
            <motion.p
              key={selected}
              initial={reduceMotion ? false : { opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="text-sm font-semibold text-[var(--color-text)] mt-1 tabular-nums"
            >
              Tooth {selected}
            </motion.p>
            <p className="text-[10px] text-[var(--color-text-soft)]">
              {toothNames[selected] ?? "—"}
            </p>
          </div>

          <ul className="grid gap-2 min-h-[40px]">
            {selectedFindings.length === 0 ? (
              <li className="text-[10px] text-[var(--color-text-soft)] italic">
                No findings yet — tap a surface to chart.
              </li>
            ) : (
              selectedFindings.map((c, i) => {
                const s = conditionStyles[c.cond];
                return (
                  <motion.li
                    key={`${selected}-${i}`}
                    initial={reduceMotion ? false : { opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.04 }}
                    className="flex items-start gap-2"
                  >
                    <span
                      aria-hidden
                      className="mt-1 inline-block h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: s.dot }}
                    />
                    <div className="grid gap-0.5">
                      <p className="text-[11px] font-medium text-[var(--color-text)] leading-tight">
                        {s.label} {c.surface}
                      </p>
                      <p className="text-[10px] text-[var(--color-text-soft)] leading-tight">
                        {c.note}
                      </p>
                    </div>
                  </motion.li>
                );
              })
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}

function Tooth({
  num,
  cond,
  selected,
  onSelect,
  onHoverIntent,
  reduceMotion,
}: {
  num: number;
  cond: Condition | undefined;
  selected: boolean;
  onSelect: () => void;
  onHoverIntent: () => void;
  reduceMotion: boolean;
}) {
  const s = cond ? conditionStyles[cond] : null;
  return (
    <button
      type="button"
      onClick={onSelect}
      onPointerEnter={onHoverIntent}
      onFocus={onHoverIntent}
      aria-pressed={selected}
      aria-label={`Tooth ${num}${cond ? `, ${conditionStyles[cond].label.toLowerCase()}` : ""}${selected ? ", selected" : ""}`}
      className="grid gap-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
    >
      <div className="text-[9px] text-[var(--color-text-soft)] tabular-nums text-center leading-none">
        {num}
      </div>
      <motion.div
        animate={reduceMotion ? undefined : { scale: selected ? 1.08 : 1, y: selected ? -1 : 0 }}
        whileHover={reduceMotion || selected ? undefined : { scale: 1.04, y: -0.5 }}
        transition={{ type: "spring", stiffness: 520, damping: 30 }}
        className={`h-7 w-6 rounded-md border bg-white transition-colors ${
          selected
            ? "ring-2 ring-offset-1 ring-[var(--color-tide-deep)]"
            : "hover:border-[var(--color-border-strong)]"
        }`}
        style={
          s
            ? { backgroundColor: s.bg, borderColor: s.border }
            : { borderColor: "var(--color-border)" }
        }
      />
    </button>
  );
}
