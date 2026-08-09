import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { siteMeta } from "@/content/site-meta";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

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
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
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
    "Plato-connected dental clinic operations",
    "dental appointment workflow",
    "patient care coordination",
    "dental checkout and billing review",
    "clinic inventory and staff operations",
    "dental practice insights",
    "healthcare access controls and audit logs",
  ],
}).replace(/</g, "\\u003c");

const CF_BEACON = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrumentSerif.variable}`}>
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
