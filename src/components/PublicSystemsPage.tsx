import React from 'react';

const SITE = 'https://nahalabs.co.za';

const systems = [
  {
    name: 'RevenueDesk',
    description: 'AI front desk and revenue recovery system for service businesses: capture enquiries, understand intent, act on follow-up and surface revenue leakage.',
    url: 'https://github.com/Naha1981/leadmachine-leadcatch-lovable',
    status: 'Public engineering repository',
  },
  {
    name: 'Demand Radar',
    description: 'Public engineering project for detecting demand signals, validating opportunity evidence and connecting activation to revenue workflows.',
    url: 'https://github.com/Naha1981/demand-rader',
    status: 'Public engineering repository',
  },
  {
    name: 'Flavourly',
    description: 'Restaurant revenue and customer-experience engineering project focused on discovery, basket growth and WhatsApp-connected workflows.',
    url: 'https://github.com/Naha1981/gemino-flavourly',
    status: 'Public engineering repository',
  },
  {
    name: 'CargoIQ',
    description: 'Freight and logistics intelligence project focused on operational evidence, commercial rules, financial exposure and recovery workflows.',
    url: 'https://github.com/Naha1981/cargoiq-qwen',
    status: 'Public engineering repository',
  },
  {
    name: 'NahaLLM',
    description: 'NahaLabs model gateway project for integrating multiple language-model providers behind one application-facing interface.',
    url: 'https://github.com/Naha1981/NahaLLM',
    status: 'Public engineering repository',
  },
  {
    name: 'JEV UltraFast Browser',
    description: 'NahaLabs fork and experimentation surface for browser automation and agent workflows.',
    url: 'https://github.com/Naha1981/jev-ultrafast-browser-naha',
    status: 'Public engineering repository',
  },
];

export const PublicSystemsPage: React.FC = () => (
  <div data-site-theme="light" className="min-h-screen bg-canvas text-fg">
    <header className="border-b border-[#1b1c1f]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between gap-5">
        <a href="/" className="text-[15px] font-extrabold tracking-[0.2em]">NAHALABS</a>
        <a href="/about" className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#A5A29B]">Company profile</a>
      </div>
    </header>

    <main>
      <section className="border-b border-[#1b1c1f]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C8AE82]">Public engineering work</p>
          <h1 className="mt-5 max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-[-0.04em]">
            Systems NahaLabs is building.
          </h1>
          <p className="mt-7 max-w-3xl text-lg sm:text-xl leading-relaxed text-[#A5A29B]">
            These public repositories are engineering evidence. They show what NahaLabs is experimenting with and building; they are not, by themselves, claims of paid customer deployment or measured customer results.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1b1c1f]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-2 gap-4">
          {systems.map((system) => (
            <article key={system.name} className="rounded-xl border border-[#24262a] bg-[#101112] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#C8AE82]">{system.status}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold">{system.name}</h2>
              <p className="mt-3 text-sm leading-7 text-[#A5A29B]">{system.description}</p>
              <a href={system.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center rounded-full border border-[#38342e] px-4 py-2.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[#D7D3CA] hover:border-[#C8AE82] hover:text-[#C8AE82]">
                Open GitHub repository
              </a>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#C8AE82]">Engineering doctrine</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Find the problem. Prove the mechanism. Engineer the system.</h2>
            <p className="mt-5 text-base leading-7 text-[#A5A29B]">
              NahaLabs combines open-source capabilities, models, business logic and operational data into useful systems. The public work page exists so the engineering record remains inspectable.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/insights" className="rounded-full bg-[#C8AE82] px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#080909]">Read the research</a>
            <a href="/#contact" className="rounded-full border border-[#333] px-6 py-3 text-[11px] font-mono uppercase tracking-wider text-[#D7D3CA]">Discuss a system</a>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export const getPublicSystemsJsonLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': SITE + '/systems#page',
      url: SITE + '/systems',
      name: 'NahaLabs Public Engineering Work',
      description: 'Public engineering repositories and system experiments from NahaLabs.',
      isPartOf: { '@id': SITE + '/#website' }
    },
    {
      '@type': 'ItemList',
      '@id': SITE + '/systems#list',
      itemListElement: systems.map((system, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: system.name,
        url: system.url
      }))
    }
  ]
});
