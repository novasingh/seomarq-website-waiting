/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimize for production
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  
  // Image optimization - reduced for single page
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [32, 48, 96],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features for faster builds
  experimental: {
    optimizePackageImports: ['@vercel/analytics'],
    optimizeCss: true,
  },

  // Environment variables (if needed)
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</api/subscribe>; rel=preconnect, </api/contact>; rel=preconnect',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
