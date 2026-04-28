"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Crown, MessageCircle, Sparkles, Stethoscope } from "lucide-react";
import { initialProviders, periods } from "@/content/provider-productivity/data";
import type { Period, Provider, ProviderRole } from "@/content/provider-productivity/types";
import { track } from "@/lib/analytics";

const DEMO_PROVIDER_ID = "pr2"; // Dr Lim · associate — most demoable opening view

const ROLE_LABEL: Record<ProviderRole, string> = {
  owner: "Owner",
  associate: "Associate",
  hygienist: "Hygienist",
};

function fmtSgd(n: number) {
  return `SGD ${n.toLocaleString("en-SG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function pct(part: number, whole: number) {
  if (whole === 0) return 0;
  return Math.round((part / whole) * 100);
}

function scaleProvider(p: Provider, scale: number): Provider {
  return {
    ...p,
    productionSgd: Math.round(p.productionSgd * scale),
    collectionSgd: Math.round(p.collectionSgd * scale),
    commissionSgd: Math.round(p.commissionSgd * scale),
    hours: Math.round(p.hours * scale),
    procedureMix: p.procedureMix.map((m) => ({
      ...m,
      productionSgd: Math.round(m.productionSgd * scale),
    })),
    recallCredits: p.recallCredits?.map((c) => ({
      ...c,
      productionSgd: Math.round(c.productionSgd * scale),
    })),
  };
}

export default function ProviderProductivity() {
  const [selectedId, setSelectedId] = useState<string>(DEMO_PROVIDER_ID);
  const [periodId, setPeriodId] = useState<Period["id"]>("mtd");
  const reduceMotion = useReducedMotion();

  const period = periods.find((p) => p.id === periodId) ?? periods[1];

  const providers = useMemo(
    () => initialProviders.map((p) => scaleProvider(p, period.scale)),
    [period],
  );

  const totals = useMemo(() => {
    const totalProduction = providers.reduce((s, p) => s + p.productionSgd, 0);
    const ownerProduction = providers
      .filter((p) => p.role === "owner")
      .reduce((s, p) => s + p.productionSgd, 0);
    const associateProduction = totalProduction - ownerProduction;
    const totalCommission = providers.reduce((s, p) => s + p.commissionSgd, 0);
    return { totalProduction, ownerProduction, associateProduction, totalCommission };
  }, [providers]);

  const selected = providers.find((p) => p.id === selectedId) ?? providers[0];

  function selectProvider(id: string) {
    setSelectedId(id);
    track("provider_opened", { provider_id: id });
  }

  function selectPeriod(id: Period["id"]) {
    setPeriodId(id);
    track("provider_period_changed", { period: id });
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Provider productivity · associate-level</span>
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
          DFI Synergy · {period.daysLabel}
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3 mb-5">
        <Stat label="Total production" value={fmtSgd(totals.totalProduction)} />
        <Stat
          label="Owner / associate split"
          value={`${pct(totals.ownerProduction, totals.totalProduction)}% · ${pct(
            totals.associateProduction,
            totals.totalProduction,
          )}%`}
          sublabel={`${fmtSgd(totals.ownerProduction)} · ${fmtSgd(totals.associateProduction)}`}
        />
        <Stat label="Commission paid out" value={fmtSgd(totals.totalCommission)} tone="positive" />
      </ul>

      <div role="tablist" aria-label="Period" className="flex flex-wrap gap-1.5 mb-3">
        {periods.map((p) => {
          const isActive = periodId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectPeriod(p.id)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                isActive
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-canvas)]"
                  : "border-[var(--color-border-strong)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
              }`}
            >
              {p.label}{" "}
              <span
                className={`tabular-nums ${
                  isActive ? "opacity-80" : "text-[var(--color-text-soft)]"
                }`}
              >
                · {p.daysLabel}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
        <ul className="divide-y divide-[var(--color-border)] bg-white">
          {providers.map((p) => {
            const isActive = p.id === selectedId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => selectProvider(p.id)}
                  aria-pressed={isActive}
                  className={`w-full text-left px-4 py-3 grid gap-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-tide-deep)] ${
                    isActive
                      ? "bg-[var(--color-canvas-tinted)] border-l-2 border-l-[var(--color-ink)]"
                      : "border-l-2 border-l-transparent hover:bg-[var(--color-canvas-tinted)]"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-semibold text-[var(--color-text)] inline-flex items-center gap-1.5">
                      <RoleIcon role={p.role} />
                      {p.name}
                    </span>
                    <RolePill role={p.role} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <Mini label="Production" value={fmtSgd(p.productionSgd)} />
                    <Mini label="Hours" value={`${p.hours}h`} />
                    <Mini
                      label={p.role === "owner" ? "Owner" : "Commission"}
                      value={p.role === "owner" ? "draws" : fmtSgd(p.commissionSgd)}
                      tone={p.role === "owner" ? "soft" : "positive"}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 grid gap-4 content-start min-h-[480px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${selected.id}-${periodId}`}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="grid gap-4 content-start"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
                  {ROLE_LABEL[selected.role]} · {period.label}
                </p>
                <p className="mt-1 text-[16px] font-semibold text-[var(--color-text)]">
                  {selected.name}
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] leading-snug mt-1">
                  {selected.ruleDescription}
                </p>
              </div>

              <dl className="grid gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3">
                <DetailRow label="Production" value={fmtSgd(selected.productionSgd)} />
                <DetailRow label="Collection" value={fmtSgd(selected.collectionSgd)} />
                <DetailRow label="Hours" value={`${selected.hours}h`} />
                <DetailRow
                  label={selected.role === "owner" ? "Draws" : "Commission"}
                  value={selected.role === "owner" ? "—" : fmtSgd(selected.commissionSgd)}
                  emphasis={selected.role !== "owner"}
                />
              </dl>

              <ProcedureMix mix={selected.procedureMix} />

              {selected.recallCredits && selected.recallCredits.length > 0 && (
                <RecallCredits provider={selected} />
              )}
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      <p className="text-[10px] tracking-[0.04em] mt-3 text-[var(--color-text-soft)]">
        Every commission line traces back to the rule above. Disputes settle on the screen, not on
        payday.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your associates&apos; numbers → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Built for the multi-clinic owner who wants the same view their associate sees · pairs with
          the management report for the clinic-level picture.
        </p>
      </div>
    </div>
  );
}

