import Hero from "@/components/sections/Hero";
import CustomerEvidence from "@/components/sections/CustomerEvidence";
import WorkflowWizard from "@/components/tools/WorkflowWizard";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CustomerEvidence />
      <WorkflowWizard />
      <CTA />
    </main>
  );
}
