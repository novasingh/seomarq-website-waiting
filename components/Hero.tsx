"use client";

import { useState, useEffect, useMemo, FormEvent } from 'react';
import { MailIcon } from './Icons';

export const Hero = () => {
  // Typing animation state
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wordsToAnimate = useMemo(() => ['SEO', 'Content', 'Rankings'], []);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delay = 1500;

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = wordsToAnimate[wordIndex];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % wordsToAnimate.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, wordsToAnimate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  setError(null);
  if (alreadyJoined) return; // prevent resubmission if already joined

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'An unexpected error occurred.' }));
        const msg = errorData?.error || errorData?.message || '';
        // Normalize and detect 'Already Join' messages from Edge Function
        if (typeof msg === 'string' && msg.toLowerCase().includes('already') && msg.toLowerCase().includes('wait')) {
          setAlreadyJoined(true);
          setSubmitted(true);
          setEmail('');
          setIsLoading(false);
          return;
        }
        throw new Error(msg || `Server responded with status: ${response.status}`);
      }

      setSubmitted(true);
      setEmail('');
    } catch (err: any) {
      let errorMessage = err.message || "Failed to subscribe. Please try again.";
      if (typeof errorMessage === 'string' && (errorMessage.toLowerCase().includes('already') && errorMessage.toLowerCase().includes('wait'))) {
        setAlreadyJoined(true);
        setSubmitted(true);
        errorMessage = "You've already joined the waiting list! We'll notify you at launch.";
      }
      setError(errorMessage);
      console.error('Subscription failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 lg:py-24" aria-labelledby="hero-heading">
      <div className="text-center">
        <h1 id="hero-heading" className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tighter h-38 md:h-24 flex flex-wrap items-center justify-center">
          <span className="mr-3">Analyze & Optimize Your</span>
          <span className="text-purple-400 whitespace-nowrap" aria-live="polite" aria-atomic="true">
            {text}
            <span className="cursor-blink text-white font-light" aria-hidden="true">|</span>
          </span>
          <span className="ml-3">with AI</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto will-animate animate-fade-in-up animation-delay-200">
          Stop guessing what works. SEOMARQ gives you a complete picture of your website, identifies critical issues, and provides AI-powered suggestions to help you rank higher on Google and other search engines.
        </p>
        
        <div id="early-access" className="mt-10 max-w-lg mx-auto will-animate animate-fade-in-up animation-delay-400">
          {submitted ? (
            <p className="text-lg text-green-400">Thank you! You've been added to the waiting list.</p>
          ) : (
            <>
              <form 
                id="subscribe-form"
                name="subscribe"
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-4"
                action="/api/subscribe"
                method="POST"
              >
                <div className="relative flex-grow">
                   <label htmlFor="hero-email" className="sr-only">Email for early access</label>
                   <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                   <input
                    id="hero-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    required
                    disabled={isLoading}
                    aria-label="Email for early access"
                    className="w-full pl-12 pr-4 py-4 text-base bg-[#1e162f] rounded-full text-white placeholder-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || alreadyJoined}
                  className="px-8 py-4 text-base font-bold text-white bg-purple-700 rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 whitespace-nowrap disabled:bg-purple-800 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {alreadyJoined ? 'Already Joined' : isLoading ? 'Submitting...' : 'Get Early Access'}
                </button>
              </form>
              {error ? (
                <p className="mt-4 text-sm text-red-400">{error}</p>
              ) : (
                <p className="mt-4 text-sm text-gray-500 will-animate animate-fade-in-up animation-delay-600">Join our waiting list to be the first to know when we launch.</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
