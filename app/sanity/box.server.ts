import { defineQuery } from 'groq'
import { sanityClient } from './client.server'

export async function getBoxById(boxId: string) {
	const getBoxByIdQuery = defineQuery(`*[_type == "box" && _id == $boxId][0]{
		_id,
		child->{
			_id,
			name,
		}
	}`)

	const params = { boxId }

	return await sanityClient.fetch(getBoxByIdQuery, params)
}
