import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images uploaded via the dashboard are already processed by Sharp
    // (WebP/AVIF, 1280x720) — no need for Vercel to re-optimize them.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
