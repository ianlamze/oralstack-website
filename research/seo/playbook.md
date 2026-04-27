# SEO Playbook

The doctrine, keyword strategy, content clusters, and on-page rules for Oralstack search work. Authoritative — when SEO decisions are made, this is what they reference.

## Mission

Earn organic traffic from dental clinic operators (front desk, clinic owners, multi-location group operators) who are searching for **operational solutions** — not "best dental software." We are not competing for the head term. We are dominating long-tail intent that maps to specific Oralstack workflows.

Success looks like: a Singapore clinic owner Googling *"how to reduce dental no-show rate"* lands on an Oralstack article, reads through, and books a demo because we clearly understand their problem.

## Principles

1. **People-first content.** Google's Helpful Content system penalizes generic AI-feeling SEO content. Every article must be specific, opinionated, and grounded in real workflow detail. If a competitor could publish the same article without changing a word, it's not good enough.
2. **Lead with the dental noun.** The reader's problem is *patient*, *chair*, *recall*, *front desk*, *case notes*. Not *workflow*, *platform*, *solution*. Search intent is operational; copy must match.
3. **APAC + Singapore specificity is a moat.** International dental SEO is dominated by US incumbents. Singapore PDPA, Plato migration, MOH guidelines, GST billing, SingPass identity — these are search territories the incumbents don't compete in.
4. **Qualify every claim.** No "guaranteed", no "automated diagnosis", no unsupported numbers. Singapore dental buyers fact-check; the brand audit rules apply to articles too.
5. **Internal linking is structural, not decorative.** Articles link to product pages, product pages link to articles, articles link to other articles. Each link earns its placement (the reader genuinely benefits) — never stuff the same anchor text repeatedly.

## Search intent → page type mapping

| Intent | Example query | Right page type | Example URL |
|---|---|---|---|
| Informational | "how to reduce dental no-shows" | Article | `/articles/reducing-no-show-rates` |
| Comparison | "Plato vs cloud dental software" | Article (with comparison table) | `/articles/plato-to-cloud-migration` |
| Vendor evaluation | "Oralstack pricing" | Product page | `/pricing` |
| Feature deep-dive | "Oralstack DICOM viewer" | Product page section | `/workflows#imaging` |
| Trust check | "Oralstack security PDPA" | Product page | `/security` |
| Brand awareness | "Oralstack" | Homepage | `/` |
| Customer proof | "Oralstack DFI Synergy review" | Case study | `/customers/dfi-synergy` |

Articles handle informational + comparison intents. Product pages handle everything else. Don't write product features as articles, and don't write articles as product features.

## Content clusters

Four pillars, each with one or two pillar articles plus spoke articles. Each cluster maps cleanly to a workflow on the product side, so internal links are natural.

### Cluster 1 — Front desk operations (`front-desk`)

Maps to `/workflows#front-desk` and `/workflows#recall`.

- **Pillar:** *"How busy dental clinics run their front desk"* (operational overview)
- **Spokes:**
  - Reducing no-show rates ✓ (shipped)
  - Same-day vs next-day appointment confirmations
  - Multi-chair scheduling for 3-5 chair clinics
  - Recall outreach via WhatsApp Business in Singapore
  - The drag-to-reschedule workflow

### Cluster 2 — Billing & revenue cycle (`billing`)

Maps to `/workflows#billing`.

- **Pillar:** *"Same-day billing for dental clinics — the discharge-flow model"*
- **Spokes:**
  - GST 9% billing for Singapore dental practices
  - Insurance vs patient portion: keeping them structurally separate
  - A/R aging in dental: when to write off
  - Treatment-line auto-population from the chart
  - Audit-logged adjustments and write-offs

### Cluster 3 — Clinical workflows (`clinical`)

Maps to `/workflows#charting` and `/workflows#imaging`.

- **Pillar:** *"Tooth-led charting vs form-led charting"*
- **Spokes:**
  - DICOM in the chart vs separate viewer
  - Sensor-bridge integration: Carestream, Dexis, Sopro
  - FDI vs Universal numbering (and why it matters for Singapore)
  - Case notes that link to specific surfaces

### Cluster 4 — Migration & compliance (`migration`)

Maps to `/integrations` (migration row) and `/security`.

- **Pillar:** *"Migrating from Plato to a cloud PMS"* ✓ (shipped)
- **Spokes:**
  - Singapore PDPA for dental clinics
  - Tenant isolation: what it means for clinic data
  - Audit logs: what dental auditors actually look at
  - SingPass for patient identity verification

## Keyword strategy

### Primary keywords (high-intent, build for these)

| Keyword | Volume estimate | Difficulty | Target page |
|---|---|---|---|
| dental practice management software Singapore | medium | medium | `/` |
| Plato dental software alternative | low | low | `/articles/plato-to-cloud-migration` |
| dental no-show rate reduction | low | low | `/articles/reducing-no-show-rates` |
| cloud dental software Singapore | low | medium | `/` + `/articles/plato-to-cloud-migration` |
| dental clinic billing software Singapore | low | medium | `/workflows#billing` + billing articles |

These are not Ahrefs-grade volumes — they're operational searches that convert at high rates because intent is specific.

### Secondary keywords (long-tail, support)

- "DICOM viewer dental clinic"
- "WhatsApp Business dental clinic Singapore"
- "FDI numbering dental software"
- "PDPA dental records"
- "Singapore PMS migration"
- "drag to reschedule dental"
- "dental recall automation"
- "GST 9% dental billing Singapore"

### Don't compete for

- "best dental software" — too broad, dominated by US incumbents
- "dental practice management" — too generic
- "free dental software" — wrong audience
- "dental EMR" — US/medical framing, not the buyer

## On-page rules

