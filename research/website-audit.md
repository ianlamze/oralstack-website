# oralstack.com — Competitive Marketing Site Teardown

**Date:** 2026-04-27
**For:** Dentologic (working website domain: oralstack.com) — modern, multi-tenant dental clinic OS, APAC-first.
**Method:** Live homepage fetches against 9 sites — 6 dental category (Dentrix Ascend, Curve, Pearly, NovaDontics, Dental Intelligence, Tebra), 1 adjacent vertical (Jane), 2 premium-SaaS aesthetic references (Linear, Attio).
**Gaps:** Toast and Square restaurant-POS pages were anti-bot blocked; restaurant-vertical comparison is omitted. Cloud9 (target #3) was unreachable and was swapped for Dental Intelligence as a more modern, marketing-savvy dental competitor.

This is reference material for the eventual oralstack.com build. It is intentionally specific — verbatim copy and named visual treatments — so positioning and design decisions can be defended against actual competitors rather than imagined ones.

---

## 1. Per-site teardowns

### 1.1 Dentrix Ascend — `dentrixascend.com`

**Hero.** Headline: *"One Simple System for a Smarter, Safer, Growing Practice."* Subhead leads with *"all-in-one dental practice management system"* and lists scheduling/billing/imaging/communication/analytics. Primary CTA *"See How Ascend Works"* → demo form. Secondary *"Why Switch to Ascend?"* — telling: their secondary CTA is a defensive comparison, suggesting most traffic is shopping replacements.

**Proof.** Strongest in the dental set: *"80k+ clinicians,"* *"66M+ recare reminders annually,"* *"83% insurance claims processed annually through Ascend."* Three named testimonials. SOC 2 + HIPAA mentioned in body copy, no badges visible.

**Pricing.** No nav link, none on homepage. Demo-gated.

**Voice.** Triggers every brand-wiki audit rule: "all-in-one," "seamless," "connected," "effortlessly." Tone is incumbent-corporate.

**Steal:** the three-stat trust block (volume + reminders + claims share). **Avoid:** the headline — it's been written 50 times in this category.

---

### 1.2 Curve Dental — `curvedental.com`

**Hero.** Headline: *"#1 Ranked Cloud-Based Dental Software."* Subhead: *"An elevated experience for your patients. A more efficient and profitable experience for you."* Primary CTA *"Schedule Demo"* (HubSpot tracking link). Secondary *"Watch Explainer Video."* Visual: lifestyle photo of dental professional with patient, then product carousel below the fold.

**Proof.** Strongest quantified-proof site in the set:
- *"Trusted by 80K+ Dental Professionals"*
- *"2,500 Successful Migrations This Year"*
- *"Up To 5x Returns / 20% Higher Collections / 25% More New Patients / 30% Better Case Acceptance"*
- Per-customer numbers: *"$4,583 increase in new patient revenue,"* *"3.5X faster charting,"* *"$30K saved on imaging,"* *"90% reduction in IT expenses."*
- 9 named customer videos, 3 named text testimonials with 5-star ratings.

This is a masterclass in proof density — it's the bar to clear in dental category.

**Pricing.** Pricing link is buried under "Knowledge Hub" — not top-level. Not on homepage.

**Voice.** "All-in-one" used as section title ("All Your Needs. One Solution"). "Reshaped" / "transformed" pepper testimonials. But the numbers do real work — claims feel earned.

**Steal:** the migration counter ("2,500 successful migrations this year") — concrete, recurring, and answers the unspoken switching-cost objection. **Avoid:** the lifestyle-photo-of-dentist hero. Generic stock-feeling.

---

### 1.3 Cloud9 *(swap → Dental Intelligence — `dentalintel.com`)*

**Hero.** Headline: *"Practice Smarter.™ Intelligently Shape the Future of Your Practice."* Subhead: *"Save time, grow your practice and create an ideal patient experience."* Primary *"Get a Demo"* + secondary *"Sign up for free."* Visual: laptop mockup with dashboard.

**Proof.** *"over 9,000 practices nationwide,"* 7 named testimonials with practice attribution. No security/compliance badges. No customer logos.

**Pricing.** No nav link, none on homepage.

**Voice.** Best dental-noun density in the set: *"operatory," "production per visit," "morning huddles," "unscheduled treatment," "claims processing."* This is what audit-passing dental copy reads like. Generic phrases ("actionable insights," "comprehensive overview") still leak in.

**Demo flow.** The form asks for name/email/phone/location-count/current PMS/mailing address — and offers a $50 gift card to complete it. That's a tell that the form is too long; the gift card is a known compensating tactic.

**Steal:** the dental-specific noun palette — *operatory, huddle, production* land harder than generic verbs. **Avoid:** trademarked tagline ("Practice Smarter.™") — looks 2014.

---

### 1.4 Pearly — `pearly.co`

**Hero.** Headline: *"Smart Billing for Smart Practices."* Subhead: *"Accelerate cash flow with automated patient billing, A/R collection, and payment plans."* Primary CTA *"Book Live Demo"* → `/demo`. Visual: product screenshot + mobile mockup of billing UI.

**Proof.** Most concrete per-customer numbers in the dental set:
- 9 named DSO/group customer logos (Smile Partners, Riccobene Associates, etc.)
- *"33% average increase in collection rate,"* *"65% reduction in staff time on billing,"* *"1.6M+ patient statements monthly,"* *"2.1K+ dental offices."*
- Named case-study results: *"$1.1M collected in first 45 days"* (Smile Partners), *"$950K net reduction"* (Lumio).
- HIPAA + PCI compliance badges in footer.

**Pricing.** Pricing link **top-level in nav** (`/pricing`) — rare in this category. Not displayed on homepage.

**Voice.** The cleanest in the set. Real RCM nouns: *"A/R collection," "patient portion," "aging A/R balances," "write-off risk."* Some leakage ("seamlessly integrate," "actionable insights") but small.

**Steal:** narrow positioning. They're not "all-in-one" — they're billing. The hero says exactly what they do in five words. Also: pricing as a top-level nav item is a trust signal in a category that hides it. **Avoid:** "Smart X for Smart Y" headline construction — clever-sounding, says nothing.

---

### 1.5 NovaDontics — `novadontics.com`

**Hero.** Headline: *"Manage Everything Your Practice Needs with a Single Cloud-Based Platform."* Subhead leans hard on *"true all-in-one platform that cuts through the clutter of multiple subscriptions"* — a shot at horizontal stacks. Primary *"Schedule a Demo"* via HubSpot calendar.

**Proof.** 12 named clinic logos, 4 named DDS testimonials, *"$100K Collected Through Text-to-Pay"* (qualified as average), *"20 hours a month"* time savings, HIPAA badge. 9 integration-partner logos (HDX, Zest, Piezosurgery, etc.) — this is the most credentialed dental-specific integration block in the set.

**Pricing.** "Pricing" in top nav with "Plans" submenu — same transparency as Pearly.

**Voice.** Best clinical-language density of any: *"implant logbook," "ASA status," "ISQ," "bone density," "diagnostic suite."* This is implant-clinic targeting telegraphed through the word choice. Generic SaaS still creeps in.

**Steal:** the integration-partner logo strip — concrete proof of "we plug into your stack" without paragraphs of copy. **Avoid:** the headline. "Manage Everything" + "Single Cloud-Based Platform" is the most generic category construction possible.

---

### 1.6 Tebra — `tebra.com` *(adjacent: medical PMS, not dental)*

**Hero.** Headline: *"Run your entire practice with one EHR+ platform."* Subhead: *"Tebra's EHR+ platform connects care, billing, scheduling, and more. Built-in AI speeds up notes, handles reviews, and automates repetitive admin work."* Primary *"Get a demo"* → `/demo`. Secondary *"Take a quick tour"* → `/product-tour` — this is the **only site in the set with a self-serve product tour as a secondary CTA**, and it's a strong pattern.

**Proof.** Strongest compliance posture of any site teardown'd: HIPAA + HITRUST + AICPA + PCI logos. Trustpilot 4.6 + G2 4.1 ratings shown inline. *"Trusted by 150,000 providers."* Six named testimonials with practice/role attribution.

**Pricing.** "Pricing" top-level in nav (the medical-PMS norm).

**Voice.** *"Electronic prescriptions," "MACRA/MIPS support," "HIPAA-compliant two-way messaging," "Real-time insurance eligibility."* Vertical-specific. Generic line ("One platform. Every workflow.") used sparingly as a section title.

**Steal:** (a) the *product-tour-as-secondary-CTA* pattern — gives self-serve traffic a path that doesn't require talking to sales; (b) the four-badge compliance row (HIPAA + HITRUST + AICPA + PCI) — table-stakes in healthcare and immediately settles trust; (c) third-party review scores (Trustpilot, G2) shown inline — answers "is this real" without case studies. **Avoid:** "EHR+" as a category coinage — no one searches for it.

---

### 1.7 Jane — `jane.app` *(adjacent: multi-discipline clinic PMS)*

**Hero.** Headline: *"Book, chart, schedule, invoice, process payments, and run your whole practice online."* Subhead: *"Jane offers online booking, charting, scheduling, secure video and invoicing on one secure, beautifully designed system."* Primary CTA *"Sign up"* → `/start` (free signup, no demo gate). Secondary *"Compare Plans"* → `/pricing`. Visual: actual screenshot of Jane's schedule view with telehealth/in-person/group session blocks.

**Proof.** Lighter than the dental set on quantified proof (no big numbers visible above the fold), but compensates with named customer testimonial (Sue Shalanski, Reach Physio, Squamish BC) and explicit data-residency disclosure (USA/Canada/UK/Australia regional storage). The data-residency claim is a quiet trust move.

**Pricing.** Top-level nav. Self-serve sign-up with priced tiers visible.

**Voice.** Warmest in the set. *"Ridiculously easy," "whoosh"* alongside *"physios, massage therapists, counsellors, midwives."* Conversational without losing clinical specificity. The verb stack in the headline (*"Book, chart, schedule, invoice, process payments"*) is the strongest single sentence I read across all 9 sites — it tells you exactly what you can do without any abstraction.

**Pricing model.** *"Based on the number of practitioners in your clinic"* — explicit and fair.

**Steal:** (a) the **verb-stack headline** — listing the actual jobs you do is more persuasive than naming the category; (b) **self-serve signup as primary CTA** — radical in this category, signals "we're confident, just try it"; (c) regional data-residency disclosure as a passive trust signal. **Avoid:** the casual interjections ("whoosh") would clash with Dentologic's "premium / clinical" positioning — borrow the verb stack, drop the cuteness.

**Jane is the closest reference for oralstack's ICP, voice, and conversion model.** Recommend treating it as the primary benchmark.

---

### 1.8 Linear — `linear.app` *(aesthetic reference)*

**Hero.** Headline: *"The product development system for teams and agents."* Subhead: *"Purpose-built for planning and building products. Designed for the AI era."* Primary CTA: *"Issue tracking is dead"* → `/next` — this is a **provocation, not a CTA verb.** Visual: three product-screenshot images in sequence (workspace, inbox, projects).

**Nav.** Product / Resources / Customers / Pricing / Now / Contact / Docs / Open app / Log in / Sign up. *"Now"* is unusual — it's a changelog/status surface.

**What to learn:** Linear's hero rejects every dental-PMS pattern. No verb-list. No proof numbers above the fold. No demo gate. The hero is **a category positioning statement plus product UI screenshots**, and that's it. This works because Linear has earned aesthetic reputation as proof. A new entrant cannot copy this directly — but the underlying move ("let the product UI be the hero visual, not stock photos or illustrations") is portable. The dental-PMS category uniformly hides product UI behind logos, lifestyle photos, or laptop mockups — that's the gap.

**Steal:** **product UI as the hero visual.** Show the actual app the way Linear does — multiple stitched screenshots, real data, real density. **Avoid:** the no-CTA-verb hero ("Issue tracking is dead") — works for Linear, won't work for an unknown entrant.

---

### 1.9 Attio — `attio.com` *(aesthetic reference)*

**Hero.** Headline: *"Attio is an AI-native CRM platform built for startups and builders, that lets startup teams unify customer data, automate workflows and build custom solutions to improve their operations."* Long, declarative — fits on a page that uses dense, table-style layouts throughout.

**Proof.** *"Over 80,000 startups trust Attio."* Customer names: Lovable, Coca Cola, Flatfile, Modal, Union Square Ventures, Replicate, Railway, Public.com, Plain. Two named testimonials including Modal: *"When I first opened Attio, I instantly got the feeling that this was the start of the next generation of CRM."*

**Pricing.** Four tiers (Free / Plus / Pro / Enterprise), all paid with 14-day trial. **Self-serve, transparent.**

**Voice.** Comparative positioning — explicitly references Salesforce, HubSpot, Zoho. Phrase: *"AI is structural: embedded in the data model, context layer and workflow engine from day one."* The word *"structural"* is the differentiator — it's making a category claim against retrofitted competitors.

**Steal:** (a) the **comparative positioning move** — name the legacy incumbents you're not (in dental: Dentrix, Eaglesoft, Open Dental); (b) **dense, information-rich layouts** — the dental category is full of card grids and whitespace; structured tables and feature comparisons are differentiating. **Avoid:** the long declarative hero — works for Attio's structured layout, won't work for an entrant that needs to earn attention in three seconds.

---

## 2. Cross-site patterns

### 2.1 Hero patterns — what the dental category does, and the gap

Every dental site in this teardown opened with one of two patterns:

1. **Category claim + verb list** (Dentrix Ascend, NovaDontics): *"All-in-one"* + scheduling/billing/imaging/etc. Indistinguishable from each other. Audit-failing on every brand rule.
2. **Outcome promise + lifestyle photo** (Curve, Dental Intelligence): *"#1 Ranked"* / *"Practice Smarter"* with stock-feeling photos of dentists.

**Pattern 3 — verb-stack-of-actual-jobs** (Jane) — is sitting empty in dental. *"Book, chart, schedule, invoice, process payments, and run your whole practice online"* tells you what the product does in nine concrete verbs. No dental site in the teardown does this. **This is the gap to take.**

**Pattern 4 — product-UI-as-hero** (Linear) — also empty. Every dental site uses laptop mockups, illustrations, or stock photos. None show the actual app at density.

### 2.2 Proof patterns — table-stakes vs differentiating

| Proof type | Dental category norm | Differentiating |
|---|---|---|
| Customer count | "X,000 practices" — universal | — |
| Numbered ROI claims | Curve sets the bar at ~7 metrics above the fold | Per-named-customer dollar figures (Pearly) |
| HIPAA badge | Universal, often footer-only | Multi-cert row (Tebra: HIPAA + HITRUST + AICPA + PCI) |
| Testimonials | 3-7 named, with practice attribution | Video case studies (Curve does 9) |
| Third-party reviews | Rare | Trustpilot/G2 inline (Tebra) |
| Migration / switching proof | Rare | "2,500 migrations this year" (Curve) |
| Integration-partner logos | Rare | NovaDontics' 9-logo strip |
| Data-residency disclosure | Rare | Jane's regional storage note (under-used trust signal for APAC) |

**Recommendation:** treat HIPAA + named customers + 3 testimonials as table-stakes. Differentiate with: (a) **APAC-specific compliance/data-residency claim** — Singapore PDPA, regional hosting; (b) **switching/migration proof** — even a small number ("12 clinics migrated from Plato in 2026") works because no one else says it; (c) **product UI density** at the hero.

### 2.3 Pricing transparency — the tell

| Site | Pricing in nav | On homepage |
|---|---|---|
| Dentrix Ascend | No | No |
| Curve Dental | Buried | No |
| Pearly | **Top-level** | No |
| NovaDontics | **Top-level** | No |
| Dental Intelligence | No | No |
| Tebra | **Top-level** | No |
| Jane | **Top-level** | Tiered |
| Linear | **Top-level** | Yes |
| Attio | **Top-level** | Yes |

**The dental incumbents (Dentrix Ascend, Dental Intelligence, partly Curve) hide pricing. The newer / more confident dental entrants (Pearly, NovaDontics, Tebra) put it in top-level nav. The premium-SaaS reference (Linear, Attio, Jane) shows actual numbers.**

For oralstack: **pricing in top-level nav is non-negotiable.** Whether the page itself shows numbers or "contact us" is a separate decision tied to the open question of self-serve vs. demo-gated. But hiding pricing aligns oralstack with the incumbents it's trying to displace.

### 2.4 Demo / conversion flow

Every dental site routes to a demo form. Tebra is the **only one** in the set with a self-serve product tour as a secondary CTA. Jane is the **only one** with self-serve signup as the *primary* CTA.

A serious objection: Jane's primary-CTA signup works because their product onboards solo practitioners. Dentologic's ICP (front desk + dentists + hygienists + manager, multi-tenant DSOs) is harder to self-serve. **Realistic recommendation:** demo-gated primary CTA, but pair with a Tebra-style product tour as a strong secondary CTA — a video walkthrough of the schedule, charting, and imaging surfaces. This gives the 70% of visitors who won't book a demo a way to understand the product.

### 2.5 Aesthetic — is the category dated?

Yes. Every dental site in the teardown uses one or more of: stock-feeling lifestyle photos, laptop mockups, gradient backgrounds, generic SaaS card grids, trademarked taglines (™), ROI-percent shouting. None demonstrate Linear/Attio-level craft. Tebra is the most polished but still corporate-medical. Pearly is the most modern dental-specific, but its product UI is presented as floating mockups, not at density.

**This is the strongest single argument for oralstack's design thesis.** A premium, dense, product-UI-led marketing site in dental would be visually unprecedented in the category — the audit's "premium / Linear-esque" goal is reachable because no competitor is contesting that ground.

---

## 3. Recommended blueprint for oralstack.com

Synthesizing the above into a defensible v1 structure. Each section maps to a specific borrowing from a specific competitor, so the design rationale is auditable.

### 3.1 Hero
- **Headline pattern:** verb-stack of actual jobs (Jane) — e.g., *"Book, chart, bill, image, message, and run a modern dental clinic."* Replace as needed once positioning is locked, but use this construction.
- **Subhead:** dental + APAC specificity in 1 sentence. No "all-in-one," no "seamless."
- **Primary CTA:** *"Book a demo"* (demo-gated is realistic for the ICP).
- **Secondary CTA:** *"Take the product tour"* (Tebra pattern) — links to a 60-90s product walkthrough video or interactive tour. Non-negotiable; this is what differentiates in a demo-gated category.
- **Hero visual:** **product UI at density** (Linear pattern) — actual schedule view + chart view + imaging view, real-feeling data, restrained motion. **Not** a laptop mockup. **Not** a lifestyle photo of a dentist. This is the single biggest aesthetic differentiator available to oralstack.

### 3.2 Trust strip (immediately below hero)
- Customer count as soon as it's defensible (start with the DFI Synergy pilot — a single named clinic is fine; *"Live at DFI Synergy"* with a logo beats a vague "trusted by clinics" line).
- Compliance row: **Singapore PDPA + HIPAA-equivalent + ISO 27001 (when applicable)** — borrow Tebra's multi-badge pattern, localize for APAC.
- *Optional:* Trustpilot/G2 once we have ratings. Skip until real.

### 3.3 Workflow proof (the body)
- One section per JTBD from the brand wiki, in priority order: front-desk booking → discharge & billing → patient chart → case notes → treatment logging.
- Each section: real product UI screenshot at the left, 2-3 sentences of dental-specific copy at the right. **One dominant visual idea per section** (per the brief). No card grids.
- Layout: take Attio's information-dense, table-style structuring and apply it to the workflow sections — not the hero.

### 3.4 Switching / migration block
- Pattern stolen from Curve. A counter or small bar: *"Migrated from Plato, Open Dental, Dentrix in 2026: N clinics."* Directly addresses the largest unspoken objection in the category. Empty until real, then add.

### 3.5 Pricing
- **Top-level nav.** Mandatory.
- Page itself: tiered, per-provider or per-clinic, decision deferred to positioning. At minimum show a starting price.

### 3.6 Footer / trust
- Data residency disclosure (Jane pattern, localized): *"Singapore-hosted; APAC data does not leave the region."* This is uniquely valuable for the APAC ICP and unmatched in the category.
- Compliance, security center link, status page.

### 3.7 What to actively avoid
- "All-in-one," "seamless," "supercharge," "unlock," "transform," "best-in-class" — all triggered the brand wiki's `copy.generic-saas-phrase` rule and are present in 5+ of the 9 teardown sites. Free differentiation on day one.
- Lifestyle stock photos of dentists.
- Laptop mockups.
- "#1 Ranked" / trademarked taglines.
- Decorative card grids in or near the hero.
- Hiding pricing.

---

## 4. Open questions surfaced by the teardown

These extend (rather than replace) the three open questions in `apps/website/brief.md`:

1. **Lead claim — pick one.** The brief listed five candidates (speed, imaging, WhatsApp, analytics, multi-tenant). The teardown suggests **imaging** is the strongest because (a) v13 is being built around it, (b) no dental competitor in the teardown leads with imaging, and (c) it's the named #1 APAC deal-blocker per CLAUDE.md. WhatsApp is a strong APAC second.
2. **ICP — pick one.** Pearly leads with DSOs/groups; Jane leads with multi-discipline solo/small clinics. The brand wiki lists three candidate segments — picking one will reshape proof, pricing, and demo flow. Recommend starting with **APAC clinics with imaging needs** because it aligns with #1 and the v13 product investment.
3. **Self-serve product tour — build it.** Tebra has the only self-serve secondary path in the dental-adjacent set. We should commit to building a 60-90s product tour as part of v1, not defer.
4. **Migration story — collect now.** Curve's "2,500 migrations this year" is the most differentiating proof element in the dental set, and it costs nothing to start tracking in advance of having a meaningful number.
5. **APAC compliance/data-residency claim — write it precisely.** Jane's regional storage line is a passive trust signal; for an APAC-first product this could be an *active* differentiator if specified (PDPA, Singapore hosting, no cross-border transfer). Needs legal sign-off before publishing.

---

## 5. Method, gaps, and confidence

- **Method:** WebFetch against each homepage, structured prompt asking for hero copy / nav / proof / voice / pricing / CTA verbatim, no invention. Each site report is one fetch — not a full site crawl. Pricing pages and demo flows were inferred from nav presence, not clicked through.
- **Confidence high on:** hero copy, nav structure, proof elements, voice patterns. These were captured verbatim from rendered homepages.
- **Confidence medium on:** demo-flow friction (forms not clicked through), pricing-page numbers (linked but not fetched).
- **Confidence low / gaps:**
  - Restaurant POS comparison — Toast and Square pages were anti-bot blocked, so the cross-vertical "what does Toast do that dental should steal" angle is missing.
  - Cloud9 was unreachable; Dental Intelligence was substituted as a more contemporary dental competitor. The original target may still be worth a manual review.
  - Linear and Attio's craft details (typography, color, motion) are well-known from broad SaaS reputation but weren't captured exhaustively here.
- **Next-pass research worth doing:** (a) click through 2-3 demo forms manually to count fields; (b) fetch each pricing page to capture tier structure; (c) one cross-vertical comparison fetch (Toast or Square via a non-blocked path, or Pitch / Notion / Vercel as alternative premium-SaaS references).
