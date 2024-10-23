import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const SANITY_STUDIO_PROJECT_ID = '0pwsx2hv'
const SANITY_STUDIO_DATASET = 'production'

export const sanityClient = createClient({
	projectId: SANITY_STUDIO_PROJECT_ID,
	dataset: SANITY_STUDIO_DATASET,
	apiVersion: '2024-09-18',
	useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: Parameters<typeof builder.image>[0]) {
	return builder.image(source)
}
