import type { Comparison } from "./types";

export const carestream: Comparison = {
  slug: "carestream",
  competitor: "Carestream",
  metaTitle: "Oralstack vs Carestream Dental",
  metaDescription:
    "An honest, side-by-side comparison of Oralstack and Carestream Dental (SoftDent / OrthoTrac plus imaging hardware) — sensor lock-in, multi-vendor flexibility, hosting, and where each is the right call.",
  indexOneLine: "Sensor-neutral PMS vs imaging-hardware-led PMS.",
  indexBlurb:
    "Carestream Dental ships imaging hardware plus PMS (SoftDent, OrthoTrac). The comparison covers sensor lock-in, hosting, and the PMS-first vs hardware-first product shape.",
  pageTitle: "Oralstack vs Carestream Dental.",
  lede: "Carestream Dental is one of the strongest names in dental imaging hardware — sensors, panoramic units, CBCT — and ships PMS products (SoftDent, OrthoTrac) tightly tuned for that hardware. Oralstack inverts the relationship: the PMS is the centre of gravity, and the sensor bridge sits across vendors so you're not locked to one imaging brand. Here's what differs, line by line.",
  rows: [
    {
      capability: "Product family",
      them: "Carestream Dental ships imaging hardware (sensors, panoramic, CBCT) plus PMS products — SoftDent for general dentistry, OrthoTrac for orthodontics. Hardware is the centre of gravity.",
      us: "Software-only. PMS plus a sensor-bridge integration layer that works across vendor brands.",
    },
    {
      capability: "Imaging integration",
      them: "Tightest with Carestream sensors and CBCT units. Other-brand sensors integrate via plugins of varying quality.",
      us: "DICOM viewer in the patient chart, native. Sensor-bridge integration across Carestream, Dexis, Sopro, Schick — equal-footing across vendors.",
    },
    {
      capability: "Schedule & front desk",
      them: "Functional scheduling tied to PMS. UI evolves slowly; the strength is imaging, not scheduling.",
      us: "Drag-driven schedule built as the front-desk's primary tool. Reschedule in three seconds, timezone-correct.",
    },
    {
      capability: "Charting",
      them: "Tooth-charting and clinical notes; integration to imaging via the chart timeline is a Carestream strength.",
      us: "FDI charting with surface-specific notes (M/D/B/L/O) and per-procedure templates. Imaging in the chart natively.",
    },
    {
      capability: "Billing",
      them: "Per-region billing models, with US-style claims handling in some configurations. Less standardised globally.",
      us: "Discharge-flow billing for APAC fee-for-service. Singapore GST and insurance models built in.",
    },
    {
      capability: "Sensor lock-in",
      them: "Best experience requires Carestream-brand sensors. Switching sensor vendor mid-life can mean re-doing imaging integration.",
      us: "Sensor-vendor neutral. Bring your existing sensors; we don't sell hardware.",
    },
    {
      capability: "Hosting",
      them: "On-prem deployment is the default for SoftDent. Cloud options exist but are not the primary delivery model.",
      us: "Cloud-native, region-hosted in Singapore (asia-southeast1) on Google Cloud. Tenant-isolated by default.",
    },
    {
      capability: "Multi-location",
      them: "Possible with multi-database setups; clinic-by-clinic install pattern.",
      us: "Tenant-isolated SaaS. Multi-clinic owners see all locations under one login at flat $200/clinic/month.",
    },
    {
      capability: "Updates",
      them: "Manual or rep-assisted. Imaging firmware updates are coordinated separately from PMS updates.",
      us: "Continuous deployment for the PMS. All clinics on the same version every week.",
    },
    {
      capability: "Pricing model",
      them: "Software pricing varies by region, often bundled with imaging hardware purchases.",
      us: "Flat $200 / clinic / month during pilot. No bundling with hardware.",
    },
    {
      capability: "APAC fit",
      them: "Carestream Dental does have APAC presence, particularly in imaging. PMS support is more variable.",
      us: "APAC-first PMS. Singapore-region hosting, PDPA-aware, GST-aware billing, WhatsApp Business API for recall.",
    },
  ],
  reasons: [
    {
      eyebrow: "Why we built differently · 1",
      title: "Sensor-brand neutrality beats sensor-brand lock-in.",
      body: "A clinic that buys Carestream's PMS naturally tilts toward Carestream sensors — the integration is best there. Oralstack does the opposite: a single sensor-bridge that talks to Carestream, Dexis, Sopro, and Schick equally. You bring whatever sensors you've already invested in, and you can replace them later without re-doing the PMS integration.",
    },
    {
      eyebrow: "Why we built differently · 2",
      title: "A PMS-first product beats a hardware-first product.",
      body: "The bulk of clinic time isn't spent on imaging — it's spent on scheduling, patient calls, billing, and recall. We built Oralstack with the PMS as the centre of gravity and imaging as one of six workflows that lives inside it. That trade-off favours the front desk and the practice manager more than the radiology-heavy specialty.",
    },
    {
      eyebrow: "Why we built differently · 3",
      title: "Region-hosted SaaS beats on-prem PMS with bolted-on cloud.",
      body: "SoftDent's primary delivery model is on-prem, with cloud and remote-access add-ons. Oralstack is region-hosted in Singapore from day one, with Postgres row-level security and audit logs as the baseline — not a configuration you opt into.",
    },
  ],
  concession: {
    title: "Where Carestream is the right call",
    intro: "We're not the right answer for every clinic.",
    bullets: [
      "If your practice is heavily imaging-led — a CBCT-driven oral surgery or implant practice — Carestream's vertical integration of sensor → CBCT → PMS is genuinely best-in-class for that path.",
      "If you're an orthodontic clinic specifically, OrthoTrac has decades of ortho-specific workflow tooling we don't replicate.",
      "If you're standardising on Carestream hardware across a chain and want a single vendor for imaging plus PMS, the integration story will be tighter with their PMS than with ours.",
    ],
  },
  cta: {
    title: "See it on your clinic's data.",
    body: "A 30-minute walkthrough showing the DICOM-in-chart workflow on your existing Carestream (or Dexis, Sopro, Schick) sensors, without changing your imaging hardware.",
  },
};
