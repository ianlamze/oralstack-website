"use client";

import DentalChart from "./dental-chart/DentalChart";
import type { ToothCondition } from "@/content/charting/types";

const seed = (
  tooth: number,
  cond: ToothCondition["condition"],
  surfaces: ToothCondition["surfaces"] | undefined,
  status: ToothCondition["status"] = "active",
): ToothCondition => ({
  id: `seed-${tooth}-${cond}-${surfaces?.join("") ?? "w"}`,
  condition: cond,
  surfaces,
  date: "2026-04-01",
  status,
});

const seedTeeth: Record<number, ToothCondition[]> = {
  16: [seed(16, "caries", ["O"]), seed(16, "watch", ["M"])],
  14: [seed(14, "filling_composite", ["O"], "completed")],
  12: [seed(12, "watch", ["M"])],
  46: [seed(46, "filling_composite", ["M", "O"], "completed")],
  47: [seed(47, "filling_composite", ["O"], "completed")],
  44: [seed(44, "watch", ["B"])],
};

export default function OdontogramMock() {
  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-3 sm:p-4 shadow-[0_1px_0_rgba(0,0,0,0.02),0_18px_60px_-30px_rgba(20,30,60,0.18)]">
      <DentalChart
        initialTeeth={seedTeeth}
        showPalette={false}
        showChatBox={false}
        showSelectedDetail
        toothSize={28}
        caption="Patient chart"
        patientLabel="Demo patient 201 · DEMO-1042"
      />
    </div>
  );
}
