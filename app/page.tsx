import Hero from "@/components/sections/Hero";
import StatBand from "@/components/sections/StatBand";
import WorkflowWizard from "@/components/tools/WorkflowWizard";
import CustomerStoryStrip from "@/components/sections/CustomerStoryStrip";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WorkflowWizard />
      <StatBand />
      <CustomerStoryStrip />
      <CTA />
    </main>
  );
}
