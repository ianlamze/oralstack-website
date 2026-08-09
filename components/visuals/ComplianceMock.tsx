import { ArrowRight, ShieldCheck } from "lucide-react";

// Static audit-chain mock for the Compliance workflow on /workflows.
// Walks left → right through cycle → tray → patient. The interactive
// version with spore-fail handling lives at /tools/sterilization.

export default function ComplianceMock() {
  return (
    <div
      role="img"
      aria-label="Illustrative Oralstack audit chain: autoclave cycle 042-A linked to Tray B (Hygiene), used on Demo patient 104 for a polish and scale at 10:30."
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4 sm:p-5 md:p-6 max-w-[560px] shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]"
    >
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[var(--color-text-soft)] gap-3">
        <span>Audit chain · sterilisation</span>
        <span className="text-[var(--color-text-muted)] normal-case tracking-normal text-right tabular-nums">
          ISO 17665
        </span>
      </div>

      <ol className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch">
        <li>
          <ChainCard
            eyebrow="Cycle"
            title="042-A"
            line1="09:15 · Class B · 134°C"
            line2="18 min · 3 bar"
            badge={
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.08em] rounded-full border border-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_15%)] bg-[color-mix(in_oklch,var(--color-tide-deep),white_88%)] px-1.5 py-0.5 text-[var(--color-tide-deep)] whitespace-nowrap">
                <ShieldCheck className="h-2.5 w-2.5" aria-hidden />
                Spore pass
              </span>
            }
          />
        </li>
        <li className="hidden sm:grid place-items-center">
          <ChainArrow />
        </li>
        <li>
          <ChainCard eyebrow="Tray" title="Tray B" line1="Hygiene" line2="Unwrapped 10:25" />
        </li>
        <li className="hidden sm:grid place-items-center">
          <ChainArrow />
        </li>
        <li>
          <ChainCard
            eyebrow="Patient"
            title="Demo patient 104"
            line1="Polish & scale"
            line2="Used 10:30"
          />
        </li>
      </ol>

      <div className="mt-5 grid gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-3">
        <p className="text-[11px] text-[var(--color-text)] leading-snug">
          From any patient, jump to the cycle that processed their tray. From any failed cycle,
          surface every patient at risk — with a templated WhatsApp recall ready in seconds.
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] text-[var(--color-text-soft)] tracking-[0.04em] border-t border-[var(--color-border)] pt-3 gap-3">
        <span>Cycle data via printer or USB exporter · class B and type N supported</span>
        <span className="font-medium text-[var(--color-text-muted)] whitespace-nowrap">
          Audit-grade
        </span>
      </div>
    </div>
  );
}

function ChainCard({
  eyebrow,
  title,
  line1,
  line2,
  badge,
}: {
  eyebrow: string;
  title: string;
  line1: string;
  line2: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white p-3 grid gap-1 content-start">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] font-semibold">
          {eyebrow}
        </span>
        {badge}
      </div>
      <p className="text-[13px] font-semibold text-[var(--color-text)] tabular-nums">{title}</p>
      <p className="text-[11px] text-[var(--color-text-muted)]">{line1}</p>
      <p className="text-[10px] tabular-nums text-[var(--color-text-soft)]">{line2}</p>
    </div>
  );
}

function ChainArrow() {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center text-[var(--color-text-soft)]"
    >
      <ArrowRight className="h-3.5 w-3.5" />
    </span>
  );
}
