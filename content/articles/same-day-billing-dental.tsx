import type { Article } from "./types";

export const sameDayBillingDental: Article = {
  slug: "same-day-billing-dental",
  title: "Same-day billing for dental clinics: the discharge-flow model",
  description:
    "How Singapore dental clinics raise same-day-bill rate from ~60% to 85% by redesigning the discharge moment — covering treatment-line auto-population, insurance separation, and the four-step checkout flow.",
  excerpt:
    "Same-day-bill rate is the most under-watched metric in dental finance. Going from 60% to 85% in a 3-chair clinic is real money — and it's not about sending more invoices.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "billing",
  tags: ["billing", "discharge", "GST", "Singapore", "revenue cycle"],
  readingMinutes: 8,
  canonical: true,
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Same-day-bill rate — the percentage of visits invoiced and paid in the same visit — is the
        most under-watched metric in dental finance. Most 3-chair Singapore clinics sit at 55–65%.
        The clinics that hit 85%+ aren&apos;t sending more invoices. They&apos;ve redesigned the
        discharge moment, and the gains compound across every line of the P&amp;L.
      </p>

      <p>
        This article is for the clinic owner or office manager looking at their A/R aging report and
        wondering where the leak is. The leak is almost always at discharge — the moment between
        &ldquo;treatment complete&rdquo; and &ldquo;patient walks out the door.&rdquo;
      </p>

      <h2>What same-day-bill rate measures, and why it matters</h2>

      <p>
        Same-day-bill rate is the share of visits where the invoice is finalised and the patient
        portion is collected before they leave. Industry benchmarks vary, but for general + hygiene
        practices in Singapore:
      </p>

      <ul>
        <li>Below 60% — likely a process problem at discharge</li>
        <li>60–75% — typical, with room to improve</li>
        <li>75–85% — well-run clinic with good handoff between clinical and front desk</li>
        <li>85%+ — discharge-flow model in place</li>
      </ul>

      <p>
        The math: a 3-chair clinic averaging 8 visits per chair per day at an average ticket of
        S$200 sees S$4,800 in daily revenue. At 60% same-day rate, that&apos;s S$1,920 per day
        chasing invoices that haven&apos;t cleared. Some of that becomes receivables. A meaningful
        slice ages out and gets written off.
      </p>

      <p>
        Then there&apos;s the staff cost. Each unbilled visit costs roughly 3 staff-minutes of
        follow-up — phone call, manual statement, possibly a second call. For a clinic doing 200
        visits a week with a 60% same-day rate, that&apos;s 80 unbilled visits × 3 minutes = 4 hours
        per week of office-manager time on collections that shouldn&apos;t need collecting.
      </p>

      <h2>Why the traditional reconcile-at-end-of-day model leaks</h2>

      <p>
        The traditional dental billing flow looks like this: clinical work finishes, the dentist or
        hygienist writes notes in the chart, front desk types treatment lines into the invoice
        (often from a printed slip), patient pays what&apos;s ready, and an office manager
        reconciles everything at end of day.
      </p>

      <p>Three structural problems with this model:</p>

      <ul>
        <li>
          <strong>Double entry.</strong> Treatment notes are keyed in the chart, then keyed again in
          the invoice. Anything that gets keyed twice eventually gets keyed wrong, or not at all.
        </li>
        <li>
          <strong>End-of-day reconciliation catches errors but doesn&apos;t recover time.</strong>{" "}
          The office manager finds the missing line item at 6pm — the patient left at 4pm.
          They&apos;re now a follow-up call.
        </li>
        <li>
          <strong>Patients leave before the bill is final.</strong> If the bill isn&apos;t ready
          when they stand up, they&apos;re out the door. Getting them back to pay is awkward and
          costs everyone time.
        </li>
      </ul>

      <h2>The discharge-flow model</h2>

      <p>
        The principle is simple: <strong>the bill is ready before the patient stands up.</strong>{" "}
        Done right, it&apos;s built from four components:
      </p>

      <h3>1. Treatment-line auto-population from the chart</h3>

      <p>
        Every condition or procedure entered in the chart maps to a billable line item with a code
        (DCC107 for composite filling, DCC301 for polish &amp; scale, etc.). When the clinical team
        finishes notes, the invoice draft already has the right lines. Front desk reviews and
        confirms — they don&apos;t re-key.
      </p>

      <p>
        This is the single biggest lever. It eliminates the double-entry bottleneck and means the
        bill is mechanically correct by the time the patient gets to the front desk.
      </p>

      <h3>2. Insurance vs patient portion structurally separate</h3>

      <p>
        For Singapore clinics with insurance involvement (Aviva, Great Eastern, AIA, MediShield),
        the bill needs two structurally different ledgers — one for insurer-paid lines, one for
        patient portion. Conflating them is where most billing software fails.
      </p>

      <p>
        Patient portion gets collected at discharge. Insurance portion goes through the TPA
        workflow. Both should be visible on the receipt, but the patient pays only their share.
      </p>

      <h3>3. Audit-logged adjustments</h3>

      <p>
        Write-offs, discounts, courtesy adjustments — every change to a bill needs a logged
        who/what/when. This isn&apos;t bureaucracy; it&apos;s the difference between a clean audit
        trail and the office manager fielding &ldquo;who edited this invoice?&rdquo; questions at
        end of month.
      </p>

      <p>
        For PDPA-aligned clinics this matters operationally — financial records of patient
        transactions are PDPA-relevant data, and edits need to be traceable.
      </p>

      <h3>4. Same-flow checkout: bill → pay → receipt → recall → done</h3>

      <p>The four steps happen in one continuous flow at the front desk:</p>

      <ul>
        <li>Bill is reviewed and confirmed (treatment lines from the chart)</li>
        <li>Patient pays — PayNow, card, cash, or split — receipt prints/sends</li>
        <li>Recall is scheduled in the same view (3 weeks before due, sorted by recall age)</li>
        <li>Patient walks out the door</li>
      </ul>

      <p>
        End-to-end, this is 90 seconds for a typical visit. Compare to the traditional flow where
        billing and recall are separate processes running in different windows.
      </p>

      <h2>Singapore-specific considerations</h2>

      <p>
        A few specifics for Singapore practices that aren&apos;t obvious from international dental
        billing software:
      </p>

      <ul>
        <li>
          <strong>GST 9%</strong> — every invoice needs the GST line itemised. Most international
          billing software handles VAT/sales tax as a single rate; Singapore clinics need GST
          flagged correctly per the Inland Revenue Authority&apos;s requirements.
        </li>
        <li>
          <strong>PayNow QR codes</strong> as a payment mode — preferred by many patients over card
          for amounts under S$300, and the merchant fee is materially lower. Generate the QR per
          invoice; the patient scans, pays, transaction logs to the invoice.
        </li>
        <li>
          <strong>SingPass payment links</strong> for bigger-ticket treatments — useful when the
          patient wants to authorise from a family member.
        </li>
        <li>
          <strong>MediSave for dental</strong> — limited applicability (mostly surgical, not
          general), but where it applies, the claim processing should attach to the invoice
          automatically rather than being a parallel paperwork track.
        </li>
      </ul>

      <h2>What to look for in billing software</h2>

      <p>If you&apos;re evaluating a switch, four checks separate the modern from the legacy:</p>

      <ul>
        <li>
          <strong>Treatment-to-line auto-population</strong> from the chart, with no manual lookup
          required. (If front desk has to search a code list, you haven&apos;t solved the
          bottleneck.)
        </li>
        <li>
          <strong>Insurance line structurally separate</strong> from patient portion, with separate
          ledgers visible.
        </li>
        <li>
          <strong>Real audit log</strong> on every adjustment — not just a &ldquo;last edited&rdquo;
          field. Each change needs reason and actor.
        </li>
        <li>
          <strong>Recall scheduled in the same flow</strong> as billing — not a separate task.
          Otherwise patients leave without their next visit on the books.
        </li>
      </ul>

      <h2>What to do next</h2>

      <p>
        Start by measuring your current rate. Pull a week of invoices and compute the share that
        were finalised and patient-portion-paid before the visit closed. If you&apos;re below 75%,
        the discharge flow is the bottleneck.
      </p>

      <p>
        See the{" "}
        <a
          href="/workflows#billing"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          Oralstack billing workflow
        </a>{" "}
        for how the discharge-flow model is implemented. Or read the{" "}
        <a
          href="/customers/dfi-synergy"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          DFI Synergy case study
        </a>{" "}
        for a worked example of moving from 60% to 85% same-day rate over a 4-week pilot.
      </p>
    </>
  );
}
