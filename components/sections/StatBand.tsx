import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/motion/AnimateInView";
import StatGrid from "@/components/ui/StatGrid";
import { homepageStats } from "@/content/homepage-stats";

export default function StatBand() {
  return (
    <Section className="border-y border-[var(--color-border)] bg-[var(--color-canvas-tinted)] py-16 md:py-20">
      <AnimateInView>
        <div className="grid gap-3 mb-10 max-w-[60ch]">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Named pilot evidence
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            The first four weeks at DFI Synergy.
          </h2>
        </div>
      </AnimateInView>
      <AnimateInView delay={0.08}>
        <StatGrid stats={homepageStats} />
      </AnimateInView>
      <p className="mt-6 text-[11px] text-[var(--color-text-soft)] tracking-[0.04em]">
        Historical pilot results from the{" "}
        <a
          href="/customers/dfi-synergy"
          className="font-medium text-[var(--color-tide-deep)] underline underline-offset-4 hover:decoration-2"
        >
          DFI Synergy case study →
        </a>
      </p>
    </Section>
  );
}
