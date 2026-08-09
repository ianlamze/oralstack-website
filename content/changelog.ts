export type ChangelogEntry = {
  date: string;
  type: "Feature" | "Fix" | "Architecture" | "Pilot" | "Branch" | "Compliance" | "Sweep";
  title: string;
  body: string;
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-04-27",
    type: "Pilot",
    title: "Controlled rollout: DICOM and sensor-bridge evaluation.",
    body: "Historical rollout entry. It did not represent general availability. DICOM viewing, device ingest, measurements, and the X-ray bridge remain gated and are not marketed as live.",
  },
  {
    date: "2026-04-22",
    type: "Fix",
    title: "Historical prototype: local-time reschedule handling.",
    body: "This entry recorded schedule UI prototype work. Current Plato-backed reschedules are staged proposals that staff apply in Plato and then resolve in oralstack; native scheduling remains a controlled rollout.",
  },
  {
    date: "2026-04-21",
    type: "Branch",
    title: "Historical prototype: imaging branch exploration.",
    body: "The archived branch explored a DICOM viewer and sensor-bridge seam. Current product marketing does not treat either capability as available while the independent rollout gates remain off.",
  },
  {
    date: "2026-04-20",
    type: "Fix",
    title: "Historical prototype: schedule grid placement fix.",
    body: "This archived UI milestone corrected appointment placement in an earlier schedule prototype. The current live claim is limited to Plato-connected schedule reads, reviewed appointment create or cancel paths, and reception flow.",
  },
  {
    date: "2026-04-20",
    type: "Feature",
    title: "Historical prototype: staff appointment flow.",
    body: "The prototype explored matched-patient search and name-only appointment creation. Current staff can create Plato-backed appointments, while native patient identity and public self-booking remain outside live claims.",
  },
  {
    date: "2026-04-20",
    type: "Sweep",
    title: "Historical prototype: performance and correctness pass.",
    body: "Archived engineering milestone covering caching, render work, and dead-code removal in the earlier prototype. It is not a statement of current feature availability.",
  },
  {
    date: "2026-04-15",
    type: "Architecture",
    title: "Historical prototype: tenant-context coverage.",
    body: "Archived architecture milestone from the earlier application. The current production boundary uses tenant-scoped access, Postgres row-level security, origin checks, encryption requirements, and chained audit evidence; the old test counts are historical only.",
  },
  {
    date: "2026-04-08",
    type: "Feature",
    title: "Historical prototype: Postgres shadow introduced.",
    body: "This entry documents a retired transition architecture in which local JSON remained the source of truth. The current app uses tenant-scoped Postgres services; local JSON is not the current production architecture.",
  },
  {
    date: "2026-03-21",
    type: "Compliance",
    title: "Historical prototype: Singpass integration scaffolding.",
    body: "This entry records the initial integration seam. The current intake product can offer Singpass MyInfo retrieval when approved clinic configuration is present, with the manual intake path retained.",
  },
  {
    date: "2026-03-15",
    type: "Feature",
    title: "Historical prototype: recall candidate analysis.",
    body: "This entry records the first recall-risk exploration. The current app supports recall settings, campaigns, audiences, touch queues, and recall-risk reporting; automated WhatsApp or SMS dispatch is not a live claim.",
  },
];
