import { put } from "@vercel/blob";

/**
 * Click counter for the LinkedIn profile link (nahalabs.co.za/li).
 *
 * Records one tiny JSON blob per hit, then redirects to the homepage with the
 * same UTM tags the old static redirect used. Stored per hit: timestamp,
 * referrer host, a coarse user-agent class and a probable-bot flag. No IP, no
 * cookies, no fingerprinting. Counting never blocks the redirect: if storage
 * fails or is slow, the visitor still lands on the site.
 */

const DESTINATION = "/?utm_source=linkedin&utm_medium=profile&utm_campaign=about";
const BOT_RE = /bot|crawl|spider|slurp|preview|fetch|monitor|scan|curl|wget|python|go-http|java\/|axios|headless|linkedinbot|facebookexternalhit|whatsapp|telegram|slack|discord|embedly|validator|pingdom|uptime/i;

function referrerHost(value: unknown): string {
  try {
    return new URL(String(value || "")).hostname.slice(0, 100);
  } catch {
    return "";
  }
}

function uaClass(ua: string): string {
  if (/iphone|ipad/i.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  if (/macintosh|windows|linux|cros/i.test(ua)) return "desktop";
  return "other";
}

export default async function handler(req: any, res: any) {
  const now = new Date();
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const ua = String(req.headers["user-agent"] || "");
  const isBot = !ua || BOT_RE.test(ua);

  if (token && req.method !== "HEAD") {
    const record = {
      at: now.toISOString(),
      referrer: referrerHost(req.headers["referer"]),
      ua: uaClass(ua),
      probableBot: isBot,
    };
    const rand = Math.random().toString(36).slice(2, 8);
    const day = now.toISOString().slice(0, 10);
    try {
      await Promise.race([
        put(`nahalabs/li-hits/${day}/${now.getTime()}-${rand}.json`, JSON.stringify(record), {
          access: "private",
          token,
          contentType: "application/json",
        }),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
    } catch (error) {
      console.error("[li] hit not recorded:", error);
    }
  } else if (!token) {
    console.error("[li] BLOB_READ_WRITE_TOKEN is not configured - hit not recorded");
  }

  res.statusCode = 307;
  res.setHeader("Location", DESTINATION);
  res.setHeader("Cache-Control", "no-store");
  res.end();
}
