import type { Metadata } from "next";
import OnlineBooking from "@/components/tools/OnlineBooking";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Online booking",
  description:
    "Live demo: the patient-side booking widget that embeds on your clinic website. Real chair availability, returning-patient lookup by phone, WhatsApp confirmation — no double-bookings, no front-desk phone tag.",
  alternates: { canonical: "/tools/online-booking" },
};

export default function OnlineBookingPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Patient self-service" title="Online booking." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Most clinic websites send patients to a phone number or a contact form. Oralstack gives
          you a booking widget that embeds on your site and pulls real chair availability — no
          double-bookings, no front-desk callback queue. Returning patients are recognised by phone
          number; confirmations go out on WhatsApp Business.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <OnlineBooking />
      </Section>
    </main>
  );
}
