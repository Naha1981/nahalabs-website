import React, { useEffect } from 'react';

export const LIVE_APPS: { path: string; name: string; url: string; notice?: string }[] = [
  { path: '/railwatch', name: 'RailWatch', url: 'https://naha-railwatch.onrender.com/' },
  { path: '/cargo-iq', name: 'CargoIQ', url: 'https://cargo-iq.lovable.app/' },
  { path: '/nutri-tummies', name: 'Nutri Tummies', url: 'https://nutri-tummies.lovable.app/' },
  { path: '/gtg', name: 'FieldProof', url: 'https://gtg-field-evidence-demo.onrender.com/' },
  {
    path: '/netpulse',
    name: 'NetPulse',
    url: 'https://netpulse-demo.onrender.com/',
    notice:
      'Free demo with synthetic (fake) data only. Do not upload real customer data. The first load can take up to a minute while the free server wakes up.',
  },
];

type LiveApp = (typeof LIVE_APPS)[number];

export const AppFramePage: React.FC<{ app: LiveApp }> = ({ app }) => {
  useEffect(() => { document.title = `${app.name} | NahaLabs`; }, [app.name]);
  return (
    <main className="flex h-[100dvh] min-h-0 flex-col bg-white text-[#0B0E10]">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#dce2dc] px-4 py-2 text-sm">
        <a href="/" aria-label="NahaLabs home" className="shrink-0">
          <img src="/nahalabs-logo.svg" alt="NahaLabs" className="h-6 w-auto max-w-[130px]" />
        </a>
        <h1 className="truncate font-medium">{app.name}</h1>
        <a href={app.url} target="_blank" rel="noopener noreferrer" className="shrink-0 underline underline-offset-4 py-2">
          Open directly
        </a>
      </div>
      {app.notice && (
        <p role="note" className="shrink-0 border-b border-[#dce2dc] bg-[#f4f7f4] px-4 py-2 text-xs text-[#33403a]">
          {app.notice}
        </p>
      )}
      <iframe src={app.url} title={app.name} className="min-h-0 w-full flex-1 border-0" allow="fullscreen; clipboard-write" />
    </main>
  );
};
