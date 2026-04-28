"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertTriangle, Check, HeartPulse, Info, Pill, RotateCcw, ShieldAlert } from "lucide-react";
import { initialPatients } from "@/content/medical-alerts/data";
import type { PatientProfile, Severity } from "@/content/medical-alerts/types";
import { track } from "@/lib/analytics";

type Filter = "all" | Severity | "acknowledged";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "block", label: "Blocking" },
  { id: "warn", label: "Warnings" },
  { id: "info", label: "Info" },
  { id: "acknowledged", label: "Acknowledged" },
];

const SEVERITY_LABEL: Record<Severity, string> = {
  block: "Block",
  warn: "Warn",
  info: "Info",
};

const DEMO_PATIENT_ID = "ma1"; // Hafiz · blocking — best demo opener

export default function MedicalAlerts() {
  const [patients, setPatients] = useState<PatientProfile[]>(initialPatients);
  const [selectedId, setSelectedId] = useState<string>(DEMO_PATIENT_ID);
  const [filter, setFilter] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === "all") return patients;
    if (filter === "acknowledged") return patients.filter((p) => p.acknowledged);
    return patients.filter((p) => p.riskLevel === filter && !p.acknowledged);
  }, [patients, filter]);

  const selected = useMemo(
    () => patients.find((p) => p.id === selectedId) ?? patients[0],
    [patients, selectedId],
  );

  const totals = useMemo(() => {
    const blocking = patients.filter((p) => p.riskLevel === "block" && !p.acknowledged).length;
    const warnings = patients.filter((p) => p.riskLevel === "warn").length;
    const flagged = patients.filter((p) => p.riskLevel !== "info" && !p.acknowledged).length;
    return { blocking, warnings, flagged };
  }, [patients]);

  function selectPatient(id: string) {
    setSelectedId(id);
    track("alerts_patient_opened", { patient_id: id });
  }

  function acknowledge(id: string) {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, acknowledged: true } : p)));
    track("alerts_acknowledged", { patient_id: id });
  }

  function reset() {
    setPatients(initialPatients);
    setSelectedId(DEMO_PATIENT_ID);
    setFilter("all");
    track("alerts_reset");
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Clinical safety · medical alerts</span>
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
          DFI Synergy · upcoming chair
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3 mb-5">
        <Stat
          label="Patients flagged"
          value={`${totals.flagged}`}
          tone={totals.flagged > 0 ? "warning" : "neutral"}
        />
        <Stat
          label="Blocking alerts"
          value={`${totals.blocking}`}
          tone={totals.blocking > 0 ? "danger" : "positive"}
        />
        <Stat label="Warnings" value={`${totals.warnings}`} tone="neutral" />
      </ul>

      <div role="tablist" aria-label="Filter by severity" className="flex flex-wrap gap-1.5 mb-3">
        {FILTERS.map((f) => {
          const isActive = filter === f.id;
          let count = patients.length;
          if (f.id === "block")
            count = patients.filter((p) => p.riskLevel === "block" && !p.acknowledged).length;
          else if (f.id === "warn")
            count = patients.filter((p) => p.riskLevel === "warn" && !p.acknowledged).length;
          else if (f.id === "info")
            count = patients.filter((p) => p.riskLevel === "info" && !p.acknowledged).length;
          else if (f.id === "acknowledged") count = patients.filter((p) => p.acknowledged).length;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                isActive
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-canvas)]"
                  : "border-[var(--color-border-strong)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
              }`}
            >
              {f.label}{" "}
              <span
                className={`tabular-nums ${
                  isActive ? "opacity-80" : "text-[var(--color-text-soft)]"
                }`}
              >
                · {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
        <ul className="divide-y divide-[var(--color-border)] bg-white max-h-[560px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {filtered.map((p) => {
              const isActive = p.id === selectedId;
              return (
                <motion.li
                  key={p.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <button
                    type="button"
                    onClick={() => selectPatient(p.id)}
                    aria-pressed={isActive}
                    className={`w-full text-left px-4 py-3 grid gap-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-tide-deep)] ${
                      isActive
                        ? "bg-[var(--color-canvas-tinted)] border-l-2 border-l-[var(--color-ink)]"
                        : "border-l-2 border-l-transparent hover:bg-[var(--color-canvas-tinted)]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[13px] font-semibold text-[var(--color-text)] truncate">
                        {p.name}
                        <span className="text-[var(--color-text-soft)] font-normal">
                          {" "}
                          · {p.age}
                        </span>
                      </span>
                      {p.acknowledged ? (
                        <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-[0.08em] rounded-full border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)] px-1.5 py-0.5 text-[var(--color-tide-deep)]">
                          <Check className="h-2.5 w-2.5" aria-hidden />
                          Ack
                        </span>
                      ) : (
                        <SeverityPill severity={p.riskLevel} />
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--color-text-muted)] truncate">
                      {p.bookedProcedure}
                    </p>
                    <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">
                      {p.bookedAt}
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-[11px] text-[var(--color-text-soft)]">
              No patients in this view.
            </li>
          )}
        </ul>

        <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 grid gap-4 content-start min-h-[480px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.id}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="grid gap-4 content-start"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
                  Booked · {selected.bookedAt}
                </p>
                <p className="mt-1 text-[16px] font-semibold text-[var(--color-text)]">
                  {selected.name}
                  <span className="text-[var(--color-text-muted)] font-normal">
                    {" "}
                    · age {selected.age}
                  </span>
                </p>
                <p className="text-[12px] text-[var(--color-text-muted)]">
                  {selected.bookedProcedure}
                </p>
              </div>

              <ul className="grid gap-2.5">
                {selected.alerts.map((a) => (
                  <li key={a.title}>
                    <AlertCard
                      severity={a.severity}
                      title={a.title}
                      detail={a.detail}
                      reason={a.reason}
                    />
                  </li>
                ))}
              </ul>

              <div className="grid gap-2 sm:grid-cols-2">
                <RecordCard
                  icon={<ShieldAlert className="h-3 w-3" aria-hidden />}
                  label="Allergies"
                  emptyLabel="No known allergies"
                  items={selected.allergies.map((a) => ({
                    primary: a.agent,
                    secondary: a.reaction,
                  }))}
                />
                <RecordCard
                  icon={<Pill className="h-3 w-3" aria-hidden />}
                  label="Active medications"
                  emptyLabel="None on file"
                  items={selected.medications.map((m) => ({
                    primary: m.name,
                    secondary: [m.reason, m.notes].filter(Boolean).join(" · "),
                  }))}
                />
                <RecordCard
                  icon={<HeartPulse className="h-3 w-3" aria-hidden />}
                  label="Conditions"
                  emptyLabel="None on file"
                  items={selected.conditions.map((c) => ({
                    primary: c.name,
                    secondary: c.detail ?? "",
                  }))}
                />
              </div>

              {selected.riskLevel === "block" && !selected.acknowledged && (
                <button
                  type="button"
                  onClick={() => acknowledge(selected.id)}
                  className="inline-flex items-center justify-center gap-1.5 self-start rounded-[var(--radius-md)] bg-[var(--color-ink)] px-3 py-2 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  <Check className="h-3 w-3" aria-hidden />
                  Acknowledge & proceed with substitute pre-med
                </button>
              )}

              {selected.acknowledged && (
                <div className="rounded-[var(--radius-md)] border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_92%)] px-3 py-2.5 grid gap-1">
                  <p className="text-[11px] font-semibold text-[var(--color-tide-deep)] inline-flex items-center gap-1.5">
                    <Check className="h-3 w-3" aria-hidden />
                    Acknowledged · audit-logged just now
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)] leading-snug">
                    Substitute pre-med written into the chart. Both providers see the override at
                    chair-side.
                  </p>
                </div>
              )}

              {selected.riskLevel === "warn" && (
                <p className="text-[11px] text-[var(--color-text-muted)] leading-snug">
                  Warnings don&apos;t block — they sit on the procedure card and the prescription
                  pad until the clinician confirms the next step.
                </p>
              )}

              {selected.riskLevel === "info" && (
                <p className="text-[11px] text-[var(--color-text-muted)] leading-snug">
                  Info-level notes ride along with the visit so the chair-side team has the right
                  context without a hard stop.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.04em] text-[var(--color-text-soft)]">
          Allergy + planned pre-med → block. Warfarin + extraction → warn with last INR. Latex →
          info note. Every override is audit-logged.
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
          See it on tomorrow&apos;s chair → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Alerts surface on the patient row, the procedure card, and the prescription pad — same
          rules engine, three places it actually matters.
        </p>
      </div>
    </div>
  );
}

