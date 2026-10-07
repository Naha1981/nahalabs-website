import React, { FormEvent, useMemo, useState } from 'react';
import { Button, ButtonLink } from './Button';

type Severity = 'critical' | 'high' | 'medium' | 'low';

type Finding = {
  id?: string;
  severity: Severity;
  category: string;
  title: string;
  description: string;
  whyItMatters: string;
  fixTitle: string;
  fixAction: string;
};

type AuditPayload = {
  score: number;
  grade: string;
  domain: string;
  summary: string;
  metrics: {
    responseMs: number;
    pageSizeKb: number;
    formCount: number;
    imageCount: number;
  };
  findings: Finding[];
  fixPlan: { title: string; description: string; modules: string[] }[];
};

const severityName: Record<Severity, string> = {
  critical: 'Revenue blocker',
  high: 'High impact',
  medium: 'Opportunity',
  low: 'Cleanup',
};

const severityClasses: Record<Severity, string> = {
  critical: 'border-red-200 bg-red-50 text-[#8F1D16]',
  high: 'border-amber-200 bg-amber-50 text-[#7A4B00]',
  medium: 'border-sky-200 bg-sky-50 text-[#174A73]',
  low: 'border-[#D1D5DB] bg-[#F8FAFC] text-[#4D5660]',
};

const money = (value: number) =>
  new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(value);

