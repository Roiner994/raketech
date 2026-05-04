import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@raketech/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/raketech-app-2026.firebasestorage.app/o/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/raketech-app-2026.firebasestorage.app/**",
      },
    ],
  },
};

export default nextConfig;
