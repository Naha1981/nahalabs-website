/**
 * Build-time prerender.
 *
 * The site is a client-rendered React app, so the raw HTML that most AI and search
 * crawlers fetch (they do not run JavaScript) is an empty <div id="root">.
 * This script runs after `vite build`, renders each real URL to static markup with the
 * same components, and writes it into dist/ with route-specific <head> tags and JSON-LD.
 * The browser bundle then takes over exactly as before.
 *
 * Fail closed: a broken prerender must fail CI instead of silently shipping an empty SPA.
 */
import { createServer } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const SITE = 'https://www.nahalabs.co.za';
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
        path: '/contact',
        title: 'Contact NahaLabs | Intelligent Systems Engineering',
        description:
          'Contact NahaLabs about an operational or commercial problem that may benefit from an intelligent system.',
      },
      {
        path: '/audit',
        title: 'Free Website Revenue Leak Audit | NahaLabs',
        description:
          'Find where your website is losing enquiries with a free diagnosis of conversion, trust, mobile and technical leaks.',
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

    const manifest = JSON.parse(await readFile('public/content/manifest.json', 'utf8'));
    if (!Array.isArray(manifest) || new Set(manifest).size !== manifest.length) throw new Error('content manifest must be an array');
    for (const slug of manifest) {
      if (typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) throw new Error('invalid article slug');
      const bundle = JSON.parse(await readFile(`public/content/generated/${slug}.json`, 'utf8'));
      if (bundle.slug !== slug || !bundle.title || !bundle.description || !Array.isArray(bundle.blocks) || !bundle.blocks.length) {
        throw new Error(`invalid article bundle: ${slug}`);
      }
      routes.push({
        path: `/insights/${slug}`, title: `${bundle.title} | NahaLabs`, description: bundle.description,
        ogType: 'article', bundle,
        jsonLd: [jsonLdTag({ '@context': 'https://schema.org', '@type': 'Article',
          headline: bundle.title, description: bundle.description, datePublished: bundle.datePublished,
          mainEntityOfPage: `${SITE}/insights/${slug}`,
          author: { '@id': `${SITE}/about#founder` }, publisher: { '@id': `${SITE}/#organization` },
          inLanguage: 'en-ZA' }, 'nahalabs-generated-jsonld')],
      });
    }
    const insightSummaries = routes.filter(route => route.bundle).map(route => ({ slug: route.bundle.slug, title: route.bundle.title, description: route.bundle.description }));
    globalThis.__SSR_INSIGHTS__ = insightSummaries;
    let written = 0;
    for (const route of routes) {
      const markup = await render(route.path, route.bundle ?? null);
      if (markup.length < 300 || !/<h[12]\b/.test(markup)) throw new Error(`empty prerender: ${route.path}`);
      let page = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
      if (!route.keepHead) page = withHead(page, route);
      if (route.path === '/insights') page = page.replace('</head>', `<script type="application/json" id="nahalabs-insights-data">${JSON.stringify(insightSummaries).replace(/</g, '\\u003c')}</script></head>`);
      if (route.bundle) page = page.replace('</head>', `<script type="application/json" id="nahalabs-article-data">${JSON.stringify(route.bundle).replace(/</g, '\\u003c')}</script></head>`);
      const file = route.path === '/' ? templatePath : path.join(dist, route.path, 'index.html');
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, page);
      written++;
      console.log(`[prerender] ${route.path.padEnd(64)} ${(markup.length / 1024).toFixed(1)} kB`);
    }

    console.log(`[prerender] wrote ${written} pages`);

    // Use source edit dates, not today's build date, for sitemap lastmod.
    const sourceFor = (route) => route.bundle ? `public/content/generated/${route.bundle.slug}.json`
      : route.path === '/' ? 'src/components/LightHome.tsx'
      : route.path.startsWith('/locations/') ? 'src/data/locations.ts'
      : ({ '/about': 'src/components/EntityProfilePage.tsx', '/systems': 'src/components/PublicSystemsPage.tsx',
          '/press': 'src/components/PressPage.tsx', '/revenuedesk': 'src/components/RevenueDeskPage.tsx',
          '/audit': 'src/components/AuditPage.tsx', '/contact': 'src/components/ContactSection.tsx',
          '/insights': 'src/components/InsightArticlePage.tsx' })[route.path] ?? (route.path.startsWith('/services/') ? 'services/revenue-leak-audit-johannesburg.html' : 'src/components/InsightArticlePage.tsx');
    const lastmodFor = (route) => {
      const source = sourceFor(route);
      const sourceDate = execFileSync('git', ['log', '-1', '--format=%cs', '--', source], { encoding: 'utf8' }).trim();
      const date = sourceDate || route.bundle?.datePublished || '';
      return /^\d{4}-\d{2}-\d{2}$/.test(date) ? `<lastmod>${date}</lastmod>` : '';
    };
    const sitemapRoutes = [...routes, { path: '/services/revenue-leak-audit-johannesburg' }];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes.map(route => `  <url><loc>${SITE}${route.path}</loc>${lastmodFor(route)}</url>`).join('\n')}\n</urlset>\n`;
    await writeFile(path.join(dist, 'sitemap.xml'), sitemap);

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
        throw new Error(`${file} missing from dist/`);
      }
      const text = await readFile(fp, 'utf8');
      const urls = [...text.matchAll(new RegExp(`${SITE.replace(/\./g, '\\.')}(/[^\\s<)\\]"]*)`, 'g'))].map((m) => m[1]);
      const dead = [...new Set(urls)].filter((u) => !resolves(u));
      if (dead.length) throw new Error(`${file} lists missing pages: ${dead.join(', ')}`);
      else console.log(`[prerender] ${file}: all ${new Set(urls).size} URLs resolve`);
    }
  } finally {
    await vite.close();
  }
}

main().catch((err) => {
  console.error('[prerender] failed:', err?.message ?? err);
  process.exit(1);
});
