import type { Metadata } from "next";
import ComparisonPage from "@/components/page/ComparisonPage";
import { eaglesoft } from "@/content/comparisons/eaglesoft";

export const metadata: Metadata = {
  title: eaglesoft.metaTitle,
  description:
    "Archived comparison. Review Oralstack's current Plato-connected product scope and rollout boundaries before procurement.",
  alternates: { canonical: `/compare/${eaglesoft.slug}` },
};

export default function Page() {
  return <ComparisonPage data={eaglesoft} />;
}
