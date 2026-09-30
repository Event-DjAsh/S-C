import React, { useState } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import weddingImg from '../assets/images/service_wedding_dj_1790753867187.jpg';
import corporateImg from '../assets/images/service_corporate_dj_1790753853648.jpg';
import partyImg from '../assets/images/service_party_dj_1790753880384.jpg';
import { useSiteContent } from '../context/SiteContentContext';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceType: 'wedding' | 'corporate' | 'private_party') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [activeTab, setActiveTab] = useState<'wedding' | 'corporate' | 'party'>('wedding');
  const { content } = useSiteContent();

  const weddingSvc = content.services.find(s => s.id === 'wedding') || content.services[0];
  const corporateSvc = content.services.find(s => s.id === 'corporate') || content.services[1];
  const partySvc = content.services.find(s => s.id === 'party') || content.services[2];

  return (
    <section id="services" className="py-20 lg:py-28 bg-stone-950 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase mb-2">
            Tailored Entertainment
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display text-balance">
            Specialized DJ Services for Auckland Events
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-300">
            Every celebration has a unique tempo. Whether commanding a black-tie gala at the Cordis or guiding a sunset wedding at Mudbrick, we deliver flawless audio engineering and instinctual crowd-reading.
          </p>
        </div>

        {/* Interactive Segmented Filter Control */}
        <div className="flex items-center gap-1.5 p-1.5 bg-stone-900/90 border border-stone-800 rounded-xl max-w-md mb-10">
          <button
            onClick={() => setActiveTab('wedding')}
            className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 ${
              activeTab === 'wedding'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-stone-400 hover:text-stone-100'
            }`}
          >
            Weddings & MC
          </button>
          <button
            onClick={() => setActiveTab('corporate')}
            className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 ${
              activeTab === 'corporate'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-stone-400 hover:text-stone-100'
            }`}
          >
            Corporate Events
          </button>
          <button
            onClick={() => setActiveTab('party')}
            className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 ${
              activeTab === 'party'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-stone-400 hover:text-stone-100'
            }`}
          >
            Private Parties
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'wedding' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900/40 border border-stone-800/80 rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs text-stone-400 font-medium tracking-wide">
                <span>{weddingSvc.categoryTag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {weddingSvc.title}
              </h3>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {weddingSvc.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-200">
                {weddingSvc.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectServiceForQuote('wedding')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors shadow-md shadow-purple-600/30"
                >
                  <span>Build Wedding Package Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-stone-400">
                  Packages from <strong className="text-white text-sm font-bold tabular-nums">${weddingSvc.priceFrom.toLocaleString()} NZD</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-stone-800 hover:border-purple-500/50 transition-colors shadow-xl relative group">
                <img 
                  src={weddingImg} 
                  alt="Auckland wedding reception dancefloor packed with happy couple and guests dancing under marquee lights"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-stone-300 bg-stone-950/80 backdrop-blur-md p-3 rounded-lg border border-stone-800/80">
                  <div className="font-semibold text-white">Curated for Auckland Venues</div>
                  <div className="text-stone-400 text-[11px]">Waiheke Vineyards, Kumeu Country Estates & Central Auckland Warehouses</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'corporate' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900/40 border border-stone-800/80 rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs text-stone-400 font-medium tracking-wide">
                <span>{corporateSvc.categoryTag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {corporateSvc.title}
              </h3>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {corporateSvc.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-200">
                {corporateSvc.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectServiceForQuote('corporate')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors shadow-md shadow-purple-600/30"
                >
                  <span>Request Corporate Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-stone-400">
                  Packages from <strong className="text-white text-sm font-bold tabular-nums">${corporateSvc.priceFrom.toLocaleString()} NZD</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-stone-800 hover:border-purple-500/50 transition-colors shadow-xl relative group">
                <img 
                  src={corporateImg} 
                  alt="Corporate awards night DJ booth setup with sleek audio console and stage lighting in Auckland"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-stone-300 bg-stone-950/80 backdrop-blur-md p-3 rounded-lg border border-stone-800/80">
                  <div className="font-semibold text-white">Full Production Reliability</div>
                  <div className="text-stone-400 text-[11px]">Seamless coordination with your event director & in-house hotel AV teams</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'party' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900/40 border border-stone-800/80 rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs text-stone-400 font-medium tracking-wide">
                <span>{partySvc.categoryTag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {partySvc.title}
              </h3>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {partySvc.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-200">
                {partySvc.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectServiceForQuote('private_party')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors shadow-md shadow-purple-600/30"
                >
                  <span>Book Private Party DJ</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-stone-400">
                  Packages from <strong className="text-white text-sm font-bold tabular-nums">${partySvc.priceFrom.toLocaleString()} NZD</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-stone-800 hover:border-purple-500/50 transition-colors shadow-xl relative group">
                <img 
                  src={partyImg} 
                  alt="Auckland private party crowd dancing enthusiastically in an atmospheric event space with ambient lighting"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-stone-300 bg-stone-950/80 backdrop-blur-md p-3 rounded-lg border border-stone-800/80">
                  <div className="font-semibold text-white">All Ages & Vibe Profiles</div>
                  <div className="text-stone-400 text-[11px]">From 21st house party bangers to 50th retro disco and 90s dance classics</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
