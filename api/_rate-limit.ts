import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { get, put } from "@vercel/blob";

// Vercel overwrites this header at ingress. Never trust a visitor's XFF chain
// off-platform. https://vercel.com/docs/headers/request-headers
export function clientIp(req: any): string {
  const value = process.env.VERCEL === "1"
    ? req.headers?.["x-vercel-forwarded-for"]
    : req.socket?.remoteAddress;
  const ip = typeof value === "string" ? value.trim() : "";
  return isIP(ip) ? ip : "unknown";
}

export type CounterStore = {
  read(path: string): Promise<{ count: number; resetAt: number; etag: string } | null>;
  write(path: string, value: { count: number; resetAt: number }, etag?: string): Promise<void>;
};

// Private Blob conditional writes provide one shared counter across functions
// and cold starts. No per-instance Map or lost-update read/modify/write race.
export async function consume(store: CounterStore, path: string, max: number, windowMs: number, now = Date.now()) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const row = await store.read(path);
    if (row && row.resetAt > now && row.count >= max) return false;
    const value = row && row.resetAt > now
      ? { count: row.count + 1, resetAt: row.resetAt }
      : { count: 1, resetAt: now + windowMs };
    try {
      await store.write(path, value, row?.etag);
      return true;
    } catch (error: any) {
      const conflict = ["BlobPreconditionFailedError", "BlobAlreadyExistsError"].includes(error?.constructor?.name)
        || (error?.constructor?.name === "BlobError" && error.message?.includes("This blob already exists"));
      if (!conflict) throw error;
    }
  }
  throw new Error("Rate limiter contention");
}

export async function rateLimit(req: any, res: any, scope: string, max: number, windowMs = 60_000): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    res.status(503).json({ error: "Please try again shortly." });
    return false;
  }
  const ip = clientIp(req);
  const id = createHmac("sha256", token).update(scope + ":" + ip).digest("hex");
  const path = `nahalabs/security/rate-limits/${id}.json`;
  const store: CounterStore = {
    async read(key) {
      const result = await get(key, { access: "private", token, useCache: false });
      if (!result) return null;
      if (!result.stream) throw new Error("Counter unavailable");
      const value = await new Response(result.stream).json();
      if (!Number.isInteger(value.count) || !Number.isFinite(value.resetAt)) throw new Error("Invalid counter");
      return { ...value, etag: result.blob.etag };
    },
    async write(key, value, etag) {
      await put(key, JSON.stringify(value), {
        access: "private", token, addRandomSuffix: false,
        ...(etag ? { ifMatch: etag } : { allowOverwrite: false }),
        contentType: "application/json", cacheControlMaxAge: 60,
      });
    },
  };
  try {
    if (await consume(store, path, max, windowMs)) return true;
    res.setHeader("Retry-After", String(Math.ceil(windowMs / 1000)));
    res.status(429).json({ error: "Too many attempts. Please try again shortly." });
  } catch {
    // Losing storage must not silently remove brute-force protection.
    res.status(503).json({ error: "Please try again shortly." });
  }
  return false;
}
