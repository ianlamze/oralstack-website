import type { Metadata } from "next";
import ComparisonPage from "@/components/page/ComparisonPage";
import { eaglesoft } from "@/content/comparisons/eaglesoft";

export const metadata: Metadata = {
  title: eaglesoft.metaTitle,
  description: eaglesoft.metaDescription,
  alternates: { canonical: `/compare/${eaglesoft.slug}` },
};

export default function Page() {
  return <ComparisonPage data={eaglesoft} />;
}
