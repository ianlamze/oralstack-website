import Image from "next/image";
import MagneticButton from "@/components/primitives/MagneticButton";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/motion/AnimateInView";

export default function CTA() {
  return (
    <Section id="contact" className="py-16 md:py-20">
      <AnimateInView>
        <div className="mx-auto grid max-w-5xl gap-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar)] px-8 py-10 text-[var(--color-sidebar-foreground)] shadow-[var(--shadow-elevated)] md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:px-12 md:py-12">
          <Image
            src="/oralstack-mark.svg"
            alt=""
            width={64}
            height={64}
            className="rounded-[var(--radius-md)] shadow-[var(--shadow-2)]"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-tide)]">
              Guided standalone setup
            </p>
            <h2 className="mt-3 max-w-[28ch] text-3xl font-semibold tracking-tight md:text-4xl">
              Bring your clinic day into Oralstack.
            </h2>
            <p className="mt-4 max-w-[58ch] leading-relaxed text-[color-mix(in_srgb,var(--color-sidebar-foreground)_74%,transparent)]">
              Book a focused walkthrough. We will map your appointments, patient records, checkout
              and clinic operations before proposing a scoped standalone pilot.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton href="/book-a-demo" variant="onDark" withArrow>
                Book a clinic walkthrough
              </MagneticButton>
              <a
                href="/contact/?intent=pilot#request"
                className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-sidebar-border)] px-5 py-3 text-sm font-semibold text-[var(--color-sidebar-foreground)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-sidebar-foreground)_8%,transparent)]"
              >
                Request a standalone pilot
              </a>
            </div>
          </div>
        </div>
      </AnimateInView>
    </Section>
  );
}
