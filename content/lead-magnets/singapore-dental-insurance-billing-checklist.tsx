import type { LeadMagnet } from "./types";

export const singaporeDentalInsuranceBillingChecklist: LeadMagnet = {
  slug: "singapore-dental-insurance-billing-checklist",
  cluster: "billing",
  title: "Singapore dental insurance & MediSave billing checklist",
  description:
    "TPA-direct claims, Integrated Shield Plans, MediSave, MediSave 600, CHAS — the per-claim-type checklist for Singapore dental clinics. Pre-auth, submission, reconciliation.",
  pitch:
    "TPA, IP, MediSave, CHAS — the per-claim-type checklist. Pre-auth, submission, reconciliation. Singapore-specific.",
  deliverable: "10-page billing checklist",
  readingMinutes: 14,
  publishedAt: "2026-04-27",
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Singapore dental billing has more moving parts than international software typically
        handles. There are TPA-direct claims (Aviva, Great Eastern, AIA, AXA, Income), Integrated
        Shield Plan out-patient riders, MediSave for surgical work, MediSave 600 for chronic
        conditions, CHAS subsidies for eligible patients, and plain self-pay. Each has its own
        pre-auth flow, submission format, payment timeline, and audit risk.
      </p>

      <p>
        This checklist is for the office manager or billing lead who wants to ensure every claim
        type is handled correctly the first time, every time. It&apos;s not tax or insurance advice
        — for that talk to a Singapore-qualified accountant or the relevant TPA. It&apos;s an
        operational reference.
      </p>

      <h2>Section 1 — The 6 Singapore dental payment types</h2>

      <p>
        Most dental visits resolve to one of these. Some visits combine them (e.g. a CHAS subsidy on
        top of a MediSave-claimable procedure).
      </p>

      <ol>
        <li>
          <strong>Self-pay (cash, card, PayNow).</strong> Patient pays in full at discharge.
          Simplest, fastest reconciliation.
        </li>
        <li>
          <strong>TPA-direct claim.</strong> Clinic submits to TPA, TPA pays clinic, patient pays
          nothing (or the deductible / co-payment portion). Common for Aviva, Great Eastern, AIA,
          AXA group dental plans.
        </li>
        <li>
          <strong>Integrated Shield Plan rider.</strong> Out-patient riders cover dental in some
          plans. Patient typically pays upfront, claims reimbursement themselves — but some clinics
          handle this on the patient&apos;s behalf.
        </li>
        <li>
          <strong>MediSave (surgical).</strong> For approved surgical procedures (extractions of
          impacted teeth, implants in some cases). Pre-auth required, MediSave caps apply.
        </li>
        <li>
          <strong>MediSave 600.</strong> For chronic disease management — including some
          complications of diabetes that affect oral health. Specific eligibility, documented care
          plan required.
        </li>
        <li>
          <strong>CHAS subsidy.</strong> Community Health Assist Scheme. Patient holds CHAS card
          (Blue, Orange, or Green tier); subsidy applies to specific dental services per the CHAS
          schedule. Clinic claims back from MOH/AIC.
        </li>
      </ol>

      <h2>Section 2 — TPA-direct claim checklist</h2>

      <h3>At appointment confirmation (24h before)</h3>

      <ul>
        <li>
          Verify policy is current (call TPA or check portal). Policies lapse, cards expire,
          employer changes — all common.
        </li>
        <li>
          Confirm coverage scope. &ldquo;Covered for dental&rdquo; is ambiguous; specifically: is
          this procedure code covered? Is there an annual limit? What&apos;s the co-payment %?
        </li>
        <li>
          Get pre-authorization number if procedure is &gt;SGD 500 (most TPAs require for
          higher-value treatments).
        </li>
        <li>
          Set patient expectation: what they&apos;ll pay at the chair (typically deductible +
          co-payment), what the TPA will cover.
        </li>
      </ul>

      <h3>At discharge</h3>

      <ul>
        <li>
          Print itemised invoice with: procedure codes (TPA-recognised codes, not just
          descriptions), GST line if applicable, insurance vs patient portion clearly split.
        </li>
        <li>
          Patient signs claim form (some TPAs still require physical; most accept digital
          signature).
        </li>
        <li>Patient pays the deductible + co-payment (typically 20% for most plans).</li>
        <li>
          Clinic submits claim via TPA portal (Aviva eClaims, Great Eastern OneClaim, etc.). Same
          day if possible.
        </li>
      </ul>

      <h3>Post-submission</h3>

      <ul>
        <li>
          Track claim status. Most TPAs settle within 14–30 days. Anything over 30 days, follow up —
          usually a missing document or coding question.
        </li>
        <li>
          On settlement: reconcile TPA payment against claim. If TPA short-pays, identify reason and
          either accept (mark as write-off) or appeal.
        </li>
        <li>
          File the claim documents: pre-auth, signed claim form, itemised invoice, treatment notes.
          Retain for at least 6 years (PDPA + IRAS overlap).
        </li>
      </ul>

      <h2>Section 3 — MediSave (surgical) checklist</h2>

      <h3>Eligibility check</h3>

      <ul>
        <li>
          Procedure on MOH&apos;s MediSave-claimable list? Most surgical extractions, especially
          impacted wisdom teeth, qualify. Routine fillings and scaling do not.
        </li>
        <li>Patient&apos;s MediSave balance sufficient (or family member authorised to pay).</li>
        <li>
          Patient is the policyholder OR an immediate family member (parent, spouse, child,
          sibling).
        </li>
      </ul>

      <h3>Pre-procedure</h3>

      <ul>
        <li>
          Submit pre-auth via the MediSave dental claim portal. Approval typically within 1–2
          working days.
        </li>
        <li>
          Document clinical justification clearly — radiographs showing impaction, depth, position.
          MediSave rejects vague justifications.
        </li>
        <li>
          Patient signs MediSave authorisation form (digital or physical per current MOH spec).
        </li>
      </ul>

      <h3>Post-procedure</h3>

      <ul>
        <li>File the claim within 14 days of treatment. Late claims may be rejected.</li>
        <li>
          Track the MediSave deduction limit. Surgical procedures have per-procedure caps (e.g. SGD
          250 for simple impacted, SGD 950 for complex impacted, etc. — check current MOH schedule).
          Claim the lesser of cap or actual fee.
        </li>
        <li>Patient pays any portion above the MediSave cap directly.</li>
      </ul>

      <h2>Section 4 — CHAS subsidy checklist</h2>

      <ul>
        <li>
          <strong>Verify patient&apos;s CHAS tier.</strong> Blue (highest subsidy), Orange (mid),
          Green (basic). Subsidy amount differs per tier and per procedure.
        </li>
        <li>
          <strong>Confirm procedure is CHAS-eligible.</strong> Routine dental — scaling and
          polishing, fillings, extractions — yes. Cosmetic, orthodontic, implants — no.
        </li>
        <li>
          <strong>Apply subsidy at point of billing.</strong> Patient pays the post-subsidy amount;
          clinic claims the subsidy from AIC/MOH.
        </li>
        <li>
          <strong>Submit CHAS claim within the monthly window.</strong>
          AIC settles claims monthly; late submissions roll into next cycle.
        </li>
        <li>
          <strong>Annual subsidy cap awareness.</strong> Each patient has an annual CHAS dental
          subsidy cap. Once reached, no more subsidy that year — patient pays full fee.
        </li>
      </ul>

      <h2>Section 5 — Integrated Shield Plan claims</h2>

      <p>IP riders that cover dental are less standardised. The general flow:</p>

      <ul>
        <li>Patient pays the clinic in full at discharge.</li>
        <li>Clinic provides itemised invoice + medical report (if required).</li>
        <li>Patient submits to insurer for reimbursement.</li>
        <li>
          Some clinics offer to handle this on the patient&apos;s behalf — check with the relevant
          insurer first; not all accept third-party submission.
        </li>
      </ul>

      <h2>Section 6 — The two-ledger principle</h2>

      <p>
        For every visit that&apos;s not pure self-pay, structure your records as two separate
        ledgers:
      </p>

      <ul>
        <li>
          <strong>Patient ledger.</strong> What the patient owes the clinic. Movements: charges,
          payments, refunds.
        </li>
        <li>
          <strong>Insurance ledger.</strong> What the insurer owes the clinic. Movements: claim
          submitted, claim partial-paid, claim full-paid, claim rejected.
        </li>
      </ul>

      <p>
        Mixing these (one ledger, &ldquo;outstanding balance&rdquo;) is where reconciliation pain
        starts and where TPA short-pays go unnoticed. They should be separate columns in your daily
        accounts; only on full settlement does an entry close.
      </p>

      <h2>Section 7 — Pre-authorization workflow</h2>

      <p>
        Pre-auth saves both clinic and patient pain. Get into the discipline of always
        pre-authorising for:
      </p>

      <ul>
        <li>Any procedure &gt; SGD 500</li>
        <li>Any MediSave-claimable procedure (always)</li>
        <li>Any procedure where the patient&apos;s coverage scope is unclear</li>
      </ul>

      <p>Pre-auth playbook:</p>

      <ul>
        <li>Run pre-auth at least 24h before treatment, ideally at the point of booking.</li>
        <li>Document the pre-auth number in the patient record AND on the appointment.</li>
        <li>
          If pre-auth is denied, communicate to patient before the appointment, not at the chair.
        </li>
        <li>
          Pre-auth approval has an expiry date — typically 30–90 days. Re-authorise if treatment
          slips beyond the window.
        </li>
      </ul>

      <h2>Section 8 — Co-payment / deductible / co-insurance — patient explanations</h2>

      <p>Patients confuse these. Brief each at the chair using plain terms:</p>

      <ul>
        <li>
          <strong>Co-payment</strong> = a fixed amount the patient pays per visit (e.g. &ldquo;SGD
          30 each time&rdquo;).
        </li>
        <li>
          <strong>Deductible</strong> = an amount the patient must pay before insurance kicks in
          (e.g. &ldquo;you pay the first SGD 200 each policy year&rdquo;).
        </li>
        <li>
          <strong>Co-insurance</strong> = a percentage of the bill the patient pays (e.g. &ldquo;you
          pay 20%, insurance pays 80%&rdquo;).
        </li>
      </ul>

      <p>
        Many SG group dental plans use co-payment + co-insurance together (e.g. SGD 25 co-pay + 20%
        co-insurance on the balance). Brief patients clearly so the bill doesn&apos;t surprise them.
      </p>

      <h2>Section 9 — Weekly + monthly reconciliation</h2>

      <h3>Weekly (Friday end-of-day, 30 min)</h3>

      <ul>
        <li>Total clinic takings vs PMS-recorded receipts.</li>
        <li>Open insurance claims aging report — anything &gt;14 days flagged.</li>
        <li>MediSave claims status — any rejections to investigate?</li>
        <li>CHAS claims pending submission for the upcoming month-end.</li>
      </ul>

      <h3>Monthly (last Friday of the month, 90 min)</h3>

      <ul>
        <li>CHAS monthly batch submission to AIC.</li>
        <li>Insurance ledger close — write-off uncollectable balances after appeal.</li>
        <li>
          Patient ledger aging — patients &gt;60 days outstanding, decision: collect / write-off /
          cease relationship.
        </li>
        <li>Bank reconciliation — total deposits match total clinic takings.</li>
        <li>
          Adjustment audit — every adjustment / discount / write-off in the month, reviewed and
          signed off.
        </li>
      </ul>

      <h2>Per-patient billing checklist (laminate at the front desk)</h2>

      <ol>
        <li>Insurance verified (TPA + scope + balance) at booking</li>
        <li>Pre-auth obtained where needed; number in record</li>
        <li>Patient briefed on expected out-of-pocket before chair</li>
        <li>Itemised invoice with correct procedure codes</li>
        <li>GST treatment correct (taxable vs exempt; see article on GST mixed-supply)</li>
        <li>Insurance vs patient portion split on the invoice</li>
        <li>Patient pays their portion at discharge</li>
        <li>Claim submitted same day (or within 14 days for MediSave)</li>
        <li>Recall scheduled and confirmed before patient leaves</li>
        <li>All documents filed and retained per PDPA + IRAS retention rules</li>
      </ol>

      <p>
        For the software side — two-ledger billing structure, automated TPA-claim submission,
        MediSave integration, audit-logged adjustments — Oralstack&apos;s billing module is built
        around this checklist. See{" "}
        <a
          href="/workflows#billing"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          /workflows#billing
        </a>
        .
      </p>
    </>
  );
}
