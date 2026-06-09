import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '93o5rcrm'
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.SANITY_API_VERSION ?? '2024-01-01'
export const hasSanityConfig = Boolean(projectId && dataset)

export const client = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null

const builder = client ? createImageUrlBuilder(client) : null

/** Build an optimised image URL from a Sanity image reference */
export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error('Sanity image builder is not configured')
  }

  return builder.image(source)
}
