import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the oralstack marketing website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main>
      <PageHeader eyebrow="Legal" title="Terms" lastUpdated="27 April 2026" />
      <Section className="pb-24 md:pb-32">
        <article className="max-w-[680px] grid gap-8 text-[var(--color-text-muted)] leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)] [&_a]:text-[var(--color-accent-deep)] [&_a]:underline-offset-4 hover:[&_a]:underline">
          <p>
            These terms govern your use of the oralstack marketing website at oralstack.com. They do
            not cover the oralstack product — clinics using the product agree to a separate Master
            Service Agreement.
          </p>

          <div className="grid gap-3">
            <h2>Use of this site</h2>
            <p>
              You may read, link to, and reference this website. You may not scrape it for
              republishing, copy substantial portions of its copy, or impersonate oralstack in any
              external communication.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Marketing claims</h2>
            <p>
              Numbers, customer references, and feature descriptions on this site reflect the
              product as of the "Last updated" date. They are not warranties. Specifics for your
              clinic are confirmed in a demo or pilot agreement.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>No medical or financial advice</h2>
            <p>
              oralstack is software for clinic operations. Nothing on this site is medical, dental,
              billing, tax, or compliance advice.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Liability</h2>
            <p>
              This website is provided "as is" without warranties. Where local law allows, our
              liability for use of this site is limited to the maximum extent permitted.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of Singapore. Disputes are resolved in the courts
              of Singapore.
            </p>
          </div>

          <div className="grid gap-3">
            <h2>Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:legal@oralstack.com">legal@oralstack.com</a>.
            </p>
          </div>
        </article>
      </Section>
    </main>
  );
}
