import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/motion/AnimateInView";
import { customers } from "@/content/customers";

export default function CustomerStoryStrip() {
  const featured = customers.find((c) => c.caseStudySlug);
  if (!featured) return null;

  return (
    <Section className="py-20 md:py-24">
      <AnimateInView>
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white px-8 py-12 md:px-14 md:py-16 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Customer story
            </p>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              {featured.name} moved their front desk into Oralstack in three days.
            </h2>
            <p className="mt-4 text-[var(--color-text-muted)] max-w-[52ch] leading-relaxed">
              {featured.blurb}
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href={`/customers/${featured.caseStudySlug}`}
              className="inline-flex items-center gap-2 min-h-[44px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-canvas-tinted)] transition-colors"
            >
              Read the {featured.name} case study →
            </a>
          </div>
        </div>
      </AnimateInView>
    </Section>
  );
}
