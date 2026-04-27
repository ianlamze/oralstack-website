import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/sections/AnimateInView";
import MarkBullet from "@/components/sections/MarkBullet";

export const metadata: Metadata = {
  title: "Oralstack vs Carestream Dental",
  description:
    "An honest, side-by-side comparison of Oralstack and Carestream Dental (SoftDent / OrthoTrac plus imaging hardware) — sensor lock-in, multi-vendor flexibility, hosting, and where each is the right call.",
  alternates: { canonical: "/compare/carestream" },
};

type Row = { capability: string; them: string; us: string };

const rows: Row[] = [
  {
    capability: "Product family",
    them: "Carestream Dental ships imaging hardware (sensors, panoramic, CBCT) plus PMS products — SoftDent for general dentistry, OrthoTrac for orthodontics. Hardware is the centre of gravity.",
    us: "Software-only. PMS plus a sensor-bridge integration layer that works across vendor brands.",
  },
  {
    capability: "Imaging integration",
    them: "Tightest with Carestream sensors and CBCT units. Other-brand sensors integrate via plugins of varying quality.",
    us: "DICOM viewer in the patient chart, native. Sensor-bridge integration across Carestream, Dexis, Sopro, Schick — equal-footing across vendors.",
  },
  {
    capability: "Schedule & front desk",
    them: "Functional scheduling tied to PMS. UI evolves slowly; the strength is imaging, not scheduling.",
    us: "Drag-driven schedule built as the front-desk's primary tool. Reschedule in three seconds, timezone-correct.",
  },
  {
    capability: "Charting",
    them: "Tooth-charting and clinical notes; integration to imaging via the chart timeline is a Carestream strength.",
    us: "FDI charting with surface-specific notes (M/D/B/L/O) and per-procedure templates. Imaging in the chart natively.",
  },
  {
    capability: "Billing",
    them: "Per-region billing models, with US-style claims handling in some configurations. Less standardised globally.",
    us: "Discharge-flow billing for APAC fee-for-service. Singapore GST and insurance models built in.",
  },
  {
    capability: "Sensor lock-in",
    them: "Best experience requires Carestream-brand sensors. Switching sensor vendor mid-life can mean re-doing imaging integration.",
    us: "Sensor-vendor neutral. Bring your existing sensors; we don't sell hardware.",
  },
  {
    capability: "Hosting",
    them: "On-prem deployment is the default for SoftDent. Cloud options exist but are not the primary delivery model.",
    us: "Cloud-native, region-hosted in Singapore (asia-southeast1) on Google Cloud. Tenant-isolated by default.",
  },
  {
    capability: "Multi-location",
    them: "Possible with multi-database setups; clinic-by-clinic install pattern.",
    us: "Tenant-isolated SaaS. Multi-clinic owners see all locations under one login at flat $200/clinic/month.",
  },
  {
    capability: "Updates",
    them: "Manual or rep-assisted. Imaging firmware updates are coordinated separately from PMS updates.",
    us: "Continuous deployment for the PMS. All clinics on the same version every week.",
  },
  {
    capability: "Pricing model",
    them: "Software pricing varies by region, often bundled with imaging hardware purchases.",
    us: "Flat $200 / clinic / month during pilot. No bundling with hardware.",
  },
  {
    capability: "APAC fit",
    them: "Carestream Dental does have APAC presence, particularly in imaging. PMS support is more variable.",
    us: "APAC-first PMS. Singapore-region hosting, PDPA-aware, GST-aware billing, WhatsApp Business API for recall.",
  },
];

export default function CompareCarestreamPage() {
  return (
    <main>
      <PageHeader eyebrow="Compare" title="Oralstack vs Carestream Dental." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Carestream Dental is one of the strongest names in dental imaging
          hardware — sensors, panoramic units, CBCT — and ships PMS products
          (SoftDent, OrthoTrac) tightly tuned for that hardware. Oralstack
          inverts the relationship: the PMS is the centre of gravity, and the
          sensor bridge sits across vendors so you&apos;re not locked to one
          imaging brand. Here&apos;s what differs, line by line.
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
                Carestream
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
                      Carestream
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
            title="Sensor-brand neutrality beats sensor-brand lock-in."
            body="A clinic that buys Carestream's PMS naturally tilts toward Carestream sensors — the integration is best there. Oralstack does the opposite: a single sensor-bridge that talks to Carestream, Dexis, Sopro, and Schick equally. You bring whatever sensors you've already invested in, and you can replace them later without re-doing the PMS integration."
          />
          <Reason
            eyebrow="Why we built differently · 2"
            title="A PMS-first product beats a hardware-first product."
            body="The bulk of clinic time isn't spent on imaging — it's spent on scheduling, patient calls, billing, and recall. We built Oralstack with the PMS as the centre of gravity and imaging as one of six workflows that lives inside it. That trade-off favours the front desk and the practice manager more than the radiology-heavy specialty."
          />
          <Reason
            eyebrow="Why we built differently · 3"
            title="Region-hosted SaaS beats on-prem PMS with bolted-on cloud."
            body="SoftDent's primary delivery model is on-prem, with cloud and remote-access add-ons. Oralstack is region-hosted in Singapore from day one, with Postgres row-level security and audit logs as the baseline — not a configuration you opt into."
          />
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-8 md:p-12 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Where Carestream is the right call
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[32ch]">
            We&apos;re not the right answer for every clinic.
          </h2>
          <ul className="grid gap-3 text-[var(--color-text-muted)] leading-relaxed">
            <Bullet>
              If your practice is heavily imaging-led — a CBCT-driven oral
              surgery or implant practice — Carestream&apos;s vertical
              integration of sensor → CBCT → PMS is genuinely best-in-class
              for that path.
            </Bullet>
            <Bullet>
              If you&apos;re an orthodontic clinic specifically, OrthoTrac has
              decades of ortho-specific workflow tooling we don&apos;t replicate.
            </Bullet>
            <Bullet>
              If you&apos;re standardising on Carestream hardware across a
              chain and want a single vendor for imaging plus PMS, the
              integration story will be tighter with their PMS than with ours.
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
              A 30-minute walkthrough showing the DICOM-in-chart workflow on
              your existing Carestream (or Dexis, Sopro, Schick) sensors,
              without changing your imaging hardware.
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
