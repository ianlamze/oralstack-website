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
    title: "v13 imaging cohort kickoff.",
    body: "DFI Synergy is the first clinic to run the DICOM viewer in production. Sensor-bridge scaffolding ships in the same release.",
  },
  {
    date: "2026-04-22",
    type: "Fix",
    title: "Drag-to-reschedule timezone correctness.",
    body: "Reschedules in clinic-local timezone (Asia/Singapore default) now commit in local time, not UTC. Previously a 10:00 → 09:30 SGT drag could commit as 01:30 UTC, dropping outside the visible day window on reload.",
  },
  {
    date: "2026-04-21",
    type: "Branch",
    title: "v13 forked from v12.1.",
    body: "Clinical imaging is the v13 release line: DICOM viewer + sensor-bridge scaffolding. Every v13 change is tagged with a `v13` comment in commits.",
  },
  {
    date: "2026-04-20",
    type: "Fix",
    title: "Schedule grid layout — appointment column placement.",
    body: "Appointment overlay columns were claiming rows 2–24 in cols 2–N via explicit grid-row, pushing every auto-placed slot cell into the time gutter. Fixed by giving every slot cell + gutter explicit grid placement.",
  },
  {
    date: "2026-04-20",
    type: "Feature",
    title: "Dedicated /schedule/new booking flow.",
    body: "Add-patient-to-calendar form with existing-patient search and new-patient inline registration. Mirrors the retired Plato booking form field-for-field for migrating clinics.",
  },
  {
    date: "2026-04-20",
    type: "Sweep",
    title: "v12.1 performance and correctness pass.",
    body: "Whole-codebase pass: data-access caching, client re-render minimisation, dead-code prune. No feature regressions.",
  },
  {
    date: "2026-04-15",
    type: "Architecture",
    title: "Tenant context flip across all API handlers.",
    body: "Every /api/** handler now runs inside `runWithAuth(roles, handler)`. Tenancy features ship: registry, provisioning, offboarding, onboarding wizard, platform-operator role, tenant-scoped dashboards. 60 suites / 670 tests green.",
  },
  {
    date: "2026-04-08",
    type: "Feature",
    title: "Postgres shadow with Row-Level Security policies.",
    body: "Local JSON remains source of truth; Postgres is a read accelerator gated on DATABASE_URL. Every table has a `tenant_id` column with RLS policies enforcing isolation in the database layer.",
  },
  {
    date: "2026-03-21",
    type: "Compliance",
    title: "SingPass integration scaffolding.",
    body: "Identity verification path for Singapore deployments. Documented in the SingPass integration runbook.",
  },
  {
    date: "2026-03-15",
    type: "Feature",
    title: "Recall candidate analyzer.",
    body: "Patients due for hygiene six months out surface three weeks before due, sorted by recall age. Powers the front-desk recall workflow.",
  },
];
