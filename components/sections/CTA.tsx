import MagneticButton from "@/components/primitives/MagneticButton";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/sections/AnimateInView";
import AnimatedMark from "@/components/sections/AnimatedMark";

export default function CTA() {
  return (
    <Section id="contact" className="py-24 md:py-32">
      <AnimateInView>
        <div
          className="relative overflow-hidden rounded-[var(--radius-xl)] px-8 py-14 md:px-14 md:py-20 text-[var(--color-canvas)]"
          style={{ background: "var(--color-ink)" }}
        >
          {/* soft accent backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 90% 10%, color-mix(in oklch, var(--color-tide), transparent 70%) 0%, transparent 55%)",
            }}
          />

          {/* decorative animated mark in corner */}
          <div
            aria-hidden
            className="absolute top-8 right-8 md:top-10 md:right-10 opacity-30"
          >
            <AnimatedMark size={64} delay={0.1} />
          </div>

          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-tide)]">
              Pilot programme
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight max-w-[24ch]">
              Bring Oralstack into your clinic.
            </h2>
            <p className="mt-5 max-w-[54ch] leading-relaxed text-[color-mix(in_oklch,var(--color-canvas),transparent_25%)]">
              We&apos;re working with a small group of dental clinics across
              Singapore and APAC. If you&apos;re considering a switch from
              Plato, Open Dental, or a paper-led workflow, we&apos;d like to
              hear how your front desk runs.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href="/book-a-demo" variant="onDark" withArrow>
                Book a demo
              </MagneticButton>
              <a
                href="mailto:hello@oralstack.com?subject=Oralstack%20pilot"
                className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] border border-[color-mix(in_oklch,var(--color-canvas),transparent_60%)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[color-mix(in_oklch,var(--color-canvas),transparent_88%)] transition-colors"
              >
                Talk to us about a pilot
              </a>
            </div>
          </div>
        </div>
      </AnimateInView>
    </Section>
  );
}
