import type { Article } from "./types";

export const insuranceVsPatientPortionSingapore: Article = {
  slug: "insurance-vs-patient-portion-singapore",
  title: "Insurance vs patient portion: how Singapore dental clinics should structure billing",
  description:
    "TPA claims, MediSave, Integrated Shield Plans, and the two-ledger approach to dental billing that keeps reconciliation clean and patients clear on what they actually owe.",
  excerpt:
    "Most dental software treats insurance and patient portion as one ledger. In Singapore, that's where reconciliation pain and patient confusion start.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "billing",
  tags: ["insurance", "TPA", "MediSave", "Singapore", "billing"],
  readingMinutes: 8,
  cta: {
    eyebrow: "Insurance in production",
    title: "How Oralstack splits insurance and patient portion",
    body: "Two-ledger structure native: TPA-direct claims, MediSave-eligible lines, and patient portion stay structurally separate. Reconciliation reads itself.",
    buttonLabel: "See the billing workflow",
    buttonHref: "/workflows#billing",
  },
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Singapore dental insurance has specifics that most international dental software handles
        poorly. There are TPA-direct claims (Aviva, Great Eastern, AIA, AXA), Integrated Shield Plan
        coverage (for surgical procedures), and MediSave (limited applicability — mostly oral
        surgery, never general dentistry). The structural separation of insurance line from patient
        portion is the difference between a clean checkout and an end-of-month reconciliation that
        takes hours.
      </p>

      <p>
        This article is for the clinic owner or office manager dealing with the operational reality
        of insurance billing in Singapore. It complements{" "}
        <a
          href="/articles/same-day-billing-dental"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          same-day billing
        </a>{" "}
        and{" "}
        <a
          href="/articles/gst-singapore-dental-billing"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          GST mechanics
        </a>{" "}
        — read those first if you haven&apos;t.
      </p>

      <h2>The Singapore insurance landscape</h2>

      <p>For a typical general practice, three insurance interactions show up in billing:</p>

      <h3>TPA-direct (third-party administrator) claims</h3>

      <p>
        A patient with corporate dental cover through Aviva, Great Eastern, AIA, AXA, or similar
        usually has direct billing — the clinic invoices the TPA for the covered portion, the
        patient pays the rest at discharge. Most TPAs require pre-authorisation for procedures above
        a threshold (typically S$300–500), which adds an asynchronous workflow.
      </p>

      <h3>Integrated Shield Plans (IPs)</h3>

      <p>
        For inpatient surgical dental procedures (oral surgery, surgical extractions of impacted
        wisdom teeth in a hospital setting), IP coverage may apply. This is rare in standalone
        dental practice but common in oral surgery clinics. The claim runs through the
        hospital&apos;s admissions process, not directly through the dental clinic.
      </p>

      <h3>MediSave for dental</h3>

      <p>
        MediSave covers limited dental — surgical procedures only, mostly under specific HSA/MOH
        approved procedure codes (extraction of impacted teeth, certain biopsies). It does not cover
        general dentistry, hygiene, fillings, or cosmetic procedures. The claim is filed via
        MOH&apos;s portal post-procedure with supporting documentation.
      </p>

      <h2>The two-ledger approach</h2>

      <p>
        The structural model that handles all three cleanly is to keep two separate ledgers per
        invoice:
      </p>

      <ul>
        <li>
          <strong>Insurance ledger</strong> — what the insurer is liable for. Has its own GST
          handling (the insurer pays GST on their contribution; the clinic still recognises the
          gross fee for tax purposes).
        </li>
        <li>
          <strong>Patient ledger</strong> — what the patient owes at discharge. This is what gets
          collected in the same-day checkout flow.
        </li>
      </ul>

      <p>The invoice surface that the patient sees has a clear structure:</p>

      <ul>
        <li>Service fee (gross, excl. GST)</li>
        <li>GST 9%</li>
        <li>Total invoice value</li>
        <li>Insurance contribution (with their portion of GST)</li>
        <li>Patient portion payable</li>
      </ul>

      <p>
        The patient pays only the &ldquo;patient portion payable&rdquo; line at discharge. The
        insurance contribution is filed by the clinic with the TPA via their workflow.
      </p>

      <h2>Why conflating them hurts</h2>

      <p>Three operational failures when the ledgers are merged:</p>

      <h3>1. GST applied to the wrong base</h3>

      <p>
        If GST is computed on patient portion only (because the system treats &ldquo;patient
        portion&rdquo; as the invoice total), the clinic under-collects GST. IRAS expects GST on the
        gross service fee, not on the patient&apos;s share. The mismatch surfaces at F5 filing time
        as a reconciliation gap.
      </p>

      <h3>2. Insurance recovery delays misclassified as A/R</h3>

      <p>
        Insurance claims take 14–45 days to settle, depending on TPA. If the unpaid portion sits on
        the patient ledger as receivable, the A/R aging report flags it as a patient-due balance.
        The practice manager spends time chasing patients for amounts the patient doesn&apos;t owe.
        The right tag is &ldquo;insurance pending&rdquo;, not &ldquo;patient overdue.&rdquo;
      </p>

      <h3>3. End-of-month reconciliation takes hours, not minutes</h3>

      <p>
        When TPA payments arrive (usually batched), the office manager needs to match each payment
        to the right invoice and clear the insurance ledger. With separate ledgers, this is
        mechanical — sum payments by TPA, match to claim IDs, clear. With merged ledgers, every
        payment requires figuring out which invoice it partially settles and what&apos;s still owed
        by whom.
      </p>

      <h2>Pre-authorisation workflow</h2>

      <p>
        For TPA-direct billing on procedures above the pre-authorisation threshold (typically
        S$300–500 depending on TPA), the clinic submits the proposed treatment code and estimate,
        the TPA approves coverage amount, the clinic proceeds with treatment, the actual claim is
        filed post-procedure.
      </p>

      <p>
        Modern PMS systems handle this as a workflow with states: proposed → pre-auth submitted →
        pre-auth approved → treatment scheduled → treatment completed → claim filed → settled. Each
        transition has a date and an actor. When something stalls (TPA hasn&apos;t responded in 5
        days), the system surfaces it.
      </p>

      <p>
        Without that workflow, pre-auth tracking lives in a spreadsheet the office manager updates
        manually, and stalls go unnoticed until a patient calls asking why their treatment
        hasn&apos;t been booked.
      </p>

      <h2>Co-payment, deductible, co-insurance</h2>

      <p>Three cost-sharing models that show up in Singapore TPA contracts:</p>

      <ul>
        <li>
          <strong>Co-payment</strong> — fixed amount the patient pays per visit (e.g., S$30). Same
          regardless of total bill.
        </li>
        <li>
          <strong>Deductible</strong> — amount patient pays before insurance kicks in. Tracked
          annually per patient.
        </li>
        <li>
          <strong>Co-insurance</strong> — percentage split (e.g., insurer pays 80%, patient pays 20%
          of the gross). Most common for dental.
        </li>
      </ul>

      <p>
        A working PMS handles all three at the policy level — when the patient is selected and their
        TPA policy is loaded, the system applies the right rule to the invoice automatically. Manual
        application is where errors compound.
      </p>

      <h2>What to look for in PMS billing</h2>

      <p>Six checks specific to insurance handling:</p>

      <ul>
        <li>
          <strong>Two-ledger model</strong> — insurance and patient portions structurally separate,
          not just visually labelled.
        </li>
        <li>
          <strong>Per-policy cost-sharing rules</strong> — co-payment, deductible, or co-insurance
          applied automatically based on the patient&apos;s TPA policy.
        </li>
        <li>
          <strong>Pre-auth workflow</strong> — states + dates + actors, surfaced when stalled.
        </li>
        <li>
          <strong>TPA payment matching</strong> — incoming batched payments matched to claim IDs,
          clearing the insurance ledger mechanically.
        </li>
        <li>
          <strong>A/R aging by category</strong> — patient-due vs insurance-pending tagged
          separately so the chasing list is actually patients.
        </li>
        <li>
          <strong>GST on gross service fee</strong> — not on patient portion. Required for IRAS
          compliance.
        </li>
      </ul>

      <h2>What to do next</h2>

      <p>
        Audit one current week of invoices. For each insurance-involved invoice: how clear is the
        patient&apos;s portion? Did GST go on gross fee or patient portion? Is the insurance
        recovery tagged as pending or as A/R?
      </p>

      <p>
        If the answers are messy, the structural model is the fix — not more careful manual
        reconciliation. See the{" "}
        <a
          href="/workflows#billing"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          Oralstack billing workflow
        </a>{" "}
        for the two-ledger implementation.
      </p>
    </>
  );
}
