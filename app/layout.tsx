import type { Metadata } from "next";
import { siteMeta } from "@/content/site-meta";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/sections/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: "%s · Oralstack",
  },
  description: siteMeta.description,
  metadataBase: new URL(siteMeta.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: "Oralstack",
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Oralstack",
  url: siteMeta.url,
  logo: `${siteMeta.url}/icon.svg`,
  description: siteMeta.description,
  areaServed: [
    { "@type": "Country", name: "Singapore" },
    { "@type": "Place", name: "APAC" },
  ],
  knowsAbout: [
    "dental practice management",
    "DICOM imaging",
    "clinical scheduling",
    "dental billing",
    "dental clinic operations",
  ],
}).replace(/</g, "\\u003c");

const CF_BEACON = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
        {CF_BEACON && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON })}
          />
        )}
      </body>
    </html>
  );
}
