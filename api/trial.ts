import { list, put } from "@vercel/blob";

/**
 * 7-day free trial clock for the container quote tool.
 *
 * GET /api/trial?k=<slug>
 * The first call for a slug stores one tiny blob (trial/<slug>.json). The blob's
 * upload time is the trial start, so there is nothing to read back and nothing
 * to edit in the URL. Returns { status: "active" | "expired", daysLeft, endsAt }.
 * No IP, no cookies. If storage is unreachable the tool fails open (status
 * "active", unmetered) so a customer is never blocked by our outage.
 */

const TRIAL_DAYS = 7;
const DAY_MS = 86_400_000;
const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,39}$/;

export function trialStatus(startMs: number, nowMs: number) {
  const endsMs = startMs + TRIAL_DAYS * DAY_MS;
  const left = Math.ceil((endsMs - nowMs) / DAY_MS);
  return {
    status: nowMs < endsMs ? "active" : "expired",
    daysLeft: Math.min(TRIAL_DAYS, Math.max(0, left)),
    endsAt: new Date(endsMs).toISOString(),
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  const slug = String((req.query && req.query.k) || "").toLowerCase();
  if (!SLUG_RE.test(slug)) {
    res.status(400).json({ status: "invalid" });
    return;
  }
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    res.status(200).json({ status: "active", daysLeft: TRIAL_DAYS, unmetered: true });
    return;
  }
  const path = `nahalabs/container-trials/${slug}.json`;
  const now = Date.now();
  try {
    let found = (await list({ prefix: path, limit: 1, token })).blobs.find((b) => b.pathname === path);
    if (!found) {
      try {
        await put(path, JSON.stringify({ slug, startedAt: new Date(now).toISOString() }), {
          access: "private",
          token,
          addRandomSuffix: false,
          allowOverwrite: false,
          contentType: "application/json",
        });
      } catch {
        /* a parallel first call may have created it; re-list below */
      }
      found = (await list({ prefix: path, limit: 1, token })).blobs.find((b) => b.pathname === path);
    }
    const start = found ? Math.min(new Date(found.uploadedAt).getTime(), now) : now;
    res.status(200).json(trialStatus(start, now));
  } catch {
    res.status(200).json({ status: "active", daysLeft: TRIAL_DAYS, unmetered: true });
  }
}
