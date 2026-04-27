import type { Metadata } from "next";
import ComparisonPage from "@/components/sections/ComparisonPage";
import { carestream } from "@/content/comparisons/carestream";

export const metadata: Metadata = {
  title: carestream.metaTitle,
  description: carestream.metaDescription,
  alternates: { canonical: `/compare/${carestream.slug}` },
};

export default function Page() {
  return <ComparisonPage data={carestream} />;
}
