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
- Captured in agent memory as `feedback_dfi_synergy_framing.md` (loaded automatically into agent sessions; see [CLAUDE.md](CLAUDE.md) for the rule)

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

### Header rework — mega panel + mobile drawer

Replaced the link-row Nav with a real navigation system. Source: [`components/sections/Nav.tsx`](components/sections/Nav.tsx).

- **Workflows mega panel (md+)**: hover/click/Esc-trigger dropdown anchored under the trigger. 2-column grid of the 6 workflows (each: Lucide icon · name · one-line description · anchor to `/workflows#slug`) plus a featured rail card linking to the DFI Synergy case study with a 3-stat block (3 wks / 0 / 85%). Bottom strip: Articles · vs Plato · vs Open Dental · Integrations · Changelog.
- **Mobile drawer (<md)**: hamburger top-right → right-side slide-over (`88vw`, max `380px`). Workflows expanded inline as a motion-animated accordion; flat list below for Customers / Pricing / Integrations / Articles / Compare:vs Plato / Compare:vs Open Dental / Changelog / Security; sticky **Book a demo** at the bottom.
- A11y: `aria-expanded`, `aria-haspopup`, `role="dialog"`, `aria-modal`, body scroll lock when drawer open, Esc closes both, focus returns to trigger on close. Inherits the project-wide `prefers-reduced-motion` rule.
- Direction picked from a Dribbble survey: rich panel + featured rail (Vercel/Stripe/Notion family), not minimal grid (Linear/Resend) and not asymmetric preview-pane (Framer/Arc).

### `/book-a-demo` audit + form rebuild

The old fallback was a single mailto link with apologetic "Self-serve booking is being wired up" copy — high friction on mobile, no qualifying fields. Cal.com iframe still kicks in if `NEXT_PUBLIC_CALCOM_USERNAME` is set.

- New: [`components/sections/DemoRequestForm.tsx`](components/sections/DemoRequestForm.tsx) — proper form (clinic, name, role, email, location, chairs, providers, current PMS dropdown, preferred times, notes). On submit it builds a structured mailto and opens the user's mail client with everything pre-filled. Drop-in replaceable later with a real endpoint (Cloudflare Pages Function / Formspree / Resend).
- New layout in [`app/book-a-demo/page.tsx`](app/book-a-demo/page.tsx) — two-column on desktop (form + sidebar with Length / Format / Outcome cards plus a "What clinics ask first" trust strip linking to migration article, security, pricing). Single column on mobile.

### Compare pages

Two new SEO-targeted comparison routes for high-intent searches ("Plato alternative", "Open Dental APAC").

- [`/compare/plato`](app/compare/plato/page.tsx) — 11-row capability table (deployment, schedule UX, charting, billing, imaging, recall, multi-clinic, off-site access, hosting, updates, pricing) + 3 "why we built differently" sections + honest "where Plato is the right call" concession + CTA to demo + cross-link to the existing [Plato migration article](content/articles/plato-to-cloud-migration.tsx).
- [`/compare/open-dental`](app/compare/open-dental/page.tsx) — same shape, OD-specific rows (license & cost, hosting, UX, customisation, US insurance, APAC compliance, imaging, updates, multi-clinic, setup time, community).
- Both pages match house voice: qualified claims, no "all-in-one" / "supercharge" / "best-in-class". Concession sections are real, not strawmen.
- Sitemap: both URLs added at priority 0.8 in [`app/sitemap.ts`](app/sitemap.ts).
- Nav: both surfaced in the mega panel resource strip and in the mobile drawer.

### Tooling — `scripts/browse.mjs`

Local Playwright-based CLI for fetching JS-rendered pages and verifying the local dev server. Used for design research (Dribbble, competitor sites) and visually checking new pages before deploy.

```
node scripts/browse.mjs <url> [--out path] [--width N] [--height N] [--wait selector]
```

Defaults: 1280×800 viewport, full-page screenshot to `/tmp/browse-<ts>.png`, prints page innerText (first 8000 chars). `playwright` added to `devDependencies`.

### Content expansion — about, comparisons, verticals, FAQ, articles

A second-pass content build to flesh out the site beyond the initial scaffold.

- **`/about`** ([app/about/page.tsx](app/about/page.tsx)) — three "why we&apos;re building this" sections, a "how we work" rationale, and a placeholder founders array. Founder bios fill in via the `founders` const at the top of the file; until populated the page renders a graceful "team coming soon" notice. DFI Synergy is treated as an arms-length cornerstone customer per the framing rule (memory: `feedback_dfi_synergy_framing.md`).
- **Three new comparison pages** — [`/compare/dentrix`](app/compare/dentrix/page.tsx), [`/compare/eaglesoft`](app/compare/eaglesoft/page.tsx), [`/compare/carestream`](app/compare/carestream/page.tsx). Same shape as the Plato/OD pages: 11-row capability table, three "why we built differently" sections, "where they&apos;re the right call" concession, CTA. Plus a [`/compare`](app/compare/page.tsx) index page listing all five comparisons.
- **Vertical landing pages** — [`/for-solo-clinics`](app/for-solo-clinics/page.tsx) (1–4 chair, office-manager + dentist-owner buyer) and [`/for-multi-clinic`](app/for-multi-clinic/page.tsx) (DSO / multi-location, COO + VP Ops buyer). Different framing, different proof points, different CTA copy per segment.
- **FAQ page** ([app/faq/page.tsx](app/faq/page.tsx)) — five categorised question groups (pricing, migration, security, integrations, about) with qualified, link-rich answers. ~17 Q&A entries.
- **Three new articles** — [choosing-dental-pms-apac-2026](content/articles/choosing-dental-pms-apac-2026.tsx) (migration cluster, buyer's checklist), [open-dental-to-managed-pms-migration](content/articles/open-dental-to-managed-pms-migration.tsx) (migration cluster, mirror of the Plato playbook for OD), [tenant-isolation-dental-saas](content/articles/tenant-isolation-dental-saas.tsx) (compliance cluster, four questions to ask vendors with code examples).
- **Wired in** — sitemap updated with the eleven new URLs; footer reorganised into Product / Solutions / Company columns to surface the new pages; nav mega panel resource strip swapped from "Articles · vs Plato · vs Open Dental · Integrations · Changelog" to "For solo · For DSOs · Compare · Articles · FAQ"; mobile drawer expanded with all new links.

### Open / pending (carry-over to next session)

- Real product screenshots to replace one or more CSS mocks (needs capture from existing Dentologic app)
- `/about` page (needs founder bios + framing decision per the DFI Synergy ownership rule)
- Cloudflare Web Analytics token → `.env.local` (user task)
- Cloudflare Email Routing for `hello@`, `security@`, `legal@`, `privacy@` (user task)
- Cal.com username → `.env.local` (user task) — fallback is now the structured demo form, not a mailto card
- **Real demo form endpoint** — currently builds a mailto on submit. Wire to Cloudflare Pages Functions / Formspree / Resend so submissions reach the team without depending on the user's mail client.
- Second case study (when a clinic story other than DFI Synergy is available)
- Lighthouse audit on the live URL
- Internal link from the Plato migration article to `/compare/plato`
- `/compare/` index page (only when a 3rd comparison page lands)
- Consider Geist or Inter as the typeface (currently system stack)
