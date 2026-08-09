"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasTrackingOptOut } from "@/lib/analytics";

export default function CloudflareBeacon({ token }: { token: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!hasTrackingOptOut());
  }, []);

  if (!enabled) return null;

  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
      strategy="afterInteractive"
    />
  );
}
