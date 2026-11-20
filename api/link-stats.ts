import { adminOk, countHits, HITS_PREFIX, LI_HITS_PREFIX } from "./_links.js";

/**
 * Click report for all tracked links (short links + /li). GET with header
 * X-Admin-Key. Returns per-link total/human/bot counts. This feeds the hourly
 * and end-of-day analytics lines.
 */
export default async function handler(req: any, res: any) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!adminOk(req)) return res.status(401).json({ error: "Invalid admin key" });
  const [shortLinks, li] = await Promise.all([countHits(HITS_PREFIX), countHits(LI_HITS_PREFIX)]);
  return res.status(200).json({ at: new Date().toISOString(), shortLinks, li: li.li || { total: 0, human: 0, bot: 0 } });
}
