/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // Optimize for static export for Netlify
  trailingSlash: true,
  // Static export for better Netlify compatibility
  output: 'export',
  // Disable server-side features for static export
  distDir: 'out',
  // Handle environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
