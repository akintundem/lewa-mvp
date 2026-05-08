import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 blocks HMR / _next/* requests from origins other than the host
  // the dev server was started on. Allow LAN IPs (for testing on phone over
  // Wi-Fi) and *.local mDNS names alongside localhost.
  allowedDevOrigins: ["10.0.0.232", "192.168.*.*", "10.*.*.*", "*.local"],

  images: {
    // Free-license placeholder photography from Unsplash.
    // Unsplash License: free for commercial use, no attribution required.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
