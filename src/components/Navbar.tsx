import React, { useState } from 'react';
import { Menu, X, CalendarCheck, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onOpenGithubGuide: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGithubGuide, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/85 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Brand title, one line in display face */}
        <a 
          href="#" 
          className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors font-display"
        >
          Sound & Celebration
        </a>

        {/* Zone 2: Clean text navigation links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
          <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
          <a href="#pricing" className="hover:text-amber-400 transition-colors">Packages & Pricing</a>
          <a href="#venues" className="hover:text-amber-400 transition-colors">Auckland Venues</a>
          <a href="#music-sets" className="hover:text-amber-400 transition-colors">Music Vibes</a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGithubGuide}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-300 bg-stone-900 border border-stone-700/70 hover:border-amber-400/60 hover:text-amber-300 rounded transition-colors whitespace-nowrap"
            title="GitHub Pages & SEO Deployment Configuration"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>GitHub Pages SEO Setup</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors whitespace-nowrap shadow-sm active:scale-[0.98]"
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
              className="py-2 hover:text-amber-400 border-b border-stone-900"
            >
              DJ Services
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 border-b border-stone-900"
            >
              Packages & Instant Quote
            </a>
            <a 
              href="#venues" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 border-b border-stone-900"
            >
              Auckland Venues Guide
            </a>
            <a 
              href="#music-sets" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 border-b border-stone-900"
            >
              Music Vibes & Sets
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 border-b border-stone-900"
            >
              Verified Client Reviews
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Frequently Asked Questions
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGithubGuide();
              }}
              className="w-full py-2.5 px-4 text-xs font-medium text-stone-300 bg-stone-900 border border-stone-800 rounded flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              GitHub Pages & Domain Guide
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded text-center"
            >
              Check Availability & Instant Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
