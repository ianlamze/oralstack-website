import type { Article } from "./types";

export const tenantIsolationDentalSaas: Article = {
  slug: "tenant-isolation-dental-saas",
  title: "Tenant isolation in dental SaaS: what evaluators should ask",
  description:
    "Most dental SaaS claims to be multi-tenant. Few can describe how data is actually separated between clinics. A practical guide for clinic owners and operators evaluating tenant isolation.",
  excerpt:
    "Multi-tenancy is the default architecture of modern dental SaaS — and the part most easily handwaved during evaluation. Here are the four questions that separate real isolation from marketing copy.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "compliance",
  tags: ["tenant isolation", "PDPA", "compliance", "multi-tenancy", "Postgres"],
  readingMinutes: 7,
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Multi-tenancy is how modern SaaS works. Every dental practice management system that calls
        itself &ldquo;cloud&rdquo; is, by definition, sharing infrastructure across many clinics.
        The question every clinic owner should ask isn&apos;t &ldquo;is this multi-tenant?&rdquo; —
        it&apos;s &ldquo;how, exactly, is my clinic&apos;s data separated from the next
        clinic&apos;s data?&rdquo;
      </p>

      <p>
        This article is for clinic owners, operators, and compliance leads evaluating dental SaaS.
        Four concrete questions to ask, with the answers that distinguish architecturally sound
        vendors from vendors relying on application-layer isolation alone.
      </p>

      <h2>Why this matters more for dental than for, say, project management</h2>

      <p>
        Dental records are health data. In Singapore that puts them under PDPA with an extra duty of
        care; in other jurisdictions it&apos;s HIPAA, GDPR, or local equivalents. The cost of a
        tenant-isolation failure isn&apos;t just legal exposure — it&apos;s reputational catastrophe
        for the affected clinic. A B2B SaaS vendor that leaks one company&apos;s pipeline data to
        another is in trouble; a dental SaaS vendor that leaks one clinic&apos;s patient records to
        another is in a different category of trouble.
      </p>

      <p>
        Architectural isolation is the one control that, when done right, makes the worst-case
        outcome (a leak across tenants) genuinely difficult rather than merely unlikely.
      </p>

      <h2>The four questions</h2>

      <h3>1. At what layer is per-clinic separation enforced?</h3>

      <p>Three real answers, in increasing order of robustness:</p>

      <ul>
        <li>
          <strong>Application-layer isolation.</strong> Every database query carries a{" "}
          <code>WHERE clinic_id = ?</code> clause inserted by the application. Works fine until a
          developer forgets the clause on one query, or a SQL injection bypasses it. Common; not
          enough.
        </li>
        <li>
          <strong>Row-level security (RLS).</strong> The database itself (Postgres, recent SQL
          Server) enforces per-row access policies based on the connection&apos;s tenant context. A
          query without the right tenant context returns zero rows by default — even if the
          application&apos;s WHERE clause is missing or compromised.
        </li>
        <li>
          <strong>Schema-per-tenant or database-per-tenant.</strong> Each clinic gets its own schema
          or database. Strongest isolation; most operationally expensive (per-tenant migrations,
          per-tenant backups, slower onboarding).
        </li>
      </ul>

      <p>
        For dental SaaS at clinic-scale (hundreds to low-thousands of clinics), Postgres row-level
        security is the modern default. Schema-per-tenant is acceptable but expensive at scale;
        application-layer-only is no longer acceptable for health data.
      </p>

      <h3>2. Show me the policy.</h3>

      <p>
        Vendors confident in their RLS implementation will walk you through the policy. It looks
        like:
      </p>

      <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-[var(--color-canvas-tinted)] p-4 text-xs leading-relaxed">
        {`CREATE POLICY clinic_isolation ON patient
USING (clinic_id = current_setting('app.current_clinic')::int);

ALTER TABLE patient ENABLE ROW LEVEL SECURITY;`}
      </pre>

      <p>
        The vendor sets <code>app.current_clinic</code> on every request based on the authenticated
        user&apos;s clinic. From that point on, the database itself enforces that this user can only
        see this clinic&apos;s patient rows. No <code>WHERE</code> clause in the application can
        accidentally bypass it.
      </p>

      <p>
        A vendor that can&apos;t produce something concrete here is doing application-layer
        isolation and calling it &ldquo;multi-tenant.&rdquo; That distinction matters when something
        goes wrong.
      </p>

      <h3>3. What about backups, exports, and reports?</h3>

      <p>
        RLS protects live queries. Backups, batch exports, and admin tooling often run with elevated
        database connections that bypass RLS. The question becomes: how does the vendor segment{" "}
        <em>those</em> paths?
      </p>

      <p>
        Reasonable answers include: backups are encrypted and segmented per clinic; exports are
        scoped to a single clinic ID and audit-logged; admin tooling has separate roles for
        clinic-scoped vs cross-clinic access; the cross-clinic role is used rarely and every use is
        logged.
      </p>

      <p>
        Unreasonable answers include: &ldquo;we trust our admins,&rdquo; &ldquo;exports run as the
        admin user,&rdquo; and any answer that doesn&apos;t mention what happens at the
        elevated-connection layer.
      </p>

      <h3>4. What does an audit log show me?</h3>

      <p>
        A clinic should be able to query: &ldquo;Show me everyone — including vendor staff — who
        accessed patient X&apos;s record in March.&rdquo; The log should include user, clinic,
        resource, action, timestamp. Vendor admin actions should be logged the same way clinic
        actions are.
      </p>

      <p>
        For a deeper treatment of dental audit logs and what regulators actually look at,{" "}
        <a
          href="/articles/dental-audit-logs"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          see the dental audit logs article
        </a>
        .
      </p>

      <h2>What good looks like</h2>

      <p>
        For dental SaaS in 2026, &ldquo;good&rdquo; tenant isolation has the following structure:
      </p>

      <ul>
        <li>
          Postgres row-level security policies on every patient-bearing table. The policies
          reference a tenant context set per-request; the application never composes raw{" "}
          <code>WHERE clinic_id = ?</code> filters as the only protection.
        </li>
        <li>
          Per-clinic backup segmentation. Backups can be restored to a single clinic without
          exposing other clinics&apos; data.
        </li>
        <li>
          Cross-tenant admin access is a separate role, requires a specific break-glass workflow,
          and is fully audit-logged.
        </li>
        <li>
          Every patient-record access is logged with user, clinic, resource, and timestamp —
          including vendor admin access. The log is queryable by the clinic.
        </li>
        <li>
          Region-pinned data residency. For Singapore clinics, this means asia-southeast1 (or
          equivalent) with no replication outside the region without explicit per-patient consent.
        </li>
      </ul>

      <h2>What we do</h2>

      <p>
        Oralstack uses Postgres row-level security per clinic, with the tenant context set on every
        request from the authenticated session. Backups are encrypted and segmented per clinic;
        cross-clinic admin access is a separate role with break-glass logging. Every read and write
        is audit-logged. Data sits in asia-southeast1 with no cross-region replication. The full
        posture is documented at{" "}
        <a href="/security" className="text-[var(--color-tide-deep)] underline underline-offset-4">
          /security
        </a>
        .
      </p>

      <p>
        If you&apos;re evaluating dental SaaS — Oralstack or anyone else — these four questions are
        the ones that distinguish architecturally sound vendors from vendors relying on marketing
        language. Send them in writing. Compare the written answers side-by-side. The vendors that
        answer with policy code and concrete examples are the vendors to take seriously.
      </p>
    </>
  );
}
