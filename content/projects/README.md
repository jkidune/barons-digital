# Publish case studies via GitHub

This folder holds **approved project case studies** for the Barons Digital website. The GitHub workflow publishes a project into the existing Sanity `production` dataset. The site then reads published projects from Sanity (with a ~60-second revalidation window).

## Setup

Add the Sanity **Editor** API token as GitHub Actions secret `SANITY_API_WRITE_TOKEN` in this repository. Never commit a token, paste it into an issue, or share it in chat.

The workflow **validates project JSON changes on pull requests** and **automatically publishes newly approved project JSON changes when merged into `main`**. It can also be run manually from GitHub Actions: validation-only by default, with an explicit **publish** checkbox for manual writes. The workflow has `contents: read` and cannot commit to your repository.

## Prepare a project

Create `content/projects/my-project.json` (replace the example values with verified client/project facts) and keep its images in `content/projects/assets/`.

```json
{
  "title": "Project name",
  "slug": "project-name",
  "category": "Website Development",
  "year": "2026",
  "client": "Client name",
  "scope": "Strategy, Design, Development",
  "timeline": "2 months",
  "services": ["Website Strategy", "UX/UI Design", "Development"],
  "summary": ["A concise description of the delivered work."],
  "overview": "What this project is and why it matters.",
  "problem": "The specific challenge the client faced.",
  "solution": "What we delivered and how it addressed that challenge.",
  "coverImagePath": "assets/project-name-cover.jpg",
  "media": [
    {
      "type": "image",
      "imagePath": "assets/project-name-screenshot.jpg",
      "caption": "A caption for the screenshot."
    }
  ]
}
```

Supported additional fields match `src/sanity/schemaTypes/project.ts`: `order`, `projectType`, `clientType`, `duration`, `role`, `liveUrl`, `previewVideo`, `iconPath`, `keywords`, `introductionTitle`, `introduction`, `challenge`, `approach`, `features`, and `outcome`. Array text fields contain arrays of strings.

Image paths (`coverImagePath`, `iconPath`, `media[].imagePath`) are relative to `content/projects/` and must point to JPG, PNG, or WebP files committed to the repository. Alternatively, use `coverImageDriveId` and `media[].imageDriveId` for reviewed, link-accessible photos on Google Drive. Drive IDs are used to fetch and import the images once into Sanity, without adding large photos to public Git history. The script checks that downloaded content is an actual image before upload. Image sources must be available to the GitHub Actions runner. The script uploads images as proper Sanity image assets. Video media should use `{"type":"video","videoUrl":"https://..."}`. The `previewVideo` field also accepts a site-local path like `/videos/work/project/preview.mp4`.

Do not include private client information, unsupported impact claims, unlicensed images or credentials in project content.

## Validate / Publish

1. Submit and review a project JSON file through a pull request. The PR workflow validates all changed case studies without using the secret or writing to Sanity.
2. Once approved, merging the content to `main` automatically imports its images and publishes the case study to Sanity production using `SANITY_API_WRITE_TOKEN`.
3. For manual updates or retries, open **Actions → Publish Sanity project → Run workflow**, enter `content/projects/<slug>.json`, and check **publish** only when you intend to write to production.
4. Verify the project on `/work` and `/work/<slug>` after Sanity's normal revalidation window.

A local read-only check is also supported:

```bash
node scripts/publish-sanity-project.mjs --file content/projects/my-project.json --check
```

The publishing script matches project slugs, updates existing projects, and avoids overwriting fields omitted from the JSON. Image uploads performed before a failed publication may need cleanup in Sanity Studio.

**Rights & privacy:** Only import photographs with the required portfolio rights, notices, and participant consent. The original event files in Google Drive may have link-accessible permissions: do not expose unauthorized photos in public Git history or Sanity.
