import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Workflows from "@/components/sections/Workflows";
import WorkflowWizard from "@/components/sections/WorkflowWizard";
import CustomerStoryStrip from "@/components/sections/CustomerStoryStrip";
import CTA from "@/components/sections/CTA";
import SectionDivider from "@/components/sections/SectionDivider";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Workflows />
      <SectionDivider />
      <WorkflowWizard />
      <CustomerStoryStrip />
      <CTA />
    </main>
  );
}
