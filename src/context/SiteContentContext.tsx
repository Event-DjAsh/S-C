import React, { createContext, useContext, useState, useEffect } from 'react';
import { DJPackage, PackageAddOn, Testimonial } from '../types';
import { DJ_PACKAGES, PACKAGE_ADD_ONS, TESTIMONIALS, FREQUENTLY_ASKED_QUESTIONS } from '../data/djData';

// Image references
import heroWeddingImg from '../assets/images/hero_dj_wedding_1790753841000.jpg';
import weddingReceptionImg from '../assets/images/service_wedding_dj_1790753867187.jpg';
import corporateImg from '../assets/images/service_corporate_dj_1790753853648.jpg';
import partyImg from '../assets/images/service_party_dj_1790753880384.jpg';
import waihekeSunsetImg from '../assets/images/gallery_waiheke_wedding_1790803009137.jpg';
import corporateGalaImg from '../assets/images/gallery_corporate_gala_1790803022108.jpg';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'wedding' | 'corporate' | 'party';
  categoryLabel: string;
  venue: string;
  location: string;
  image: string;       // Primary cover photo
  images?: string[];   // Multiple photos for this event
  guests: string;
  year: string;
  highlight: string;
  description: string;
}

export interface GeneralInfo {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  liabilityInsurance: string;
  depositPercentage: number;
}

export interface HeroInfo {
  headline: string;
  subtitle: string;
  locationBadges: string[];
  reviewsCount: string;
  complianceRate: string;
  insuranceAmount: string;
  showcaseVenue: string;
  showcaseNote: string;
}

export interface ServiceDetail {
  id: 'wedding' | 'corporate' | 'party';
  title: string;
  categoryTag: string;
  description: string;
  priceFrom: number;
  inclusions: string[];
}

export interface LeadInquiry {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  guestCount: string;
  packageId: string;
  notes: string;
  status: 'new' | 'contacted' | 'booked';
}

export interface SecuritySettings {
  adminPassword: string;
}

