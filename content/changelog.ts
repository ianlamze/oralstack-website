export type ChangelogEntry = {
  id: string;
  date: string;
  type: "Feature" | "Fix" | "Architecture" | "Pilot" | "Branch" | "Compliance" | "Sweep";
  stage: "current" | "historical";
  status: "public" | "source-reviewed" | "historical";
  surface: string;
  title: string;
  body: string;
  boundary: string;
  href?: string;
  linkLabel?: string;
};

export const changelog: ChangelogEntry[] = [
  {
    id: "standalone-first-public-path",
    date: "2026-08-10",
    type: "Feature",
    stage: "current",
    status: "public",
    surface: "Public product guide",
    title: "Standalone clinic setup is now the default path.",
    body: "New clinics, paper or spreadsheet moves, existing-system transitions, and optional Plato connections now have separate setup paths before the front desk starts work.",
    boundary:
      "This is a public product-scope change. Standalone clinic go-live still requires provisioning and a readiness review.",
    href: "/switching",
    linkLabel: "Review the setup paths",
  },
  {
    id: "clinic-accountability-model",
    date: "2026-08-10",
    type: "Feature",
    stage: "current",
    status: "public",
    surface: "Clinic rollout",
    title: "Clinic accountability now starts before the walkthrough.",
    body: "The About page now maps discovery, record-boundary review, training, and support into explicit clinic and Oralstack responsibilities.",
    boundary:
      "The model describes a guided pilot. It does not promise a self-serve rollout, fixed implementation time, or named support coverage.",
    href: "/about",
    linkLabel: "See the accountability model",
  },
  {
    id: "security-review-context",
    date: "2026-08-10",
    type: "Compliance",
    stage: "current",
    status: "public",
    surface: "Trust journey",
    title: "Security reviews now keep document context.",
    body: "Requests for agreements, processing terms, subprocessors, questionnaires, and deployment evidence now open the structured review form with the requested item retained.",
    boundary:
      "The Security page is a dated evidence summary. It is not a certification claim or a live control-monitoring feed.",
    href: "/security",
    linkLabel: "Review the security evidence",
  },
  {
    id: "mobile-workflow-navigation",
    date: "2026-08-09",
    type: "Fix",
    stage: "current",
    status: "public",
    surface: "Mobile product guide",
    title: "Workflow navigation now preserves the selected area.",
    body: "On smaller screens, one clinic workflow stays expanded at a time, the active selector stays visible, and browser history restores the matching section.",
    boundary:
      "The desktop catalogue remains expanded so teams can compare all seven workflow groups without changing views.",
    href: "/workflows",
    linkLabel: "Explore the workflow guide",
  },
  {
    id: "app-workspace-on-demand-loading",
    date: "2026-07-30",
    type: "Architecture",
    stage: "current",
    status: "source-reviewed",
    surface: "Application performance",
    title: "Heavy clinic workspaces now load on demand.",
    body: "Optional workspaces, checkout editing, and patient details load when staff open them, while appointment booking remains ready in the initial clinic view.",
    boundary:
      "This is verified in current application source. It changes payload behaviour, not clinic rollout availability or a field-performance guarantee.",
    href: "/status",
    linkLabel: "Review the dated capability snapshot",
  },
  {
    id: "dicom-sensor-bridge-evaluation",
    date: "2026-04-27",
    type: "Pilot",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Controlled rollout: DICOM and sensor-bridge evaluation.",
    body: "Historical rollout entry. It did not represent general availability. DICOM viewing, device ingest, measurements, and the X-ray bridge remain gated and are not marketed as live.",
    boundary: "Preserved for historical context only.",
  },
  {
    id: "local-time-reschedule",
    date: "2026-04-22",
    type: "Fix",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Historical prototype: local-time reschedule handling.",
    body: "This entry recorded schedule UI prototype work. Current Plato-backed reschedules are staged proposals that staff apply in Plato and then resolve in Oralstack; native scheduling remains a controlled rollout.",
    boundary: "Preserved for historical context only.",
  },
  {
    id: "imaging-branch-exploration",
    date: "2026-04-21",
    type: "Branch",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Historical prototype: imaging branch exploration.",
    body: "The archived branch explored a DICOM viewer and sensor-bridge seam. Current product marketing does not treat either capability as available while the independent rollout gates remain off.",
    boundary: "Preserved for historical context only.",
  },
  {
    id: "schedule-grid-placement",
    date: "2026-04-20",
    type: "Fix",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Historical prototype: schedule grid placement fix.",
    body: "This archived UI milestone corrected appointment placement in an earlier schedule prototype. The current live claim is limited to Plato-connected schedule reads, reviewed appointment create or cancel paths, and reception flow.",
    boundary: "Preserved for historical context only.",
  },
  {
    id: "staff-appointment-flow",
    date: "2026-04-20",
    type: "Feature",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Historical prototype: staff appointment flow.",
    body: "The prototype explored matched-patient search and name-only appointment creation. Current staff can create Plato-backed appointments, while native patient identity and public self-booking remain outside live claims.",
    boundary: "Preserved for historical context only.",
  },
  {
    id: "performance-correctness-pass",
    date: "2026-04-20",
    type: "Sweep",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Historical prototype: performance and correctness pass.",
    body: "Archived engineering milestone covering caching, render work, and dead-code removal in the earlier prototype. It is not a statement of current feature availability.",
    boundary: "Preserved for historical context only.",
  },
  {
    id: "tenant-context-coverage",
    date: "2026-04-15",
    type: "Architecture",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Historical prototype: tenant-context coverage.",
    body: "Archived architecture milestone from the earlier application. The current production boundary uses tenant-scoped access, Postgres row-level security, origin checks, encryption requirements, and chained audit evidence; the old test counts are historical only.",
    boundary: "Preserved for historical context only.",
  },
  {
    id: "postgres-shadow",
    date: "2026-04-08",
    type: "Feature",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Historical prototype: Postgres shadow introduced.",
    body: "This entry documents a retired transition architecture in which local JSON remained the source of truth. The current app uses tenant-scoped Postgres services; local JSON is not the current production architecture.",
    boundary: "Preserved for historical context only.",
  },
  {
    id: "singpass-scaffolding",
    date: "2026-03-21",
    type: "Compliance",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Historical prototype: Singpass integration scaffolding.",
    body: "This entry records the initial integration seam. The current intake product can offer Singpass MyInfo retrieval when approved clinic configuration is present, with the manual intake path retained.",
    boundary: "Preserved for historical context only.",
  },
  {
    id: "recall-candidate-analysis",
    date: "2026-03-15",
    type: "Feature",
    stage: "historical",
    status: "historical",
    surface: "Prototype archive",
    title: "Historical prototype: recall candidate analysis.",
    body: "This entry records the first recall-risk exploration. The current app supports recall settings, campaigns, audiences, touch queues, and recall-risk reporting; automated WhatsApp or SMS dispatch is not a live claim.",
    boundary: "Preserved for historical context only.",
  },
];

export const currentChangelog = changelog.filter((entry) => entry.stage === "current");
export const historicalChangelog = changelog.filter((entry) => entry.stage === "historical");
