import { clientIp, rateLimit } from "./_rate-limit.js";
import { put } from "@vercel/blob";
import { sendLeadAlert } from "./_alert.js";

/**
 * Stores newsletter signups so they are no longer lost.
 * See api/enquiries.ts for the same fix applied to the contact form - previously
 * this only wrote to the visitor's own browser localStorage.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!await rateLimit(req, res, "newsletter", 8)) return;
  const ip = clientIp(req);
  const now = Date.now();

  try {
    const raw = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Honeypot: hidden field a real visitor never fills in.
    if (String(raw?.website || "").trim()) {
      return res.status(200).json({ ok: true });
    }

    const email = String(raw?.email || "").trim().slice(0, 320);
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.error("[newsletter] BLOB_READ_WRITE_TOKEN is not configured");
      return res.status(500).json({ error: "Subscriptions aren't available yet. Please try again later." });
    }

    const record = {
      email,
      subscribedAt: new Date(now).toISOString(),
      source: "footer_subscription_form",
      sourceIp: ip,
    };

    await put(`nahalabs/newsletter/${now}-${email.replace(/[^a-z0-9]/gi, "_")}.json`, JSON.stringify(record, null, 2), {
      access: "private",
      token,
      contentType: "application/json",
    });

    await sendLeadAlert(
      `New newsletter signup: ${email}`,
      [`New newsletter signup`, ``, `Email: ${email}`, `Source: footer form`, `At: ${record.subscribedAt}`].join("\n"),
      email,
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[newsletter]", error);
    return res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
}
