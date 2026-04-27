import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a 30-minute Oralstack demo for your dental clinic — front desk and clinical workflows, on a sample dataset that mirrors a typical Singapore practice.",
  alternates: { canonical: "/book-a-demo" },
};

const CAL_USER = process.env.NEXT_PUBLIC_CALCOM_USERNAME;
const CAL_EVENT = process.env.NEXT_PUBLIC_CALCOM_EVENT ?? "demo";

export default function BookDemoPage() {
  return (
    <main>
      <PageHeader eyebrow="Demo" title="Book a 30-minute walkthrough." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          We&apos;ll walk the front desk and a clinician through every workflow
          on a sample dataset that mirrors a typical Singapore clinic.
          Scheduling, billing, charting, imaging, recall, owner analytics —
          all of it.
        </p>
      </Section>

      {CAL_USER ? (
        <Section className="pb-24 md:pb-32">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] overflow-hidden bg-white">
            <iframe
              title="Book a demo"
              src={`https://cal.com/${CAL_USER}/${CAL_EVENT}?theme=light`}
              className="block w-full"
              style={{ height: "780px", border: "0" }}
              loading="lazy"
            />
          </div>
        </Section>
      ) : (
        <Section className="pb-24 md:pb-32">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] px-8 py-12 md:px-14 md:py-16 grid gap-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
              Email us
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
              Self-serve booking is being wired up. In the meantime, send us a note.
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-[60ch] leading-relaxed">
              Tell us your clinic name, location, current PMS, and a few times
              that work in the next 10 days. We reply within one working day.
            </p>
            <div className="flex flex-wrap gap-3 mt-2">
              <a
                href="mailto:hello@oralstack.com?subject=Oralstack%20demo&body=Clinic%3A%20%0ALocation%3A%20%0ACurrent%20PMS%3A%20%0AAvailable%20times%3A%20"
                className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
              >
                Email hello@oralstack.com →
              </a>
              <a
                href="/workflows"
                className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-white transition-colors"
              >
                See the workflows first
              </a>
            </div>
          </div>
        </Section>
      )}

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-3 max-w-[820px]">
          <Stat
            eyebrow="Length"
            title="30 minutes"
            body="Tight walkthrough of the workflows your clinic will use most."
          />
          <Stat
            eyebrow="Format"
            title="Live, screen-shared"
            body="A real engineer on the call — not a sales rep."
          />
          <Stat
            eyebrow="Outcome"
            title="A pilot proposal"
            body="Within two working days of the demo, sized to your clinic."
          />
        </div>
      </Section>
    </main>
  );
}

function Stat({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
        {eyebrow}
      </p>
      <p className="text-xl font-semibold tracking-tight text-[var(--color-text)]">
        {title}
      </p>
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
        {body}
      </p>
    </div>
  );
}
