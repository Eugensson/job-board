import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "9lomklk6m8.ufs.sh",
        port: "",
      },
    ],
  },
};

export default nextConfig;
