import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";
import AnimateInView from "@/components/sections/AnimateInView";
import MarkBullet from "@/components/sections/MarkBullet";

export const metadata: Metadata = {
  title: "Oralstack vs Plato",
  description:
    "An honest, side-by-side comparison of Oralstack and Plato for Singapore dental clinics — deployment, schedule UX, charting, imaging, billing, recall, and where each is the right call.",
  alternates: { canonical: "/compare/plato" },
};

type Row = { capability: string; them: string; us: string };

const rows: Row[] = [
  {
    capability: "Deployment",
    them: "Windows desktop client installed on each workstation. Front-desk PC is the source of truth.",
    us: "Browser-based on any device. Region-hosted in Singapore (asia-southeast1) with tenant isolation.",
  },
  {
    capability: "Schedule UX",
    them: "Form-based booking. Reschedules typically require open-edit-save through dialog windows.",
    us: "Drag-driven. Move a 10:00 to 14:00 in three seconds; commits are timezone-correct on reload.",
  },
  {
    capability: "Charting",
    them: "FDI numbering with free-text clinical notes per visit.",
    us: "FDI numbering with surface-specific notes (M/D/B/L/O) and per-procedure templates editable per visit.",
  },
  {
    capability: "Billing",
    them: "End-of-day reconciliation is common. Treatment lines re-entered manually from the chart.",
    us: "Discharge-flow billing. Treatment lines pull from the chart automatically; insurance and patient portion stay structurally separate.",
  },
  {
    capability: "Imaging",
    them: "Separate desktop apps per sensor brand. Radiographs live in folders outside the chart.",
    us: "DICOM viewer inside the patient chart. Sensor-bridge integration captures chairside imagery to the visit (Carestream, Dexis, Sopro, Schick).",
  },
  {
    capability: "Recall & messaging",
    them: "Manual recall list maintenance, often a separate spreadsheet. Outreach via personal phones or WhatsApp.",
    us: "Recall candidates surface three weeks before due, sorted by recall age. WhatsApp Business API templated messaging, audit-logged.",
  },
  {
    capability: "Multi-clinic",
    them: "One install per clinic. Multi-location requires separate logins and reconciled reporting.",
    us: "Tenant-isolated SaaS. Multi-clinic owners see all locations under one login, with row-level data separation per clinic.",
  },
  {
    capability: "Off-site access",
    them: "Limited to remote desktop into the clinic PC, or unavailable.",
    us: "Browser, any device. Owner can check today's schedule and revenue from anywhere.",
  },
  {
    capability: "Hosting & data residency",
    them: "On-premise on the clinic's hardware. Backups are the clinic's responsibility.",
    us: "Singapore region (asia-southeast1) on Google Cloud. Tenant-isolated, audit-logged, daily backups, PDPA-aware by design.",
  },
  {
    capability: "Updates",
    them: "Manual upgrades. Different clinics often run different versions for months at a time.",
    us: "Continuous deployment. Every clinic is on the same version every week.",
  },
  {
    capability: "Pricing model",
    them: "License + maintenance. Costs scale with seats and modules.",
    us: "Flat $200 / clinic / month during pilot. No per-seat or per-feature charges. Three months of hands-on onboarding included.",
  },
];

export default function ComparePlatoPage() {
  return (
    <main>
      <PageHeader eyebrow="Compare" title="Oralstack vs Plato." />

      <Section className="pb-12">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Plato has been the dominant practice management system in Singapore
          for two decades. It is reliable, familiar, and Singapore-fit. It is
          also a Windows desktop client built around the front-desk PC.
          Oralstack was built differently — for the schedule the front desk
          drives, the bill that&apos;s ready before the patient stands up, and
          the DICOM that lives inside the chart. Here&apos;s what changes,
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
                Plato
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
                      Plato
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
            title="Drag-driven beats form-based at the front desk."
            body="A 3-second reschedule on a busy day is the difference between fielding the next patient call and putting them on hold. We built the schedule as a thing the front desk drives all day, not a thing they consult through forms. Reschedules commit timezone-correct so they don't drift on reload, and provider columns render dynamically as you add chairs."
          />
          <Reason
            eyebrow="Why we built differently · 2"
            title="Discharge-flow billing beats end-of-day reconciliation."
            body="The highest-conversion moment in dentistry is at the chair, immediately after treatment — the patient is there, the work is done, they want to pay and go. End-of-day reconciliation breaks that moment into two transactions across two days. Oralstack pulls treatment lines from the chart automatically, splits insurance from patient portion, and audit-logs every adjustment, so the bill is ready before the patient stands up."
          />
          <Reason
            eyebrow="Why we built differently · 3"
            title="DICOM in the chart beats parallel desktop apps."
            body="If the radiograph lives in a folder on a separate desktop, every imaging review is a context switch. Oralstack runs the DICOM viewer inside the patient chart, with sensor-bridge integration for chairside capture across Carestream, Dexis, Sopro, and Schick. Open the chart, see the radiograph; review the radiograph, see the chart."
          />
        </div>
      </Section>

      <Section className="pb-20 md:pb-28">
        <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-8 md:p-12 max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Where Plato is the right call
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-[28ch]">
            We&apos;re not the right answer for every clinic.
          </h2>
          <ul className="grid gap-3 text-[var(--color-text-muted)] leading-relaxed">
            <Bullet>
              Twenty years of front-desk muscle memory is real. If your team is
              productive on Plato and you don&apos;t have a workflow problem,
              changing PMS will cost more than it gains.
            </Bullet>
            <Bullet>
              If you don&apos;t need cloud access, multi-device, or multi-clinic
              consolidation, on-prem is fine.
            </Bullet>
            <Bullet>
              Plato has a Singapore presence stretching back to the 1990s.
              That track record is meaningful for risk-averse clinic owners.
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
              A 30-minute walkthrough on a sample dataset that mirrors a typical
              Singapore practice. We&apos;ll show what changes day-one and what
              the three-week migration looks like.{" "}
              <a
                href="/articles/plato-to-cloud-migration"
                className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
              >
                Read the migration playbook →
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
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-[1.15] max-w-[34ch]">
        {title}
      </h3>
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
