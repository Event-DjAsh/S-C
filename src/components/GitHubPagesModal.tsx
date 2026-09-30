import React, { useState } from 'react';
import { X, Check, Copy, Globe, Terminal, Shield, Search, ExternalLink } from 'lucide-react';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>GitHub Pages & SEO Setup Guide</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            Domain: soundandcelebration.co.nz
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            Step-by-step instructions to connect your custom New Zealand domain and activate Google Search indexing.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-stone-300">
          
          {/* Step 1: Pre-configured Files */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                1. Project Files Ready in Codebase
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">Configured</span>
            </div>
            <p className="text-stone-400 text-xs">
              We have already created the required files in your repository:
            </p>
            <ul className="list-disc list-inside text-xs text-stone-300 space-y-1 font-mono">
              <li><strong className="text-amber-300">/public/CNAME</strong> containing &ldquo;soundandcelebration.co.nz&rdquo;</li>
              <li><strong className="text-amber-300">/public/robots.txt</strong> allowing Google bots & referencing sitemap</li>
              <li><strong className="text-amber-300">/public/sitemap.xml</strong> with full URL structure for search indexing</li>
            </ul>
          </div>

          {/* Step 2: Crazy Domains DNS & Nameservers */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-amber-400" />
                2. Crazy Domains Setup (Nameservers & DNS Records)
              </span>
              <span className="text-[11px] text-amber-400 font-mono">crazydomains.co.nz</span>
            </div>

            {/* Sub-step A: Nameservers */}
            <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-2 text-xs">
              <div className="font-semibold text-white flex items-center gap-1">
                <span>Part A: Verify Nameservers (Keep on Default)</span>
              </div>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                In your Crazy Domains account, go to <strong className="text-stone-200">My Account &rarr; Domains &rarr; soundandcelebration.co.nz &rarr; Name Servers</strong>. Ensure it is set to <strong className="text-stone-200">Crazy Domains Default Name Servers</strong> (e.g. <code>ns1.dnspackage.com</code> & <code>ns2.dnspackage.com</code>). <em>Note: Do not point nameservers away from Crazy Domains, as GitHub Pages relies on DNS A/CNAME records.</em>
              </p>
            </div>

            {/* Sub-step B: DNS Records */}
            <div className="bg-stone-900/80 p-3 rounded-lg border border-stone-800 space-y-2.5">
              <div className="font-semibold text-white flex items-center justify-between">
                <span className="text-xs">Part B: Add the 4 GitHub &ldquo;A&rdquo; Records in DNS Zone</span>
                <span className="text-[10px] text-stone-400">TTL: 3600 (1 Hour)</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                In the domain dashboard, click <strong className="text-stone-200">DNS Settings</strong> (or Zone Manager). Remove any old parking IP, then add these 4 A records for <code className="text-amber-300">@</code>:
              </p>

              <div className="space-y-1.5 font-mono text-[11px]">
                {[
                  '185.199.108.153',
                  '185.199.109.153',
                  '185.199.110.153',
                  '185.199.111.153',
                ].map((ip, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-stone-950 rounded border border-stone-800/80">
                    <span className="text-stone-400 font-sans text-xs">A Record #{idx + 1}: <strong className="font-mono text-amber-300">@</strong> &rarr; <strong className="text-white">{ip}</strong></span>
                    <button
                      onClick={() => copyToClipboard(ip, `ip-${idx}`)}
                      className="text-stone-400 hover:text-amber-400 flex items-center gap-1 text-[10px] px-2 py-1 bg-stone-900 rounded border border-stone-700"
                    >
                      {copiedKey === `ip-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === `ip-${idx}` ? 'Copied' : 'Copy IP'}</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-800">
                <div className="flex items-center justify-between p-2 bg-stone-950 rounded border border-stone-800/80 font-mono text-[11px]">
                  <span className="text-stone-400 font-sans text-xs">CNAME: <strong className="font-mono text-amber-300">www</strong> &rarr; <strong className="text-white">YOUR_GITHUB_USER.github.io</strong></span>
                  <span className="text-[10px] text-stone-500 font-sans">Points to your GitHub</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: GitHub Repo Settings */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800/80 space-y-2">
            <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400" />
              3. GitHub Repository Settings
            </span>
            <ol className="list-decimal list-inside text-xs text-stone-300 space-y-1 leading-relaxed">
              <li>In your GitHub repo, go to <strong>Settings</strong> &rarr; <strong>Pages</strong>.</li>
              <li>Under <strong>Source</strong>, select <strong>GitHub Actions</strong> (we have provided the deployment workflow).</li>
              <li>Under <strong>Custom domain</strong>, enter <code className="text-amber-400 font-mono">soundandcelebration.co.nz</code> and click Save.</li>
              <li>Check <strong>Enforce HTTPS</strong> once the DNS check passes (usually takes 5–30 minutes).</li>
            </ol>
          </div>

          {/* Step 4: Google Local SEO Ranking Checklist */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800/80 space-y-2">
            <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4 text-amber-400" />
              4. Google Local Search Ranking Checklist
            </span>
            <ul className="list-disc list-inside text-xs text-stone-300 space-y-1 leading-relaxed">
              <li><strong>Google Search Console</strong>: Add <code className="text-amber-400">https://soundandcelebration.co.nz</code> and submit sitemap <code className="text-amber-400">https://soundandcelebration.co.nz/sitemap.xml</code>.</li>
              <li><strong>Google Business Profile</strong>: Create a profile under <em>Sound & Celebration</em>, category: <em>DJ Service</em>, service areas: Auckland Central, Waiheke Island, Kumeu, Takapuna, Matakana.</li>
              <li><strong>Local Backlinks</strong>: List on Auckland wedding directories (NZ Wedding Guide, Wedding Associates NZ, Eventfinda NZ).</li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-lg text-xs"
          >
            Done / Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
