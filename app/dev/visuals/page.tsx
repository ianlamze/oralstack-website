import type { Metadata } from "next";
import Section from "@/components/primitives/Section";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import CaseNoteParseMock from "@/components/visuals/CaseNoteParseMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import AfterArrivalMock from "@/components/visuals/AfterArrivalMock";
import AfterDiscoveryMock from "@/components/visuals/AfterDiscoveryMock";
import AfterPreVisitMock from "@/components/visuals/AfterPreVisitMock";
import BeforeArrivalMock from "@/components/visuals/BeforeArrivalMock";
import BeforeBookingMock from "@/components/visuals/BeforeBookingMock";
import BeforeChairMock from "@/components/visuals/BeforeChairMock";
import BeforeDiscoveryMock from "@/components/visuals/BeforeDiscoveryMock";
import BeforeDischargeMock from "@/components/visuals/BeforeDischargeMock";
import BeforeFollowUpMock from "@/components/visuals/BeforeFollowUpMock";
import BeforePreVisitMock from "@/components/visuals/BeforePreVisitMock";
import ImagingMock from "@/components/visuals/ImagingMock";
import RecallMock from "@/components/visuals/RecallMock";
import MessagingMock from "@/components/visuals/MessagingMock";
import DicomViewerMock from "@/components/visuals/DicomViewerMock";
import AnalyticsMock from "@/components/visuals/AnalyticsMock";
import DentalChart from "@/components/visuals/dental-chart/DentalChart";
import type { ToothCondition } from "@/content/charting/types";

export const metadata: Metadata = {
  title: "Visual catalog (dev)",
  description: "Internal review surface for the Oralstack visualizations library.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/dev/visuals" },
};

type Entry = {
  name: string;
  file: string;
  source: string;
  used: string[];
  Component: React.ComponentType;
};

const fullChartSeed: Record<number, ToothCondition[]> = {
  16: [
    {
      id: "demo-16-mod-amalgam",
      condition: "filling_amalgam",
      surfaces: ["M", "O", "D"],
      date: "2026-04-01",
      status: "completed",
    },
  ],
  26: [
    {
      id: "demo-26-do-comp",
      condition: "filling_composite",
      surfaces: ["D", "O"],
      date: "2026-04-01",
      status: "completed",
    },
  ],
  36: [{ id: "demo-36-imp", condition: "implant", date: "2026-04-01", status: "active" }],
  37: [{ id: "demo-37-imp", condition: "implant", date: "2026-04-01", status: "active" }],
  35: [{ id: "demo-35-imp", condition: "implant", date: "2026-04-01", status: "active" }],
  18: [{ id: "demo-18-x", condition: "extracted", date: "2026-04-01", status: "completed" }],
  28: [{ id: "demo-28-x", condition: "extracted", date: "2026-04-01", status: "completed" }],
  47: [
    {
      id: "demo-47-rct",
      condition: "root_canal",
      date: "2026-04-01",
      status: "completed",
    },
    {
      id: "demo-47-cr",
      condition: "crown",
      date: "2026-04-01",
      status: "completed",
    },
  ],
  46: [{ id: "demo-46-mob", condition: "mobility", date: "2026-04-01", status: "active" }],
  13: [
    { id: "demo-13-abt", condition: "bridge_abutment", date: "2026-04-01", status: "completed" },
  ],
  12: [{ id: "demo-12-pon", condition: "bridge_pontic", date: "2026-04-01", status: "completed" }],
  11: [{ id: "demo-11-pon", condition: "bridge_pontic", date: "2026-04-01", status: "completed" }],
  21: [{ id: "demo-21-pon", condition: "bridge_pontic", date: "2026-04-01", status: "completed" }],
  22: [{ id: "demo-22-pon", condition: "bridge_pontic", date: "2026-04-01", status: "completed" }],
  23: [
    { id: "demo-23-abt", condition: "bridge_abutment", date: "2026-04-01", status: "completed" },
  ],
};

