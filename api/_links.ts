import { timingSafeEqual } from "node:crypto";
import { put, list } from "@vercel/blob";

/**
 * Shared helpers for branded short links (nahalabs.co.za/s/<slug>).
 * Link definitions live at nahalabs/links/<slug>.json; one tiny JSON blob per
 * hit at nahalabs/s-hits/<slug>/<day>/<ts>-<rand>.json. No IP, no cookies, no
 * fingerprinting. Admin endpoints are gated by LINK_ADMIN_KEY so the public
 * cannot mint open redirects or read stats.
 */

export const LINKS_PREFIX = "nahalabs/links/";
export const HITS_PREFIX = "nahalabs/s-hits/";
export const LI_HITS_PREFIX = "nahalabs/li-hits/";

export const BOT_RE = /bot|crawl|spider|slurp|preview|fetch|monitor|scan|curl|wget|python|go-http|java\/|axios|headless|linkedinbot|facebookexternalhit|whatsapp|telegram|slack|discord|embedly|validator|pingdom|uptime/i;

export function adminOk(req: any): boolean {
  const expected = process.env.LINK_ADMIN_KEY || "";
  const given = String(req.headers["x-admin-key"] || "");
  if (!expected || Buffer.byteLength(given) !== Buffer.byteLength(expected)) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

export function validSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]{0,39}$/.test(slug);
}

export function validDestination(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    // Never chain short links (open-redirect/loop guard).
    if (/(^|\.)nahalabs\.co\.za$/i.test(u.hostname) && u.pathname.startsWith("/s/")) return false;
    return true;
  } catch {
    return false;
  }
}

export type LinkDef = { url: string; createdAt: string; createdBy: string };

export async function readLink(slug: string): Promise<LinkDef | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const { blobs } = await list({ prefix: `${LINKS_PREFIX}${slug}.json`, token, limit: 1 });
    const row = blobs.find((b: any) => b.pathname === `${LINKS_PREFIX}${slug}.json`);
    if (!row) return null;
    const r = await fetch((row as any).downloadUrl || (row as any).url, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!r.ok) return null;
    const def = (await r.json()) as LinkDef;
    return def && typeof def.url === "string" ? def : null;
  } catch (error) {
    console.error("[s] link lookup failed:", error);
    return null;
  }
}

export async function writeLink(slug: string, def: LinkDef): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;
  try {
    await put(`${LINKS_PREFIX}${slug}.json`, JSON.stringify(def), {
      access: "private",
      token,
      contentType: "application/json",
      allowOverwrite: true,
    });
    return true;
  } catch (error) {
    console.error("[s] link write failed:", error);
    return false;
  }
}

export async function recordHit(prefix: string, slug: string, req: any): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token || req.method === "HEAD") return;
  const now = new Date();
  const ua = String(req.headers["user-agent"] || "");
  let referrer = "";
  try {
    referrer = new URL(String(req.headers["referer"] || "")).hostname.slice(0, 100);
  } catch {}
  const record = {
    at: now.toISOString(),
    referrer,
    ua: /iphone|ipad/i.test(ua) ? "ios" : /android/i.test(ua) ? "android" : /macintosh|windows|linux|cros/i.test(ua) ? "desktop" : "other",
    probableBot: !ua || BOT_RE.test(ua),
  };
  const rand = Math.random().toString(36).slice(2, 8);
  const day = now.toISOString().slice(0, 10);
  try {
    await Promise.race([
      put(`${prefix}${slug}/${day}/${now.getTime()}-${rand}.json`, JSON.stringify(record), {
        access: "private",
        token,
        contentType: "application/json",
      }),
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]);
  } catch (error) {
    console.error("[s] hit not recorded:", error);
  }
}

export async function countHits(prefix: string): Promise<Record<string, { total: number; human: number; bot: number }>> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const out: Record<string, { total: number; human: number; bot: number }> = {};
  if (!token) return out;
  let cursor: string | undefined;
  do {
    const page: any = await list({ prefix, token, limit: 1000, cursor });
    for (const b of page.blobs) {
      const rest = b.pathname.slice(prefix.length);
      const slug = rest.split("/")[0] || "(li)";
      const key = prefix === LI_HITS_PREFIX ? "li" : slug;
      out[key] = out[key] || { total: 0, human: 0, bot: 0 };
      out[key].total += 1;
      // Hit blobs store the bot flag; read it cheaply only when needed is
      // overkill, so count all and mark bots by pathname only is impossible.
      // We fetch each record to split human/bot (small volume).
      try {
        const r = await fetch((b as any).downloadUrl || (b as any).url, { headers: { authorization: `Bearer ${token}` } });
        const rec = r.ok ? await r.json() : null;
        if (rec && rec.probableBot) out[key].bot += 1; else out[key].human += 1;
      } catch {
        out[key].human += 1;
      }
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out;
}