export interface SiteContentState {
  general: GeneralInfo;
  hero: HeroInfo;
  services: ServiceDetail[];
  packages: DJPackage[];
  addOns: PackageAddOn[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faqs: { question: string; answer: string }[];
  inquiries: LeadInquiry[];
  security: SecuritySettings;
  lastPublishedAt?: string;
}

const STORAGE_KEY = 'sound_celebration_site_content_v2';

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'waiheke-sunset-wedding',
    title: 'Sophie & Liam’s Coastal Vineyard Celebration',
    category: 'wedding',
    categoryLabel: 'Wedding Reception',
    venue: 'Mudbrick Vineyard & Restaurant',
    location: 'Waiheke Island',
    image: waihekeSunsetImg,
    images: [waihekeSunsetImg, heroWeddingImg, weddingReceptionImg],
    guests: '120 Guests',
    year: '2025',
    highlight: 'Outdoor Acoustic Sunset Ceremony to Late-Night Banger Set',
    description: 'Bespoke battery-powered audio setup on the lawn overlooking Hauraki Gulf for the ceremony, followed by an energetic 5-hour indoor dancefloor curated with disco-funk, 90s throwbacks, and modern house.'
  },
  {
    id: 'cordis-annual-gala',
    title: 'TechNZ Annual Excellence Awards Gala',
    category: 'corporate',
    categoryLabel: 'Corporate Gala',
    venue: 'Great Room Ballroom, The Cordis',
    location: 'Central Auckland',
    image: corporateGalaImg,
    images: [corporateGalaImg, corporateImg],
    guests: '380 Guests',
    year: '2025',
    highlight: 'Keynote Audio, Walk-up Stingers & Neon After-Party',
    description: 'Precision wireless speech reinforcement for award presenters, synced live fanfare walk-up tracks for 18 award winners, and a high-voltage purple-themed afterparty set.'
  },
  {
    id: 'kumeu-estate-wedding',
    title: 'Amelia & James’ Romantic Country Estate Wedding',
    category: 'wedding',
    categoryLabel: 'Wedding Reception',
    venue: 'Markovina Vineyard Estate',
    location: 'Kumeu Wine Country',
    image: weddingReceptionImg,
    images: [weddingReceptionImg, waihekeSunsetImg],
    guests: '145 Guests',
    year: '2024',
    highlight: 'First Dance Cloud Effect & Packed Floor Until Midnight',
    description: 'From sentimental acoustic aisle music to wireless vows and an electric final hour where all 145 guests remained singing arm-in-arm on the dancefloor.'
  },
  {
    id: 'waterfront-corporate-summit',
    title: 'Fintech Pacific Summit & Networking Evening',
    category: 'corporate',
    categoryLabel: 'Corporate Event',
    venue: 'The Cloud & Shed 10',
    location: 'Auckland Waterfront',
    image: corporateImg,
    images: [corporateImg, corporateGalaImg],
    guests: '260 Guests',
    year: '2024',
    highlight: 'Lounge Deep House into Energetic Celebration Set',
    description: 'Atmospheric deep house and ambient electronica for the opening drinks, progressing seamlessly into upbeat contemporary anthems as dinner concluded.'
  },
  {
    id: 'rooftop-30th-birthday',
    title: 'Marcus’ 30th Neon Warehouse Milestone',
    category: 'party',
    categoryLabel: 'Private Party',
    venue: 'Glasshouse Morningside',
    location: 'Morningside, Auckland',
    image: partyImg,
    images: [partyImg, heroWeddingImg],
    guests: '95 Guests',
    year: '2024',
    highlight: 'Dual 18" Subwoofers & 2000s Hip-Hop Throwbacks',
    description: 'High-energy milestone birthday party featuring custom song requests, UK garage, R&B anthems, and club-level bass response that kept the room moving non-stop.'
  },
  {
    id: 'cable-bay-wedding',
    title: 'Chloe & Daniel’s Modern Waiheke Nuptials',
    category: 'wedding',
    categoryLabel: 'Wedding Reception',
    venue: 'Cable Bay Vineyards',
    location: 'Waiheke Island',
    image: heroWeddingImg,
    images: [heroWeddingImg, waihekeSunsetImg],
    guests: '110 Guests',
    year: '2024',
    highlight: 'Sunset Lawn Cocktails & High-Octane Late Set',
    description: 'Seamless music pacing matching the island sunset, flawless sound level limiter compliance, and unforgettable live remix transitions.'
  }
];

const DEFAULT_SERVICES: ServiceDetail[] = [
  {
    id: 'wedding',
    title: 'Sophisticated Auckland Wedding DJ & Master of Ceremonies',
    categoryTag: '01. WEDDING CELEBRATIONS · CEREMONY TO LAST DANCE',
    description: 'Your wedding soundtrack should be as distinct as your relationship. We replace generic wedding playlists with a seamless musical journey: romantic acoustic textures as guests arrive, wireless microphone clarity for your vows, chilled sunset vibes during cocktails, and high-energy bangers that pack the dancefloor until midnight.',
    priceFrom: 1450,
    inclusions: [
      'Battery outdoor ceremony PA (no noisy generators)',
      'Discreet skin-tone lapel mics for celebrant & vows',
      'Full MC service available for smooth timeline flow',
      'Custom First Dance edits & low-fog cloud effects'
    ]
  },
  {
    id: 'corporate',
    title: 'Polished Corporate Audio, Keynote Support & After-Party DJ',
    categoryTag: '02. CORPORATE PRODUCTIONS · GALAS, AWARDS & ACTIVATIONS',
    description: 'Corporate events demand crisp sound and acute attention to pacing. We provide corporate-grade wireless microphones, custom walk-up stingers for award recipients, and sound engineering that ensures every executive keynote is clearly heard across the ballroom.',
    priceFrom: 1650,
    inclusions: [
      'Up to 4x Shure wireless handheld speech microphones',
      'Custom award walk-up music stingers matched to cues',
      '$10,000,000 Public Liability Insurance for all venues',
      'Black-tie or business attire dress code adhered to'
    ]
  },
  {
    id: 'party',
    title: 'Uncompromising Dancefloors for Milestone Birthdays & Bashes',
    categoryTag: '03. PRIVATE CELEBRATIONS · 21ST, 30TH, 40TH & 50TH BIRTHDAYS',
    description: 'No filler tracks, no dead air. We bring club-grade sound and festival-quality lighting to private residences, event spaces, rooftop bars, and community halls across Auckland. We mix live, blend throwbacks with current hits, and read the crowd with razor-sharp instinct.',
    priceFrom: 980,
    inclusions: [
      'High-output low-frequency subwoofers for punchy club bass',
      'Computer-synchronized laser and prism dancefloor lighting',
      'Spotify playlist collaboration & song requests welcomed',
      'Cordless mic included for birthday speeches & toasts'
    ]
  }
];

