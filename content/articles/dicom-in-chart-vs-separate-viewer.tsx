import type { Article } from "./types";

export const dicomInChartVsSeparateViewer: Article = {
  slug: "dicom-in-chart-vs-separate-viewer",
  title: "DICOM in the patient chart vs a separate viewer: why imaging architecture matters",
  description:
    "Why dental clinics that keep imaging on a separate desktop app lose 3–5 minutes per visit hunting for radiographs — and what to look for in a unified, in-chart imaging workflow.",
  excerpt:
    "Most dental clinics still keep imaging on a separate desktop app. That feels normal. It also costs 3–5 minutes per visit and a meaningful percentage of treatment planning errors.",
  publishedAt: "2026-04-27",
  author: "Oralstack team",
  cluster: "clinical",
  tags: ["DICOM", "imaging", "clinical", "sensor bridge", "patient chart"],
  readingMinutes: 7,
  cta: {
    eyebrow: "Imaging in production",
    title: "DICOM viewer inside the patient chart",
    body: "Open the chart, see the radiograph. Multi-frame DICOM, annotation tools, measurements — in the same surface as the case notes and the bill.",
    buttonLabel: "See the imaging workflow",
    buttonHref: "/workflows#imaging",
  },
  Body: ArticleBody,
};

function ArticleBody() {
  return (
    <>
      <p>
        Most dental clinics still keep imaging on a separate desktop app — Romexis, Dolphin, the
        sensor manufacturer&apos;s native software, or a folder on the front desk PC named with the
        patient&apos;s last visit date. That feels normal because it&apos;s the way dental imaging
        has worked for two decades. It also costs 3–5 minutes per visit hunting for the right
        radiograph, and a meaningful percentage of treatment planning errors that come from not
        having the chart and the image visible at the same time.
      </p>

      <p>
        This article is for the clinic owner or clinical lead deciding how seriously to take
        in-chart imaging when evaluating PMS options. The short version: this is the single most
        consequential clinical workflow decision in a PMS migration.
      </p>

      <h2>The two architectures</h2>

      <p>Stripped to essentials, dental imaging is built on one of two models.</p>

      <h3>Parallel-folder (legacy)</h3>

      <p>
        The patient&apos;s images live in a separate system from the patient&apos;s chart. Often a
        folder on a local PC, sometimes a dedicated PACS server, sometimes the sensor vendor&apos;s
        native software. Capture happens in that system; viewing happens in that system; the chart
        in the PMS knows the image exists only as a reference (or sometimes not at all).
      </p>

      <p>
        This is how Plato + Romexis works in most Singapore clinics today. It&apos;s how Dentrix +
        Dexis works. It&apos;s the default because the PMS and the imaging vendor were built by
        different companies that never integrated deeply.
      </p>

      <h3>In-record (modern)</h3>

      <p>
        Images live against the visit in the patient record. The chart UI renders them inline
        alongside conditions, notes, and treatment plan. Sensor capture writes directly to the
        active visit. There&apos;s one audit log that covers chart events and image events together.
      </p>

      <p>
        This is what &ldquo;DICOM in the chart&rdquo; actually means — not that DICOM is supported
        (most systems support DICOM at the protocol level), but that the architecture treats imaging
        as a first-class part of the patient record, not a parallel attachment.
      </p>

      <h2>What &ldquo;in the chart&rdquo; means in practice</h2>

      <p>
        Four characteristics distinguish a real in-record imaging workflow from one that just has
        DICOM support:
      </p>

      <ul>
        <li>
          The DICOM file attaches to the <strong>visit</strong>, not a date-stamped folder. When you
          open the visit a year later, the radiographs are right there.
        </li>
        <li>
          The chart UI <strong>renders the image inline</strong> next to the tooth-level conditions
          and treatment plan. You don&apos;t alt-tab to a separate window.
        </li>
        <li>
          <strong>Sensor capture writes to the active visit</strong> in real time. Not &ldquo;import
          later&rdquo; or &ldquo;dragged into the chart afterwards.&rdquo;
        </li>
        <li>
          <strong>One audit log</strong> covers both chart and image events — view, annotate,
          replace, delete. Important for PDPA and for any audit trail.
        </li>
      </ul>

      <h2>Why this matters operationally</h2>

      <p>
        The case for in-record imaging is usually argued in clinical-quality terms (better treatment
        planning, fewer missed lesions). Those are real, but the operational case is concrete and
        easier to measure.
      </p>

      <h3>Time saved per visit</h3>

      <p>
        A typical workflow pause when imaging lives in a parallel system: open patient record in
        PMS, alt-tab to imaging app, search by patient ID, find the most recent radiograph, alt-tab
        back, mentally cross-reference. 3–5 minutes per visit, conservatively. For a 3-chair clinic
        doing 24 visits a day, that&apos;s 1–2 hours a day just on image hunting.
      </p>

      <h3>Treatment planning quality</h3>

      <p>
        When the chart and the image are visible on the same screen, clinicians catch things they
        otherwise miss — caries adjacent to a condition already being treated, an unrelated finding
        that gets a watch annotation. When you have to alt-tab, the cross-reference sometimes
        doesn&apos;t happen. Hard to quantify, but every clinical lead has stories.
      </p>

      <h3>Audit + chain-of-custody</h3>

      <p>
        For PDPA-relevant clinics, image events are patient-data events. A unified audit log makes
        &ldquo;who viewed this radiograph?&rdquo; a one-query answer. A parallel imaging system
        requires combining logs across two systems, which often means in practice you can&apos;t
        answer the question at all.
      </p>

      <h3>Sensor capture latency</h3>

      <p>
        With sensor-bridge integration to the PMS, capture-to-display is well under 5 seconds. With
        a parallel imaging app that has to be manually pointed at the right patient, the same flow
        is 30–60 seconds and includes a manual confirmation step where the image could end up under
        the wrong patient. Misfiled radiographs are a real failure mode.
      </p>

      <h2>Three things to look for</h2>

      <p>
        If you&apos;re evaluating a PMS for in-record imaging, three checks separate the real
        implementations from the marketing:
      </p>

      <ul>
        <li>
          <strong>Sensor-bridge support</strong> for the brands you actually use — Carestream,
          Dexis, Sopro, Schick, Planmeca. Generic &ldquo;DICOM-compatible&rdquo; isn&apos;t the same
          as a working sensor bridge. Ask for a demo of capture flow with your specific sensor
          model.
        </li>
        <li>
          <strong>DICOM C-STORE / C-FIND</strong> for legacy interop. You&apos;ll still want to
          receive images from external referrers (orthodontists, oral surgeons, PACS) and send
          images to viewers like OHIF for second opinions. C-STORE/C-FIND is the standard protocol
          for this; if a system can&apos;t speak it, it can&apos;t interop.
        </li>
        <li>
          <strong>In-chart annotation tools that write back to the visit</strong> — pan, zoom,
          rotate, ruler, pen. Annotations that vanish when you close the image, or that don&apos;t
          write to the visit record, are a tell that the imaging is bolted on rather than
          integrated.
        </li>
      </ul>

      <h2>What to do next</h2>

      <p>
        Audit your current imaging hunt time. The honest answer for most clinics is &ldquo;I
        don&apos;t know — let me time it for a day.&rdquo; That&apos;s the right experiment. If
        it&apos;s under 30 seconds per visit, your current setup is probably fine. If it&apos;s 3+
        minutes, the case for in-record imaging is already paying back.
      </p>

      <p>
        See the{" "}
        <a
          href="/workflows#imaging"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          Oralstack imaging workflow
        </a>{" "}
        for the in-record implementation, or the{" "}
        <a
          href="/integrations"
          className="text-[var(--color-tide-deep)] underline underline-offset-4"
        >
          integrations page
        </a>{" "}
        for current sensor-bridge coverage.
      </p>
    </>
  );
}
