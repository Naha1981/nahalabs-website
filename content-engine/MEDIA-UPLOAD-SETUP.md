# NahaLabs Media Upload Setup

The uploader is available at:

https://nahalabs.co.za/content-admin

## One-time Vercel setup

1. Open the NahaLabs website project in Vercel.
2. Add a Vercel Blob store and connect it to the nahalabs-website project.
3. Vercel Blob supports direct browser uploads and current Vercel documentation says newly connected projects can use OIDC authentication rather than a long-lived Blob token.
4. Add this project environment variable:

CONTENT_ADMIN_PASSWORD

Use a strong private password. Do not put it in GitHub files.

The existing Content Engine also needs:

GEMINI_API_KEY
NOTION_TOKEN
NOTION_DATA_SOURCE_ID=c139f529-f6a0-44fe-a844-2f6c1cbff629

## How the upload works

Choose an article in Content Admin.

Upload:
- Hero image: JPG / PNG / WebP / AVIF, up to 15 MB.
- Video: MP4 / WebM / MOV, up to 500 MB.

Large videos use multipart browser-to-Blob upload so the video does not pass through a small serverless request body.

The upload automatically:
1. stores the public media on Vercel Blob;
2. writes the returned URL into the selected Notion Content record;
3. marks Media Source as User supplied;
4. lets the generated article use that media instead of AI-generated media.

The website never stores the video binary inside Git. The media is delivered from Blob storage.

Vercel Blob's current documentation supports direct client uploads, upload progress, multipart uploads for large files, and public media URLs.
