import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/sections/AnimateInView";
import MarkBullet from "@/components/sections/MarkBullet";

export const metadata: Metadata = {
  title: "Oralstack vs Dentrix",
  description:
    "An honest, side-by-side comparison of Oralstack and Dentrix (and Dentrix Ascend) — deployment model, US insurance, multi-clinic, imaging, pricing, and where each is the right call.",
  alternates: { canonical: "/compare/dentrix" },
};

type Row = { capability: string; them: string; us: string };

const rows: Row[] = [
  {
    capability: "Deployment",
    them: "Two products. Dentrix (on-prem Windows) is the dominant one; Dentrix Ascend is the newer cloud SaaS.",
    us: "Cloud-native, browser-based on any device. One product, one version, region-hosted in Singapore.",
  },
  {
    capability: "Schedule UX",
    them: "Mature, dense. Reschedules typically use modal dialogs and form-based flows accumulated over two decades.",
    us: "Drag-driven. Move a 10:00 to 14:00 in three seconds; commits are timezone-correct on reload.",
  },
  {
    capability: "Charting",
    them: "Tooth chart with treatment-coded fills, perio chart, free-text and structured notes per visit.",
    us: "FDI numbering with surface-specific notes (M/D/B/L/O) and per-procedure templates editable per visit.",
  },
  {
    capability: "Billing",
    them: "Strong claims engine, EOB import, X12 837/835. Built around US payer rails.",
    us: "Discharge-flow billing tuned to APAC fee-for-service. Treatment lines pull from chart automatically; insurance and patient portion stay structurally separate. No US claims rails.",
  },
  {
    capability: "Imaging",
    them: "Dentrix Imaging Center plus third-party bridge plugins for sensor brands. Quality varies per integration.",
    us: "DICOM viewer in the patient chart, native. Sensor-bridge integration across Carestream, Dexis, Sopro, Schick.",
  },
  {
    capability: "Multi-location / DSO",
    them: "Dentrix Enterprise is a separate product line for multi-location operators. Pricing scales steeply.",
    us: "Tenant-isolated SaaS by default. Multi-clinic owners see all locations under one login at the same flat $200/clinic/month.",
  },
  {
    capability: "Hosting & data residency",
    them: "On-prem (Dentrix) or US-hosted (Ascend). Singapore data residency requires custom arrangements.",
    us: "Singapore region (asia-southeast1) on Google Cloud. Tenant-isolated, audit-logged, PDPA-aware by design.",
  },
  {
    capability: "Updates",
    them: "Dentrix on-prem: manual upgrades scheduled by the clinic. Ascend: managed cloud updates.",
    us: "Continuous deployment. Every clinic is on the same version every week.",
  },
  {
    capability: "Pricing",
    them: "Premium. Dentrix typically ranges from US$8K–$12K per practice per year for on-prem licence + support; Ascend is per-provider subscription.",
    us: "Flat $200 / clinic / month during pilot. No per-seat or per-feature charges.",
  },
  {
    capability: "Sales motion",
    them: "Sold through Henry Schein and certified reseller network. Local rep relationships are part of the deal.",
    us: "Direct-to-clinic. The engineer building the product is on the demo and the onboarding call.",
  },
  {
    capability: "APAC presence",
    them: "Limited APAC support. Most resellers and trainers are US/Canada-based.",
    us: "APAC-first. Singapore-region hosting, PDPA-aware, GST-aware billing model, WhatsApp Business API for recall.",
  },
];

export default function CompareDentrixPage() {
  return (
    <main>
      <PageHeader eyebrow="Compare" title="Oralstack vs Dentrix." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Dentrix is a category-defining dental practice management system —
          mature, US-rooted, and excellent at US-payer claims. Oralstack is
          designed for APAC dental practices that want region-hosted data,
          flat pricing, and workflows tuned for fee-for-service rather than
          insurance-claims rails. Here&apos;s what changes, line by line.
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
                Dentrix
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
                      Dentrix
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
            title="APAC-first beats US-first for APAC practices."
            body="Dentrix is built around US payer rails — X12 claims, EOB imports, ANSI 837/835. That's enormous value if you're a US practice. It's overhead if you're a Singapore clinic running fee-for-service with optional Singapore insurance. Oralstack is the opposite: built around Singapore GST, Singapore-specific insurance flows, and APAC patient communication (WhatsApp Business API, region-routed)."
          />
          <Reason
            eyebrow="Why we built differently · 2"
            title="Flat clinic pricing beats per-provider subscriptions."
            body="A 3-chair, 4-provider clinic on Dentrix Ascend pays per-provider fees that compound as the clinic grows. Dentrix on-prem adds licence + maintenance + support tiers. Oralstack ships flat: $200 per clinic per month during pilot, with three months of hands-on onboarding included. No per-seat charges, no per-feature gating, no upsell tiers."
          />
          <Reason
            eyebrow="Why we built differently · 3"
            title="One product beats two product lines."
            body="Dentrix and Dentrix Ascend share branding but are different products with different capabilities, different hosting, and different pricing. Migrating between them is a project. Oralstack is one product, one version, deployed continuously — so the demo you saw is the product you get, and next week's product is the same one with one more thing fixed."
          />
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-8 md:p-12 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Where Dentrix is the right call
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[32ch]">
            We&apos;re not the right answer for every clinic.
          </h2>
          <ul className="grid gap-3 text-[var(--color-text-muted)] leading-relaxed">
            <Bullet>
              If your practice is in the US and your revenue depends on
              insurance claims processing — X12, EOB import, ERA reconciliation —
              Dentrix is purpose-built for that workflow. We are not.
            </Bullet>
            <Bullet>
              If you&apos;re a multi-location DSO already standardised on
              Henry Schein supplies and the rep relationship is part of the
              deal, Dentrix Enterprise integrates with that supply-chain
              workflow.
            </Bullet>
            <Bullet>
              If you want a vendor with thousands of US-trained certified
              consultants and decades of training material, Dentrix has more
              of both than any APAC PMS — including us.
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
              clinic&apos;s shape. We&apos;ll show what changes day-one and
              what onboarding from a US-shape PMS looks like in APAC.{" "}
              <a
                href="/security"
                className="text-[var(--color-tide-deep)] underline underline-offset-4"
              >
                Read the security posture →
              </a>
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
