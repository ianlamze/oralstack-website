import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import Reason from "@/components/sections/Reason";
import Bullet from "@/components/sections/Bullet";

export const metadata: Metadata = {
  title: "About",
  description:
    "Oralstack is the operating system for modern dental clinics — APAC-first, region-hosted in Singapore, built around the workflows the front desk, clinical team, and clinic owner live in every day.",
  alternates: { canonical: "/about" },
};

type Founder = {
  name: string;
  role: string;
  bio: string;
};

// To populate: fill the entries below. Until at least one is added, the page
// renders a "team coming soon" notice instead of empty cards.
const founders: Founder[] = [
  // {
  //   name: "Jane Doe",
  //   role: "Co-founder & CEO",
  //   bio: "Two-line bio. Background, why dental, what they bring.",
  // },
];

export default function AboutPage() {
  return (
    <main>
      <PageHeader eyebrow="About" title="Built around what dental clinics actually run." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Oralstack is the operating system for modern dental clinics — APAC-first, region-hosted in
          Singapore, designed around the six workflows that the front desk, clinical team, and
          clinic owner live in every day. We&apos;re early — pre-revenue, hands-on with our first
          pilot clinics, and shipping weekly.
        </p>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-14 max-w-[760px]">
          <Reason
            eyebrow="Why we're building this"
            title="The dental clinic stack hasn't kept up with the clinic."
            body="The dominant practice management systems in this region are 20-year-old Windows desktop clients, supplemented by spreadsheets and personal phones. The front desk fights the software; reschedules and recall slip; billing reconciles end-of-day. We're building Oralstack on the premise that clinical work shouldn't have to fight the system around it — and that an APAC-first cloud PMS, built around real clinic workflows, is the version of this category that should exist in 2026."
          />
          <Reason
            eyebrow="What we're optimising for"
            title="Defensible claims, real customers, weekly ships."
            body="Every claim on this site is qualified — a real customer, a real integration, a real compliance fact. We do not say all-in-one or seamless. We deploy continuously to one version that every clinic is on. We're a small team, and the engineer who writes the schedule is also the person on the customer call when it breaks. That's the trade-off you're making with us — and the reason we ship at the pace we do."
          />
          <Reason
            eyebrow="Where we are"
            title="Singapore-first, with one cornerstone clinic live."
            body="We're region-hosted in asia-southeast1 (Singapore), tenant-isolated, and PDPA-aware by design. Our first cornerstone clinic — DFI Synergy, a three-chair Singapore practice — went live on Oralstack in three weeks. The next pilot cohort opens in the v13 imaging release. APAC-first does not mean APAC-only: we'll cross the Pacific when the product warrants it."
          />
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Team
          </p>
          {founders.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {founders.map((f) => (
                <article
                  key={f.name}
                  className="grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6 md:p-7"
                >
                  <h2 className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
                    {f.name}
                  </h2>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                    {f.role}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {f.bio}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] p-6 md:p-8">
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
                Founder bios are being written up. In the meantime, the easiest way to see who
                you&apos;d be working with is to{" "}
                <a
                  href="/book-a-demo"
                  className="text-[var(--color-tide-deep)] underline underline-offset-4"
                >
                  book a 30-minute demo
                </a>{" "}
                — a real engineer is on every call.
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-8 md:p-12 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            How we work
          </p>
          <ul className="grid gap-3 text-[var(--color-text-muted)] leading-relaxed">
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">
                Engineer-led customer calls.
              </span>{" "}
              The person who writes the code is the person on the demo, the onboarding, and the call
              when something breaks.
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Continuous deployment.</span>{" "}
              Every clinic is on the same version every week. No version drift. No held-back
              features per tier.
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">
                Region-hosted, tenant-isolated.
              </span>{" "}
              Singapore region, Postgres row-level security, audit logs by default — see the{" "}
              <a
                href="/security"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                security posture
              </a>
              .
            </Bullet>
            <Bullet>
              <span className="font-medium text-[var(--color-text)]">Defensible claims only.</span>{" "}
              Every workflow on this site replaces a specific tool a real clinic was using. Every
              metric we cite has a source.
            </Bullet>
          </ul>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="max-w-[28ch] text-2xl md:text-3xl font-semibold tracking-tight">
              Want to see how we work in practice?
            </h2>
            <p className="mt-4 max-w-[54ch] text-[var(--color-text-muted)] leading-relaxed">
              A 30-minute demo with a real engineer, on a sample dataset that matches your
              clinic&apos;s shape. We follow up within two working days with a pilot proposal.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="/book-a-demo"
              className="inline-flex items-center min-h-[44px] rounded-[var(--radius-md)] bg-[var(--color-ink)] px-5 py-3 text-sm font-medium text-[var(--color-canvas)] hover:bg-[var(--color-tide-deep)] transition-colors"
            >
              Book a demo →
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
