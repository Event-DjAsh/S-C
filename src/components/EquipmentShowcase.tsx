import React from 'react';
import { Sliders, Speaker, Mic2, Sparkles, BatteryCharging, ShieldAlert } from 'lucide-react';

export const EquipmentShowcase: React.FC = () => {
  const specs = [
    {
      icon: <Speaker className="w-5 h-5 text-amber-400" />,
      title: 'QSC & Electro-Voice Audio',
      detail: 'Concert-grade 2000W active tops paired with high-impact 18" subwoofers for punchy, warm, non-fatiguing sound.'
    },
    {
      icon: <Sliders className="w-5 h-5 text-amber-400" />,
      title: 'Pioneer DJ Flagship Decks',
      detail: 'Industry-standard Pioneer DJ control surface delivering seamless live transitions, harmonic mixing, and clean gain staging.'
    },
    {
      icon: <Mic2 className="w-5 h-5 text-amber-400" />,
      title: 'Shure Digital Wireless Mics',
      detail: 'Crystal-clear vocal speech clarity with feedback-suppression DSP. Handhelds and discreet skin-tone lapel mics available.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: 'Chauvet Wireless Uplighting',
      detail: '100% battery-operated RGBAW+UV architectural lighting. Clean aesthetic with zero messy power cords across venue floors.'
    },
    {
      icon: <BatteryCharging className="w-5 h-5 text-amber-400" />,
      title: 'Standalone Battery Ceremony PA',
      detail: 'Dedicated ultra-compact battery audio system for remote clifftop, lawn, or Waiheke beach vows where mains power is unavailable.'
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
      title: '100% Dual Hardware Redundancy',
      detail: 'Every single event is backed up with on-site secondary playback controllers, spare laptops, and backup signal cables.'
    }
  ];

  return (
    <section className="py-20 bg-stone-950 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            Engineering & Reliability
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Concert-Grade Sound & Redundant AV Systems
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base">
            We invest in top-tier audio components to guarantee speech intelligibility during sentimental speeches and thunderous dancefloor presence late at night.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((item, idx) => (
            <div 
              key={idx}
              className="bg-stone-900/50 border border-stone-800/90 rounded-xl p-6 hover:border-stone-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-stone-800/80 border border-stone-700/60 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white font-display mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
