import type { Article } from "./types";

export const dentalSensorBridgeIntegration: Article = {
  slug: "dental-sensor-bridge-integration",
  title: "Dental sensor-bridge integration: Carestream, Dexis, Sopro, and Schick",
  description:
    "Why running dental imaging through the sensor manufacturer's desktop software costs 3-5 minutes per visit, how sensor-bridge integration works, and what to ask vendors about specific sensor model support.",
  excerpt:
    "Most dental sensors come with their own desktop software. Sensor-bridge integration is what removes that software from the chair-side workflow, capturing directly into the patient's visit.",
  publishedAt: "2026-04-27",
  updatedAt: "2026-08-09",
  author: "Oralstack team",
  cluster: "clinical",
  tags: ["sensor", "imaging", "Carestream", "Dexis", "Sopro", "Schick"],
  readingMinutes: 8,
  cta: {
    eyebrow: "Current product boundary",
    title: "Evaluate the bridge; verify availability",
    body: "Oralstack supports clinical media uploads and annotations today. Named sensor bridges and DICOM ingest remain gated and are not enabled for clinics.",
    buttonLabel: "Check feature status",
    buttonHref: "/status",
  },
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Most dental sensors come with their own desktop software — Carestream Dental Imaging, Dexis
        Imaging Suite, SoproImaging, Schick CDR. The software was designed when the PMS was a
        separate concern from the imaging workflow. In 2026, on a modern cloud-aware PMS, that
        desktop layer is in the way. Sensor-bridge integration is the technical pattern that removes
        it.
      </p>

      <p>
        This article is for the clinical lead or IT person evaluating how to connect existing dental
        sensors to a new PMS. It pairs with{" "}
        <a
          href="/articles/dicom-in-chart-vs-separate-viewer"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          DICOM in the chart vs a separate viewer
        </a>{" "}
        — read that first if you haven&apos;t.
      </p>

      <p>
        <strong>Current Oralstack boundary:</strong> this article explains how clinics should
        evaluate device integrations. It does not represent current Oralstack compatibility with
        Carestream, Dexis, Sopro, Schick, or another sensor. Clinical media uploads and annotations
        are available; DICOM and device ingest remain gated and are not enabled for clinics.
      </p>

      <h2>Why the manufacturer&apos;s desktop software is in the way</h2>

      <p>The traditional flow with manufacturer software in the loop:</p>

      <ol>
        <li>Patient is in the chair, ready for an x-ray</li>
        <li>Clinician opens the imaging app on the chairside PC</li>
        <li>
          Search by patient ID or name to load their record (in the imaging app, separate from the
          PMS)
        </li>
        <li>Click capture, take the radiograph</li>
        <li>Image saves to the imaging app&apos;s database/folder</li>
        <li>Clinician alt-tabs back to the PMS chart</li>
        <li>
          Manually associates the image with the visit (or skips this — it&apos;s the bottleneck)
        </li>
      </ol>

      <p>This pattern produces four costs:</p>

      <ul>
        <li>
          <strong>Two windows during chair time.</strong> Mental tax of juggling two systems while a
          patient is in front of you.
        </li>
        <li>
          <strong>Misfiled images.</strong> If the imaging app&apos;s patient context lags or is
          wrong, the image lands in the wrong record. Known failure mode.
        </li>
        <li>
          <strong>License costs per workstation.</strong> Most manufacturer software licenses per
          machine; multi-chair clinics pay per chair.
        </li>
        <li>
          <strong>Image lives in the imaging app, not the chart.</strong> The chart has a reference
          at best. Looking up a year-old radiograph means re-opening the imaging app.
        </li>
      </ul>

      <h2>What sensor-bridge integration means</h2>

      <p>
        Sensor-bridge means the PMS speaks the sensor&apos;s wire protocol directly — it
        doesn&apos;t need the manufacturer&apos;s desktop app in the loop. The flow:
      </p>

      <ol>
        <li>Clinician is in the patient&apos;s chart, in the visit context</li>
        <li>Click capture in the chart UI</li>
        <li>The PMS triggers the sensor (USB or sensor-bridge driver)</li>
        <li>Image arrives directly in the visit, attached to the patient&apos;s record</li>
        <li>Capture metadata (kV, mAs, exposure) attached automatically</li>
      </ol>

      <p>
        Treat under five seconds from capture to display as an evaluation target, and require the
        vendor to demonstrate it with the clinic&apos;s exact hardware and workstation setup.
      </p>

      <h2>The four major sensor families</h2>

      <p>For Singapore practice, four sensor brands cover the vast majority of installations:</p>

      <h3>Carestream Dental</h3>

      <p>
        CS 8100 panoramic, RVG 6200/6500 intraoral, CS 9600 CBCT. Carestream supports two
        integration paths: TWAIN driver (universal but limited to single-image capture) and a
        dedicated Carestream SDK that exposes more capabilities (multiplexed capture, sensor
        metadata).
      </p>

      <p>
        For a modern PMS, the SDK path is the right one — TWAIN works but loses the metadata
        richness. Ask vendors specifically: do you use the Carestream SDK or just TWAIN?
      </p>

      <h3>Dexis</h3>

      <p>
        Platinum, Titanium, the newer DEXIS IS 3800 wireless. Dexis is owned by Envista (Kavo Kerr
        family). Integration is via the DEXIS SDK. Like Carestream, ask whether the PMS uses the SDK
        properly or falls back to TWAIN.
      </p>

      <h3>Sopro</h3>

      <p>
        SoproCare, SoproLife (intraoral cameras with caries detection light), Sopix (intraoral
        sensors). Sopro is a Acteon brand. Integration is primarily TWAIN — Sopro&apos;s ecosystem
        is less developed than Carestream/Dexis SDKs. For Singapore clinics with Sopro intraoral
        cameras, the integration is usually feature-complete but not metadata-rich.
      </p>

      <h3>Schick</h3>

      <p>
        Schick 33, Schick AE, Schick Elite. Schick (now Patterson Dental) has a vendor SDK available
        to integration partners. SDK availability alone does not establish compatibility; require
        the PMS vendor to validate the exact sensor model, driver, and workstation setup.
      </p>

      <h2>The fallback: DICOM C-STORE / C-FIND</h2>

      <p>
        For sensors not directly supported by sensor-bridge, the DICOM standard fills the gap.
        C-STORE pushes images from sensor software into the PMS; C-FIND retrieves images for
        viewing. In an evaluated system, compare its capture latency with a direct bridge and verify
        the modality, viewer, metadata, and network path end to end; protocol support alone does not
        guarantee interoperability.
      </p>

      <p>
        DICOM C-STORE/C-FIND is also the right path for legacy interop — receiving images from
        external referrers (orthodontists, oral surgeons), pushing images to OHIF Viewer for second
        opinions, archiving to a PACS server.
      </p>

      <h2>What to ask vendors</h2>

      <p>Five questions specific to sensor-bridge claims:</p>

      <ul>
        <li>
          <strong>Specific sensor model support.</strong> Not just &ldquo;Carestream
          supported&rdquo; — which model? CS 8100? RVG 6200? CS 9600 CBCT? List the exact ones
          supported.
        </li>
        <li>
          <strong>SDK or TWAIN?</strong> SDK gives metadata richness; TWAIN is universal but
          feature-thin.
        </li>
        <li>
          <strong>Capture latency target.</strong> Should be under 5 seconds chairside (ideally
          under 2). Ask for a live demo on their sensor.
        </li>
        <li>
          <strong>Failure mode.</strong> What happens if the PMS is offline or the sensor
          disconnects mid-capture? Is there a local cache that re-syncs, or does the image
          disappear?
        </li>
        <li>
          <strong>Image storage location.</strong> PMS server (ideally cloud) or local capture
          buffer? Cloud storage with chair-side latency &lt; 5 seconds is the modern default.
        </li>
      </ul>

      <h2>The annotation question</h2>

      <p>
        Capturing the image is half the workflow. The other half is annotating it — measurements,
        marks, notes that write back to the visit record. Sensor-bridge integration that captures
        cleanly but loses annotation context (or requires a separate viewer for annotation) is
        incomplete.
      </p>

      <p>
        A working in-record imaging stack lets the clinician annotate in the chart UI, with
        annotations stored alongside the image and tied to the visit. Pan, zoom, rotate, ruler, pen.
        Each annotation event is in the audit log (relevant for{" "}
        <a
          href="/articles/dental-audit-logs"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          audit log purposes
        </a>
        ).
      </p>

      <h2>What to do next</h2>

      <p>
        List your existing sensors by model number. For each, ask any PMS vendor under evaluation:
        do you bridge directly, or do you rely on the manufacturer&apos;s software? If they bridge,
        which protocol (SDK or TWAIN)?
      </p>

      <p>
        Oralstack&apos;s{" "}
        <a
          href="/workflows#patient-care"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          patient-care workflow
        </a>{" "}
        covers the clinical media available today. Check the{" "}
        <a href="/status" className="text-[var(--color-tide-deep)] underline underline-offset-4">
          product status page
        </a>{" "}
        before planning a DICOM or named-device integration; those capabilities are not enabled for
        clinics today.
      </p>
    </>
  );
}
