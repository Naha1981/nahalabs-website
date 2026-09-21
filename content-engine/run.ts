import { GoogleGenAI } from "@google/genai";
import { put } from "@vercel/blob";
import { google } from "googleapis";
import { createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pipeline } from "node:stream/promises";
import os from "node:os";
import path from "node:path";

type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

type Bundle = {
  slug: string;
  mediaKey: string;
  title: string;
  description: string;
  category: string;
  product: string;
  datePublished: string;
  hook: string;
  cta: string;
  mediaAltText: string;
  blocks: Block[];
  sources: { title: string; url: string; note: string }[];
  linkedin: { hook: string; body: string }[];
  newsletter: { subject: string; body: string };
  video: { title: string; script: string; keyPoints: string[] };
  heroPrompt: string;
};

const root = process.cwd();
const generatedDir = path.join(root, "public", "content", "generated");
const mediaDir = path.join(root, "public", "content", "media");
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) throw new Error("GEMINI_API_KEY is required");

const ai = new GoogleGenAI({ apiKey });

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);

const schema = {
  type: "object",
  properties: {
    mediaKey: {
      type: "string",
      description: "Short stable kebab-case media library key, 2-5 words. Example: port-delay-evidence"
    },
    title: { type: "string" },
    description: { type: "string" },
    category: { type: "string" },
    product: { type: "string" },
    hook: { type: "string" },
    cta: { type: "string" },
    mediaAltText: { type: "string" },
    blocks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["p", "h2", "quote", "ul"] },
          text: { type: "string" },
          items: { type: "array", items: { type: "string" } }
        },
        required: ["type"]
      }
    },
    sources: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          url: { type: "string" },
          note: { type: "string" }
        },
        required: ["title", "url", "note"]
      }
    },
    linkedin: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          hook: { type: "string" },
          body: { type: "string" }
        },
        required: ["hook", "body"]
      }
    },
    newsletter: {
      type: "object",
      properties: {
        subject: { type: "string" },
        body: { type: "string" }
      },
      required: ["subject", "body"]
    },
    video: {
      type: "object",
      properties: {
        title: { type: "string" },
        script: { type: "string" },
        keyPoints: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 5 }
      },
      required: ["title", "script", "keyPoints"]
    },
    heroPrompt: { type: "string" }
  },
  required: ["mediaKey", "title", "description", "category", "product", "hook", "cta", "mediaAltText", "blocks", "sources", "linkedin", "newsletter", "video", "heroPrompt"]
};

async function createBundle(): Promise<Bundle> {
  const prompt =
    "You are the NahaLabs Content Intelligence Engine. " +
    "Use Google Search grounding to find ONE current, commercially important B2B topic for NahaLabs this week. " +
    "Prioritise South African business operations, logistics, freight, ports, revenue leakage, evidence, intelligent systems, AI Opportunity Engineering, restaurant revenue operations, or enterprise automation. " +
    "Prefer primary sources, regulators, official company publications and reputable reporting. Never invent facts or source URLs. " +
    "Create one 1200-1800 word evidence-aware article, three differentiated LinkedIn posts, one newsletter, one 30-60 second video script and one premium hero-image prompt. " +
    "Also create a short stable mediaKey: 2-5 lowercase kebab-case words describing the topic, suitable for matching a pre-generated media folder. " +
    "NahaLabs is an intelligent systems engineering company / AI Opportunity Engineering company, not a chatbot agency. " +
    "Use calm premium South African English. Separate facts, source-reported claims, analysis and inference. " +
    "Do not make legal-liability conclusions. Connect the topic to a real commercial consequence and a credible NahaLabs opportunity without making the article a sales pitch. " +
    "Return only JSON matching the supplied schema.";

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: schema as any
    }
  });

  if (!response.text) throw new Error("Gemini returned no content");

  const parsed = JSON.parse(response.text) as Omit<Bundle, "slug" | "datePublished">;
  return {
    ...parsed,
    mediaKey: slugify(parsed.mediaKey),
    slug: slugify(parsed.title),
    datePublished: new Date().toISOString().slice(0, 10)
  };
}

type DriveAsset = {
  id: string;
  name: string;
  mimeType: string;
};

function getDriveClient() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!json) return null;

  const credentials = JSON.parse(json);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"]
  });

  return google.drive({ version: "v3", auth });
}

async function listFolder(drive: ReturnType<typeof google.drive>, folderId: string) {
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    pageSize: 1000,
    fields: "files(id,name,mimeType,size,modifiedTime)"
  });

  return (response.data.files || []).filter((file): file is DriveAsset & { mimeType: string } =>
    Boolean(file.id && file.name && file.mimeType)
  );
}