function ProcedureMix({ mix }: { mix: Provider["procedureMix"] }) {
  const total = mix.reduce((s, m) => s + m.productionSgd, 0);
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3 grid gap-2">
      <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)] font-semibold">
        Procedure mix
      </p>
      <ul className="grid gap-1.5">
        {mix.map((m) => {
          const widthPct = total === 0 ? 0 : Math.round((m.productionSgd / total) * 100);
          return (
            <li key={m.category} className="grid gap-0.5">
              <div className="flex items-baseline justify-between gap-2 text-[11px]">
                <span className="text-[var(--color-text)]">{m.category}</span>
                <span className="tabular-nums text-[var(--color-text-muted)]">
                  {fmtSgd(m.productionSgd)} · {widthPct}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--color-canvas-tinted)] overflow-hidden">
                <div
                  className="h-full bg-[var(--color-ink)] transition-[width] duration-300"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RecallCredits({ provider }: { provider: Provider }) {
  const credits = provider.recallCredits ?? [];
  const total = credits.reduce((s, c) => s + c.productionSgd, 0);
  return (
    <div className="rounded-[var(--radius-md)] border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_92%)] p-3 grid gap-2">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <p className="text-[11px] font-semibold text-[var(--color-tide-deep)] inline-flex items-center gap-1.5">
          <MessageCircle className="h-3 w-3" aria-hidden />
          Recall conversions credited
        </p>
        <p className="text-[10px] tabular-nums text-[var(--color-text-muted)]">
          {credits.length} procedures · {fmtSgd(total)}
        </p>
      </div>
      <ul className="grid gap-1">
        {credits.map((c) => (
          <li
            key={`${provider.id}-${c.patientName}-${c.procedure}`}
            className="grid grid-cols-[1fr_auto] gap-2 items-baseline border-b border-[var(--color-border)] last:border-b-0 pb-1.5 last:pb-0"
          >
            <span className="grid gap-0.5 min-w-0">
              <span className="text-[12px] text-[var(--color-text)] truncate">{c.patientName}</span>
              <span className="text-[10px] text-[var(--color-text-soft)] truncate">
                {c.procedure}
              </span>
            </span>
            <span className="text-[12px] font-semibold tabular-nums text-[var(--color-tide-deep)]">
              + {fmtSgd(c.productionSgd)}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[10px] text-[var(--color-text-muted)] leading-snug">
        15% of recall-driven production credited back. The recall reminder thread is linked on each
        line — clickable in the live product.
      </p>
    </div>
  );
}

function RoleIcon({ role }: { role: ProviderRole }) {
  const Icon = role === "owner" ? Crown : role === "associate" ? Stethoscope : Sparkles;
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center h-4 w-4 text-[var(--color-text-soft)]"
    >
      <Icon className="h-3 w-3" />
    </span>
  );
}

function RolePill({ role }: { role: ProviderRole }) {
  const tone =
    role === "owner"
      ? {
          bg: "bg-[var(--color-canvas-tinted)]",
          fg: "text-[var(--color-text-muted)]",
          border: "border-[var(--color-border)]",
        }
      : role === "associate"
        ? {
            bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
            fg: "text-[var(--color-tide-deep)]",
            border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
          }
        : {
            bg: "bg-[oklch(0.95_0.06_75)]",
            fg: "text-[oklch(0.45_0.13_75)]",
            border: "border-[oklch(0.78_0.13_75/0.5)]",
          };
  return (
    <span
      className={`inline-flex items-center text-[9px] uppercase tracking-[0.08em] rounded-full border px-1.5 py-0.5 whitespace-nowrap ${tone.bg} ${tone.fg} ${tone.border}`}
    >
      {ROLE_LABEL[role]}
    </span>
  );
}

function Stat({
  label,
  value,
  sublabel,
  tone,
}: {
  label: string;
  value: string;
  sublabel?: string;
  tone?: "positive";
}) {
  return (
    <li className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-3 grid gap-1">
      <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
        {label}
      </p>
      <p
        className={`text-[18px] font-semibold tabular-nums ${
          tone === "positive" ? "text-[var(--color-tide-deep)]" : "text-[var(--color-text)]"
        }`}
      >
        {value}
      </p>
      {sublabel && (
        <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">{sublabel}</p>
      )}
    </li>
  );
}

function Mini({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "positive" | "soft";
}) {
  const valueClass =
    tone === "positive"
      ? "text-[var(--color-tide-deep)]"
      : tone === "soft"
        ? "text-[var(--color-text-soft)]"
        : "text-[var(--color-text)]";
  return (
    <span className="grid gap-0.5">
      <span className="text-[9px] uppercase tracking-[0.08em] font-semibold text-[var(--color-text-soft)]">
        {label}
      </span>
      <span className={`text-[11px] tabular-nums font-semibold ${valueClass}`}>{value}</span>
    </span>
  );
}

function DetailRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-2 items-baseline">
      <dt className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)] font-semibold">
        {label}
      </dt>
      <dd
        className={`text-[12px] tabular-nums ${
          emphasis ? "font-semibold text-[var(--color-tide-deep)]" : "text-[var(--color-text)]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
