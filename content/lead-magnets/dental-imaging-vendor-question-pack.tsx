import type { LeadMagnet } from "./types";

export const dentalImagingVendorQuestionPack: LeadMagnet = {
  slug: "dental-imaging-vendor-question-pack",
  cluster: "clinical",
  title: "Dental imaging integration vendor question pack",
  description:
    "30 specific questions to ask a dental PMS vendor before you commit, organised by integration concern: sensor SDK, DICOM, chair-side workflow, patient-chart integration, data export.",
  pitch:
    "30 specific questions to ask any PMS vendor about imaging integration. Sensor SDK, DICOM, chair-side workflow, data export.",
  deliverable: "8-page imaging vendor question pack",
  readingMinutes: 9,
  publishedAt: "2026-04-27",
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Dental imaging integration is where most PMS evaluations go
        wrong — vendors say &ldquo;yes we integrate&rdquo; and the
        clinic finds out post-purchase that &ldquo;integrate&rdquo; means
        &ldquo;launches the sensor manufacturer&apos;s desktop app via
        keyboard shortcut&rdquo;. This question pack is designed to surface
        what &ldquo;integration&rdquo; actually means in concrete
        operational terms before contracts are signed.
      </p>

      <p>
        Use it during vendor demos and follow-up technical calls. Score
        each answer: green (clearly resolved), amber (partial), red
        (deflection or vague). 5 reds means walk away.
      </p>

      <h2>Section 1 — Sensor SDK and capture (5 questions)</h2>

      <ol>
        <li>
          <strong>Which specific sensor models do you support
          natively?</strong> Don&apos;t accept &ldquo;all major
          brands&rdquo;. Get a list with model numbers (Carestream
          CS7600, Dexis Titanium, SoproDirect, Schick 33, etc.). If they
          can&apos;t produce one, integration is shallower than claimed.
        </li>
        <li>
          <strong>For each supported sensor, what&apos;s the integration
          mechanism?</strong> Native SDK / TWAIN driver / vendor desktop
          launcher / DICOM C-STORE? SDK is best (deepest integration);
          desktop launcher is essentially no integration.
        </li>
        <li>
          <strong>Where does the radiograph land at chairside
          capture?</strong> Direct into the patient chart in your PMS,
          or into a separate folder / system that requires manual
          attachment? Direct is the goal; manual attachment costs 1–2
          minutes per visit.
        </li>
        <li>
          <strong>If the sensor manufacturer releases a firmware update,
          what breaks?</strong> Vendors with proper SDK integration
          handle this transparently; vendors using the manufacturer&apos;s
          desktop app inherit every breakage.
        </li>
        <li>
          <strong>Can a clinical assistant capture without leaving the
          patient chart?</strong> One-click / one-foot-pedal capture
          without alt-tab is the test. If they need to switch
          applications, integration is shallow.
        </li>
      </ol>

      <h2>Section 2 — DICOM (5 questions)</h2>

      <ol>
        <li>
          <strong>Do you support DICOM C-STORE for receiving
          radiographs?</strong> If yes, panoramic / CBCT machines that
          export DICOM can land radiographs directly into the patient
          record without intermediate desktop software.
        </li>
        <li>
          <strong>Do you support DICOM C-FIND for querying external
          imaging systems?</strong> Useful when a referred patient&apos;s
          radiographs live in an external CBCT centre.
        </li>
        <li>
          <strong>What DICOM viewer is built into the chart?</strong>
          Native viewer with multi-frame, pan/zoom, annotations,
          measurements? Or does it pop up an external viewer?
        </li>
        <li>
          <strong>Can the DICOM viewer handle CBCT
          (volumetric)?</strong> Many PMS DICOM viewers handle 2D
          radiographs but punt CBCT to a separate desktop app. Verify
          if you do CBCT.
        </li>
        <li>
          <strong>Are radiographs stored in their original DICOM format,
          or compressed/converted?</strong> Compression that loses
          metadata or alters image quality is bad for clinical accuracy
          and bad for medico-legal defence.
        </li>
      </ol>

      <h2>Section 3 — Chair-side workflow (5 questions)</h2>

      <ol>
        <li>
          <strong>What does a routine bitewing capture look like, end
          to end?</strong> Have them demo it. Time it. Count clicks. If
          it takes more than 5 seconds from sensor-ready to image-on-chart,
          the workflow is wrong.
        </li>
        <li>
          <strong>Can the dentist annotate / measure / mark up the
          radiograph at chairside?</strong> Many PMS view-only the
          radiograph and force the dentist to a separate tool for
          markups.
        </li>
        <li>
          <strong>Does the radiograph capture trigger a treatment-plan
          entry?</strong> Capturing a periapical of tooth 36 should
          auto-suggest the relevant clinical note and procedure code,
          not require separate entry.
        </li>
        <li>
          <strong>How are radiographs grouped per visit vs per
          tooth?</strong> Both views matter — &ldquo;all radiographs
          today&rdquo; and &ldquo;all radiographs of tooth 36 ever&rdquo;.
        </li>
        <li>
          <strong>Foot pedal / hands-free capture
          support?</strong> Hygiene matters; cross-contamination from
          touching mouse/keyboard mid-procedure is real. Vendors that
          ignore this haven&apos;t designed for clinic reality.
        </li>
      </ol>

      <h2>Section 4 — Patient-chart integration (5 questions)</h2>

      <ol>
        <li>
          <strong>How do radiographs link to specific teeth, surfaces,
          or treatment plans?</strong> Tooth-led linking
          (&ldquo;radiograph of tooth 36&rdquo;) beats date-based
          (&ldquo;radiographs from 12 March&rdquo;) for clinical
          recall.
        </li>
        <li>
          <strong>Can a radiograph be marked &ldquo;baseline&rdquo; vs
          &ldquo;follow-up&rdquo; for a specific
          condition?</strong> Periodontal monitoring, endodontic
          follow-up, implant osseointegration tracking — all need
          baseline / follow-up tagging.
        </li>
        <li>
          <strong>Side-by-side comparison view of
          radiographs?</strong> Comparing pre-treatment and post-treatment
          radiographs side by side is a routine clinical motion.
        </li>
        <li>
          <strong>Patient-facing radiograph share — does it work
          securely?</strong> Sometimes patients want copies (e.g. moving
          clinic, second opinion). Secure, time-limited, audit-logged
          link generation matters.
        </li>
        <li>
          <strong>How are radiographs handled in the patient&apos;s
          treatment plan / case presentation flow?</strong> Treatment-
          planning conversations with patients benefit from radiographs
          loaded into the plan view, not pulled up separately.
        </li>
      </ol>

      <h2>Section 5 — Long-term data + export (5 questions)</h2>

      <ol>
        <li>
          <strong>Can I export every radiograph in DICOM format with
          original metadata intact?</strong> Critical for migration,
          medico-legal, patient transfers.
        </li>
        <li>
          <strong>Where are radiographs physically stored?</strong>
          Singapore region (PDPA + clinic preference), or another
          jurisdiction?
        </li>
        <li>
          <strong>Backup retention — how long, how
          recoverable?</strong> Dental records have long retention windows
          (15+ years for some procedures). Backups must reach back that
          far.
        </li>
        <li>
          <strong>If we leave your service, what happens to our
          radiograph archive?</strong> Get this in writing in the contract.
          Bulk export, time window, format, included in subscription or
          one-time fee.
        </li>
        <li>
          <strong>Can we self-host or hybrid-host the imaging
          archive?</strong> For multi-location groups, hybrid is
          sometimes useful. Most cloud-only vendors don&apos;t support
          this.
        </li>
      </ol>

      <h2>Section 6 — Per-brand notes</h2>

      <h3>Carestream</h3>

      <p>
        Common in older Singapore clinics. Native SDK exists; most modern
        PMS support it but with varying depth. Ask specifically about
        CS7600 vs CS8100 — different generations, different integration
        paths.
      </p>

      <h3>Dexis</h3>

      <p>
        SDK available but less open than Carestream historically. Some
        PMS integrations rely on the Dexis desktop app rather than
        native SDK.
      </p>

      <h3>Sopro</h3>

      <p>
        Intra-oral cameras (not radiographic sensors). Integration via
        TWAIN typically. Verify intra-oral camera capture lands in the
        chart, not just a folder.
      </p>

      <h3>Schick</h3>

      <p>
        Schick 33 / Schick AE. Integration via SDK in most modern PMS,
        but some still use the Schick desktop app. Verify.
      </p>

      <h3>NewTom (CBCT)</h3>

      <p>
        Volumetric imaging. Almost always exports DICOM. PMS integration
        is via DICOM C-STORE typically — verify CBCT-specific viewer
        support, not just 2D.
      </p>

      <h3>Planmeca (CBCT + 2D)</h3>

      <p>
        Romexis is their own software. Many clinics keep Romexis for the
        CBCT viewing while integrating PMS for the chart. Verify
        whether your PMS can DICOM-receive from Planmeca and whether the
        viewer is sufficient for your CBCT use cases.
      </p>

      <h2>Pre-evaluation prep checklist</h2>

      <ul>
        <li>List every imaging device in your clinic (model + year)</li>
        <li>Note which devices are network-connected vs USB-only</li>
        <li>Estimate radiograph capture volume per chair per day</li>
        <li>Identify CBCT vs 2D needs separately</li>
        <li>Count years of historical radiograph archive (for migration scope)</li>
      </ul>

      <h2>During-evaluation observation list</h2>

      <ul>
        <li>Time the bitewing-capture-to-chart-display cycle</li>
        <li>Count clicks for routine capture (target: ≤2)</li>
        <li>Verify the demo uses a real sensor, not a pre-recorded image</li>
        <li>Ask the demo presenter to capture from a different sensor brand than originally shown — see if integration generalises</li>
        <li>Verify DICOM export end-to-end (capture → archive → re-import)</li>
      </ul>

      <h2>Scoring</h2>

      <p>
        For each of the 30 questions: green / amber / red.
      </p>

      <ul>
        <li>0–2 reds: vendor is genuinely deep on imaging integration</li>
        <li>3–4 reds: workable, but expect friction in those areas</li>
        <li>5+ reds: imaging integration is shallow; budget for ongoing pain</li>
      </ul>

      <p>
        For the software side — DICOM in the chart, native sensor-bridge
        integration, tooth-led linking — Oralstack scores green on most
        of these by design. See{" "}
        <a
          href="/workflows#imaging"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          /workflows#imaging
        </a>{" "}
        and{" "}
        <a
          href="/articles/dental-sensor-bridge-integration"
          className="text-[var(--color-tide-deep)] underline-offset-4 hover:underline"
        >
          our sensor-bridge article
        </a>
        .
      </p>
    </>
  );
}
