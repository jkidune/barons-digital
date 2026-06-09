import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = process.env.SANITY_API_VERSION ?? '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // set false if you need fresh data at request time
})

const builder = imageUrlBuilder(client)

/** Build an optimised image URL from a Sanity image reference */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
