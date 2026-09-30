import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, ShieldCheck, Sliders } from 'lucide-react';
import logoImg from '../assets/images/logo_hot_purple_1790761643176.jpg';
import { useSiteContent } from '../context/SiteContentContext';

interface FooterProps {
  onOpenEditor?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEditor }) => {
  const { content } = useSiteContent();
  const { general } = content;

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Mission (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-purple-500/60 shadow-md shadow-purple-600/30 bg-black shrink-0">
                <img 
                  src={logoImg} 
                  alt={`${general.businessName} Logo`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                {general.businessName}
              </span>
            </div>
            
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Premier DJ and Master of Ceremonies hire based in Auckland, New Zealand. Delivering refined sound, bespoke music programming, and high-energy dancefloors for luxury weddings, corporate galas, and milestone parties.
            </p>
            <div className="flex items-center gap-4 text-stone-400 pt-2">
              <a 
                href={general.instagramUrl || "https://instagram.com"} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-purple-400 transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={general.facebookUrl || "https://facebook.com"} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-purple-400 transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-purple-400 transition-colors">DJ Services</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Packages & Pricing</a></li>
              <li><a href="#gallery" className="hover:text-purple-400 transition-colors">Gallery of Previous Events</a></li>
              <li><a href="#reviews" className="hover:text-purple-400 transition-colors">Client Testimonials</a></li>
              <li><a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Local Service Regions */}
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
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{general.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <a href={`tel:${general.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {general.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <a href={`mailto:${general.email}`} className="hover:text-white transition-colors">
                  {general.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-stone-400 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {general.liabilityInsurance}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Admin Editor Link */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} {general.businessName} (soundandcelebration.co.nz). All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            {onOpenEditor && (
              <button
                onClick={onOpenEditor}
                className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-semibold"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Edit Website Content / Admin</span>
              </button>
            )}
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span>Auckland Wedding DJ</span>
            <span aria-hidden="true">·</span>
            <span>Corporate Event Audio</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
