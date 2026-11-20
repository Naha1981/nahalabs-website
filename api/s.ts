import { readLink, recordHit, HITS_PREFIX, BOT_RE } from "./_links.js";

const OG_IMAGE = "https://www.nahalabs.co.za/assets/og/s.png";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Branded short-link redirect: /s/<slug> -> stored destination (307).
 * Unknown slugs get a 404; counting never blocks the redirect.
 * Link-preview crawlers (WhatsApp, social unfurlers) get a small HTML page
 * with Open Graph tags - the NahaLabs logo as the thumbnail - instead of the
 * bare redirect, so shared /s/ links unfurl with our logo. Crawler hits are
 * already classified bot, so human click counts are unaffected.
 */
export default async function handler(req: any, res: any) {
  const slug = String(req.query?.slug || "").toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,39}$/.test(slug)) {
    return res.status(404).json({ error: "Unknown short link" });
  }
  const def = await readLink(slug);
  if (!def) {
    return res.status(404).json({ error: "Unknown short link" });
  }
  await recordHit(HITS_PREFIX, slug, req);

  const ua = String(req.headers?.["user-agent"] || "");
  if (BOT_RE.test(ua)) {
    const dest = esc(def.url);
    const shortUrl = esc(`https://www.nahalabs.co.za/s/${slug}`);
    const title = esc(def.ogTitle || "NahaLabs");
    const desc = esc(def.ogDescription || "Intelligent systems engineering and revenue recovery, Johannesburg, South Africa.");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(`<!doctype html><html><head><meta charset="utf-8">
<title>${title}</title>
<link rel="canonical" href="${dest}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="NahaLabs">
<meta property="og:url" content="${shortUrl}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${OG_IMAGE}">
<meta http-equiv="refresh" content="0;url=${dest}">
</head><body></body></html>`);
    return;
  }

  res.statusCode = 307;
  res.setHeader("Location", def.url);
  res.setHeader("Cache-Control", "no-store");
  res.end();
}
