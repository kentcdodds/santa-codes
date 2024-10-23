import { defineQuery } from 'groq'
import { sanityClient, urlFor } from '#app/sanity/client.server.ts'
import { cachified, cache } from '#app/utils/cache.server.ts'

const toysQuery =
	defineQuery(`*[_type=="toy" && (name match $searchTerm + "*" || _id match $searchTerm + "*" || description match $searchTerm + "*")] {
  _id,
  name,
  description,
  quantity,
	image
}`)

export async function getToys(searchTerm = '') {
	// this is such a Kent-during-a-hackathon thing to do... who adds caching to a hackathon app 😂
	const toys = await cachified({
		key: `search-toys:${searchTerm}`,
		ttl: 1000 * 60 * 60,
		swr: 1000,
		cache,
		async getFreshValue() {
			const toys = await sanityClient.fetch(toysQuery, { searchTerm })
			return toys.map((toy) => ({
				...toy,
				imageUrl: toy.image ? urlFor(toy.image).width(600).url() : null,
			}))
		},
	})
	return toys
}

export async function getToyById(toyId: string) {
	const query = defineQuery(`*[_type == "toy" && _id == $toyId][0]`)
	const toy = await cachified({
		key: `toy:${toyId}`,
		ttl: 1000 * 60 * 60,
		swr: 1000,
		cache,
		getFreshValue() {
			return sanityClient.fetch(query, { toyId })
		},
	})
	return toy
		? {
				...toy,
				imageUrl: toy.image ? urlFor(toy.image).width(600).url() : null,
			}
		: null
}
