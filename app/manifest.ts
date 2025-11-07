import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SEOMARQ - AI SEO Analysis & Optimization',
    short_name: 'SEOMARQ',
    description: 'AI-powered SEO analysis tool to boost your search engine rankings',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0a1d',
    theme_color: '#0f0a1d',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
