"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import OnlineBookingMock from "@/components/visuals/OnlineBookingMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import DicomViewerMock from "@/components/visuals/DicomViewerMock";
import MessagingMock from "@/components/visuals/MessagingMock";
import AnalyticsMock from "@/components/visuals/AnalyticsMock";

type Step = {
  time: string;
  role: "Front desk" | "Chair" | "Owner";
  title: string;
  body: string;
  pmsCost: string;
  oralstackWin: string;
  Mock: () => React.ReactElement;
};

const STEPS: Step[] = [
  {
    time: "08:30",
    role: "Front desk",
    title: "Open the day with today's chairs in front of you.",
    body: "Three chairs, four providers, two crown preps, one new patient. The schedule loads on the front-desk laptop and the dentist's iPad — same data, same minute.",
    pmsCost:
      "On Plato or Dentrix, the schedule lives on a Windows PC. The dentist asks the front desk to read it out.",
    oralstackWin: "Browser-based. Drag-to-reschedule. Provider columns render dynamically.",
    Mock: ScheduleMock,
  },
  {
    time: "09:15",
    role: "Front desk",
    title: "Patient walks in mid-rush asking for the next endo slot.",
    body: "Front desk types 'endo, 60 min, Dr Pereira'. Three slots come back, ranked by earliest. The patient picks one. The booking commits straight into the schedule, timezone-correct.",
    pmsCost:
      "Manually scan the calendar grid. Average response time on a busy morning: 90 seconds.",
    oralstackWin: "One query, three results, three-second confirm.",
    Mock: OnlineBookingMock,
  },
  {
    time: "11:00",
    role: "Chair",
    title: "Crown prep just finished. The bill is ready before the patient stands up.",
    body: "Treatment lines pull from the chart automatically. Insurance and patient portion stay structurally separate. PayNow QR is generated and the receipt prints from the same screen.",
    pmsCost:
      "End-of-day reconciliation: the patient leaves now, the bill goes out tomorrow, payment lands next week.",
    oralstackWin:
      "Discharge-flow billing. Same-day collection rate from 60% → 85% in DFI Synergy's first quarter.",
    Mock: CheckoutMock,
  },
  {
    time: "13:30",
    role: "Chair",
    title: "Hygiene patient. The radiograph is one click away inside the chart.",
    body: "DICOM viewer renders inside the patient chart — no separate desktop app, no folder hunt. Sensor-bridge integration means the next bitewing arrives directly into the visit.",
    pmsCost:
      "Open Carestream desktop. Find the patient. Find the visit. Switch back to the chart. Type notes.",
    oralstackWin: "Open the chart, see the radiograph; review the radiograph, see the chart.",
    Mock: DicomViewerMock,
  },
  {
    time: "14:45",
    role: "Front desk",
    title: "Recall outreach goes out for next week's hygiene candidates.",
    body: "Recall surfaces patients three weeks before due, sorted by recall age. WhatsApp Business templates fire from the clinic number; replies come back to the same thread the front desk works in.",
    pmsCost:
      "Spreadsheet of recall candidates. Personal phone for outreach. No audit trail when something gets missed.",
    oralstackWin: "Templated, audit-logged, Singapore-region routing.",
    Mock: MessagingMock,
  },
  {
    time: "17:45",
    role: "Owner",
    title: "Owner pulls up today's numbers from anywhere.",
    body: "Chair utilisation, revenue, recall coverage, no-show rate. Same view at the clinic or from a phone in the car. Multi-clinic owners see all locations under one login.",
    pmsCost: "Remote-desktop into the clinic PC, or wait for the front desk to email the numbers.",
    oralstackWin: "Browser, any device. Tenant-isolated, audit-logged, Singapore-region.",
    Mock: AnalyticsMock,
  },
];

const AUTO_INTERVAL_MS = 6500;

export default function DayInTheLifeScenario() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  function go(delta: number) {
    setActive((i) => (i + delta + STEPS.length) % STEPS.length);
  }

  const step = STEPS[active];
  const Mock = step.Mock;

  return (
    <div className="grid gap-6">
      <div className="overflow-x-auto -mx-2 px-2 pb-2">
        <ol className="flex min-w-max gap-2">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.time}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPlaying(false);
                  }}
                  aria-current={isActive ? "step" : undefined}
                  className={`group relative grid gap-1 rounded-[var(--radius-md)] border px-3.5 py-2.5 text-left transition-all min-w-[110px] ${
                    isActive
                      ? "border-[var(--color-tide-deep)] bg-[color-mix(in_oklch,var(--color-tide),white_92%)]"
                      : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-text-soft)]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.14em] ${
                      isActive ? "text-[var(--color-tide-deep)]" : "text-[var(--color-text-soft)]"
                    }`}
                  >
                    {s.role}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--color-text)]">
                    {s.time}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 md:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 lg:items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={`mock-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <Mock />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`copy-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-5"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-semibold tabular-nums tracking-tight text-[var(--color-tide-deep)]">
                {step.time}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                {step.role}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight max-w-[28ch]">
              {step.title}
            </h3>
            <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed max-w-[55ch]">
              {step.body}
            </p>

            <div className="grid gap-3 mt-1">
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                  Cost on a legacy PMS
                </p>
                <p className="mt-1.5 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {step.pmsCost}
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-tide)] bg-white p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-tide-deep)]">
                  What changes with Oralstack
                </p>
                <p className="mt-1.5 text-sm text-[var(--color-text)] leading-relaxed">
                  {step.oralstackWin}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous step"
            className="inline-flex items-center justify-center size-10 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white hover:border-[var(--color-text-soft)] transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-3.5 py-2 text-sm font-medium hover:border-[var(--color-text-soft)] transition-colors"
            aria-pressed={playing}
          >
            {playing ? (
              <Pause className="size-3.5" aria-hidden />
            ) : (
              <Play className="size-3.5" aria-hidden />
            )}
            <span>{playing ? "Pause" : "Auto-play"}</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next step"
            className="inline-flex items-center justify-center size-10 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white hover:border-[var(--color-text-soft)] transition-colors"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>

        <p className="text-xs tabular-nums text-[var(--color-text-soft)]">
          {active + 1} / {STEPS.length}
        </p>
      </div>
    </div>
  );
}
