"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  AlertTriangle,
  Check,
  Clock,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  ShieldQuestion,
  TriangleAlert,
} from "lucide-react";
import { initialLoads } from "@/content/sterilization/data";
import type { AutoclaveLoad, SporeStatus } from "@/content/sterilization/types";
import { track } from "@/lib/analytics";

const DEMO_LOAD_ID = "lo2"; // pending — best for the demo

const STATUS_LABEL: Record<SporeStatus, string> = {
  pass: "Spore pass",
  pending: "Spore pending",
  fail: "Spore fail",
};

export default function SterilizationTracking() {
  const [loads, setLoads] = useState<AutoclaveLoad[]>(initialLoads);
  const [selectedId, setSelectedId] = useState<string>(DEMO_LOAD_ID);
  const [notified, setNotified] = useState(false);
  const reduceMotion = useReducedMotion();

  const selected = useMemo(
    () => loads.find((l) => l.id === selectedId) ?? loads[0],
    [loads, selectedId],
  );

  const totals = useMemo(() => {
    const passes = loads.filter((l) => l.sporeStatus === "pass").length;
    const pending = loads.filter((l) => l.sporeStatus === "pending").length;
    const fails = loads.filter((l) => l.sporeStatus === "fail").length;
    const linkedPatients = loads.reduce(
      (sum, l) => sum + l.trays.filter((t) => t.patientName).length,
      0,
    );
    return { passes, pending, fails, linkedPatients };
  }, [loads]);

  const recallPatients = useMemo(
    () =>
      loads
        .filter((l) => l.sporeStatus === "fail")
        .flatMap((l) => l.trays.filter((t) => t.patientName)),
    [loads],
  );

  function selectLoad(id: string) {
    setSelectedId(id);
    track("sterilization_load_opened", { load_id: id });
  }

  function markSpore(id: string, status: SporeStatus) {
    setLoads((prev) => prev.map((l) => (l.id === id ? { ...l, sporeStatus: status } : l)));
    setNotified(false);
    track("sterilization_spore_marked", { load_id: id, status });
  }

  function notifyRecall() {
    setNotified(true);
    track("sterilization_recall_notified", { count: recallPatients.length });
  }

  function reset() {
    setLoads(initialLoads);
    setSelectedId(DEMO_LOAD_ID);
    setNotified(false);
    track("sterilization_reset");
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Sterilisation · ISO 17665 audit chain</span>
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
          DFI Synergy · 28 Apr
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3 mb-5">
        <Stat label="Loads today" value={`${loads.length}`} tone="neutral" />
        <Stat
          label="Spore tests"
          value={`${totals.passes} pass · ${totals.pending} pending · ${totals.fails} fail`}
          tone={totals.fails > 0 ? "warning" : totals.pending > 0 ? "neutral" : "positive"}
        />
        <Stat label="Patients linked" value={`${totals.linkedPatients}`} tone="neutral" />
      </ul>

      <ul className="grid gap-3 sm:grid-cols-3 mb-5">
        {loads.map((l) => {
          const isActive = l.id === selectedId;
          return (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => selectLoad(l.id)}
                aria-pressed={isActive}
                className={`w-full text-left rounded-[var(--radius-md)] border bg-white px-4 py-3 grid gap-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                  isActive
                    ? "border-[var(--color-ink)] shadow-[0_0_0_1px_var(--color-ink)_inset]"
                    : l.sporeStatus === "fail"
                      ? "border-[oklch(0.62_0.18_25)]"
                      : "border-[var(--color-border-strong)] hover:border-[var(--color-ink)]"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold text-[var(--color-text)]">
                    Cycle {l.cycleId}
                  </span>
                  <SporePill status={l.sporeStatus} />
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  {l.startedAt} · {l.cycleType}
                </p>
                <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">
                  {l.trays.length} trays · {l.durationMin} min · {l.pressureBar} bar
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selected.id}
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 grid gap-4"
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
                Cycle {selected.cycleId} · {selected.startedAt}
              </p>
              <p className="mt-1 text-[14px] font-semibold text-[var(--color-text)]">
                {selected.cycleType} · {selected.durationMin} min · {selected.pressureBar} bar
              </p>
            </div>
            <SporePill status={selected.sporeStatus} large />
          </div>

          <ul className="grid gap-2">
            {selected.trays.map((t) => (
              <li
                key={t.id}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-3 py-2 grid gap-0.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] font-semibold text-[var(--color-text)]">
                    {t.name}
                  </span>
                  {t.patientName ? (
                    <span className="text-[11px] text-[var(--color-text)]">
                      {t.patientName}
                      <span className="text-[var(--color-text-soft)]"> · {t.procedure}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-[var(--color-text-soft)]">
                      In sterile storage
                    </span>
                  )}
                </div>
                {t.usedAt && (
                  <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">
                    Used at {t.usedAt}
                  </p>
                )}
              </li>
            ))}
          </ul>

          {selected.sporeStatus === "pending" && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--color-border)]">
              <p className="text-[11px] text-[var(--color-text-muted)] mr-auto">
                Spore test result:
              </p>
              <button
                type="button"
                onClick={() => markSpore(selected.id, "pass")}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white px-3 py-1.5 text-[11px] font-medium text-[var(--color-text)] hover:border-[var(--color-ink)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
              >
                <ShieldCheck className="h-3 w-3" aria-hidden /> Mark pass
              </button>
              <button
                type="button"
                onClick={() => markSpore(selected.id, "fail")}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[oklch(0.62_0.18_25/0.4)] bg-white px-3 py-1.5 text-[11px] font-medium text-[oklch(0.45_0.18_25)] hover:border-[oklch(0.55_0.18_25)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
              >
                <TriangleAlert className="h-3 w-3" aria-hidden /> Mark fail
              </button>
            </div>
          )}

          {selected.sporeStatus === "pass" && (
            <p className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-tide-deep)]">
              <Check className="h-3 w-3" aria-hidden /> Cycle cleared. Audit entry written.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {recallPatients.length > 0 && (
          <motion.div
            key="recall"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-4 rounded-[var(--radius-lg)] border border-[oklch(0.62_0.18_25/0.4)] bg-[oklch(0.62_0.18_25/0.06)] p-5 grid gap-3"
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <p className="text-[12px] font-semibold text-[oklch(0.45_0.18_25)] inline-flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> Recall list ·{" "}
                {recallPatients.length} {recallPatients.length === 1 ? "patient" : "patients"}
              </p>
              <p className="text-[10px] text-[var(--color-text-muted)] tracking-[0.04em]">
                Every tray from the failed load · auto-flagged
              </p>
            </div>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {recallPatients.map((t) => (
                <li
                  key={t.id}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-3 py-2 grid gap-0.5"
                >
                  <span className="text-[12px] font-semibold text-[var(--color-text)]">
                    {t.patientName}
                  </span>
                  <span className="text-[10px] text-[var(--color-text-soft)]">
                    {t.procedure} · {t.name} · {t.usedAt}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              {!notified ? (
                <button
                  type="button"
                  onClick={notifyRecall}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-3 py-2 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  <MessageCircle className="h-3 w-3" aria-hidden /> Notify all on WhatsApp
                </button>
              ) : (
                <p className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-tide-deep)]">
                  <Check className="h-3 w-3" aria-hidden /> Sent · {recallPatients.length} templated
                  WhatsApp messages dispatched, audit-logged.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.04em] text-[var(--color-text-soft)]">
          Cycle → tray → patient. Spore fail → recall list ready in seconds.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <RotateCcw className="h-3 w-3" aria-hidden /> Reset
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your autoclave logs → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Audit-grade chain · ISO 17665, MOH-friendly · works with class B vacuum and type N gravity
          autoclaves; cycle data via printer or USB exporter.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "neutral" | "positive" | "warning";
}) {
  const toneClass =
    tone === "positive"
      ? "text-[var(--color-tide-deep)]"
      : tone === "warning"
        ? "text-[oklch(0.55_0.18_25)]"
        : "text-[var(--color-text)]";
  return (
    <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 grid gap-1">
      <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
        {label}
      </p>
      <p className={`text-[16px] font-semibold tabular-nums ${toneClass}`}>{value}</p>
    </li>
  );
}

function SporePill({ status, large = false }: { status: SporeStatus; large?: boolean }) {
  const Icon = status === "pass" ? ShieldCheck : status === "pending" ? Clock : ShieldQuestion;
  const tone =
    status === "pass"
      ? {
          bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
          fg: "text-[var(--color-tide-deep)]",
          border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
        }
      : status === "pending"
        ? {
            bg: "bg-[oklch(0.95_0.06_75)]",
            fg: "text-[oklch(0.45_0.13_75)]",
            border: "border-[oklch(0.78_0.13_75/0.5)]",
          }
        : {
            bg: "bg-[oklch(0.62_0.18_25/0.08)]",
            fg: "text-[oklch(0.45_0.18_25)]",
            border: "border-[oklch(0.62_0.18_25/0.4)]",
          };
  const sizeClass = large ? "text-[10px] px-2 py-1 gap-1" : "text-[9px] px-1.5 py-0.5 gap-0.5";
  return (
    <span
      className={`inline-flex items-center uppercase tracking-[0.08em] rounded-full border whitespace-nowrap ${tone.bg} ${tone.fg} ${tone.border} ${sizeClass}`}
    >
      <Icon className={large ? "h-3 w-3" : "h-2.5 w-2.5"} aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
}
