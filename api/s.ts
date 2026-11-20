import { readLink, recordHit, HITS_PREFIX } from "./_links.js";

/**
 * Branded short-link redirect: /s/<slug> -> stored destination (307).
 * Unknown slugs get a 404; counting never blocks the redirect.
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
  res.statusCode = 307;
  res.setHeader("Location", def.url);
  res.setHeader("Cache-Control", "no-store");
  res.end();
}
