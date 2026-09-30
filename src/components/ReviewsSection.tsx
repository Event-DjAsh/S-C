import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/djData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-stone-900/60 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Rating Aggregate */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
              Social Proof & Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display text-balance">
              Trusted by Auckland Couples & Corporate Planners
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base">
              Real reviews from unforgettable celebrations across Auckland, Waiheke Island, and Kumeu.
            </p>
          </div>

          {/* Aggregate Rating Banner */}
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 shrink-0 flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white font-display tabular-nums">5.0</span>
              <div className="flex items-center text-amber-400 gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-stone-800" />
            <div className="text-xs text-stone-300">
              <div className="font-semibold text-white">54 Verified Reviews</div>
              <div className="text-stone-400 text-[11px]">100% 5-Star Track Record</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map(t => (
            <div 
              key={t.id}
              className="bg-stone-950 border border-stone-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-400/40 transition-colors relative"
            >
              <div>
                {/* Star rating and venue metadata (NO PILLS) */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    {t.date}
                  </div>
                </div>

                <div className="text-sm font-semibold text-amber-300 mb-2">
                  &ldquo;{t.highlight}&rdquo;
                </div>

                <p className="text-stone-300 text-sm leading-relaxed mb-6">
                  {t.quote}
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{t.clientNames}</div>
                  <div className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                    <span>{t.eventType}</span>
                    <span aria-hidden="true" className="text-stone-600">·</span>
                    <span className="text-stone-300">{t.venue}</span>
                  </div>
                </div>
                <Award className="w-5 h-5 text-amber-400/70 shrink-0" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
