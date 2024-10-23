import { defineQuery } from 'groq'
import { cachified, cache } from './cache.server.ts'
import { sanityClient } from './sanity.server.ts'

const toysQuery =
	defineQuery(`*[_type=="toy" && (name match $searchTerm + "*" || _id match $searchTerm + "*" || description match $searchTerm + "*")] {
  _id,
  name,
  description,
  quantity
}`)

export async function getToys(searchTerm: string) {
	// this is such a Kent-during-a-hackathon thing to do... who adds caching to a hackathon app 😂
	const toys = await cachified({
		key: `search-toys:${searchTerm}`,
		ttl: 1000 * 60 * 60,
		swr: 1000,
		cache,
		getFreshValue() {
			return sanityClient.fetch(toysQuery, { searchTerm })
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
}
