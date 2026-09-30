import React, { useState } from 'react';
import { Calendar, MapPin, Mail, Phone, User, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { AUCKLAND_VENUES } from '../data/djData';
import { EventType } from '../types';
import { useSiteContent } from '../context/SiteContentContext';

interface InquiryFormProps {
  initialPackageId?: string;
  initialAddOnIds?: string[];
  initialEstimate?: number;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialPackageId = 'wedding-full-day',
  initialAddOnIds = [],
  initialEstimate = 2150
}) => {
  const { content, addInquiry } = useSiteContent();
  const { packages } = content;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'wedding' as EventType,
    eventDate: '',
    venue: '',
    guestCount: '100',
    packageId: initialPackageId,
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (initialPackageId) {
      setFormData(prev => ({
        ...prev,
        packageId: initialPackageId,
        eventType: packages.find(p => p.id === initialPackageId)?.category || prev.eventType
      }));
    }
  }, [initialPackageId, packages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.eventDate) {
      setErrorMsg('Please complete all required fields (Name, Email, and Event Date).');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Save lead into in-app Admin Inbox
      addInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.eventDate,
        eventType: formData.eventType,
        venue: formData.venue,
        guestCount: formData.guestCount,
        packageId: formData.packageId,
        notes: formData.notes
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 750);
  };

  const selectedPkg = packages.find(p => p.id === formData.packageId) || packages[0];

  return (
    <section id="inquiry" className="py-20 lg:py-28 bg-stone-950 border-b border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider text-purple-400 uppercase mb-2">
            Check Calendar & Lock In Date
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
            Auckland DJ Availability & Booking Inquiry
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base">
            Dates during Auckland wedding season (October through April) book out 6–12 months in advance. Inquire below for guaranteed availability response within 2 hours.
          </p>
        </div>

        {submitted ? (
          <div className="bg-stone-900 border border-purple-500/60 rounded-2xl p-8 sm:p-10 text-center animate-in fade-in duration-300 shadow-2xl">
            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
              Inquiry Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-2">
              Thank You, {formData.fullName}!
            </h3>

            <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mt-3 leading-relaxed">
              We have received your booking details for <strong className="text-white">{formData.eventDate || 'your event'}</strong> at <strong className="text-white">{formData.venue || 'your chosen Auckland venue'}</strong>.
            </p>

            <div className="my-6 p-5 bg-stone-950 rounded-xl border border-stone-800/80 max-w-md mx-auto text-left text-xs space-y-2 text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Package Selected:</span>
                <span className="font-semibold text-white">{selectedPkg.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Event Type:</span>
                <span className="capitalize font-semibold text-white">{formData.eventType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Guest Count:</span>
                <span className="font-semibold text-white">{formData.guestCount} Guests</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-800">
                <span className="text-stone-400">Estimated Total:</span>
                <span className="font-bold text-purple-400 text-sm tabular-nums">${initialEstimate.toLocaleString()} NZD</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 max-w-md mx-auto">
              Our lead DJ will review our Auckland calendar and send a personalized proposal & run-sheet template to <strong className="text-stone-200">{formData.email}</strong> within 2 hours.
            </p>

            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
          >
            {errorMsg && (
              <div className="p-4 bg-red-950/60 border border-red-800 text-red-200 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Full Name / Contact Person *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Sophie Turner & Liam"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sophie@example.co.nz"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Mobile Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+64 21 000 0000"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Event Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Event Category
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                >
                  <option value="wedding">Wedding (Ceremony & Reception)</option>
                  <option value="corporate">Corporate Gala or Awards Night</option>
                  <option value="private_party">Milestone Birthday / Private Celebration</option>
                </select>
              </div>

              {/* Venue Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Auckland Venue or Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="e.g. Mudbrick Vineyard or Cordis Hotel"
                    list="venue-suggestions"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  />
                  <datalist id="venue-suggestions">
                    {AUCKLAND_VENUES.map(v => (
                      <option key={v.id} value={v.name} />
                    ))}
                    <option value="Private Estate / Marquee Auckland" />
                    <option value="Cable Bay Vineyards, Waiheke" />
                    <option value="Tantalus Estate, Waiheke" />
                    <option value="Markovina Vineyard Estate, Kumeu" />
                  </datalist>
                </div>
              </div>

            </div>

            {/* Package Choice & Guest Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Selected DJ Package
                </label>
                <select
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleChange}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                >
                  {packages.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.hoursIncluded} hrs · ${p.priceFrom} NZD)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Estimated Guest Count
                </label>
                <input
                  type="number"
                  name="guestCount"
                  min="10"
                  max="1000"
                  value={formData.guestCount}
                  onChange={handleChange}
                  placeholder="e.g. 120"
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                Special Requests, Favorite Genres or Schedule Details
              </label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tell us about your event timeline, whether you need MC duties, preferred genres (e.g., 90s R&B, Kiwi dub, House), or any acoustic questions..."
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
            </div>

            {/* Form Footer Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800">
              <div className="text-xs text-stone-400">
                🔒 Your details are 100% private. We respond within 2 hours.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/35 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span>Checking Calendar...</span>
                ) : (
                  <>
                    <span>Submit Booking Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