### Title (h1) + meta description

- **Title:** 50-65 chars. Specific. Includes primary keyword in natural phrasing. No "Ultimate Guide to X" templates. Pattern: *"How [audience] can [outcome]"* or *"[Specific topic]: [angle]"*. Example: ✅ `"Migrating from Plato to a cloud PMS: a Singapore dental clinic guide"` not ❌ `"The Ultimate Guide to Dental Software"`.
- **Meta description:** 140-160 chars. Active voice. Promises a specific takeaway. Pattern: *"[Verb] [object]. [Specific value the reader gets]."* Example: ✅ `"Concrete migration playbook for Singapore dental clinics moving from Plato to a cloud PMS — covering data continuity, cutover, and staff retraining."`
- **Canonical:** Always set. `/articles/[slug]` or the relevant product page.
- **OG image:** All articles use the site OG image fallback for now. Custom per-article OG is a future polish.

### Article structure

```
[ Eyebrow — cluster name (uppercase, soft grey) ]
[ Title — 4xl-6xl, semibold, tight tracking ]
[ Meta — date · reading time · author ]

[ Lede paragraph — hook, sets stakes, names specifically who this is for ]

[ H2 — first major section ]
  [ Body paragraphs ]
  [ List with MarkBullet or numbered ]

[ H2 — second section ]
  ...

[ Pulled callout / quote where useful ]

[ H2 — final section: What to do next ]
  [ Concrete steps ]

[ Related-article and product-page links — at least 1 of each ]

[ CTA — book a demo or talk to us about a pilot ]
```

Length: 800–1500 words for spoke articles, 2000–3500 for pillars. Don't pad. If it's done at 800 words, ship at 800 words.

### Internal linking rules

- **Every article must link to at least one product page** (workflows, pricing, security, integrations, customers/dfi-synergy). Anchor text must be the actual term, not "click here" or "learn more."
- **Every article should link to at least one related article** in the same cluster (when one exists).
- **Every product page should link to at least one related article** when an article exists for that workflow.
- **Anchor text is descriptive.** "[Plato migration tooling](/integrations)" not "[here](/integrations)".

### Technical SEO checklist (per article)

- [ ] `metadata.title` — specific, ≤ 65 chars, primary keyword in natural phrasing
- [ ] `metadata.description` — 140–160 chars, active voice
- [ ] `metadata.alternates.canonical` — set to `/articles/[slug]`
- [ ] Article JSON-LD schema on page (handled by template)
- [ ] At least 2 internal links (1 product page + 1 related article minimum)
- [ ] H1 = title, H2-H3 hierarchy used correctly, no skipped levels
- [ ] All images (if any) have alt text
- [ ] No banned phrases (`copy.generic-saas-phrase` audit rules apply)
- [ ] Sitemap auto-includes via `articles` registry
- [ ] Reading time set in metadata (estimated by `wordCount / 220`)

## Site-wide technical SEO (already implemented)

- ✅ `sitemap.xml` generated from registry
- ✅ `robots.txt` allows all
- ✅ JSON-LD `Organization` schema on every page (in `app/layout.tsx`)
- ✅ Canonical URLs set per page (`metadataBase` + per-page `alternates.canonical`)
- ✅ OG image with brand wordmark (1200×630)
- ✅ Meta description per page
- ✅ Mobile-responsive layouts
- ✅ Static export served from Cloudflare's edge (good Core Web Vitals baseline)
- ✅ View Transitions on cross-page navigation (Chrome 126+)

## Distribution + measurement

### Channels (in order of priority)

1. **Organic search** — the primary play. Articles + product pages targeting long-tail dental ops queries.
2. **Direct outreach + sharing** — when a relevant article is published, share with named contacts in Singapore dental WhatsApp groups, dental industry newsletters.
3. **LinkedIn** — repost article headlines + key insights with link, tagged for dental + healthcare audiences.
4. **Citations from industry sites** — if MOH, Singapore Dental Association, or industry publications link to an article, the SEO compounds significantly.

### Measurement (post-deploy)

- **Cloudflare Web Analytics** for visitor counts, page views, top pages.
- **Google Search Console** (set up post-launch) for keyword rankings, click-through rate, impressions.
- **Tracked outcomes:**
  - Article → demo booking conversion (track via Cal.com referrer)
  - Time on page per article (high = good signal)
  - Inbound links over time
  - Singapore-region traffic share

### Cadence

- **Articles:** 2 per month minimum, 4 per month ideal. Quality over quantity. Better to ship 1 great article than 4 mediocre ones.
- **Product page tweaks:** monthly review for fresh content (changelog updates, customer count refresh).
- **Audit:** quarterly review of every article for accuracy + freshness. Update `updatedAt` and re-list.

## Article template

When adding a new article, follow `research/playbooks/add-article.playbook.md`. Short version:

1. Pick a cluster (`front-desk`, `billing`, `clinical`, `migration`).
2. Decide the primary keyword(s).
3. Outline using the structure above.
4. Write — opinionated, specific, dental-grounded.
5. Add to `content/articles/` and the registry.
6. Run `npm run build` — sitemap auto-updates.
7. Deploy.
8. Share.

## Don't

- Don't write generic "Top 10 Tips for Dental Practices" listicles. They underperform vs specific operational articles and dilute brand voice.
- Don't write articles that are thinly-veiled product pitches. Solve the reader's problem; the product mention earns its way in.
- Don't keyword-stuff. Modern Google ignores it. Write for humans.
- Don't write articles longer than they need to be. Padding is a quality signal in the wrong direction.
- Don't republish without updating `updatedAt`. Stale content with old dates loses trust.
- Don't use stock dental photography. Brand visuals are component-driven (CSS mocks, brand mark). Stock would clash.
