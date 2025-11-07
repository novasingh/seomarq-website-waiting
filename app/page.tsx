"use client";

import { useState, lazy, Suspense, useMemo } from 'react';
import { Header } from '../components/Header';
import Hero from '../components/Hero';
import { Footer } from '../components/Footer';

// Lazy load below-the-fold components to reduce initial JS bundle
const Features = lazy(() => 
  import('../components/Features').then(mod => ({ default: mod.Features }))
);
const ContactUsDialog = lazy(() => 
  import('../components/ContactUsDialog')
);

// Loading placeholder for Features section
function FeaturesLoader() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center h-32 bg-gradient-to-b from-purple-500/10 to-transparent rounded-lg animate-pulse" />
      </div>
    </section>
  );
}

export default function HomePage() {
  const [isContactDialogOpen, setContactDialogOpen] = useState(false);

  // Memoize callbacks to prevent unnecessary re-renders of children
  const openDialog = useMemo(() => () => setContactDialogOpen(true), []);
  const closeDialog = useMemo(() => () => setContactDialogOpen(false), []);

  return (
    <div className="bg-[#110c1f] text-gray-200 min-h-screen">
      <div className="container mx-auto px-6 lg:px-8">
        <Header onContactClick={openDialog} />
        <main>
          <Hero />
          {/* Lazy load Features component - only loads when visible */}
          <Suspense fallback={<FeaturesLoader />}>
            <Features />
          </Suspense>
        </main>
        <Footer />
      </div>
      {/* Lazy load Contact Dialog - only loads when needed */}
      {isContactDialogOpen && (
        <Suspense fallback={null}>
          <ContactUsDialog isOpen={isContactDialogOpen} onClose={closeDialog} />
        </Suspense>
      )}
    </div>
  );
}