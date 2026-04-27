import Section from "@/components/primitives/Section";
import AnimatedMark from "@/components/sections/AnimatedMark";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  showMark?: boolean;
};

export default function PageHeader({
  eyebrow,
  title,
  lastUpdated,
  showMark = true,
}: PageHeaderProps) {
  return (
    <Section className="pt-16 md:pt-24 pb-8">
      <div className="max-w-[820px]">
        {showMark && <AnimatedMark size={32} className="mb-7" />}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-4 text-sm text-[var(--color-text-soft)]">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    </Section>
  );
}
