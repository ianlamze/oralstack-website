import Button from "@/components/primitives/Button";
import MagneticButton from "@/components/primitives/MagneticButton";
import Section from "@/components/primitives/Section";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import { HeroStagger, HeroItem } from "@/components/sections/HeroStagger";

export default function Hero() {
  return (
    <Section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="grid gap-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-16 lg:gap-20 items-start">
        <HeroStagger>
          <HeroItem>
            <p className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-tide-deep)] bg-[color-mix(in_oklch,var(--color-tide),white_88%)] border border-[color-mix(in_oklch,var(--color-tide),transparent_72%)] rounded-full px-3 py-1.5">
              Built in Singapore for clinics across APAC
            </p>
          </HeroItem>
          <HeroItem>
            <h1
              className="mt-5 font-semibold tracking-[-0.025em] leading-[0.94] text-[var(--color-text)] max-w-[28ch]"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
            >
              The operating system for modern dental clinics.
            </h1>
            <p className="mt-3 text-2xl md:text-3xl text-[var(--color-text-muted)] font-normal leading-[1.2] tracking-tight max-w-[34ch]">
              Book, chart, bill, image, message.
            </p>
          </HeroItem>
          <HeroItem>
            <p className="mt-7 text-[17px] md:text-xl text-[var(--color-text-muted)] max-w-[44ch] leading-relaxed">
              Built for the front desk first, with imaging, charting, and patient communication that
              work the way busy clinics actually run.
            </p>
          </HeroItem>
          <HeroItem>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href="/book-a-demo" variant="primary" withArrow>
                Book a 30-min walkthrough
              </MagneticButton>
              <Button href="/workflows" variant="ghost">
                See the workflows
              </Button>
            </div>
          </HeroItem>
        </HeroStagger>
        <HeroStagger className="md:justify-self-end w-full md:pt-2">
          <HeroItem>
            <ScheduleMock />
          </HeroItem>
        </HeroStagger>
      </div>
    </Section>
  );
}