function DentalChartFull() {
  return (
    <DentalChart
      initialTeeth={fullChartSeed}
      caption="Patient chart"
      patientLabel="Lim Wei Jian · #1042"
    />
  );
}

const entries: Entry[] = [
  {
    name: "DentalChart",
    file: "components/visuals/dental-chart/DentalChart.tsx",
    source: "apps/app/app/(authenticated)/patients/[id]/dental-chart.tsx",
    used: ["asset — composes Tooth, Odontogram, ConditionPalette, ChatBox"],
    Component: DentalChartFull,
  },
  {
    name: "ScheduleMock",
    file: "components/visuals/ScheduleMock.tsx",
    source: "apps/app/app/(authenticated)/schedule/",
    used: ["/", "/workflows#front-desk", "/customers/dfi-synergy"],
    Component: ScheduleMock,
  },
  {
    name: "OdontogramMock",
    file: "components/visuals/OdontogramMock.tsx",
    source: "apps/app/app/(authenticated)/patients/[id]/",
    used: ["/", "/workflows#charting", "/customers/dfi-synergy"],
    Component: OdontogramMock,
  },
  {
    name: "CaseNoteParseMock",
    file: "components/visuals/CaseNoteParseMock.tsx",
    source: "apps/app/app/(authenticated)/patients/[id]/ (case-note → chart + billing parser)",
    used: ["/workflows#charting", "/journey (Chair)"],
    Component: CaseNoteParseMock,
  },
  {
    name: "BeforeDiscoveryMock",
    file: "components/visuals/BeforeDiscoveryMock.tsx",
    source: "Legacy reality — handwritten attribution, ad-spend black box",
    used: ["/journey (Discovery, before pane)"],
    Component: BeforeDiscoveryMock,
  },
  {
    name: "AfterDiscoveryMock",
    file: "components/visuals/AfterDiscoveryMock.tsx",
    source: "Reviews & referrals (live tool) — Google sync, referrer at intake",
    used: ["/journey (Discovery, after pane)"],
    Component: AfterDiscoveryMock,
  },
  {
    name: "BeforeBookingMock",
    file: "components/visuals/BeforeBookingMock.tsx",
    source: "Legacy reality — paper diary, phone tag, no audit trail",
    used: ["/journey (Booking, before pane)"],
    Component: BeforeBookingMock,
  },
  {
    name: "BeforePreVisitMock",
    file: "components/visuals/BeforePreVisitMock.tsx",
    source: "Legacy reality — PDF intake unfilled, manual eligibility hold-ups",
    used: ["/journey (Pre-visit, before pane)"],
    Component: BeforePreVisitMock,
  },
  {
    name: "AfterPreVisitMock",
    file: "components/visuals/AfterPreVisitMock.tsx",
    source: "WhatsApp Business intake link + intake checklist + tier resolved",
    used: ["/journey (Pre-visit, after pane)"],
    Component: AfterPreVisitMock,
  },
  {
    name: "BeforeArrivalMock",
    file: "components/visuals/BeforeArrivalMock.tsx",
    source: "Legacy reality — sticky-note allergies, eligibility verification at desk",
    used: ["/journey (Arrival, before pane)"],
    Component: BeforeArrivalMock,
  },
  {
    name: "AfterArrivalMock",
    file: "components/visuals/AfterArrivalMock.tsx",
    source: "Arrival check-in card + medical alerts surfaced to chairside",
    used: ["/journey (Arrival, after pane)"],
    Component: AfterArrivalMock,
  },
  {
    name: "BeforeChairMock",
    file: "components/visuals/BeforeChairMock.tsx",
    source: "Legacy reality — form-led PMS modal + separate DICOM desktop app",
    used: ["/journey (Chair, before pane)"],
    Component: BeforeChairMock,
  },
  {
    name: "BeforeDischargeMock",
    file: "components/visuals/BeforeDischargeMock.tsx",
    source: "Legacy reality — paper invoice, EOD reconciliation, follow-up call list",
    used: ["/journey (Discharge, before pane)"],
    Component: BeforeDischargeMock,
  },
  {
    name: "BeforeFollowUpMock",
    file: "components/visuals/BeforeFollowUpMock.tsx",
    source: "Legacy reality — stale recall spreadsheet, personal-WhatsApp outreach",
    used: ["/journey (Follow-up, before pane)"],
    Component: BeforeFollowUpMock,
  },
  {
    name: "CheckoutMock",
    file: "components/visuals/CheckoutMock.tsx",
    source: "apps/app/app/(authenticated)/checkout/",
    used: ["/", "/workflows#billing", "/customers/dfi-synergy"],
    Component: CheckoutMock,
  },
  {
    name: "ImagingMock",
    file: "components/visuals/ImagingMock.tsx",
    source: "apps/app/app/(authenticated)/imaging/",
    used: ["/", "/workflows#imaging"],
    Component: ImagingMock,
  },
  {
    name: "RecallMock",
    file: "components/visuals/RecallMock.tsx",
    source: "apps/app/app/(authenticated)/reminders/recall-table.tsx",
    used: ["/workflows#recall", "/customers/dfi-synergy"],
    Component: RecallMock,
  },
  {
    name: "MessagingMock",
    file: "components/visuals/MessagingMock.tsx",
    source: "apps/app/app/(authenticated)/reminders/ + WhatsApp Business API",
    used: ["/workflows#recall"],
    Component: MessagingMock,
  },
  {
    name: "DicomViewerMock",
    file: "components/visuals/DicomViewerMock.tsx",
    source: "apps/app/app/(authenticated)/imaging/ (v13 single-image viewer)",
    used: ["/workflows#imaging"],
    Component: DicomViewerMock,
  },
  {
    name: "AnalyticsMock",
    file: "components/visuals/AnalyticsMock.tsx",
    source: "apps/app/scripts/analyze:chairs (chair utilisation analysis)",
    used: ["/workflows#operations"],
    Component: AnalyticsMock,
  },
];

