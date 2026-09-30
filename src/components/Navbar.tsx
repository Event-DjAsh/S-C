import React, { useState } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';
import logoImg from '../assets/images/logo_hot_purple_1790761643176.jpg';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Brand title with newly designed Hot Purple Logo in top-left */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-purple-500/60 shadow-lg shadow-purple-600/30 group-hover:border-purple-400 transition-all bg-black shrink-0">
            <img 
              src={logoImg} 
              alt="Sound & Celebration Logo" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors font-display">
            Sound & Celebration
          </span>
        </a>

        {/* Zone 2: Clean text navigation links with hot purple hover states */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
          <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
          <a href="#pricing" className="hover:text-purple-400 transition-colors">Packages & Pricing</a>
          <a href="#venues" className="hover:text-purple-400 transition-colors">Auckland Venues</a>
          <a href="#music-sets" className="hover:text-purple-400 transition-colors">Music Vibes</a>
          <a href="#reviews" className="hover:text-purple-400 transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
        </nav>

        {/* Zone 3: Primary action button in Hot Purple */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all shadow-md shadow-purple-600/35 active:scale-[0.98] whitespace-nowrap"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Check Date</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/98 border-b border-stone-800 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 text-base font-medium text-stone-200">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-400 border-b border-stone-900"
            >
              DJ Services
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-400 border-b border-stone-900"
            >
              Packages & Instant Quote
            </a>
            <a 
              href="#venues" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-400 border-b border-stone-900"
            >
              Auckland Venues Guide
            </a>
            <a 
              href="#music-sets" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-400 border-b border-stone-900"
            >
              Music Vibes & Sets
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-400 border-b border-stone-900"
            >
              Verified Client Reviews
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-400"
            >
              Frequently Asked Questions
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg text-center shadow-lg shadow-purple-600/30"
            >
              Check Availability & Instant Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
