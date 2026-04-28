import type { Metadata } from "next";
import ReviewsReferrals from "@/components/tools/ReviewsReferrals";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Reviews & referrals",
  description:
    "Live demo: visit ends → review request fires on WhatsApp → review lands on Google → referral source credited. The acquisition loop the rest of the suite was missing — built on the same audit-logged messaging stack.",
  alternates: { canonical: "/tools/reviews-referrals" },
};

export default function ReviewsReferralsPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Growth" title="Reviews & referrals." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Most clinics ask for reviews when they remember to. Most don&apos;t track which referrer
          sent each new patient. Oralstack closes the loop: 24 hours after a visit, a templated
          WhatsApp asks for a review and links to Google. The patient&apos;s referral source is
          captured at intake — when a friend refers a friend, both sides are credited.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <ReviewsReferrals />
      </Section>
    </main>
  );
}
