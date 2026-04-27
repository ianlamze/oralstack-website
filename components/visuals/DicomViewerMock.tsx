import { Hand, Maximize2, PenLine, RotateCw, Ruler, ZoomIn } from "lucide-react";

const tools = [
  { icon: Hand, label: "Pan" },
  { icon: ZoomIn, label: "Zoom" },
  { icon: RotateCw, label: "Rotate" },
  { icon: Ruler, label: "Measure", active: true },
  { icon: PenLine, label: "Annotate" },
  { icon: Maximize2, label: "Full" },
];

export default function DicomViewerMock() {
  return (
    <div
      role="img"
      aria-label="Illustrative oralstack DICOM viewer: a bitewing radiograph for Devi Krishnan with a pan/zoom/rotate/measure toolbar and a measurement line drawn between two contact points."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[520px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>DICOM viewer · Bitewing</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right">
          Devi Krishnan · 22 Apr 2026
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:gap-4">
        <div
          aria-hidden
          className="aspect-[5/4] rounded-md overflow-hidden relative border border-[var(--color-border)]"
          style={{
            background: "radial-gradient(circle at 45% 50%, #2c3344 0%, #14182b 55%, #060a14 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-75"
            style={{
              background:
                "radial-gradient(ellipse at 32% 48%, rgba(228,218,200,0.42) 0%, rgba(228,218,200,0) 28%), radial-gradient(ellipse at 50% 52%, rgba(228,218,200,0.35) 0%, rgba(228,218,200,0) 28%), radial-gradient(ellipse at 68% 50%, rgba(228,218,200,0.40) 0%, rgba(228,218,200,0) 30%), radial-gradient(ellipse at 50% 30%, rgba(228,218,200,0.18) 0%, rgba(228,218,200,0) 35%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 70%, rgba(255,255,255,0.06) 100%)",
            }}
          />

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 80"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line
              x1="32"
              y1="42"
              x2="62"
              y2="42"
              stroke="#F2A669"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
            <line x1="32" y1="40" x2="32" y2="44" stroke="#F2A669" strokeWidth="0.6" />
            <line x1="62" y1="40" x2="62" y2="44" stroke="#F2A669" strokeWidth="0.6" />
            <text
              x="47"
              y="38.5"
              fill="#F2A669"
              fontSize="3.2"
              fontFamily="ui-monospace, Menlo, monospace"
              textAnchor="middle"
            >
              4.2 mm
            </text>
          </svg>

          <div className="absolute top-2 left-2 text-[9px] font-mono text-[#cfd5e2]/70 tracking-widest">
            16 / 17
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#cfd5e2]/70 tabular-nums">
            kV 70 · mAs 7
          </div>
        </div>

        <aside className="grid gap-1.5 self-start">
          {tools.map((t, i) => {
            const Icon = t.icon;
            return (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                aria-label={t.label}
                className={`h-9 w-9 inline-flex items-center justify-center rounded-md border transition-colors ${
                  t.active
                    ? "bg-[var(--color-ink)] text-[var(--color-canvas)] border-[var(--color-ink)]"
                    : "bg-white text-[var(--color-text-muted)] border-[var(--color-border)]"
                }`}
              >
                <Icon className="size-4" />
              </button>
            );
          })}
        </aside>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-x-4 gap-y-2 text-[11px]">
        <div className="grid gap-0.5">
          <dt className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            Modality
          </dt>
          <dd className="text-[var(--color-text)] font-medium">Bitewing</dd>
        </div>
        <div className="grid gap-0.5">
          <dt className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            Region
          </dt>
          <dd className="text-[var(--color-text)] font-medium">16–17 distal</dd>
        </div>
        <div className="grid gap-0.5">
          <dt className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
            Annotation
          </dt>
          <dd className="text-[var(--color-text)] font-medium tabular-nums">4.2 mm</dd>
        </div>
      </dl>

      <p className="mt-4 text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] border-t border-[var(--color-border)] pt-3">
        DICOM C-STORE · in-chart viewer · annotations write back to the visit
      </p>
    </div>
  );
}
