import type { LeadMagnet } from "./types";

export const pdpaComplianceChecklistSingaporeDental: LeadMagnet = {
  slug: "pdpa-compliance-checklist-singapore-dental",
  cluster: "compliance",
  title: "PDPA compliance checklist for Singapore dental clinics",
  description:
    "The 9 PDPA obligations mapped to dental operations. DPO scope, consent flows, access requests, breach notification (72-hour clock), retention windows (PDPA + MOH overlap), vendor due diligence, annual review.",
  pitch:
    "9 PDPA obligations mapped to dental ops. DPO, consent, access requests, breach, retention. Annual review checklist included.",
  deliverable: "11-page PDPA compliance checklist",
  readingMinutes: 13,
  publishedAt: "2026-04-27",
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        PDPA enforcement in dental has been picking up. The PDPC has
        published several decisions involving healthcare providers in
        the last 24 months — most involved misdirected patient records,
        weak vendor controls, or inadequate access-request handling.
        Dental clinics handle exactly the kind of data PDPA is most
        protective of (medical records of identifiable individuals),
        which means they get extra scrutiny.
      </p>

      <p>
        This checklist maps the 9 PDPA obligations to specific dental
        clinic operations. It&apos;s not legal advice — for that, talk
        to a Singapore-qualified data protection lawyer. It&apos;s an
        operational reference for the clinic owner / DPO / office
        manager.
      </p>

      <h2>Section 1 — The 9 PDPA obligations and how each shows up in dental</h2>

      <ol>
        <li>
          <strong>Consent.</strong> You can only collect, use, or
          disclose personal data with consent (or under a permitted
          exception). For dental: explicit consent at intake, separate
          consent for marketing / recall, separate consent for clinical
          photos used in case studies.
        </li>
        <li>
          <strong>Purpose Limitation.</strong> Data collected for one
          purpose can&apos;t be used for another without fresh consent.
          For dental: a patient who consented to recall messages
          hasn&apos;t consented to receiving clinic newsletter content.
        </li>
        <li>
          <strong>Notification.</strong> You must inform the patient of
          the purposes for which their data is collected. For dental:
          intake form notice + privacy notice on the website.
        </li>
        <li>
          <strong>Access and Correction.</strong> Patients can request a
          copy of their data and request correction of errors. 30-day
          response window.
        </li>
        <li>
          <strong>Accuracy.</strong> Reasonable effort to ensure data is
          accurate and complete. For dental: confirm contact details,
          insurance, allergies at every visit.
        </li>
        <li>
          <strong>Protection.</strong> Reasonable security to protect
          personal data. For dental: encryption at rest + in transit,
          access controls, audit logging, secure backups.
        </li>
        <li>
          <strong>Retention Limitation.</strong> Don&apos;t hold data
          longer than necessary. For dental: there&apos;s tension
          between PDPA&apos;s &ldquo;don&apos;t over-retain&rdquo; and
          MOH&apos;s minimum retention windows for dental records.
          Section 6 below covers the overlap.
        </li>
        <li>
          <strong>Transfer Limitation.</strong> Cross-border transfer
          requires comparable protection. For dental: cloud PMS hosted
          outside SG must demonstrate equivalent protection.
        </li>
        <li>
          <strong>Accountability.</strong> Designate a DPO; document
          policies; demonstrate compliance on request. The DPO must be
          named publicly (PDPC&apos;s requirement).
        </li>
      </ol>

      <h2>Section 2 — Data Protection Officer (DPO)</h2>

      <p>Every clinic must designate a DPO. The DPO must:</p>

      <ul>
        <li>
          Be named on the clinic&apos;s privacy notice (typically the
          website privacy page).
        </li>
        <li>
          Have a contact email/phone published — patients and PDPC must
          be able to reach them.
        </li>
        <li>
          Understand PDPA at a working level — formal training preferred
          but not legally required.
        </li>
        <li>
          Have authority within the clinic to investigate and enforce
          policies. A DPO with no power is non-compliant in spirit.
        </li>
      </ul>

      <p>
        For most solo and small-group clinics, the clinic owner or
        practice manager wears the DPO hat. Multi-location groups
        typically appoint a dedicated DPO as headcount grows.
      </p>

      <h2>Section 3 — Consent flows</h2>

      <h3>Patient intake consent</h3>

      <ul>
        <li>
          Plain-language consent statement at intake — what data is
          collected, what it&apos;s used for, who it&apos;s shared with
          (insurance, lab, referrals).
        </li>
        <li>
          Separate consent checkboxes for: clinical care (mandatory),
          recall communications (optional), marketing communications
          (optional), clinical-photo case-study use (optional).
        </li>
        <li>
          Withdraw mechanism — patient can revoke any of the optional
          consents at any time, via email/phone/in-clinic.
        </li>
      </ul>

      <h3>Recall and reminder consent</h3>

      <ul>
        <li>
          Capture channel preference — WhatsApp / SMS / email /
          phone. Some patients want only one.
        </li>
        <li>
          Frequency limit — recall is one motion; marketing is another.
          Patients who consent to recall haven&apos;t consented to
          monthly newsletters.
        </li>
        <li>
          Easy unsubscribe — clear opt-out in every recall message
          beyond &ldquo;reply STOP&rdquo;.
        </li>
      </ul>

      <h3>Marketing consent</h3>

      <ul>
        <li>Opt-in only, never opt-out (PDPA + Spam Control Act).</li>
        <li>
          Maintain a Do-Not-Call (DNC) registry check before any
          telemarketing. Even one call to a DNC-registered number is a
          PDPA breach.
        </li>
      </ul>

      <h3>Clinical photo / case study consent</h3>

      <ul>
        <li>
          Specific written consent. Generic &ldquo;we may share your
          data&rdquo; doesn&apos;t cover identifiable clinical photos.
        </li>
        <li>
          Specify scope — internal training only, marketing materials,
          published case studies. Each is a separate consent.
        </li>
        <li>Time-bound or revocable.</li>
      </ul>

      <h2>Section 4 — Access request handling</h2>

      <p>Under PDPA Section 21, patients can request:</p>

      <ul>
        <li>A copy of their personal data held by the clinic.</li>
        <li>A record of how their data has been used or disclosed.</li>
      </ul>

      <p>Response window: 30 days from request. If you can&apos;t meet that, notify in writing with a reasonable extended timeline.</p>

      <h3>Access request workflow</h3>

      <ul>
        <li>
          <strong>Receive and log.</strong> Date, requester identity,
          nature of request. Logged centrally (not in a personal inbox).
        </li>
        <li>
          <strong>Verify identity.</strong> NRIC + a second proof
          (address, DOB, prior appointment date). Don&apos;t release to
          an impersonator.
        </li>
        <li>
          <strong>Compile.</strong> Pull the patient record:
          demographics, treatment history, financial history, audit log
          of access if requested, any notes.
        </li>
        <li>
          <strong>Sanitise third-party data.</strong> If the record
          contains data about others (e.g. an emergency contact), redact
          before release.
        </li>
        <li>
          <strong>Deliver securely.</strong> Encrypted email (password
          shared via separate channel) or secure portal. Not plain
          email.
        </li>
        <li>
          <strong>Charge a reasonable fee if applicable.</strong> Small
          fee permitted for compilation work. Document the fee schedule
          publicly.
        </li>
      </ul>

      <h2>Section 5 — Breach notification (72-hour PDPC clock)</h2>

      <p>
        From 1 Feb 2021, PDPA mandates breach notification to PDPC
        within 72 hours if the breach:
      </p>

      <ul>
        <li>Causes (or is likely to cause) significant harm, OR</li>
        <li>Affects 500 or more individuals.</li>
      </ul>

      <p>And to affected individuals if significant harm is likely.</p>

      <h3>Breach response runbook</h3>

      <ul>
        <li>
          <strong>Detect and contain (hour 0–4).</strong> Stop the
          breach. Take affected systems offline if needed. Preserve
          forensic evidence (don&apos;t reset what you don&apos;t
          understand).
        </li>
        <li>
          <strong>Investigate (hour 4–24).</strong> What was accessed?
          By whom? How? Was data exfiltrated? Document everything for
          the PDPC report.
        </li>
        <li>
          <strong>Assess severity (hour 24–48).</strong> Number of
          individuals affected, sensitivity of data, likelihood of
          harm. Decide: notify PDPC, notify patients, both, neither.
        </li>
        <li>
          <strong>Notify (hour 48–72).</strong> PDPC online form;
          affected patients via email/letter with what happened, what
          data, what we&apos;re doing about it, what they should do.
        </li>
        <li>
          <strong>Remediate (week 1–4).</strong> Fix the root cause.
          Update controls. Document the post-mortem. Some breaches
          require ongoing monitoring (e.g. credential exposure).
        </li>
        <li>
          <strong>Audit and improve (month 2+).</strong> Review what
          allowed the breach. Update DPIA, training, controls.
        </li>
      </ul>

      <h2>Section 6 — Retention windows: PDPA vs MOH overlap</h2>

      <p>
        PDPA says: don&apos;t retain longer than necessary. MOH says:
        retain dental records for at least specified minimum periods.
        Both apply.
      </p>

      <ul>
        <li>
          <strong>Adult patient records:</strong> minimum 6 years from
          last visit (per MOH guidance + PDPA reasonable retention).
        </li>
        <li>
          <strong>Paediatric patient records:</strong> retain until age
          21 + 6 years (per MOH paediatric records guidance).
        </li>
        <li>
          <strong>Radiographs:</strong> per dental record retention,
          minimum 6 years; longer for orthodontic / implant cases.
        </li>
        <li>
          <strong>Financial records:</strong> minimum 5 years per IRAS
          (Income Tax Act).
        </li>
        <li>
          <strong>Audit logs:</strong> at least 3 years for security
          investigation purposes; longer if linked to clinical
          decisions.
        </li>
      </ul>

      <p>
        The practical PDPA-aligned policy: keep what MOH and IRAS
        require, archive (cold storage, restricted access) anything
        older that you can&apos;t fully delete, document the policy
        publicly so patients know what&apos;s held and why.
      </p>

      <h2>Section 7 — Vendor due diligence</h2>

      <p>
        Your cloud PMS, your email provider, your imaging archive, your
        recall SMS service — every one processes patient data on your
        behalf. PDPA holds you (the clinic) accountable for their
        practices.
      </p>

      <h3>Per-vendor checklist</h3>

      <ul>
        <li>
          <strong>Data Processing Agreement (DPA).</strong> Signed,
          covering: purpose, duration, security obligations, breach
          notification, sub-processor disclosure, deletion on contract
          end.
        </li>
        <li>
          <strong>Hosting jurisdiction.</strong> Where does the data
          physically live? Singapore preferred; cross-border requires
          comparable-protection demonstration.
        </li>
        <li>
          <strong>Encryption.</strong> At rest and in transit. Verify,
          don&apos;t take their word.
        </li>
        <li>
          <strong>Access controls.</strong> Vendor staff access to your
          data must be role-restricted, audit-logged, and minimum
          necessary.
        </li>
        <li>
          <strong>Sub-processor list.</strong> Vendor must disclose
          who they share your data with (their cloud host, their
          analytics tools, etc.). You must be notified of changes.
        </li>
        <li>
          <strong>Breach notification clock.</strong> Vendor must
          notify you within a window short enough that you can still
          meet PDPA&apos;s 72-hour clock to PDPC. 24 hours is typical.
        </li>
        <li>
          <strong>Data deletion / portability on exit.</strong> Bulk
          export available; full deletion on contract end with written
          confirmation.
        </li>
        <li>
          <strong>Independent security attestations.</strong> SOC 2 /
          ISO 27001 / equivalent. Not legally required but strong
          signal.
        </li>
      </ul>

      <h2>Section 8 — Annual PDPA review</h2>

      <p>Schedule an annual review (e.g. January each year). Walk through:</p>

      <ul>
        <li>
          DPO contact details current (website, intake forms, public
          notices).
        </li>
        <li>Privacy notice up to date with current data handling.</li>
        <li>
          Vendor list reviewed — any new vendors added without DPA?
          Any obsolete vendors still holding data?
        </li>
        <li>
          Consent records audited — sample 10 patient files and verify
          consents are documented.
        </li>
        <li>
          Access logs reviewed — any suspicious access patterns? Any
          stale accounts to deactivate?
        </li>
        <li>
          Retention windows enforced — old records archived per policy?
        </li>
        <li>Staff PDPA training refreshed (annual minimum).</li>
        <li>
          Breach response runbook tested — tabletop exercise with key
          staff.
        </li>
        <li>
          DPIA updated — any new processing activities introduced this
          year?
        </li>
      </ul>

      <h2>Section 9 — Common dental PDPA pitfalls</h2>

      <ul>
        <li>
          <strong>WhatsApp on personal staff phones.</strong> Patient
          messages on a personal phone are uncontrolled, unaudited,
          unbacked-up. Use WhatsApp Business API on a clinic-owned
          number with audit-logged messaging instead.
        </li>
        <li>
          <strong>Email autocomplete misdirection.</strong> Sending a
          patient&apos;s file to the wrong &ldquo;John&rdquo; in your
          contacts is the most common dental PDPA breach. Internal
          policy: confirm recipient address before attaching anything
          identifiable.
        </li>
        <li>
          <strong>Unencrypted USB sticks.</strong> Carrying patient data
          on a USB for &ldquo;backup&rdquo; or transfer is a textbook
          breach risk. Encrypted drives only, audit-logged.
        </li>
        <li>
          <strong>Lapsed staff accounts.</strong> Former employee
          credentials still active months after departure. Quarterly
          access review minimum.
        </li>
        <li>
          <strong>Marketing without renewed consent.</strong> Patient
          intake consent doesn&apos;t cover marketing. Separate consent,
          opt-in only.
        </li>
        <li>
          <strong>No Data Processing Agreement with cloud
          PMS.</strong> Operating without a written DPA is itself a
          PDPA gap. Get one signed before sending live data.
        </li>
      </ul>

      <p>
        For the technical foundations — append-only audit log, tenant
        isolation, role-based access, encryption, Singapore region
        hosting — Oralstack is built around PDPA + MOH alignment. See{" "}
        <a
          href="/security"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          /security
        </a>{" "}
        and{" "}
        <a
          href="/articles/singapore-pdpa-dental-clinics"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          our PDPA dental article
        </a>
        .
      </p>
    </>
  );
}
