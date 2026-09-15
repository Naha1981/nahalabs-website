import React, { useState, useEffect } from 'react';
import { ContactFormData } from '../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Lock, 
  Building, 
  FileText, 
  Copy, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  AlertCircle,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

interface ContactSectionProps {
  prefilledSystem?: string | null;
}

const DRAFT_STORAGE_KEY = 'nahalabs_contact_form_draft_v1';
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{5,20}$/;

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledSystem }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [maxStepReached, setMaxStepReached] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState<ContactFormData & { regionalDesk?: string }>({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    businessDescription: '',
    problemDescription: prefilledSystem ? `Inquiry regarding deployment of ${prefilledSystem}` : '',
    successDescription: '',
    urgency: 'Immediate (< 30 days)',
    businessArea: prefilledSystem ? 'Revenue Recovery' : 'Operational Systems',
    regionalDesk: 'Sandton Corporate (Gauteng)'
  });

  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-save & draft states
  const [draftRestored, setDraftRestored] = useState(false);
  const [lastAutoSaved, setLastAutoSaved] = useState<string | null>(null);

  // Copy to clipboard state
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Real-time validation state
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // 1. Restore draft on component mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed && parsed.formData && (parsed.formData.name || parsed.formData.email || parsed.formData.problemDescription)) {
          setFormData(prev => ({
            ...prev,
            ...parsed.formData,
            problemDescription: prefilledSystem ? `Inquiry regarding deployment of ${prefilledSystem}` : (parsed.formData.problemDescription || '')
          }));
          if (parsed.currentStep) setCurrentStep(parsed.currentStep);
          if (parsed.maxStepReached) setMaxStepReached(parsed.maxStepReached);
          setDraftRestored(true);
          setLastAutoSaved(parsed.savedAt ? new Date(parsed.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Restored');
        }
      }
    } catch (e) {
      console.warn('Could not read draft from localStorage', e);
    }
  }, []);

  // Update form if prefilledSystem prop changes dynamically
  useEffect(() => {
    if (prefilledSystem) {
      setFormData(prev => ({
        ...prev,
        problemDescription: `Opportunity Diagnosis & Solution: ${prefilledSystem}`,
      }));
    }
  }, [prefilledSystem]);

  // 2. Real-time auto-save debounced effect
  useEffect(() => {
    if (submitted) return;
    const hasSubstantiveContent = Boolean(
      formData.name.trim() || 
      formData.company.trim() || 
      formData.email.trim() || 
      formData.phone.trim() || 
      (formData.problemDescription.trim() && formData.problemDescription !== `Inquiry regarding deployment of ${prefilledSystem}`)
    );

    if (!hasSubstantiveContent) return;

    const timer = setTimeout(() => {
      try {
        const now = new Date();
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
          formData,
          currentStep,
          maxStepReached,
          savedAt: now.toISOString(),
        }));
        setLastAutoSaved(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (e) {
        console.warn('LocalStorage quota or access restriction', e);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [formData, currentStep, maxStepReached, submitted, prefilledSystem]);

  // Validation engine for individual fields
  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 80) return 'Name cannot exceed 80 characters';
        return null;

      case 'company':
        if (!value.trim()) return 'Enterprise / Organisation name is required';
        if (value.trim().length < 2) return 'Company name must be at least 2 characters';
        if (value.trim().length > 100) return 'Company name cannot exceed 100 characters';
        return null;

      case 'email':
        if (!value.trim()) return 'Work email is required';
        if (!EMAIL_REGEX.test(value.trim())) return 'Enter a valid corporate email address (e.g. name@company.co.za)';
        return null;

      case 'phone':
        if (value.trim() && (!PHONE_REGEX.test(value.trim()) || value.trim().replace(/\D/g, '').length < 7)) {
          return 'Enter a valid contact number (minimum 7 digits)';
        }
        return null;

      case 'location':
        if (value.trim().length > 100) return 'Location cannot exceed 100 characters';
        return null;

      case 'problemDescription':
        if (!value.trim()) return 'Operational friction description is required';
        if (value.trim().length < 15) return `Please provide at least 15 characters (${value.trim().length}/15 entered)`;
        if (value.trim().length > 1500) return `Character limit exceeded (maximum 1500)`;
        return null;

      case 'successDescription':
        if (value.trim().length > 500) return 'Success criteria cannot exceed 500 characters';
        return null;

      default:
        return null;
    }
  };

  const handleFieldChange = (field: keyof ContactFormData | 'regionalDesk', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleFieldBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Copy to clipboard helper
  const handleCopy = async (text: string, fieldKey: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedField(fieldKey);
      toast.success(`${label} Copied`, {
        description: `"${text}" copied to clipboard.`,
        duration: 3000,
      });
      setTimeout(() => {
        setCopiedField(prev => (prev === fieldKey ? null : prev));
      }, 2200);
    } catch (err) {
      toast.error('Copy Failed', {
        description: 'Unable to write to clipboard automatically. Please copy manually.',
      });
    }
  };

  // Clear/Discard auto-saved draft
  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      location: '',
      businessDescription: '',
      problemDescription: '',
      successDescription: '',
      urgency: 'Immediate (< 30 days)',
      businessArea: 'Operational Systems',
      regionalDesk: 'Sandton Corporate (Gauteng)'
    });
    setTouched({});
    setErrors({});
    setErrorMsg(null);
    setCurrentStep(1);
    setMaxStepReached(1);
    setDraftRestored(false);
    setLastAutoSaved(null);
    toast.info('Draft Discarded', {
      description: 'The local auto-saved draft has been cleared.',
      duration: 3000,
    });
  };

  const validateStep1 = (): boolean => {
    const nameErr = validateField('name', formData.name);
    const compErr = validateField('company', formData.company);
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone || '');

    setTouched(prev => ({
      ...prev,
      name: true,
      company: true,
      email: true,
      phone: true,
    }));

    setErrors(prev => ({
      ...prev,
      name: nameErr,
      company: compErr,
      email: emailErr,
      phone: phoneErr,
    }));

    if (nameErr || compErr || emailErr || phoneErr) {
      const primaryErr = nameErr || compErr || emailErr || phoneErr;
      setErrorMsg(primaryErr);
      toast.error('Required Information Incomplete', {
        description: primaryErr || 'Please resolve highlighted errors before proceeding.',
      });
      return false;
    }

    setErrorMsg(null);
    return true;
  };

  const validateStep2 = (): boolean => {
    const probErr = validateField('problemDescription', formData.problemDescription);
    const succErr = validateField('successDescription', formData.successDescription || '');

    setTouched(prev => ({
      ...prev,
      problemDescription: true,
      successDescription: true,
    }));

    setErrors(prev => ({
      ...prev,
      problemDescription: probErr,
      successDescription: succErr,
    }));

    if (probErr || succErr) {
      setErrorMsg(probErr || succErr);
      toast.error('Problem Brief Incomplete', {
        description: probErr || succErr || 'Please detail your operational problem.',
      });
      return false;
    }

    setErrorMsg(null);
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
      if (maxStepReached < 2) setMaxStepReached(2);
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
      setCurrentStep(3);
      if (maxStepReached < 3) setMaxStepReached(3);
    }
  };

  const handlePrev = () => {
    setErrorMsg(null);
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
  };

  const handleJumpToStep = (step: 1 | 2 | 3) => {
    if (step === currentStep) return;
    if (step < currentStep) {
      setErrorMsg(null);
      setCurrentStep(step);
    } else if (step === 2) {
      if (validateStep1()) {
        setCurrentStep(2);
        if (maxStepReached < 2) setMaxStepReached(2);
      }
    } else if (step === 3) {
      if (validateStep1() && validateStep2()) {
        setCurrentStep(3);
        if (maxStepReached < 3) setMaxStepReached(3);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent spam rejection

    if (!validateStep1() || !validateStep2()) {
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    const generatedRef = `NL-ENG-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionRef(generatedRef);

    // Lead capture simulation & draft removal
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Clean up auto-saved draft upon successful transmission
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch (err) {
        // ignore
      }

      toast.success('Operational Brief Transmitted', {
        description: `Thank you, ${formData.name}. Brief ${generatedRef} received. Our systems engineering desk will reply within 1 business day.`,
        duration: 7000,
      });

      try {
        const stored = JSON.parse(localStorage.getItem('nahalabs_inquiries') || '[]');
        stored.push({
          ...formData,
          reference: generatedRef,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('nahalabs_inquiries', JSON.stringify(stored));
      } catch (err) {
        // ignore storage errors in private mode
      }
    }, 600);
  };

  const STEPS = [
    { number: 1, title: 'Enterprise', subtitle: 'Identity & Contacts' },
    { number: 2, title: 'Problem Brief', subtitle: 'Friction & Scope' },
    { number: 3, title: 'Execution', subtitle: 'Urgency & Review' },
  ];

  return (
    <section id="contact" className="py-24 sm:py-36 bg-[#080909] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Callout Headline — Centered on mobile, left-aligned on desktop */}
        <div className="max-w-4xl mb-14 sm:mb-20 space-y-4 text-center lg:text-left mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#C8AE82] uppercase mx-auto lg:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8AE82]" />
            <span>Commercial Diagnosis</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F3F0EA] tracking-tight leading-[1.08]">
            There is probably something in your business that should work better. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F0EA] via-[#E5D1B0] to-[#C8AE82]">
              Let’s find it.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#A5A29B] leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Tell us about an operational friction, a manual process, or an unmonitored margin leak. We’ll evaluate whether an intelligent system can solve it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Diagnostic Reassurance */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-sm bg-[#121314] border border-[#222222] space-y-6">
              <h3 className="text-xl font-bold text-[#F3F0EA]">
                Engineering Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#A5A29B] leading-relaxed">
                Initial consultations are conducted directly by systems engineers, not junior account managers. We evaluate technical feasibility and balance sheet return upfront.
              </p>

              {/* Direct Contact Cards with Copy to Clipboard */}
              <div className="space-y-3 pt-2 border-t border-[#1f2022] text-xs font-mono">
                
                {/* Email with Copy to Clipboard */}
                <div className="flex items-center justify-between gap-3 p-2.5 rounded bg-[#161719] border border-[#262626] group hover:border-[#3a3c40] transition-colors">
                  <a 
                    href="mailto:ai-solutions@nahalabs.co.za" 
                    className="flex items-center gap-2.5 text-[#F3F0EA] hover:text-[#C8AE82] transition-colors truncate min-w-0"
                  >
                    <Mail className="w-4 h-4 text-[#C8AE82] shrink-0" />
                    <span className="truncate">ai-solutions@nahalabs.co.za</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('ai-solutions@nahalabs.co.za', 'email', 'Contact Email')}
                    className="px-2 py-1 rounded bg-[#1e2024] hover:bg-[#272a2f] text-[#A5A29B] hover:text-[#C8AE82] border border-[#33373d] transition-all shrink-0 flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C8AE82]" />
                        <span className="text-[#C8AE82] font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Physical Address with Copy to Clipboard */}
                <div className="flex items-center justify-between gap-3 p-2.5 rounded bg-[#161719] border border-[#262626] group hover:border-[#3a3c40] transition-colors">
                  <div className="flex items-center gap-2.5 text-[#A5A29B] truncate min-w-0">
                    <MapPin className="w-4 h-4 text-[#C8AE82] shrink-0" />
                    <span className="truncate">Johannesburg, Gauteng, South Africa</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('Johannesburg, Gauteng, South Africa', 'address', 'Physical Address')}
                    className="px-2 py-1 rounded bg-[#1e2024] hover:bg-[#272a2f] text-[#A5A29B] hover:text-[#C8AE82] border border-[#33373d] transition-all shrink-0 flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                    title="Copy physical address to clipboard"
                    aria-label="Copy physical address"
                  >
                    {copiedField === 'address' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C8AE82]" />
                        <span className="text-[#C8AE82] font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Regional Desk Badge */}
                <div className="flex items-center gap-3 text-[#A5A29B] p-2.5 rounded bg-[#161719] border border-[#262626]">
                  <span className="w-2 h-2 rounded-full bg-[#C8AE82] shrink-0 animate-pulse" />
                  <span className="text-[11px]">Serving South Africa, Lesotho & SADC Corridor</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1f2022]">
                <span className="text-[10px] font-mono text-[#C8AE82] uppercase tracking-widest block mb-1">
                  CORE COMMITMENT
                </span>
                <p className="text-xs text-[#A5A29B]">
                  Diagnosis → Prototype → Production. If intelligence is not the right tool for your problem, we will tell you straight away.
                </p>
              </div>
            </div>

            {/* Quick Regional Contact Card */}
            <div className="p-6 rounded-sm bg-[#101112] border border-[#222] text-xs font-mono text-[#777] space-y-2">
              <div className="text-[#C8AE82] uppercase tracking-wider">
                REGIONAL ENGAGEMENT DESKS
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#A5A29B]">
                <div>• Sandton Corporate</div>
                <div>• Soweto Commerce</div>
                <div>• City Deep Logistics</div>
                <div>• Maseru Cross-Border</div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Step Enterprise Lead Diagnostic Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-sm bg-[#121315] border border-[#262626] shadow-2xl">
              
              {/* Header with Title and Auto-save indicator */}
              <div className="border-b border-[#222222] pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-black text-[#F3F0EA] tracking-tight">
                    START A CONVERSATION.
                  </h3>
                  <p className="text-xs text-[#A5A29B] mt-1">
                    Describe your operational friction. All submissions handled in strict commercial confidence.
                  </p>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  {/* Auto-save Status Badge */}
                  {lastAutoSaved && !submitted && (
                    <div 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#16171a] border border-[#2b2d31] text-[10px] font-mono text-[#A5A29B]"
                      title="Form progress is automatically saved to your local browser storage"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Saved {lastAutoSaved}</span>
                    </div>
                  )}

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161719] border border-[#262626] text-[10px] font-mono text-[#C8AE82] uppercase">
                    <Lock className="w-3 h-3 text-[#C8AE82]" />
                    <span>CONFIDENTIAL</span>
                  </span>
                </div>
              </div>

              {/* Draft Restored Banner */}
              {draftRestored && !submitted && (
                <div className="mb-6 p-3 rounded bg-[#181a1d] border border-[#C8AE82]/30 flex items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#F3F0EA]">
                    <Save className="w-3.5 h-3.5 text-[#C8AE82] shrink-0" />
                    <span>Recovered active draft from previous session.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDiscardDraft}
                    className="text-[11px] text-[#A5A29B] hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                    title="Clear saved draft and start blank"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Discard Draft</span>
                  </button>
                </div>
              )}

              {/* Animated Success State */}
              {submitted ? (
                <div className="py-10 sm:py-14 text-center space-y-6 animate-in fade-in duration-300">
                  {/* Subtle Checkmark Animation */}
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[#C8AE82]/20 animate-success-glow" />
                    <div className="relative w-16 h-16 rounded-full bg-[#1c1a16] border-2 border-[#C8AE82] flex items-center justify-center animate-success-pop shadow-lg shadow-[#C8AE82]/20">
                      <svg 
                        className="w-9 h-9 text-[#C8AE82]" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                      >
                        <path 
                          className="animate-checkmark-draw"
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8AE82]/10 border border-[#C8AE82]/30 text-[11px] font-mono text-[#C8AE82] uppercase mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C8AE82]" />
                      <span>TRANSMISSION CONFIRMED</span>
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-[#F3F0EA] tracking-tight">
                      Problem Brief Received
                    </h4>
                    <p className="mt-2 text-sm text-[#A5A29B] max-w-lg mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name}</strong>. An intelligent systems engineer has been assigned to review your inquiry for <strong>{formData.company}</strong> and will deliver initial technical feedback to <strong>{formData.email}</strong> within 1 business day.
                    </p>
                  </div>

                  {/* Submission Audit & Reference Code Box */}
                  <div className="p-5 rounded bg-[#16171a] border border-[#27292d] max-w-md mx-auto text-left text-xs font-mono space-y-3">
                    <div className="flex items-center justify-between border-b border-[#232529] pb-2.5">
                      <div>
                        <span className="text-[10px] text-[#777] uppercase tracking-wider block">Inquiry Reference</span>
                        <span className="text-sm font-bold text-[#F3F0EA] tracking-wider">{submissionRef}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(submissionRef, 'ref', 'Reference Code')}
                        className="px-2.5 py-1 rounded bg-[#202226] hover:bg-[#282a2f] text-[#A5A29B] hover:text-[#C8AE82] border border-[#33373d] transition-colors flex items-center gap-1.5 text-[11px] cursor-pointer"
                      >
                        {copiedField === 'ref' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#C8AE82]" />
                            <span className="text-[#C8AE82]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Ref</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[#A5A29B] text-[11px]">
                      <div>
                        <span className="text-[#666] block">Client Desk</span>
                        <span className="text-[#F3F0EA] truncate block">{formData.regionalDesk || 'Sandton Corporate'}</span>
                      </div>
                      <div>
                        <span className="text-[#666] block">Operational Domain</span>
                        <span className="text-[#F3F0EA] truncate block">{formData.businessArea}</span>
                      </div>
                      <div>
                        <span className="text-[#666] block">Response SLA</span>
                        <span className="text-[#C8AE82] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>≤ 24 Hours</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-[#666] block">Classification</span>
                        <span className="text-[#F3F0EA]">NDA Protected</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(1);
                        setMaxStepReached(1);
                        setSubmissionRef('');
                        setFormData({
                          name: '',
                          company: '',
                          email: '',
                          phone: '',
                          location: '',
                          businessDescription: '',
                          problemDescription: '',
                          successDescription: '',
                          urgency: 'Immediate (< 30 days)',
                          businessArea: 'Operational Systems',
                          regionalDesk: 'Sandton Corporate (Gauteng)'
                        });
                        setTouched({});
                        setErrors({});
                      }}
                      className="px-6 py-2.5 rounded-full border border-[#333] hover:border-[#C8AE82] text-xs font-mono text-[#A5A29B] hover:text-[#F3F0EA] transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Submit Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Multi-Step Indicator Header */}
                  <div className="mb-8">
                    {/* Top Progress Subtitle */}
                    <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                      <span className="text-[#C8AE82] uppercase tracking-wider font-semibold">
                        STEP {currentStep} OF 3: {STEPS[currentStep - 1].title}
                      </span>
                      <span className="text-[#888]">
                        {currentStep === 1 && '33% COMPLETED'}
                        {currentStep === 2 && '66% COMPLETED'}
                        {currentStep === 3 && 'FINAL REVIEW'}
                      </span>
                    </div>

                    {/* Step Cards / Buttons Indicator Bar */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
                      {STEPS.map((s) => {
                        const isCurrent = currentStep === s.number;
                        const isDone = s.number < currentStep;
                        const isAccessible = s.number <= maxStepReached || isDone;

                        return (
                          <button
                            key={s.number}
                            type="button"
                            onClick={() => isAccessible && handleJumpToStep(s.number as 1 | 2 | 3)}
                            disabled={!isAccessible}
                            className={`p-2.5 sm:p-3 rounded text-left transition-all relative border cursor-pointer ${
                              isCurrent
                                ? 'bg-[#1e1f22] border-[#C8AE82] text-[#F3F0EA]'
                                : isDone
                                ? 'bg-[#141517] border-[#2e3034] text-[#C8AE82] hover:border-[#C8AE82]/60'
                                : 'bg-[#101112] border-[#1d1e20] text-[#555] cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                                  isCurrent
                                    ? 'bg-[#C8AE82] text-[#080909]'
                                    : isDone
                                    ? 'bg-[#C8AE82]/20 text-[#C8AE82]'
                                    : 'bg-[#1e1f22] text-[#666]'
                                }`}
                              >
                                {isDone ? <Check className="w-3 h-3" /> : s.number}
                              </span>
                              <span className="text-xs font-bold truncate">
                                {s.title}
                              </span>
                            </div>
                            <span className="hidden sm:block text-[10px] text-[#888] font-mono truncate pl-7">
                              {s.subtitle}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Continuous Progress Bar Indicator */}
                    <div className="w-full h-1 bg-[#1a1b1d] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C8AE82]/80 to-[#E5D1B0] transition-all duration-300 ease-out"
                        style={{
                          width: currentStep === 1 ? '33.33%' : currentStep === 2 ? '66.66%' : '100%'
                        }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Spam honeypot */}
                    <input
                      type="text"
                      name="website_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {errorMsg && (
                      <div className="p-3.5 rounded bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* STEP 1: Enterprise Profile & Contacts */}
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <div className="text-xs text-[#888] font-mono mb-2 flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-[#C8AE82]" />
                          <span>01 / ENTERPRISE STAKEHOLDER & REGIONAL BASE</span>
                        </div>

                        {/* Name & Company */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name Field */}
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider">
                                Your Name *
                              </label>
                              {touched.name && !errors.name && formData.name && (
                                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Valid
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              maxLength={80}
                              onChange={(e) => handleFieldChange('name', e.target.value)}
                              onBlur={(e) => handleFieldBlur('name', e.target.value)}
                              placeholder="e.g. Sipho Molefe"
                              className={`w-full bg-[#18191b] border rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] placeholder-[#555] focus:outline-none transition-colors ${
                                touched.name && errors.name
                                  ? 'border-red-500/80 bg-red-950/10 focus:border-red-500'
                                  : touched.name && formData.name
                                  ? 'border-[#C8AE82]/60 focus:border-[#C8AE82]'
                                  : 'border-[#2a2a2a] focus:border-[#C8AE82]'
                              }`}
                            />
                            {touched.name && errors.name && (
                              <p className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                <span>{errors.name}</span>
                              </p>
                            )}
                          </div>

                          {/* Company Field */}
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider">
                                Company / Organisation *
                              </label>
                              {touched.company && !errors.company && formData.company && (
                                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Valid
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              required
                              value={formData.company}
                              maxLength={100}
                              onChange={(e) => handleFieldChange('company', e.target.value)}
                              onBlur={(e) => handleFieldBlur('company', e.target.value)}
                              placeholder="e.g. Gauteng Freight Logistics"
                              className={`w-full bg-[#18191b] border rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] placeholder-[#555] focus:outline-none transition-colors ${
                                touched.company && errors.company
                                  ? 'border-red-500/80 bg-red-950/10 focus:border-red-500'
                                  : touched.company && formData.company
                                  ? 'border-[#C8AE82]/60 focus:border-[#C8AE82]'
                                  : 'border-[#2a2a2a] focus:border-[#C8AE82]'
                              }`}
                            />
                            {touched.company && errors.company && (
                              <p className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                <span>{errors.company}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Email Field */}
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider">
                                Work Email *
                              </label>
                              {touched.email && !errors.email && formData.email && (
                                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Valid format
                                </span>
                              )}
                            </div>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => handleFieldChange('email', e.target.value)}
                              onBlur={(e) => handleFieldBlur('email', e.target.value)}
                              placeholder="e.g. name@company.co.za"
                              className={`w-full bg-[#18191b] border rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] placeholder-[#555] focus:outline-none transition-colors ${
                                touched.email && errors.email
                                  ? 'border-red-500/80 bg-red-950/10 focus:border-red-500'
                                  : touched.email && formData.email
                                  ? 'border-[#C8AE82]/60 focus:border-[#C8AE82]'
                                  : 'border-[#2a2a2a] focus:border-[#C8AE82]'
                              }`}
                            />
                            {touched.email && errors.email && (
                              <p className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                <span>{errors.email}</span>
                              </p>
                            )}
                          </div>

                          {/* Phone Field */}
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider">
                                Phone / WhatsApp (Optional)
                              </label>
                              {formData.phone && !errors.phone && (
                                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleFieldChange('phone', e.target.value)}
                              onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                              placeholder="e.g. +27 82 000 0000"
                              className={`w-full bg-[#18191b] border rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] placeholder-[#555] focus:outline-none transition-colors ${
                                touched.phone && errors.phone
                                  ? 'border-red-500/80 bg-red-950/10 focus:border-red-500'
                                  : 'border-[#2a2a2a] focus:border-[#C8AE82]'
                              }`}
                            />
                            {touched.phone && errors.phone && (
                              <p className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                <span>{errors.phone}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Location */}
                        <div>
                          <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider mb-1.5">
                            Location (City / District)
                          </label>
                          <input
                            type="text"
                            maxLength={100}
                            value={formData.location}
                            onChange={(e) => handleFieldChange('location', e.target.value)}
                            placeholder="e.g. Sandton, Soweto, Pretoria, Maseru, City Deep"
                            className="w-full bg-[#18191b] border border-[#2a2a2a] rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] placeholder-[#555] focus:outline-none focus:border-[#C8AE82]"
                          />
                        </div>

                        {/* Step 1 CTA */}
                        <div className="pt-3">
                          <button
                            type="button"
                            onClick={handleNext}
                            className="w-full py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs tracking-wider uppercase hover:bg-[#E5D1B0] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C8AE82]/10"
                          >
                            <span>Proceed To Problem Brief</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Problem Diagnostics & Architecture Scope */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <div className="text-xs text-[#888] font-mono mb-2 flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-[#C8AE82]" />
                          <span>02 / OPERATIONAL FRICTION & REQUIREMENTS</span>
                        </div>

                        {/* Business Area */}
                        <div>
                          <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider mb-1.5">
                            Primary Operational Domain
                          </label>
                          <select
                            value={formData.businessArea}
                            onChange={(e) => handleFieldChange('businessArea' as any, e.target.value)}
                            className="w-full bg-[#18191b] border border-[#2a2a2a] rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] focus:outline-none focus:border-[#C8AE82]"
                          >
                            <option value="Revenue Recovery">Revenue Recovery & Billing Disputes</option>
                            <option value="Sales Intelligence">Sales Intelligence & Predictive Lead Scoring</option>
                            <option value="Operational Systems">Operational Systems & Manifest Automation</option>
                            <option value="Customer Experience">Customer Experience & Omnichannel Routing</option>
                            <option value="Compliance & Regulatory">Compliance, Regulatory & POPIA Governance</option>
                            <option value="Data & Analytics">Real-Time Data Pipelines & Analytics</option>
                            <option value="Automation & Digital Workers">Autonomous Digital Workers</option>
                            <option value="AI / Intelligent Systems">Bespoke Intelligent Agent Architecture</option>
                            <option value="Other Enterprise Problem">Other Complex Engineering Challenge</option>
                          </select>
                        </div>

                        {/* What problem are you trying to solve? */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider">
                              What problem or bottleneck are you trying to solve? *
                            </label>
                            {/* Real-time Character Counter & Validation Status */}
                            <span className={`text-[10px] font-mono ${
                              formData.problemDescription.length < 15
                                ? 'text-amber-400'
                                : formData.problemDescription.length > 1400
                                ? 'text-red-400'
                                : 'text-[#888]'
                            }`}>
                              {formData.problemDescription.length} / 1500 chars (min 15)
                            </span>
                          </div>
                          <textarea
                            required
                            rows={4}
                            maxLength={1500}
                            value={formData.problemDescription}
                            onChange={(e) => handleFieldChange('problemDescription', e.target.value)}
                            onBlur={(e) => handleFieldBlur('problemDescription', e.target.value)}
                            placeholder="Describe the operational friction, manual data entry bottleneck, revenue slippage, or disparate software systems causing pain..."
                            className={`w-full bg-[#18191b] border rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] placeholder-[#555] focus:outline-none transition-colors ${
                              touched.problemDescription && errors.problemDescription
                                ? 'border-red-500/80 bg-red-950/10 focus:border-red-500'
                                : touched.problemDescription && formData.problemDescription.length >= 15
                                ? 'border-[#C8AE82]/60 focus:border-[#C8AE82]'
                                : 'border-[#2a2a2a] focus:border-[#C8AE82]'
                            }`}
                          />
                          {touched.problemDescription && errors.problemDescription && (
                            <p className="mt-1 text-[11px] font-mono text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              <span>{errors.problemDescription}</span>
                            </p>
                          )}
                        </div>

                        {/* What would success look like? */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider">
                              What would measurable success look like? (Optional)
                            </label>
                            <span className="text-[10px] font-mono text-[#777]">
                              {formData.successDescription?.length || 0} / 500 chars
                            </span>
                          </div>
                          <input
                            type="text"
                            maxLength={500}
                            value={formData.successDescription}
                            onChange={(e) => handleFieldChange('successDescription', e.target.value)}
                            onBlur={(e) => handleFieldBlur('successDescription', e.target.value)}
                            placeholder="e.g. Turnaround cut from 4 hours to 10 mins, R500k leakage eliminated"
                            className="w-full bg-[#18191b] border border-[#2a2a2a] rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] placeholder-[#555] focus:outline-none focus:border-[#C8AE82]"
                          />
                        </div>

                        {/* Step 2 CTAs */}
                        <div className="pt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handlePrev}
                            className="py-3 px-5 rounded-full border border-[#333] hover:border-[#666] text-xs font-mono text-[#A5A29B] hover:text-[#F3F0EA] transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Previous</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleNext}
                            className="flex-1 py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs tracking-wider uppercase hover:bg-[#E5D1B0] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C8AE82]/10"
                          >
                            <span>Proceed To Final Review</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Urgency, Regional Desk & Executive Brief Review */}
                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <div className="text-xs text-[#888] font-mono mb-2 flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-[#C8AE82]" />
                          <span>03 / DEPLOYMENT TIMELINE & BRIEF AUDIT</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider mb-1.5">
                              Deployment Urgency
                            </label>
                            <select
                              value={formData.urgency}
                              onChange={(e) => handleFieldChange('urgency' as any, e.target.value)}
                              className="w-full bg-[#18191b] border border-[#2a2a2a] rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] focus:outline-none focus:border-[#C8AE82]"
                            >
                              <option value="Immediate (< 30 days)">Immediate (&lt; 30 days) — Critical</option>
                              <option value="Quarterly priority (1-3 months)">Quarterly priority (1–3 months)</option>
                              <option value="Exploratory architecture">Exploratory architecture / Feasibility</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-[#A5A29B] uppercase tracking-wider mb-1.5">
                              Preferred Regional Desk
                            </label>
                            <select
                              value={formData.regionalDesk}
                              onChange={(e) => handleFieldChange('regionalDesk', e.target.value)}
                              className="w-full bg-[#18191b] border border-[#2a2a2a] rounded px-3.5 py-2.5 text-xs text-[#F3F0EA] focus:outline-none focus:border-[#C8AE82]"
                            >
                              <option value="Sandton Corporate (Gauteng)">Sandton Corporate (Gauteng)</option>
                              <option value="Soweto Commerce & Retail">Soweto Commerce & Retail</option>
                              <option value="City Deep Logistics Corridor">City Deep Logistics Corridor</option>
                              <option value="Maseru Cross-Border Desk (Lesotho)">Maseru Cross-Border Desk (Lesotho)</option>
                              <option value="Remote / Pan-SADC Engagement">Remote / Pan-SADC Engagement</option>
                            </select>
                          </div>
                        </div>

                        {/* Review Summary Card */}
                        <div className="p-4 rounded bg-[#16171a] border border-[#26282c] text-xs font-mono space-y-2">
                          <div className="flex items-center justify-between border-b border-[#222428] pb-2 text-[#C8AE82]">
                            <span className="font-bold">BRIEF SPECIFICATION AUDIT</span>
                            <span className="text-[10px] text-[#888]">NDA PROTECTED</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[#A5A29B]">
                            <div>
                              <span className="text-[#666]">Contact:</span> {formData.name}
                            </div>
                            <div>
                              <span className="text-[#666]">Enterprise:</span> {formData.company}
                            </div>
                            <div>
                              <span className="text-[#666]">Email:</span> {formData.email}
                            </div>
                            <div>
                              <span className="text-[#666]">Domain:</span> {formData.businessArea}
                            </div>
                          </div>
                          {formData.problemDescription && (
                            <div className="pt-2 border-t border-[#202226] text-[#CCC] line-clamp-2">
                              <span className="text-[#666]">Problem:</span> "{formData.problemDescription}"
                            </div>
                          )}
                        </div>

                        {/* Step 3 CTAs */}
                        <div className="pt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handlePrev}
                            className="py-3.5 px-5 rounded-full border border-[#333] hover:border-[#666] text-xs font-mono text-[#A5A29B] hover:text-[#F3F0EA] transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back</span>
                          </button>
                          
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3.5 rounded-full bg-[#C8AE82] text-[#080909] font-bold text-xs tracking-wider uppercase hover:bg-[#E5D1B0] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C8AE82]/10"
                          >
                            {isSubmitting ? (
                              <span>Transmitting Brief...</span>
                            ) : (
                              <>
                                <span>Transmit Operational Brief</span>
                                <Send className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-[10px] font-mono text-[#666] text-center mt-2">
                          Encrypted routing to systems engineering desk · Guaranteed response in 1 business day
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
