import React, { useState } from 'react';
import { MapPin, VolumeX, Clock, Building2, Check, ShieldCheck } from 'lucide-react';
import { AUCKLAND_VENUES } from '../data/djData';

export const AucklandVenues: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = [
    { id: 'all', label: 'All Auckland Regions' },
    { id: 'Waiheke Island', label: 'Waiheke Island' },
    { id: 'Kumeu & West', label: 'Kumeu & West Auckland' },
    { id: 'Central Auckland', label: 'Central & Waterfront' },
    { id: 'Matakana & Rodney', label: 'Matakana & Rodney' }
  ];

  const filteredVenues = selectedRegion === 'all' 
    ? AUCKLAND_VENUES 
    : AUCKLAND_VENUES.filter(v => v.region === selectedRegion);

  return (
    <section id="venues" className="py-20 lg:py-28 bg-stone-900/40 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            Local Auckland Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display text-balance">
            Auckland Venues & Acoustic Specialists
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base">
            Every Auckland venue has distinct acoustic dynamics, sound limiter rules, and council curfew restrictions. We have tuned systems across Waiheke vineyards, rustic Kumeu estates, and 5-star CBD hotel ballrooms.
          </p>
        </div>

        {/* Region Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedRegion === r.id
                  ? 'bg-amber-400 text-stone-950 font-semibold'
                  : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map(venue => (
            <div
              key={venue.id}
              className="bg-stone-950 border border-stone-800/80 rounded-xl p-6 hover:border-amber-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {venue.region}
                  </span>
                  <span className="text-[11px] text-stone-500 font-mono">
                    {venue.capacity}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-display mb-2">
                  {venue.name}
                </h3>

                <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                  {venue.vibe}
                </p>

                <div className="p-3 bg-stone-900/70 border border-stone-800/80 rounded-lg space-y-2 mb-4">
                  <div className="text-[11px] font-semibold text-stone-300 flex items-center gap-1.5">
                    <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                    <span>Acoustic & Limiter Notes:</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-tight">
                    {venue.soundNotes}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-900 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Curfew: {venue.curfew}
                </span>
                <span className="text-stone-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Verified Partner
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Local Travel & Island Ferry Notice */}
        <div className="mt-10 p-5 rounded-xl bg-stone-950/70 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-white text-sm">Performing at a private estate or unlisted Auckland venue?</span>
            <p className="text-stone-400">
              We conduct complimentary site visits or acoustic virtual surveys for marquee setups, private baches, and new event spaces across the Auckland region.
            </p>
          </div>
          <a
            href="#inquiry"
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-700 font-semibold rounded shrink-0 transition-colors"
          >
            Check Custom Venue Feasibility
          </a>
        </div>

      </div>
    </section>
  );
};
