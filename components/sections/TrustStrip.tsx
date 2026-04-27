import Section from "@/components/primitives/Section";

const pills = [
  "Live at DFI Synergy, Singapore",
  "Tenant-isolated, region-hosted",
  "Audit-logged by default",
  "Singapore PDPA + HIPAA-aware data model",
];

export default function TrustStrip() {
  return (
    <Section className="border-y border-[var(--color-border)] py-5">
      <ul className="flex flex-wrap items-center justify-center gap-2 text-xs">
        {pills.map((p) => (
          <li
            key={p}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-3 py-1.5 tracking-[0.02em] text-[var(--color-text-muted)]"
          >
            {p}
          </li>
        ))}
      </ul>
    </Section>
  );
}
