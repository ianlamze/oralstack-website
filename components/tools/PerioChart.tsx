"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type SiteCode, type ToothPerio, depthSeverity } from "@/content/perio/types";
import { track } from "@/lib/analytics";

const TEETH = [18, 17, 16, 15, 14, 13, 12, 11];
const SITES: SiteCode[] = ["DB", "B", "MB"];

const DEMO_SEQUENCE: { tooth: number; site: SiteCode; mm: number }[] = [
  { tooth: 16, site: "B", mm: 6 },
  { tooth: 16, site: "DB", mm: 5 },
  { tooth: 17, site: "MB", mm: 4 },
];

function emptyChart(): ToothPerio[] {
  return TEETH.map((num) => ({ num, depths: { DB: 0, B: 0, MB: 0 }, bop: false }));
}

const sevColor: Record<ReturnType<typeof depthSeverity>, string> = {
  unrecorded: "var(--color-border-strong)",
  healthy: "color-mix(in oklch, var(--color-sea), var(--color-ink) 30%)",
  caution: "color-mix(in oklch, var(--color-sunset), var(--color-ink) 30%)",
  severe: "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 30%)",
};

export default function PerioChart() {
  const [chart, setChart] = useState<ToothPerio[]>(emptyChart);
  const [postDemoNudge, setPostDemoNudge] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const demoTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useReducedMotion();

  function markInteracted() {
    if (!hasInteractedRef.current) hasInteractedRef.current = true;
    setPostDemoNudge(false);
  }

  function bumpDepth(toothNum: number, site: SiteCode) {
    markInteracted();
    setChart((prev) =>
      prev.map((t) => {
        if (t.num !== toothNum) return t;
        const next = (t.depths[site] + 1) % 9; // cycle 0..8
        return { ...t, depths: { ...t.depths, [site]: next } };
      }),
    );
    track("perio_site_recorded", { tooth: toothNum, site });
  }

  function toggleBop(toothNum: number) {
    markInteracted();
    setChart((prev) => prev.map((t) => (t.num === toothNum ? { ...t, bop: !t.bop } : t)));
    track("perio_bop_toggled", { tooth: toothNum });
  }

  function resetChart() {
    markInteracted();
    setChart(emptyChart());
    track("perio_reset", {});
  }

  const stats = useMemo(() => {
    let total = 0;
    let recorded = 0;
    let needsAttention = 0;
    let sumDepth = 0;
    for (const t of chart) {
      for (const s of SITES) {
        total += 1;
        const d = t.depths[s];
        if (d > 0) {
          recorded += 1;
          sumDepth += d;
          if (d >= 4) needsAttention += 1;
        }
      }
    }
    const meanDepth = recorded === 0 ? 0 : sumDepth / recorded;
    const bopCount = chart.filter((t) => t.bop).length;
    return { total, recorded, needsAttention, meanDepth, bopCount };
  }, [chart]);

  const runDemo = useCallback(() => {
    if (hasInteractedRef.current) return;

    DEMO_SEQUENCE.forEach((step, i) => {
      const t = setTimeout(
        () => {
          if (hasInteractedRef.current) return;
          setChart((prev) =>
            prev.map((tooth) =>
              tooth.num === step.tooth
                ? { ...tooth, depths: { ...tooth.depths, [step.site]: step.mm } }
                : tooth,
            ),
          );
        },
        700 + i * 900,
      );
      demoTimersRef.current.push(t);
    });

    const bopT = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setChart((prev) => prev.map((t) => (t.num === 16 ? { ...t, bop: true } : t)));
      },
      700 + DEMO_SEQUENCE.length * 900 + 300,
    );

    const nudgeOn = setTimeout(
      () => {
        if (hasInteractedRef.current) return;
        setPostDemoNudge(true);
      },
      700 + DEMO_SEQUENCE.length * 900 + 1100,
    );

    const nudgeOff = setTimeout(
      () => setPostDemoNudge(false),
      700 + DEMO_SEQUENCE.length * 900 + 1100 + 3500,
    );

    demoTimersRef.current.push(bopT, nudgeOn, nudgeOff);
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
      { threshold: 0.45 },
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
          <span>Perio chart · upper right</span>
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-8 items-start">
        <div className="grid gap-3">
          <div className="flex gap-2 sm:gap-3">
            {chart.map((tooth) => {
              const sevB = depthSeverity(tooth.depths.B);
              return (
                <div key={tooth.num} className="grid gap-1 flex-1">
                  <span className="text-[9px] text-[var(--color-text-soft)] tabular-nums text-center leading-none">
                    {tooth.num}
                  </span>
                  <div className="grid grid-cols-3 gap-0.5">
                    {SITES.map((s) => {
                      const mm = tooth.depths[s];
                      const sev = depthSeverity(mm);
                      const color = sevColor[sev];
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => bumpDepth(tooth.num, s)}
                          aria-label={`Tooth ${tooth.num} site ${s} probing depth ${mm} mm — click to increment`}
                          className="relative grid place-items-center h-7 rounded-sm border bg-white hover:border-[var(--color-border-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-tide-deep)] transition-colors"
                          style={{
                            borderColor: sev === "unrecorded" ? "var(--color-border)" : color,
                            backgroundColor:
                              sev === "unrecorded"
                                ? "white"
                                : `color-mix(in oklch, ${color}, white 70%)`,
                          }}
                        >
                          <motion.span
                            key={mm}
                            initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.15 }}
                            className="text-[10px] font-semibold tabular-nums"
                            style={{ color }}
                          >
                            {mm > 0 ? mm : "·"}
                          </motion.span>
                        </button>
                      );
                    })}
                  </div>
                  <div
                    className="h-7 rounded-md border bg-white"
                    style={{
                      borderColor: sevB === "unrecorded" ? "var(--color-border)" : sevColor[sevB],
                      backgroundColor:
                        sevB === "unrecorded"
                          ? "white"
                          : `color-mix(in oklch, ${sevColor[sevB]}, white 78%)`,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => toggleBop(tooth.num)}
                    aria-label={`Bleeding on probe for tooth ${tooth.num}: ${tooth.bop ? "yes" : "no"} — click to toggle`}
                    className="grid place-items-center h-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-tide-deep)]"
                  >
                    <motion.span
                      animate={{ scale: tooth.bop ? 1 : 0.6, opacity: tooth.bop ? 1 : 0.4 }}
                      transition={{ duration: 0.15 }}
                      aria-hidden
                      className="inline-block h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: tooth.bop
                          ? "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 25%)"
                          : "var(--color-border-strong)",
                      }}
                    />
                  </button>
                  <span className="text-[8px] text-[var(--color-text-soft)] tracking-[0.04em] text-center uppercase">
                    BoP
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[9px] text-[var(--color-text-soft)] tracking-[0.04em] mt-2">
            Sites: distobuccal · buccal · mesiobuccal · click a site to record depth (mm)
          </p>
          <p className="text-[10px] tracking-[0.04em] mt-1 min-h-[14px]">
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
                  Now you try — click any site to chart a depth
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
                  Probing depth thresholds: ≤3 healthy · 4–5 caution · 6+ severe
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>

        <aside className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium">
            Hygiene snapshot
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Stat label="Sites recorded" value={`${stats.recorded}/${stats.total}`} />
            <Stat
              label="Need attention"
              value={`${stats.needsAttention}`}
              tone={stats.needsAttention > 0 ? "warn" : "muted"}
            />
            <Stat label="Mean depth" value={`${stats.meanDepth.toFixed(1)} mm`} />
            <Stat
              label="BoP teeth"
              value={`${stats.bopCount}`}
              tone={stats.bopCount > 0 ? "warn" : "muted"}
            />
          </div>

          <div className="grid gap-1 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em]">
            <p>
              Findings flow into the patient chart on save · WhatsApp templated recall queues
              automatically for sites &gt;4mm.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-3">
            <button
              type="button"
              onClick={resetChart}
              className="text-[11px] font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
            >
              ↺ Reset chart
            </button>
            <a
              href="/book-a-demo"
              className="ml-auto inline-flex items-center min-h-[36px] rounded-md bg-[var(--color-ink)] px-3 py-1.5 text-[11px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Chart a real patient → demo
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "muted",
}: {
  label: string;
  value: string;
  tone?: "muted" | "warn";
}) {
  return (
    <div className="rounded-md bg-white border border-[var(--color-border)] p-3 grid gap-0.5">
      <p className="text-[9px] uppercase tracking-[0.12em] text-[var(--color-text-soft)] font-medium">
        {label}
      </p>
      <p
        className="text-lg font-semibold tabular-nums"
        style={{
          color:
            tone === "warn"
              ? "color-mix(in oklch, var(--color-sunset-deep), var(--color-ink) 35%)"
              : "var(--color-text)",
        }}
      >
        {value}
      </p>
    </div>
  );
}
