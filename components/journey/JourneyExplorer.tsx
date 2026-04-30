"use client";

import { useEffect, useState } from "react";
import { journeyStages } from "@/content/journey";
import BeforeBookingMock from "@/components/visuals/BeforeBookingMock";
import BeforeChairMock from "@/components/visuals/BeforeChairMock";
import BeforeDischargeMock from "@/components/visuals/BeforeDischargeMock";
import CaseNoteParseMock from "@/components/visuals/CaseNoteParseMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import JourneyTimeline from "./JourneyTimeline";
import StagePanel from "./StagePanel";

const DEFAULT_STAGE_ID = "discovery";
const BUILT_STAGE_IDS = ["booking", "chair", "discharge"];

const builtDemos: Record<string, { before: React.ReactNode; after: React.ReactNode } | undefined> =
  {
    booking: {
      before: <BeforeBookingMock />,
      after: <ScheduleMock />,
    },
    chair: {
      before: <BeforeChairMock />,
      after: <CaseNoteParseMock />,
    },
    discharge: {
      before: <BeforeDischargeMock />,
      after: <CheckoutMock />,
    },
  };

function isValidStageId(id: string | null): id is string {
  if (!id) return false;
  return journeyStages.some((s) => s.id === id);
}

export default function JourneyExplorer() {
  const [activeStageId, setActiveStageId] = useState<string>(DEFAULT_STAGE_ID);

  // Hash-based deep linking. /#booking, /#discovery, etc. land on that stage.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromHash = window.location.hash.replace(/^#/, "");
    if (isValidStageId(fromHash)) setActiveStageId(fromHash);

    const onHash = () => {
      const next = window.location.hash.replace(/^#/, "");
      if (isValidStageId(next)) setActiveStageId(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function handleStageChange(stageId: string) {
    setActiveStageId(stageId);
    if (typeof window !== "undefined") {
      // Update hash without triggering scroll-jump.
      const url = new URL(window.location.href);
      url.hash = stageId;
      window.history.replaceState(null, "", url);
    }
  }

  const stage = journeyStages.find((s) => s.id === activeStageId) ?? journeyStages[0];
  if (!stage) return null;

  return (
    <div className="grid gap-10 lg:gap-14">
      <JourneyTimeline
        stages={journeyStages}
        activeStageId={stage.id}
        builtStageIds={BUILT_STAGE_IDS}
        onStageChange={handleStageChange}
      />
      <StagePanel
        stage={stage}
        totalStages={journeyStages.length}
        builtDemo={builtDemos[stage.id]}
      />
    </div>
  );
}
