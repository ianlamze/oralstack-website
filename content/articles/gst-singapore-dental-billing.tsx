import type { Article } from "./types";

export const gstSingaporeDentalBilling: Article = {
  slug: "gst-singapore-dental-billing",
  title: "GST 9% for Singapore dental clinics: what to itemise on every invoice",
  description:
    "GST went from 8% to 9% on 1 Jan 2024. The compliance gotchas around what's GST-able, registration thresholds, exempt services, and IRAS audit prep are real operational hassle. Here's the working clinic's guide.",
  excerpt:
    "Most clinics updated the GST rate. Fewer have updated their billing system to handle mixed-supply (taxable + exempt) services correctly, which is where IRAS audits typically find issues.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "billing",
  tags: ["GST", "Singapore", "IRAS", "invoicing", "compliance"],
  readingMinutes: 8,
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        GST went from 8% to 9% on 1 January 2024. Most Singapore dental clinics updated the rate.
        Fewer have updated their billing system to handle mixed-supply services (taxable + exempt
        within a single visit) correctly, which is where IRAS audits typically surface problems.
      </p>

      <p>
        This article is for the clinic owner or office manager who&apos;s confident on the basics
        but wants to make sure the operational details are right. It&apos;s not tax advice — for
        that, talk to a Singapore-qualified accountant. It&apos;s an operational guide to the GST
        mechanics that affect dental billing.
      </p>

      <h2>What&apos;s GST-able in dental</h2>

      <p>IRAS classifies medical and dental services into three categories:</p>

      <ul>
        <li>
          <strong>Taxable</strong> — most general dentistry: scaling and polishing, fillings, root
          canal treatment, crowns, orthodontics, cosmetic procedures, hygiene visits, recall
          assessments. The clinic charges 9% GST on top of the service fee.
        </li>
        <li>
          <strong>Exempt</strong> — certain medical-dental procedures performed by a registered
          medical practitioner under specific conditions. The clearest case: oral surgery procedures
          performed by an oral &amp; maxillofacial surgeon registered with the Singapore Medical
          Council. These are exempt from GST under the Fourth Schedule of the GST Act.
        </li>
        <li>
          <strong>Out-of-scope</strong> — services provided to overseas patients (where the supply
          takes place outside Singapore in GST terms) — rare for dental but possible.
        </li>
      </ul>

      <p>
        Most general practices are 100% taxable supply. Practices with oral surgeons on staff have a
        mix. The mix is where billing software gets tested.
      </p>

      <h2>GST registration threshold</h2>

      <p>
        Registration is mandatory if your taxable turnover exceeds S$1 million in any calendar year,
        or you reasonably expect it to in the next 12 months. For a 3-chair clinic with average
        ticket S$200 doing ~25 visits/day across 280 working days, annual turnover is roughly $1.4M
        — over the threshold.
      </p>

      <p>
        Voluntary registration below the threshold is possible but usually only worth it if your
        inputs (rent, equipment, supplies) carry significant input GST you can claim back. Most
        clinics without a major equipment-purchase year don&apos;t benefit.
      </p>

      <h2>Common operational mistakes</h2>

      <p>Five issues that surface in IRAS audits of dental practices:</p>

      <h3>1. Treating all dental as taxable</h3>

      <p>
        Practices with a visiting oral surgeon often invoice surgical procedures at the standard 9%
        rate when those specific procedures qualify as exempt. The patient overpays GST that IRAS
        may eventually require to be refunded.
      </p>

      <p>
        Fix: configure your billing system with two GST rates per line item — taxable (9%) and
        exempt (0%). Tag procedures with the right rate at the catalog level, not at invoice time.
        Have your accountant review the tagging quarterly.
      </p>

      <h3>2. Wrong rate transition (jobs spanning the rate change)</h3>

      <p>
        Treatments that span Jan 2024 (work started in 2023, finished in 2024) need careful GST
        application. The general rule: GST rate at the time of supply (typically completion or
        invoicing, whichever is earlier). For jobs invoiced after Jan 2024, the 9% rate applies even
        if work started under the 8% regime.
      </p>

      <p>
        Most clinics have moved past this transition by now, but outstanding A/R from pre-2024 jobs
        occasionally surfaces and needs correct rate handling.
      </p>

      <h3>3. Tax invoice not meeting IRAS requirements</h3>

      <p>
        IRAS specifies what a tax invoice must contain. For invoices above S$1,000, that includes:
      </p>

      <ul>
        <li>The words &ldquo;Tax Invoice&rdquo; clearly displayed</li>
        <li>Your GST registration number</li>
        <li>Invoice number and date</li>
        <li>Customer name and address (above S$1,000)</li>
        <li>Description of goods / services</li>
        <li>Quantity, unit price, total amount excluding GST</li>
        <li>GST amount separately</li>
        <li>Total amount payable including GST</li>
      </ul>

      <p>
        For invoices below S$1,000, simplified tax invoices are acceptable but should still show the
        GST amount or confirmation that the price is inclusive of GST.
      </p>

      <h3>4. GST not separated from patient portion clearly</h3>

      <p>
        When insurance covers part of the bill, GST should be applied to the gross service fee, not
        the patient&apos;s portion. The invoice should show:
      </p>

      <ul>
        <li>Service fee (excl. GST)</li>
        <li>GST 9%</li>
        <li>Total invoice value</li>
        <li>Insurance contribution (if any, excl. their GST handling)</li>
        <li>Patient portion payable</li>
      </ul>

      <p>
        Clinics that compute GST on the patient portion only under-collect GST and create a
        reconciliation problem at GST F5 filing time.
      </p>

      <h3>5. Audit-trail for invoice edits</h3>

      <p>
        IRAS expects invoice records to be immutable once issued, with any subsequent changes
        documented (credit notes, adjustments, write-offs). PMS that lets the front desk silently
        edit a finalised invoice creates audit risk — IRAS auditors look at the history of any
        flagged invoice.
      </p>

      <p>
        Solid billing systems mark invoices as finalised and require a credit note for any
        adjustment, with the reason captured. See{" "}
        <a
          href="/articles/same-day-billing-dental"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          same-day billing
        </a>{" "}
        for the operational case for audit-logged adjustments.
      </p>

      <h2>What to look for in PMS billing software</h2>

      <p>Five checks for a Singapore-aware dental billing system:</p>

      <ul>
        <li>
          <strong>GST registration number on every invoice</strong> — configurable once at clinic
          level, applied automatically.
        </li>
        <li>
          <strong>Per-line GST rate</strong> — not a single rate for the whole invoice. Different
          procedures within one visit may have different rates.
        </li>
        <li>
          <strong>GST line itemised separately</strong> from the subtotal, on every invoice. Patient
          sees what they&apos;re paying for vs what&apos;s tax.
        </li>
        <li>
          <strong>Audit-trail for invoice edits</strong> — finalised invoices are immutable,
          adjustments require credit notes with reason.
        </li>
        <li>
          <strong>GST F5 export</strong> — the quarterly GST return. A working PMS produces an
          F5-ready summary in a few clicks, not a manual spreadsheet exercise.
        </li>
      </ul>

      <h2>What to do next</h2>

      <p>Three operational checks to run on your current setup:</p>

      <ol>
        <li>
          <strong>Audit your service catalog</strong> for the GST tag on every procedure code.
          Confirm with your accountant which should be exempt vs taxable.
        </li>
        <li>
          <strong>Spot-check 10 recent invoices</strong> for IRAS compliance — &ldquo;Tax
          Invoice&rdquo; label, GST registration number, line-by-line GST, total payable.
        </li>
        <li>
          <strong>Run a mock GST F5</strong> using last quarter&apos;s data. If your PMS can produce
          the figures in under 30 minutes, you&apos;re fine. If it&apos;s a multi-day spreadsheet
          exercise, your billing system is the bottleneck.
        </li>
      </ol>

      <p>
        See the{" "}
        <a
          href="/workflows#billing"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          Oralstack billing workflow
        </a>{" "}
        for the discharge-flow billing model with GST handled at the line level. Or read{" "}
        <a
          href="/articles/same-day-billing-dental"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          same-day billing
        </a>{" "}
        for the broader operational case for treating discharge as the moment money moves.
      </p>
    </>
  );
}
