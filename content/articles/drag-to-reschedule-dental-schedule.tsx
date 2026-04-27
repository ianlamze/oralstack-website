import type { Article } from "./types";

export const dragToRescheduleDentalSchedule: Article = {
  slug: "drag-to-reschedule-dental-schedule",
  title:
    "Drag-to-reschedule: the most-used motion in a dental clinic schedule",
  description:
    "Why direct manipulation beats form-fill for the front desk's most frequent task — covering timezone correctness, conflict detection, and the specific gotcha that breaks Plato-to-cloud migrations.",
  excerpt:
    "The front desk reschedules ~120 appointments a week in a typical 3-chair clinic. The interaction model for that motion shapes everything else they do.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "front-desk",
  tags: ["scheduling", "drag and drop", "front desk", "Singapore", "timezone"],
  readingMinutes: 7,
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        The front desk in a 3-chair Singapore clinic reschedules around 120
        appointments a week. The interaction model for that single
        operation is the most-used motion in the entire PMS — and it
        shapes everything else the front desk does. Most legacy systems
        treat rescheduling as a form-fill task. Modern systems treat it
        as a direct-manipulation motion. The difference is roughly 5
        seconds vs 30 seconds per reschedule, and a meaningful
        percentage of bookings that get lost in the friction.
      </p>

      <p>
        This article is for the clinic owner evaluating PMS options or
        the office manager noticing that the front desk avoids
        last-minute reschedules because they take too long. The fix is
        the schedule UI itself.
      </p>

      <h2>The form-fill model</h2>

      <p>
        Most legacy dental PMS — including Plato, the dominant Singapore
        system — treats rescheduling as a CRUD operation on an
        appointment record. The flow:
      </p>

      <ol>
        <li>Search for the patient by name or ID</li>
        <li>Open the patient&apos;s record</li>
        <li>Click the appointment in question</li>
        <li>Click Edit (or its equivalent)</li>
        <li>A form opens with date, time, chair, provider dropdowns</li>
        <li>Change the values</li>
        <li>Click Save</li>
        <li>(Optional) Send confirmation message manually</li>
      </ol>

      <p>
        Best case 25–30 seconds. Common case 45+ seconds when the patient
        search is slow or the form has validation issues. And the patient
        is on the phone the whole time.
      </p>

      <h2>The direct-manipulation model</h2>

      <p>
        A drag-to-reschedule schedule treats the appointment as a tile on
        a 2D grid (chairs × time). To reschedule, the front desk drags
        the tile to the new slot. The flow:
      </p>

      <ol>
        <li>Find the appointment on the day grid (visible at a glance)</li>
        <li>Click and drag to the new slot</li>
        <li>Release</li>
      </ol>

      <p>
        3–5 seconds. The patient hears &ldquo;done — Thursday at 3pm,
        confirmation message sent.&rdquo; The whole interaction is a
        single hand motion.
      </p>

      <h2>Why direct manipulation wins</h2>

      <p>Three reasons beyond pure speed:</p>

      <ul>
        <li>
          <strong>Visual confirmation.</strong> The new slot is visible
          in context — the front desk sees if it conflicts with another
          booking, or sits next to a difficult patient, or fills a gap
          that was empty. Form-fill rescheduling shows none of this.
        </li>
        <li>
          <strong>Conflict detection is automatic.</strong> If the drop
          target overlaps another appointment, the schedule rejects the
          move. No save-then-fail-then-error-message loop.
        </li>
        <li>
          <strong>Reschedules happen that wouldn&apos;t otherwise.</strong>{" "}
          When the operation is heavy, the front desk avoids it — they
          tell the patient &ldquo;please call back tomorrow&rdquo; or
          they leave the original slot empty. When it&apos;s light, the
          recovery happens during the call.
        </li>
      </ul>

      <h2>The timezone gotcha</h2>

      <p>
        One technical detail that breaks specifically in Singapore-built
        dental cloud migrations: timezone-correct commits. When a
        front-desk drag moves an appointment from 10:00 to 14:00 SGT,
        the system must commit those times in clinic-local timezone
        (Asia/Singapore, UTC+8). Some implementations get this wrong by
        committing in UTC.
      </p>

      <p>
        The failure looks like this: the drag works visually, the
        appointment appears in the new slot, the front desk moves on. On
        page reload, the appointment now appears at 02:00 — outside the
        visible day window. The patient calls 3 days later asking why
        nobody&apos;s there for their Thursday 2pm appointment. Multiply
        by 120 reschedules a week.
      </p>

      <p>
        The fix is correct timezone handling using{" "}
        <code className="font-mono text-[0.95em] bg-[var(--color-canvas-tinted)] px-1.5 py-0.5 rounded">
          Intl.DateTimeFormat
        </code>{" "}
        rather than{" "}
        <code className="font-mono text-[0.95em] bg-[var(--color-canvas-tinted)] px-1.5 py-0.5 rounded">
          Date.getUTCHours()
        </code>{" "}
        — but the operational symptom is the one to test for. When
        evaluating a cloud PMS, drag an appointment, refresh the page,
        check it&apos;s where you put it.
      </p>

      <p>
        For more on the migration mechanics, see{" "}
        <a
          href="/articles/plato-to-cloud-migration"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          migrating from Plato to a cloud PMS
        </a>
        .
      </p>

      <h2>What to look for in a drag-to-reschedule schedule</h2>

      <p>Five tests when demoing a PMS:</p>

      <ul>
        <li>
          <strong>The 5-second drag.</strong> Drag an appointment from one
          slot to another. Should complete in under 5 seconds, including
          confirmation toast.
        </li>
        <li>
          <strong>The reload test.</strong> After the drag, refresh the
          page. The appointment should still be in the new slot, with
          the original time gone — no UTC drift.
        </li>
        <li>
          <strong>The conflict drop.</strong> Try to drop on top of an
          existing appointment. The system should reject visually
          (refuse-cursor or red highlight) and not save.
        </li>
        <li>
          <strong>The undo.</strong> After a successful reschedule, can
          you undo? At minimum a clear &ldquo;move back&rdquo; affordance
          for 30 seconds.
        </li>
        <li>
          <strong>The patient notification.</strong> Does the system
          automatically send a templated reschedule confirmation? If
          not, the front desk has to do it manually — defeats the time
          saving.
        </li>
      </ul>

      <h2>The multi-chair extension</h2>

      <p>
        Dental clinics aren&apos;t single-chair. The drag motion works in
        2D — same time, different chair (drag horizontally) is as common
        as same chair, different time (drag vertically). The grid layout
        of chairs as columns × time as rows is the right primitive.
      </p>

      <p>
        Look for chair-column rendering that adapts dynamically (3 chair
        columns one day, 5 the next when a locum joins), and provider
        labels per column. Static chair grids force the front desk into
        rigid slot allocation.
      </p>

      <h2>What to do next</h2>

      <p>
        Time your front desk on rescheduling. Stopwatch a single
        reschedule from &ldquo;patient asks to move&rdquo; to
        &ldquo;confirmation sent.&rdquo; If it&apos;s over 30 seconds,
        the schedule UI is the bottleneck.
      </p>

      <p>
        See the{" "}
        <a
          href="/workflows#front-desk"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          Oralstack front desk workflow
        </a>{" "}
        for the drag-to-reschedule implementation, including
        timezone-correct commits and conflict detection. Or read{" "}
        <a
          href="/articles/reducing-no-show-rates"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          how to reduce no-show rates
        </a>{" "}
        for the broader operational case for a fast schedule.
      </p>
    </>
  );
}