export const AuditPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [audit, setAudit] = useState<AuditPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visitors, setVisitors] = useState(1000);
  const [rate, setRate] = useState(2);
  const [value, setValue] = useState(2500);

  const roi = useMemo(() => {
    const onePoint = visitors * 0.01;
    return {
      currentLeads: (visitors * rate) / 100,
      onePoint,
      oneRevenue: onePoint * value,
      twoRevenue: onePoint * 2 * value,
    };
  }, [visitors, rate, value]);

  const runAudit = async (event: FormEvent) => {
    event.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Audit failed.');
      setAudit(data.audit);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Audit failed.');
    } finally {
      setLoading(false);
    }
  };

  const domain = audit?.domain ?? '';

  return (
    <div data-tone="light" className="bg-[#F2F4F7] text-[#0B0E10]">
      <main>
        <section className="section border-b border-line">
          <div className="wrap">
            <div className="max-w-4xl">
              <p className="text-caption font-mono uppercase tracking-[0.18em] text-accent">Free website diagnosis</p>
              <h1 className="mt-5 text-display font-semibold tracking-tight">
                Find where your website is losing enquiries.
              </h1>
              <p className="mt-6 max-w-3xl text-lead text-fg-2">
                Enter a website. We inspect the public page for conversion, trust, mobile and technical leaks, then show you what to fix first.
              </p>
              <form onSubmit={runAudit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-3xl">
                <label htmlFor="audit-url" className="sr-only">Website URL</label>
                <input
                  id="audit-url"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://yourbusiness.co.za"
                  required
                  className="flex-1 min-h-12 rounded-lg border border-[#6B7280] bg-white px-4 text-base text-[#0B0E10] placeholder:text-[#4D5660] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#355241]"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? 'Scanning…' : 'Run Free Audit'}
                </Button>
              </form>
              <p className="mt-3 text-sm text-fg-3">No login. No credit card. One public page is scanned.</p>
              {error && (
                <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-[#8F1D16]" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>
        </section>

        {audit && (
          <>
            <section className="section border-b border-line">
              <div className="wrap grid lg:grid-cols-[220px_1fr] gap-6">
                <div className="rounded-lg border border-line-strong bg-white p-6 text-center">
                  <div className="text-sm font-semibold text-fg-3">Revenue leak score</div>
                  <div className="mt-3 text-6xl font-semibold tracking-tight">{audit.score}</div>
                  <div className="text-sm text-fg-3">out of 100</div>
                  <div className="mt-4 text-sm font-semibold text-accent">{audit.grade.replaceAll('-', ' ')}</div>
                </div>
                <div className="rounded-lg border border-line bg-white p-6">
                  <p className="text-sm font-mono text-fg-3">{domain}</p>
                  <h2 className="mt-3 text-h2 font-semibold">Here is what we found.</h2>
                  <p className="mt-4 text-body text-fg-2">{audit.summary}</p>
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      ['Response', `${audit.metrics.responseMs}ms`],
                      ['HTML', `${audit.metrics.pageSizeKb}KB`],
                      ['Forms', String(audit.metrics.formCount)],
                      ['Images', String(audit.metrics.imageCount)],
                    ].map(([label, metric]) => (
                      <div key={label} className="rounded-lg border border-line bg-[#F7F8FA] p-4">
                        <div className="text-xs font-mono uppercase tracking-wide text-fg-3">{label}</div>
                        <div className="mt-2 text-lg font-semibold">{metric}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="section border-b border-line">
              <div className="wrap">
                <p className="text-caption font-mono uppercase tracking-[0.18em] text-accent">Priority findings</p>
                <h2 className="mt-3 text-h1 font-semibold">Fix these first.</h2>
                <p className="mt-3 text-body text-fg-2">{audit.findings.length} findings detected</p>
                <div className="mt-8 space-y-4">
                  {audit.findings.slice(0, 8).map((finding, index) => (
                    <article key={finding.id ?? `${finding.title}-${index}`} className="rounded-lg border border-line bg-white p-5 sm:p-6">
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${severityClasses[finding.severity]}`}>
                          {severityName[finding.severity]}
                        </span>
                        <span className="rounded-md border border-line bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-fg-3">
                          {finding.category}
                        </span>
                      </div>
                      <h3 className="mt-4 text-h3 font-semibold">{finding.title}</h3>
                      <p className="mt-2 text-body text-fg-2">{finding.description}</p>
                      <div className="mt-5 grid md:grid-cols-2 gap-3">
                        <div className="rounded-lg border border-line bg-[#F7F8FA] p-4">
                          <div className="text-xs font-semibold text-fg-3">Why it matters</div>
                          <p className="mt-2 text-sm leading-6 text-fg-2">{finding.whyItMatters}</p>
                        </div>
                        <div className="rounded-lg border border-[#B7CCBF] bg-[#EEF5F0] p-4">
                          <div className="text-xs font-semibold text-accent">Recommended fix</div>
                          <p className="mt-2 text-sm leading-6 text-fg-2">{finding.fixAction}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="section">
              <div className="wrap">
                <div className="max-w-3xl">
                  <p className="text-caption font-mono uppercase tracking-[0.18em] text-accent">NahaLabs fix stack</p>
                  <h2 className="mt-3 text-h1 font-semibold">The audit turns into work.</h2>
                  <p className="mt-4 text-body text-fg-2">
                    Every finding maps to a concrete implementation layer. The next conversation is about fixing the leak, not buying another report.
                  </p>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  {audit.fixPlan.map((fix) => (
                    <article key={fix.title} className="rounded-lg border border-line bg-white p-6">
                      <h3 className="text-h3 font-semibold">{fix.title}</h3>
                      <p className="mt-3 text-body text-fg-2">{fix.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {fix.modules.map((module) => (
                          <span key={module} className="rounded-md border border-line bg-[#F8FAFC] px-2.5 py-1 text-xs text-fg-3">{module}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink
                    href={`https://wa.me/?text=${encodeURIComponent(`Hi NahaLabs — I ran the free Revenue Leak Audit for ${domain}. Score: ${audit.score}/100. I want help fixing the highest-impact leaks.`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Send This Audit to NahaLabs
                  </ButtonLink>
                  <ButtonLink href="/revenuedesk" variant="secondary">See RevenueDesk</ButtonLink>
                </div>
              </div>
            </section>

            <section className="section border-t border-line">
              <div className="wrap">
                <p className="text-caption font-mono uppercase tracking-[0.18em] text-accent">ROI scenario</p>
                <h2 className="mt-3 text-h1 font-semibold">Put a value on one extra percentage point.</h2>
                <p className="mt-4 text-body text-fg-2">A scenario calculator, not a promise. Change the inputs to model your own economics.</p>

                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-line bg-white p-6 space-y-7">
                    {[
                      ['Monthly visitors', visitors, setVisitors, 0, 100000, 50, visitors.toLocaleString('en-ZA')],
                      ['Current enquiry conversion %', rate, setRate, 0, 20, 0.1, String(rate)],
                      ['Gross profit per customer', value, setValue, 0, 100000, 50, money(value)],
                    ].map(([label, current, setter, min, max, step, display]) => (
                      <div key={String(label)}>
                        <div className="flex items-center justify-between gap-4 text-sm font-semibold text-fg-2">
                          <span>{label}</span>
                          <span>{display}</span>
                        </div>
                        <input
                          aria-label={String(label)}
                          className="mt-3 w-full accent-[#355241]"
                          type="range"
                          min={Number(min)}
                          max={Number(max)}
                          step={Number(step)}
                          value={Number(current)}
                          onChange={(event) => (setter as React.Dispatch<React.SetStateAction<number>>)(Number(event.target.value))}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-[#B7CCBF] bg-[#EEF5F0] p-6">
                    <div className="text-sm font-semibold text-accent">Scenario output</div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-fg-3">Current monthly enquiries</div>
                        <div className="mt-1 text-3xl font-semibold">{roi.currentLeads.toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-fg-3">Enquiries from +1pp</div>
                        <div className="mt-1 text-3xl font-semibold">{roi.onePoint.toFixed(0)}</div>
                      </div>
                    </div>
                    <div className="mt-6 text-sm text-fg-3">Value of +1pp</div>
                    <div className="text-4xl font-semibold">{money(roi.oneRevenue)}</div>
                    <div className="mt-5 text-sm text-fg-3">Value of +2pp</div>
                    <div className="text-4xl font-semibold">{money(roi.twoRevenue)}</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};
