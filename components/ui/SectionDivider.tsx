import Section from "@/components/primitives/Section";
import MarkBullet from "@/components/ui/MarkBullet";

export default function SectionDivider() {
  return (
    <Section className="py-2">
      <div className="relative h-px bg-[var(--color-border)]" aria-hidden>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-canvas)] px-4">
          <MarkBullet size={14} className="opacity-50" />
        </div>
      </div>
    </Section>
  );
}
