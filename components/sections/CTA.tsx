import Image from "next/image";
import MagneticButton from "@/components/primitives/MagneticButton";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/motion/AnimateInView";

export default function CTA() {
  return (
    <Section id="contact" className="py-24 md:py-32">
      <AnimateInView>
        <div className="mx-auto grid max-w-5xl gap-10 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar)] px-8 py-12 text-[var(--color-sidebar-foreground)] shadow-[var(--shadow-elevated)] md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <Image
            src="/oralstack-mark.svg"
            alt=""
            width={80}
            height={80}
            className="rounded-[var(--radius-lg)] shadow-[var(--shadow-2)]"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-tide)]">
              Pilot programme
            </p>
            <h2 className="mt-4 max-w-[24ch] text-3xl font-semibold tracking-tight md:text-4xl">
              Bring the Oralstack workspace into your clinic.
            </h2>
            <p className="mt-5 max-w-[58ch] leading-relaxed text-[color-mix(in_srgb,var(--color-sidebar-foreground)_74%,transparent)]">
              We&apos;re working with a small group of dental clinics across Singapore and APAC. If
              you&apos;re considering a Plato-connected workflow layer or moving paper-led
              operations into a reviewed workspace, we&apos;d like to hear how your clinic day runs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="/book-a-demo" variant="onDark" withArrow>
                Request a demo
              </MagneticButton>
              <a
                href="mailto:hello@oralstack.com?subject=Oralstack%20pilot"
                className="inline-flex min-h-[44px] items-center rounded-[var(--radius-md)] border border-[var(--color-sidebar-border)] px-5 py-3 text-sm font-semibold text-[var(--color-sidebar-foreground)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-sidebar-foreground)_8%,transparent)]"
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
