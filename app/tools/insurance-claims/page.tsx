import type { Metadata } from "next";
import InsuranceClaims from "@/components/tools/InsuranceClaims";
import PageHeader from "@/components/page/PageHeader";
import Section from "@/components/primitives/Section";

export const metadata: Metadata = {
  title: "Insurance claims & MediSave",
  description:
    "Live demo: completed procedures auto-package as MediSave, CHAS, or IPP claims. Submit in one click, see status flow back, fix rejected claims inline. Built for Singapore claims first; primary US payers next.",
  alternates: { canonical: "/tools/insurance-claims" },
};

export default function InsuranceClaimsPage() {
  return (
    <main>
      <PageHeader eyebrow="Tool · Billing" title="Insurance claims & MediSave." />

      <Section className="pb-10">
        <p className="max-w-[58ch] text-lg text-[var(--color-text-muted)] leading-relaxed">
          Eligibility tells you what the patient owes before treatment. Claims is the harder half:
          submitting after, chasing decisions, fixing rejections. Oralstack auto-packages the claim
          from the completed procedure — MediSave, CHAS, or IPP — and tracks status from drafted to
          paid in one queue.
        </p>
      </Section>

      <Section className="pb-24 md:pb-32">
        <InsuranceClaims />
      </Section>
    </main>
  );
}
