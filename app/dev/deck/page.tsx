import type { Metadata } from "next";
import Wordmark from "@/components/sections/Wordmark";
import ScheduleMock from "@/components/visuals/ScheduleMock";
import OdontogramMock from "@/components/visuals/OdontogramMock";
import CheckoutMock from "@/components/visuals/CheckoutMock";
import ImagingMock from "@/components/visuals/ImagingMock";
import RecallMock from "@/components/visuals/RecallMock";
import MessagingMock from "@/components/visuals/MessagingMock";
import DicomViewerMock from "@/components/visuals/DicomViewerMock";
import AnalyticsMock from "@/components/visuals/AnalyticsMock";

export const metadata: Metadata = {
  title: "Oralstack · Design + website direction",
  description: "Internal design + website direction deck for the team.",
  robots: { index: false, follow: false },
};

const totalSlides = 10;

type SlideProps = {
  n: number;
  eyebrow: string;
  children: React.ReactNode;
};

function Slide({ n, eyebrow, children }: SlideProps) {
  return (
    <section
      className="deck-slide bg-white border border-[var(--color-border)] mx-auto mb-6 print:mb-0"
      style={{
        width: "297mm",
        minHeight: "210mm",
        padding: "16mm 18mm",
        boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 18px 60px -30px rgba(20,30,60,0.18)",
      }}
    >
      <div className="flex h-full flex-col">
        <header className="flex items-baseline justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
          <span>{eyebrow}</span>
          <span className="tabular-nums">
            {n.toString().padStart(2, "0")} / {totalSlides.toString().padStart(2, "0")}
          </span>
        </header>
        <div className="flex-1 mt-8">{children}</div>
        <footer className="mt-8 flex items-center justify-between text-[10px] text-[var(--color-text-soft)] tracking-[0.04em]">
          <Wordmark size="sm" />
          <span>Design + website direction · April 2026</span>
        </footer>
      </div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[44px] font-semibold tracking-tight leading-[1.05] text-balance">
      {children}
    </h2>
  );
}

function ToothMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 4.5 C20.6 4.5 23.5 7 23.5 11.2 L23.5 14.2 C23.5 16.1 22 17.2 19.8 17.2 L12.2 17.2 C10 17.2 8.5 16.1 8.5 14.2 L8.5 11.2 C8.5 7 11.4 4.5 16 4.5 Z"
        fill="var(--color-ink)"
      />
      <path
        d="M11.4 17.6 L11.4 22.5 C11.4 25.2 12.6 26.6 14.2 26.2 C15 26 15.2 24.4 15.2 22.4 L15.2 17.6 Z"
        fill="var(--color-tide)"
      />
      <path
        d="M16.8 17.6 L16.8 25.4 C16.8 27.7 18.6 28.4 20.4 27.6 C22.4 26.7 22.4 23.4 21.7 19.6 L21.4 17.6 Z"
        fill="var(--color-ink)"
      />
    </svg>
  );
}

function BigWordmark({ markSize, textClass }: { markSize: number; textClass: string }) {
  return (
    <span className="inline-flex items-center gap-4">
      <ToothMark size={markSize} />
      <span className={`font-semibold tracking-tight ${textClass}`}>
        <span style={{ color: "var(--color-ink)" }}>Oral</span>
        <span style={{ color: "var(--color-tide)" }}>stack</span>
      </span>
    </span>
  );
}

