import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin requests from the local dev server
  allowedDevOrigins: ["localhost"],
  // Silence the "missing swc dependencies" warning that occurs with older lockfiles
  experimental: {},
};

export default nextConfig;
