import { put } from "@vercel/blob";

/**
 * Stores enquiry-form submissions so they are no longer lost.
 *
 * Previously the form only wrote to the visitor's own browser localStorage while
 * telling them the brief had been "transmitted" - nothing was ever sent anywhere
 * NahaLabs could read it. This writes each submission as a private JSON blob
 * (access: "private" - not reachable via a public URL) so it survives past the
 * visitor's session. Swap the storage call for a CRM/email integration later
 * without changing the client contract (POST -> { ok, reference } | { error }).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple per-instance rate limit. Resets on cold start; good enough to blunt
// casual abuse without a datastore of its own.
const limit = new Map<string, { count: number; resetAt: number }>();

function clip(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const forwarded = String(req.headers["x-forwarded-for"] || "");
  const ip = forwarded.split(",")[0].trim() || String(req.socket?.remoteAddress || "unknown");
  const now = Date.now();
  const current = limit.get(ip);
  if (!current || current.resetAt <= now) {
    limit.set(ip, { count: 1, resetAt: now + 60_000 });
  } else {
    current.count += 1;
    if (current.count > 8) {
      return res.status(429).json({ error: "Too many submissions. Please try again shortly, or email ai-solutions@nahalabs.co.za directly." });
    }
  }

  try {
    const raw = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Honeypot field: present in the form markup, hidden from real visitors via CSS,
    // and invisible to screen readers. Only a bot filling every field trips it.
    // Pretend success so the bot doesn't learn to adapt.
    if (clip(raw?.website, 500)) {
      return res.status(200).json({ ok: true, reference: `NL-ENQ-${now.toString(36).toUpperCase()}` });
    }

    const name = clip(raw?.name, 200);
    const company = clip(raw?.company, 200);
    const email = clip(raw?.email, 320);

    if (!name || !company || !email) {
      return res.status(400).json({ error: "Name, company and work email are required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.error("[enquiries] BLOB_READ_WRITE_TOKEN is not configured");
      return res.status(500).json({ error: "Submission storage is not configured yet. Please email ai-solutions@nahalabs.co.za directly." });
    }

    const reference = `NL-ENQ-${now.toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record = {
      reference,
      submittedAt: new Date(now).toISOString(),
      name,
      company,
      email,
      phone: clip(raw?.phone, 60),
      location: clip(raw?.location, 200),
      stakeholderType: clip(raw?.stakeholderType, 100),
      regionalDesk: clip(raw?.regionalDesk, 200),
      businessArea: clip(raw?.businessArea, 300),
      urgency: clip(raw?.urgency, 200),
      problem: clip(raw?.problem, 6000),
      sourceIp: ip,
      userAgent: clip(req.headers["user-agent"], 300),
      pageUrl: clip(raw?.pageUrl, 500),
    };

    await put(`nahalabs/enquiries/${new Date(now).toISOString().slice(0, 10)}/${reference}.json`, JSON.stringify(record, null, 2), {
      access: "private",
      token,
      contentType: "application/json",
    });

    return res.status(200).json({ ok: true, reference });
  } catch (error) {
    console.error("[enquiries]", error);
    return res.status(500).json({ error: "Something went wrong. Please email ai-solutions@nahalabs.co.za directly." });
  }
}
