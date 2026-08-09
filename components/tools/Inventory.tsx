"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ArrowRight, Check, type LucideIcon, RotateCcw, Truck } from "lucide-react";
import { initialItems, todaysDeductions } from "@/content/inventory/data";
import type { InventoryItem, InventoryStatus } from "@/content/inventory/types";
import { track } from "@/lib/analytics";

type Filter = "all" | InventoryStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "below_par", label: "Below par" },
  { id: "low", label: "Low" },
  { id: "ok", label: "OK" },
  { id: "ordered", label: "Ordered" },
];

const STATUS_LABEL: Record<InventoryStatus, string> = {
  ok: "OK",
  low: "Low",
  below_par: "Below par",
  ordered: "Ordered",
};

const DEMO_ITEM_ID = "iv1";

function fmtSgd(n: number) {
  return `SGD ${n.toLocaleString("en-SG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [selectedId, setSelectedId] = useState<string | null>(DEMO_ITEM_ID);
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter],
  );
  const selected = useMemo(
    () => items.find((i) => i.id === selectedId) ?? null,
    [items, selectedId],
  );

  const totals = useMemo(() => {
    const belowPar = items.filter((i) => i.status === "below_par").length;
    const draftOrderValue = items
      .filter((i) => i.status === "below_par" || i.status === "low")
      .reduce((sum, i) => sum + i.unitCostSgd * i.reorderQty, 0);
    const deductedUnits = todaysDeductions.reduce(
      (sum, d) => sum + d.itemsDeducted.reduce((a, b) => a + b.qty, 0),
      0,
    );
    return { belowPar, draftOrderValue, deductedUnits };
  }, [items]);

  function selectItem(id: string) {
    setSelectedId(id);
    track("inventory_item_opened", { item_id: id });
  }

  function reorderItem(id: string) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "ordered" as InventoryStatus, reorderEta: "Thu 1 May" } : i,
      ),
    );
    track("inventory_reorder_clicked", { item_id: id });
  }

  function reset() {
    setItems(initialItems);
    setSelectedId(DEMO_ITEM_ID);
    setFilter("all");
    track("inventory_reset");
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3 mb-5">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Inventory · auto-deduct on procedure</span>
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
          Sample Dental Clinic · 8 SKUs tracked
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3 mb-5">
        <Stat
          label="Below par"
          value={`${totals.belowPar} ${totals.belowPar === 1 ? "item" : "items"}`}
          tone={totals.belowPar > 0 ? "warning" : "neutral"}
        />
        <Stat label="Draft reorder" value={fmtSgd(totals.draftOrderValue)} tone="neutral" />
        <Stat label="Auto-deducted today" value={`${totals.deductedUnits} units`} tone="positive" />
      </ul>

      <div role="tablist" aria-label="Filter by status" className="flex flex-wrap gap-1.5 mb-3">
        {FILTERS.map((f) => {
          const isActive = filter === f.id;
          const count =
            f.id === "all" ? items.length : items.filter((i) => i.status === f.id).length;
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

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
        <ul className="divide-y divide-[var(--color-border)] bg-white max-h-[480px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {filtered.map((i) => {
              const isActive = i.id === selectedId;
              return (
                <motion.li
                  key={i.id}
                  layout
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <button
                    type="button"
                    onClick={() => selectItem(i.id)}
                    aria-pressed={isActive}
                    className={`w-full text-left px-4 py-3 grid gap-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-tide-deep)] ${
                      isActive
                        ? "bg-[var(--color-canvas-tinted)] border-l-2 border-l-[var(--color-ink)]"
                        : "border-l-2 border-l-transparent hover:bg-[var(--color-canvas-tinted)]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[13px] font-semibold text-[var(--color-text)] truncate">
                        {i.name}
                      </span>
                      <StatusPill status={i.status} />
                    </div>
                    <div className="flex items-center gap-3">
                      <ParBar item={i} />
                      <span className="text-[10px] tabular-nums text-[var(--color-text-soft)] whitespace-nowrap">
                        {i.stock} / {i.parTarget} {i.unit}
                      </span>
                    </div>
                    <p className="text-[10px] text-[var(--color-text-soft)] truncate">
                      {i.category} · {i.vendor}
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-[11px] text-[var(--color-text-soft)]">
              No items in this view.
            </li>
          )}
        </ul>

        <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 grid gap-3 content-start min-h-[320px]">
          {selected ? (
            <>
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)]">
                  Item detail
                </p>
                <p className="mt-1 text-[14px] font-semibold text-[var(--color-text)]">
                  {selected.name}
                </p>
                <p className="text-[12px] text-[var(--color-text-muted)]">
                  {selected.category} · {selected.vendor}
                </p>
              </div>

              <dl className="grid gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3">
                <DetailRow
                  label="Stock"
                  value={`${selected.stock} ${selected.unit}${selected.stock === 1 ? "" : "s"}`}
                />
                <DetailRow
                  label="Par"
                  value={`min ${selected.parMin} · target ${selected.parTarget}`}
                />
                <DetailRow label="Unit cost" value={fmtSgd(selected.unitCostSgd)} />
                <DetailRow
                  label="Reorder"
                  value={`${selected.reorderQty} ${selected.unit}s · ${fmtSgd(
                    selected.unitCostSgd * selected.reorderQty,
                  )}`}
                />
              </dl>

              <Sparkline values={selected.weeklyUsage} />

              {selected.status === "ordered" && selected.reorderEta && (
                <p className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-tide-deep)]">
                  <Truck className="h-3 w-3" aria-hidden /> Ordered · ETA {selected.reorderEta}.
                </p>
              )}

              {(selected.status === "below_par" || selected.status === "low") && (
                <button
                  type="button"
                  onClick={() => reorderItem(selected.id)}
                  className="inline-flex items-center justify-center gap-1.5 self-start rounded-[var(--radius-md)] bg-[var(--color-ink)] px-3 py-2 text-[12px] font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                >
                  Auto-reorder {selected.reorderQty} {selected.unit}s{" "}
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </button>
              )}

              {selected.status === "ok" && (
                <p className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                  <Check className="h-3 w-3 text-[var(--color-tide-deep)]" aria-hidden /> Above par
                  · no action.
                </p>
              )}
            </>
          ) : (
            <p className="text-[12px] text-[var(--color-text-muted)]">
              Click an item to see par, usage, and reorder.
            </p>
          )}
        </aside>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.04em] text-[var(--color-text-soft)]">
          Procedure done → consumables auto-deducted → stock drops below par → reorder drafted.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <RotateCcw className="h-3 w-3" aria-hidden /> Reset stock
        </button>
      </div>

      <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-4">
        <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-[var(--color-text-soft)] mb-3">
          Today&apos;s auto-deductions
        </p>
        <ul className="grid gap-2.5">
          {todaysDeductions.map((d) => (
            <li
              key={d.id}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 grid gap-1"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] font-semibold text-[var(--color-text)]">
                  {d.time} · {d.patientName}
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)]">{d.procedure}</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-soft)]">
                {d.itemsDeducted.map((it, idx) => (
                  <span key={`${d.id}-${it.name}`}>
                    {idx > 0 && " · "}
                    <span className="text-[var(--color-text-muted)]">−{it.qty}</span> {it.name}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--color-border)] pt-5">
        <a
          href="/book-a-demo"
          className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
        >
          See it on your stockroom → demo
        </a>
        <p className="text-[11px] text-[var(--color-text-soft)] leading-snug max-w-[44ch]">
          Procedure templates own the deduction recipe. Change a procedure&apos;s consumables once —
          every future use deducts the new bill of materials.
        </p>
      </div>
    </div>
  );
}

