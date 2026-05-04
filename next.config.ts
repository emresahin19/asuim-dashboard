import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@mediapipe/selfie_segmentation'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  // assetPrefix: process.env.NODE_ENV === "production"
  //   ? "https://cdn.asimthecat.com/asuim-dashboard"
  //   : undefined,
};

export default nextConfig;
