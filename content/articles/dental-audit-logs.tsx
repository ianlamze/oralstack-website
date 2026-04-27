import type { Article } from "./types";

export const dentalAuditLogs: Article = {
  slug: "dental-audit-logs",
  title: "Dental audit logs: what regulators and auditors actually look at",
  description:
    "Most dental PMS claim to have audit logs. When PDPC, IRAS, or a patient access request actually arrives, the gap between marketing claims and operational reality shows up. Here's what a real audit log captures.",
  excerpt:
    "Audit logs are one of those things every PMS claims to have. Run a real query on a real day and the gap between marketing and reality shows up immediately.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "compliance",
  tags: ["audit log", "PDPA", "compliance", "Singapore", "data access"],
  readingMinutes: 7,
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Audit logs are one of those things every dental PMS claims to
        have. Run an actual query — &ldquo;show me everyone who accessed
        patient X&apos;s chart in March&rdquo; — and the gap between
        marketing claims and operational reality shows up immediately.
        Most clinics discover, when they actually need the log, that
        either it doesn&apos;t exist, doesn&apos;t capture the right
        events, or isn&apos;t queryable without engineering involvement.
      </p>

      <p>
        This article is for the clinic owner, IT lead, or compliance
        officer who needs to evaluate whether their PMS audit log will
        actually function under the conditions where audit logs matter.
      </p>

      <h2>Who actually asks for audit logs</h2>

      <p>Four scenarios where dental audit logs get queried in earnest:</p>

      <ul>
        <li>
          <strong>PDPC investigation.</strong> Singapore Personal Data
          Protection Commission opens an investigation following a data
          breach notification or complaint. They&apos;ll ask for the
          access history of affected records and for evidence of the
          technical controls that were in place.
        </li>
        <li>
          <strong>IRAS audit.</strong> Tax audits typically focus on
          financial records, but auditors increasingly ask for
          modification history of invoices, write-offs, and adjustments
          (see{" "}
          <a
            href="/articles/gst-singapore-dental-billing"
            className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
          >
            GST 9% mechanics
          </a>
          ).
        </li>
        <li>
          <strong>Patient access requests.</strong> Under PDPA Section
          21, patients can request a record of when their data was
          accessed and by whom. Less common but legally binding when
          received. 30-day response window.
        </li>
        <li>
          <strong>Internal investigations.</strong> Suspected
          misconduct (a former employee, a malpractice claim, a missing
          payment) — clinic management needs to reconstruct who did
          what.
        </li>
      </ul>

      <p>
        In every case, the question is similar: who, what, when, from
        where. The log either has the answer or it doesn&apos;t.
      </p>

      <h2>What a real audit log captures</h2>

      <p>Five categories of events that need logging for dental PHI:</p>

      <h3>1. Read events, not just write events</h3>

      <p>
        Most weak audit logs only capture writes (someone edited a
        chart, someone created an invoice). They miss reads — someone
        opened patient X&apos;s chart and looked at it without changing
        anything. For PDPA purposes, &ldquo;who viewed this&rdquo; is
        often more relevant than &ldquo;who edited this.&rdquo;
      </p>

      <p>
        Reading is the most common form of access. If the audit log
        doesn&apos;t capture it, the log can&apos;t answer the most
        common audit question.
      </p>

      <h3>2. Authentication context</h3>

      <p>
        Every log entry needs the actor (which user), authentication
        time (when they logged in), and source (IP address or device
        identifier). &ldquo;Admin&rdquo; as an actor isn&apos;t enough
        — multiple staff use admin accounts in some clinics.
      </p>

      <p>
        Source IP matters in particular for detecting &ldquo;impossible
        travel&rdquo; patterns (the same account accessed records from
        Singapore and Manila in the same hour). This is how compromised
        credentials get caught.
      </p>

      <h3>3. Data exports</h3>

      <p>
        Bulk exports — CSV downloads of patient lists, PDF generation
        of treatment history, screenshots of chart data — are
        higher-risk events than individual record access. Modern PMS
        log every export with the export scope (which records, which
        fields).
      </p>

      <p>
        Many older systems don&apos;t capture exports at all. The data
        leaves silently. When an investigation later asks &ldquo;was
        this list of patients exported in the last 6 months?&rdquo; the
        answer is &ldquo;we don&apos;t know.&rdquo;
      </p>

      <h3>4. Adjustments and write-offs</h3>

      <p>
        On the financial side, every modification to a finalised invoice
        needs a logged actor + reason. Write-offs, discounts, courtesy
        adjustments, credit notes. This is what IRAS auditors look at
        when they spot-check an invoice with an unusual adjustment.
      </p>

      <p>
        See{" "}
        <a
          href="/articles/same-day-billing-dental"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          same-day billing
        </a>{" "}
        for the broader case for audit-logged adjustments at discharge.
      </p>

      <h3>5. Inter-clinic data movement</h3>

      <p>
        For multi-location dental groups, any movement of records
        between clinics is a logged event — referrals, consolidated
        reports, shared imaging. The log identifies source clinic,
        destination clinic, records moved, actor, time. This is the
        evidence of tenant isolation in operation (see{" "}
        <a
          href="/articles/singapore-pdpa-dental-clinics"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          PDPA + tenant isolation
        </a>
        ).
      </p>

      <h2>Architecture: what makes a log trustworthy</h2>

      <p>
        Five technical properties separate a real audit log from a
        glorified activity feed:
      </p>

      <ul>
        <li>
          <strong>Append-only.</strong> No edits, no deletes. Any
          modification of the log itself is itself a log entry.
        </li>
        <li>
          <strong>Tamper-evident.</strong> Cryptographic chaining (each
          entry references the hash of the previous) so attempts to
          rewrite history are detectable.
        </li>
        <li>
          <strong>Long-term retention.</strong> 7+ years for dental
          records (matches professional retention standards). Daily
          backups. Cold storage for older entries.
        </li>
        <li>
          <strong>Queryable by clinic admin.</strong> Not just engineering.
          The clinic admin should be able to answer &ldquo;who accessed
          patient X this month&rdquo; through the UI in seconds.
        </li>
        <li>
          <strong>Exportable.</strong> When PDPC asks for the log, the
          clinic can export the relevant subset as CSV or JSON without
          a vendor support ticket.
        </li>
      </ul>

      <h2>What weak audit logs miss</h2>

      <p>Common failure patterns we see in dental PMS audit features:</p>

      <ul>
        <li>
          Read-only access not logged (silent observation by staff who
          shouldn&apos;t be looking)
        </li>
        <li>
          Bulk operations recorded as a single event without the scope
          (&ldquo;exported records&rdquo; vs &ldquo;exported 1,247
          records including X, Y, Z&rdquo;)
        </li>
        <li>
          Admin-level overrides not differentiated from regular access
        </li>
        <li>
          Logs stored in the same database as the data they audit
          (ransomware encrypts both at once)
        </li>
        <li>
          Logs accessible only via vendor support ticket (every query
          becomes a multi-day workflow)
        </li>
      </ul>

      <h2>What to look for in PMS audit logs</h2>

      <p>Six concrete questions to ask vendors:</p>

      <ul>
        <li>
          Are <strong>read events</strong> logged in addition to writes?
        </li>
        <li>
          Can a clinic admin run a query <strong>through the UI</strong>{" "}
          without engineering involvement?
        </li>
        <li>
          Are <strong>bulk exports</strong> tracked with their scope?
        </li>
        <li>
          Is the log <strong>append-only and tamper-evident</strong>?
        </li>
        <li>
          Is the log <strong>stored separately</strong> from the
          transactional database?
        </li>
        <li>
          What&apos;s the <strong>retention period</strong>? (Should be
          7+ years.)
        </li>
      </ul>

      <h2>What to do next</h2>

      <p>
        Run a sample query on your current PMS today. Pick a patient
        seen in the last week and ask the system to tell you everyone
        who accessed their record. If the answer takes longer than a
        minute, or requires a vendor support ticket, the audit log is
        not fit for the moments it&apos;s actually needed.
      </p>

      <p>
        See the{" "}
        <a
          href="/security"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          Oralstack security posture
        </a>{" "}
        for the audit log implementation, including append-only events
        and clinic-admin-queryable history.
      </p>
    </>
  );
}
