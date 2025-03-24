/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.efiling.staging.devontech.io",
      },
    ],
  },
};

export default nextConfig;
