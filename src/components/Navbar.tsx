import React, { useState } from 'react';
import { Menu, X, CalendarCheck, Sliders } from 'lucide-react';
import logoImg from '../assets/images/logo_hot_purple_1790761643176.jpg';
import { useSiteContent } from '../context/SiteContentContext';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenEditor?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenEditor }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content } = useSiteContent();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Brand title with Hot Purple Logo in top-left */}
        <a 
          href="#" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-purple-500/60 shadow-lg shadow-purple-600/30 group-hover:border-purple-400 transition-all bg-black shrink-0">
            <img 
              src={logoImg} 
              alt={`${content.general.businessName} Logo`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-purple-400 transition-colors font-display">
            {content.general.businessName}
          </span>
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
          <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
          <a href="#pricing" className="hover:text-purple-400 transition-colors">Packages & Pricing</a>
          <a href="#gallery" className="hover:text-purple-400 transition-colors">Gallery of Previous Events</a>
          <a href="#reviews" className="hover:text-purple-400 transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
        </nav>

        {/* Zone 3: Primary action buttons */}
        <div className="flex items-center gap-2.5">
          {onOpenEditor && (
            <button
              onClick={onOpenEditor}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/40 rounded-lg transition-colors"
              title="Open Website Content Editor"
            >
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>Update Site</span>
            </button>
          )}

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all shadow-md shadow-purple-600/35 active:scale-[0.98] whitespace-nowrap"
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
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-400 border-b border-stone-900"
            >
              Gallery of Previous Events
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

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg text-center shadow-lg shadow-purple-600/30"
            >
              Check Availability & Instant Quote
            </button>

            {onOpenEditor && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditor();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/40 rounded-lg text-center flex items-center justify-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Open Website Content Studio</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
