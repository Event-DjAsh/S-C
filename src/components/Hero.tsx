import React from 'react';
import { ArrowRight, Volume2, Sparkles, MapPin, Award } from 'lucide-react';
import heroImage from '../assets/images/hero_dj_wedding_1790753841000.jpg';

interface HeroProps {
  onQuoteClick: () => void;
  onListenClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onListenClick }) => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-stone-800/60">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition & Direct Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed regional metadata (NO PILLS) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-amber-400">
              <span className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Auckland, New Zealand
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Waiheke Island</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Kumeu Wine Country</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span>Matakana Coast</span>
            </div>

            {/* Unmistakable H1 headline (SEO optimized with Auckland DJ for weddings and corporate events) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display text-balance">
              Auckland Wedding & Corporate Event DJ Hire.
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-lg sm:text-xl text-stone-300 max-w-2xl leading-relaxed">
              We design unforgettable celebrations with concert-grade sound, bespoke music curation, and seamless crowd reading. No cheesy microphone gimmicks—just packed dancefloors from first drink to the final song.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded transition-all duration-150 shadow-lg shadow-amber-400/10 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Instant Package & Price Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onListenClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-200 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 hover:border-stone-500 rounded transition-colors whitespace-nowrap"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Listen to Sample Mixes</span>
              </button>
            </div>

            {/* Adjacency Trust Metrics: unboxed editorial row */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">54+</div>
                <div className="text-xs text-stone-400 font-medium">5-Star Auckland Reviews</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">100%</div>
                <div className="text-xs text-stone-400 font-medium">Sound Limit Compliance</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">$10M</div>
                <div className="text-xs text-stone-400 font-medium">Public Liability Cover</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero High-Impact Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl group">
              <img 
                src={heroImage} 
                alt="Professional wedding DJ performing at an Auckland luxury vineyard venue with warm lighting and dancing crowd"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800/70 text-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-100 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Mudbrick Vineyard, Waiheke</span>
                  </div>
                  <div className="text-stone-400 text-[11px] mt-0.5">
                    Full-Day Wedding Audio & Late-Night Set
                  </div>
                </div>
                <span className="text-[11px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-1 rounded">
                  Live Showcase
                </span>
              </div>
            </div>

            {/* Subtle decorative cue */}
            <div className="hidden sm:flex items-center gap-2 mt-3 text-xs text-stone-500 justify-end">
              <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
              <span>Pioneer DJ & QSC Concert Audio Standard</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