function AlertCard({
  severity,
  title,
  detail,
  reason,
}: {
  severity: Severity;
  title: string;
  detail: string;
  reason: string;
}) {
  const tone =
    severity === "block"
      ? {
          bg: "bg-[oklch(0.62_0.18_25/0.06)]",
          border: "border-[oklch(0.62_0.18_25/0.4)]",
          fg: "text-[oklch(0.45_0.18_25)]",
          Icon: ShieldAlert,
        }
      : severity === "warn"
        ? {
            bg: "bg-[oklch(0.95_0.06_75)]",
            border: "border-[oklch(0.78_0.13_75/0.5)]",
            fg: "text-[oklch(0.45_0.13_75)]",
            Icon: AlertTriangle,
          }
        : {
            bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_92%)]",
            border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
            fg: "text-[var(--color-tide-deep)]",
            Icon: Info,
          };
  const Icon = tone.Icon;
  return (
    <div className={`rounded-[var(--radius-md)] border ${tone.bg} ${tone.border} p-3 grid gap-1.5`}>
      <div className="flex items-baseline gap-2">
        <span className={`shrink-0 ${tone.fg}`}>
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </span>
        <p className={`text-[12px] font-semibold ${tone.fg}`}>{title}</p>
      </div>
      <p className="text-[11px] text-[var(--color-text)] leading-snug">{detail}</p>
      <p className="text-[10px] tracking-[0.04em] text-[var(--color-text-soft)]">
        Triggered by: {reason}
      </p>
    </div>
  );
}

