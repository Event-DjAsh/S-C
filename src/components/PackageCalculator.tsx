import React, { useState, useId } from 'react';
import { Check, Plus, Minus, Calculator, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { DJ_PACKAGES, PACKAGE_ADD_ONS } from '../data/djData';
import { EventType } from '../types';

interface PackageCalculatorProps {
  initialEventType?: EventType;
  onApplyPackageToInquiry: (packageId: string, addOnIds: string[], totalEstimate: number) => void;
}

export const PackageCalculator: React.FC<PackageCalculatorProps> = ({ 
  initialEventType = 'wedding',
  onApplyPackageToInquiry
}) => {
  const [selectedType, setSelectedType] = useState<EventType>(initialEventType);
  
  // Find packages matching category
  const categoryPackages = DJ_PACKAGES.filter(p => p.category === selectedType);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    categoryPackages[0]?.id || DJ_PACKAGES[0].id
  );

  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [guestTier, setGuestTier] = useState<string>('medium'); // small (<80), medium (80-150), large (150-250), extra (250+)
  const guestSizeId = useId();

  // If selected package doesn't match category, update it
  React.useEffect(() => {
    const matching = DJ_PACKAGES.find(p => p.category === selectedType);
    if (matching) {
      setSelectedPackageId(matching.id);
    }
  }, [selectedType]);

  const currentPackage = DJ_PACKAGES.find(p => p.id === selectedPackageId) || DJ_PACKAGES[0];

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Sound scaling adjustment for very large venues / guests
  const soundScaleFee = guestTier === 'extra' ? 250 : guestTier === 'large' ? 120 : 0;

  // Add-ons total
  const addOnsTotal = selectedAddOnIds.reduce((sum, id) => {
    const item = PACKAGE_ADD_ONS.find(a => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalEstimate = currentPackage.priceFrom + addOnsTotal + soundScaleFee;

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-stone-900/60 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Transparent Pricing in NZD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
            Instant Package & Price Estimator
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base">
            Customize your Auckland event entertainment in real-time. No hidden travel fees within greater Auckland.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Select Event Type */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                1. Select Event Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedType('wedding')}
                  className={`py-3 px-3 text-xs sm:text-sm font-semibold rounded-lg border transition-all text-center ${
                    selectedType === 'wedding'
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                      : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  Weddings
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('corporate')}
                  className={`py-3 px-3 text-xs sm:text-sm font-semibold rounded-lg border transition-all text-center ${
                    selectedType === 'corporate'
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                      : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  Corporate
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType('private_party')}
                  className={`py-3 px-3 text-xs sm:text-sm font-semibold rounded-lg border transition-all text-center ${
                    selectedType === 'private_party'
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                      : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                  }`}
                >
                  Private Parties
                </button>
              </div>
            </div>

            {/* 2. Choose Base Package */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                2. Choose Base Package
              </label>
              <div className="space-y-3">
                {DJ_PACKAGES.filter(p => p.category === selectedType).map(pkg => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedPackageId === pkg.id
                        ? 'border-amber-400/90 bg-stone-900 shadow-md ring-1 ring-amber-400/50'
                        : 'border-stone-800 bg-stone-900/30 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-base">{pkg.name}</span>
                          {pkg.featured && (
                            <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-400 mt-1">{pkg.subtitle}</p>
                        <div className="text-xs text-stone-500 mt-2">
                          Includes {pkg.hoursIncluded} hours coverage · High-fidelity audio setup
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg sm:text-xl font-bold text-amber-400 tabular-nums">
                          ${pkg.priceFrom.toLocaleString()} <span className="text-xs text-stone-400 font-normal">NZD</span>
                        </div>
                        <div className="text-[11px] text-stone-500">Base rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Expected Guest Size & Room Scale */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor={guestSizeId} className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  3. Guest Attendance (Acoustic & Subwoofer Calibration)
                </label>
                <span className="text-xs text-stone-400">
                  {guestTier === 'small' && 'Up to 80 Guests (Compact Setup)'}
                  {guestTier === 'medium' && '80 – 150 Guests (Standard Dual PA)'}
                  {guestTier === 'large' && '150 – 250 Guests (+ Dedicated 18" Subwoofer)'}
                  {guestTier === 'extra' && '250+ Guests (Full Multi-zone Line Array System)'}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'small', label: '< 80', desc: 'Intimate' },
                  { id: 'medium', label: '80–150', desc: 'Standard' },
                  { id: 'large', label: '150–250', desc: 'Subwoofer (+NZ$120)' },
                  { id: 'extra', label: '250+', desc: 'Concert (+NZ$250)' },
                ].map(tier => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setGuestTier(tier.id)}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      guestTier === tier.id
                        ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                        : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-semibold tabular-nums">{tier.label}</div>
                    <div className="text-[10px] text-stone-500 truncate">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Enhancement Add-Ons */}
            <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                4. Select Optional Enhancements
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACKAGE_ADD_ONS.map(addon => {
                  const isChecked = selectedAddOnIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-amber-400/80 bg-stone-900/90 text-white'
                          : 'border-stone-800 bg-stone-900/30 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        isChecked ? 'bg-amber-400 border-amber-400 text-stone-950' : 'border-stone-700 bg-stone-900'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-stone-200 truncate">{addon.name}</span>
                          <span className="text-xs font-bold text-amber-400 shrink-0 ml-2 tabular-nums">
                            +${addon.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2 leading-tight">
                          {addon.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Live Quote Summary (Right 5 Cols - Sticky) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-stone-950 border border-amber-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 blur-3xl pointer-events-none rounded-full" />
              
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Estimated Quote</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{currentPackage.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
                    ${totalEstimate.toLocaleString()}
                  </span>
                  <span className="block text-[11px] text-stone-400">NZD incl. GST</span>
                </div>
              </div>

              {/* Inclusions summary list */}
              <div className="py-4 space-y-2 border-b border-stone-800 text-xs">
                <div className="flex items-center justify-between text-stone-300">
                  <span>Base Package ({currentPackage.hoursIncluded} hrs DJ set):</span>
                  <span className="font-semibold text-white tabular-nums">${currentPackage.priceFrom}</span>
                </div>

                {soundScaleFee > 0 && (
                  <div className="flex items-center justify-between text-stone-300">
                    <span>Acoustic Room Scaling ({guestTier === 'extra' ? '250+' : '150-250'} guests):</span>
                    <span className="font-semibold text-amber-400 tabular-nums">+${soundScaleFee}</span>
                  </div>
                )}

                {selectedAddOnIds.map(id => {
                  const item = PACKAGE_ADD_ONS.find(a => a.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex items-center justify-between text-stone-300">
                      <span className="truncate pr-2">{item.name}:</span>
                      <span className="font-semibold text-amber-400 tabular-nums shrink-0">+${item.price}</span>
                    </div>
                  );
                })}
              </div>

              {/* Package highlights bullet list */}
              <div className="py-4 space-y-2 text-xs text-stone-400">
                <div className="text-stone-300 font-semibold text-[11px] uppercase tracking-wider mb-1">
                  Guaranteed Deliverables:
                </div>
                {currentPackage.inclusions.slice(0, 4).map((inc, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{inc}</span>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="py-3 bg-stone-900/50 rounded-lg p-3 text-[11px] text-stone-400 space-y-1 mb-6">
                <div className="flex items-center gap-1.5 text-stone-300 font-medium">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>No surprise invoices or Auckland travel charges</span>
                </div>
                <div className="text-stone-500 pl-5">
                  Deposit is only 25% to secure your date. Backup audio hardware always included.
                </div>
              </div>

              {/* Transfer Quote into Inquiry Form */}
              <button
                type="button"
                onClick={() => onApplyPackageToInquiry(selectedPackageId, selectedAddOnIds, totalEstimate)}
                className="w-full py-4 px-6 text-sm font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/10 active:scale-[0.98]"
              >
                <span>Lock In This Quote & Check Date</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
