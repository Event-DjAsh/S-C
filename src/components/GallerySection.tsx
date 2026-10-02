import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, X, ZoomIn, Sparkles, Award, Images, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteContent, GalleryItem } from '../context/SiteContentContext';

export const GallerySection: React.FC = () => {
  const { content } = useSiteContent();
  const [filter, setFilter] = useState<'all' | 'wedding' | 'corporate' | 'party'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const filteredItems = filter === 'all' 
    ? content.gallery 
    : content.gallery.filter(item => item.category === filter);

  // Keyboard navigation for multi-photo lightbox
  useEffect(() => {
    if (!selectedPhoto) return;

    const photoList = selectedPhoto.images && selectedPhoto.images.length > 0 
      ? selectedPhoto.images 
      : [selectedPhoto.image].filter(Boolean);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowRight' && photoList.length > 1) {
        setActivePhotoIndex(prev => (prev + 1) % photoList.length);
      } else if (e.key === 'ArrowLeft' && photoList.length > 1) {
        setActivePhotoIndex(prev => (prev - 1 + photoList.length) % photoList.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

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
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => {
            const photoCount = (item.images && item.images.length > 0) ? item.images.length : (item.image ? 1 : 0);
            return (
              <div 
                key={item.id}
                onClick={() => {
                  setSelectedPhoto(item);
                  setActivePhotoIndex(0);
                }}
                className="bg-stone-950 border border-stone-800/80 hover:border-purple-500/50 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Image Container with Zoom & Badge */}
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

                  {/* Multi-Photo Count Badge */}
                  {photoCount > 1 ? (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-stone-950/85 backdrop-blur-sm border border-stone-800 text-purple-300 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                      <Images className="w-3.5 h-3.5 text-purple-400" />
                      <span>{photoCount} Photos</span>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-950/80 border border-stone-800 flex items-center justify-center text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4 text-purple-400" />
                    </div>
                  )}

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
                    <span className="text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>View Photos</span>
                      <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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

      {/* Full Detail Modal / Multi-Photo Lightbox */}
      {selectedPhoto && (() => {
        const photoList = selectedPhoto.images && selectedPhoto.images.length > 0 
          ? selectedPhoto.images 
          : [selectedPhoto.image].filter(Boolean);
        const currentPhoto = photoList[activePhotoIndex] || selectedPhoto.image;

        return (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="bg-stone-950 border border-purple-500/50 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/90 border border-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-lg"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Photo Display with Navigation Arrows */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-stone-900 shrink-0 overflow-hidden select-none">
                <img
                  src={currentPhoto}
                  alt={`${selectedPhoto.title} photo ${activePhotoIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-200"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none" />

                {/* Left / Right Carousel Controls */}
                {photoList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhotoIndex(prev => (prev - 1 + photoList.length) % photoList.length);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-950/80 hover:bg-purple-600 border border-stone-700 hover:border-purple-500 text-white flex items-center justify-center transition-all shadow-xl active:scale-95 z-10"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhotoIndex(prev => (prev + 1) % photoList.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-950/80 hover:bg-purple-600 border border-stone-700 hover:border-purple-500 text-white flex items-center justify-center transition-all shadow-xl active:scale-95 z-10"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Photo Counter Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-stone-950/85 backdrop-blur-md border border-stone-700 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5 text-purple-400" />
                        <span>Photo {activePhotoIndex + 1} of {photoList.length}</span>
                      </span>
                    </div>
                  </>
                )}
                
                {/* Venue & Category overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-stone-200">
                  <span className="flex items-center gap-1.5 font-semibold text-white bg-stone-950/85 px-3 py-1.5 rounded-lg border border-stone-800 backdrop-blur-sm">
                    <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="truncate">{selectedPhoto.venue}, {selectedPhoto.location}</span>
                  </span>
                  <span className="bg-purple-950/90 border border-purple-500/40 text-purple-300 px-3 py-1.5 rounded-lg font-semibold text-xs shrink-0 ml-2">
                    {selectedPhoto.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Multi-Photo Thumbnail Strip (when multiple photos exist) */}
              {photoList.length > 1 && (
                <div className="px-6 py-2.5 bg-stone-900/80 border-b border-stone-800 flex items-center gap-2 overflow-x-auto shrink-0">
                  {photoList.map((thumbUrl, idx) => {
                    const isActive = idx === activePhotoIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border transition-all ${
                          isActive 
                            ? 'border-purple-500 ring-2 ring-purple-500/50 scale-105' 
                            : 'border-stone-800 opacity-60 hover:opacity-100 hover:border-stone-600'
                        }`}
                        title={`View photo ${idx + 1}`}
                      >
                        <img 
                          src={thumbUrl} 
                          alt={`Thumbnail ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Modal Body & Text Content */}
              <div className="p-6 sm:p-8 space-y-4 overflow-y-auto flex-1">
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
                    className="px-5 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors shadow-md shadow-purple-600/30"
                  >
                    Inquire About Similar Setup
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </section>
  );
};
