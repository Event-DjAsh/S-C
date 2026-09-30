export type EventType = 'wedding' | 'corporate' | 'private_party';

export interface DJPackage {
  id: string;
  name: string;
  category: EventType;
  subtitle: string;
  priceFrom: number; // NZD
  hoursIncluded: number;
  featured?: boolean;
  idealFor: string;
  inclusions: string[];
}

export interface PackageAddOn {
  id: string;
  name: string;
  description: string;
  price: number; // NZD
  category: 'audio' | 'lighting' | 'service' | 'atmosphere';
}

export interface AucklandVenue {
  id: string;
  name: string;
  region: 'Waiheke Island' | 'Kumeu & West' | 'Central Auckland' | 'Matakana & Rodney' | 'North Shore';
  capacity: string;
  vibe: string;
  soundNotes: string;
  curfew: string;
}

export interface Testimonial {
  id: string;
  clientNames: string;
  eventType: string;
  venue: string;
  date: string;
  rating: number;
  quote: string;
  highlight: string;
}

export interface MusicSet {
  id: string;
  title: string;
  bpm: number;
  vibe: string;
  description: string;
  genreTags: string[];
  tracklist: string[];
  synthMood: 'chill' | 'party' | 'kiwi' | 'club';
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  eventType: EventType;
  eventDate: string;
  venueName: string;
  estimatedGuests: number;
  selectedPackageId: string;
  selectedAddOns: string[];
  notes: string;
}
