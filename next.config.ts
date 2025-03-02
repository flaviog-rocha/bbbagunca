import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/index/",
        destination: "/",
      },
      {
        source: "/:path*",
        destination: "/index/:path*",
      }
    ]
  },
};

export default nextConfig;
