type LineItem = { code: string; name: string; qty: number; price: number };

const items: LineItem[] = [
  { code: "DCC107", name: "Filling, composite (16-O)", qty: 1, price: 180 },
  { code: "DCC301", name: "Polish & scale", qty: 1, price: 120 },
  { code: "DCC212", name: "Hygiene assessment", qty: 1, price: 80 },
];

const paymentModes = ["PayNow", "Card", "Cash", "Bank"] as const;

function format(n: number) {
  return `S$${n.toFixed(2)}`;
}

export default function CheckoutMock() {
  const subTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const tax = +(subTotal * 0.09).toFixed(2);
  const total = +(subTotal + tax).toFixed(2);

  return (
    <div
      role="img"
      aria-label="Illustrative oralstack discharge and billing flow: invoice line items, tax line, total, and payment mode buttons."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[480px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
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
            <span className="text-sm text-[var(--color-text)] truncate">
              {it.name}
            </span>
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
          {paymentModes.map((m, i) => (
            <button
              key={m}
              type="button"
              tabIndex={-1}
              className={`text-[11px] font-medium rounded-md border px-2.5 py-1.5 transition-colors ${
                i === 0
                  ? "bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)]"
                  : "bg-white text-[var(--color-text-muted)] border-[var(--color-border-strong)]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-[var(--color-text-soft)] tracking-[0.04em]">
          Outstanding {format(total)} · audit-logged on submit
        </p>
      </div>
    </div>
  );
}