export default function VisualCatalog() {
  return (
    <main>
      <Section className="pt-16 pb-10">
        <div className="max-w-[820px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            Internal · dev only
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Visual catalog</h1>
          <p className="mt-4 text-base text-[var(--color-text-muted)] leading-relaxed">
            Every component in{" "}
            <code className="font-mono text-sm bg-[var(--color-canvas-tinted)] px-1.5 py-0.5 rounded">
              components/visuals/
            </code>
            , rendered side-by-side for review. Not indexed, not linked from production pages.
            Catalog spec lives in{" "}
            <code className="font-mono text-sm bg-[var(--color-canvas-tinted)] px-1.5 py-0.5 rounded">
              components/visuals/README.md
            </code>
            .
          </p>
          <p className="mt-3 text-sm text-[var(--color-text-soft)]">
            {entries.length} visualizations · all wired into production pages
          </p>
        </div>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ul className="grid gap-16">
          {entries.map((e) => {
            const C = e.Component;
            return (
              <li
                key={e.name}
                className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-14 items-start"
              >
                <header className="grid gap-4 lg:sticky lg:top-10">
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight font-mono">
                    {e.name}
                  </h2>
                  <dl className="grid gap-3 text-sm">
                    <ProfileRow label="File" value={e.file} mono />
                    <ProfileRow label="Source app surface" value={e.source} mono />
                    <ProfileRow label="Used on" value={e.used.join(" · ")} />
                  </dl>
                </header>
                <div className="bg-[var(--color-canvas-tinted)] rounded-[var(--radius-lg)] p-6 md:p-10 flex items-start justify-center min-h-[320px]">
                  <C />
                </div>
              </li>
            );
          })}
        </ul>
      </Section>
    </main>
  );
}

function ProfileRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="grid gap-1">
      <dt className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">{label}</dt>
      <dd className={`${mono ? "font-mono text-xs" : ""} text-[var(--color-text-muted)] break-all`}>
        {value}
      </dd>
    </div>
  );
}