async function findDriveMedia(bundle: Bundle) {
  const drive = getDriveClient();
  const rootFolderId = process.env.GOOGLE_DRIVE_MEDIA_FOLDER_ID;

  if (!drive || !rootFolderId) {
    return { imageUrl: null, videoUrl: null, localImageFile: null, localVideoFile: null, source: "AI generated" as const };
  }

  const rootItems = await listFolder(drive, rootFolderId);
  const slugFolder = rootItems.find(
    (item) => item.mimeType === "application/vnd.google-apps.folder" && item.name === bundle.mediaKey
  );

  const mediaItems = slugFolder ? await listFolder(drive, slugFolder.id) : rootItems;

  const image = mediaItems.find((item) =>
    /^hero\.(jpg|jpeg|png|webp|avif)$/i.test(item.name) ||
    new RegExp(`^${bundle.mediaKey}__hero\\.(jpg|jpeg|png|webp|avif)$`, "i").test(item.name)
  );

  const video = mediaItems.find((item) =>
    /^video\.(mp4|webm|mov)$/i.test(item.name) ||
    new RegExp(`^${bundle.mediaKey}__video\\.(mp4|webm|mov)$`, "i").test(item.name)
  );

  const downloadToTemp = async (asset: DriveAsset, kind: "hero" | "video") => {
    const tmpDir = path.join(os.tmpdir(), "nahalabs-media");
    mkdirSync(tmpDir, { recursive: true });

    const extension = path.extname(asset.name).toLowerCase() || (kind === "hero" ? ".png" : ".mp4");
    const localPath = path.join(tmpDir, Date.now() + "-" + asset.id + extension);

    const downloaded = await drive.files.get(
      { fileId: asset.id, alt: "media" },
      { responseType: "stream" }
    );

    await pipeline(downloaded.data as any, createWriteStream(localPath));
    return localPath;
  };

  const publishTempFile = async (localPath: string, asset: DriveAsset, kind: "hero" | "video") => {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) throw new Error("BLOB_READ_WRITE_TOKEN is required when using Google Drive media");

    const extension = path.extname(asset.name).toLowerCase() || (kind === "hero" ? ".png" : ".mp4");

    const blob = await put(
      `nahalabs/content/${bundle.mediaKey}/${kind}${extension}`,
      createReadStream(localPath) as any,
      {
        access: "public",
        token: blobToken,
        contentType: asset.mimeType
      }
    );

    return blob.url;
  };

  const imagePath = image ? await downloadToTemp(image, "hero") : null;
  const videoPath = video ? await downloadToTemp(video, "video") : null;

  const imageUrl = imagePath && image ? await publishTempFile(imagePath, image, "hero") : null;
  const videoUrl = videoPath && video ? await publishTempFile(videoPath, video, "video") : null;

  return {
    imageUrl,
    videoUrl,
    localImageFile: imagePath,
    localVideoFile: videoPath,
    source: imageUrl || videoUrl ? "User supplied" as const : "AI generated" as const
  };
}

async function createHeroImage(bundle: Bundle) {
  mkdirSync(mediaDir, { recursive: true });

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image",
    contents: bundle.heroPrompt,
    config: {
      responseModalities: ["IMAGE"],
      responseFormat: { image: { aspectRatio: "16:9", imageSize: "1K" } }
    } as any
  });

  const part = response.candidates?.[0]?.content?.parts?.find((item: any) => item.inlineData?.data);
  if (!part) throw new Error("Gemini returned no hero image");

  const file = path.join(mediaDir, bundle.slug + ".png");
  writeFileSync(file, Buffer.from(part.inlineData.data, "base64"));
  return file;
}

function createVideo(bundle: Bundle, imageFile: string) {
  const videoFile = path.join(mediaDir, bundle.slug + ".mp4");
  const titleFile = path.join(mediaDir, bundle.slug + "-title.txt");
  const pointsFile = path.join(mediaDir, bundle.slug + "-points.txt");

  writeFileSync(titleFile, bundle.video.title);
  writeFileSync(pointsFile, bundle.video.keyPoints.map((point, index) => (index + 1) + ". " + point).join("\n"));

  const filter =
    "scale=1920:1080:force_original_aspect_ratio=increase," +
    "crop=1920:1080," +
    "zoompan=z='min(zoom+0.0007,1.12)':d=1:s=1920x1080:fps=30," +
    "drawbox=x=70:y=55:w=1780:h=170:color=black@0.58:t=fill," +
    "drawtext=fontcolor=white:fontsize=50:x=105:y=105:textfile=" + titleFile + ":reload=0," +
    "drawbox=x=70:y=735:w=1780:h=260:color=black@0.64:t=fill," +
    "drawtext=fontcolor=white:fontsize=31:x=105:y=790:textfile=" + pointsFile + ":reload=0";

  execFileSync(
    "ffmpeg",
    ["-y", "-loop", "1", "-i", imageFile, "-t", "24", "-vf", filter, "-r", "30", "-pix_fmt", "yuv420p", "-movflags", "+faststart", videoFile],
    { stdio: "inherit" }
  );

  return videoFile;
}

