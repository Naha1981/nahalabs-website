import { adminOk, validSlug, validDestination, writeLink, readLink } from "./_links.js";

/**
 * Create or replace a branded short link. POST {slug, url, createdBy?, overwrite?}
 * with header X-Admin-Key. Admin-gated: the public must not mint open redirects.
 */
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!adminOk(req)) return res.status(401).json({ error: "Invalid admin key" });
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const slug = String(body.slug || "").toLowerCase();
  const url = String(body.url || "");
  if (!validSlug(slug)) return res.status(400).json({ error: "Bad slug: 1-40 chars, a-z 0-9 -" });
  if (!validDestination(url)) return res.status(400).json({ error: "Bad url: https only, no /s/ loops" });
  const existing = await readLink(slug);
  if (existing && !body.overwrite) return res.status(409).json({ error: "Slug exists", slug, url: existing.url });
  const def = { url, createdAt: new Date().toISOString(), createdBy: String(body.createdBy || "agent") };
  if (!(await writeLink(slug, def))) return res.status(500).json({ error: "Storage not configured" });
  return res.status(existing ? 200 : 201).json({ ok: true, slug, short: `/s/${slug}`, url });
}
