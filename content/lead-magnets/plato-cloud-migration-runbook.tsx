import type { LeadMagnet } from "./types";

export const platoCloudMigrationRunbook: LeadMagnet = {
  slug: "plato-cloud-migration-runbook",
  cluster: "migration",
  title: "Plato → cloud PMS migration runbook",
  description:
    "Pre-migration audit, data export specifics, cleaning, cutover-week day-by-day, staff retraining, post-cutover review. The runbook for clinics moving off Plato to a cloud dental PMS.",
  pitch:
    "Day-by-day runbook for clinics moving from Plato to a cloud PMS. Pre-audit, export, cleanup, cutover week, staff retraining.",
  deliverable: "11-page Plato migration runbook",
  readingMinutes: 13,
  publishedAt: "2026-04-27",
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Migrating off Plato is one of the higher-stakes operational
        moves a Singapore dental clinic makes. The clinic runs on it
        every day; downtime translates directly to lost revenue and
        unhappy patients. Done well, a Plato → cloud migration is
        invisible to patients. Done badly, it introduces weeks of
        catch-up data entry and at least one incident that lives in
        clinic folklore.
      </p>

      <p>
        This runbook describes the full migration motion: what to audit
        before you start, how to export Plato data without losing
        fidelity, how to clean it, how to run cutover week, and how to
        operate in the first month after.
      </p>

      <h2>Section 1 — Pre-migration audit (week -8 to -4)</h2>

      <h3>Inventory everything</h3>

      <ul>
        <li>
          <strong>Plato version + last patch date.</strong> Different
          versions export differently; some export options only exist
          on recent patches.
        </li>
        <li>
          <strong>Data volumes.</strong> Patient count, total
          appointments to date, treatment-history record count, financial
          record count, attached files (radiographs, photos, intake
          PDFs).
        </li>
        <li>
          <strong>Custom fields.</strong> List every custom field added
          to Plato over time. These often hold critical clinical info
          (allergy notes, recall preferences, billing notes) and are the
          most commonly lost in migration.
        </li>
        <li>
          <strong>Integrations.</strong> What else talks to Plato?
          Imaging desktop apps, accounting export, recall SMS service,
          insurance portals. Each is a migration sub-project.
        </li>
        <li>
          <strong>Active users.</strong> Roles: receptionist, dentist,
          clinical assistant, owner, accountant. Usage patterns differ;
          retraining differs.
        </li>
      </ul>

      <h3>Decide on data scope</h3>

      <p>
        Not all data needs to migrate live. Pragmatic split:
      </p>

      <ul>
        <li>
          <strong>Live in cloud (must migrate cleanly):</strong> active
          patients, appointments next 90 days, current recall queue,
          last-12-month treatment history, last-12-month financial
          ledger, allergy / consent / clinical flags, current insurance
          info.
        </li>
        <li>
          <strong>Read-only archive (historical, accessible but not edited):</strong>
          older treatment history, older financial records, archived
          patients (no visit in 5+ years), historical radiographs.
        </li>
      </ul>

      <p>
        Reducing scope reduces risk. A migration that tries to perfectly
        port 15 years of data is a migration that takes 6 months and
        breaks more than it preserves.
      </p>

      <h3>Communicate</h3>

      <ul>
        <li>
          Inform clinical team — what they need to know, when training
          happens, what the cutover week looks like.
        </li>
        <li>
          Inform patients with appointments in the cutover window —
          they may need to confirm details a second time.
        </li>
        <li>
          Inform external partners — accountants, insurers, lab — that
          your billing system is changing on date X.
        </li>
      </ul>

      <h2>Section 2 — Export from Plato (week -4 to -2)</h2>

      <h3>Standard exports</h3>

      <p>Plato exports vary by edition. Generally available:</p>

      <ul>
        <li>Patient list (CSV)</li>
        <li>Appointment history (CSV)</li>
        <li>Treatment history (CSV)</li>
        <li>Financial transactions (CSV)</li>
        <li>Recall list (CSV)</li>
        <li>Custom field values (sometimes only in proprietary format — request DB-level dump)</li>
      </ul>

      <h3>Gotchas</h3>

      <ul>
        <li>
          <strong>Timezone handling.</strong> Plato stores some
          timestamps in local time, others in UTC, depending on field
          and version. Migration scripts that don&apos;t handle this
          shift appointments by 8 hours after import. Test with known
          appointments.
        </li>
        <li>
          <strong>NRIC formatting.</strong> Hyphens, spaces, leading
          zeros — Plato allows multiple formats. Normalise to a
          canonical format on import.
        </li>
        <li>
          <strong>Patient duplicates.</strong> Same patient registered
          twice (different name spellings, different IDs). Detect via
          NRIC, mobile, DOB matching.
        </li>
        <li>
          <strong>Treatment-history orphans.</strong> Treatment records
          referencing deleted patient IDs. Decide: migrate as orphan
          (with note), drop, or attempt patient match.
        </li>
        <li>
          <strong>Financial reconciliation.</strong> Total of exported
          transactions should match Plato&apos;s month-end financial
          summary for at least the last 12 months. Discrepancies surface
          missed transactions.
        </li>
        <li>
          <strong>Attached files.</strong> Plato stores radiographs and
          PDFs in a server-side folder structure. Export the folder
          alongside the database export, or many files will be referenced
          but missing post-migration.
        </li>
      </ul>

      <h2>Section 3 — Data cleaning (week -3 to -1)</h2>

      <ul>
        <li>
          <strong>Patient deduplication.</strong> Run automated
          dedup on NRIC + mobile + DOB. Manually review possible matches
          flagged with name similarity but different identifiers.
          Conservative merge — if uncertain, leave as separate.
        </li>
        <li>
          <strong>Recall queue cleanup.</strong> Patients with recall
          due dates &gt;2 years past — review whether to keep in active
          recall or archive. Most have moved on.
        </li>
        <li>
          <strong>Provider mapping.</strong> Plato provider codes vs
          new system&apos;s provider IDs. Map every provider explicitly.
        </li>
        <li>
          <strong>Procedure code mapping.</strong> Plato may use clinic-
          custom codes. Map each to the new system&apos;s code (or to
          MOH-standard codes if you&apos;re standardising).
        </li>
        <li>
          <strong>Custom fields → new fields.</strong> Decide each
          custom field&apos;s destination. Some go to dedicated fields,
          some to free-text notes. Document the mapping.
        </li>
        <li>
          <strong>Allergy and clinical-flag normalisation.</strong>
          These are critical. If Plato has them in free-text and the
          new system has structured allergy fields, map carefully — manual
          review for any patient with non-empty allergy text.
        </li>
      </ul>

      <h2>Section 4 — Cutover week, day by day</h2>

      <h3>Friday before cutover (day -2)</h3>

      <ul>
        <li>Final import of cleaned data into the new system.</li>
        <li>
          Smoke test: pick 20 random patients, verify their record is
          correct end-to-end (history, recall, financial, attached
          files).
        </li>
        <li>
          Inform clinical team of the cutover plan — chair-by-chair
          familiarisation tomorrow.
        </li>
      </ul>

      <h3>Saturday before cutover (day -1)</h3>

      <ul>
        <li>
          Half-day clinic familiarisation. Each staff member walks their
          common workflows in the new system on the imported real data.
        </li>
        <li>
          Front desk: pull tomorrow&apos;s schedule, look up 5 patients,
          register a fake new patient.
        </li>
        <li>
          Clinical: open today&apos;s charted patients, attempt a chart
          entry, attempt a radiograph capture.
        </li>
        <li>
          Owner: verify financial dashboard reads sensible numbers.
        </li>
        <li>
          Document any issues found — these must be resolved before
          Monday morning.
        </li>
      </ul>

      <h3>Cutover Monday (day 0)</h3>

      <ul>
        <li>
          Monday is intentionally light-scheduled — no new patient
          appointments, only repeat patients with familiar staff.
        </li>
        <li>
          Plato runs in read-only mode in the background as a fallback
          / reference.
        </li>
        <li>
          Two staff at the front desk all day, one supporting the other
          on new-system motions.
        </li>
        <li>
          End of day: 30-minute review with all staff — what worked,
          what felt slow, what broke.
        </li>
      </ul>

      <h3>Cutover Tuesday–Friday (days 1–4)</h3>

      <ul>
        <li>Normal scheduling resumes.</li>
        <li>
          Daily 15-minute end-of-day reviews to catch issues early.
        </li>
        <li>
          On-call dental migration support (your vendor or migration
          partner) available all week.
        </li>
        <li>
          Any data discrepancies surfaced — log, triage, fix in the new
          system OR re-import from Plato source if structural.
        </li>
      </ul>

      <h2>Section 5 — Staff retraining by role</h2>

      <h3>Front desk</h3>

      <ul>
        <li>
          Booking: new vs returning. Scheduling drag-to-reschedule.
          Recall pull workflow.
        </li>
        <li>
          Discharge billing: insurance vs patient portion split,
          payment terminal integration, recall set before patient leaves.
        </li>
        <li>WhatsApp / SMS recall outreach.</li>
      </ul>

      <h3>Clinical (dentist + assistant)</h3>

      <ul>
        <li>Chart navigation: open patient, last visit, treatment plan.</li>
        <li>Tooth-led charting (vs Plato&apos;s form-led).</li>
        <li>Radiograph capture from the chair.</li>
        <li>Case-note entry that writes back to billing.</li>
      </ul>

      <h3>Owner / practice manager</h3>

      <ul>
        <li>Daily / weekly / monthly dashboards.</li>
        <li>Audit log queries — for accountant or compliance.</li>
        <li>User management: adding / removing staff, role changes.</li>
        <li>Backup verification: how to confirm backups are running.</li>
      </ul>

      <h2>Section 6 — First month after cutover</h2>

      <h3>Week 1</h3>

      <ul>
        <li>Daily standups; surface and resolve issues fast.</li>
        <li>
          Plato remains read-only. Cross-reference for any patient where
          something feels off.
        </li>
        <li>
          Staff feedback loop: what feels slower than Plato, what feels
          faster, what&apos;s confusing.
        </li>
      </ul>

      <h3>Week 2–3</h3>

      <ul>
        <li>
          End daily standups; switch to twice-weekly review.
        </li>
        <li>
          Address top staff friction items — usually muscle-memory
          differences from Plato that need either retraining or new-system
          configuration tweaks.
        </li>
        <li>
          Monitor the financial dashboard against Plato&apos;s last-month
          data — totals should be in the same ballpark.
        </li>
      </ul>

      <h3>Week 4</h3>

      <ul>
        <li>
          End-of-month financial reconciliation in the new system.
          Compare to your accountant&apos;s expectations.
        </li>
        <li>
          Plato decommission decision: shut down the read-only fallback
          (most clinics keep it 6–12 months for archive query, then
          archive the database to cold storage).
        </li>
        <li>
          Migration retrospective: what would you do differently next
          time? Document for any other location migration.
        </li>
      </ul>

      <h2>Section 7 — Rollback contingency</h2>

      <p>
        At what point would you roll back to Plato? Define this
        explicitly before cutover.
      </p>

      <ul>
        <li>
          <strong>Hard fail (rollback within 24h):</strong> data
          corruption, system unavailable for a clinic-day, financial
          ledger off by &gt;5%.
        </li>
        <li>
          <strong>Soft fail (review at end of week 1):</strong>
          significant staff productivity loss, &gt;3 patient-facing
          incidents in week 1, data scope gap discovered.
        </li>
        <li>
          <strong>Acceptable friction (continue):</strong> slower for
          staff (expected for first 2–3 weeks), occasional UI confusion,
          edge-case data quirks.
        </li>
      </ul>

      <h2>Pre-cutover checklist</h2>

      <ul>
        <li>Pre-migration audit complete (week -8 to -4)</li>
        <li>Plato data exported with all relevant tables (week -4)</li>
        <li>Data cleaned, deduped, mapped (week -3 to -1)</li>
        <li>Final import tested in new system (Friday day -2)</li>
        <li>Staff Saturday familiarisation done (day -1)</li>
        <li>Plato switched to read-only fallback (day -1)</li>
        <li>External partners notified (week -1)</li>
      </ul>

      <h2>Cutover-day checklist</h2>

      <ul>
        <li>Light schedule (no new patients on Monday)</li>
        <li>Two front desk staff all day</li>
        <li>Migration partner on standby</li>
        <li>Plato accessible read-only as cross-reference</li>
        <li>End-of-day team review and issue log</li>
      </ul>

      <h2>Post-cutover checklist (week 1)</h2>

      <ul>
        <li>Daily standups</li>
        <li>Patient-facing incident log (target: 0)</li>
        <li>Staff feedback log → translated into actions</li>
        <li>Financial sanity check (daily totals make sense)</li>
        <li>Decision on rollback by Friday — go or no-go for permanence</li>
      </ul>

      <p>
        For the cloud-side of this migration — the destination PMS that
        accepts Plato exports cleanly, handles the 8-hour timezone
        gotcha correctly, mirrors Plato&apos;s booking form for staff
        muscle memory, and keeps the financial ledger structurally sane
        — Oralstack is built around exactly this transition. Read more
        at{" "}
        <a
          href="/articles/plato-to-cloud-migration"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          our Plato migration article
        </a>{" "}
        or request a migration assessment at{" "}
        <a
          href="/contact#migration"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          /contact
        </a>
        .
      </p>
    </>
  );
}
