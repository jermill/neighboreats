/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['icntzxgwrnidzpxdplbm.supabase.co', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // PWA and mobile optimizations
  compress: true,
  poweredByHeader: false,
  // Headers for mobile optimization
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig



