import { DJPackage, PackageAddOn, AucklandVenue, Testimonial, MusicSet } from '../types';

export const DJ_PACKAGES: DJPackage[] = [
  {
    id: 'wedding-essential',
    name: 'The Reception Classic',
    category: 'wedding',
    subtitle: 'From dinner to the final send-off dance',
    priceFrom: 1450,
    hoursIncluded: 5,
    idealFor: 'Couples with ceremony audio handled on-site who want an unforgettable reception party',
    inclusions: [
      '5 Hours of continuous DJ performance & programming',
      'Premium QSC sound system tailored for up to 150 guests',
      'Pioneer DJ console + secondary redundancy backup setup',
      'Dual wireless Shure digital microphones for speeches',
      'Sound-reactive dancefloor lighting rig (warm amber & vibrant color washes)',
      'Pre-wedding music consultation & custom digital song request portal',
      'Full coverage of dinner background music, cake cutting, first dance & party set',
      'Free travel within greater Auckland region'
    ]
  },
  {
    id: 'wedding-full-day',
    name: 'The Complete Celebration',
    category: 'wedding',
    subtitle: 'Ceremony, cocktail hour, speeches & late-night dancefloor',
    priceFrom: 2150,
    hoursIncluded: 8,
    featured: true,
    idealFor: 'Seamless all-day celebration without having to coordinate multiple audio suppliers',
    inclusions: [
      'Up to 8 Hours of full-day audio coverage',
      'Dedicated remote battery-powered Ceremony sound setup (no messy cables on lawn/beach)',
      'Discreet wireless lapel / handheld microphones for celebrant & vows',
      'Curated acoustic / jazz cocktail hour sound system on the lawn or terrace',
      'Main reception QSC / EV concert-grade audio & subwoofer package',
      'Intelligent computer-controlled dancefloor lighting system',
      'Master of Ceremonies (MC) duties & run-sheet pacing management',
      'Comprehensive song curation (Must-Plays, Cocktail list, Strict Do-Not-Plays)',
      'All vehicle ferry & travel to Waiheke Island or Matakana included'
    ]
  },
  {
    id: 'corporate-gala',
    name: 'Corporate Gala & Awards',
    category: 'corporate',
    subtitle: 'Crisp speech reproduction, walk-up stingers & after-party',
    priceFrom: 1650,
    hoursIncluded: 5,
    featured: true,
    idealFor: 'Annual awards nights, brand activations, end-of-year galas & executive conferences',
    inclusions: [
      '5 Hours of tailored corporate audio, stings & DJ entertainment',
      'Crystal-clear speech reinforcement (high gain-before-feedback DSP tuning)',
      '4x Shure wireless handheld mics with audio tech balancing during speeches',
      'Custom walk-up stingers for award categories and keynote speakers',
      'Polished corporate stage presence (formal black-tie attire standard)',
      '$10M Public Liability Insurance certificate supplied for Auckland venues',
      'High-energy after-party set keeping colleagues and clients dancing',
      'Pre-event run-sheet coordination with your AV manager or event producer'
    ]
  },
  {
    id: 'private-party-energy',
    name: 'Milestone Celebration',
    category: 'private_party',
    subtitle: '21sts, 30ths, 40ths, 50ths, engagements & private bashes',
    priceFrom: 980,
    hoursIncluded: 4,
    idealFor: 'High-energy private celebrations where the dancefloor never empties',
    inclusions: [
      '4 Hours of high-energy live beat-matching and crowd reading',
      'High-output sound system with punchy low-end bass',
      'Sound-activated dynamic lighting & laser prism effects',
      'Wireless microphone for toast and birthday speeches',
      'Collaborative Spotify playlist integration before the party',
      'Seamless mixing across genres: Throwbacks, House, Hip-hop, Kiwi dub & Pop hits',
      'Compact footprint suitable for private homes, hire halls, or rooftop venues'
    ]
  }
];

export const PACKAGE_ADD_ONS: PackageAddOn[] = [
  {
    id: 'ceremony_remote_pa',
    name: 'Outdoor Ceremony Battery Audio',
    description: 'Separate standalone battery PA system with wireless lapel mic for beach/lawn vows.',
    price: 350,
    category: 'audio'
  },
  {
    id: 'dry_ice_clouds',
    name: 'Dancing on Clouds (Dry Ice Effect)',
    description: 'Low-lying, odorless pure white cloud for your first dance or grand reveal. 100% venue-safe.',
    price: 450,
    category: 'atmosphere'
  },
  {
    id: 'uplighting_package',
    name: 'Chauvet Wireless Architectural Uplights (8x)',
    description: 'Battery-powered ambient perimeter uplighting matched to your event color palette.',
    price: 280,
    category: 'lighting'
  },
  {
    id: 'mc_service',
    name: 'Professional Master of Ceremonies (MC)',
    description: 'Polished announcements, speaker cues, dinner coordination, and flawless timeline flow.',
    price: 420,
    category: 'service'
  },
  {
    id: 'extra_hour',
    name: 'Additional DJ Performance Hour',
    description: 'Extend the celebration past midnight. Seamlessly added anytime during the night.',
    price: 180,
    category: 'service'
  },
  {
    id: 'live_sax_feed',
    name: 'Live Saxophone / Musician Audio Integration',
    description: 'Wireless transmitter & dedicated audio sub-mix for performing guest musicians or sax combos.',
    price: 220,
    category: 'audio'
  }
];

export const AUCKLAND_VENUES: AucklandVenue[] = [
  {
    id: 'mudbrick',
    name: 'Mudbrick Vineyard & Restaurant',
    region: 'Waiheke Island',
    capacity: 'Up to 160 guests',
    vibe: 'Romantic Tuscan-inspired stone terraces with Auckland city skyline views',
    soundNotes: 'We bring compact satellite wireless audio for the lavender garden ceremony and seamless indoor reception transition.',
    curfew: 'Midnight (Council compliant)'
  },
  {
    id: 'kumeu-valley',
    name: 'Kumeu Valley Estate',
    region: 'Kumeu & West',
    capacity: 'Up to 200 guests',
    vibe: 'Rustic luxury pine hall with warm timber beams and outdoor bell tower',
    soundNotes: 'Great acoustic warmth. Our warm Chauvet uplighting matches the exposed macrocarpa timber trusses perfectly.',
    curfew: 'Midnight'
  },
  {
    id: 'glasshouse',
    name: 'Glasshouse Morningside',
    region: 'Central Auckland',
    capacity: 'Up to 300 guests',
    vibe: 'Lush urban botanical glass atrium under a canopy of oak and ficus trees',
    soundNotes: 'High glass ceilings require precise directional DSP speaker angling to maintain punchy bass without reverberant slap.',
    curfew: '11:30 PM'
  },
  {
    id: 'hunting-lodge',
    name: 'The Hunting Lodge Winery',
    region: 'Kumeu & West',
    capacity: 'Up to 250 guests',
    vibe: 'Modern barn aesthetic surrounded by 80 acres of organic Waimauku vines',
    soundNotes: 'Dedicated outdoor cocktail speaker feed connects seamlessly to the main Barn reception room.',
    curfew: 'Midnight'
  },
  {
    id: 'cordis',
    name: 'Cordis Auckland (The Great Room)',
    region: 'Central Auckland',
    capacity: 'Up to 800 guests',
    vibe: 'Grand 5-star hotel ballroom for luxury weddings and major corporate awards',
    soundNotes: 'Full concert-grade QSC array and multi-mic corporate speech processing with zero feedback.',
    curfew: '1:00 AM'
  },
  {
    id: 'stables-matakana',
    name: 'The Stables Matakana',
    region: 'Matakana & Rodney',
    capacity: 'Up to 180 guests',
    vibe: 'Equestrian chic surrounded by tranquil rolling hills and Matakana vineyards',
    soundNotes: 'Dual-zone setup for the outdoor covered courtyard and rustic indoor dancefloor.',
    curfew: 'Midnight'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    clientNames: 'Sophie & Liam T.',
    eventType: 'Wedding Reception & Ceremony',
    venue: 'Mudbrick Vineyard, Waiheke Island',
    date: 'February 2026',
    rating: 5,
    highlight: 'Dancefloor was overflowing until the very last song!',
    quote: 'Sound & Celebration was without question the best vendor decision we made. Carlos handled our ceremony audio at the Mudbrick top ridge seamlessly in the wind, and when the party started, nobody left the dancefloor. The transition from our First Dance to 90s throwbacks and Kiwi anthems was pure genius.'
  },
  {
    id: '2',
    clientNames: 'Marcus Chen',
    eventType: 'Annual Corporate Gala Dinner',
    venue: 'Cordis Auckland Great Room',
    date: 'November 2025',
    rating: 5,
    highlight: 'Zero mic squeals, flawless speech stings, and our CEO stayed until 1am',
    quote: 'For our 350-person corporate awards, audio clarity during the presentations was paramount. The speech microphones were crisp and loud without a trace of feedback, and the DJ set afterwards had executive directors and graduate recruits dancing side by side. Completely professional from proposal to pack-down.'
  },
  {
    id: '3',
    clientNames: 'Jessica & Rawiri M.',
    eventType: 'Wedding Ceremony, MC & Reception',
    venue: 'Kumeu Valley Estate',
    date: 'January 2026',
    rating: 5,
    highlight: 'He doubled as our MC and kept the entire evening moving effortlessly',
    quote: 'Having our DJ also act as MC was a game changer. The timing of speeches, cake cutting, and our first dance was so relaxed. And the music! He respected every single song on our playlist and read the crowd like an absolute maestro.'
  },
  {
    id: '4',
    clientNames: 'Elena & Dave P.',
    eventType: '40th Birthday & Anniversary Bash',
    venue: 'Glasshouse Morningside',
    date: 'March 2026',
    rating: 5,
    highlight: 'Top-tier equipment and unmatched sound quality in a tricky acoustic room',
    quote: 'Glasshouse is notoriously echoey with all that glass, but their sound setup sounded crisp, warm, and club-quality. Everyone remarked on how incredible the vibe was. We will be booking them again for every major milestone!'
  }
];