const DEFAULT_STATE: SiteContentState = {
  general: {
    businessName: 'Sound & Celebration',
    tagline: 'Auckland Wedding & Corporate Event DJ Hire',
    phone: '+64 21 892 411',
    email: 'hello@soundandcelebration.co.nz',
    address: 'Auckland, New Zealand',
    instagramUrl: 'https://instagram.com',
    facebookUrl: 'https://facebook.com',
    liabilityInsurance: '$10M NZD Public Liability',
    depositPercentage: 25
  },
  hero: {
    headline: 'Auckland Wedding & Corporate Event DJ Hire.',
    subtitle: 'We design unforgettable celebrations with concert-grade sound, bespoke music curation, and seamless crowd reading. No cheesy microphone gimmicks—just packed dancefloors from first drink to the final song.',
    locationBadges: ['Auckland, New Zealand', 'Waiheke Island', 'Kumeu Wine Country', 'Matakana Coast'],
    reviewsCount: '54+',
    complianceRate: '100%',
    insuranceAmount: '$10M',
    showcaseVenue: 'Mudbrick Vineyard, Waiheke',
    showcaseNote: 'Full-Day Wedding Audio & Late-Night Set'
  },
  services: DEFAULT_SERVICES,
  packages: DJ_PACKAGES,
  addOns: PACKAGE_ADD_ONS,
  gallery: DEFAULT_GALLERY,
  testimonials: TESTIMONIALS,
  faqs: FREQUENTLY_ASKED_QUESTIONS,
  inquiries: [],
  security: {
    adminPassword: 'AucklandDJ2026!'
  }
};

