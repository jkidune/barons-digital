# Publish case studies via GitHub

This folder holds **approved project case studies** for the Barons Digital website. The GitHub workflow publishes a project into the existing Sanity `production` dataset. The site then reads published projects from Sanity (with a ~60-second revalidation window).

## Setup

Add the Sanity **Editor** API token as GitHub Actions secret `SANITY_API_WRITE_TOKEN` in this repository. Never commit a token, paste it into an issue, or share it in chat.

The workflow is manual, off by default, and requires checking the **publish** box before any Sanity write. The workflow has `contents: read` and cannot commit to your repository.

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

Image paths (`coverImagePath`, `iconPath`, `media[].imagePath`) are relative to `content/projects/` and must point to JPG, PNG, or WebP files committed to the repository. The script uploads images as proper Sanity image assets. Video media should use `{"type":"video","videoUrl":"https://..."}`. The `previewVideo` field also accepts a site-local path like `/videos/work/project/preview.mp4`.

Do not include private client information, unsupported impact claims, unlicensed images or credentials in project content.

## Validate / Publish

1. Submit and approve the content through a GitHub pull request.
2. Once the publishing workflow has been merged to `main`, open **Actions → Publish Sanity project → Run workflow**.
3. Enter the content file path, leave **publish** unchecked, and run to validate without API calls or writes.
4. Review the case study and run again with **publish** checked. This will write to the live Sanity dataset.
5. Verify the project on the website's `/work` listing and `/work/<slug>` page.

From a local clone you can also run:

```bash
node scripts/publish-sanity-project.mjs --file content/projects/my-project.json --check
```

If a Sanity project with the same slug already exists, the script updates it in place and preserves fields that were not supplied in the JSON. It refuses duplicate slugs to avoid ambiguity. Images uploaded before a failed write may need manual asset cleanup.

**Note:** The website's current project adapter substitutes static example-project content when optional fields are empty. To avoid unrelated copy appearing on a newly published page, fill out the introduction, challenge, approach, outcome and other relevant sections before live publication. Review the rendered page after publishing.
