import React, { useState } from 'react';
import { MapPin, Calendar, Users, X, ZoomIn, Sparkles, Award } from 'lucide-react';
import { useSiteContent, GalleryItem } from '../context/SiteContentContext';

export const GallerySection: React.FC = () => {
  const { content } = useSiteContent();
  const [filter, setFilter] = useState<'all' | 'wedding' | 'corporate' | 'party'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredItems = filter === 'all' 
    ? content.gallery 
    : content.gallery.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-stone-900/40 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Real Auckland Celebrations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display text-balance">
              Gallery of Previous Events
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base">
              A glimpse into unforgettable weddings, corporate galas, and milestone parties across Auckland, Waiheke Island, and Kumeu Wine Country.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-950/80 border border-stone-800 rounded-xl shrink-0">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'wedding', label: 'Weddings' },
              { id: 'corporate', label: 'Corporate Galas' },
              { id: 'party', label: 'Private Parties' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`py-2 px-3.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === tab.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group bg-stone-950 border border-stone-800/80 rounded-2xl overflow-hidden hover:border-purple-500/60 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Contrast overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/90 border border-purple-500/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Quick zoom icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-950/80 border border-stone-800 flex items-center justify-center text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-purple-400" />
                </div>

                {/* Location indicator */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-300">
                  <span className="flex items-center gap-1 font-medium truncate">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    {item.venue}
                  </span>
                  <span className="text-[11px] text-stone-400 shrink-0 ml-2">
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 font-display">
                    {item.title}
                  </h3>
                  
                  <div className="text-xs text-purple-400 font-medium mt-1 mb-2.5">
                    &ldquo;{item.highlight}&rdquo;
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-900 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    {item.guests}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {item.year}
                  </span>
                  <span className="text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-950 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              Planning an event at your own venue or private property?
            </span>
            <p className="text-xs sm:text-sm text-stone-400 max-w-2xl">
              We provide tailored acoustic calibration and bespoke lighting setups for any indoor or outdoor Auckland location.
            </p>
          </div>
          <a
            href="#inquiry"
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors shrink-0 shadow-md shadow-purple-600/30"
          >
            Check Date For Your Event
          </a>
        </div>

      </div>

      {/* Full Detail Modal / Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-stone-950 border border-purple-500/50 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-900/90 border border-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[16/10] bg-stone-900">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-200">
                <span className="flex items-center gap-1.5 font-semibold text-white bg-stone-950/80 px-3 py-1.5 rounded-lg border border-stone-800 backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  {selectedPhoto.venue}, {selectedPhoto.location}
                </span>
                <span className="bg-purple-950/90 border border-purple-500/40 text-purple-300 px-3 py-1.5 rounded-lg font-semibold text-xs">
                  {selectedPhoto.categoryLabel}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {selectedPhoto.title}
                </h3>
                <div className="text-sm font-semibold text-purple-400 mt-1">
                  &ldquo;{selectedPhoto.highlight}&rdquo;
                </div>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedPhoto.description}
              </p>

              <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4 text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-purple-400" />
                    <strong>Attendance:</strong> {selectedPhoto.guests}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <strong>Season:</strong> {selectedPhoto.year}
                  </span>
                </div>

                <a
                  href="#inquiry"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors shadow-md shadow-purple-600/30"
                >
                  Inquire About Similar Setup
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
