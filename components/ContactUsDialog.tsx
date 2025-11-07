"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { CloseIcon } from './Icons';

interface ContactUsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactUsDialog: React.FC<ContactUsDialogProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!message.trim()) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (validate()) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || 'Failed to send message. Please try again later.');
        }

        setIsSubmitted(true);
      } catch (err: any) {
        setApiError(err.message || "An unexpected error occurred.");
        console.error('Contact form submission failed:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleClose = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setApiError(null);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div className="relative z-10 w-full max-w-md bg-[#1a1429] rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20">
        <button
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <div className="p-8">
          {isSubmitted ? (
             <div className="text-center">
                <h2 id="contact-dialog-title" className="text-2xl font-bold text-white">Message Sent!</h2>
                <p className="mt-2 text-gray-300">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button
                    onClick={handleClose}
                    className="mt-6 w-full px-6 py-3 text-sm font-bold text-white bg-purple-700 rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                    Close
                </button>
             </div>
          ) : (
            <>
              <h2 id="contact-dialog-title" className="text-2xl font-bold text-white">Contact Us</h2>
              <p className="mt-2 text-sm text-gray-400">
                Have a question or want to learn more? Drop us a line!
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    disabled={isLoading}
                    className={`w-full bg-[#1e162f] rounded-lg p-3 text-white placeholder-gray-500 border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.name ? 'border-red-500' : 'border-white/10'} disabled:opacity-60 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <p id="name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    disabled={isLoading}
                    className={`w-full bg-[#1e162f] rounded-lg p-3 text-white placeholder-gray-500 border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.email ? 'border-red-500' : 'border-white/10'} disabled:opacity-60 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                   {errors.email && <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message"
                    rows={4}
                    disabled={isLoading}
                    className={`w-full bg-[#1e162f] rounded-lg p-3 text-white placeholder-gray-500 border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 ${errors.message ? 'border-red-500' : 'border-white/10'} disabled:opacity-60 disabled:cursor-not-allowed`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  ></textarea>
                   {errors.message && <p id="message-error" className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>
                 {apiError && <p className="mt-1 text-xs text-red-400 text-center">{apiError}</p>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 text-sm font-bold text-white bg-purple-700 rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 disabled:bg-purple-800 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUsDialog;