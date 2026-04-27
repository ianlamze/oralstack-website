import Section from "@/components/primitives/Section";

const pills = [
  "Live at DFI Synergy, Singapore",
  "Tenant-isolated, region-hosted",
  "Audit-logged by default",
  "Singapore PDPA + HIPAA-aware data model",
];

export default function TrustStrip() {
  return (
    <Section className="border-y border-[var(--color-border)] py-6">
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[var(--color-text-soft)]">
        {pills.map((p) => (
          <li key={p} className="tracking-[0.02em]">
            {p}
          </li>
        ))}
      </ul>
    </Section>
  );
}
