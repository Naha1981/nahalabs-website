import React, { useState, useEffect } from 'react';
import { Send, AlertCircle, Check } from 'lucide-react';
import { Button } from './Button';

interface ContactSectionProps {
  prefilledSystem?: string | null;
  /** True when rendered as the standalone /contact page (its heading is the page h1). */
  asPage?: boolean;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface SimpleFormData {
  name: string;
  company: string;
  email: string;
  message: string;
}

const EMPTY_FORM: SimpleFormData = { name: '', company: '', email: '', message: '' };

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledSystem, asPage = false }) => {
  const Heading = (asPage ? 'h1' : 'h2') as 'h1' | 'h2';

  const [formData, setFormData] = useState<SimpleFormData>(EMPTY_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Pre-fill the message when arriving from a system page ("Discuss this system").
  useEffect(() => {
    if (prefilledSystem) {
      setFormData(prev => ({
        ...prev,
        message: prev.message || `I'm interested in ${prefilledSystem}. `,
      }));
    }
  }, [prefilledSystem]);

  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Your name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 80) return 'Name cannot exceed 80 characters';
        return null;
      case 'company':
        if (!value.trim()) return 'Company name is required';
        if (value.trim().length < 2) return 'Company name must be at least 2 characters';
        if (value.trim().length > 100) return 'Company name cannot exceed 100 characters';
        return null;
      case 'email':
        if (!value.trim()) return 'Your email is required';
        if (!EMAIL_REGEX.test(value.trim())) return 'Enter a valid email address (e.g. name@company.co.za)';
        return null;
      case 'message':
        if (!value.trim()) return 'Tell us briefly what you need help with';
        if (value.trim().length < 10) return 'Please add a little more detail (at least 10 characters)';
        if (value.trim().length > 1500) return 'Please keep it under 1500 characters';
        return null;
      default:
        return null;
    }
  };

  const handleFieldChange = (field: keyof SimpleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleFieldBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent spam rejection

    const fields: (keyof SimpleFormData)[] = ['name', 'company', 'email', 'message'];
    const newErrors: Record<string, string | null> = {};
    const newTouched: Record<string, boolean> = {};
    let firstError: string | null = null;
    for (const field of fields) {
      const err = validateField(field, formData[field]);
      newErrors[field] = err;
      newTouched[field] = true;
      if (err && !firstError) firstError = err;
    }
    setErrors(newErrors);
    setTouched(newTouched);
    if (firstError) {
      setErrorMsg(firstError);
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          problem: formData.message,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          website: honeypot, // honeypot field; real visitors leave it empty
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }

      setSubmissionRef(data.reference || '');
      setSubmitted(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof SimpleFormData, filled: boolean) =>
    `w-full bg-white border rounded px-3.5 py-2.5 text-base text-[#0B0E10] placeholder-[#8A929B] focus:outline-none transition-colors ${
      touched[field] && errors[field]
        ? 'border-red-500/80 focus:border-red-500'
        : 'border-[#D1D5DB] focus:border-[#355241]'
    }`;

  const fieldError = (field: keyof SimpleFormData) =>
    touched[field] && errors[field] ? (
      <p className="mt-1 text-sm text-[#B3261E] flex items-center gap-1">
        <AlertCircle className="w-3 h-3 shrink-0" />
        <span>{errors[field]}</span>
      </p>
    ) : null;

  return (
    <section id="contact" data-tone="light" className="section bg-canvas text-fg border-t border-line">
      <div className="wrap">
        <div className="max-w-2xl mx-auto">

          <Heading className="font-serif text-h1 font-medium">
            Start a conversation.
          </Heading>
          <p className="mt-6 text-lead text-fg-2">
            Tell us where your business is losing time or money. We reply within one business day.
          </p>

          {submitted ? (
            <div className="mt-14 py-12 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-white border-2 border-[#355241] flex items-center justify-center">
                <Check className="w-8 h-8 text-[#355241]" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-[#0B0E10] tracking-tight">
                Thank you, {formData.name.split(' ')[0]}.
              </h3>
              <p className="text-sm text-[#4D5660] max-w-md mx-auto leading-relaxed">
                Your message has been received. We will reply to <strong>{formData.email}</strong> within one business day.
              </p>
              {submissionRef && (
                <p className="text-xs font-mono text-[#8A929B]">
                  Reference: {submissionRef}
                </p>
              )}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmissionRef('');
                    setFormData(EMPTY_FORM);
                    setTouched({});
                    setErrors({});
                    setErrorMsg(null);
                  }}
                  className="text-sm text-[#4D5660] hover:text-[#0B0E10] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-12 space-y-5">
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
                <div className="p-3.5 rounded bg-red-50 border border-red-200 text-sm text-[#B3261E] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-[#323A42] mb-1.5">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    maxLength={80}
                    aria-invalid={Boolean(touched.name && errors.name)}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    onBlur={(e) => handleFieldBlur('name', e.target.value)}
                    placeholder="e.g. Sipho Molefe"
                    className={inputClass('name', Boolean(formData.name))}
                  />
                  {fieldError('name')}
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-sm font-semibold text-[#323A42] mb-1.5">
                    Company
                  </label>
                  <input
                    id="contact-company"
                    name="organization"
                    type="text"
                    required
                    autoComplete="organization"
                    value={formData.company}
                    maxLength={100}
                    aria-invalid={Boolean(touched.company && errors.company)}
                    onChange={(e) => handleFieldChange('company', e.target.value)}
                    onBlur={(e) => handleFieldBlur('company', e.target.value)}
                    placeholder="e.g. Gauteng Freight Logistics"
                    className={inputClass('company', Boolean(formData.company))}
                  />
                  {fieldError('company')}
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-[#323A42] mb-1.5">
                  Work email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={(e) => handleFieldBlur('email', e.target.value)}
                  placeholder="e.g. name@company.co.za"
                  className={inputClass('email', Boolean(formData.email))}
                />
                {fieldError('email')}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-[#323A42] mb-1.5">
                  What can we help with?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={1500}
                  value={formData.message}
                  aria-invalid={Boolean(touched.message && errors.message)}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  onBlur={(e) => handleFieldBlur('message', e.target.value)}
                  placeholder="e.g. We lose track of quote follow-ups and it is costing us about R80,000 a month."
                  className={inputClass('message', Boolean(formData.message))}
                />
                {fieldError('message')}
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? (
                    <span>Sending…</span>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-sm text-fg-2 pt-2">
                Prefer email? Write to{' '}
                <a href="mailto:ai-solutions@nahalabs.co.za" className="text-[#0B0E10] underline underline-offset-4 hover:text-[#355241] transition-colors">
                  ai-solutions@nahalabs.co.za
                </a>
              </p>
              <p className="text-sm text-fg-3">
                Johannesburg, South Africa
              </p>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
