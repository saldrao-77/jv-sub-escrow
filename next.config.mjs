/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add these optimizations:
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false, // Only during deployment troubleshooting
}

export default nextConfig