export const MUSIC_SETS: MusicSet[] = [
  {
    id: 'sunset-lounge',
    title: 'Auckland Sunset & Cocktail Lounge',
    bpm: 112,
    vibe: 'Sun-drenched, sophisticated, warm organic grooves',
    description: 'Perfect for guest arrivals, outdoor canapés on the vineyard terrace, and relaxed conversation.',
    genreTags: ['Indie Pop', 'Nu-Disco', 'Chilled House', 'Soulful Acoustic'],
    tracklist: [
      'Leon Bridges – Texas Sun',
      'Flight Facilities – Crave You (Chill Edit)',
      'Fleetwood Mac – Dreams (Gigamesh Re-edit)',
      'FKJ & Masego – Tadow',
      'Lorde – Solar Power',
      'Samm Henshaw – Church'
    ],
    synthMood: 'chill'
  },
  {
    id: 'reception-bangers',
    title: 'Peak-Hour Wedding & Party Heat',
    bpm: 124,
    vibe: 'High-energy, multi-generational dancefloor madness',
    description: 'Guaranteed floor-fillers bridging timeless funk, 90s/2000s R&B singalongs, and modern anthems.',
    genreTags: ['Funk & Disco', '90s/00s R&B', 'Sing-Along Hits', 'Floor-Fillers'],
    tracklist: [
      'Earth, Wind & Fire – September',
      'Daft Punk – One More Time',
      'Whitney Houston – I Wanna Dance With Somebody',
      'Montell Jordan – This Is How We Do It',
      'Dua Lipa – Levitating',
      'ABBA – Gimme! Gimme! Gimme! (Club Mix)'
    ],
    synthMood: 'party'
  },
  {
    id: 'kiwi-roots',
    title: 'Aotearoa Summer & Kiwi Classics',
    bpm: 118,
    vibe: 'BBQ dub, uplifting Pacific soul, and homegrown anthems',
    description: 'Nothing unites an Auckland celebration like classic homegrown Kiwi sounds under the stars.',
    genreTags: ['Kiwi Dub', 'Aotearoa Reggae', 'Pacific Soul', 'Six60 & L.A.B'],
    tracklist: [
      'Fat Freddy’s Drop – Wandering Eye',
      'L.A.B – In the Air',
      'Six60 – Don’t Forget Your Roots',
      'Kora – Flow',
      'Shapeshifter – In Colour',
      'Stan Walker – Take It Easy'
    ],
    synthMood: 'kiwi'
  },
  {
    id: 'late-night-club',
    title: 'After-Dark Tech House & Club Anthems',
    bpm: 128,
    vibe: 'Bass-heavy, driving, festival and late-night warehouse energy',
    description: 'For when the formal proceedings end and the core crew wants to party until the lights come on.',
    genreTags: ['Tech House', 'Remixed Anthems', 'Deep Bass', 'Festival Energy'],
    tracklist: [
      'Fisher – Losing It (Auckland Edit)',
      'Dom Dolla – Rhyme Dust',
      'Peggy Gou – (It Goes Like) Nanana',
      'RÜFÜS DU SOL – Innerbloom (What So Not Edit)',
      'Fred again.. – Jungle',
      'Bicep – Glue'
    ],
    synthMood: 'club'
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: 'How do you handle Auckland venue sound limiters & council noise restrictions?',
    answer: 'Most popular venues in Auckland, Waiheke, and Kumeu operate under strict Auckland Council decibel limiters (typically 85dB to 92dB Leq). We tune our sound processors with directional subwoofers and intelligent high-frequency dispersion so the dancefloor feels punchy and energetic while meeting venue decibel thresholds effortlessly.'
  },
  {
    question: 'Are travel fees included for Waiheke Island and Matakana?',
    answer: 'For our wedding packages, standard greater Auckland travel (CBD, North Shore, West Auckland, Kumeu, South Auckland) is 100% included. For Waiheke Island, our Full-Day package includes all Sealink vehicle ferry transit and gear transport logistics so there are zero surprise invoices.'
  },
  {
    question: 'Can we give you a Spotify playlist and a strict Do-Not-Play list?',
    answer: 'Yes! Upon booking, you receive access to your private Sound & Celebration music planning portal. You can share your Spotify playlists for must-play tracks, cocktail vibes, and list any songs or genres you want strictly banned.'
  },
  {
    question: 'What happens if equipment fails on the day?',
    answer: 'We operate with dual-redundancy on all mission-critical gear. Every booking includes two independent DJ playback systems, secondary backup laptops, multiple wireless microphones, and backup XLR cables and power distribution.'
  },
  {
    question: 'Do you carry Public Liability Insurance for Auckland venues?',
    answer: 'Yes, we hold comprehensive $10,000,000 NZD Public Liability Insurance and all our electrical gear is regularly Test & Tagged in accordance with AS/NZS 3760 standards. We provide compliance certificates directly to venue managers upon request.'
  },
  {
    question: 'How does payment and reserving our event date work?',
    answer: 'A standard 25% deposit secures your event date on our calendar. The remaining balance is due 14 days prior to your celebration. We accept NZ direct bank deposit and all major credit cards.'
  }
];
