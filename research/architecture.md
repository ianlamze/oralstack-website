# Architecture

The shape of the Oralstack marketing-site repo, the layer model, and where new code goes.

## Stack

- **Next.js 16.2** (App Router, static export via `output: "export"`)
- **React 19**
- **TypeScript 5.7**
- **Tailwind CSS 4.2** (CSS-first config via `@theme` in [`app/globals.css`](../app/globals.css))
- **Motion 12** (formerly Framer Motion; import from `motion/react`)
- **Lucide React** for icons
- **Wrangler 4** for Cloudflare Pages deployment

Build target is fully static HTML in `out/`. There are no API routes, no database, no server runtime.

## Directory tree

```
oralstack/
├── AGENTS.md                       Root agent contract (mission, rules, output contract)
├── README.md                       Project overview + run commands
├── CLOUDFLARE.md                   Deployment + DNS + Email + Analytics setup walkthrough
├── CHANGES.md                      Engineering changelog (decisions, milestones)
├── .env.example                    Documented env vars (NEXT_PUBLIC_CF_BEACON_TOKEN, NEXT_PUBLIC_CALCOM_*)
│
├── app/                            Next.js App Router — pages + metadata + asset generators
│   ├── layout.tsx                  Root layout: Nav + children + Footer + JSON-LD + analytics + ScrollProgress
│   ├── page.tsx                    Homepage
│   ├── globals.css                 Tailwind 4 @theme tokens + motion overrides + view transitions
│   ├── not-found.tsx               Branded 404
│   ├── icon.svg                    Favicon (tooth mark)
│   ├── apple-icon.tsx              180×180 PNG generated at build (Satori via next/og)
│   ├── opengraph-image.tsx         1200×630 PNG generated at build (Satori)
│   ├── sitemap.ts                  MetadataRoute.Sitemap — listed routes
│   ├── robots.ts                   MetadataRoute.Robots
│   ├── workflows/                  /workflows
│   ├── customers/                  /customers + /customers/dfi-synergy
│   ├── pricing/                    /pricing
│   ├── book-a-demo/                /book-a-demo (Cal.com embed or mailto fallback)
│   ├── integrations/               /integrations
│   ├── changelog/                  /changelog
│   ├── security/                   /security
│   ├── privacy/                    /privacy
│   ├── terms/                      /terms
│   └── dev/                        Internal-only routes (noindex, not in sitemap)
│       ├── visuals/                /dev/visuals — visualisation library catalogue
│       └── deck/                   /dev/deck — design + website direction deck (PDF source)
│
├── components/
│   ├── primitives/                 Atomic UI building blocks
│   │   ├── Button.tsx              Static link-styled button (primary / ghost variants)
│   │   ├── MagneticButton.tsx      Motion-driven button (primary / ghost / onDark variants)
│   │   └── Section.tsx             Standard page section wrapper (max-width container, padding)
│   ├── sections/                   Composed page sections + motion + decorative
│   │   ├── Nav.tsx, Footer.tsx
│   │   ├── Hero.tsx, TrustStrip.tsx, Workflows.tsx, CTA.tsx
│   │   ├── CustomerStoryStrip.tsx, CaseStudyHero.tsx, CustomerCard.tsx
│   │   ├── PageHeader.tsx, PullQuote.tsx, StatGrid.tsx, StatusBadge.tsx
│   │   ├── Wordmark.tsx            Brand wordmark (mark + two-tone text)
│   │   ├── AnimatedMark.tsx        Brand mark with scroll-triggered assembly
│   │   ├── MarkBullet.tsx          Tooth mark as decorative bullet
│   │   ├── SectionDivider.tsx      Hairline + centred mark
│   │   ├── AnimateInView.tsx       Scroll-into-view fade-up wrapper
│   │   ├── HeroStagger.tsx         Mount-triggered staggered entrance (parent + item)
│   │   ├── CountUp.tsx             Animated number-to-target on scroll-into-view
│   │   └── ScrollProgress.tsx      Top-of-page progress bar (used in layout)
│   └── visuals/                    Product UI mock library (8 components)
│       ├── README.md               Catalogue, conventions, how-to-extend
│       ├── ScheduleMock.tsx, OdontogramMock.tsx, CheckoutMock.tsx
│       ├── ImagingMock.tsx, RecallMock.tsx, MessagingMock.tsx
│       ├── DicomViewerMock.tsx, AnalyticsMock.tsx
│
├── content/                        Typed content data (no JSX, no React)
│   ├── site-meta.ts                Site title, description, canonical URL
│   ├── workflows.ts                Homepage workflow card data (slug + eyebrow + title)
│   ├── workflows-detailed.ts       /workflows page section data (full body + bullets + replaces)
│   ├── customers.ts                Customer index
│   ├── case-studies/               One file per case study + types.ts
│   ├── changelog.ts                Public-facing changelog entries
│   └── integrations.ts             Categories with items + status (Live/Beta/Roadmap)
│
├── lib/
│   └── cn.ts                       Tiny class-name joiner (no clsx dep)
│
├── public/
│   └── _headers                    Cloudflare Pages headers (sets Content-Type for extensionless OG/icon files)
│
├── scripts/
│   └── generate-deck-pdf.sh        Headless Chrome → PDF for /dev/deck
│
└── research/                       Agent collaboration scaffold
    ├── architecture.md             This file
    ├── website-audit.md            Competitive teardown that informed the design
    ├── index/
    │   └── research-map.md         Task router — read after AGENTS.md
    ├── primitives/                 Atomic agent-facing concepts
    │   ├── brand-identity.md, copy-voice.md, color-tokens.md
    │   ├── content.md, visuals.md
    ├── playbooks/                  Procedural workflows for common tasks
    │   ├── new-page-add.playbook.md
    │   ├── edit-case-study.playbook.md
    │   ├── add-changelog-entry.playbook.md
    │   ├── add-visualization.playbook.md
    │   └── redeploy.playbook.md
    ├── patterns/                   Code/component patterns (when worth extracting)
    │   └── components/
    │       ├── hero.pattern.md, cta.pattern.md
    ├── brand/                      Deep brand identity guidelines (designer/contractor handoff-ready)
    │   ├── README.md, logo.md, color.md, typography.md, motion.md
    └── sources/                    Full reference docs preserved verbatim
        ├── agentic-workspace.md, copywriting-system.md, design-system-rules.md
```