async function syncNotion(bundle: Bundle, heroUrl: string, videoUrl: string, mediaSource: "AI generated" | "User supplied") {
  const token = process.env.NOTION_TOKEN;
  const dataSourceId = process.env.NOTION_DATA_SOURCE_ID;
  if (!token || !dataSourceId) {
    console.log("Notion sync skipped because credentials are not configured.");
    return;
  }

  const headers = {
    Authorization: "Bearer " + token,
    "Notion-Version": "2025-09-03",
    "Content-Type": "application/json"
  };

  const query = await fetch("https://api.notion.com/v1/data_sources/" + dataSourceId + "/query", {
    method: "POST",
    headers,
    body: JSON.stringify({ page_size: 50 })
  });

  if (!query.ok) throw new Error("Notion query failed: " + query.status + " " + await query.text());

  const result = await query.json() as any;
  const exists = (result.results || []).some((page: any) =>
    page.properties?.Content?.title?.[0]?.plain_text === bundle.title
  );

  if (exists) {
    console.log("Notion already contains this article.");
    return;
  }

  const site = process.env.NAHALABS_SITE_URL || "https://nahalabs.co.za";
  const absolute = (value: string) => value.startsWith("http") ? value : site + value;

  const properties: any = {
    Content: { title: [{ text: { content: bundle.title } }] },
    "Hero Image URL": { url: heroUrl ? absolute(heroUrl) : null },
    "Video URL": { url: videoUrl ? absolute(videoUrl) : null },
    "Media Alt Text": { rich_text: [{ text: { content: bundle.mediaAltText } }] },
    CTA: { rich_text: [{ text: { content: bundle.cta } }] },
    Hook: { rich_text: [{ text: { content: bundle.hook } }] },
    "Product / Campaign": { rich_text: [{ text: { content: bundle.product } }] },
    "Media Source": { select: { name: mediaSource } },
    Notes: {
      rich_text: [{
        text: {
          content:
            `Created by the NahaLabs Content Engine. Media key: ${bundle.mediaKey}. Human approval required before merge/publication.`
        }
      }]
    },
    Format: { select: { name: "Article" } },
    Channel: { select: { name: "Website" } },
    Status: { select: { name: "Review" } },
    "Publish Date": { date: { start: bundle.datePublished } }
  };

  const page = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers,
    body: JSON.stringify({ parent: { data_source_id: dataSourceId }, properties })
  });

  if (!page.ok) throw new Error("Notion page creation failed: " + page.status + " " + await page.text());
}

async function main() {
  mkdirSync(generatedDir, { recursive: true });
  mkdirSync(mediaDir, { recursive: true });

  const bundle = await createBundle();
  const driveMedia = await findDriveMedia(bundle);

  let heroUrl = driveMedia.imageUrl;
  let videoUrl = driveMedia.videoUrl;
  let mediaSource: "AI generated" | "User supplied" = driveMedia.source;

  if (!heroUrl) {
    const imageFile = await createHeroImage(bundle);
    heroUrl = "/content/media/" + bundle.slug + ".png";

    if (!videoUrl) {
      createVideo(bundle, imageFile);
      videoUrl = "/content/media/" + bundle.slug + ".mp4";
    }

    if (!mediaSource) mediaSource = "AI generated";
  } else if (!videoUrl) {
    const imageFile = driveMedia.localImageFile;
    if (imageFile && existsSync(imageFile)) {
      createVideo(bundle, imageFile);
      videoUrl = "/content/media/" + bundle.slug + ".mp4";
    }
  }

  if (!heroUrl && !videoUrl) mediaSource = "AI generated";

  const output = {
    ...bundle,
    heroImageUrl: heroUrl,
    videoUrl,
    mediaSource,
    reviewStatus: "Review",
    generatedAt: new Date().toISOString()
  };

  writeFileSync(
    path.join(generatedDir, bundle.slug + ".json"),
    JSON.stringify(output, null, 2)
  );

  const manifestPath = path.join(root, "public", "content", "manifest.json");
  const manifest = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, "utf8"))
    : [];
  if (!manifest.includes(bundle.slug)) manifest.unshift(bundle.slug);
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  await syncNotion(bundle, heroUrl || "", videoUrl || "", mediaSource);

  console.log("Generated article: " + bundle.title);
  console.log("Media key: " + bundle.mediaKey);
  console.log("Hero: " + (heroUrl || "none"));
  console.log("Video: " + (videoUrl || "none"));
  console.log("Media source: " + mediaSource);
  console.log("Review status: Review");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