interface SiteContentContextValue {
  content: SiteContentState;
  updateGeneral: (general: Partial<GeneralInfo>) => void;
  updateHero: (hero: Partial<HeroInfo>) => void;
  updateService: (id: 'wedding' | 'corporate' | 'party', service: Partial<ServiceDetail>) => void;
  updatePackage: (id: string, updated: Partial<DJPackage>) => void;
  addPackage: (pkg: DJPackage) => void;
  deletePackage: (id: string) => void;
  updateAddOn: (id: string, updated: Partial<PackageAddOn>) => void;
  addAddOn: (addon: PackageAddOn) => void;
  deleteAddOn: (id: string) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  updateFaq: (index: number, updated: { question: string; answer: string }) => void;
  addFaq: (faq: { question: string; answer: string }) => void;
  deleteFaq: (index: number) => void;
  addInquiry: (inquiry: Omit<LeadInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: LeadInquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  changeAdminPassword: (newPassword: string) => void;
  resetToDefaults: () => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonStr: string) => boolean;
  publishToLiveWebsite: () => Promise<boolean>;
  isPublishing: boolean;
  lastPublishedAt: string | null;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContentState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          general: { ...DEFAULT_STATE.general, ...(parsed.general || {}) },
          hero: { ...DEFAULT_STATE.hero, ...(parsed.hero || {}) },
          services: parsed.services?.length ? parsed.services : DEFAULT_SERVICES,
          packages: parsed.packages?.length ? parsed.packages : DJ_PACKAGES,
          addOns: parsed.addOns?.length ? parsed.addOns : PACKAGE_ADD_ONS,
          gallery: (parsed.gallery?.length ? parsed.gallery : DEFAULT_GALLERY).map((item: any) => ({
            ...item,
            images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.image].filter(Boolean)
          })),
          testimonials: parsed.testimonials?.length ? parsed.testimonials : TESTIMONIALS,
          faqs: parsed.faqs?.length ? parsed.faqs : FREQUENTLY_ASKED_QUESTIONS,
          inquiries: parsed.inquiries || [],
          security: { ...DEFAULT_STATE.security, ...(parsed.security || {}) },
          lastPublishedAt: parsed.lastPublishedAt || undefined
        };
      }
    } catch (e) {
      console.error('Failed to load site content from localStorage:', e);
    }
    return DEFAULT_STATE;
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(() => {
    return content.lastPublishedAt || null;
  });

  // Automatically fetch published content from the backend server on mount
  // so every visitor across devices, incognito, and browsers sees the published website
  useEffect(() => {
    let isMounted = true;
    async function loadPublishedServerContent() {
      try {
        const res = await fetch('/api/content');
        if (!res.ok) return;
        const serverData = await res.json();
        if (serverData && isMounted) {
          const normalized: SiteContentState = {
            ...DEFAULT_STATE,
            ...serverData,
            general: { ...DEFAULT_STATE.general, ...(serverData.general || {}) },
            hero: { ...DEFAULT_STATE.hero, ...(serverData.hero || {}) },
            services: serverData.services?.length ? serverData.services : DEFAULT_SERVICES,
            packages: serverData.packages?.length ? serverData.packages : DJ_PACKAGES,
            addOns: serverData.addOns?.length ? serverData.addOns : PACKAGE_ADD_ONS,
            gallery: (serverData.gallery?.length ? serverData.gallery : DEFAULT_GALLERY).map((item: any) => ({
              ...item,
              images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.image].filter(Boolean)
            })),
            testimonials: serverData.testimonials?.length ? serverData.testimonials : TESTIMONIALS,
            faqs: serverData.faqs?.length ? serverData.faqs : FREQUENTLY_ASKED_QUESTIONS,
            inquiries: serverData.inquiries || [],
            security: { ...DEFAULT_STATE.security, ...(serverData.security || {}) },
            lastPublishedAt: serverData.lastPublishedAt || undefined
          };

          setContent(normalized);
          if (serverData.lastPublishedAt) {
            setLastPublishedAt(serverData.lastPublishedAt);
          }
        } else if (!serverData) {
          // If server file is empty, seed it with initial content
          publishToServer(content);
        }
      } catch (err) {
        console.warn('Could not connect to /api/content, falling back to local storage:', err);
      }
    }

    loadPublishedServerContent();
    return () => { isMounted = false; };
  }, []);

  const publishToServer = async (dataToPublish: SiteContentState): Promise<boolean> => {
    try {
      setIsPublishing(true);
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToPublish)
      });
      if (res.ok) {
        const result = await res.json();
        const timestamp = result.lastPublishedAt || new Date().toISOString();
        setLastPublishedAt(timestamp);
        setContent(prev => ({ ...prev, lastPublishedAt: timestamp }));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Error publishing content to server:', e);
      return false;
    } finally {
      setIsPublishing(false);
    }
  };

  const publishToLiveWebsite = async (): Promise<boolean> => {
    return await publishToServer(content);
  };

  // Auto-sync state to localStorage as immediate offline cache
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save site content to localStorage:', e);
    }
  }, [content]);

  const updateGeneral = (general: Partial<GeneralInfo>) => {
    setContent(prev => ({ ...prev, general: { ...prev.general, ...general } }));
  };

  const updateHero = (hero: Partial<HeroInfo>) => {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, ...hero } }));
  };

  const updateService = (id: 'wedding' | 'corporate' | 'party', service: Partial<ServiceDetail>) => {
    setContent(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...service } : s)
    }));
  };

  const updatePackage = (id: string, updated: Partial<DJPackage>) => {
    setContent(prev => ({
      ...prev,
      packages: prev.packages.map(p => p.id === id ? { ...p, ...updated } : p)
    }));
  };

  const addPackage = (pkg: DJPackage) => {
    setContent(prev => ({ ...prev, packages: [...prev.packages, pkg] }));
  };

  const deletePackage = (id: string) => {
    setContent(prev => ({ ...prev, packages: prev.packages.filter(p => p.id !== id) }));
  };

  const updateAddOn = (id: string, updated: Partial<PackageAddOn>) => {
    setContent(prev => ({
      ...prev,
      addOns: prev.addOns.map(a => a.id === id ? { ...a, ...updated } : a)
    }));
  };

  const addAddOn = (addon: PackageAddOn) => {
    setContent(prev => ({ ...prev, addOns: [...prev.addOns, addon] }));
  };

  const deleteAddOn = (id: string) => {
    setContent(prev => ({ ...prev, addOns: prev.addOns.filter(a => a.id !== id) }));
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setContent(prev => ({
      ...prev,
      gallery: prev.gallery.map(item => {
        if (item.id !== id) return item;
        const merged = { ...item, ...updated };
        if (updated.images && updated.images.length > 0 && !updated.image) {
          merged.image = updated.images[0];
        }
        if (updated.image && (!merged.images || !merged.images.includes(updated.image))) {
          merged.images = [updated.image, ...(merged.images || []).filter(img => img !== updated.image)];
        }
        return merged;
      })
    }));
  };

  const addGalleryItem = (item: GalleryItem) => {
    const images = item.images && item.images.length > 0 ? item.images : [item.image].filter(Boolean);
    const normalized: GalleryItem = {
      ...item,
      image: images[0] || item.image || '',
      images
    };
    setContent(prev => ({ ...prev, gallery: [normalized, ...prev.gallery] }));
  };

  const deleteGalleryItem = (id: string) => {
    setContent(prev => ({ ...prev, gallery: prev.gallery.filter(item => item.id !== id) }));
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...updated } : t)
    }));
  };

  const addTestimonial = (testimonial: Testimonial) => {
    setContent(prev => ({ ...prev, testimonials: [testimonial, ...prev.testimonials] }));
  };

  const deleteTestimonial = (id: string) => {
    setContent(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== id) }));
  };

  const updateFaq = (index: number, updated: { question: string; answer: string }) => {
    setContent(prev => {
      const next = [...prev.faqs];
      next[index] = updated;
      return { ...prev, faqs: next };
    });
  };

  const addFaq = (faq: { question: string; answer: string }) => {
    setContent(prev => ({ ...prev, faqs: [...prev.faqs, faq] }));
  };

  const deleteFaq = (index: number) => {
    setContent(prev => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
  };

  const addInquiry = (inquiryData: Omit<LeadInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newInquiry: LeadInquiry = {
      ...inquiryData,
      id: 'inq_' + Date.now(),
      submittedAt: new Date().toLocaleString('en-NZ', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'new'
    };
    setContent(prev => ({
      ...prev,
      inquiries: [newInquiry, ...(prev.inquiries || [])]
    }));

    // Also persist to server
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    }).catch(err => console.error('Failed to post inquiry to server:', err));
  };

  const updateInquiryStatus = (id: string, status: LeadInquiry['status']) => {
    setContent(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(i => i.id === id ? { ...i, status } : i)
    }));
  };

  const deleteInquiry = (id: string) => {
    setContent(prev => ({
      ...prev,
      inquiries: prev.inquiries.filter(i => i.id !== id)
    }));
  };

  const changeAdminPassword = (newPassword: string) => {
    setContent(prev => ({
      ...prev,
      security: { ...prev.security, adminPassword: newPassword }
    }));
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all site content to original defaults? Any custom edits will be reverted.')) {
      setContent(DEFAULT_STATE);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportBackupJson = () => {
    return JSON.stringify(content, null, 2);
  };

  const importBackupJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.general || !parsed.packages) {
        throw new Error('Invalid backup file structure.');
      }
      setContent(parsed);
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        updateGeneral,
        updateHero,
        updateService,
        updatePackage,
        addPackage,
        deletePackage,
        updateAddOn,
        addAddOn,
        deleteAddOn,
        updateGalleryItem,
        addGalleryItem,
        deleteGalleryItem,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        updateFaq,
        addFaq,
        deleteFaq,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        changeAdminPassword,
        resetToDefaults,
        exportBackupJson,
        importBackupJson,
        publishToLiveWebsite,
        isPublishing,
        lastPublishedAt
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
