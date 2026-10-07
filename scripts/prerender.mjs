/**
 * Build-time prerender.
 *
 * The site is a client-rendered React app, so the raw HTML that most AI and search
 * crawlers fetch (they do not run JavaScript) is an empty <div id="root">.
 * This script runs after `vite build`, renders each real URL to static markup with the
 * same components, and writes it into dist/ with route-specific <head> tags and JSON-LD.
 * The browser bundle then takes over exactly as before.
 *
 * Fail-safe by design: any error is logged and the untouched SPA build is kept, so a
 * prerender problem can never block a deploy.
 */
import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SITE = 'https://nahalabs.co.za';
const dist = path.resolve('dist');

const escAttr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const jsonLdTag = (obj, id) =>
  `<script type="application/ld+json"${id ? ` id="${id}"` : ''}>${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

function withHead(template, { title, description, path: routePath, ogType = 'website', jsonLd = [] }) {
  const url = SITE + (routePath === '/' ? '/' : routePath);
  let out = template;
  const swap = (re, replacement) => {
    if (!re.test(out)) console.warn(`[prerender] head tag not found for ${re}`);
    out = out.replace(re, replacement);
  };
  swap(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(title)}</title>`);
  swap(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escAttr(description)}" />`);
  swap(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  swap(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${ogType}" />`);
  swap(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  swap(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escAttr(title)}" />`);
  swap(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escAttr(description)}" />`);
  swap(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escAttr(title)}" />`);
  swap(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escAttr(description)}" />`);
  if (jsonLd.length) out = out.replace('</head>', `    ${jsonLd.join('\n    ')}\n  </head>`);
  return out;
}

async function main() {
  const templatePath = path.join(dist, 'index.html');
  if (!existsSync(templatePath)) throw new Error('dist/index.html not found - run vite build first');
  const template = await readFile(templatePath, 'utf8');
  if (!template.includes('<div id="root"></div>')) throw new Error('root placeholder not found in dist/index.html');

  const vite = await createServer({
    root: process.cwd(),
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  });

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
    const { LOCATIONS_DATA } = await vite.ssrLoadModule('/src/data/locations.ts');
    const article = await vite.ssrLoadModule('/src/components/InsightArticlePage.tsx');
    const entity = await vite.ssrLoadModule('/src/components/EntityProfilePage.tsx');
    const systems = await vite.ssrLoadModule('/src/components/PublicSystemsPage.tsx');
    const revenueDesk = await vite.ssrLoadModule('/src/components/RevenueDeskPage.tsx');
    const press = await vite.ssrLoadModule('/src/components/PressPage.tsx');

    const areaType = { johannesburg: 'City', soweto: 'City', gauteng: 'AdministrativeArea', lesotho: 'Country' };

    const routes = [
      // Home keeps the head already authored in index.html.
      { path: '/', keepHead: true },
      {
        path: '/about',
        title: 'About NahaLabs | Intelligent Systems Engineering',
        description:
          'Company profile for NahaLabs (PTY) Ltd, an intelligent systems engineering company based in Johannesburg, South Africa, founded by Thabiso Naha.',
        jsonLd: [jsonLdTag(entity.getEntityProfileJsonLd(), 'nahalabs-entity-jsonld')],
      },
      {
        path: '/systems',
        title: 'Public Engineering Work | NahaLabs',
        description:
          'Public engineering repositories and system experiments from NahaLabs across revenue intelligence, logistics, restaurant systems, model gateways and agent automation.',
        jsonLd: [jsonLdTag(systems.getPublicSystemsJsonLd(), 'nahalabs-systems-jsonld')],
      },
      {
        path: '/press',
        title: 'Press & Research | NahaLabs',
        description:
          'Company background, public engineering evidence and research themes from NahaLabs, with source requests and founder contact details.',
        jsonLd: [jsonLdTag(press.getPressJsonLd(), 'nahalabs-press-jsonld')],
      },
      {
        path: '/insights',
        title: 'Insights | NahaLabs',
        description:
          'Evidence-led field notes on intelligent systems, revenue, operations, logistics and the places where fragmented information becomes expensive.',
      },
      {
        path: '/revenuedesk',
        title: 'RevenueDesk | AI Front Desk & Revenue Recovery | NahaLabs',
        description:
          "RevenueDesk is NahaLabs' AI front desk for service businesses: capture every enquiry, understand intent, handle follow-up and recover revenue lost between first contact and booked work.",
        jsonLd: [jsonLdTag(revenueDesk.getRevenueDeskJsonLd(), 'nahalabs-revenuedesk-jsonld')],
      },
      {
        path: article.ARTICLE_PATH,
        title: `${article.TITLE} | NahaLabs`,
        description: article.DESCRIPTION,
        ogType: 'article',
        jsonLd: [jsonLdTag(article.getArticleJsonLd(), 'nahalabs-insight-jsonld')],
      },
      ...Object.values(LOCATIONS_DATA).map((loc) => ({
        path: `/locations/${loc.slug}`,
        title: loc.metaTitle,
        description: loc.metaDescription,
        jsonLd: [
          jsonLdTag({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `Intelligent Systems Engineering in ${loc.city}`,
            serviceType: 'Intelligent systems engineering',
            description: loc.metaDescription,
            url: `${SITE}/locations/${loc.slug}`,
            provider: { '@id': `${SITE}/#organization` },
            areaServed: { '@type': areaType[loc.slug] ?? 'AdministrativeArea', name: loc.city },
          }),
        ],
      })),
    ];

    let written = 0;
    for (const route of routes) {
      const markup = await render(route.path);
      let page = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
      if (!route.keepHead) page = withHead(page, route);
      const file = route.path === '/' ? templatePath : path.join(dist, route.path, 'index.html');
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, page);
      written++;
      console.log(`[prerender] ${route.path.padEnd(64)} ${(markup.length / 1024).toFixed(1)} kB`);
    }

    console.log(`[prerender] wrote ${written} pages`);

    // Guard against dead URLs in the files AI engines and search crawlers read first.
    const resolves = (urlPath) => {
      const clean = urlPath.replace(/\/+$/, '') || '/';
      if (clean === '/') return existsSync(path.join(dist, 'index.html'));
      return (
        existsSync(path.join(dist, clean, 'index.html')) ||
        existsSync(path.join(dist, `${clean}.html`)) ||
        existsSync(path.join(dist, clean))
      );
    };
    for (const file of ['sitemap.xml', 'llms.txt']) {
      const fp = path.join(dist, file);
      if (!existsSync(fp)) {
        console.warn(`[prerender] WARNING: ${file} is missing from dist/`);
        continue;
      }
      const text = await readFile(fp, 'utf8');
      const urls = [...text.matchAll(new RegExp(`${SITE.replace(/\./g, '\\.')}(/[^\\s<)\\]"]*)`, 'g'))].map((m) => m[1]);
      const dead = [...new Set(urls)].filter((u) => !resolves(u));
      if (dead.length) console.warn(`[prerender] WARNING: ${file} lists URLs with no page in dist/:\n  ${dead.join('\n  ')}`);
      else console.log(`[prerender] ${file}: all ${new Set(urls).size} URLs resolve`);
    }
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  // Never fail the build: the plain SPA output in dist/ is still valid.
  console.warn('[prerender] skipped, serving the client-rendered build instead:', err?.message ?? err);
  process.exit(0);
});
