import type { LeadMagnet } from "./types";

export const frontDeskDailyPlaybook: LeadMagnet = {
  slug: "front-desk-daily-playbook",
  cluster: "front-desk",
  title: "The dental clinic front desk daily playbook",
  description:
    "A reference for how a busy Singapore dental clinic front desk runs a normal day — opening, in-day flow, recall, no-shows, shift handover, end-of-day reconciliation. Print, share, edit per clinic.",
  pitch:
    "A reference for how a busy dental clinic front desk runs a normal day. Open-of-day to end-of-day, plus recall and no-show motions.",
  deliverable: "12-page daily front desk playbook",
  readingMinutes: 12,
  publishedAt: "2026-04-27",
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        This is a reference playbook for the dental clinic front desk —
        not a feature pitch, not a software comparison. It describes how
        a busy Singapore dental clinic front desk runs a normal day, from
        the moment the door unlocks until the keys go back in the drawer.
        Clinic owners can use it as an onboarding doc for new staff;
        practice managers can edit it per clinic.
      </p>

      <p>
        The motions below are PMS-agnostic. Whatever software the clinic
        runs, the same operational beats apply. Where Singapore-specific
        details matter (CHAS, MediSave, WhatsApp norms), we call them
        out.
      </p>

      <h2>Section 1 — The daily rhythm</h2>

      <h3>Open-of-day (15 minutes before first appointment)</h3>

      <ul>
        <li>
          <strong>Verify the schedule.</strong> Pull up today&apos;s
          chair-by-chair view. Confirm provider availability against
          leave calendar — last-minute MC or rescheduled CME doesn&apos;t
          show up automatically in most PMS.
        </li>
        <li>
          <strong>Reconcile overnight messages.</strong> Check WhatsApp
          Business inbox, clinic main email, voicemail. Flag any same-day
          cancellations and start backfilling the slots immediately.
        </li>
        <li>
          <strong>Pull patient prep notes.</strong> Look at every patient
          on today&apos;s schedule — outstanding payments, allergy flags,
          consent forms not yet signed, recall messages not yet sent.
          Surface these before the first patient sits.
        </li>
        <li>
          <strong>Set up the chair payment terminal.</strong> Verify it
          connects, batch-clear yesterday&apos;s settled transactions,
          confirm float in the cash drawer.
        </li>
        <li>
          <strong>Brief the clinical team.</strong> Walk to the
          back: who&apos;s arriving when, any flagged patients, any
          materials shortages from the previous day. 90 seconds.
        </li>
      </ul>

      <h3>Morning (8:00–12:00)</h3>

      <ul>
        <li>Patient arrival → check in → seat or notify clinical team.</li>
        <li>
          New patients: registration form, insurance/payment-method
          capture, intake-form pre-completion if not done online ahead.
        </li>
        <li>
          Phone discipline: every inbound call gets a callback time
          quoted within 30 seconds. &ldquo;We&apos;ll call you back by
          11am&rdquo; is better than open-ended &ldquo;soon&rdquo;.
        </li>
        <li>
          Real-time WhatsApp: replies within 15 minutes during clinic
          hours. Auto-reply outside hours sets the next-business-day
          expectation.
        </li>
      </ul>

      <h3>Lunch / quiet hour (12:00–14:00)</h3>

      <ul>
        <li>
          <strong>Recall pull.</strong> Pull the recall list — patients
          due in the next 3 weeks who haven&apos;t been booked. Send
          batched WhatsApp / SMS templated outreach.
        </li>
        <li>
          <strong>Insurance pre-auth.</strong> Submit any pre-auths for
          tomorrow&apos;s scheduled procedures (TPA, MediSave 600
          claims).
        </li>
        <li>
          <strong>Chase outstanding payments.</strong> Call or message
          patients with bills &gt;30 days outstanding. Limit to 6
          patients per day to keep collection professional, not
          aggressive.
        </li>
      </ul>

      <h3>Afternoon (14:00–18:00)</h3>

      <ul>
        <li>Same in-day flow as morning.</li>
        <li>
          Tomorrow-prep at 16:00: confirm tomorrow&apos;s patients via
          WhatsApp template. Aim for 100% confirmation by 18:00.
        </li>
      </ul>

      <h3>End-of-day (15 minutes after last appointment)</h3>

      <ul>
        <li>
          <strong>Reconciliation.</strong> Daily payment reconciliation
          — terminal totals match PMS-recorded receipts. Investigate any
          mismatch immediately, not tomorrow.
        </li>
        <li>
          <strong>Recall coverage.</strong> Re-check the recall report:
          how many of today&apos;s recall outreach got responses?
          Schedule responses immediately rather than batching for next
          day.
        </li>
        <li>
          <strong>Tomorrow&apos;s schedule briefing.</strong> Print or
          share digitally the chair-by-chair schedule for tomorrow with
          the clinical team.
        </li>
        <li>
          <strong>Lock the schedule.</strong> Lock today&apos;s schedule
          to read-only. Any retroactive edit needs a comment for the
          audit trail.
        </li>
      </ul>

      <h2>Section 2 — Eight motions every front desk runs</h2>

      <p>
        These are the discrete operational motions that fill a front desk
        shift. Each should have a documented procedure (1 page max, on
        the wall or in the staff intranet).
      </p>

      <ol>
        <li>
          <strong>Booking a returning patient.</strong> Search by name or
          NRIC last-4. Two keystrokes ideal, never more than five.
          Confirm contact details current. Suggest provider continuity
          (same dentist as last visit unless patient prefers otherwise).
        </li>
        <li>
          <strong>Registering a new patient.</strong> Capture: name,
          NRIC/passport, mobile, email, address, insurance, allergies,
          existing medical conditions, source (referral / Google / repeat
          family). Insurance and consent capture before the first
          billable procedure.
        </li>
        <li>
          <strong>Rescheduling.</strong> Open the schedule for the next
          7–14 days. Offer 2 specific alternatives, never &ldquo;when
          would suit you?&rdquo;. Re-confirm via WhatsApp with the new
          slot details immediately.
        </li>
        <li>
          <strong>Cancelling.</strong> Note reason in the patient record
          (clinical-relevant ones: pregnancy, medical, financial). Open
          the slot for backfill. If &gt;48h notice, no fee. If &lt;48h,
          apply clinic policy uniformly.
        </li>
        <li>
          <strong>Discharging a patient (post-treatment).</strong>
          Treatment lines pulled from the chart, insurance vs patient
          portion split clearly, payment taken at the chair, recall
          scheduled before they leave the building. The patient should
          not stand at the front desk waiting for invoice prep.
        </li>
        <li>
          <strong>Handling a complaint.</strong> Listen first. Document
          immediately in the patient record. Acknowledge same day,
          response within 48h. Escalate to clinic owner / dentist for
          clinical-related complaints.
        </li>
        <li>
          <strong>Insurance enquiry.</strong> &ldquo;Do you take my
          insurance?&rdquo; — have a current TPA list pinned. For
          ambiguous cases, take patient&apos;s details and confirm
          eligibility within 24h.
        </li>
        <li>
          <strong>Same-day appointment request.</strong> Toothache /
          trauma / urgent. Always slot if at all possible — same-day
          urgent care is one of the highest-loyalty interactions in
          dentistry.
        </li>
      </ol>

      <h2>Section 3 — Recall mechanics</h2>

      <p>
        Recall is where most clinics leak revenue. A patient last seen in
        November is due in May; nobody remembers; patient eventually
        switches clinics. Recall discipline alone can lift annual revenue
        10–25% in a clinic that was previously informal about it.
      </p>

      <ul>
        <li>
          <strong>3-week lookahead.</strong> Surface recall candidates
          three weeks before due date. Earlier is too premature; later
          and patients have already booked elsewhere.
        </li>
        <li>
          <strong>Batched outreach windows.</strong> Twice-weekly recall
          batches (e.g. Tuesday + Thursday lunch). Avoid Monday morning
          (people ignore work messages) and Friday afternoon (start of
          weekend mode).
        </li>
        <li>
          <strong>Templated WhatsApp.</strong> &ldquo;Hi [name], your
          6-month dental check is due. We have slots on [day1] and [day2]
          — reply with which works, or message us another time that
          suits.&rdquo; Personal but templated.
        </li>
        <li>
          <strong>Track response rate.</strong> Aim for &gt;40%
          first-touch response. If persistently below 25%, check the
          template and the timing.
        </li>
        <li>
          <strong>Escalation ladder.</strong> No response after 5 days →
          second touch (different channel or different staff member). No
          response after 10 days → mark as lapsed; review every quarter
          for outreach campaign.
        </li>
      </ul>

      <h2>Section 4 — Handling no-shows</h2>

      <ul>
        <li>
          <strong>Confirm 24h ahead, every time.</strong> WhatsApp
          template at 16:00 the day before. If unconfirmed by 8am the
          next morning, call.
        </li>
        <li>
          <strong>No-show fee.</strong> Document policy in patient intake
          forms and on the appointment confirmation. Apply uniformly
          (don&apos;t selectively waive — that erodes the policy).
        </li>
        <li>
          <strong>No-show repeat offenders.</strong> 2 no-shows in 12
          months → require deposit on next booking. 3 no-shows → discuss
          with clinic owner; some clinics require pre-payment for future
          appointments, others end the relationship.
        </li>
        <li>
          <strong>Backfill protocol.</strong> The moment a no-show is
          confirmed (~10 min after slot start), call the recall list +
          waitlist. Singapore dental clinics commonly fill 50%+ of
          no-show slots within 30 minutes if the front desk is fast.
        </li>
      </ul>

      <h2>Section 5 — Shift handover</h2>

      <p>
        For clinics with multiple front-desk staff or AM/PM shifts. The
        handover happens in 5 minutes:
      </p>

      <ul>
        <li>Open items: pending callbacks, in-progress reschedules.</li>
        <li>Today&apos;s no-shows + backfill status.</li>
        <li>
          Cash drawer reconciliation if the till is held by the outgoing
          shift.
        </li>
        <li>Any patient flagged for the next clinical team to know about.</li>
        <li>WhatsApp inbox: read receipts cleared on handled messages.</li>
      </ul>

      <h2>Section 6 — End-of-week motions</h2>

      <p>
        Friday end-of-day adds a few weekly motions on top of the daily
        end-of-day:
      </p>

      <ul>
        <li>
          <strong>Weekly reconciliation review.</strong> Total takings vs
          PMS-recorded vs bank settlement. Investigate variance &gt;1%.
        </li>
        <li>
          <strong>Recall coverage rate.</strong> What % of recall
          candidates from this week got booked? Aim for &gt;60%.
        </li>
        <li>
          <strong>Insurance claim status.</strong> Open claims &gt;14
          days — chase the TPA. Open claims &gt;30 days — escalate.
        </li>
        <li>
          <strong>Inventory check.</strong> Quick scan of consumables —
          glove sizes, anaesthetic, impression materials, lab pickup
          envelopes. Order what&apos;ll run out next week.
        </li>
        <li>
          <strong>Hand-off to weekend coverage.</strong> Set WhatsApp
          auto-reply, voicemail message, emergency on-call number.
        </li>
      </ul>

      <h2>Roll-out checklist for clinic owners</h2>

      <p>If you&apos;re adopting this playbook:</p>

      <ul>
        <li>
          Print or laminate Section 1 (the daily rhythm) and pin it at
          the front desk.
        </li>
        <li>
          Document Section 2&apos;s 8 motions as 1-page procedures
          specific to your clinic and PMS. Number them so staff can
          reference (&ldquo;Motion 4: Cancelling&rdquo;).
        </li>
        <li>
          Set the recall and no-show metrics from Section 3 + 4 as your
          weekly KPIs. Review every Friday.
        </li>
        <li>
          Run a 30-minute team session on the playbook at adoption +
          again at 30 days to refine.
        </li>
        <li>
          Re-review every 6 months. Update WhatsApp templates,
          insurance lists, and policies as your clinic evolves.
        </li>
      </ul>

      <p>
        For the workflow software side of this — drag-to-reschedule,
        recall surfacing, WhatsApp automation, audit-logged
        reconciliation — Oralstack is built around the motions above.
        Read more at{" "}
        <a
          href="/workflows#front-desk"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          /workflows#front-desk
        </a>
        .
      </p>
    </>
  );
}
