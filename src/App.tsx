/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PackageCalculator } from './components/PackageCalculator';
import { MusicVibePlayer } from './components/MusicVibePlayer';
import { AucklandVenues } from './components/AucklandVenues';
import { EquipmentShowcase } from './components/EquipmentShowcase';
import { ReviewsSection } from './components/ReviewsSection';
import { InquiryForm } from './components/InquiryForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import { EventType } from './types';

export default function App() {
  const [githubGuideOpen, setGithubGuideOpen] = useState(false);
  const [inquiryPackageId, setInquiryPackageId] = useState('wedding-full-day');
  const [inquiryAddOns, setInquiryAddOns] = useState<string[]>([]);
  const [inquiryEstimate, setInquiryEstimate] = useState(2150);

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

  const handleSelectServiceForQuote = (serviceType: EventType) => {
    // Scroll to pricing and set type if needed
    scrollToSection('pricing');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950">
      
      {/* 1-Row 3-Zone Fixed Navigation */}
      <Navbar 
        onOpenGithubGuide={() => setGithubGuideOpen(true)}
        onOpenBooking={() => scrollToSection('inquiry')}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onQuoteClick={() => scrollToSection('pricing')}
          onListenClick={() => scrollToSection('music-sets')}
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

        {/* Interactive Music Vibe Player with Web Audio API beat preview */}
        <MusicVibePlayer />

        {/* Auckland Venues & Acoustic Guide (Local SEO powerhouse) */}
        <AucklandVenues />

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

      {/* Quiet Footer */}
      <Footer 
        onOpenGithubGuide={() => setGithubGuideOpen(true)}
      />

      {/* GitHub Pages & Custom Domain Setup Modal */}
      <GitHubPagesModal 
        isOpen={githubGuideOpen}
        onClose={() => setGithubGuideOpen(false)}
      />

    </div>
  );
}
