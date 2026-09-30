/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

  // Dedicated URL route detection: #/admin or ?admin
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash === '#/admin' || hash === '#admin' || search.includes('admin=true') || search.includes('admin')) {
        setIsEditorOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Discrete secret keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A for site owner
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsEditorOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    // Reset URL hash if currently on #/admin
    if (window.location.hash === '#/admin' || window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

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
      
      {/* 1-Row 3-Zone Fixed Navigation - 100% clean for customers, no update button */}
      <Navbar 
        onOpenBooking={() => scrollToSection('inquiry')}
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

      {/* Clean Customer Footer - zero visible admin links */}
      <Footer 
        onAdminTrigger={() => setIsEditorOpen(true)}
      />

      {/* Secure Password-Protected Administrator Studio Modal (Only open via #/admin or secret trigger) */}
      <SiteEditorModal 
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
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
