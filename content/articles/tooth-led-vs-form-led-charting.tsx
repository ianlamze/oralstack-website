import type { Article } from "./types";

export const toothLedVsFormLedCharting: Article = {
  slug: "tooth-led-vs-form-led-charting",
  title:
    "Tooth-led charting vs form-led charting: why the chart should match the chair",
  description:
    "Most legacy dental software makes clinicians fill forms to record findings. Tooth-led charting reverses the model — click the tooth, see history, annotate the surface. Why this matters for clinical speed and accuracy.",
  excerpt:
    "Form-led charting fits the system's data model. Tooth-led charting fits the clinician's mental model. The difference shows up in 4-second findings vs 30-second findings.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "clinical",
  tags: ["charting", "case notes", "FDI", "clinical workflow"],
  readingMinutes: 9,
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Most legacy dental software still asks the dentist to fill a form
        to record a finding — patient ID, tooth number, surface, condition,
        status, date, four dropdowns, save. The chart is built around the
        form&apos;s data model, not the clinician&apos;s mental model. The
        cost is real: 30 seconds per finding instead of 4, and a
        meaningful percentage of findings that never get logged because
        the form is too heavy for a quick observation.
      </p>

      <p>
        This article is for the clinical lead choosing between dental PMS
        options, or the clinic owner trying to understand why their
        clinicians complain about charting. The fix isn&apos;t a faster
        form. It&apos;s a different paradigm.
      </p>

      <h2>The two paradigms</h2>

      <p>
        Strip every dental charting system to its essence and you find one
        of two architectures.
      </p>

      <h3>Form-led</h3>

      <p>
        Clinical work fits the system&apos;s UI. To log a caries finding,
        the clinician opens the patient → opens the chart tab → clicks
        &ldquo;Add condition&rdquo; → fills a form (tooth dropdown, surface
        dropdown, condition dropdown, status, date, notes) → saves. The
        chart is a list of saved condition records. To see the tooth,
        you navigate there from the form.
      </p>

      <p>
        This is how most legacy dental PMS works. It&apos;s the natural
        result of a database-first design philosophy: the system stores
        rows in a table; the UI is a CRUD form on the table.
      </p>

      <h3>Tooth-led</h3>

      <p>
        The system UI fits the clinical workflow. To log a caries finding,
        the clinician clicks the tooth → clicks the surface (M, D, B, L,
        or O) → picks a condition from a small palette → done. The
        chart is the visual representation of the patient&apos;s mouth;
        the condition records are an emergent property of what&apos;s
        annotated.
      </p>

      <p>
        This is closer to how clinicians actually think — the tooth is the
        primary unit, the surface is its substructure, the condition is
        an annotation on a specific surface at a specific time.
      </p>

      <h2>What tooth-led actually looks like</h2>

      <p>
        Five characteristics distinguish a real tooth-led chart from a
        form-led chart that happens to show a tooth diagram on screen.
      </p>

      <h3>1. The tooth is the primary affordance</h3>

      <p>
        The first interaction in every clinical session is clicking a
        tooth. Not opening a form, not navigating a tab. Click → see
        history, conditions, notes, planned treatment. This is what the
        clinician&apos;s eye does anyway when reviewing the patient — a
        tooth-led system mirrors that.
      </p>

      <h3>2. Surface-level granularity</h3>

      <p>
        FDI numbering identifies the tooth (e.g., 16 for upper right first
        molar). Surfaces (Mesial, Distal, Buccal, Lingual, Occlusal)
        identify where on the tooth the condition lives. A real tooth-led
        chart lets you click into a surface and annotate it specifically
        — not just &ldquo;caries on tooth 16,&rdquo; but &ldquo;caries on
        16 occlusal.&rdquo;
      </p>

      <p>
        This matters for treatment planning. A composite filling on the
        occlusal is different from one that wraps to the distal. The
        chart should record that distinction; the bill should reflect it;
        the next-visit clinician should see it.
      </p>

      <h3>3. Status visible inline, not behind a click</h3>

      <p>
        Conditions have states — active, planned, completed, watch. A
        tooth-led chart shows the state visually on the tooth itself: a
        coloured surface for active conditions, a dashed outline for
        planned, a dimmed fill for completed, a small dot for watch
        items.
      </p>

      <p>
        The clinician sees the state of every tooth in their patient&apos;s
        mouth at a glance, without clicking through. This is what enables
        the &ldquo;chart in 30 seconds, not 5 minutes&rdquo; review at the
        start of a visit.
      </p>

      <h3>4. Procedure templates editable per visit</h3>

      <p>
        Most procedures have a common pattern (composite filling: anaesthesia,
        isolation, prep, etch, bond, place, cure, polish, occlusion check)
        that the clinician customises per case. A tooth-led system
        provides templates that auto-fill when a procedure is selected,
        and lets the clinician modify per visit.
      </p>

      <p>
        Templates aren&apos;t about robotic notes; they&apos;re about
        skipping the boilerplate so the clinician can focus on
        case-specific detail.
      </p>

      <h3>5. Direct write-back to billing</h3>

      <p>
        When a procedure is logged in the chart, the corresponding
        billable line items should appear on the discharge invoice
        automatically. No re-entry by the front desk. This is the
        single biggest operational win of tooth-led charting — it
        connects clinical work to revenue without manual handoff.
      </p>

      <p>
        See{" "}
        <a
          href="/articles/same-day-billing-dental"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          same-day billing
        </a>{" "}
        for why this connection matters for cash flow.
      </p>

      <h2>Why it matters operationally</h2>

      <h3>Speed</h3>

      <p>
        A typical caries finding logged in a tooth-led chart: 4–5 seconds.
        Same finding in a form-led chart: 25–35 seconds. For a clinician
        seeing 10–14 patients a day with an average of 4–6 findings or
        notes per visit, the difference is 15–25 minutes a day. Not
        revolutionary in isolation, but it adds up — and more importantly,
        it removes the friction that causes findings to be skipped.
      </p>

      <h3>Accuracy through granularity</h3>

      <p>
        Whole-tooth condition logging hides clinically important detail.
        &ldquo;Caries on 16&rdquo; could be on the occlusal (often
        straightforward to fill), the mesial-distal (more complex,
        possibly requiring an inlay), or wrapping multiple surfaces
        (might need a crown). Surface-level logging makes treatment
        planning more accurate from day one.
      </p>

      <h3>Cross-reference with case notes</h3>

      <p>
        Case notes that link to specific surfaces — &ldquo;noted slight
        sensitivity at 16-O during last visit&rdquo; — turn into useful
        history rather than chronological prose. The next clinician
        opening the chart sees the note attached to the surface, not
        buried in a paragraph.
      </p>

      <h3>Onboarding new clinicians</h3>

      <p>
        A new associate joining a clinic with form-led software needs
        days to learn the form&apos;s flow before they&apos;re productive.
        With a tooth-led system, the muscle memory matches the chair —
        click tooth, click surface, click condition. Productive in an
        hour.
      </p>

      <h2>The Singapore numbering question</h2>

      <p>
        Singapore dental schools teach FDI numbering (1.6 for upper right
        first molar) — same as most of Asia and Europe. US-developed
        software often defaults to Universal numbering (3 for the same
        tooth), which is wrong for Singapore practices.
      </p>

      <p>
        A tooth-led system should let the clinic pick its primary numbering
        scheme and display it consistently — chart, notes, billing,
        recall. Mixing schemes is a recipe for misfiled records and
        treatment errors. For Singapore practices, FDI should be the
        default; Universal should be available for inbound referrals
        from US sources.
      </p>

      <h2>What to look for when evaluating a chart</h2>

      <p>
        Five tests to run when demoing dental PMS options:
      </p>

      <ul>
        <li>
          <strong>The 5-second test</strong> — open a patient, log a caries
          finding on tooth 16 occlusal. If it takes more than 5 seconds,
          the chart is form-led.
        </li>
        <li>
          <strong>The surface test</strong> — can you log a finding on the
          mesial surface specifically, not just &ldquo;tooth 16&rdquo;?
        </li>
        <li>
          <strong>The status test</strong> — close and reopen the chart. Are
          active conditions visually obvious, or do you need to read
          through a list?
        </li>
        <li>
          <strong>The template test</strong> — log a routine procedure (composite
          filling, polish &amp; scale). Does a template auto-fill?
        </li>
        <li>
          <strong>The billing test</strong> — does the procedure appear on
          the discharge invoice automatically, or does the front desk
          re-enter it?
        </li>
      </ul>

      <h2>What to do next</h2>

      <p>
        If the demo flunks the 5-second test, no amount of marketing copy
        about &ldquo;modern charting&rdquo; saves it. The chart is form-led.
        Move on.
      </p>

      <p>
        See the{" "}
        <a
          href="/workflows#charting"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          Oralstack charting workflow
        </a>{" "}
        for how the tooth-led model is implemented, including
        surface-level granularity and direct write-back to billing.
        Or read{" "}
        <a
          href="/articles/dicom-in-chart-vs-separate-viewer"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          DICOM in the chart
        </a>{" "}
        for the imaging side of the same story — why imaging should live
        in the patient record, not in a parallel app.
      </p>
    </>
  );
}
