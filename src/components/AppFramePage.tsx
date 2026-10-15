import React, { useEffect, useState } from 'react';

export const LIVE_APPS: { path: string; name: string; url: string; notice?: string }[] = [
  { path: '/railwatch', name: 'RailWatch', url: 'https://naha-railwatch.onrender.com/' },
  { path: '/cargo-iq', name: 'CargoIQ', url: 'https://cargo-iq.lovable.app/' },
  { path: '/nutri-tummies', name: 'Nutri Tummies', url: 'https://nutri-tummies.lovable.app/' },
  { path: '/fieldproof', name: 'FieldProof', url: 'https://fieldproof-demo.onrender.com/' },
  {
    path: '/netpulse',
    name: 'NetPulse',
    url: 'https://netpulse-ai.onrender.com/',
    notice:
      'Free to explore with sample data. Fictional records. Do not upload real customer data yet.',
  },
];

type LiveApp = (typeof LIVE_APPS)[number];

export const AppFramePage: React.FC<{ app: LiveApp }> = ({ app }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    document.title = `${app.name} | NahaLabs`;
    setLoaded(false);
  }, [app.name]);
  return (
    <main className="flex h-[100dvh] min-h-0 flex-col bg-white text-[#0B0E10]">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#dce2dc] px-4 py-2 text-sm">
        <div className="flex min-w-0 shrink-0 items-center gap-4">
          <a href="/" aria-label="NahaLabs home" className="shrink-0">
            <img src="/nahalabs-logo.svg" alt="NahaLabs" className="h-6 w-auto max-w-[130px]" />
          </a>
          <a href="/" className="whitespace-nowrap py-2 underline underline-offset-4">
            &larr; Back to NahaLabs
          </a>
        </div>
        <h1 className="hidden truncate font-medium sm:block">{app.name}</h1>
        <a href={app.url} target="_blank" rel="noopener noreferrer" className="shrink-0 underline underline-offset-4 py-2">
          Open directly
        </a>
      </div>
      {app.notice && (
        <p role="note" className="shrink-0 border-b border-[#dce2dc] bg-[#f4f7f4] px-4 py-2 text-xs text-[#33403a]">
          {app.notice}
        </p>
      )}
      <div className="relative min-h-0 w-full flex-1 bg-white">
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white text-sm text-[#33403a]">
            Loading {app.name}&hellip;
          </div>
        )}
        <iframe
          src={app.url}
          title={app.name}
          onLoad={() => setLoaded(true)}
          className="h-full w-full border-0 bg-white"
          allow="fullscreen; clipboard-write"
        />
      </div>
    </main>
  );
};
