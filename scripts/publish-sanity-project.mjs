#!/usr/bin/env node
/**
 * Publish a Barons Digital case study to the existing Sanity production dataset.
 * A validation-only run is always performed before any network writes.
 *
 * Usage:
 *   node scripts/publish-sanity-project.mjs --file content/projects/<slug>.json --check
 *   SANITY_API_WRITE_TOKEN=... node scripts/publish-sanity-project.mjs --file content/projects/<slug>.json --publish
 */
import { readFile, realpath } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_DIR = path.resolve(ROOT, 'content/projects')
const PROJECT_ID = '93o5rcrm'
const DATASET = 'production'
const API_VERSION = '2024-01-01'
const BASE_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}`
const ALLOWED_STRINGS = [
  'title', 'category', 'year', 'projectType', 'client', 'clientType',
  'scope', 'timeline', 'duration', 'role', 'liveUrl', 'previewVideo',
  'introductionTitle', 'overview', 'problem', 'solution',
]
const ALLOWED_LISTS = [
  'summary', 'keywords', 'services', 'introduction',
  'challenge', 'approach', 'features', 'outcome',
]

function fail(message) {
  throw new Error(message)
}

function requireString(value, name) {
  if (typeof value !== 'string' || !value.trim()) fail(`Missing or invalid ${name}`)
  return value.trim()
}

function validateUrl(value, field, allowLocal = false) {
  if (allowLocal && value.startsWith('/videos/')) return value
  let url
  try { url = new URL(value) } catch { fail(`Invalid ${field}: expected an HTTP(S) URL`) }
  if (!['http:', 'https:'].includes(url.protocol)) fail(`Invalid protocol for ${field}`)
  return value
}

async function safeLocalPath(reference, field) {
  requireString(reference, field)
  if (path.isAbsolute(reference) || reference.includes('\\')) fail(`Invalid ${field}: use a relative file path`)
  const target = path.resolve(CONTENT_DIR, reference)
  if (target === CONTENT_DIR || !target.startsWith(CONTENT_DIR + path.sep)) fail(`Invalid ${field}: path must remain in content/projects`)
  const resolved = await realpath(target)
  if (!resolved.startsWith(CONTENT_DIR + path.sep)) fail(`Invalid ${field}: file cannot point outside content/projects`)
  return resolved
}

async function imageFile(reference, field) {
  const file = await safeLocalPath(reference, field)
  const ext = path.extname(file).toLowerCase()
  const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[ext]
  if (!mime) fail(`Unsupported image extension for ${field}; use JPG, PNG or WebP`)
  return { file, mime }
}

async function validateProject(filename) {
  const absolute = await safeLocalPath(filename, 'project file')
  if (!absolute.endsWith('.json')) fail('Project file must be JSON')
  const data = JSON.parse(await readFile(absolute, 'utf8'))
  if (!data || typeof data !== 'object' || Array.isArray(data)) fail('Project must be a JSON object')
  const slug = requireString(data.slug, 'slug')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('Slug must contain lowercase letters, numbers and hyphens only')

  const required = ['title', 'category', 'year', 'scope', 'timeline', 'overview', 'problem', 'solution']
  for (const field of required) requireString(data[field], field)

  const document = { _type: 'project', slug: { _type: 'slug', current: slug } }
  for (const key of ALLOWED_STRINGS) {
    if (data[key] === undefined || data[key] === null) continue
    if (typeof data[key] !== 'string') fail(`${key} must be text`)
    document[key] = data[key].trim()
  }
  for (const key of ALLOWED_LISTS) {
    if (data[key] === undefined) continue
    if (!Array.isArray(data[key]) || data[key].some(v => typeof v !== 'string' || !v.trim())) fail(`${key} must be an array of nonempty strings`)
    document[key] = data[key].map(v => v.trim())
  }
  if (!document.summary?.length) fail('summary must contain at least one paragraph')
  if (!document.services?.length) fail('services must contain at least one service')
  if (data.order !== undefined) {
    if (!Number.isFinite(data.order)) fail('order must be a number')
    document.order = data.order
  }
  if (document.liveUrl) validateUrl(document.liveUrl, 'liveUrl')
  if (document.previewVideo) validateUrl(document.previewVideo, 'previewVideo', true)

  if (!data.coverImagePath) fail('coverImagePath is required to avoid a placeholder image on the website')
  await imageFile(data.coverImagePath, 'coverImagePath')
  if (data.iconPath) await imageFile(data.iconPath, 'iconPath')

  const media = data.media ?? []
  if (!Array.isArray(media)) fail('media must be an array')
  for (const [index, item] of media.entries()) {
    if (!item || !['image', 'video'].includes(item.type)) fail(`media[${index}].type must be image or video`)
    if (item.type === 'image') {
      if (!item.imagePath) fail(`media[${index}] requires imagePath`)
      await imageFile(item.imagePath, `media[${index}].imagePath`)
    } else {
      validateUrl(requireString(item.videoUrl, `media[${index}].videoUrl`), `media[${index}].videoUrl`)
    }
    for (const field of ['caption', 'gridClass']) {
      if (item[field] !== undefined && typeof item[field] !== 'string') fail(`media[${index}].${field} must be text`)
    }
  }
  return { data, document, media }
}

async function sanity(endpoint, options = {}) {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) fail('SANITY_API_WRITE_TOKEN is missing from GitHub Actions secrets')
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...options.headers },
  })
  if (!response.ok) {
    const body = await response.text()
    fail(`Sanity API error (HTTP ${response.status}): ${body.slice(0, 500)}`)
  }
  return response.json()
}

async function uploadImage(reference) {
  const { file, mime } = await imageFile(reference, 'image path')
  const fileData = await readFile(file)
  const filename = encodeURIComponent(path.basename(file))
  const result = await sanity(`/assets/images/${DATASET}?filename=${filename}`, {
    method: 'POST',
    headers: { 'Content-Type': mime },
    body: fileData,
  })
  if (!result.document?._id) fail(`Sanity did not return an asset ID for ${reference}`)
  return { _type: 'image', asset: { _type: 'reference', _ref: result.document._id } }
}

async function publishProject(data, document, media) {
  const params = new URLSearchParams({
    query: '*[_type == "project" && slug.current == $slug]{_id,_rev}',
    '$slug': document.slug.current,
  })
  const existing = (await sanity(`/data/query/${DATASET}?${params}`)).result
  if (!Array.isArray(existing)) fail('Unexpected Sanity query result')
  if (existing.length > 1) fail('Multiple Sanity documents have this slug; resolve duplicates in Studio first')

  document.coverImage = await uploadImage(data.coverImagePath)
  if (data.iconPath) document.icon = await uploadImage(data.iconPath)
  else if (existing.length === 0) document.icon = document.coverImage

  document.media = []
  for (const [index, item] of media.entries()) {
    const entry = {
      _type: 'mediaItem',
      _key: `media${index}`,
      type: item.type,
    }
    if (item.caption) entry.caption = item.caption
    if (item.gridClass) entry.gridClass = item.gridClass
    if (item.type === 'image') entry.image = await uploadImage(item.imagePath)
    else entry.videoUrl = item.videoUrl
    document.media.push(entry)
  }

  let mutation
  if (existing.length === 1) {
    // Preserve unmentioned fields (e.g., an icon) while avoiding a lost update.
    mutation = { patch: { id: existing[0]._id, ifRevisionID: existing[0]._rev, set: document } }
  } else {
    mutation = { create: { _id: `project.${document.slug.current}`, ...document } }
  }
  const result = await sanity(`/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations: [mutation] }),
  })
  console.log(`Published project "${document.title}" (${document.slug.current}) to Sanity production.`)
  console.log(`Sanity transaction: ${result.transactionId || 'completed'}`)
}

async function main() {
  const args = process.argv.slice(2)
  const flagIndex = args.indexOf('--file')
  if (flagIndex === -1 || !args[flagIndex + 1]) fail('Supply --file content/projects/<slug>.json')
  const mode = args.includes('--publish') ? 'publish' : 'check'
  const file = args[flagIndex + 1]
  const { data, document, media } = await validateProject(file)
  console.log(`Validated "${document.title}" (${document.slug.current}); ${media.length} media item(s).`)
  if (mode === 'check') {
    console.log('Validation only: no Sanity API requests or changes were made.')
    return
  }
  await publishProject(data, document, media)
}

main().catch(error => { console.error(error.message); process.exitCode = 1 })
