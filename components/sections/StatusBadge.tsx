import type { IntegrationStatus } from "@/content/integrations";

const styles: Record<IntegrationStatus, string> = {
  Live: "bg-[color-mix(in_oklch,var(--color-sea),white_70%)] text-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_55%)] border-[color-mix(in_oklch,var(--color-sea),var(--color-ink)_30%)]",
  Beta: "bg-[color-mix(in_oklch,var(--color-sunset),white_72%)] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_45%)] border-[color-mix(in_oklch,var(--color-sunset),var(--color-ink)_30%)]",
  Roadmap:
    "bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)] border-[var(--color-border-strong)]",
};

export default function StatusBadge({ status }: { status: IntegrationStatus }) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-medium uppercase tracking-[0.14em] rounded-full border px-2 py-0.5 whitespace-nowrap ${styles[status]}`}
    >
      {status}
    </span>
  );
}
