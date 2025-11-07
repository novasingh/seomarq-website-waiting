"use client";

import React, { useState } from 'react';
import { Header } from '../components/Header';
import Hero from '../components/Hero';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import ContactUsDialog from '../components/ContactUsDialog';

export default function HomePage() {
  const [isContactDialogOpen, setContactDialogOpen] = useState(false);

  const openDialog = () => setContactDialogOpen(true);
  const closeDialog = () => setContactDialogOpen(false);

  return (
    <div className="bg-[#110c1f] text-gray-200 min-h-screen">
      <div className="container mx-auto px-6 lg:px-8">
        <Header onContactClick={openDialog} />
        <main>
          <Hero />
          <Features />
        </main>
        <Footer />
      </div>
      <ContactUsDialog isOpen={isContactDialogOpen} onClose={closeDialog} />
    </div>
  );
}