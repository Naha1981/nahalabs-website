import { createHmac, timingSafeEqual } from "node:crypto";

function sign(value: string) {
  return createHmac("sha256", process.env.CONTENT_ADMIN_PASSWORD || "").update(value).digest("hex");
}

function verifyPassword(password: string) {
  const expected = process.env.CONTENT_ADMIN_PASSWORD || "";
  if (!expected || password.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
}

function getBody(req: any) {
  if (req.body && typeof req.body === "object") return req.body;
  return {};
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const password = String(getBody(req).password || "");
  if (!verifyPassword(password)) return res.status(401).json({ error: "Invalid password" });

  const payload = Date.now() + 1000 * 60 * 60 * 8;
  const cookie = `${payload}.${sign(String(payload))}`;

  res.setHeader(
    "Set-Cookie",
    `nahalabs_content_session=${cookie}; Path=/; Max-Age=28800; HttpOnly; Secure; SameSite=Strict`
  );

  return res.status(200).json({ ok: true });
}