## Layer model

The codebase reads bottom-up:

```
content/  →  components/visuals/  →  components/primitives/  →  components/sections/  →  app/{route}/page.tsx
                                                                      ↑
                                                          components/sections/{Nav,Footer}.tsx
                                                                      ↑
                                                                 app/layout.tsx
```

- **`content/`** is data only. No JSX. Components import from here.
- **`components/visuals/`** is a self-contained library. Visuals are composed of HTML + brand tokens — they do not import from `components/sections/` or `components/primitives/` (unless they need a `Section` wrapper, which they generally don't).
- **`components/primitives/`** are atomic. They depend on Tailwind tokens only.
- **`components/sections/`** compose primitives + visuals + content into named page sections. The Hero, CTA, Workflows section, Footer etc. live here.
- **`app/{route}/page.tsx`** composes section components into a route. Pages have no business logic — they're declarative compositions.
- **`app/layout.tsx`** wraps every route with Nav + Footer + JSON-LD + ScrollProgress + analytics.

## Where does new code go?

| If you're adding… | Goes in… | Then update… |
|---|---|---|
| A new page | `app/{route}/page.tsx` | `app/sitemap.ts` (add to MetadataRoute.Sitemap), Footer or Nav if linkable |
| A new typed content set | `content/{name}.ts` | The component or page that consumes it |
| A new product UI mock | `components/visuals/{Name}Mock.tsx` | `components/visuals/README.md` catalogue + `app/dev/visuals/page.tsx` (see `add-visualization` playbook) |
| A new atomic UI primitive (Button variant, Input, etc.) | `components/primitives/` | Pattern doc in `research/patterns/components/` if reused 3+ times |
| A new composed page section | `components/sections/` | The page that uses it |
| A new motion behaviour | `components/sections/` (motion) or `components/primitives/` (interaction) | `research/brand/motion.md` |
| A new env var | `.env.example` (documented) + the consuming code | `CLOUDFLARE.md` if user needs to set it for deploy |
| A new ops script | `scripts/` | `package.json` scripts + a brief comment at the top of the script |
| A new piece of brand guidance | `research/brand/{topic}.md` | `research/brand/README.md` index + `research/index/research-map.md` if it routes a task class |
| A new task class | `research/playbooks/{task}.playbook.md` | `research/index/research-map.md` |

## Key conventions

- **No raw hex inside components** — always `var(--color-*)`. Audit rule `design.raw-color`.
- **Brand name "Oralstack"** in prose (capital O, one word). URL `oralstack.com` lowercase. See [memory: oralstack rename](file:///Users/ianlam/.claude/projects/-Users-ianlam-Documents-Agent-Projects-Dentologic/memory/project_oralstack_rename.md).
- **DFI Synergy framing** — never operator-founder, always arms-length. See [memory: DFI Synergy framing](file:///Users/ianlam/.claude/projects/-Users-ianlam-Documents-Agent-Projects-Dentologic/memory/project_dfi_synergy_framing.md).
- **Singapore-fictional patient names** in visuals — keep them consistent across mocks (Lim Wei Jian, Devi Krishnan, Aaron Teo, Mei Lin Tan, Hafiz Yusof).
- **`role="img"` + descriptive `aria-label`** on every visualisation outer container.
- **Static export friendly** — never use server-only APIs (cookies, headers, dynamic data fetching at request time). Everything resolves at build time.
- **Cloudflare Pages `_headers`** — extensionless asset routes (`/opengraph-image`, `/apple-icon`) need explicit Content-Type via `public/_headers`. Don't remove that file.

## Build + deploy summary

```
npm run dev        # local dev server at :3000
npm run build      # static export to out/
npm run deploy     # next build && wrangler pages deploy out --project-name=oralstack
npm run typecheck  # tsc --noEmit
npm run deck:pdf   # headless Chrome → oralstack-deck.pdf from /dev/deck
```

Detailed deploy walkthrough in [`CLOUDFLARE.md`](../CLOUDFLARE.md). Common-task playbook in [`research/playbooks/redeploy.playbook.md`](playbooks/redeploy.playbook.md).
