"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type LineItem = { code: string; name: string; qty: number; price: number };
type PaymentMode = "PayNow" | "Card" | "Cash" | "Bank";

const items: LineItem[] = [
  { code: "DCC107", name: "Filling, composite (16-O)", qty: 1, price: 180 },
  { code: "DCC301", name: "Polish & scale", qty: 1, price: 120 },
  { code: "DCC212", name: "Hygiene assessment", qty: 1, price: 80 },
];

const paymentModes: PaymentMode[] = ["PayNow", "Card", "Cash", "Bank"];

function format(n: number) {
  return `S$${n.toFixed(2)}`;
}

function nowSGT() {
  const fmt = new Intl.DateTimeFormat("en-SG", {
    timeZone: "Asia/Singapore",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return fmt.format(new Date());
}

export default function CheckoutMock() {
  const subTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const tax = +(subTotal * 0.09).toFixed(2);
  const total = +(subTotal + tax).toFixed(2);

  const [selected, setSelected] = useState<PaymentMode | null>(null);
  const [paid, setPaid] = useState<{ mode: PaymentMode; at: string } | null>(null);
  const reduceMotion = useReducedMotion();

  function takePayment() {
    if (!selected || paid) return;
    setPaid({ mode: selected, at: nowSGT() });
  }

  function reset() {
    setSelected(null);
    setPaid(null);
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]">
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Discharge · Invoice INV-0421</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          Devi Krishnan · #1054
        </span>
      </div>

      <ul className="mt-5 grid divide-y divide-[var(--color-border)]">
        {items.map((it) => (
          <li
            key={it.code}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-2.5"
          >
            <span className="text-[10px] font-mono text-[var(--color-text-soft)] tabular-nums">
              {it.code}
            </span>
            <span className="text-sm text-[var(--color-text)] truncate">{it.name}</span>
            <span className="text-sm font-medium text-[var(--color-text)] tabular-nums">
              {format(it.qty * it.price)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 grid gap-1.5 border-t border-[var(--color-border)] pt-3 text-sm">
        <div className="grid grid-cols-[1fr_auto] text-[var(--color-text-muted)]">
          <span>Subtotal</span>
          <span className="tabular-nums">{format(subTotal)}</span>
        </div>
        <div className="grid grid-cols-[1fr_auto] text-[var(--color-text-muted)]">
          <span>GST (9%)</span>
          <span className="tabular-nums">{format(tax)}</span>
        </div>
        <div className="grid grid-cols-[1fr_auto] mt-1 font-semibold text-[var(--color-text)]">
          <span>Total due</span>
          <span className="tabular-nums">{format(total)}</span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-[var(--color-border)] pt-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
          Take payment
        </p>
        <div className="flex flex-wrap gap-1.5">
          {paymentModes.map((m) => {
            const isSelected = selected === m;
            const isDisabled = paid !== null;
            return (
              <button
                key={m}
                type="button"
                onClick={() => !isDisabled && setSelected(m)}
                disabled={isDisabled}
                aria-pressed={isSelected}
                className={`text-[11px] font-medium rounded-md border px-2.5 py-1.5 transition-colors disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)] ${
                  isSelected
                    ? "bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)]"
                    : isDisabled
                      ? "bg-white text-[var(--color-text-soft)] border-[var(--color-border)] opacity-60"
                      : "bg-white text-[var(--color-text-muted)] border-[var(--color-border-strong)] hover:border-[var(--color-ink)] hover:text-[var(--color-text)]"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>

        <div className="grid gap-2 min-h-[44px]">
          <AnimatePresence mode="wait" initial={false}>
            {paid ? (
              <motion.div
                key="paid"
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="grid gap-1"
              >
                <p className="text-[11px] font-medium text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)] tracking-[0.04em]">
                  ✓ Paid · {paid.mode} · {format(total)} · {paid.at} SGT
                </p>
                <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em]">
                  Receipt sent · audit-logged · ledger reconciled in real time
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="justify-self-start text-[10px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline underline-offset-4 decoration-[var(--color-border-strong)] hover:decoration-[var(--color-ink)]"
                >
                  Take another payment
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="pending"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid gap-1.5"
              >
                <button
                  type="button"
                  onClick={takePayment}
                  disabled={!selected}
                  className="justify-self-start inline-flex items-center min-h-[36px] rounded-md bg-[var(--color-ink)] text-[var(--color-canvas)] text-[11px] font-medium px-3 py-1.5 hover:bg-[var(--color-tide-deep)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-tide-deep)]"
                  aria-disabled={!selected}
                >
                  Take {format(total)} →
                </button>
                <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em]">
                  {selected
                    ? `Outstanding ${format(total)} · ${selected} selected · audit-logged on submit`
                    : `Outstanding ${format(total)} · pick a mode · audit-logged on submit`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
