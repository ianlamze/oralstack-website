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
      <PageHeader eyebrow="Legal" title="Privacy" lastUpdated="27 April 2026" />
      <Section className="pb-24 md:pb-32">
        <article className="max-w-[680px] grid gap-8 text-[var(--color-text-muted)] leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)] [&_a]:text-[var(--color-accent-deep)] [&_a]:underline-offset-4 hover:[&_a]:underline">
          <p>
            This is the privacy notice for the oralstack marketing website at oralstack.com. It does
            not cover the oralstack product itself — clinics using the product are governed by a
            separate Data Processing Agreement.
          </p>

          <div className="grid gap-3">
            <h2>What this site collects</h2>
            <p>
              The marketing site does not require accounts, does not run analytics yet, and does not
              use cookies for tracking. Your browser sends standard request data (IP, user agent,
              referrer) that our hosting provider logs for security and abuse prevention; we do not
              link this to any identity.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>If you contact us</h2>
            <p>
              When you email <a href="mailto:hello@oralstack.com">hello@oralstack.com</a>, the
              message and your email address are stored in our inbox and used only to reply. We do
              not sell, share, or use your message for marketing without your consent.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Where data is held</h2>
            <p>
              The marketing site is hosted on Cloudflare Pages with a global edge cache. Inbox
              messages are held in Singapore. We do not transfer personal data outside APAC for this
              site without explicit consent.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Your rights (Singapore PDPA, EU GDPR)</h2>
            <p>
              You can ask for access to, correction of, or deletion of any personal data we hold
              about you by emailing <a href="mailto:privacy@oralstack.com">privacy@oralstack.com</a>
              . We respond within 30 days.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Updates</h2>
            <p>
              If this notice changes, we update the "Last updated" date at the top. Material changes
              are also flagged on the homepage for at least 30 days.
            </p>
          </div>
        </article>
      </Section>
    </main>
  );
}
