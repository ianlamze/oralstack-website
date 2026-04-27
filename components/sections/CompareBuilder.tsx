"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  capabilities,
  competitors,
  defaultCapabilityIds,
  type CapabilityId,
  type CompetitorId,
} from "@/content/comparison-matrix";

type ChipProps = {
  active: boolean;
  onToggle: () => void;
  label: string;
  rationale?: string;
};

function CapabilityChip({ active, onToggle, label, rationale }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`text-left grid gap-0.5 rounded-md border px-3 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
        active
          ? "border-[var(--color-ink)] bg-[var(--color-canvas-tinted)]"
          : "border-[var(--color-border)] bg-white hover:border-[var(--color-border-strong)]"
      }`}
    >
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border ${
            active
              ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-[var(--color-canvas)]"
              : "border-[var(--color-border-strong)] bg-white"
          }`}
        >
          {active ? <span className="text-[10px] leading-none">✓</span> : null}
        </span>
        <span className="text-[13px] font-medium text-[var(--color-text)]">{label}</span>
      </span>
      {rationale ? (
        <span className="text-[11px] text-[var(--color-text-soft)] leading-snug pl-[22px]">
          {rationale}
        </span>
      ) : null}
    </button>
  );
}

function CompetitorChip({
  active,
  onToggle,
  label,
}: {
  active: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
        active
          ? "bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)]"
          : "bg-white text-[var(--color-text-muted)] border-[var(--color-border-strong)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
      }`}
    >
      <span
        aria-hidden
        className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border ${
          active
            ? "bg-[var(--color-canvas)] border-[var(--color-canvas)] text-[var(--color-ink)]"
            : "border-[var(--color-border-strong)] bg-white"
        }`}
      >
        {active ? <span className="text-[10px] leading-none">✓</span> : null}
      </span>
      <span className="text-[12px] font-medium">{label}</span>
    </button>
  );
}

export default function CompareBuilder() {
  const [selectedCaps, setSelectedCaps] = useState<Set<CapabilityId>>(
    () => new Set(defaultCapabilityIds),
  );
  const [selectedComps, setSelectedComps] = useState<Set<CompetitorId>>(
    () => new Set(competitors.map((c) => c.id)),
  );
  const reduceMotion = useReducedMotion();

  function toggleCap(id: CapabilityId) {
    setSelectedCaps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleComp(id: CompetitorId) {
    setSelectedComps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const visibleCaps = useMemo(
    () => capabilities.filter((c) => selectedCaps.has(c.id)),
    [selectedCaps],
  );
  const visibleComps = useMemo(
    () => competitors.filter((c) => selectedComps.has(c.id)),
    [selectedComps],
  );

  const hasResult = visibleCaps.length > 0 && visibleComps.length > 0;

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-10 items-start">
        <fieldset className="grid gap-3 border-0 p-0 m-0">
          <legend className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-soft)] font-medium mb-1">
            What matters to your clinic?
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {capabilities.map((c) => (
              <CapabilityChip
                key={c.id}
                active={selectedCaps.has(c.id)}
                onToggle={() => toggleCap(c.id)}
                label={c.label}
                rationale={c.rationale}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="grid gap-3 border-0 p-0 m-0">
          <legend className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-soft)] font-medium mb-1">
            Compare against
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {competitors.map((c) => (
              <CompetitorChip
                key={c.id}
                active={selectedComps.has(c.id)}
                onToggle={() => toggleComp(c.id)}
                label={c.label}
              />
            ))}
          </div>
          <p className="text-[11px] text-[var(--color-text-soft)] leading-relaxed mt-2">
            {visibleCaps.length} capabilit{visibleCaps.length === 1 ? "y" : "ies"} ·{" "}
            {visibleComps.length} competitor{visibleComps.length === 1 ? "" : "s"} selected
          </p>
        </fieldset>
      </div>

      {!hasResult ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] p-8 text-center text-sm text-[var(--color-text-muted)]">
          {visibleCaps.length === 0
            ? "Tick at least one capability above to build a comparison."
            : "Pick at least one competitor to compare against."}
        </div>
      ) : (
        <motion.div
          layout={!reduceMotion}
          transition={{ layout: { duration: 0.2 } }}
          className="grid gap-6"
        >
          <div className="hidden md:block overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--color-canvas-tinted)] text-left">
                  <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)] border-b border-[var(--color-border)] min-w-[180px]">
                    Capability
                  </th>
                  <th className="px-4 py-3 text-[11px] font-semibold tracking-tight text-[var(--color-text)] border-b border-[var(--color-border)] min-w-[200px]">
                    Oralstack
                  </th>
                  {visibleComps.map((comp) => (
                    <th
                      key={comp.id}
                      className="px-4 py-3 text-[11px] font-semibold tracking-tight text-[var(--color-text-muted)] border-b border-l border-[var(--color-border)] min-w-[200px]"
                    >
                      {comp.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleCaps.map((cap, i) => (
                  <tr
                    key={cap.id}
                    className={
                      i % 2 === 1
                        ? "bg-[color-mix(in_oklch,var(--color-canvas-tinted),white_50%)]"
                        : ""
                    }
                  >
                    <td className="px-4 py-3 align-top text-[12px] font-medium text-[var(--color-text)] border-b border-[var(--color-border)]">
                      {cap.label}
                    </td>
                    <td className="px-4 py-3 align-top text-[12px] leading-snug text-[var(--color-text)] border-b border-[var(--color-border)]">
                      {cap.oralstack}
                    </td>
                    {visibleComps.map((comp) => (
                      <td
                        key={comp.id}
                        className="px-4 py-3 align-top text-[12px] leading-snug text-[var(--color-text-muted)] border-b border-l border-[var(--color-border)]"
                      >
                        {cap.competitors[comp.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / narrow view: stacked cards per capability */}
          <ul className="grid gap-4 md:hidden">
            {visibleCaps.map((cap) => (
              <li
                key={cap.id}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-medium mb-2">
                  {cap.label}
                </p>
                <div className="grid gap-2 text-[12px] leading-snug">
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">Oralstack</p>
                    <p className="text-[var(--color-text-muted)]">{cap.oralstack}</p>
                  </div>
                  {visibleComps.map((comp) => (
                    <div key={comp.id}>
                      <p className="font-semibold text-[var(--color-text)]">{comp.label}</p>
                      <p className="text-[var(--color-text-muted)]">{cap.competitors[comp.id]}</p>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          Walk through these on your data →
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Want the full breakdown for one vendor? See the{" "}
          {competitors.map((c, i, arr) => (
            <span key={c.id}>
              <a
                href={`/compare/${c.id}`}
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                {c.label}
              </a>
              {i < arr.length - 2 ? ", " : i === arr.length - 2 ? ", or " : " "}
            </span>
          ))}
          page.
        </p>
      </div>
    </div>
  );
}
