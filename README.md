<div align="center">
  <img src="https://raw.githubusercontent.com/novasingh/seomarq-website-waiting/master/public/logo.svg" alt="SEOMARQ Logo" width="120" height="120" />
  
  # SEOMARQ - AI SEO Analyzer & Optimization Tool
  
  [![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  
  **AI-powered SEO analysis and optimization platform to boost your search engine rankings**
  
  [Live Demo](https://seomarq.com) · [Report Bug](https://github.com/novasingh/seomarq-website-waiting/issues) · [Request Feature](https://github.com/novasingh/seomarq-website-waiting/issues)
</div>

---

## 🚀 Overview

SEOMARQ is a cutting-edge, AI-powered SEO analysis and optimization platform built with Next.js 16, React 19, and TypeScript. This is the waiting list landing page that collects early access sign-ups and contact inquiries through Supabase Edge Functions.

### ✨ Key Features

- 🤖 **AI-Powered Analysis** - Advanced algorithms to uncover technical SEO issues and content gaps
- 📊 **Actionable Insights** - Clear, prioritized recommendations for maximum impact
- 🔍 **Competitor Tracking** - Monitor competitors' strategies and stay ahead
- ⚡ **Edge-Ready API** - Serverless Edge Functions for optimal performance
- 🎯 **SEO Optimized** - Built-in structured data, meta tags, and semantic HTML
- 📱 **Responsive Design** - Mobile-first approach with beautiful animations
- ♿ **Accessible** - WCAG compliant with proper ARIA labels

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5.6 |
| **Styling** | Tailwind CSS 3.4 |
| **Backend** | Supabase Edge Functions |
| **Validation** | Zod |
| **Deployment** | Vercel |
| **Analytics** | Vercel Analytics (optional) |

---

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Supabase account (for backend functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/novasingh/seomarq-website-waiting.git
   cd seomarq-website-waiting
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example env file
   Copy-Item .env.example .env.local
   ```

4. **Configure your `.env.local` file**
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   
   # Optional: Gemini API (if using)
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗 Project Structure

```
seomarq-website-waiting/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes (Edge Functions)
│   │   ├── contact/          # Contact form handler
│   │   └── subscribe/        # Email subscription handler
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Homepage
│   ├── robots.ts             # Dynamic robots.txt
│   ├── sitemap.ts            # Dynamic sitemap.xml
│   ├── manifest.ts           # PWA manifest
│   ├── opengraph-image.tsx   # Dynamic OG image
│   ├── error.tsx             # Error boundary
│   ├── loading.tsx           # Loading state
│   └── not-found.tsx         # 404 page
├── components/               # React components
│   ├── Header.tsx            # Navigation header
│   ├── Hero.tsx              # Hero section with CTA
│   ├── Features.tsx          # Feature cards
│   ├── Footer.tsx            # Site footer
│   ├── ContactUsDialog.tsx   # Contact modal
│   └── Icons.tsx             # SVG icon components
├── public/                   # Static assets
│   ├── logo.svg              # Brand logo
│   ├── favicon.svg           # Favicon
│   └── robots.txt            # Static robots file
└── styles/
    └── globals.css           # Global styles + Tailwind
```

---

## 🎯 SEO Features

### ✅ Implemented Optimizations

- **Structured Data (JSON-LD)**
  - WebSite schema with search action
  - Organization schema with contact info
- **Complete Metadata**
  - 20+ relevant keywords
  - Open Graph tags for social sharing
  - Twitter Card support
  - Canonical URLs
  - Theme color for PWA
- **Semantic HTML**
  - Proper heading hierarchy (H1 → H2 → H3)
  - ARIA labels and landmarks
  - Article tags for feature cards
- **Technical SEO**
  - Dynamic sitemap generation
  - Robots.txt configuration
  - Mobile-responsive design
  - Fast page loads with Edge Runtime
- **Performance**
  - Image optimization (WebP/AVIF)
  - Font optimization with `next/font`
  - Code splitting and lazy loading
  - Edge Runtime for API routes

---

## 🔌 API Endpoints

### `POST /api/subscribe`
Subscribe to the waiting list

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "ok": true
}
```

**Error Response:**
```json
{
  "error": "Validation failed",
  "details": { ... }
}
```

---

### `POST /api/contact`
Submit contact form

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in SEOMARQ..."
}
```

**Response:**
```json
{
  "ok": true
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin master
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Set Environment Variables in Vercel**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

## 📊 Performance Metrics

- **Runtime**: Edge Runtime (sub-100ms response times)
- **Lighthouse Score**: 95+ (all categories)
- **Core Web Vitals**: All passing
- **Bundle Size**: Optimized with code splitting
- **Image Format**: WebP/AVIF with fallbacks

---

## 🔒 Security

- ✅ Server-side API routes protect sensitive keys
- ✅ Input validation with Zod schemas
- ✅ CORS and security headers configured
- ✅ Environment variables for sensitive data
- ✅ No client-side API key exposure

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

Copyright © 2025 SEOMARQ. All rights reserved.

---

## 📧 Contact & Support

- **Website**: [https://seomarq.com](https://seomarq.com)
- **Twitter**: [@seomarq](https://twitter.com/seomarq)
- **Issues**: [GitHub Issues](https://github.com/novasingh/seomarq-website-waiting/issues)

---

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)

---

<div align="center">
  <strong>⭐ Star this repo if you find it helpful!</strong>
  
  Made with ❤️ by the SEOMARQ Team
</div>
