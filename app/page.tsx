import Hero from "@/components/sections/Hero";
import StatBand from "@/components/sections/StatBand";
import Workflows from "@/components/sections/Workflows";
import WorkflowWizard from "@/components/tools/WorkflowWizard";
import ToolsShowcase from "@/components/sections/ToolsShowcase";
import CustomerStoryStrip from "@/components/sections/CustomerStoryStrip";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WorkflowWizard />
      <Workflows />
      <StatBand />
      <ToolsShowcase />
      <CustomerStoryStrip />
      <CTA />
    </main>
  );
}
