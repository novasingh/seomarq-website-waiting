import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onContactClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className="py-4">
      <nav className={`flex items-center justify-between transition-colors ${scrolled ? 'backdrop-blur-md/30' : ''}`}>
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.svg" alt="SEOMARQ logo" width={32} height={32} className="h-8 w-8" priority />
          <span className="text-2xl font-bold tracking-wider text-white">SEOMARQ</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">
            Features
          </Link>
          <button
            onClick={onContactClick}
            className="bg-purple-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </nav>
    </header>
  );
};