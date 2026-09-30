import React from 'react';
import { ArrowRight, Images, Sparkles, MapPin, Award } from 'lucide-react';
import heroImage from '../assets/images/hero_dj_wedding_1790753841000.jpg';
import { useSiteContent } from '../context/SiteContentContext';

interface HeroProps {
  onQuoteClick: () => void;
  onListenClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onListenClick }) => {
  const { content } = useSiteContent();
  const { hero } = content;

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-stone-800/60">
      {/* Background radial glow in Hot Purple */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/20 blur-[150px] pointer-events-none rounded-full" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-purple-700/20 blur-[120px] pointer-events-none rounded-full" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition & Direct Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed regional metadata in hot purple */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-purple-400">
              <span className="flex items-center gap-1.5 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                {hero.locationBadges[0] || 'Auckland, New Zealand'}
              </span>
              {hero.locationBadges.slice(1).map((loc, idx) => (
                <React.Fragment key={idx}>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span>{loc}</span>
                </React.Fragment>
              ))}
            </div>

            {/* Unmistakable H1 headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display text-balance">
              {hero.headline}
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-lg sm:text-xl text-stone-300 max-w-2xl leading-relaxed">
              {hero.subtitle}
            </p>

            {/* Action buttons in Hot Purple & Dark Contrast */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all duration-150 shadow-lg shadow-purple-600/35 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Instant Package & Price Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onListenClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-200 bg-stone-900/90 hover:bg-stone-800 border border-stone-700/80 hover:border-purple-500/60 rounded-lg transition-colors whitespace-nowrap"
              >
                <Images className="w-4 h-4 text-purple-400" />
                <span>View Event Gallery</span>
              </button>
            </div>

            {/* Adjacency Trust Metrics */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">
                  {hero.reviewsCount}
                </div>
                <div className="text-xs text-stone-400 font-medium">5-Star Auckland Reviews</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">
                  {hero.complianceRate}
                </div>
                <div className="text-xs text-stone-400 font-medium">Sound Limit Compliance</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display tabular-nums">
                  {hero.insuranceAmount}
                </div>
                <div className="text-xs text-stone-400 font-medium">Public Liability Cover</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero High-Impact Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 hover:border-purple-500/50 transition-colors bg-stone-900 shadow-2xl group">
              <img 
                src={heroImage} 
                alt="Professional wedding DJ performing at an Auckland luxury vineyard venue with warm lighting and dancing crowd"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800/70 text-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-100 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{hero.showcaseVenue}</span>
                  </div>
                  <div className="text-stone-400 text-[11px] mt-0.5">
                    {hero.showcaseNote}
                  </div>
                </div>
                <span className="text-[11px] text-purple-300 font-semibold bg-purple-950/80 border border-purple-500/40 px-2 py-1 rounded">
                  Live Showcase
                </span>
              </div>
            </div>

            {/* Subtle decorative cue */}
            <div className="hidden sm:flex items-center gap-2 mt-3 text-xs text-stone-500 justify-end">
              <Sparkles className="w-3.5 h-3.5 text-purple-400/80" />
              <span>Pioneer DJ & QSC Concert Audio Standard</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
