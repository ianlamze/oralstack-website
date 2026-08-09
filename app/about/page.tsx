import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";
import Reason from "@/components/ui/Reason";
import Bullet from "@/components/ui/Bullet";

export const metadata: Metadata = {
  title: "About",
  description:
    "oralstack is the Plato-connected workflow and clinical operations layer for dental clinics, built in Singapore around reception, patient care, checkout, and clinic management.",
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
      <PageHeader
        eyebrow="About"
        title="Built around what dental clinics actually run."
        variant="display"
      />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          oralstack is the workflow and clinical operations layer for Plato-connected dental
          clinics. It is APAC-first, region-hosted in Singapore, and designed around seven audited
          capability groups spanning reception, patient care, checkout, patient access, clinic
          operations, insights, and organization security.
        </p>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-14 max-w-[760px]">
          <Reason
            eyebrow="Why we're building this"
            title="The dental clinic stack hasn't kept up with the clinic."
            body="Dental clinics often supplement their practice management system with spreadsheets, paper handoffs, and personal phones. The front desk tracks arrivals, clinicians document care, and managers reconcile the day across separate surfaces. We are building oralstack to connect that work around the existing Plato record, not to pretend a reviewed integration is a complete replacement for it."
          />
          <Reason
            eyebrow="What we're optimising for"
            title="Defensible claims and reviewed product boundaries."
            body="We separate what is available now, what requires clinic setup, and what remains behind a controlled rollout gate. The public product story stops at shipped workflows. DICOM, public booking, automated outreach, external clinical AI, direct claims, and online payment rails do not become live claims just because code exists for them."
          />
          <Reason
            eyebrow="Where we are"
            title="Singapore-first, focused on the current app."
            body="The production boundary uses Singapore-region services, tenant-scoped Postgres access, origin checks, encryption requirements, and chained audit evidence. Clinic workflows remain grounded in the Plato connection. Controlled integrations are evaluated separately and are not bundled into the current product promise."
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
              <span className="font-medium text-[var(--color-text)]">
                Reviewed rollout boundaries.
              </span>{" "}
              Shipped workflows, clinic-configured capabilities, and controlled rollouts are
              described separately.
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
              Every current workflow maps to implemented product paths. Disabled integrations and
              prototypes stay labeled as controlled or historical.
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
              clinic&apos;s shape. We follow up with availability and any setup questions needed to
              make the walkthrough useful.
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
