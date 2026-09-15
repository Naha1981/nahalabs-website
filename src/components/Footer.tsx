import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, CheckCircle2, ArrowRight, Loader2, Copy, Check, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectLocation: (slug: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onSelectLocation,
  onOpenPrivacy,
  onOpenTerms
}) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('nahalabs_newsletter_subscribers');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return true;
        }
        return localStorage.getItem('nahalabs_subscribed') === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });
  const [copiedTarget, setCopiedTarget] = useState<'email' | 'address' | null>(null);

  // Sync with storage changes across tabs or other modals (e.g. exit modal)
  useEffect(() => {
    const checkSubscribed = () => {
      try {
        const flag = localStorage.getItem('nahalabs_subscribed') === 'true';
        const list = JSON.parse(localStorage.getItem('nahalabs_newsletter_subscribers') || '[]');
        if (flag || (Array.isArray(list) && list.length > 0)) {
          setIsSubscribed(true);
        }
      } catch {
        // ignore storage errors
      }
    };

    window.addEventListener('storage', checkSubscribed);
    return () => window.removeEventListener('storage', checkSubscribed);
  }, []);

  const handleCopy = async (text: string, target: 'email' | 'address', label: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopiedTarget(target);
      setTimeout(() => {
        setCopiedTarget(null);
      }, 2400);

      toast.success('Copied to Clipboard', {
        description: `${label} (${text}) copied to clipboard.`,
        duration: 3500,
      });
    } catch {
      toast.error('Copy Failed', {
        description: 'Clipboard access was blocked by browser permissions.',
      });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      toast.error('Email Required', {
        description: 'Please provide a valid corporate or operational email address.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      toast.error('Invalid Email Format', {
        description: 'Please ensure your email address includes a valid domain (e.g., name@company.co.za).',
      });
      return;
    }

    setIsSubscribing(true);

    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      setEmail('');

      toast.success('Subscription Confirmed', {
        description: `You have been registered for NahaLabs Architectural Dispatches at ${cleanEmail}. Next dispatch releases Thursday.`,
        duration: 6000,
      });

      try {
        const stored = JSON.parse(localStorage.getItem('nahalabs_newsletter_subscribers') || '[]');
        stored.push({
          email: cleanEmail,
          timestamp: new Date().toISOString(),
          source: 'footer_subscription_form'
        });
        localStorage.setItem('nahalabs_newsletter_subscribers', JSON.stringify(stored));
        localStorage.setItem('nahalabs_subscribed', 'true');
      } catch (err) {
        console.warn('LocalStorage unavailable for newsletter subscription', err);
      }
    }, 450);
  };

  return (
    <footer className="bg-[#050606] text-[#A5A29B] border-t border-[#181818] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Subscription Banner */}
        <div className="mb-14 p-6 sm:p-10 rounded-sm bg-[#0c0d0e] border border-[#202224] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#C8AE82] uppercase tracking-[0.2em]">
              <Mail className="w-3.5 h-3.5 text-[#C8AE82]" />
              <span>{t.footer.dispatchesBadge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F3F0EA] tracking-tight">
              {t.footer.dispatchesTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#888] leading-relaxed">
              {t.footer.dispatchesDesc}
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md">
            {isSubscribed ? (
              <div className="p-4 rounded-sm bg-[#151719] border border-[#C8AE82]/40 flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#C8AE82]">
                  <CheckCircle2 className="w-4 h-4 text-[#C8AE82] flex-shrink-0" />
                  <span>DISPATCHES SUBSCRIPTION ACTIVE</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubscribed(false)}
                  className="text-[10px] text-[#888] hover:text-[#F3F0EA] underline cursor-pointer"
                >
                  Add Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#666] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      id="newsletter-email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.footer.placeholder}
                      disabled={isSubscribing}
                      className="w-full bg-[#141517] border border-[#2a2c30] rounded-sm py-2.5 pl-10 pr-3 text-xs text-[#F3F0EA] placeholder-[#666] focus:outline-none focus:border-[#C8AE82] transition-colors font-mono disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    id="newsletter-submit-btn"
                    disabled={isSubscribing}
                    className="px-5 py-2.5 rounded-sm bg-[#C8AE82] hover:bg-[#E5D1B0] text-[#080909] font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                  >
                    {isSubscribing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>{t.footer.subscribeBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[10px] font-mono text-[#666] flex items-center justify-between">
                  <span>POPIA Compliant · Confidential</span>
                  <span>Dispatches every alternate Thursday</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#181818]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex-shrink-0">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="footGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E5D1B0" />
                      <stop offset="50%" stopColor="#C8AE82" />
                      <stop offset="100%" stopColor="#9C8358" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(22, 16)">
                    <rect x="0" y="2" width="8" height="8" fill="url(#footGold)" />
                    <rect x="0" y="16" width="7" height="52" fill="url(#footGold)" />
                    <path d="M 2 22 L 48 68 L 40 68 L 2 30 Z" fill="url(#footGold)" />
                    <path d="M 8 16 L 54 62 L 54 54 L 16 16 Z" fill="url(#footGold)" />
                    <rect x="47" y="16" width="7" height="52" fill="url(#footGold)" />
                    <rect x="47" y="74" width="8" height="8" fill="url(#footGold)" />
                  </g>
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold tracking-[0.25em] text-[#F3F0EA]">
                  NAHALABS
                </span>
                <span className="block text-[8px] font-mono tracking-[0.2em] text-[#A5A29B] uppercase">
                  (PTY) LTD · EST. SOUTH AFRICA
                </span>
              </div>
            </div>

            <p className="text-xs text-[#777] leading-relaxed max-w-sm">
              {t.footer.brandDesc}
            </p>

            <div className="text-xs font-mono text-[#F3F0EA] pt-2 space-y-2">
              {/* Regional HQ with Copy */}
              <div className="flex items-center justify-between gap-3 p-2 rounded bg-[#0f1011] border border-[#1e2022] max-w-sm">
                <div className="flex items-center gap-2 text-xs text-[#C8AE82]">
                  <MapPin className="w-3.5 h-3.5 text-[#C8AE82] flex-shrink-0" />
                  <span className="text-[#DDD]">Johannesburg · Gauteng · South Africa</span>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => handleCopy('Johannesburg · Gauteng · South Africa', 'address', 'Headquarters Address')}
                    className="p-1.5 rounded hover:bg-[#1a1c1e] text-[#888] hover:text-[#C8AE82] transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                    title="Copy address to clipboard"
                    aria-label="Copy address to clipboard"
                  >
                    {copiedTarget === 'address' ? (
                      <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {copiedTarget === 'address' && (
                    <span className="absolute -top-7 right-0 px-2 py-0.5 rounded bg-[#1e2022] border border-[#4ade80]/40 text-[#4ade80] text-[10px] font-mono shadow-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-200">
                      {t.footer.copied}
                    </span>
                  )}
                </div>
              </div>

              {/* Direct Email with Copy to Clipboard Button & Tooltip Indicator */}
              <div className="flex items-center justify-between gap-3 p-2 rounded bg-[#0f1011] border border-[#1e2022] max-w-sm">
                <a 
                  href="mailto:ai-solutions@nahalabs.co.za" 
                  className="text-[#C8AE82] hover:underline block truncate text-xs"
                >
                  ai-solutions@nahalabs.co.za
                </a>
                <div className="relative flex items-center">
                  <button
                    type="button"
                    id="footer-copy-email-btn"
                    onClick={() => handleCopy('ai-solutions@nahalabs.co.za', 'email', 'Engineering Email')}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#181a1c] hover:bg-[#222528] border border-[#2c2f33] hover:border-[#C8AE82]/50 text-[#C8AE82] text-[11px] font-mono transition-all cursor-pointer"
                    title="Copy email to clipboard"
                    aria-label="Copy email to clipboard"
                  >
                    {copiedTarget === 'email' ? (
                      <>
                        <Check className="w-3 h-3 text-[#4ade80]" />
                        <span className="text-[#4ade80] font-bold">{t.footer.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#C8AE82]" />
                        <span>{t.footer.copyEmail}</span>
                      </>
                    )}
                  </button>
                  {copiedTarget === 'email' && (
                    <span className="absolute -top-7 right-0 px-2 py-0.5 rounded bg-[#151719] border border-[#4ade80]/50 text-[#4ade80] text-[10px] font-mono shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95 duration-200">
                      ✓ {t.footer.copied}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#F3F0EA] uppercase tracking-widest">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('solutions')} 
                  className="hover:text-[#C8AE82] transition-colors"
                >
                  Solutions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('systems')} 
                  className="hover:text-[#C8AE82] transition-colors"
                >
                  Featured Systems
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('approach')} 
                  className="hover:text-[#C8AE82] transition-colors"
                >
                  Methodology
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-[#C8AE82] transition-colors"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-[#C8AE82] transition-colors"
                >
                  Commercial Diagnosis
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hubs (SEO) */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#C8AE82] uppercase tracking-widest">
              {t.footer.regionalHubs}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onSelectLocation('johannesburg')} 
                  className="hover:text-[#F3F0EA] transition-colors flex items-center gap-1.5"
                >
                  <span>Johannesburg & Sandton</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C8AE82]" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectLocation('soweto')} 
                  className="hover:text-[#F3F0EA] transition-colors flex items-center gap-1.5"
                >
                  <span>Soweto Township Commerce</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C8AE82]" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectLocation('gauteng')} 
                  className="hover:text-[#F3F0EA] transition-colors flex items-center gap-1.5"
                >
                  <span>Gauteng Industrial Corridor</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C8AE82]" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectLocation('lesotho')} 
                  className="hover:text-[#F3F0EA] transition-colors flex items-center gap-1.5"
                >
                  <span>Lesotho & Cross-Border</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C8AE82]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Methodology & Contact */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#F3F0EA] uppercase tracking-widest">
              {t.footer.methodology}
            </div>
            <p className="text-xs text-[#777] font-mono leading-relaxed">
              DIAGNOSIS<br />
              ↓<br />
              PROTOTYPE<br />
              ↓<br />
              PRODUCTION
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs font-mono text-[#C8AE82] hover:text-[#E5D1B0] transition-colors uppercase flex items-center gap-1"
              >
                <span>Start Conversation</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#666]">
          <div>
            © {new Date().getFullYear()} NahaLabs (PTY) Ltd. {t.footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={onOpenPrivacy}
              className="hover:text-[#A5A29B] transition-colors"
            >
              {t.footer.privacy}
            </button>
            <button 
              onClick={onOpenTerms}
              className="hover:text-[#A5A29B] transition-colors"
            >
              {t.footer.terms}
            </button>
            <span className="text-[#C8AE82]">
              AI OPPORTUNITY ENGINEERING
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

