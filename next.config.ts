import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["api.efiling.staging.devontech.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.efiling.staging.devontech.io",
      },
    ],
  },
};

export default nextConfig;
