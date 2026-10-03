import React, { useState, useEffect } from 'react';
import { 
  X, Save, RotateCcw, Download, Upload, Plus, Trash2, 
  Building, Sparkles, DollarSign, Image as ImageIcon, MessageSquare, 
  HelpCircle, Inbox, CheckCircle2, ChevronRight, Sliders, ExternalLink,
  Lock, Eye, EyeOff, LogOut, Key, ShieldCheck, Copy, Check,
  UploadCloud, Loader2, ImagePlus, Star, Send, Globe
} from 'lucide-react';
import { useSiteContent, GalleryItem } from '../context/SiteContentContext';
import { DJPackage, PackageAddOn, Testimonial } from '../types';
import { optimizeMultiplePhotos } from '../utils/imageOptimizer';
import heroPartyImg from '../assets/images/hero_dj_party.jpg';

interface SiteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SiteEditorModal: React.FC<SiteEditorModalProps> = ({ isOpen, onClose }) => {
  const { 
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
    updateInquiryStatus,
    deleteInquiry,
    changeAdminPassword,
    resetToDefaults,
    exportBackupJson,
    importBackupJson,
    publishToLiveWebsite,
    isPublishing,
    lastPublishedAt
  } = useSiteContent();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sc_admin_auth') === 'true';
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Password change state
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'general' | 'hero' | 'packages' | 'gallery' | 'services' | 'reviews' | 'faqs' | 'inbox' | 'backup' | 'security'
  >('general');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadingEventId, setUploadingEventId] = useState<string | null>(null);
  const [uploadProgressText, setUploadProgressText] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleUploadPhotos = async (eventId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingEventId(eventId);
    setUploadProgressText(`Optimizing ${files.length} photo(s) from laptop...`);
    try {
      const optimizedUrls = await optimizeMultiplePhotos(files, (completed, total) => {
        setUploadProgressText(`Optimizing ${completed}/${total} photo(s)...`);
      });

      if (optimizedUrls.length > 0) {
        const currentItem = content.gallery.find(g => g.id === eventId);
        const existingImages = currentItem?.images || (currentItem?.image ? [currentItem.image] : []);
        const newImages = [...existingImages, ...optimizedUrls];

        updateGalleryItem(eventId, {
          images: newImages,
          image: currentItem?.image || newImages[0]
        });
        showToast(`Added ${optimizedUrls.length} photo(s) from laptop!`);
      }
    } catch (error) {
      console.error('Failed to upload photos from laptop:', error);
      alert('Failed to process photos from laptop. Please ensure they are valid image files.');
    } finally {
      setUploadingEventId(null);
      setUploadProgressText(null);
    }
  };

  const handleSetCoverPhoto = (eventId: string, photoUrl: string) => {
    const currentItem = content.gallery.find(g => g.id === eventId);
    if (!currentItem) return;
    const currentImages = currentItem.images || [currentItem.image];
    const updatedImages = [photoUrl, ...currentImages.filter(img => img !== photoUrl)];
    updateGalleryItem(eventId, {
      image: photoUrl,
      images: updatedImages
    });
    showToast('Set as Primary Cover Photo');
  };

  const handleRemovePhoto = (eventId: string, photoIndex: number) => {
    const currentItem = content.gallery.find(g => g.id === eventId);
    if (!currentItem) return;
    const currentImages = currentItem.images || [currentItem.image];
    const newImages = currentImages.filter((_, idx) => idx !== photoIndex);
    updateGalleryItem(eventId, {
      images: newImages,
      image: newImages[0] || ''
    });
    showToast('Photo removed from event');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = content.security?.adminPassword || 'AucklandDJ2026!';
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sc_admin_auth', 'true');
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError('Invalid Administrator Password. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sc_admin_auth');
    setIsAuthenticated(false);
    onClose();
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = content.security?.adminPassword || 'AucklandDJ2026!';
    if (currentPasswordInput !== correctPassword) {
      setPasswordChangeMsg({ text: 'Current password is incorrect.', success: false });
      return;
    }
    if (newPasswordInput.length < 6) {
      setPasswordChangeMsg({ text: 'New password must be at least 6 characters.', success: false });
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeMsg({ text: 'New passwords do not match.', success: false });
      return;
    }

    changeAdminPassword(newPasswordInput);
    setPasswordChangeMsg({ text: 'Password successfully changed and saved!', success: true });
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
  };

  if (!isOpen) return null;

  // 1. RESTRICTED ACCESS LOGIN SCREEN (When not yet logged in)
  if (!isAuthenticated) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div 
          className="bg-stone-950 border border-purple-500/60 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          {/* Close / Return button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg bg-stone-900 border border-stone-800 transition-colors"
            title="Return to customer website"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/50 flex items-center justify-center text-purple-400 mx-auto mb-3 shadow-lg shadow-purple-600/20">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white font-display">
              Administrator Access Portal
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Restricted management studio for {content.general.businessName}. Please enter your credentials.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Admin Master Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={e => {
                    setPasswordInput(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="Enter administrator password"
                  autoFocus
                  className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-3 pr-10 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-500 hover:text-stone-300 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <p className="text-xs text-red-400 mt-1.5 font-medium">{loginError}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-lg transition-colors shadow-lg shadow-purple-600/30 active:scale-[0.98]"
              >
                Sign In to Admin Studio
              </button>
            </div>
          </form>

          {/* Security note */}
          <div className="mt-6 pt-5 border-t border-stone-900 text-center">
            <p className="text-[11px] text-stone-500">
              Initial setup default password: <code className="text-purple-400 font-mono font-bold bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40">AucklandDJ2026!</code>
            </p>
            <p className="text-[10px] text-stone-600 mt-1">
              (You can change this password inside the Security tab once logged in)
            </p>
            <button
              onClick={onClose}
              className="mt-3 text-xs text-stone-400 hover:text-purple-300 transition-colors underline"
            >
              &larr; Return to Customer Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN STUDIO
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200">
      <div 
        className="bg-stone-950 border border-purple-500/50 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/50 flex items-center justify-center text-purple-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-display">
                  Website Content Management Studio
                </h2>
                <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-semibold">
                  Admin Authenticated
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Hidden from public visitors. Changes update your live website instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {toastMessage && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-lg animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Prominent Publish to Live Website Action */}
            <button
              onClick={async () => {
                const res = await publishToLiveWebsite();
                if (res.success) {
                  showToast('🚀 Live Website Updated! Changes are now live for all visitors.');
                } else {
                  showToast(res.message || 'Saved in browser storage');
                }
              }}
              disabled={isPublishing}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/35 active:scale-95 disabled:opacity-50"
              title="Publish all updates to the customer-facing live website"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Live Site</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-red-950/40 text-stone-400 hover:text-red-300 transition-colors border border-stone-800 flex items-center gap-1.5 text-xs font-semibold"
              title="Log out from admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors border border-stone-800"
              aria-label="Close Site Editor"
              title="Return to public view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Workspace Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-stone-800 bg-stone-950/80 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
            {[
              { id: 'general', label: 'Business & Contact', icon: <Building className="w-4 h-4" /> },
              { id: 'hero', label: 'Hero & Announcements', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'packages', label: 'Packages & Pricing', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'gallery', label: 'Event Gallery', icon: <ImageIcon className="w-4 h-4" /> },
              { id: 'services', label: 'Service Descriptions', icon: <Sliders className="w-4 h-4" /> },
              { id: 'reviews', label: 'Client Reviews', icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-4 h-4" /> },
              { 
                id: 'inbox', 
                label: 'Inquiry Leads', 
                icon: <Inbox className="w-4 h-4" />,
                badge: content.inquiries?.length || 0 
              },
              { id: 'security', label: 'Admin Security', icon: <Lock className="w-4 h-4" /> },
              { id: 'backup', label: 'Backup & Restore', icon: <Download className="w-4 h-4" /> }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-purple-700' : 'bg-purple-950 text-purple-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Main Editor Scrollable Canvas */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">

            {/* TAB 1: Business & Contact */}
            {activeTab === 'general' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Business Profile & Contact Details</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    These details appear in your navigation bar, footer, and quotation calculations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Business Name</label>
                    <input 
                      type="text" 
                      value={content.general.businessName}
                      onChange={e => {
                        updateGeneral({ businessName: e.target.value });
                        showToast('Updated Business Name');
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Brand Tagline</label>
                    <input 
                      type="text" 
                      value={content.general.tagline}
                      onChange={e => {
                        updateGeneral({ tagline: e.target.value });
                        showToast('Updated Tagline');
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={content.general.phone}
                      onChange={e => {
                        updateGeneral({ phone: e.target.value });
                        showToast('Updated Phone');
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={content.general.email}
                      onChange={e => {
                        updateGeneral({ email: e.target.value });
                        showToast('Updated Email');
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Base Location</label>
                    <input 
                      type="text" 
                      value={content.general.address}
                      onChange={e => {
                        updateGeneral({ address: e.target.value });
                        showToast('Updated Location');
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Public Liability Insurance Coverage</label>
                    <input 
                      type="text" 
                      value={content.general.liabilityInsurance}
                      onChange={e => {
                        updateGeneral({ liabilityInsurance: e.target.value });
                        showToast('Updated Liability Insurance');
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Required Deposit (%)</label>
                    <input 
                      type="number" 
                      min="10"
                      max="100"
                      value={content.general.depositPercentage}
                      onChange={e => {
                        updateGeneral({ depositPercentage: parseInt(e.target.value) || 25 });
                        showToast('Updated Deposit');
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Instagram Link</label>
                    <input 
                      type="text" 
                      value={content.general.instagramUrl}
                      onChange={e => updateGeneral({ instagramUrl: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Hero & Announcements */}
            {activeTab === 'hero' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Hero Headline & Value Proposition</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Control the primary message visitors see the second they arrive.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Main H1 Headline</label>
                    <input 
                      type="text" 
                      value={content.hero.headline}
                      onChange={e => {
                        updateHero({ headline: e.target.value });
                        showToast('Updated Headline');
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Subtitle / Proposition</label>
                    <textarea 
                      rows={3}
                      value={content.hero.subtitle}
                      onChange={e => {
                        updateHero({ subtitle: e.target.value });
                        showToast('Updated Subtitle');
                      }}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Reviews Trust Metric</label>
                      <input 
                        type="text" 
                        value={content.hero.reviewsCount}
                        onChange={e => updateHero({ reviewsCount: e.target.value })}
                        placeholder="e.g. 54+"
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Sound Limit Stat</label>
                      <input 
                        type="text" 
                        value={content.hero.complianceRate}
                        onChange={e => updateHero({ complianceRate: e.target.value })}
                        placeholder="e.g. 100%"
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Liability Cover Stat</label>
                      <input 
                        type="text" 
                        value={content.hero.insuranceAmount}
                        onChange={e => updateHero({ insuranceAmount: e.target.value })}
                        placeholder="e.g. $10M"
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Hero Showcase Venue Tag</label>
                      <input 
                        type="text" 
                        value={content.hero.showcaseVenue}
                        onChange={e => updateHero({ showcaseVenue: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">Showcase Caption Note</label>
                      <input 
                        type="text" 
                        value={content.hero.showcaseNote}
                        onChange={e => updateHero({ showcaseNote: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Active Hero Visual Preview */}
                  <div className="pt-4 border-t border-stone-800">
                    <label className="block text-xs font-semibold text-stone-300 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span>Active Hero Visual (Real DJ Gig Photo)</span>
                      </span>
                      <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-semibold">
                        Real Gig Perspective
                      </span>
                    </label>
                    <div className="relative rounded-xl overflow-hidden border border-stone-800 aspect-[16/9] max-w-lg bg-stone-950">
                      <img 
                        src={heroPartyImg} 
                        alt="Hero Live Party" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 left-2 right-2 bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800/80 text-[11px] text-stone-300 flex items-center justify-between">
                        <span className="font-semibold text-white">{content.hero.showcaseVenue}</span>
                        <span className="text-purple-300">{content.hero.showcaseNote}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Packages & Pricing */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Packages & Pricing Manager</h3>
                    <p className="text-xs text-stone-400 mt-1">
                      Instantly change prices, included hours, and bullet deliverables across the quote calculator.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newId = 'pkg_' + Date.now();
                      addPackage({
                        id: newId,
                        name: 'New Custom Package',
                        category: 'wedding',
                        subtitle: 'Tailored event entertainment',
                        priceFrom: 1200,
                        hoursIncluded: 4,
                        idealFor: 'Custom event requirements',
                        inclusions: [
                          'Custom performance duration',
                          'Concert-grade sound system',
                          'Wireless speech microphone',
                          'Pre-event music consultation'
                        ]
                      });
                      showToast('Added New Package');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-md shadow-purple-600/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Package</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.packages.map(pkg => (
                    <div 
                      key={pkg.id}
                      className="bg-stone-900/60 border border-stone-800 rounded-xl p-5 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-400 mb-1">Package Name</label>
                            <input 
                              type="text" 
                              value={pkg.name}
                              onChange={e => {
                                updatePackage(pkg.id, { name: e.target.value });
                                showToast('Updated Package Name');
                              }}
                              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-stone-400 mb-1">Base Price (NZD)</label>
                            <input 
                              type="number" 
                              value={pkg.priceFrom}
                              onChange={e => {
                                updatePackage(pkg.id, { priceFrom: parseInt(e.target.value) || 0 });
                                showToast('Updated Price');
                              }}
                              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-stone-400 mb-1">Included Hours</label>
                            <input 
                              type="number" 
                              value={pkg.hoursIncluded}
                              onChange={e => updatePackage(pkg.id, { hoursIncluded: parseInt(e.target.value) || 1 })}
                              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete package "${pkg.name}"?`)) {
                              deletePackage(pkg.id);
                              showToast('Package Deleted');
                            }
                          }}
                          className="p-2 text-stone-500 hover:text-red-400 transition-colors"
                          title="Delete package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">Subtitle / Quick Pitch</label>
                          <input 
                            type="text" 
                            value={pkg.subtitle}
                            onChange={e => updatePackage(pkg.id, { subtitle: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">Category</label>
                          <select
                            value={pkg.category}
                            onChange={e => updatePackage(pkg.id, { category: e.target.value as any })}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                          >
                            <option value="wedding">Weddings</option>
                            <option value="corporate">Corporate</option>
                            <option value="private_party">Private Party</option>
                          </select>
                        </div>
                      </div>

                      {/* Inclusions editor */}
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                          Inclusions (One bullet item per line)
                        </label>
                        <textarea 
                          rows={4}
                          value={pkg.inclusions.join('\n')}
                          onChange={e => {
                            const lines = e.target.value.split('\n').filter(l => l.trim() !== '');
                            updatePackage(pkg.id, { inclusions: lines });
                          }}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add-ons pricing sub-section */}
                <div className="pt-6 border-t border-stone-800">
                  <h4 className="text-base font-bold text-white font-display mb-3">Add-On Enhancements</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.addOns.map(addon => (
                      <div key={addon.id} className="p-3 bg-stone-900 border border-stone-800 rounded-lg flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <input 
                            type="text" 
                            value={addon.name}
                            onChange={e => updateAddOn(addon.id, { name: e.target.value })}
                            className="bg-transparent text-xs font-semibold text-white w-full border-b border-stone-700 pb-0.5 focus:outline-none focus:border-purple-500"
                          />
                          <input 
                            type="text" 
                            value={addon.description}
                            onChange={e => updateAddOn(addon.id, { description: e.target.value })}
                            className="bg-transparent text-[11px] text-stone-400 w-full mt-1 border-b border-transparent focus:border-stone-700 focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-xs text-purple-400 font-bold">$</span>
                          <input 
                            type="number" 
                            value={addon.price}
                            onChange={e => updateAddOn(addon.id, { price: parseInt(e.target.value) || 0 })}
                            className="w-16 bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-purple-400 font-bold text-right focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Gallery of Previous Events */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Previous Events Gallery</h3>
                    <p className="text-xs text-stone-400 mt-1">
                      Add real events you have performed at. Upload images or paste photo URLs.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newId = 'gal_' + Date.now();
                      addGalleryItem({
                        id: newId,
                        title: 'New Auckland Event Showcase',
                        category: 'wedding',
                        categoryLabel: 'Wedding Reception',
                        venue: 'Venue Name, Auckland',
                        location: 'Auckland',
                        image: '',
                        images: [],
                        guests: '100 Guests',
                        year: new Date().getFullYear().toString(),
                        highlight: 'Packed dancefloor all night',
                        description: 'Custom music programming and crisp acoustic audio.'
                      });
                      showToast('Added New Gallery Event');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-md shadow-purple-600/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Event to Gallery</span>
                  </button>
                </div>

                {/* Publishing Guidance Banner */}
                <div className="bg-purple-950/40 border border-purple-500/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-stone-300">
                    <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>
                      Upload photos from your laptop or modify details below. When ready, click <strong>"Publish to Live Site"</strong> to immediately publish them to the live website for all visitors.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      const res = await publishToLiveWebsite();
                      if (res.success) {
                        showToast('🚀 Published Live to Website!');
                      } else {
                        showToast(res.message || 'Saved locally');
                      }
                    }}
                    disabled={isPublishing}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-xs whitespace-nowrap shadow-md shadow-purple-600/30 shrink-0 flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>{isPublishing ? 'Publishing...' : 'Publish Live Now'}</span>
                  </button>
                </div>

                {content.gallery.length === 0 ? (
                  <div className="text-center py-12 px-4 border border-dashed border-stone-800 rounded-xl bg-stone-900/30">
                    <div className="w-12 h-12 rounded-full bg-purple-950/60 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400 mb-3">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">Your Gallery is Currently Empty</h4>
                    <p className="text-xs text-stone-400 max-w-sm mx-auto mb-4">
                      All previous events have been cleared. Click below to add your new Auckland event and upload photos from your laptop.
                    </p>
                    <button
                      onClick={() => {
                        const newId = 'gal_' + Date.now();
                        addGalleryItem({
                          id: newId,
                          title: 'New Auckland Event Showcase',
                          category: 'wedding',
                          categoryLabel: 'Wedding Reception',
                          venue: 'Venue Name, Auckland',
                          location: 'Auckland',
                          image: '',
                          images: [],
                          guests: '100 Guests',
                          year: new Date().getFullYear().toString(),
                          highlight: 'Packed dancefloor all night',
                          description: 'Custom music programming and crisp acoustic audio.'
                        });
                        showToast('Added New Gallery Event');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-md shadow-purple-600/30"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Your First Event</span>
                    </button>
                  </div>
                ) : (
                <div className="space-y-4">
                  {content.gallery.map(item => (
                    <div 
                      key={item.id}
                      className="bg-stone-900/60 border border-stone-800 rounded-xl p-5 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold text-stone-400 mb-1">Event Title</label>
                            <input 
                              type="text" 
                              value={item.title}
                              onChange={e => updateGalleryItem(item.id, { title: e.target.value })}
                              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-stone-400 mb-1">Category</label>
                            <select
                              value={item.category}
                              onChange={e => {
                                const cat = e.target.value as 'wedding' | 'corporate' | 'party';
                                const label = cat === 'wedding' ? 'Wedding Reception' : cat === 'corporate' ? 'Corporate Gala' : 'Private Party';
                                updateGalleryItem(item.id, { category: cat, categoryLabel: label });
                              }}
                              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                            >
                              <option value="wedding">Wedding</option>
                              <option value="corporate">Corporate Gala</option>
                              <option value="party">Private Party</option>
                            </select>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${item.title}" from gallery?`)) {
                              deleteGalleryItem(item.id);
                              showToast('Deleted from Gallery');
                            }
                          }}
                          className="p-2 text-stone-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">Venue Name</label>
                          <input 
                            type="text" 
                            value={item.venue}
                            onChange={e => updateGalleryItem(item.id, { venue: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">Location / Suburb</label>
                          <input 
                            type="text" 
                            value={item.location}
                            onChange={e => updateGalleryItem(item.id, { location: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">Guest Attendance</label>
                          <input 
                            type="text" 
                            value={item.guests}
                            onChange={e => updateGalleryItem(item.id, { guests: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">Highlight Quote</label>
                          <input 
                            type="text" 
                            value={item.highlight}
                            onChange={e => updateGalleryItem(item.id, { highlight: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      {/* Multi-Photo Manager & Laptop Upload */}
                      <div className="pt-3 border-t border-stone-800 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                                <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                                <span>Event Photo Gallery</span>
                              </label>
                              <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-semibold">
                                {(item.images && item.images.length > 0 ? item.images : [item.image].filter(Boolean)).length} Photos
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-0.5">
                              Upload multiple photos from your laptop (ceremony, speeches, party atmosphere).
                            </p>
                          </div>

                          {/* Laptop Upload Trigger */}
                          <div>
                            <input
                              type="file"
                              id={`upload-photos-${item.id}`}
                              multiple
                              accept="image/*"
                              onChange={e => handleUploadPhotos(item.id, e.target.files)}
                              className="hidden"
                            />
                            <label
                              htmlFor={`upload-photos-${item.id}`}
                              className="inline-flex items-center gap-2 px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-md shadow-purple-600/30 active:scale-95"
                            >
                              {uploadingEventId === item.id ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>{uploadProgressText || 'Processing...'}</span>
                                </>
                              ) : (
                                <>
                                  <UploadCloud className="w-4 h-4" />
                                  <span>+ Add Photos from Laptop</span>
                                </>
                              )}
                            </label>
                          </div>
                        </div>

                        {/* Drag & Drop Area / Quick Drop Target */}
                        <div
                          onDragOver={e => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onDrop={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleUploadPhotos(item.id, e.dataTransfer.files);
                          }}
                          className="border border-dashed border-stone-800 hover:border-purple-500/60 rounded-xl p-3 bg-stone-950/60 transition-colors text-center"
                        >
                          <p className="text-[11px] text-stone-400">
                            📁 Drag & drop photos from your laptop folder here, or click <strong className="text-purple-300 font-semibold">+ Add Photos from Laptop</strong> to select multiple files at once.
                          </p>
                        </div>

                        {/* Photo Grid Preview */}
                        {(() => {
                          const photoList = item.images && item.images.length > 0 ? item.images : [item.image].filter(Boolean);
                          if (photoList.length === 0) {
                            return (
                              <div className="text-center py-4 bg-stone-950/40 rounded-lg border border-stone-800 text-xs text-stone-500">
                                No photos added yet. Click "+ Add Photos from Laptop" to upload event photos.
                              </div>
                            );
                          }
                          return (
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
                              {photoList.map((photoUrl, idx) => {
                                const isCover = photoUrl === item.image || idx === 0;
                                return (
                                  <div 
                                    key={idx}
                                    className={`group relative rounded-lg overflow-hidden border bg-stone-950 aspect-[4/3] ${
                                      isCover ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-stone-800 hover:border-stone-700'
                                    }`}
                                  >
                                    <img 
                                      src={photoUrl} 
                                      alt={`${item.title} photo ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                    
                                    {/* Cover badge */}
                                    {isCover && (
                                      <span className="absolute top-1 left-1 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                                        ★ Cover
                                      </span>
                                    )}

                                    {/* Hover Overlay Controls */}
                                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                                      <div className="flex justify-end">
                                        <button
                                          type="button"
                                          onClick={() => handleRemovePhoto(item.id, idx)}
                                          className="p-1 rounded bg-stone-900/90 text-stone-400 hover:text-red-400 transition-colors"
                                          title="Remove this photo"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                      
                                      {!isCover && (
                                        <button
                                          type="button"
                                          onClick={() => handleSetCoverPhoto(item.id, photoUrl)}
                                          className="w-full py-0.5 bg-purple-600 hover:bg-purple-500 text-white text-[9px] font-bold rounded transition-colors text-center"
                                        >
                                          Set Cover
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">Detailed Description</label>
                        <textarea 
                          rows={2}
                          value={item.description}
                          onChange={e => updateGalleryItem(item.id, { description: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
            )}

            {/* TAB 5: Services */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Services Descriptions</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Fine-tune the narrative for Weddings, Corporate Events, and Milestone Parties.
                  </p>
                </div>

                <div className="space-y-6">
                  {content.services.map(svc => (
                    <div key={svc.id} className="bg-stone-900/60 border border-stone-800 rounded-xl p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                          {svc.id.toUpperCase()} SERVICE
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-400">Starting From:</span>
                          <span className="text-xs font-bold text-white">$</span>
                          <input 
                            type="number"
                            value={svc.priceFrom}
                            onChange={e => updateService(svc.id, { priceFrom: parseInt(e.target.value) || 0 })}
                            className="w-20 bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-white font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">Section Title</label>
                        <input 
                          type="text"
                          value={svc.title}
                          onChange={e => updateService(svc.id, { title: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">Description Paragraph</label>
                        <textarea 
                          rows={3}
                          value={svc.description}
                          onChange={e => updateService(svc.id, { description: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">Key Deliverables (one per line)</label>
                        <textarea 
                          rows={4}
                          value={svc.inclusions.join('\n')}
                          onChange={e => {
                            const lines = e.target.value.split('\n').filter(l => l.trim() !== '');
                            updateService(svc.id, { inclusions: lines });
                          }}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: Client Reviews & Testimonials */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Client Reviews & Testimonials</h3>
                    <p className="text-xs text-stone-400 mt-1">
                      Add verified reviews from recent events to boost credibility.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newId = 'rev_' + Date.now();
                      addTestimonial({
                        id: newId,
                        clientNames: 'Client Name',
                        eventType: 'Wedding Reception',
                        venue: 'Venue Name, Auckland',
                        date: 'Recent Event',
                        rating: 5,
                        highlight: 'Unbelievable music and packed dancefloor!',
                        quote: 'The best vendor decision we made. Professional, attentive, and read the crowd perfectly.'
                      });
                      showToast('Added New Review');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-md shadow-purple-600/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Review</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.testimonials.map(t => (
                    <div key={t.id} className="bg-stone-900/60 border border-stone-800 rounded-xl p-5 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-400 mb-1">Client Names</label>
                            <input 
                              type="text" 
                              value={t.clientNames}
                              onChange={e => updateTestimonial(t.id, { clientNames: e.target.value })}
                              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-400 mb-1">Event Type</label>
                            <input 
                              type="text" 
                              value={t.eventType}
                              onChange={e => updateTestimonial(t.id, { eventType: e.target.value })}
                              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-400 mb-1">Venue</label>
                            <input 
                              type="text" 
                              value={t.venue}
                              onChange={e => updateTestimonial(t.id, { venue: e.target.value })}
                              className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm('Delete this review?')) {
                              deleteTestimonial(t.id);
                              showToast('Review Deleted');
                            }
                          }}
                          className="p-2 text-stone-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">One-Line Headline</label>
                          <input 
                            type="text" 
                            value={t.highlight}
                            onChange={e => updateTestimonial(t.id, { highlight: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">Date</label>
                          <input 
                            type="text" 
                            value={t.date}
                            onChange={e => updateTestimonial(t.id, { date: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">Full Review Text</label>
                        <textarea 
                          rows={2}
                          value={t.quote}
                          onChange={e => updateTestimonial(t.id, { quote: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: FAQs */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Frequently Asked Questions</h3>
                    <p className="text-xs text-stone-400 mt-1">
                      Address questions clients ask before booking.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      addFaq({
                        question: 'New Question?',
                        answer: 'Answer explaining your policy or service details.'
                      });
                      showToast('Added New FAQ');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors shadow-md shadow-purple-600/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-stone-900/60 border border-stone-800 rounded-xl p-5 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <label className="block text-[11px] font-semibold text-stone-400 mb-1">Question</label>
                          <input 
                            type="text" 
                            value={faq.question}
                            onChange={e => updateFaq(idx, { ...faq, question: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white font-semibold"
                          />
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm('Delete this FAQ?')) {
                              deleteFaq(idx);
                              showToast('Deleted FAQ');
                            }
                          }}
                          className="p-2 text-stone-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-400 mb-1">Answer</label>
                        <textarea 
                          rows={3}
                          value={faq.answer}
                          onChange={e => updateFaq(idx, { ...faq, answer: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: Inquiry Leads Inbox */}
            {activeTab === 'inbox' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Inquiry Leads Inbox</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Review and track all booking inquiries submitted through your website form.
                  </p>
                </div>

                {content.inquiries?.length === 0 ? (
                  <div className="text-center py-16 bg-stone-900/30 border border-dashed border-stone-800 rounded-2xl">
                    <Inbox className="w-10 h-10 text-stone-600 mx-auto mb-3" />
                    <h4 className="text-sm font-semibold text-stone-300">No Inquiries Received Yet</h4>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                      When couples and corporate planners submit the booking form on your site, their submissions will be displayed here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {content.inquiries.map(inq => (
                      <div key={inq.id} className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{inq.fullName}</span>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                inq.status === 'booked' 
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                  : 'bg-purple-950 text-purple-300 border border-purple-800'
                              }`}>
                                {inq.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-xs text-stone-400 mt-0.5">
                              Submitted {inq.submittedAt} · Event: <strong>{inq.eventDate}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={inq.status}
                              onChange={e => updateInquiryStatus(inq.id, e.target.value as any)}
                              className="bg-stone-950 border border-stone-800 text-xs text-stone-300 rounded px-2.5 py-1 focus:outline-none"
                            >
                              <option value="new">Mark as New</option>
                              <option value="contacted">Mark as Contacted</option>
                              <option value="booked">Mark as Booked</option>
                            </select>

                            <button
                              onClick={() => {
                                if (window.confirm('Delete this inquiry?')) {
                                  deleteInquiry(inq.id);
                                }
                              }}
                              className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-300">
                          <div>
                            <span className="text-stone-500 block text-[10px]">Email:</span>
                            <a href={`mailto:${inq.email}`} className="text-purple-400 hover:underline">
                              {inq.email}
                            </a>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[10px]">Phone:</span>
                            <span>{inq.phone || 'Not provided'}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[10px]">Venue / Location:</span>
                            <span>{inq.venue || 'TBD'}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[10px]">Estimated Guests:</span>
                            <span>{inq.guestCount} Guests</span>
                          </div>
                        </div>

                        {inq.notes && (
                          <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 text-xs text-stone-300">
                            <span className="text-[10px] text-stone-500 block mb-1 font-semibold uppercase">Client Notes:</span>
                            {inq.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 9: Admin Security & Password */}
            {activeTab === 'security' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Administrator Security & Private URL</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Manage how you access this private studio and change your access password.
                  </p>
                </div>

                {/* Secret Link Card */}
                <div className="p-5 bg-stone-900 border border-stone-800 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                    <Key className="w-4 h-4" />
                    <span>Your Private Admin Bookmark</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    This website editor is completely hidden from customers. To open this portal anytime from any computer or phone, simply visit your website and append <code className="text-purple-300 bg-stone-950 px-1 py-0.5 rounded font-mono">/#/admin</code> to the URL.
                  </p>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={window.location.origin + window.location.pathname + '#/admin'}
                      className="flex-1 bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-300 font-mono select-all focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#/admin');
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                        showToast('Secret Admin URL Copied!');
                      }}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied' : 'Copy URL'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    💡 Tip: Bookmark this URL on your browser for 1-click access whenever you need to update rates, reviews, or view new inquiries.
                  </p>
                </div>

                {/* Change Password Form */}
                <form onSubmit={handlePasswordChange} className="p-5 bg-stone-900 border border-stone-800 rounded-xl space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Change Admin Password</span>
                  </h4>

                  {passwordChangeMsg && (
                    <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                      passwordChangeMsg.success 
                        ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300' 
                        : 'bg-red-950/80 border border-red-800 text-red-300'
                    }`}>
                      {passwordChangeMsg.success && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      <span>{passwordChangeMsg.text}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                        Current Password
                      </label>
                      <input 
                        type="password"
                        value={currentPasswordInput}
                        onChange={e => setCurrentPasswordInput(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                        New Password (minimum 6 characters)
                      </label>
                      <input 
                        type="password"
                        value={newPasswordInput}
                        onChange={e => setNewPasswordInput(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                        Confirm New Password
                      </label>
                      <input 
                        type="password"
                        value={confirmPasswordInput}
                        onChange={e => setConfirmPasswordInput(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-colors shadow-md shadow-purple-600/30"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 10: Backup & Restore */}
            {activeTab === 'backup' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Backup, Export & Factory Reset</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Download a full backup of all your customized site content or restore from a previous JSON save.
                  </p>
                </div>

                <div className="p-6 bg-stone-900 border border-stone-800 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Export Content Backup (JSON)</h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Saves all your custom packages, prices, gallery items, and text to your computer.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const json = exportBackupJson();
                        const blob = new Blob([json], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `sound_celebration_content_backup_${new Date().toISOString().slice(0, 10)}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                        showToast('Backup Downloaded');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-stone-900 border border-stone-800 rounded-xl space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">Import Content Backup</h4>
                    <p className="text-xs text-stone-400 mt-0.5 mb-3">
                      Restore previously exported content from a JSON file.
                    </p>
                  </div>

                  <input 
                    type="file" 
                    accept=".json"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = ev => {
                        const content = ev.target?.result as string;
                        if (content && importBackupJson(content)) {
                          showToast('Content Restored Successfully!');
                        } else {
                          alert('Failed to parse backup JSON file.');
                        }
                      };
                      reader.readAsText(file);
                    }}
                    className="block w-full text-xs text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-800 file:text-purple-300 hover:file:bg-stone-700"
                  />
                </div>

                <div className="p-6 bg-red-950/30 border border-red-900/60 rounded-xl space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-red-200">Reset All Content to Defaults</h4>
                    <p className="text-xs text-red-300/80 mt-0.5">
                      This will erase all custom edits made in this browser and revert to default prices and templates.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      resetToDefaults();
                      showToast('Reverted to Factory Defaults');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-900/60 hover:bg-red-800 text-red-100 rounded-lg text-xs font-bold transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 shrink-0 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-stone-300">
              {lastPublishedAt 
                ? `Published Live: ${new Date(lastPublishedAt).toLocaleDateString()} at ${new Date(lastPublishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
                : 'Session active · Ready to publish live'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-lg text-xs font-semibold border border-stone-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={async () => {
                const res = await publishToLiveWebsite();
                if (res.success) {
                  showToast('🚀 Live Website Updated!');
                }
                onClose();
              }}
              disabled={isPublishing}
              className="px-5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg transition-colors shadow-md shadow-purple-600/30 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isPublishing ? 'Publishing...' : 'Publish Live & View Site'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
