import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
  weight: ['400', '700', '900'],
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
        {/* DNS Prefetch for external services */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL || ''} />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preconnect to Supabase for faster API calls */}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} crossOrigin="anonymous" />
        )}
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M3BZTXC9');`,
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Google Analytics - Load asynchronously to avoid render-blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17683119225"
          strategy="afterInteractive"
          async
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17683119225');
              
              // Conversion tracking function for Get Early Access button
              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-17683119225/ZcDuCPqS08AbEPn4--9B',
                    'value': 1.0,
                    'currency': 'INR',
                    'event_callback': callback
                });
                return false;
              }
            `,
          }}
        />
        
        {/* Defer JSON-LD scripts to prevent render-blocking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
          suppressHydrationWarning
        />
        
        {/* Inline critical CSS to prevent render-blocking */}
        <style>{`
          html { scroll-behavior: smooth; }
          body { background-color: #110c1f; margin: 0; padding: 0; font-family: ${inter.variable}; }
          @keyframes fade-in-up { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: translateY(0); } }
          @keyframes blink { 50% { opacity: 0; } }
          .cursor-blink { animation: blink 1s step-end infinite; }
          .will-animate { opacity: 0; }
          .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
          .animation-delay-200 { animation-delay: 200ms; }
          .animation-delay-400 { animation-delay: 400ms; }
          .animation-delay-600 { animation-delay: 600ms; }
        `}</style>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3BZTXC9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
