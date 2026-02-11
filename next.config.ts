import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Use modern image formats for smaller file sizes
    formats: ['image/avif', 'image/webp'],
    // Limit image sizes to what's actually needed
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Enable gzip/brotli compression
  compress: true,
  // Performance: minimize powered-by header
  poweredByHeader: false,
  // Enable React strict mode for best practices
  reactStrictMode: true,
};

export default nextConfig;
