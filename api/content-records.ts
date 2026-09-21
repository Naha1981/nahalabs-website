import { createHmac, timingSafeEqual } from "node:crypto";

const dataSourceId = process.env.NOTION_DATA_SOURCE_ID || "c139f529-f6a0-44fe-a844-2f6c1cbff629";

function validSession(req: any) {
  const cookie = String(req.headers?.cookie || "").split(";").map((v: string) => v.trim()).find((v: string) => v.startsWith("nahalabs_content_session="));
  if (!cookie) return false;

  const raw = decodeURIComponent(cookie.split("=").slice(1).join("="));
  const [expiry, signature] = raw.split(".");
  if (!expiry || !signature || Date.now() > Number(expiry)) return false;

  const expected = createHmac("sha256", process.env.CONTENT_ADMIN_PASSWORD || "").update(expiry).digest("hex");
  return expected.length === signature.length && timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

function propertyText(property: any) {
  return property?.title?.[0]?.plain_text || property?.rich_text?.[0]?.plain_text || "";
}

function propertySelect(property: any) {
  return property?.select?.name || property?.status?.name || "";
}

function propertyUrl(property: any) {
  return property?.url || null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!validSession(req)) return res.status(401).json({ error: "Unauthorized" });

  const token = process.env.NOTION_TOKEN;
  if (!token) return res.status(500).json({ error: "NOTION_TOKEN is not configured" });

  const response = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ page_size: 100 })
  });

  if (!response.ok) return res.status(502).json({ error: await response.text() });

  const data = await response.json() as any;
  const records = (data.results || []).map((page: any) => ({
    id: page.id,
    title: propertyText(page.properties?.Content),
    status: propertySelect(page.properties?.Status),
    format: propertySelect(page.properties?.Format),
    heroImageUrl: propertyUrl(page.properties?.["Hero Image URL"]),
    videoUrl: propertyUrl(page.properties?.["Video URL"])
  })).filter((item: any) => item.title);

  return res.status(200).json({ records });
}
