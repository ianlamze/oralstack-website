"use client";

// Legacy-reality counterpart to CaseNoteParseMock — depicts the form-led
// PMS chairside experience Oralstack replaces. Pure CSS, brand tokens
// only. Used in the journey page as the "before" pane on the Chair
// stage.
//
// Design intent: feel claustrophobic — stacked dropdowns, modal-after-modal,
// a separate DICOM desktop app the dentist must alt-tab to, and the
// "now enter the same thing in the invoice" double-entry trap.

const dropdowns = [
  { label: "Tooth", value: "— select —", required: true },
  { label: "Surface", value: "— select —", required: true },
  { label: "Condition", value: "— select —", required: true },
  { label: "Status", value: "active", required: false },
  { label: "Date", value: "today", required: false },
];

export default function BeforeChairMock() {
  return (
    <div
      role="img"
      aria-label="Before-Oralstack charting: a form-led PMS modal with five stacked dropdowns required to log a single finding, a separate DICOM desktop app the dentist alt-tabs to for radiographs, and a sticky note about re-entering the same procedure in the invoice."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-canvas-tinted),white_30%)] p-4 sm:p-5 md:p-6 max-w-[560px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span>Charting · form-led PMS</span>
          <span aria-hidden className="text-[var(--color-text-soft)]">
            ·
          </span>
          <span className="inline-flex items-center gap-1 text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]"
            />
            Before Oralstack
          </span>
        </span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          Demo patient 102 · DEMO-1054
        </span>
      </div>

      {/* Form-led finding modal */}
      <div className="mt-5 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-white p-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            Add finding · modal
          </p>
          <span className="text-[10px] font-mono text-[var(--color-text-soft)]">[ × ]</span>
        </div>
        <ul className="mt-3 grid gap-2">
          {dropdowns.map((d) => (
            <li
              key={d.label}
              className="grid grid-cols-[80px_minmax(0,1fr)_auto] items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-soft)]">
                {d.label}
              </span>
              <span
                className={`rounded-[2px] border border-[var(--color-border-strong)] bg-[var(--color-canvas-tinted)] px-2 py-1.5 text-[12px] font-mono ${
                  d.value.startsWith("—")
                    ? "text-[var(--color-text-soft)] italic"
                    : "text-[var(--color-text)]"
                }`}
              >
                {d.value} ▾
              </span>
              {d.required && (
                <span className="text-[9px] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold">
                  *
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-end gap-2">
          <span className="text-[10px] text-[var(--color-text-soft)] italic">
            ~30 sec per finding · 12 findings this visit
          </span>
          <span className="rounded-[2px] border border-[var(--color-border-strong)] bg-white px-2 py-1 text-[11px] text-[var(--color-text-muted)]">
            Cancel
          </span>
          <span className="rounded-[2px] bg-[var(--color-text-soft)] px-2 py-1 text-[11px] text-white opacity-60">
            Save (disabled)
          </span>
        </div>
      </div>

      {/* DICOM separate-app indicator */}
      <div className="mt-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_92%)] px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="grid gap-0.5 min-w-0">
            <span className="text-[11px] font-medium text-[var(--color-text)]">
              Radiograph · DICOM viewer (separate desktop app)
            </span>
            <span className="text-[10px] text-[var(--color-text-muted)] italic truncate">
              alt-tab to imaging workstation · login again · find patient · open file
            </span>
          </div>
          <span className="text-[10px] tabular-nums text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] font-semibold whitespace-nowrap">
            ~45 sec
          </span>
        </div>
      </div>

      {/* Double-entry sticky note */}
      <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-3 items-start rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-sunset),white_82%)] px-3 py-2.5">
        <span
          aria-hidden
          className="mt-0.5 text-[14px] leading-none text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)]"
        >
          ✎
        </span>
        <div className="grid gap-0.5 min-w-0">
          <span className="text-[12px] font-medium text-[var(--color-text)]">
            Then re-enter in invoice
          </span>
          <span className="text-[11px] text-[var(--color-text-muted)] italic">
            Composite filling 46MOD · Fluoride · Scaling · type each line into the billing module
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-1.5 border-t border-[var(--color-border)] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] gap-3">
          <span>Charting + admin per visit</span>
          <span className="tabular-nums font-medium text-[var(--color-text)]">~12 min</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>Form click overhead</span>
          <span className="tabular-nums">12 findings × 30 sec = 6 min</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[var(--color-text-soft)] gap-3">
          <span>DICOM context switches</span>
          <span className="tabular-nums">3 alt-tabs / visit</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] italic">
        Findings entered through dropdowns · imaging in a parallel desktop · billing keyed a third
        time at discharge
      </p>
    </div>
  );
}
