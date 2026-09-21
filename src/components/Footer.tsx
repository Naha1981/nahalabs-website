import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
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

  const linkCls = 'text-small text-fg-2 hover:text-fg transition-colors text-left py-1.5';

  return (
    <footer data-tone="dark" className="bg-surface text-fg-2 border-t border-line pt-16 sm:pt-20 pb-10">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-12 gap-y-14 pb-14 border-b border-line">

          {/* Brand and direct contact */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 100 100" fill="none" className="w-7 h-7 shrink-0" aria-hidden="true">
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
              <span className="text-[1rem] font-semibold tracking-[0.22em] text-fg leading-none">NAHALABS</span>
            </div>

            <p className="mt-5 text-small text-fg-2 max-w-sm">{t.footer.brandDesc}</p>

            <dl className="mt-7 space-y-4 text-small">
              <div>
                <dt className="text-caption text-fg-3">Email</dt>
                <dd className="mt-1 flex items-center gap-4">
                  <a href="mailto:ai-solutions@nahalabs.co.za" className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent break-all">
                    ai-solutions@nahalabs.co.za
                  </a>
                  <button
                    type="button"
                    id="footer-copy-email-btn"
                    onClick={() => handleCopy('ai-solutions@nahalabs.co.za', 'email', 'Engineering Email')}
                    className="text-caption text-fg-2 hover:text-accent transition-colors shrink-0 min-h-11 px-1"
                    aria-label="Copy email address"
                  >
                    {copiedTarget === 'email' ? t.footer.copied : t.footer.copyEmail}
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-caption text-fg-3">Location</dt>
                <dd className="mt-1 flex items-center gap-4">
                  <span className="text-fg">Johannesburg, Gauteng, South Africa</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('Johannesburg · Gauteng · South Africa', 'address', 'Headquarters Address')}
                    className="text-caption text-fg-2 hover:text-accent transition-colors shrink-0 min-h-11 px-1"
                    aria-label="Copy location"
                  >
                    {copiedTarget === 'address' ? t.footer.copied : 'Copy'}
                  </button>
                </dd>
              </div>
            </dl>
          </div>

          {/* Site */}
          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <h2 className="text-caption font-medium text-fg">Explore</h2>
            <ul className="mt-4 flex flex-col">
              {[
                ['solutions', 'Solutions'],
                ['systems', 'Systems'],
                ['approach', 'Approach'],
                ['about', 'About'],
                ['contact', 'Contact'],
              ].map(([id, label]) => (
                <li key={id}>
                  <button type="button" onClick={() => onNavigate(id)} className={linkCls}>
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <a href="/insights" className={`${linkCls} block`}>Insights</a>
              </li>
            </ul>
          </nav>

          {/* Regional pages */}
          <nav aria-label="Regions" className="lg:col-span-2">
            <h2 className="text-caption font-medium text-fg">{t.footer.regionalHubs}</h2>
            <ul className="mt-4 flex flex-col">
              {[
                ['johannesburg', 'Johannesburg and Sandton'],
                ['soweto', 'Soweto township commerce'],
                ['gauteng', 'Gauteng industrial corridor'],
                ['lesotho', 'Lesotho and cross-border'],
              ].map(([slug, label]) => (
                <li key={slug}>
                  <a href={`/locations/${slug}`} className={`${linkCls} block`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Briefings */}
          <div className="lg:col-span-3">
            <h2 className="text-caption font-medium text-fg">{t.footer.dispatchesTitle}</h2>
            <p className="mt-4 text-small text-fg-2">{t.footer.dispatchesDesc}</p>

            <div className="mt-5">
              {isSubscribed ? (
                <div className="flex items-center justify-between gap-3 text-small">
                  <span className="text-fg">You're on the list.</span>
                  <button type="button" onClick={() => setIsSubscribed(false)} className="text-caption text-fg-2 hover:text-fg underline underline-offset-4 min-h-11 px-1">
                    Add another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-3">
                  <label htmlFor="newsletter-email-input" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="newsletter-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.footer.placeholder}
                    disabled={isSubscribing}
                    autoComplete="email"
                    className="w-full min-h-11 bg-canvas border border-line-strong rounded-md px-3.5 text-small text-fg placeholder:text-fg-3 focus:border-accent transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    id="newsletter-submit-btn"
                    disabled={isSubscribing}
                    className="btn btn-primary btn-sm w-full disabled:opacity-60"
                  >
                    {isSubscribing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Verifying</span>
                      </>
                    ) : (
                      <span>{t.footer.subscribeBtn}</span>
                    )}
                  </button>
                  <p className="text-caption text-fg-3">POPIA compliant and confidential. Dispatches every alternate Thursday.</p>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-caption text-fg-3">
          <p>© {new Date().getFullYear()} NahaLabs (PTY) Ltd. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <button type="button" onClick={onOpenPrivacy} className="hover:text-fg transition-colors min-h-11">
              {t.footer.privacy}
            </button>
            <button type="button" onClick={onOpenTerms} className="hover:text-fg transition-colors min-h-11">
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
