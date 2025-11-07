import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'SEOMARQ - AI SEO Analysis';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 20,
            letterSpacing: '0.1em',
          }}
        >
          SEOMARQ
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#a78bfa',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          AI-Powered SEO Analysis & Optimization
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
