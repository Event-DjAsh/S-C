import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenGithubGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGithubGuide }) => {
  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Mission (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white font-display">
              Sound & Celebration
            </span>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Premier DJ and Master of Ceremonies hire based in Auckland, New Zealand. Delivering refined sound, bespoke music programming, and high-energy dancefloors for luxury weddings, corporate galas, and milestone parties.
            </p>
            <div className="flex items-center gap-4 text-stone-400 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenGithubGuide}
                className="text-[11px] text-stone-400 hover:text-amber-400 underline underline-offset-4 ml-2"
              >
                GitHub Pages Guide
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">DJ Services</a></li>
              <li><a href="#pricing" className="hover:text-amber-400 transition-colors">Packages & Pricing</a></li>
              <li><a href="#venues" className="hover:text-amber-400 transition-colors">Auckland Venues</a></li>
              <li><a href="#music-sets" className="hover:text-amber-400 transition-colors">Music Vibes</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Client Testimonials</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Local Service Regions (SEO Powerhouse) */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Auckland Service Areas
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>Auckland CBD & Waterfront</li>
              <li>Waiheke Island Vineyards</li>
              <li>Kumeu Wine Country & West</li>
              <li>Matakana Coast & Rodney</li>
              <li>Takapuna & North Shore</li>
              <li>Hamilton & Greater Waikato</li>
            </ul>
          </div>

          {/* Contact Details & Direct Inquiries */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </div>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Auckland, New Zealand</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+6421892411" className="hover:text-white transition-colors">
                  +64 21 892 411
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:hello@soundandcelebration.co.nz" className="hover:text-white transition-colors">
                  hello@soundandcelebration.co.nz
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-stone-400 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  $10M NZD Public Liability
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Domain confirmation */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Sound & Celebration (soundandcelebration.co.nz). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Auckland Wedding DJ</span>
            <span aria-hidden="true">·</span>
            <span>Corporate Event Audio</span>
            <span aria-hidden="true">·</span>
            <span>Private Party Entertainment</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
