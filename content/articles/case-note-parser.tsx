import type { Article } from "./types";

export const caseNoteParser: Article = {
  slug: "case-note-parser",
  title: "From case note to chart and bill: how Oralstack parses clinical prose",
  description:
    "Most dental software still asks the dentist to log a finding twice — once in case notes, once in the chart, and a third time on the invoice. Oralstack parses the case note prose into chart entries and billing lines at the same time. Here's how, what it recognises, and where it asks for confirmation.",
  excerpt:
    "The dentist already typed it. Don't make them type it again in a dropdown. Oralstack reads the case note and fans the same prose out into chart updates and billing lines, with confidence scoring on every match.",
  publishedAt: "2026-04-28",
  author: "Oralstack team",
  cluster: "clinical",
  tags: ["case notes", "charting", "billing", "parser", "clinical workflow"],
  readingMinutes: 7,
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Most dental software still asks the dentist to log every finding three times — once in the
        case note, once by clicking through a dropdown to shade the chart, and a third time so the
        front desk has a billing line to charge against. The fields look slightly different each
        time, the wording drifts, and at the end of the day someone reconciles. The cost isn&apos;t
        just minutes per visit; it&apos;s the silent gap between what the dentist actually did, what
        the chart shows, and what the patient was billed for.
      </p>

      <p>
        Oralstack inverts that flow. The dentist types the case note the way they already speak it —
        &ldquo;46MOD filling A3 CR done, 47MO done, fluoride done, SAP done&rdquo; — and the system
        parses the prose into two structured outputs at the same time: chart entries that shade the
        odontogram on save, and billing line items the front desk can charge. This article walks
        through what the parser actually recognises, how it handles ambiguity, and where the dentist
        still gets the last word.
      </p>

      <h2>The case note is the input, not a side effect</h2>

      <p>
        In a form-led PMS, the case note is documentation the dentist writes <em>after</em> the
        clinical work is captured in dropdowns. In a parser-led PMS, the case note is the input —
        the chart and the bill are derived from it. That ordering matters because the dentist
        already writes in domain shorthand: tooth numbers in FDI, surfaces in single letters,
        procedures in abbreviations the profession has used for fifty years. Asking them to re-enter
        the same information through a dropdown is the part of charting software that feels worst,
        and it&apos;s the part that introduces the most drift.
      </p>

      <p>A typical Oralstack case note for a single visit might look like this:</p>

      <ul>
        <li>SAP done</li>
        <li>Fluoride done</li>
        <li>Etch · bond · sectional matrix</li>
        <li>46MOD filling A3 CR done</li>
        <li>47MO filling A3 CR done</li>
      </ul>

      <p>
        Five lines, written in the order they happened. The parser reads it and produces two
        structured outputs.
      </p>

      <h2>What the parser recognises</h2>

      <p>
        The chart side covers the standard vocabulary a Singapore dentist actually writes. Tooth
        numbers in FDI (11–18, 21–28, 31–38, 41–48). Surfaces as single letters (M, D, B, L, O —
        with P normalised to L and I normalised to O for incisal). Conditions written either in full
        or as the common abbreviations: <em>RCT</em> for root canal, <em>exo</em> for extraction,{" "}
        <em>SRP</em> for scaling and root planing, <em>GIC</em> or <em>Fuji II / Fuji IX</em> for
        glass ionomer, <em>fmc</em> for full metal crown, <em>NCCL</em> for non-carious cervical
        lesion, <em>SSC</em> for stainless steel crown. Status follows the wording —
        &ldquo;done&rdquo; or &ldquo;completed&rdquo; produces a completed entry;
        &ldquo;planned&rdquo; or &ldquo;tx plan&rdquo; produces a planned entry; watch / monitor /
        KIV all map to a watch finding.
      </p>

      <p>
        The billing side maps the same prose into Singapore service codes — SVC009 for exam and
        consultation, SVC093 for combined scaling and polishing, SVC087 for fluoride application,
        SVC121 for tooth-coloured filling (complex), and so on. Every billing match links back to
        the source phrase in the case note, so the front desk can see exactly which sentence
        produced which line.
      </p>

      <h2>Tier inference</h2>

      <p>
        Singapore patients pay one of several rates: full Private, CHAS Blue (lower-income subsidy),
        CHAS Orange (middle-income subsidy), Pioneer Generation (≥1949 birth cohort), or Merdeka
        Generation (1950–59 birth cohort). The right rate depends on the patient&apos;s eligibility
        profile, not the procedure. Oralstack reads the patient&apos;s tier from their record and
        substitutes the correct schedule before showing the dentist the matched lines. The dentist
        sees &ldquo;Inferred tier: Private&rdquo; (or whichever applies) at the top of the billing
        matches block, with one click to override if eligibility has changed since the last visit.
      </p>

      <p>
        This matters because in a busy clinic, the question that gets asked at the desk —{" "}
        <em>was this patient on CHAS Blue or Orange last month?</em> — has a real answer in the
        eligibility record that the parser already consulted. The front desk doesn&apos;t look it
        up; they confirm.
      </p>

      <h2>Two structured outputs from one prose input</h2>

      <p>For the case note above, the parser produces:</p>

      <h3>Chart matches (2)</h3>

      <ul>
        <li>
          <strong>#46 MOD</strong> · Filling (Composite) · status: completed — source phrase{" "}
          <em>&ldquo;46MOD filling A3 CR&rdquo;</em>
        </li>
        <li>
          <strong>#47 MO</strong> · Filling (Composite) · status: completed — source phrase{" "}
          <em>&ldquo;47MO filling A3 CR done&rdquo;</em>
        </li>
      </ul>

      <h3>Billing matches (5)</h3>

      <ul>
        <li>
          <strong>SVC009</strong> · Exam and consultation
        </li>
        <li>
          <strong>SVC093</strong> · Scaling and polishing
        </li>
        <li>
          <strong>SVC087</strong> · Fluoride application
        </li>
        <li>
          <strong>SVC121</strong> · Tooth-coloured filling (complex) · #46 MOD
        </li>
        <li>
          <strong>SVC121</strong> · Tooth-coloured filling (complex) · #47 MO
        </li>
      </ul>

      <p>
        Both outputs are visible in the same panel as the case note. Nothing is saved silently — the
        dentist sees what was matched, confirms or edits, and saves. On save, the chart shades and
        the billing draft is ready for front-desk review at discharge.
      </p>

      <h2>Confidence, sections, and ambiguity</h2>

      <p>
        Every parsed entry returns a confidence score (low, medium, or high) and a section tag
        (charting, treatment, plan, OHI, prescription, follow-up, admin). High-confidence matches
        are the ones the parser will save without prompting — &ldquo;46MOD filling done&rdquo; is
        unambiguous in form, surface, and procedure. Lower-confidence matches surface for
        confirmation: a phrase like &ldquo;adv exo 38&rdquo; near a treatment-plan section header is
        parsed as <em>extraction planned</em> on tooth 38, not as a completed extraction. A bare
        reference like &ldquo;tooth 36&rdquo; with no condition attached doesn&apos;t produce an
        entry at all — it&apos;s correctly read as a reference, not a finding.
      </p>

      <p>
        Section context is what makes this work. The same word can mean different things in
        different parts of the note. &ldquo;Watch&rdquo; under a treatment heading is a
        watch-finding; &ldquo;watch&rdquo; in a follow-up section is a recall hint. The parser
        classifies the section first, then matches conditions in that context. Negated phrases
        (&ldquo;no caries&rdquo;, &ldquo;no mobility&rdquo;) are recognised and excluded.
      </p>

      <h2>What this changes operationally</h2>

      <p>Three things shift when the case note becomes the input:</p>

      <ul>
        <li>
          <strong>Single source of truth.</strong> The chart and the bill are projections of the
          case note. Fix the case note, both update. There is no end-of-day reconciliation step
          where a missing line item is hunted down — the line item came from the note itself.
        </li>
        <li>
          <strong>Same-day-bill rate goes up.</strong> The discharge moment is faster because the
          billing draft is ready before the patient stands up. The front desk reviews and confirms;
          they don&apos;t re-key. (See{" "}
          <a
            href="/articles/same-day-billing-dental"
            className="text-[var(--color-tide-deep)] underline underline-offset-4"
          >
            Same-day billing for dental clinics
          </a>{" "}
          for the math on why this matters for a 3-chair practice.)
        </li>
        <li>
          <strong>Dentist owns clinical accuracy; system owns coding.</strong> The dentist writes
          what they did, in the words they always have. The parser handles the boring part — mapping
          prose to codes, splitting into chart and billing, applying the right tier rate. The
          dentist gets the last word on every matched entry.
        </li>
      </ul>

      <h2>Limits and the cases where the dentist still types more</h2>

      <p>
        The parser is not a clinical AI; it&apos;s pattern-matching with section context and a
        carefully curated vocabulary. It handles the high-frequency procedures and abbreviations
        that make up the bulk of a general-practice day. Three areas still benefit from explicit
        dentist input:
      </p>

      <ul>
        <li>
          <strong>Truly novel phrasing.</strong> If the dentist writes a procedure description the
          parser hasn&apos;t seen before, the line shows as unmatched and the dentist can either
          edit the wording or add the entry by clicking through the palette.
        </li>
        <li>
          <strong>Multi-visit treatment plans.</strong> Plans that span future visits are parsed
          into <em>planned</em> findings on the chart — but the dentist confirms the visit
          assignment, since the system doesn&apos;t infer scheduling.
        </li>
        <li>
          <strong>Adjustments and write-offs.</strong> Bill adjustments still flow through the
          billing module&apos;s own audit-logged controls, not the case note. Discounts and courtesy
          adjustments shouldn&apos;t be inferred from prose.
        </li>
      </ul>

      <h2>What to do next</h2>

      <p>
        See the parser running in the{" "}
        <a
          href="/workflows#charting"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          charting workflow
        </a>{" "}
        — the case-note panel shows live parsed matches as the prose is typed. For the broader
        discharge story, the{" "}
        <a
          href="/workflows#billing"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          billing workflow
        </a>{" "}
        picks up where the parser leaves off: review, payment, receipt, recall, done.
      </p>

      <p>
        For a worked example of what this looks like in a 3-chair Singapore practice, the{" "}
        <a
          href="/customers/dfi-synergy"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          DFI Synergy case study
        </a>{" "}
        covers the full clinical-to-discharge flow.
      </p>
    </>
  );
}
