import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
