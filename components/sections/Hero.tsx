import Button from "@/components/primitives/Button";
import MagneticButton from "@/components/primitives/MagneticButton";
import Section from "@/components/primitives/Section";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import BrandMotif from "@/components/visuals/BrandMotif";
import { HeroStagger, HeroItem } from "@/components/sections/HeroStagger";

export default function Hero() {
  return (
    <Section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      {/* Layered backdrop: BrandMotif as the brand-anchored signal,
          plus the existing radial glows for ambient depth. */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[140%] opacity-[0.32]">
          <BrandMotif tone="tide" intensity={0.42} aspect="wide" className="w-full h-[520px]" />
        </div>
        <div
          className="absolute right-[-5%] top-[8%] w-[55%] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklch, var(--color-tide), transparent 82%) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute left-[-15%] bottom-[-10%] w-[45%] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklch, var(--color-ink), transparent 92%) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="grid gap-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-16 lg:gap-20 items-center">
        <HeroStagger>
          <HeroItem>
            <p className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-tide-deep)] bg-[color-mix(in_oklch,var(--color-tide),white_88%)] border border-[color-mix(in_oklch,var(--color-tide),transparent_72%)] rounded-full px-3 py-1.5">
              Built in Singapore for clinics across APAC
            </p>
          </HeroItem>
          <HeroItem>
            <h1
              className="mt-5 font-semibold tracking-[-0.02em] leading-[0.96] text-balance text-[var(--color-text)] max-w-[18ch]"
              style={{ fontSize: "var(--text-display)" }}
            >
              The operating system for modern dental clinics.
            </h1>
            <p
              className="mt-5 text-[var(--color-text-muted)] font-normal leading-[1.15] tracking-tight max-w-[28ch]"
              style={{ fontSize: "var(--text-display-sm)" }}
            >
              Book, chart, bill, image, message.
            </p>
          </HeroItem>
          <HeroItem>
            <p className="mt-8 text-base md:text-lg text-[var(--color-text-muted)] max-w-[44ch] leading-relaxed">
              Built for the front desk first, with imaging, charting, and patient communication that
              work the way busy clinics actually run.
            </p>
          </HeroItem>
          <HeroItem>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton href="/book-a-demo" variant="primary" withArrow>
                Book a 30-min walkthrough
              </MagneticButton>
              <Button href="/workflows" variant="ghost">
                See the workflows
              </Button>
            </div>
          </HeroItem>
        </HeroStagger>
        <HeroStagger className="md:justify-self-end w-full">
          <HeroItem>
            <ScheduleMock />
          </HeroItem>
        </HeroStagger>
      </div>
    </Section>
  );
}
