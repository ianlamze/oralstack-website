"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { comparisons } from "@/content/comparisons";
import type { Comparison } from "@/content/comparisons/types";

const MAX_SELECTED = 3;

type Canonical = {
  key: string;
  label: string;
  matchers: string[];
};

const CANONICAL: Canonical[] = [
  {
    key: "deployment",
    label: "Deployment",
    matchers: ["Deployment", "Hosting", "Product family"],
  },
  {
    key: "schedule",
    label: "Schedule UX",
    matchers: ["Schedule UX", "UX", "Schedule & front desk"],
  },
  { key: "find-slot", label: "Find next available slot", matchers: ["Find next available slot"] },
  { key: "self-booking", label: "Patient self-booking", matchers: ["Patient self-booking"] },
  { key: "charting", label: "Charting", matchers: ["Charting"] },
  { key: "billing", label: "Billing", matchers: ["Billing", "US insurance billing"] },
  {
    key: "imaging",
    label: "Imaging",
    matchers: ["Imaging", "Imaging integration", "Sensor lock-in"],
  },
  {
    key: "multi-location",
    label: "Multi-clinic",
    matchers: ["Multi-clinic", "Multi-location", "Multi-location / DSO"],
  },
  {
    key: "hosting-residency",
    label: "Hosting & data residency",
    matchers: ["Hosting & data residency", "Hosting"],
  },
  {
    key: "pricing",
    label: "Pricing",
    matchers: ["Pricing", "Pricing model", "License & cost"],
  },
  { key: "apac", label: "APAC fit", matchers: ["APAC presence", "APAC fit", "APAC compliance"] },
];

function findRow(c: Comparison, matchers: string[]) {
  for (const m of matchers) {
    const r = c.rows.find((row) => row.capability === m);
    if (r) return r;
  }
  return null;
}

export default function PmsComparisonPicker() {
  const [selected, setSelected] = useState<string[]>(["plato"]);

  function toggle(slug: string) {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_SELECTED) return prev;
      return [...prev, slug];
    });
  }

  const selectedComparisons = useMemo(
    () =>
      selected
        .map((slug) => comparisons.find((c) => c.slug === slug))
        .filter(Boolean) as Comparison[],
    [selected],
  );

  const visibleRows = useMemo(() => {
    return CANONICAL.map((canon) => {
      const cells = selectedComparisons.map((c) => findRow(c, canon.matchers));
      const oralstackCell = cells.find((r) => r !== null)?.us ?? null;
      const allEmpty = cells.every((r) => r === null);
      return { canon, cells, oralstackCell, allEmpty };
    }).filter((r) => !r.allEmpty);
  }, [selectedComparisons]);

  return (
    <div className="grid gap-7">
      <div>
        <p className="text-sm font-medium text-[var(--color-text)]">
          Pick the systems you&apos;re comparing.
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          Up to {MAX_SELECTED}. Each selection adds a column to the table.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {comparisons.map((c) => {
            const isSelected = selected.includes(c.slug);
            const disabled = !isSelected && selected.length >= MAX_SELECTED;
            return (
              <button
                type="button"
                key={c.slug}
                onClick={() => toggle(c.slug)}
                disabled={disabled}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  isSelected
                    ? "border-[var(--color-tide-deep)] bg-[var(--color-tide-deep)] text-white"
                    : disabled
                      ? "border-[var(--color-border)] bg-[var(--color-canvas-tinted)] text-[var(--color-text-soft)] cursor-not-allowed"
                      : "border-[var(--color-border-strong)] bg-white text-[var(--color-text)] hover:border-[var(--color-text-soft)]"
                }`}
              >
                {isSelected && <Check className="size-3.5" aria-hidden />}
                <span>{c.competitor}</span>
                {isSelected && <X className="size-3" aria-hidden />}
              </button>
            );
          })}
        </div>
      </div>

      {selectedComparisons.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] p-10 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Pick at least one system to start the comparison.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]">
          <div
            className="hidden md:grid gap-4 px-5 py-4 bg-[var(--color-canvas-tinted)] border-b border-[var(--color-border)]"
            style={{
              gridTemplateColumns: `minmax(0,1fr) ${selectedComparisons
                .map(() => "minmax(0,1.4fr)")
                .join(" ")} minmax(0,1.4fr)`,
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Capability
            </p>
            {selectedComparisons.map((c) => (
              <p
                key={c.slug}
                className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]"
              >
                {c.competitor}
              </p>
            ))}
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
              Oralstack
            </p>
          </div>

          <ul className="divide-y divide-[var(--color-border)]">
            {visibleRows.map(({ canon, cells, oralstackCell }) => (
              <li
                key={canon.key}
                className="grid gap-3 px-5 py-4 md:gap-4 md:py-5"
                style={{
                  gridTemplateColumns: `minmax(0,1fr) ${selectedComparisons
                    .map(() => "minmax(0,1.4fr)")
                    .join(" ")} minmax(0,1.4fr)`,
                }}
              >
                <p className="text-sm font-semibold text-[var(--color-text)]">{canon.label}</p>
                {cells.map((cell, i) => {
                  const c = selectedComparisons[i];
                  return (
                    <div
                      key={c.slug}
                      className="text-sm leading-relaxed text-[var(--color-text-muted)]"
                    >
                      <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] md:hidden">
                        {c.competitor}
                      </span>
                      {cell ? cell.them : <span className="text-[var(--color-text-soft)]">—</span>}
                    </div>
                  );
                })}
                <div className="text-sm leading-relaxed text-[var(--color-text)] md:rounded-[var(--radius-md)] md:bg-[var(--color-canvas-tinted)] md:px-4 md:py-3 md:-my-1">
                  <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-[var(--color-tide-deep)] md:hidden">
                    Oralstack
                  </span>
                  {oralstackCell ?? <span className="text-[var(--color-text-soft)]">—</span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedComparisons.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-5 md:p-6">
          <div className="grid gap-1">
            <p className="text-sm font-medium text-[var(--color-text)]">Want the full reasoning?</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Each PMS has a long-form page with where they&apos;re the right call too.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {selectedComparisons.map((c) => (
              <a
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-3 py-2 text-xs font-medium text-[var(--color-text)] hover:border-[var(--color-text-soft)] transition-colors"
              >
                vs {c.competitor} <ArrowRight className="size-3" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
