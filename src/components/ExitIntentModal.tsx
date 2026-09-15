import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if previously dismissed or subscribed in this session
    const hasSeenInSession = sessionStorage.getItem('nahalabs_exit_modal_shown');
    const isAlreadySubscribed = localStorage.getItem('nahalabs_newsletter_subscribed');

    if (hasSeenInSession || isAlreadySubscribed) {
      return;
    }

    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves from top of window or moves rapidly towards window top
      if (e.clientY <= 20 && !hasTriggered) {
        hasTriggered = true;
        setIsOpen(true);
        sessionStorage.setItem('nahalabs_exit_modal_shown', 'true');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('nahalabs_exit_modal_shown', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      toast.error('Email Required', {
        description: 'Please enter your corporate or personal email to receive our architectural dispatches.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      toast.error('Invalid Email Address', {
        description: 'Please verify the domain format (e.g., yourname@enterprise.co.za).',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');

      toast.success('Dispatches Subscription Confirmed', {
        description: `You have successfully joined the executive dispatch list at ${cleanEmail}. Next release scheduled for Thursday.`,
        duration: 6000,
      });

      try {
        localStorage.setItem('nahalabs_newsletter_subscribed', 'true');
        const subscribers = JSON.parse(localStorage.getItem('nahalabs_newsletter_subscribers') || '[]');
        subscribers.push({
          email: cleanEmail,
          timestamp: new Date().toISOString(),
          source: 'exit_intent_modal',
        });
        localStorage.setItem('nahalabs_newsletter_subscribers', JSON.stringify(subscribers));
      } catch (err) {
        console.warn('LocalStorage unavailable', err);
      }

      // Automatically close after a short delay
      setTimeout(() => {
        setIsOpen(false);
      }, 2400);
    }, 450);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="exit-intent-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#121315] border border-[#2e3136] rounded-sm shadow-2xl p-6 sm:p-8 overflow-hidden text-[#F3F0EA]"
          >
            {/* Top Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#888] hover:text-[#F3F0EA] hover:bg-[#1f2124] transition-colors focus:outline-none cursor-pointer"
              aria-label="Dismiss newsletter modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Decorative Gold Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8AE82] to-transparent" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#181a1d] border border-[#282b30] text-[10px] font-mono tracking-widest text-[#C8AE82] uppercase mb-4">
              <Sparkles className="w-3 h-3 text-[#C8AE82]" />
              <span>BEFORE YOU DEPART · EXECUTIVE DISPATCHES</span>
            </div>

            {/* Content */}
            <h3 id="exit-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[#F3F0EA] mb-2.5">
              Stay Ahead of Autonomous Operations & Industrial AI
            </h3>

            <p className="text-xs sm:text-sm text-[#A5A29B] leading-relaxed mb-6">
              Join South African and regional corporate leaders receiving fortnightly engineering insights, real-world cross-dock and logistics case studies, and operational blueprints.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-sm bg-[#16181b] border border-[#C8AE82]/50 flex items-center gap-3 text-xs font-mono text-[#C8AE82]">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <div>
                  <div className="font-bold">SUBSCRIPTION CONFIRMED</div>
                  <div className="text-[11px] text-[#A5A29B] mt-0.5">
                    We look forward to sharing our upcoming architectural dispatch with you.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#666] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    id="exit-modal-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="executive.email@company.co.za"
                    disabled={isSubmitting}
                    className="w-full bg-[#17191c] border border-[#2d3036] rounded-sm py-2.5 pl-10 pr-3 text-xs sm:text-sm text-[#F3F0EA] placeholder-[#666] focus:outline-none focus:border-[#C8AE82] transition-colors font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-sm bg-[#C8AE82] hover:bg-[#E5D1B0] text-[#080909] font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Receive Architectural Dispatches</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#777]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#C8AE82]" />
                    POPIA Protected · Strictly Zero Spam
                  </span>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="hover:text-[#AAA] underline cursor-pointer"
                  >
                    No thanks, browse site
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
