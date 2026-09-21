# NahaLabs bulk media library

The Content Engine can use a pre-generated media library in Google Drive.

## Folder layout

Create one root folder:

NahaLabs Content Media

Inside it, create one folder per media pack. The folder name is the engine's `mediaKey`.

Example:

NahaLabs Content Media/
  port-delay-evidence/
    hero.webp
    video.mp4
  restaurant-no-show-recovery/
    hero.webp
    video.mp4

The engine also accepts a flat layout with names such as:

port-delay-evidence__hero.webp
port-delay-evidence__video.mp4

Supported hero formats: JPG, JPEG, PNG, WebP, AVIF.
Supported video formats: MP4, WebM, MOV.

## How the weekly run behaves

1. Gemini researches the week's topic and creates an article plus a stable mediaKey.
2. The engine checks the Google Drive media folder for that mediaKey.
3. When a matching hero image and/or video exists, the engine downloads it from Drive and uploads it to Vercel Blob.
4. The article uses the Vercel Blob URL, not a raw Google Drive URL.
5. Notion receives the media URLs and Media Source = User supplied.
6. If an asset is missing, the engine generates a replacement with AI.
7. The generated bundle goes into Review and a GitHub PR is opened.
8. Only after human approval/merge does the website deployment publish the article.

Google Drive supports downloading raw binary files such as images and videos through the Drive API. Vercel Blob is used as the public delivery layer for the website.

## Required GitHub Actions secrets

GEMINI_API_KEY
NOTION_TOKEN
NOTION_DATA_SOURCE_ID
GOOGLE_SERVICE_ACCOUNT_JSON
GOOGLE_DRIVE_MEDIA_FOLDER_ID
BLOB_READ_WRITE_TOKEN

NOTION_DATA_SOURCE_ID is:

c139f529-f6a0-44fe-a844-2f6c1cbff629

## Google Drive access model

Use a dedicated Google Cloud service account with read-only Drive scope. Share only the NahaLabs Content Media folder with the service account email as Viewer.

Do not put the service-account JSON file in the repository. Store its complete JSON contents only in the GitHub Actions secret GOOGLE_SERVICE_ACCOUNT_JSON.

## One-time Vercel setup

Connect a Vercel Blob store to the NahaLabs website project and create the BLOB_READ_WRITE_TOKEN secret for the GitHub Action.

The Vercel site can then serve the media from Blob URLs while the source library remains in Google Drive.
