import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/sections/AnimateInView";
import MarkBullet from "@/components/sections/MarkBullet";

export const metadata: Metadata = {
  title: "Oralstack vs Eaglesoft",
  description:
    "An honest, side-by-side comparison of Oralstack and Eaglesoft — deployment, billing model, multi-clinic support, integrations, APAC fit, and where each is the right call.",
  alternates: { canonical: "/compare/eaglesoft" },
};

type Row = { capability: string; them: string; us: string };

const rows: Row[] = [
  {
    capability: "Deployment",
    them: "Windows desktop client per workstation, with Patterson-managed cloud backup options. Server-based deployment for multi-station clinics.",
    us: "Cloud-native, browser-based on any device. One product, one version, region-hosted in Singapore.",
  },
  {
    capability: "Schedule UX",
    them: "Mature scheduling with appointment book, family scheduling, and recall integration. Form-based at its core.",
    us: "Drag-driven. Reschedule in three seconds; commits are timezone-correct on reload; provider columns render dynamically.",
  },
  {
    capability: "Billing",
    them: "Strong US insurance workflow — eClaims, EOB import, fee schedules, ledger reconciliation. ANSI 837/835 native.",
    us: "Discharge-flow billing for APAC fee-for-service. Treatment lines pull from the chart automatically; Singapore GST and insurance models built in.",
  },
  {
    capability: "Charting",
    them: "Tooth charting, perio, structured procedure codes. Tied tightly to billing through Patterson's data model.",
    us: "FDI charting with surface-specific notes (M/D/B/L/O) and per-procedure templates editable per visit. Direct write-back to billing.",
  },
  {
    capability: "Imaging",
    them: "Patterson Imaging integration is the primary path. Sensor support strongest with Patterson-distributed brands.",
    us: "DICOM viewer in the patient chart, native. Sensor-bridge integration across Carestream, Dexis, Sopro, Schick — sensor-brand neutral.",
  },
  {
    capability: "Multi-location",
    them: "Multi-location support requires Eaglesoft Anywhere or custom configurations. Often a separate licence path.",
    us: "Tenant-isolated SaaS by default. Multi-clinic owners see all locations under one login.",
  },
  {
    capability: "Sales & support",
    them: "Sold and supported through Patterson Dental rep network. Implementation typically goes through your local Patterson office.",
    us: "Direct-to-clinic. The engineer building the product is on the demo and onboarding call.",
  },
  {
    capability: "Hosting & data residency",
    them: "On-prem; data sits on the clinic's server. Cloud backup is opt-in and US-region.",
    us: "Singapore region (asia-southeast1) on Google Cloud. Tenant-isolated, audit-logged, PDPA-aware by design.",
  },
  {
    capability: "Updates",
    them: "Manual or rep-assisted upgrades. Different clinics often run different Eaglesoft versions for months.",
    us: "Continuous deployment. Every clinic is on the same version every week.",
  },
  {
    capability: "Pricing",
    them: "Premium, sold via Patterson reps with maintenance and support tiers. Bundled with hardware in some deals.",
    us: "Flat $200 / clinic / month during pilot. No per-seat charges, no bundling, no rep markup.",
  },
  {
    capability: "APAC presence",
    them: "Limited. Patterson Dental's footprint is heavily US/Canada.",
    us: "APAC-first. Singapore-region hosting, PDPA-aware, GST-aware billing, WhatsApp Business API for recall.",
  },
];

