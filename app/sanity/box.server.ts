import { defineQuery } from 'groq'
import { sanityClient, urlFor } from './client.server'

export async function getBoxById(boxId: string) {
	const getBoxByIdQuery = defineQuery(`*[_type == "box" && _id == $boxId][0]{
		_id,
		child->{
			_id,
			name,
		},
		toys[]->{
			_id,
			name,
			image,
		}
	}`)

	const params = { boxId }

	const box = await sanityClient.fetch(getBoxByIdQuery, params)
	if (!box) return null

	return {
		...box,
		toys: box.toys?.map((toy) => ({
			...toy,
			imageUrl: toy.image ? urlFor(toy.image).width(100).url() : null,
		})),
	}
}
