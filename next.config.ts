import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.178.85"],
};

export default nextConfig;