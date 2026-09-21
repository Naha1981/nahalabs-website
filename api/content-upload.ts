import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { createHmac, timingSafeEqual } from "node:crypto";

function validSession(req: any) {
  const cookie = String(req.headers?.cookie || "")
    .split(";")
    .map((v: string) => v.trim())
    .find((v: string) => v.startsWith("nahalabs_content_session="));
  if (!cookie) return false;

  const raw = decodeURIComponent(cookie.split("=").slice(1).join("="));
  const [expiry, signature] = raw.split(".");
  if (!expiry || !signature || Date.now() > Number(expiry)) return false;

  const expected = createHmac("sha256", process.env.CONTENT_ADMIN_PASSWORD || "").update(expiry).digest("hex");
  return expected.length === signature.length && timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

function parsePayload(payload: string) {
  const parsed = JSON.parse(payload) as { pageId?: string; field?: "Hero Image URL" | "Video URL" };
  if (!parsed.pageId || !/^[a-f0-9-]{20,}$/i.test(parsed.pageId)) throw new Error("Invalid page ID");
  if (parsed.field !== "Hero Image URL" && parsed.field !== "Video URL") throw new Error("Invalid media field");
  return parsed;
}

async function updateNotion(pageId: string, field: "Hero Image URL" | "Video URL", url: string) {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN is not configured");

  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        [field]: { url },
        "Media Source": { select: { name: "User supplied" } }
      }
    })
  });

  if (!response.ok) throw new Error("Notion update failed: " + await response.text());
}

export default async function handler(request: any, response: any) {
  if (!validSession(request)) return response.status(401).json({ error: "Unauthorized" });

  const body = request.body as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!clientPayload) throw new Error("Missing content target");

        const target = parsePayload(clientPayload);
        const contentTypes = target.field === "Video URL"
          ? ["video/mp4", "video/webm", "video/quicktime"]
          : ["image/jpeg", "image/png", "image/webp", "image/avif"];

        return {
          allowedContentTypes: contentTypes,
          maximumSizeInBytes: target.field === "Video URL" ? 500 * 1024 * 1024 : 15 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify(target)
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const target = parsePayload(tokenPayload);
        await updateNotion(target.pageId, target.field, blob.url);
      }
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error instanceof Error ? error.message : "Upload failed" });
  }
}
