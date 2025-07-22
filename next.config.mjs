/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
  },
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
