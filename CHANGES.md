# Engineering changelog

Internal record of meaningful changes to the codebase, decisions made, and direction shifts. Different audience from [`/changelog`](https://oralstack.com/changelog/) (which is the public-facing product changelog).

Format: latest first. Use this for "why did we do X" archaeology.

---

## 2026-04-27

### Brand v2 + production deploy

A single-day end-to-end ship: scaffold to live at https://oralstack.com.

**Stack lock**
- Next.js 16.2 + React 19 + Tailwind 4.2 + Motion 12 + TypeScript 5.7 (chose over Astro for monorepo alignment with the existing Dentologic Next.js app, which the marketing site will eventually port into)
- Static export (`output: "export"`) — no server runtime
- Wrangler 4 for Cloudflare Pages deploy
- Pure CSS visualisations — no images, no asset pipeline, no DPI / PHI risk

**Initial scaffold (brand v1)**
- 18 production routes: home, workflows, customers, customers/dfi-synergy, pricing, book-a-demo, integrations, changelog, security, privacy, terms, plus generated assets (icon.svg, apple-icon, opengraph-image, sitemap, robots) + branded 404
- 5 visualisation mocks (ScheduleMock, OdontogramMock, CheckoutMock, ImagingMock, RecallMock) recon'd from the actual Dentologic codebase data shapes
- Brand v1: abstract "o" mark with sunset accent dot, sunset/violet/sea palette, lowercase "oralstack"

**DFI Synergy framing pivot**
- Decision: present DFI Synergy as an arms-length cornerstone customer, not as the operator-founder clinic. Ownership relationship is internal, never disclosed publicly.
- Removed all "built where it ships", "operator-founder", "our own clinic", "design partner" framing
- Quote attribution moved to roles only ("Practice manager", "Clinical director") — never "Founder, DFI Synergy & Oralstack"
- Captured in [memory: project_dfi_synergy_framing.md](file:///Users/ianlam/.claude/projects/-Users-ianlam-Documents-Agent-Projects-Dentologic/memory/project_dfi_synergy_framing.md)

**Brand v2**
- New mark: stylised molar in three segments (navy crown, teal left root, navy right root) — recreated as clean SVG, not pixel-traced
- Palette pivot: warm sunset → cool navy + teal as primary brand colours. Sunset/sea/violet retained for visualisations only (caries / filling / crown semantic cues)
- Brand name capitalisation: "Oralstack" (one word, capital O) in prose; URL/code stay lowercase
- Two-tone wordmark: *Oral* navy, *stack* teal
- Pricing locked: **$200 per clinic per month** flat pilot pricing, 3 months hands-on onboarding included, no per-seat
- All 4 brand guideline docs added at [`research/brand/`](research/brand/)

**Visualisation library expansion**
- Added 3 more mocks: MessagingMock (WhatsApp recall), DicomViewerMock (single-image deep view), AnalyticsMock (chair utilisation heatmap) → 8 total
- Added 6th workflow section "Operations & analytics" anchored by AnalyticsMock
- All 8 mocks now wired into production pages
- Library catalogue at [`components/visuals/README.md`](components/visuals/README.md) + dev review at [`/dev/visuals`](app/dev/visuals/page.tsx)

**Motion stack**
- ScrollProgress (top-of-page bar), CountUp (stat reveals), MagneticButton (cursor magnetism on critical CTAs), AnimatedMark (3-segment assembly), MarkBullet + SectionDivider (decorative brand-mark elements), HeroStagger + HeroItem (hero entrance staging)
- Cross-document view transitions enabled via `@view-transition { navigation: auto; }`
- All motion respects `prefers-reduced-motion`
- Documented in [`research/brand/motion.md`](research/brand/motion.md)

**Layout shifts**
- Nav + Footer lifted to `app/layout.tsx` (every route gets them)
- Workflows section on homepage rebuilt as card grid (visual at top, title + 1-line teaser, link to deep dive on `/workflows`)
- Dark CTA section: homepage final CTA flipped to navy bg + teal accent + canvas text — gives the brand a signature dark-band moment against all-light upstream sections
- Homepage gets a `SectionDivider` between Workflows and CustomerStoryStrip

**Deploy**
- Cloudflare Pages project `oralstack` created, first deploy
- DNS moved to Cloudflare nameservers, custom domains added (`oralstack.com` apex + `www.oralstack.com`)
- Universal SSL via Let's Encrypt (auto-renewing)
- `_headers` file for Content-Type on extensionless OG / apple-icon paths
- `npm run deploy` script wraps `next build && wrangler pages deploy out --project-name=oralstack --commit-dirty=true`

**Documentation**
- AGENTS.md, research-map, 5 primitives, 5 playbooks, 4 brand docs, motion doc, architecture doc, this CHANGES.md, CLOUDFLARE.md
- 5 memory files capturing decisions that should persist across sessions

### Open / pending (carry-over to next session)

- Real product screenshots to replace one or more CSS mocks (needs capture from existing Dentologic app)
- `/about` page (needs founder bios + framing decision per the DFI Synergy ownership rule)
- Cloudflare Web Analytics token → `.env.local` (user task)
- Cloudflare Email Routing for `hello@`, `security@`, `legal@`, `privacy@` (user task)
- Cal.com username → `.env.local` (user task) — until then `/book-a-demo` shows the mailto fallback
- Second case study (when a clinic story other than DFI Synergy is available)
- Lighthouse audit on the live URL
- Consider Geist or Inter as the typeface (currently system stack)
