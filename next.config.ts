import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow external images if needed
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "**.example.com",
      // },
    ],
  },
};

export default nextConfig;
