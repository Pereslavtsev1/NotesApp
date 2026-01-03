import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fuckingnotesapp.t3.storage.dev",
      },
    ],
  },
};

export default nextConfig;
