import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // 👈 disables all TS errors during build
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
