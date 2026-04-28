import type { Comparison } from "./types";

export const dentrix: Comparison = {
  slug: "dentrix",
  competitor: "Dentrix",
  metaTitle: "Oralstack vs Dentrix",
  metaDescription:
    "An honest, side-by-side comparison of Oralstack and Dentrix (and Dentrix Ascend) — deployment model, US insurance, multi-clinic, imaging, pricing, and where each is the right call.",
  indexOneLine: "APAC-first SaaS vs US-rooted Henry Schein PMS.",
  indexBlurb:
    "Dentrix is category-defining for US dental practices. The comparison covers US-payer rails, multi-location pricing, deployment models, and APAC fit.",
  pageTitle: "Oralstack vs Dentrix.",
  lastReviewed: "April 2026",
  lede: "Dentrix is a category-defining dental practice management system — mature, US-rooted, and excellent at US-payer claims. Oralstack is designed for APAC dental practices that want region-hosted data, flat pricing, and workflows tuned for fee-for-service rather than insurance-claims rails. Here's what changes, line by line.",
  rows: [
    {
      capability: "Deployment",
      them: "Two products. Dentrix (on-prem Windows) is the dominant one; Dentrix Ascend is the newer cloud SaaS.",
      us: "Cloud-native, browser-based on any device. One product, one version, region-hosted in Singapore.",
    },
    {
      capability: "Schedule UX",
      them: "Mature, dense. Reschedules typically use modal dialogs and form-based flows accumulated over two decades.",
      us: "Drag-driven. Move a 10:00 to 14:00 in three seconds; commits are timezone-correct on reload.",
    },
    {
      capability: "Find next available slot",
      them: "Smart Scheduling available via third-party (Yapi); native Appointment Book is calendar-grid scan.",
      us: "Type 'endo, 60 min, Dr. Lim' and see the next three openings ranked by earliest. One query, no calendar scanning.",
    },
    {
      capability: "Patient self-booking",
      them: "Online Booking sits inside the Patient Engage Suite — separate paid subscription on top of Dentrix.",
      us: "Included — no separate Patient Engage subscription. Bookings commit straight into the schedule, not bolted on through a module.",
    },
    {
      capability: "Charting",
      them: "Tooth chart with treatment-coded fills, perio chart, free-text and structured notes per visit.",
      us: "FDI numbering with surface-specific notes (M/D/B/L/O) and per-procedure templates editable per visit.",
    },
    {
      capability: "Billing",
      them: "Strong claims engine, EOB import, X12 837/835. Built around US payer rails.",
      us: "Discharge-flow billing tuned to APAC fee-for-service. Treatment lines pull from chart automatically; insurance and patient portion stay structurally separate. No US claims rails.",
    },
    {
      capability: "Imaging",
      them: "Dentrix Imaging Center plus third-party bridge plugins for sensor brands. Quality varies per integration.",
      us: "DICOM viewer in the patient chart, native. Sensor-bridge integration across Carestream, Dexis, Sopro, Schick.",
    },
    {
      capability: "Multi-location / DSO",
      them: "Dentrix Enterprise is a separate product line for multi-location operators. Pricing scales steeply.",
      us: "Tenant-isolated SaaS by default. Multi-clinic owners see all locations under one login at the same flat $200/clinic/month.",
    },
    {
      capability: "Hosting & data residency",
      them: "On-prem (Dentrix) or US-hosted (Ascend). Singapore data residency requires custom arrangements.",
      us: "Singapore region (asia-southeast1) on Google Cloud. Tenant-isolated, audit-logged, PDPA-aware by design.",
    },
    {
      capability: "Updates",
      them: "Dentrix on-prem: manual upgrades scheduled by the clinic. Ascend: managed cloud updates.",
      us: "Continuous deployment. Every clinic is on the same version every week.",
    },
    {
      capability: "Pricing",
      them: "Premium. Dentrix typically ranges from US$8K–$12K per practice per year for on-prem licence + support; Ascend is per-provider subscription.",
      us: "Flat $200 / clinic / month during pilot. No per-seat or per-feature charges.",
    },
    {
      capability: "Sales motion",
      them: "Sold through Henry Schein and certified reseller network. Local rep relationships are part of the deal.",
      us: "Direct-to-clinic. The engineer building the product is on the demo and the onboarding call.",
    },
    {
      capability: "APAC presence",
      them: "Limited APAC support. Most resellers and trainers are US/Canada-based.",
      us: "APAC-first. Singapore-region hosting, PDPA-aware, GST-aware billing model, WhatsApp Business API for recall.",
    },
  ],
  reasons: [
    {
      eyebrow: "Why we built differently · 1",
      title: "APAC-first beats US-first for APAC practices.",
      body: "Dentrix is built around US payer rails — X12 claims, EOB imports, ANSI 837/835. That's enormous value if you're a US practice. It's overhead if you're a Singapore clinic running fee-for-service with optional Singapore insurance. Oralstack is the opposite: built around Singapore GST, Singapore-specific insurance flows, and APAC patient communication (WhatsApp Business API, region-routed).",
    },
    {
      eyebrow: "Why we built differently · 2",
      title: "Flat clinic pricing beats per-provider subscriptions.",
      body: "A 3-chair, 4-provider clinic on Dentrix Ascend pays per-provider fees that compound as the clinic grows. Dentrix on-prem adds licence + maintenance + support tiers. Oralstack ships flat: $200 per clinic per month during pilot, with three months of hands-on onboarding included. No per-seat charges, no per-feature gating, no upsell tiers.",
    },
    {
      eyebrow: "Why we built differently · 3",
      title: "One product beats two product lines.",
      body: "Dentrix and Dentrix Ascend share branding but are different products with different capabilities, different hosting, and different pricing. Migrating between them is a project. Oralstack is one product, one version, deployed continuously — so the demo you saw is the product you get, and next week's product is the same one with one more thing fixed.",
    },
  ],
  concession: {
    title: "Where Dentrix is the right call",
    intro: "We're not the right answer for every clinic.",
    bullets: [
      "If your practice is in the US and your revenue depends on insurance claims processing — X12, EOB import, ERA reconciliation — Dentrix is purpose-built for that workflow. We are not.",
      "If you're a multi-location DSO already standardised on Henry Schein supplies and the rep relationship is part of the deal, Dentrix Enterprise integrates with that supply-chain workflow.",
      "If you want a vendor with thousands of US-trained certified consultants and decades of training material, Dentrix has more of both than any APAC PMS — including us.",
    ],
  },
  cta: {
    title: "See it on your clinic's data.",
    body: "A 30-minute walkthrough on a sample dataset matched to your clinic's shape. We'll show what changes day-one and what onboarding from a US-shape PMS looks like in APAC.",
    sideLink: {
      label: "Read the security posture →",
      href: "/security",
    },
  },
};