export default function DeckPage() {
  return (
    <main className="deck-mode bg-[#f3f3f0] py-10 px-6 print:p-0 print:bg-white">
      {/* SLIDE 1 — Cover */}
      <Slide n={1} eyebrow="Oralstack · April 2026">
        <div className="grid h-full lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12 items-center">
          <div>
            <BigWordmark markSize={68} textClass="text-5xl" />
            <h1 className="mt-12 text-[60px] font-semibold tracking-tight leading-[1.02] text-balance">
              The operating system for modern dental clinics.
            </h1>
            <p className="mt-6 text-[18px] text-[var(--color-text-muted)] leading-relaxed max-w-[44ch]">
              Designed in Singapore. Deployed across APAC. Built around the jobs the front desk and
              clinical team actually do — book, chart, bill, image, message.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              <span className="inline-flex items-center text-xs font-medium uppercase tracking-[0.16em] rounded-full px-3 py-1.5 bg-[color-mix(in_oklch,var(--color-tide),white_75%)] text-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_30%)]">
                Brand v2
              </span>
              <span className="inline-flex items-center text-xs font-medium uppercase tracking-[0.16em] rounded-full px-3 py-1.5 bg-[color-mix(in_oklch,var(--color-ink),white_88%)] text-[var(--color-ink)]">
                Website overview
              </span>
              <span className="inline-flex items-center text-xs font-medium uppercase tracking-[0.16em] rounded-full px-3 py-1.5 bg-[var(--color-canvas-tinted)] text-[var(--color-text-muted)]">
                Internal · v0.2
              </span>
            </div>
          </div>
          <div className="justify-self-end">
            <ScheduleMock />
          </div>
        </div>
      </Slide>

      {/* SLIDE 2 — Brand identity */}
      <Slide n={2} eyebrow="Brand identity">
        <H2>Tooth mark · navy + teal · two-tone wordmark.</H2>
        <p className="mt-4 text-[16px] text-[var(--color-text-muted)] max-w-[68ch] leading-relaxed">
          A clinical, recognizable visual system. The mark is unmistakably dental in 0.5 seconds.
          The palette reads as healthcare-trust without being sterile. Full guidelines live in{" "}
          <code className="font-mono text-[14px] bg-[var(--color-canvas-tinted)] px-1.5 py-0.5 rounded">
            research/brand/
          </code>
          .
        </p>

        <div className="mt-10 grid grid-cols-[1.1fr_1fr_1fr] gap-10">
          {/* Mark */}
          <div className="grid gap-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Mark
            </p>
            <div className="bg-[var(--color-canvas-tinted)] rounded-[var(--radius-lg)] p-8 flex items-center justify-center">
              <ToothMark size={120} />
            </div>
            <ul className="grid gap-1.5 text-[11px] text-[var(--color-text-muted)]">
              <li className="flex gap-2 items-center">
                <span
                  className="inline-block h-2 w-2 rounded-sm"
                  style={{ background: "var(--color-ink)" }}
                />
                <span>Crown · navy</span>
              </li>
              <li className="flex gap-2 items-center">
                <span
                  className="inline-block h-2 w-2 rounded-sm"
                  style={{ background: "var(--color-tide)" }}
                />
                <span>Left root · teal · smaller</span>
              </li>
              <li className="flex gap-2 items-center">
                <span
                  className="inline-block h-2 w-2 rounded-sm"
                  style={{ background: "var(--color-ink)" }}
                />
                <span>Right root · navy · larger</span>
              </li>
            </ul>
          </div>

          {/* Color */}
          <div className="grid gap-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Color
            </p>
            <ul className="grid gap-2">
              {[
                { token: "--color-ink", hex: "#15375D", name: "Navy", role: "Text · buttons" },
                { token: "--color-tide", hex: "#2D8AAB", name: "Teal", role: "Accent · links" },
                { token: "--color-canvas", hex: "#FBFBF7", name: "Canvas", role: "Background" },
                { token: "--color-ink-muted", hex: "#647184", name: "Ink-muted", role: "Body" },
                { token: "--color-line", hex: "#E2E5E8", name: "Line", role: "Borders" },
              ].map((c) => (
                <li key={c.token} className="flex items-center gap-3">
                  <span
                    className="inline-block h-7 w-10 rounded-md border border-[var(--color-border)] shrink-0"
                    style={{ background: c.hex }}
                  />
                  <div className="grid gap-0 min-w-0">
                    <span className="text-[11px] font-medium text-[var(--color-text)]">
                      {c.name}{" "}
                      <span className="text-[var(--color-text-soft)] font-mono text-[10px]">
                        {c.hex}
                      </span>
                    </span>
                    <span className="text-[10px] text-[var(--color-text-soft)]">{c.role}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-[9px] text-[var(--color-text-soft)] tracking-[0.04em] mt-1">
              Sunset · sea · violet retained for product visualisations only.
            </p>
          </div>

          {/* Wordmark + type */}
          <div className="grid gap-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Wordmark
            </p>
            <div className="bg-[var(--color-canvas-tinted)] rounded-[var(--radius-lg)] p-6 grid gap-5 justify-items-start">
              <BigWordmark markSize={36} textClass="text-2xl" />
              <BigWordmark markSize={24} textClass="text-base" />
              <BigWordmark markSize={18} textClass="text-sm" />
            </div>

            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)] mt-2">
              Type
            </p>
            <div className="grid gap-2.5">
              <p className="text-[28px] font-semibold tracking-tight leading-none text-[var(--color-text)]">
                Display 600
              </p>
              <p className="text-[18px] font-semibold tracking-tight leading-none text-[var(--color-text)]">
                H2 600
              </p>
              <p className="text-[14px] leading-none text-[var(--color-text-muted)]">Body 400</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-soft)] leading-none">
                Eyebrow 500
              </p>
              <p className="font-mono text-[11px] text-[var(--color-text-muted)] leading-none">
                ui-monospace · routes / metadata
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 3 — What Oralstack is */}
      <Slide n={3} eyebrow="What Oralstack is">
        <H2>Built for the front desk first.</H2>
        <p className="mt-6 text-[18px] text-[var(--color-text-muted)] max-w-[60ch] leading-relaxed">
          Oralstack makes busy dental clinics faster without making clinical work feel generic,
          bloated, or decorative. Five qualities the brand has to express in every surface:
        </p>

        <ul className="mt-12 grid gap-6 grid-cols-5">
          {[
            { k: "Precise", v: "Decisions feel measured and operationally useful." },
            { k: "Premium", v: "Looks expensive through restraint, not decoration." },
            { k: "Clinical", v: "Trust matters. Not sterile, not casual." },
            { k: "APAC-aware", v: "Singapore first, region next, region-hosted." },
            { k: "Speed-first", v: "Every visible choice helps someone act faster." },
          ].map((p) => (
            <li
              key={p.k}
              className="grid gap-2 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] p-5"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                {p.k}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] leading-snug">{p.v}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid grid-cols-3 gap-6">
          {[
            { k: "Pricing", v: "$200 / clinic / month flat — pilot programme" },
            { k: "Region", v: "Singapore-hosted · APAC-first · PDPA-aware" },
            { k: "Status", v: "Pilot live at DFI Synergy · v13 imaging cohort" },
          ].map((p) => (
            <div key={p.k} className="grid gap-2 border-l border-[var(--color-tide)] pl-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                {p.k}
              </p>
              <p className="text-base text-[var(--color-text)] leading-snug">{p.v}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* SLIDE 4 — Why this design */}
      <Slide n={4} eyebrow="Audit findings">
        <H2>The dental category is dated. We&apos;re betting against it.</H2>
        <p className="mt-6 text-[16px] text-[var(--color-text-muted)] max-w-[68ch] leading-relaxed">
          We tore down 9 dental + adjacent SaaS sites (Dentrix Ascend, Curve, Pearly, NovaDontics,
          Dental Intelligence, Tebra, Jane, Linear, Attio). Three patterns dominate the dental
          incumbents — and three moves let us look unmistakably different.
        </p>

        <ul className="mt-10 grid grid-cols-3 gap-6">
          {[
            {
              cat: "Lifestyle photos as hero",
              ours: "Product UI as the hero visual",
              note: "Linear-pattern. No competitor in dental does this.",
            },
            {
              cat: '"All-in-one" / generic SaaS taglines',
              ours: "Verb-stack of jobs",
              note: "Book, chart, bill, image, message. Names what you do.",
            },
            {
              cat: "Pricing hidden in nav",
              ours: "Pricing in top-level nav · $200/mo",
              note: "Modern pattern. Incumbents hide; entrants surface.",
            },
          ].map((c) => (
            <li
              key={c.cat}
              className="grid gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-6"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                Category default
              </p>
              <p className="text-[14px] text-[var(--color-text-muted)] line-through decoration-[var(--color-text-soft)]/40">
                {c.cat}
              </p>
              <div className="border-t border-[var(--color-border)] pt-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-tide-deep)]">
                  Oralstack
                </p>
                <p className="mt-1 text-[18px] font-semibold tracking-tight text-[var(--color-text)]">
                  {c.ours}
                </p>
                <p className="mt-2 text-xs text-[var(--color-text-soft)] leading-relaxed">
                  {c.note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Slide>

      {/* SLIDE 5 — Site map */}
      <Slide n={5} eyebrow="Information architecture">
        <H2>11 routes, organized around the buyer journey.</H2>

        <div className="mt-10 grid grid-cols-3 gap-10">
          {[
            {
              group: "Discovery",
              items: [
                ["/", "Homepage — verb-stack hero, workflows teaser, customer story, CTA"],
                ["/workflows", "6 workflows visualised, each in detail"],
              ],
            },
            {
              group: "Trust",
              items: [
                ["/customers", "Pilot list + arms-length framing"],
                ["/customers/dfi-synergy", "Cornerstone case study"],
                ["/security", "Architecture posture, honestly qualified"],
                ["/changelog", "Public log of what's shipping"],
              ],
            },
            {
              group: "Conversion + legal",
              items: [
                ["/integrations", "Live / Beta / Roadmap by category"],
                ["/pricing", "$200 / clinic / month pilot card"],
                ["/privacy", "PDPA + GDPR-aware"],
                ["/terms", "Singapore governing law"],
                ["/not-found", "Branded 404 with tooth mark"],
              ],
            },
          ].map((col) => (
            <div key={col.group} className="grid gap-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                {col.group}
              </p>
              <ul className="grid gap-3">
                {col.items.map(([route, desc]) => (
                  <li key={route} className="grid gap-1">
                    <p className="text-sm font-mono font-medium text-[var(--color-text)]">
                      {route}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-[var(--color-text-soft)] tracking-[0.04em]">
          Plus generated assets: /icon.svg · /apple-icon · /opengraph-image · /sitemap.xml ·
          /robots.txt
        </p>
      </Slide>

      {/* SLIDE 6 — Homepage */}
      <Slide n={6} eyebrow="Page · /">
        <H2>Homepage</H2>
        <p className="mt-4 text-[16px] text-[var(--color-text-muted)] max-w-[68ch] leading-relaxed">
          Verb-stack headline + product UI as the hero. Below: a qualified trust strip, a workflow
          card grid (each card hooks into the /workflows deep dive), the cornerstone customer story,
          and a pilot CTA.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="bg-[var(--color-canvas-tinted)] rounded-[var(--radius-lg)] p-5 flex items-center justify-center">
            <ScheduleMock />
          </div>
          <div className="grid gap-4">
            {[
              [
                "Verb-stack hero",
                '"Book, chart, bill, image, message." — names every job in nine words.',
              ],
              [
                "Product UI hero visual",
                "Live schedule mock — no stock photos, no laptop mockups.",
              ],
              [
                "Qualified trust strip",
                "Pilot at DFI Synergy · region-hosted · audit-logged · PDPA + HIPAA-aware.",
              ],
              ["Workflow cards", "4 cards lead to /workflows#anchor for deep detail."],
              [
                "Cornerstone customer story",
                "Surfaces DFI Synergy + a clear path to the case study.",
              ],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)]">
                  {k}
                </p>
                <p className="text-sm text-[var(--color-text)] leading-snug">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* SLIDE 7 — Workflows */}
      <Slide n={7} eyebrow="Page · /workflows">
        <H2>Six workflows, each visualised.</H2>
        <p className="mt-4 text-[16px] text-[var(--color-text-muted)] max-w-[68ch] leading-relaxed">
          One section per JTBD. Visual on one side, body + bullets + a &ldquo;Replaces&rdquo; line
          on the other. Visuals alternate sides for vertical rhythm. Recall and imaging show two
          stacked visuals each (queue → conversation; grid → single-image deep view).
        </p>

        <ul className="mt-8 grid grid-cols-6 gap-3">
          {[
            { name: "Front desk", node: <ScheduleMock /> },
            { name: "Billing", node: <CheckoutMock /> },
            { name: "Charting", node: <OdontogramMock /> },
            { name: "Imaging", node: <ImagingMock /> },
            { name: "Recall", node: <RecallMock /> },
            { name: "Operations", node: <AnalyticsMock /> },
          ].map((w) => (
            <li
              key={w.name}
              className="grid gap-2 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] p-2"
            >
              <div className="bg-white rounded-[var(--radius-sm)] p-1.5 flex items-center justify-center min-h-[120px] overflow-hidden">
                <div style={{ transform: "scale(0.36)", transformOrigin: "center" }}>{w.node}</div>
              </div>
              <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-soft)] text-center">
                {w.name}
              </p>
            </li>
          ))}
        </ul>
      </Slide>

      {/* SLIDE 8 — Case study */}
      <Slide n={8} eyebrow="Page · /customers/dfi-synergy">
        <H2>DFI Synergy — cornerstone customer story.</H2>
        <p className="mt-4 text-[16px] text-[var(--color-text-muted)] max-w-[68ch] leading-relaxed">
          Three-week pilot from paper-and-WhatsApp to four workflows live, no fallback diary.
          Profile sidebar, hero pull-quote paired with the product UI, body sections with embedded
          visualizations, stat grid, mid-page pull quote, and a pilot CTA.
        </p>

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 items-start">
          <div className="grid gap-4 rounded-[var(--radius-lg)] bg-[var(--color-canvas-tinted)] p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Hero quote (verbatim)
            </p>
            <blockquote className="text-[20px] font-medium tracking-tight leading-[1.25] text-[var(--color-text)]">
              &ldquo;We used to book on WhatsApp and a paper diary. Now we don&apos;t reschedule
              without it being on the schedule, and the bill is ready before the patient stands
              up.&rdquo;
            </blockquote>
            <p className="text-xs text-[var(--color-text-soft)] uppercase tracking-[0.16em]">
              Practice manager, DFI Synergy
            </p>

            <div className="mt-4 grid grid-cols-4 gap-3 border-t border-[var(--color-border)] pt-4">
              {[
                ["3 weeks", "to live"],
                ["0", "appts lost"],
                ["120+", "drag reschedules wk 3"],
                ["85%", "same-day billing"],
              ].map(([v, l]) => (
                <div key={v} className="grid gap-0.5">
                  <p className="text-[20px] font-semibold text-[var(--color-text)] tabular-nums leading-none">
                    {v}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-soft)] leading-tight">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[var(--color-canvas-tinted)] rounded-[var(--radius-lg)] p-5 flex items-center justify-center">
            <ScheduleMock />
          </div>
        </div>
      </Slide>

      {/* SLIDE 9 — Visualization library */}
      <Slide n={9} eyebrow="Library">
        <H2>8 product visualizations, all from the codebase.</H2>
        <p className="mt-4 text-[16px] text-[var(--color-text-muted)] max-w-[68ch] leading-relaxed">
          Pure CSS/HTML React components. Brand tokens only. Singapore-fictional canonical patient
          names. All wired into production pages. Documented in components/visuals/README.md,
          reviewed at /dev/visuals.
        </p>

        <ul className="mt-8 grid grid-cols-4 gap-3">
          {[
            { name: "ScheduleMock", node: <ScheduleMock /> },
            { name: "OdontogramMock", node: <OdontogramMock /> },
            { name: "CheckoutMock", node: <CheckoutMock /> },
            { name: "ImagingMock", node: <ImagingMock /> },
            { name: "RecallMock", node: <RecallMock /> },
            { name: "MessagingMock", node: <MessagingMock /> },
            { name: "DicomViewerMock", node: <DicomViewerMock /> },
            { name: "AnalyticsMock", node: <AnalyticsMock /> },
          ].map((m) => (
            <li
              key={m.name}
              className="grid gap-2 rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] p-2"
            >
              <div className="bg-white rounded-[var(--radius-sm)] p-1.5 flex items-center justify-center min-h-[110px] overflow-hidden">
                <div style={{ transform: "scale(0.32)", transformOrigin: "center" }}>{m.node}</div>
              </div>
              <span className="font-mono text-[9px] text-[var(--color-text)] truncate text-center">
                {m.name}
              </span>
            </li>
          ))}
        </ul>
      </Slide>

      {/* SLIDE 10 — Status + next */}
      <Slide n={10} eyebrow="Status">
        <H2>Where we are. What&apos;s next.</H2>

        <div className="mt-10 grid grid-cols-2 gap-12">
          <div className="grid gap-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[color-mix(in_oklch,var(--color-tide-deep),var(--color-ink)_30%)]">
              Shipped
            </p>
            <ul className="grid gap-2.5 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {[
                "11 production routes + sitemap, robots, OG image, favicon, branded 404",
                "Brand v2: tooth mark, navy + teal, two-tone Oralstack wordmark, $200/mo pricing",
                "Brand identity guidelines: logo · color · typography (research/brand/)",
                "Library of 8 product visualizations, all wired into production pages",
                "Workflows page — 6 sections, alternating-side, multi-visual support",
                "DFI Synergy case study with embedded visualizations + 3-up grid",
                "Integrations page — Live / Beta / Roadmap with category icons",
                "Security + privacy + terms (qualified, dental-context, with icons)",
                "Changelog (10 entries grounded in v12.1 → v13 history)",
                "JSON-LD Organization schema · Motion animations · responsive",
                "Internal /dev/visuals catalog + this /dev/deck",
              ].map((s) => (
                <li key={s} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 inline-block h-1 w-1 rounded-full bg-[var(--color-tide-deep)] shrink-0"
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_30%)]">
              Next (gated on inputs)
            </p>
            <ul className="grid gap-2.5 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {[
                "Real product screenshots to replace one or more schematic mocks",
                "Second case study (a clinic story other than DFI Synergy)",
                "/about page with founder context (positioning question first)",
                "Cloudflare Pages deploy + custom domain wiring at oralstack.com",
                "Cloudflare Web Analytics + real demo-booking flow (Cal.com / Tally)",
                "Real inbox at hello@oralstack.com via Cloudflare Email Routing",
                "Lighthouse + axe-core a11y audit pass before public launch",
              ].map((s) => (
                <li key={s} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 inline-block h-1 w-1 rounded-full bg-[color-mix(in_oklch,var(--color-sunset-deep),var(--color-ink)_25%)] shrink-0"
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-[var(--radius-lg)] bg-[var(--color-canvas-tinted)] p-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Open questions for the team
          </p>
          <ul className="mt-3 grid gap-1.5 text-sm text-[var(--color-text-muted)] leading-relaxed">
            <li>Lock the lead claim — currently placeholder (verb-stack of jobs).</li>
            <li>Lock the ICP — currently APAC general-practice clinics.</li>
            <li>
              Confirm DFI Synergy sister clinics that actually run Oralstack — extends customer
              base.
            </li>
            <li>Founder bios + photo for /about (or hold the page).</li>
            <li>Greenlight Cloudflare deploy (one-time wrangler login).</li>
          </ul>
        </div>
      </Slide>
    </main>
  );
}
