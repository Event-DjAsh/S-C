/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import { SiteContentProvider } from './context/SiteContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PackageCalculator } from './components/PackageCalculator';
import { GallerySection } from './components/GallerySection';
import { EquipmentShowcase } from './components/EquipmentShowcase';
import { ReviewsSection } from './components/ReviewsSection';
import { InquiryForm } from './components/InquiryForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { SiteEditorModal } from './components/SiteEditorModal';
import { EventType } from './types';

function AppContent() {
  const [inquiryPackageId, setInquiryPackageId] = useState('wedding-full-day');
  const [inquiryAddOns, setInquiryAddOns] = useState<string[]>([]);
  const [inquiryEstimate, setInquiryEstimate] = useState(2150);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyPackage = (packageId: string, addOnIds: string[], totalEstimate: number) => {
    setInquiryPackageId(packageId);
    setInquiryAddOns(addOnIds);
    setInquiryEstimate(totalEstimate);
    scrollToSection('inquiry');
  };

  const handleSelectServiceForQuote = (_serviceType: EventType) => {
    scrollToSection('pricing');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative">
      
      {/* 1-Row 3-Zone Fixed Navigation with Top-Left Logo & Site Editor link */}
      <Navbar 
        onOpenBooking={() => scrollToSection('inquiry')}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onQuoteClick={() => scrollToSection('pricing')}
          onListenClick={() => scrollToSection('gallery')}
        />

        {/* Specialized Services: Weddings, Corporate, Parties */}
        <ServicesSection 
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* Interactive Instant Package & Quote Calculator */}
        <PackageCalculator 
          initialEventType="wedding"
          onApplyPackageToInquiry={handleApplyPackage}
        />

        {/* Gallery of Previous Events */}
        <GallerySection />

        {/* Pro Audio & Hardware Redundancy Showcase */}
        <EquipmentShowcase />

        {/* Verified Auckland Reviews & Testimonials */}
        <ReviewsSection />

        {/* Booking Inquiry & Calendar Availability Form */}
        <InquiryForm 
          initialPackageId={inquiryPackageId}
          initialAddOnIds={inquiryAddOns}
          initialEstimate={inquiryEstimate}
        />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Clean Footer with Brand Logo & Admin trigger */}
      <Footer 
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Floating Website Update Action Button */}
      <aside aria-label="Website Content Studio" className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsEditorOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-stone-900/95 hover:bg-stone-900 border border-purple-500/60 hover:border-purple-400 text-white rounded-full shadow-2xl shadow-purple-950/80 transition-all duration-200 hover:scale-105 active:scale-95"
          title="Open Website Content Editor"
        >
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0 group-hover:rotate-45 transition-transform duration-300">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white tracking-wide">Update Website</span>
            <span className="text-[10px] text-purple-300 font-medium">Edit text, prices & gallery</span>
          </div>
        </button>
      </aside>

      {/* Site Content Management Modal */}
      <SiteEditorModal 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <AppContent />
    </SiteContentProvider>
  );
}
