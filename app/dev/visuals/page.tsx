import type { Metadata } from "next";
import Section from "@/components/primitives/Section";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import ImagingMock from "@/components/visuals/ImagingMock";
import RecallMock from "@/components/visuals/RecallMock";
import MessagingMock from "@/components/visuals/MessagingMock";
import DicomViewerMock from "@/components/visuals/DicomViewerMock";
import AnalyticsMock from "@/components/visuals/AnalyticsMock";

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

const entries: Entry[] = [
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
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Visual catalog
          </h1>
          <p className="mt-4 text-base text-[var(--color-text-muted)] leading-relaxed">
            Every component in <code className="font-mono text-sm bg-[var(--color-canvas-tinted)] px-1.5 py-0.5 rounded">components/visuals/</code>,
            rendered side-by-side for review. Not indexed, not linked from
            production pages. Catalog spec lives in{" "}
            <code className="font-mono text-sm bg-[var(--color-canvas-tinted)] px-1.5 py-0.5 rounded">components/visuals/README.md</code>.
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
      <dt className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
        {label}
      </dt>
      <dd
        className={`${mono ? "font-mono text-xs" : ""} text-[var(--color-text-muted)] break-all`}
      >
        {value}
      </dd>
    </div>
  );
}