export default function CompareEaglesoftPage() {
  return (
    <main>
      <PageHeader eyebrow="Compare" title="Oralstack vs Eaglesoft." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Eaglesoft is Patterson Dental&apos;s practice management system —
          mature, US-rooted, and a strong fit for clinics already inside the
          Patterson supply-chain. Oralstack is built for APAC dental practices
          that want region-hosted data, direct-to-clinic support, and pricing
          that doesn&apos;t scale with seat count. Here&apos;s what differs,
          line by line.
        </p>
      </Section>

      <Section className="pb-16">
        <AnimateInView>
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]">
            <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1.5fr)] md:gap-6 px-6 py-4 bg-[var(--color-canvas-tinted)] border-b border-[var(--color-border)]">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                Capability
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                Eaglesoft
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-tide-deep)]">
                Oralstack
              </p>
            </div>

            <ul className="divide-y divide-[var(--color-border)]">
              {rows.map(({ capability, them, us }) => (
                <li
                  key={capability}
                  className="grid gap-3 px-6 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1.5fr)] md:gap-6"
                >
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    {capability}
                  </p>
                  <div className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-soft)] md:hidden">
                      Eaglesoft
                    </span>
                    {them}
                  </div>
                  <div className="text-sm leading-relaxed text-[var(--color-text)] md:rounded-[var(--radius-md)] md:bg-[var(--color-canvas-tinted)] md:px-4 md:py-3 md:-my-1">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-[var(--color-tide-deep)] md:hidden">
                      Oralstack
                    </span>
                    {us}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </AnimateInView>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-12 md:gap-14 max-w-[760px]">
          <Reason
            eyebrow="Why we built differently · 1"
            title="Direct-to-clinic beats rep-mediated sales."
            body="Eaglesoft is sold through Patterson Dental reps. That works when the rep is good — they handle the install, the training, the upgrades. It also adds a layer between the clinic and the engineering team. With Oralstack, the engineer who wrote the schedule is the person on your demo, and the person on the support call when you find the edge case at 4pm on a Tuesday."
          />
          <Reason
            eyebrow="Why we built differently · 2"
            title="Sensor-brand neutral beats vendor-locked imaging."
            body="Eaglesoft's imaging path is strongest with Patterson-distributed sensors. If you bought your sensors from someone else, integration is workable but second-class. Oralstack integrates with the four common sensor families equally — Carestream, Dexis, Sopro, Schick — through a single sensor-bridge model. Bring whatever sensors you have."
          />
          <Reason
            eyebrow="Why we built differently · 3"
            title="Region-hosted SaaS beats on-prem with optional cloud backup."
            body="Eaglesoft's data lives on a Windows server at the clinic. Cloud backup is opt-in and US-region. For Singapore PDPA — which expects continuous protection of patient records — that's a workable but careful arrangement. Oralstack is region-hosted in Singapore by default, tenant-isolated, audit-logged. Compliance is the model, not a configuration."
          />
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-8 md:p-12 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Where Eaglesoft is the right call
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[32ch]">
            We&apos;re not the right answer for every clinic.
          </h2>
          <ul className="grid gap-3 text-[var(--color-text-muted)] leading-relaxed">
            <Bullet>
              If you&apos;re a US practice with deep US-payer billing
              requirements, Eaglesoft&apos;s eClaims and EOB workflows are
              purpose-built. We are not.
            </Bullet>
            <Bullet>
              If your supply chain runs through Patterson Dental and the rep
              relationship is part of how your clinic operates, Eaglesoft fits
              that workflow naturally.
            </Bullet>
            <Bullet>
              If you want a vendor with three decades of US dental-market
              presence and an established certified-consultant network,
              Eaglesoft has both at scale we don&apos;t.
            </Bullet>
          </ul>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] px-8 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="max-w-[28ch] text-2xl md:text-3xl font-semibold tracking-tight">
              See it on your clinic&apos;s data.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[var(--color-text-muted)] leading-relaxed">
              A 30-minute walkthrough on a sample dataset matched to your
              clinic&apos;s shape, with a real engineer on the call and a
              pilot proposal within two working days.
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

function Reason({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="grid gap-3">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
        {eyebrow}
      </p>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight leading-[1.15] max-w-[34ch]">
        {title}
      </h2>
      <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-[58ch]">
        {body}
      </p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <MarkBullet size={12} className="mt-1.5 opacity-90" />
      <span>{children}</span>
    </li>
  );
}
