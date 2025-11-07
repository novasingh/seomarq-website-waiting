import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const viewport: Viewport = {
  themeColor: '#0f0a1d',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://seomarq.com'),
  title: 'SeoMarq – AI SEO Analyzer & Optimization Tool',
  description: 'Analyze and optimize your website SEO with AI. Get instant insights, fix technical issues, and boost your rankings using SeoMarq’s smart SEO reports.',
  keywords:['AI SEO tool',
 'AI SEO analyzer',
 'SEO audit tool',
 'free SEO audit',
 'website SEO checker',
 'AI website optimization',
 'SEO analysis tool',
 'on-page SEO audit',
 'technical SEO report',
 'SEO rank checker',
 'SEO performance report',
 'free SEO report generator',
 'AI SEO suggestions',
 'search engine optimization tool',
 'improve website ranking',
 'SEO insights with AI',
 'best SEO audit tool',
 'SEOMARQ',
 'AI SEO assistant',
 'SEO optimization platform'],
  authors: [{ name: 'SEOMARQ Team', url: 'https://seomarq.com' }],
  creator: 'SEOMARQ',
  publisher: 'SEOMARQ',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
  alternates: {
    canonical: '/',
  },
  
  openGraph: {
    title: 'SEOMARQ - AI SEO Analysis',
    description: 'Stop guessing what works. SEOMARQ provides AI-powered insights to boost your search engine rankings.',
    url: 'https://seomarq.com',
    siteName: 'SEOMARQ',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'SEOMARQ - AI SEO Analysis Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'SEOMARQ - AI SEO Analysis',
    description: 'Analyze and optimize your SEO with AI-powered suggestions. Get a complete picture of your website, identify critical issues, and rank higher.',
  images: ['/logo.svg'],
    creator: '@seomarq',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SEOMARQ',
    alternateName: 'SeoMarq',
    url: 'https://seomarq.com',
    description: 'AI-powered SEO analysis and optimization tool. Get instant insights, fix technical issues, and boost your rankings.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://seomarq.com/?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SEOMARQ',
    url: 'https://seomarq.com',
    logo: 'https://seomarq.com/logo.svg',
    sameAs: [
      'https://twitter.com/seomarq'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: 'English'
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
