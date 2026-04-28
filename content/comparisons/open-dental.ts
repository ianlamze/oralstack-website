import type { Comparison } from "./types";

export const openDental: Comparison = {
  slug: "open-dental",
  competitor: "Open Dental",
  metaTitle: "Oralstack vs Open Dental",
  metaDescription:
    "An honest, side-by-side comparison of Oralstack and Open Dental — license, hosting, UX, customisation, imaging, APAC compliance, and where each is the right call.",
  indexOneLine: "Managed APAC SaaS vs free-license self-hosted.",
  indexBlurb:
    "Open Dental is mature, free to license, and US-rooted. The comparison covers self-hosted vs managed, APAC compliance, US-insurance fit, and customisability.",
  pageTitle: "Oralstack vs Open Dental.",
  lastReviewed: "April 2026",
  lede: "Open Dental is mature, feature-complete, and free to license — a legitimate option for clinics with IT capacity and a US-style insurance workflow. Oralstack is a managed SaaS designed for APAC dental practices that want fast onboarding, region-hosted data, and opinionated workflows rather than a configuration project. Here's what differs, line by line.",
  rows: [
    {
      capability: "License & cost",
      them: "Free open-source license. Paid support tiers, plus IT and hosting costs you cover.",
      us: "Flat $200 / clinic / month during pilot. Includes hosting, three months of onboarding, and a named contact.",
      source: "https://www.opendental.com/site/pricing.html",
    },
    {
      capability: "Hosting",
      them: "Self-hosted on your own server, or hosted with a third-party Open Dental partner.",
      us: "Managed SaaS, region-hosted in Singapore (asia-southeast1) on Google Cloud. Tenant-isolated by default.",
      source: "https://www.opendental.com/manual/installation.html",
    },
    {
      capability: "UX",
      them: "Mature and feature-rich, with a Windows-leaning interface and dense menu structure built up over two decades.",
      us: "Web-native, opinionated workflows. Designed for the front-desk drag-and-drop pace, not for menu hunting.",
    },
    {
      capability: "Customisation",
      them: "Highly customisable. Custom reports, queries, and workflows are possible with SQL and DIY effort.",
      us: "Opinionated workflows aligned to six job-to-be-done flows. Less malleable, faster to land on.",
      source: "https://opendental.com/site/sourcecode.html",
    },
    {
      capability: "US insurance billing",
      them: "Strong. Claims, EOB import, X12 837/835, well-suited to US practices.",
      us: "Out of scope. Built around APAC fee-for-service and Singapore insurance models, not US payer rails.",
    },
    {
      capability: "APAC compliance",
      them: "No specific Singapore PDPA stance. Compliance is the operator's responsibility.",
      us: "PDPA-aware by design. Data residency in Singapore, tenant isolation via Postgres row-level security, audit logs by default.",
    },
    {
      capability: "Imaging",
      them: "Sensor bridge plugins per vendor. Quality and stability vary by integration.",
      us: "DICOM viewer in the patient chart. Sensor-bridge integration across Carestream, Dexis, Sopro, Schick.",
    },
    {
      capability: "Updates",
      them: "Manual upgrades. You schedule downtime, run the upgrade, verify on your environment.",
      us: "Continuous deployment. All clinics on one version every week.",
    },
    {
      capability: "Multi-clinic",
      them: "Possible with multi-database setup; requires careful planning and DBA familiarity.",
      us: "Tenant-isolated SaaS. Multi-clinic consolidation in one login, no DB ops.",
    },
    {
      capability: "Setup time",
      them: "Hours to days of IT work to install, configure, and train staff.",
      us: "30-minute demo, pilot proposal in two working days, three weeks to live.",
    },
    {
      capability: "Community & support",
      them: "Large, active, US-skewed forum and developer community. Self-serve learning.",
      us: "Direct access to the engineering team. APAC-skewed, smaller but hands-on.",
    },
  ],
  reasons: [
    {
      eyebrow: "Why we built differently · 1",
      title: "Managed SaaS beats self-hosted for most clinics.",
      body: "Open Dental's freedom to self-host is real. So is the IT load: you provision the server, schedule upgrades, run backups, manage Windows updates, monitor uptime. For most APAC dental practices, that is a job nobody on the team wants. Oralstack runs the infrastructure so the clinic runs the clinic — region-hosted in Singapore, tenant-isolated, with continuous deployment so you don't schedule downtime to upgrade.",
    },
    {
      eyebrow: "Why we built differently · 2",
      title: "Opinionated workflows beat configuration projects.",
      body: "Open Dental is configurable to almost any practice. That power is also its cost: getting from install to fluent use takes weeks of staff time. Oralstack ships with six opinionated workflows — front desk, billing, charting, imaging, recall, operations — built around the jobs busy clinics actually run. Less malleable, faster to land on, and easier to keep consistent across multi-location operators.",
    },
    {
      eyebrow: "Why we built differently · 3",
      title: "APAC compliance is built in, not configured in.",
      body: "Open Dental was built around the US dental market — strong on X12 claims, EOB imports, US-payer rails. We built Oralstack around Singapore and APAC dental practices: data residency in asia-southeast1, tenant isolation via Postgres row-level security, audit logs by default, and a tax model that fits Singapore GST. PDPA isn't a feature flag; it's the model.",
    },
  ],
  concession: {
    title: "Where Open Dental is the right call",
    intro: "We're not the right answer for every clinic.",
    bullets: [
      "If you have IT capacity (or a partner) and want to avoid monthly software fees, Open Dental's license model is hard to beat.",
      "If your clinic operates on US-payer rails — X12 claims, EOB imports, ANSI 837/835 — Open Dental is built around that. We are not.",
      "If you want highly customisable software you can extend with SQL, custom reports, and your own workflows, Open Dental gives you that. Oralstack is intentionally opinionated.",
      "If self-hosting is a sovereignty requirement (defence, government), self-hosted Open Dental fits a constraint that managed SaaS does not.",
    ],
  },
  cta: {
    title: "See it on your clinic's data.",
    body: "A 30-minute walkthrough on a sample dataset that matches your size. We'll show what changes day-one and what the three-week onboarding looks like.",
    sideLink: {
      label: "Read the security posture →",
      href: "/security",
    },
  },
};
