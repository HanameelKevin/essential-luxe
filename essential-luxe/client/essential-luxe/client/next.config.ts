import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  // Fix Turbopack root warning by explicitly setting the root to the client directory
  experimental: {
    turbopack: {
      root: path.resolve(__dirname, '.'),
    },
  },
  // Ensure images from Cloudinary can be loaded
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Prevent hydration mismatch in some environments
  reactStrictMode: true,
};

export default nextConfig;
