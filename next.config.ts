import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["api.efiling.preprod.devontech.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.efiling.preprod.devontech.io",
      },
    ],
  },
};

export default nextConfig;
