import type { Comparison } from "./types";

export const eaglesoft: Comparison = {
  slug: "eaglesoft",
  competitor: "Eaglesoft",
  metaTitle: "Oralstack vs Eaglesoft",
  metaDescription:
    "An honest, side-by-side comparison of Oralstack and Eaglesoft — deployment, billing model, multi-clinic support, integrations, APAC fit, and where each is the right call.",
  indexOneLine: "Direct-to-clinic vs Patterson rep-mediated PMS.",
  indexBlurb:
    "Eaglesoft is Patterson Dental's PMS. The comparison covers sales motion, sensor-vendor neutrality, on-prem vs region-hosted, and APAC presence.",
  pageTitle: "Oralstack vs Eaglesoft.",
  lede: "Eaglesoft is Patterson Dental's practice management system — mature, US-rooted, and a strong fit for clinics already inside the Patterson supply-chain. Oralstack is built for APAC dental practices that want region-hosted data, direct-to-clinic support, and pricing that doesn't scale with seat count. Here's what differs, line by line.",
  rows: [
    {
      capability: "Deployment",
      them: "Windows desktop client per workstation, with Patterson-managed cloud backup options. Server-based deployment for multi-station clinics.",
      us: "Cloud-native, browser-based on any device. One product, one version, region-hosted in Singapore.",
    },
    {
      capability: "Schedule UX",
      them: "Mature scheduling with appointment book, family scheduling, and recall integration. Form-based at its core.",
      us: "Drag-driven. Reschedule in three seconds; commits are timezone-correct on reload; provider columns render dynamically.",
    },
    {
      capability: "Find next available slot",
      them: "Calendar-grid scan. Procedure/duration filtering varies by version.",
      us: "Type 'endo, 60 min, Dr. Lim' and see the next three openings ranked by earliest. One query, no calendar scanning.",
    },
    {
      capability: "Patient self-booking",
      them: "Patient self-booking via partner integrations (e.g. Vyne Trellis Patient Portal); not native to Eaglesoft.",
      us: "Native to Oralstack — one tool, one bill, one schedule of record.",
    },
    {
      capability: "Billing",
      them: "Strong US insurance workflow — eClaims, EOB import, fee schedules, ledger reconciliation. ANSI 837/835 native.",
      us: "Discharge-flow billing for APAC fee-for-service. Treatment lines pull from the chart automatically; Singapore GST and insurance models built in.",
    },
    {
      capability: "Charting",
      them: "Tooth charting, perio, structured procedure codes. Tied tightly to billing through Patterson's data model.",
      us: "FDI charting with surface-specific notes (M/D/B/L/O) and per-procedure templates editable per visit. Direct write-back to billing.",
    },
    {
      capability: "Imaging",
      them: "Patterson Imaging integration is the primary path. Sensor support strongest with Patterson-distributed brands.",
      us: "DICOM viewer in the patient chart, native. Sensor-bridge integration across Carestream, Dexis, Sopro, Schick — sensor-brand neutral.",
    },
    {
      capability: "Multi-location",
      them: "Multi-location support requires Eaglesoft Anywhere or custom configurations. Often a separate licence path.",
      us: "Tenant-isolated SaaS by default. Multi-clinic owners see all locations under one login.",
    },
    {
      capability: "Sales & support",
      them: "Sold and supported through Patterson Dental rep network. Implementation typically goes through your local Patterson office.",
      us: "Direct-to-clinic. The engineer building the product is on the demo and onboarding call.",
    },
    {
      capability: "Hosting & data residency",
      them: "On-prem; data sits on the clinic's server. Cloud backup is opt-in and US-region.",
      us: "Singapore region (asia-southeast1) on Google Cloud. Tenant-isolated, audit-logged, PDPA-aware by design.",
    },
    {
      capability: "Updates",
      them: "Manual or rep-assisted upgrades. Different clinics often run different Eaglesoft versions for months.",
      us: "Continuous deployment. Every clinic is on the same version every week.",
    },
    {
      capability: "Pricing",
      them: "Premium, sold via Patterson reps with maintenance and support tiers. Bundled with hardware in some deals.",
      us: "Flat $200 / clinic / month during pilot. No per-seat charges, no bundling, no rep markup.",
    },
    {
      capability: "APAC presence",
      them: "Limited. Patterson Dental's footprint is heavily US/Canada.",
      us: "APAC-first. Singapore-region hosting, PDPA-aware, GST-aware billing, WhatsApp Business API for recall.",
    },
  ],
  reasons: [
    {
      eyebrow: "Why we built differently · 1",
      title: "Direct-to-clinic beats rep-mediated sales.",
      body: "Eaglesoft is sold through Patterson Dental reps. That works when the rep is good — they handle the install, the training, the upgrades. It also adds a layer between the clinic and the engineering team. With Oralstack, the engineer who wrote the schedule is the person on your demo, and the person on the support call when you find the edge case at 4pm on a Tuesday.",
    },
    {
      eyebrow: "Why we built differently · 2",
      title: "Sensor-brand neutral beats vendor-locked imaging.",
      body: "Eaglesoft's imaging path is strongest with Patterson-distributed sensors. If you bought your sensors from someone else, integration is workable but second-class. Oralstack integrates with the four common sensor families equally — Carestream, Dexis, Sopro, Schick — through a single sensor-bridge model. Bring whatever sensors you have.",
    },
    {
      eyebrow: "Why we built differently · 3",
      title: "Region-hosted SaaS beats on-prem with optional cloud backup.",
      body: "Eaglesoft's data lives on a Windows server at the clinic. Cloud backup is opt-in and US-region. For Singapore PDPA — which expects continuous protection of patient records — that's a workable but careful arrangement. Oralstack is region-hosted in Singapore by default, tenant-isolated, audit-logged. Compliance is the model, not a configuration.",
    },
  ],
  concession: {
    title: "Where Eaglesoft is the right call",
    intro: "We're not the right answer for every clinic.",
    bullets: [
      "If you're a US practice with deep US-payer billing requirements, Eaglesoft's eClaims and EOB workflows are purpose-built. We are not.",
      "If your supply chain runs through Patterson Dental and the rep relationship is part of how your clinic operates, Eaglesoft fits that workflow naturally.",
      "If you want a vendor with three decades of US dental-market presence and an established certified-consultant network, Eaglesoft has both at scale we don't.",
    ],
  },
  cta: {
    title: "See it on your clinic's data.",
    body: "A 30-minute walkthrough on a sample dataset matched to your clinic's shape, with a real engineer on the call and a pilot proposal within two working days.",
  },
};