function RecordCard({
  icon,
  label,
  emptyLabel,
  items,
}: {
  icon: React.ReactNode;
  label: string;
  emptyLabel: string;
  items: { primary: string; secondary: string }[];
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3 grid gap-1.5">
      <p className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[var(--color-text-soft)] inline-flex items-center gap-1">
        <span aria-hidden className="text-[var(--color-text-soft)]">
          {icon}
        </span>
        {label}
      </p>
      {items.length === 0 ? (
        <p className="text-[11px] text-[var(--color-text-soft)] italic">{emptyLabel}</p>
      ) : (
        <ul className="grid gap-1">
          {items.map((it) => (
            <li
              key={`${label}-${it.primary}`}
              className="grid gap-0.5 border-b border-[var(--color-border)] last:border-b-0 pb-1 last:pb-0"
            >
              <span className="text-[12px] text-[var(--color-text)]">{it.primary}</span>
              {it.secondary && (
                <span className="text-[10px] text-[var(--color-text-soft)]">{it.secondary}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SeverityPill({ severity }: { severity: Severity }) {
  const tone =
    severity === "block"
      ? {
          bg: "bg-[oklch(0.62_0.18_25/0.08)]",
          fg: "text-[oklch(0.45_0.18_25)]",
          border: "border-[oklch(0.62_0.18_25/0.4)]",
          Icon: ShieldAlert,
        }
      : severity === "warn"
        ? {
            bg: "bg-[oklch(0.95_0.06_75)]",
            fg: "text-[oklch(0.45_0.13_75)]",
            border: "border-[oklch(0.78_0.13_75/0.5)]",
            Icon: AlertTriangle,
          }
        : {
            bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_92%)]",
            fg: "text-[var(--color-tide-deep)]",
            border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
            Icon: Info,
          };
  const Icon = tone.Icon;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[9px] uppercase tracking-[0.08em] rounded-full border px-1.5 py-0.5 whitespace-nowrap ${tone.bg} ${tone.fg} ${tone.border}`}
    >
      <Icon className="h-2.5 w-2.5" aria-hidden />
      {SEVERITY_LABEL[severity]}
    </span>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "neutral" | "positive" | "warning" | "danger";
}) {
  const toneClass =
    tone === "positive"
      ? "text-[var(--color-tide-deep)]"
      : tone === "warning"
        ? "text-[oklch(0.45_0.13_75)]"
        : tone === "danger"
          ? "text-[oklch(0.45_0.18_25)]"
          : "text-[var(--color-text)]";
  return (
    <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 grid gap-1">
      <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
        {label}
      </p>
      <p className={`text-[18px] font-semibold tabular-nums ${toneClass}`}>{value}</p>
    </li>
  );
}
