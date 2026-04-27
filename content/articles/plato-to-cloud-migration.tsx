import type { Article } from "./types";

export const platoToCloudMigration: Article = {
  slug: "plato-to-cloud-migration",
  title:
    "Migrating from Plato to a cloud PMS: a Singapore dental clinic guide",
  description:
    "A concrete migration playbook for Singapore dental clinics moving from Plato to a cloud-based practice management system — covering data continuity, cutover risk, and staff retraining.",
  excerpt:
    "Three weeks. No fallback diary in parallel. The forcing-function migration plan that Singapore clinics use to leave Plato without losing a patient.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "migration",
  tags: ["Plato", "migration", "Singapore", "PMS", "cloud"],
  readingMinutes: 9,
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Plato is the dominant practice management system in Singapore dental
        clinics. It has been for two decades. It is also showing its age — the
        installed-on-the-front-desk-PC architecture, the Windows-only client,
        the manual end-of-day reconciliation. For clinics that have been
        running on Plato for 5+ years, the question isn&apos;t whether to move
        — it&apos;s how to move without losing a week of revenue or a year of
        patient history.
      </p>

      <p>
        This guide is for the clinic owner or office manager weighing that
        question. We&apos;ve done this migration ourselves and worked with
        clinics doing it in three weeks, no parallel paper diary kept. The
        steps below are concrete; the risk model is honest.
      </p>

      <h2>What you actually lose, and what you gain</h2>

      <p>
        The instinct is to assume you lose history and gain features. The truth
        is closer to the opposite — modern cloud PMS migration tools preserve
        history fine; what you really gain is workflow speed, and what you
        risk is staff resistance to changing their muscle memory.
      </p>

      <p>What a typical Plato → cloud migration changes for a 3-chair clinic:</p>

      <ul>
        <li>
          <strong>Schedule</strong> moves from a desktop client to a browser
          tab the front desk keeps open all day. Drag-to-reschedule replaces
          the open-ticket / fill-form / save loop.
        </li>
        <li>
          <strong>Billing</strong> moves from an end-of-day reconciliation
          process to a discharge-flow process. Treatment lines populate from
          the chart automatically. Same-day-bill rates typically rise from
          ~60% to ~85%.
        </li>
        <li>
          <strong>Charting</strong> stays familiar — FDI numbering, surface
          notation, treatment codes — but the chart now talks to billing
          directly. No double entry.
        </li>
        <li>
          <strong>Recall</strong> stops being a spreadsheet someone forgets to
          update. Candidates surface three weeks before due, sorted by recall
          age, and outreach can be templated.
        </li>
        <li>
          <strong>Imaging</strong>, if you&apos;re on DICOM-capable sensors,
          moves into the patient chart instead of living in a parallel folder
          on a separate desktop.
        </li>
      </ul>

      <p>
        What you don&apos;t lose: patient history, treatment records, billing
        history, recall lists. Modern migration tooling like{" "}
        <a href="/integrations" className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline">
          Plato → Oralstack field-for-field migration
        </a>{" "}
        carries these across.
      </p>

      <h2>The three real risks</h2>

      <p>
        Every clinic owner asks about data migration. Almost no one asks about
        the three risks that actually break migrations.
      </p>

      <h3>Risk 1: Workflow disruption during cutover</h3>

      <p>
        The biggest source of migration pain isn&apos;t the data — it&apos;s
        the front desk having to look at two systems for a week while
        cutover finishes. Patients call asking for changes; the front desk
        doesn&apos;t know which system is current; double-bookings happen;
        billing falls through cracks.
      </p>

      <p>
        The fix is counter-intuitive: <strong>don&apos;t run both systems
        in parallel.</strong> Pick a cutover date, pre-load data the night
        before, and from 8am the next morning the new system is the only
        truth. Plato is read-only after that, used only for historical
        lookups. Clinics that try to keep Plato running &ldquo;just in
        case&rdquo; consistently take 6–8 weeks to fully migrate. Clinics
        that force the cutover finish in three weeks.
      </p>

      <h3>Risk 2: Staff retraining cost</h3>

      <p>
        Plato has 20 years of muscle memory at the front desk. The instinct
        is to budget for a multi-day training session. In practice, what
        works better: a 30-minute walkthrough on day one, then real shift
        coverage with the new system, with someone available on chat for
        questions for the first week.
      </p>

      <p>
        Front desk staff learn by doing, not by sitting through training
        sessions. The real cost is in the first week of slightly slower
        booking — about 30 seconds per appointment that disappears by week
        three.
      </p>

      <h3>Risk 3: Compliance continuity</h3>

      <p>
        Singapore PDPA requires that patient data stays continuously
        protected during transitions. Two specific things to verify with
        any cloud PMS before signing:
      </p>

      <ul>
        <li>
          Where is the data hosted? For Singapore patient records, it should
          be in the Singapore region (asia-southeast1 on Google Cloud, or
          equivalent). Cross-border transfer requires explicit patient
          consent.
        </li>
        <li>
          Is there a tenant-isolation model that prevents data crossing
          between clinics? Postgres Row-Level Security is the standard
          implementation; ask vendors how they enforce it.
        </li>
      </ul>

      <p>
        Oralstack&apos;s{" "}
        <a href="/security" className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline">
          security posture
        </a>{" "}
        documents both of these in detail.
      </p>

      <h2>The three-week migration playbook</h2>

      <p>
        This is the schedule clinics typically run, including the one we run
        ourselves. Each phase has one job — don&apos;t try to do them in
        parallel.
      </p>

      <h3>Week 1 — Audit and prep</h3>

      <ul>
        <li>
          Export full patient list from Plato, plus appointment history (last
          12 months minimum), treatment records, and outstanding A/R balances.
        </li>
        <li>
          Map fields between Plato&apos;s schema and the destination PMS. Most
          fields map 1:1; a few will need decisions (Plato&apos;s free-text
          treatment notes might split into structured fields, etc.).
        </li>
        <li>
          Pick the cutover date. Choose a Wednesday — gives you Mon-Tue to
          finish prep, Thu-Fri to handle issues with the full week ahead.
        </li>
        <li>
          Brief the front desk on what changes and what doesn&apos;t. Frame
          it as &ldquo;the schedule is in a browser tab now.&rdquo;
        </li>
      </ul>

      <h3>Week 2 — Cutover</h3>

      <ul>
        <li>
          Tuesday night: full data import. Verify counts match (patients,
          appointments, invoices, recall list).
        </li>
        <li>
          Wednesday 8am: front desk opens the new schedule and starts taking
          calls. Plato is now read-only.
        </li>
        <li>
          Wednesday and Thursday: bill discharge in the new system. Expect a
          slight slowdown on day one — probably 30 seconds extra per
          discharge — that resolves by Friday.
        </li>
        <li>
          Daily standup at end of day: 5 minutes, what broke, what to fix
          tomorrow.
        </li>
      </ul>

      <h3>Week 3 — Stabilise</h3>

      <ul>
        <li>
          Recall outreach: import the recall list, set the surfacing window
          (we recommend three weeks before due).
        </li>
        <li>
          Imaging integration: if DICOM-capable, connect sensors to the
          chart so chairside capture writes to the visit directly.
        </li>
        <li>
          Audit: run reports comparing week 3 to a representative pre-cutover
          week. Same-day billing rate, no-show rate, drag-reschedule count.
          These should already be moving in the right direction.
        </li>
      </ul>

      <h2>What to do next</h2>

      <p>
        If you&apos;re running Plato today and considering this kind of
        migration, the highest-leverage starting point is a 30-minute
        conversation about your specific clinic — chairs, providers,
        appointment volume, current pain points — to understand whether the
        three-week model fits.
      </p>

      <p>
        See the{" "}
        <a href="/customers/dfi-synergy" className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline">
          DFI Synergy case study
        </a>{" "}
        for a worked example of this exact migration in a 3-chair Singapore
        clinic. Or read about the{" "}
        <a href="/workflows#front-desk" className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline">
          front-desk workflow
        </a>{" "}
        that the migration moves you onto.
      </p>
    </>
  );
}
