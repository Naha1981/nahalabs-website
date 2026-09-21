const dataSourceId = process.env.NOTION_DATA_SOURCE_ID || "c139f529-f6a0-44fe-a844-2f6c1cbff629";

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);

function propertyText(property: any) {
  return property?.title?.[0]?.plain_text || property?.rich_text?.[0]?.plain_text || "";
}

function propertyUrl(property: any) {
  return property?.url || null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const slug = String(req.query?.slug || "");
  if (!slug) return res.status(400).json({ error: "Missing slug" });

  const token = process.env.NOTION_TOKEN;
  if (!token) return res.status(200).json({ heroImageUrl: null, videoUrl: null });

  const response = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ page_size: 100 })
  });

  if (!response.ok) return res.status(502).json({ error: "Content source unavailable" });

  const data = await response.json() as any;
  const page = (data.results || []).find((item: any) =>
    slugify(propertyText(item.properties?.Content)) === slug
  );

  if (!page) return res.status(404).json({ error: "Content not found" });

  return res.status(200).json({
    heroImageUrl: propertyUrl(page.properties?.["Hero Image URL"]),
    videoUrl: propertyUrl(page.properties?.["Video URL"])
  });
}
