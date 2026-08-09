import type { Metadata } from "next";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How oralstack handles personal data on this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Privacy" lastUpdated="9 August 2026" />
      <Section className="pb-24 md:pb-32">
        <article className="max-w-[720px] grid gap-8 text-[var(--color-text-muted)] leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)] [&_a]:text-[var(--color-accent-deep)] [&_a]:underline-offset-4 hover:[&_a]:underline">
          <p>
            This is the privacy notice for the oralstack marketing website at oralstack.com. It does
            not describe processing inside the Oralstack clinic product. A clinic deployment has its
            own contract, configuration, and data-processing terms.
          </p>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas-tinted)] p-5 grid gap-2">
            <p className="font-semibold text-[var(--color-text)]">
              Keep patient data out of this site.
            </p>
            <p>
              Public forms, email, WhatsApp, and demo-booking fields are for clinic and business
              contact details only. Do not submit patient names, identifiers, health information,
              clinical records, passwords, access tokens, or security-vulnerability details.
            </p>
          </div>

          <div className="grid gap-3 scroll-mt-28" id="contact-requests">
            <h2>Contact and demo requests</h2>
            <p>
              When you use a form on this site, we receive the fields you choose to submit.
              Depending on the form, that can include your name, work email, clinic or group name,
              location, current clinic system, clinic size, preferred workflow, timing, and
              free-text notes. We use this information to answer the request, assess fit, prepare a
              walkthrough, or scope a connection or pilot.
            </p>
            <p>
              The form posts to a Cloudflare Pages Function, which sends the request through Resend
              to the Oralstack business inbox. Resend states that its primary processing and account
              data storage, including email metadata, logs, and API records, are in the United
              States. The inbox provider and storage location depend on the business-email
              configuration in use at the time.
            </p>
            <p>
              You can also contact us directly at{" "}
              <a href="mailto:hello@oralstack.com">hello@oralstack.com</a>. Opening the WhatsApp
              option leaves this site and sends information to WhatsApp under its own terms and
              privacy notice.
            </p>
          </div>

          <div className="grid gap-3 scroll-mt-28" id="scheduling">
            <h2>Optional Cal.com scheduler</h2>
            <p>
              When a Cal.com scheduler is configured, the page does not load it until you choose to
              open it. Loading the scheduler creates a direct connection to Cal.com. The selected
              workflow and the page that led you there are included as booking context, and any
              details you enter are processed under{" "}
              <a href="https://cal.com/privacy" rel="noopener noreferrer">
                Cal.com&apos;s privacy notice
              </a>
              . A first-party Oralstack request form remains available without loading Cal.com.
            </p>
          </div>

          <div className="grid gap-3" id="site-telemetry">
            <h2>Site requests and interaction telemetry</h2>
            <p>
              Cloudflare delivers this site through its global network and receives ordinary network
              request data needed to serve and protect it. The interactive product examples can send
              a small, first-party event to our Cloudflare endpoint: an allowlisted event name,
              limited non-sensitive properties, a timestamp, and the page path. We do not include
              form contents, raw referrers, full user-agent strings, or country in those event logs.
              This event endpoint does not run when your browser signals Global Privacy Control or
              Do Not Track.
            </p>
            <p>
              If Cloudflare Web Analytics is enabled, its performance beacon is also suppressed for
              those browser privacy signals. Cloudflare describes that service as cookie-free,
              without local storage or cross-site tracking. We do not send form contents to the
              analytics beacon.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Service providers and international processing</h2>
            <p>
              Cloudflare, Resend, and the configured business-email provider process information to
              operate the site and answer requests. Cal.com and WhatsApp process information only
              when you choose those external paths. These providers may process information outside
              Singapore, including in the United States. We do not sell marketing-site personal
              information.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Retention</h2>
            <p>
              Request correspondence and infrastructure logs follow the operating settings of the
              relevant inbox and service. Oralstack has not published a fixed deletion schedule for
              marketing-site records. You can ask us to delete a request; limited records may still
              be kept where needed for security, fraud prevention, dispute handling, or legal
              obligations.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Your choices and questions</h2>
            <p>
              You can ask about, correct, or request deletion of personal information associated
              with a marketing-site request by emailing{" "}
              <a href="mailto:privacy@oralstack.com">privacy@oralstack.com</a>. We assess requests
              under the law that applies to the request; this notice does not promise a fixed
              response time.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Updates</h2>
            <p>
              When this notice changes, we update the date at the top. The current page is the
              authoritative marketing-site notice.
            </p>
          </div>
        </article>
      </Section>
    </main>
  );
}