function ParBar({ item }: { item: InventoryItem }) {
  const pct = Math.min(100, Math.round((item.stock / item.parTarget) * 100));
  const tone =
    item.status === "below_par"
      ? "bg-[oklch(0.62_0.18_25)]"
      : item.status === "low"
        ? "bg-[oklch(0.78_0.13_75)]"
        : item.status === "ordered"
          ? "bg-[var(--color-tide-deep)]"
          : "bg-[var(--color-ink)]";
  return (
    <div className="relative flex-1 h-1.5 rounded-full bg-[var(--color-canvas-tinted)] overflow-hidden">
      <div
        className={`h-full ${tone} transition-[width] duration-300`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3 grid gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)] font-semibold">
          Last 7 days · units used
        </p>
        <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">
          total {values.reduce((a, b) => a + b, 0)}
        </p>
      </div>
      <div className="flex items-end gap-1 h-9">
        {values.map((v, i) => {
          const h = Math.max(6, Math.round((v / max) * 32));
          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: bars are positional days
              key={i}
              aria-hidden
              style={{ height: `${h}px` }}
              className="flex-1 rounded-sm bg-[var(--color-ink)]"
            />
          );
        })}
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
      <p className={`text-[18px] font-semibold tabular-nums ${toneClass}`}>{value}</p>
    </li>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-2 items-baseline">
      <dt className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-soft)] font-semibold">
        {label}
      </dt>
      <dd className="text-[12px] tabular-nums text-[var(--color-text)]">{value}</dd>
    </div>
  );
}

function StatusPill({ status }: { status: InventoryStatus }) {
  const map: Record<
    InventoryStatus,
    { bg: string; fg: string; border: string; Icon?: LucideIcon }
  > = {
    ok: {
      bg: "bg-[var(--color-canvas-tinted)]",
      fg: "text-[var(--color-text-muted)]",
      border: "border-[var(--color-border)]",
    },
    low: {
      bg: "bg-[oklch(0.95_0.06_75)]",
      fg: "text-[oklch(0.45_0.13_75)]",
      border: "border-[oklch(0.78_0.13_75/0.5)]",
    },
    below_par: {
      bg: "bg-[oklch(0.62_0.18_25/0.08)]",
      fg: "text-[oklch(0.45_0.18_25)]",
      border: "border-[oklch(0.62_0.18_25/0.4)]",
      Icon: AlertTriangle,
    },
    ordered: {
      bg: "bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)]",
      fg: "text-[var(--color-tide-deep)]",
      border: "border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)]",
      Icon: Truck,
    },
  };
  const t = map[status];
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[9px] uppercase tracking-[0.08em] rounded-full border px-1.5 py-0.5 whitespace-nowrap ${t.bg} ${t.fg} ${t.border}`}
    >
      {t.Icon && <t.Icon className="h-2.5 w-2.5" aria-hidden />}
      {STATUS_LABEL[status]}
    </span>
  );
}
