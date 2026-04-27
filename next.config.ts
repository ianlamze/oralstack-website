import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Tree-shake icon and motion libraries aggressively. Next 16 already
  // tree-shakes named imports, but optimizePackageImports lets Turbopack
  // skip the index barrel and pick up only what's used.
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default config;
