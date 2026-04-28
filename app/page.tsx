import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import StatBand from "@/components/sections/StatBand";
import ShipVelocityStrip from "@/components/sections/ShipVelocityStrip";
import Workflows from "@/components/sections/Workflows";
import ProductShowcase from "@/components/sections/ProductShowcase";
import WorkflowWizard from "@/components/tools/WorkflowWizard";
import ToolsShowcase from "@/components/sections/ToolsShowcase";
import CustomerStoryStrip from "@/components/sections/CustomerStoryStrip";
import CTA from "@/components/sections/CTA";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <StatBand />
      <ShipVelocityStrip />
      <Workflows />
      <ProductShowcase />
      <SectionDivider />
      <WorkflowWizard />
      <ToolsShowcase />
      <CustomerStoryStrip />
      <CTA />
    </main>
  );
}
