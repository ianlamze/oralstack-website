import type { Article } from "./types";

export const openDentalToManagedPmsMigration: Article = {
  slug: "open-dental-to-managed-pms-migration",
  title: "Migrating from Open Dental to a managed PMS: a practical guide",
  description:
    "What changes — and what doesn't — when a clinic moves from a self-hosted Open Dental instance to a managed cloud dental PMS. Data extraction, custom queries, training cost, and the three real risks.",
  excerpt:
    "Open Dental's freedom to self-host comes with IT load. Here's what migrating to a managed PMS actually changes, including the parts most clinics don't see coming.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "migration",
  tags: ["Open Dental", "migration", "managed SaaS", "self-hosted", "PMS"],
  readingMinutes: 9,
  cta: {
    eyebrow: "Open Dental vs Oralstack",
    title: "Side-by-side comparison",
    body: "Self-hosted Open Dental vs managed Oralstack — IT load, billing workflow, integrations, and what changes when you stop maintaining the database yourself.",
    buttonLabel: "See Oralstack vs Open Dental",
    buttonHref: "/compare/open-dental",
  },
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Open Dental is a serious piece of software. It is mature, deeply feature-rich, free to
        license, and backed by an active community of US-based dental practices and consultants. For
        clinics with an in-house IT lead and a strong US-payer billing workflow, it is a legitimate
        choice for the long term.
      </p>

      <p>
        For other clinics — particularly APAC clinics where US payer rails aren&apos;t relevant and
        IT capacity is the office manager&apos;s weekend — the freedom of self-hosting becomes the
        cost of self-hosting. This article is for clinic owners weighing whether to leave Open
        Dental for a managed PMS, and what that migration actually looks like in practice.
      </p>

      <h2>What you actually lose, and what you gain</h2>

      <p>The main things you lose moving from Open Dental to a managed PMS:</p>

      <ul>
        <li>
          <strong>Configurability.</strong> Open Dental can be customised deeply — custom reports
          written in SQL, custom views, custom procedure codes. Managed PMS are typically more
          opinionated by design.
        </li>
        <li>
          <strong>Self-hosting sovereignty.</strong> Your data sits on your hardware. For some
          clinics (defence contractors, certain government partnerships) that is a hard requirement.
          For most, it is a preference that comes with operational cost.
        </li>
        <li>
          <strong>Free license.</strong> Open Dental does not charge for the software itself. You
          pay for support, hosting, IT time, and customisation effort — but not the binary.
        </li>
      </ul>

      <p>The main things you gain:</p>

      <ul>
        <li>
          <strong>No infrastructure burden.</strong> No Windows server to patch, no MySQL/MariaDB to
          back up, no upgrade weekends. A managed PMS runs continuously and you do nothing to
          maintain it.
        </li>
        <li>
          <strong>Continuous deployment.</strong> Every clinic on the managed PMS is on the same
          version every week. Open Dental installations across clinics drift; managed PMS
          installations don&apos;t.
        </li>
        <li>
          <strong>Modern UX.</strong> Open Dental&apos;s interface evolved over two decades and has
          a Windows-leaning, dense menu structure. Modern web-native PMS — drag-driven schedule,
          click-through navigation, mobile-friendly layouts — are a different category of
          experience.
        </li>
        <li>
          <strong>APAC-specific features.</strong> WhatsApp Business API for recall, Singapore GST
          handling at billing, region-hosted patient data, PDPA-aware audit logs. None of this is
          what Open Dental was built for.
        </li>
      </ul>

      <h2>The three risks specific to leaving Open Dental</h2>

      <p>
        Open Dental migrations have three risks that don&apos;t come up in the same way with other
        PMS migrations.{" "}
        <a
          href="/articles/plato-to-cloud-migration"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          See the Plato migration playbook
        </a>{" "}
        for the more general migration risk model; what follows is what&apos;s Open Dental-specific.
      </p>

      <h3>Risk 1: Custom-query export</h3>

      <p>
        Open Dental clinics that have been running 3+ years typically have accumulated custom SQL
        reports, custom queries the office manager runs at month-end, and possibly custom database
        views. These don&apos;t port to a managed PMS — the destination doesn&apos;t expose SQL or
        accept your custom views.
      </p>

      <p>
        The mitigation is upfront: list every custom query the clinic currently runs and ask the
        destination PMS to confirm which built-in report covers the same need. Most cover ~80% out
        of the box; the last 20% either get rebuilt as managed dashboards or get accepted as a
        feature gap.
      </p>

      <h3>Risk 2: Customisation expectations</h3>

      <p>
        Open Dental&apos;s configurability creates a culture of expecting any change to be possible.
        Front-desk staff used to &ldquo;can you add a custom field for X?&rdquo; getting answered by
        clicking around in Open Dental settings will be surprised by &ldquo;not in the current
        version, on the roadmap for Q2&rdquo; from a managed vendor.
      </p>

      <p>
        Set this expectation at week-1 of pilot, not at the first feature request. The trade-off is
        that the managed product is more opinionated and ships faster across all clinics; the cost
        is less individual flexibility.
      </p>

      <h3>Risk 3: Self-hosted-data extraction</h3>

      <p>
        Open Dental&apos;s data lives in a MySQL/MariaDB database on your clinic&apos;s server.
        Extracting it means scheduling a maintenance window, dumping the database, sanitising any
        test/dev rows, and validating field-by-field against the destination PMS&apos;s schema. This
        is a real DBA task — usually 4–8 hours of focused work — and the clinic should expect to pay
        for it (either to their IT lead or to the destination PMS&apos;s migration team).
      </p>

      <p>
        Plato migrations skip this step because Plato is a desktop client with a vendor-managed
        export path. Open Dental migrations don&apos;t skip it.
      </p>

      <h2>The migration playbook for Open Dental specifically</h2>

      <p>The general three-week pattern still applies. Where Open Dental differs:</p>

      <h3>Week 1 — Audit and prep, with custom-query catalogue</h3>

      <ul>
        <li>
          Schema export from the Open Dental MySQL/MariaDB. The destination PMS team will tell you
          which tables are needed.
        </li>
        <li>
          Custom-query catalogue: the office manager lists every recurring report or query they run
          today. Each gets matched against the destination&apos;s built-in reports, or marked as a
          gap.
        </li>
        <li>
          Customisation review: any custom procedure codes, custom fee schedules, custom appointment
          types get reviewed. Most map cleanly; some get redesigned.
        </li>
        <li>
          Cutover date pinned. Wednesday remains the recommended day for the same reason it does for
          Plato migrations.
        </li>
      </ul>

      <h3>Week 2 — Cutover with a maintenance window</h3>

      <ul>
        <li>
          Tuesday evening: maintenance window starts. Open Dental database is dumped and locked
          read-only.
        </li>
        <li>
          Tuesday night: data import to the destination PMS, with row counts verified (patients,
          appointments, invoices, recall list, treatment history).
        </li>
        <li>
          Wednesday 8am: front desk opens the new PMS. Open Dental remains read-only on the office
          server for historical lookups.
        </li>
        <li>
          Wednesday and Thursday: discharge and billing flow through the new PMS. Same-day-bill rate
          dips for the first day, then recovers.
        </li>
      </ul>

      <h3>Week 3 — Stabilise and decommission</h3>

      <ul>
        <li>Recall list rebuilt in the new PMS with the surfacing window configured.</li>
        <li>
          Open Dental server kept available for 30 days as a read-only fallback for historical
          queries.
        </li>
        <li>
          After 30 days, the Open Dental server is decommissioned (or kept offline for archival per
          the clinic&apos;s legal hold policy).
        </li>
      </ul>

      <h2>Whether to do this at all</h2>

      <p>
        Open Dental is the right choice for a meaningful slice of clinics. If you&apos;re a US
        practice with deep US-payer billing, an in-house IT lead, and a budget for OD-certified
        consultants, the case for leaving is weaker. If you&apos;re an APAC practice running
        fee-for- service, no IT lead, and the office manager is also the weekend-DBA against her
        better judgement, the case for leaving is stronger.
      </p>

      <p>
        For a feature-by-feature comparison, see{" "}
        <a
          href="/compare/open-dental"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          Oralstack vs Open Dental
        </a>
        . For a worked example of a managed-PMS pilot in an APAC clinic, see the{" "}
        <a
          href="/customers/dfi-synergy"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          DFI Synergy case study
        </a>
        .
      </p>
    </>
  );
}
