import { invariantResponse } from '@epic-web/invariant'
import { defineQuery } from 'groq'
import { sanityClient, sanityWriteClient } from '#app/sanity/client.server.ts'
import { cachified, cache } from '#app/utils/cache.server.ts'

export async function getNiceChildren(searchTerm = '') {
	const getChildrenQuery =
		defineQuery(`*[_type=="child" && status == "nice" && string::startsWith(lower(name), lower($searchTerm))] {
		_id,
		name,
		wishList,
		status
	}`)
	// this is such a Kent-during-a-hackathon thing to do... who adds caching to a hackathon app 😂
	const children = await cachified({
		key: `search-children:${searchTerm}`,
		ttl: 1000 * 60 * 60,
		swr: 1000,
		cache,
		async getFreshValue() {
			console.log('getting children')
			const children = await sanityClient.fetch(getChildrenQuery, {
				searchTerm,
			})
			return children
		},
	})
	return children
}

export async function getChildById(childId: string) {
	const getChildByIdQuery = defineQuery(
		`*[_type == "child" && _id == $childId][0]`,
	)
	const child = await cachified({
		key: `child:${childId}`,
		ttl: 1000 * 60 * 60,
		swr: 1000,
		cache,
		getFreshValue() {
			return sanityClient.fetch(getChildByIdQuery, { childId })
		},
	})
	return child
}

export async function getBoxForChild(
	childId: string,
	{ forceFresh }: { forceFresh?: boolean } = {},
) {
	const getBoxForChildQuery = defineQuery(
		`*[_type == "box" && references($childId)][0] {
			_id,
			toys[]->{
				_id,
				name,
				image
			}
		}`,
	)
	const box = await cachified({
		key: `box-for-child:${childId}`,
		// ttl: 1000 * 60 * 60,
		// swr: 1000,
		ttl: 100,
		cache,
		forceFresh,
		getFreshValue() {
			return sanityClient.fetch(getBoxForChildQuery, { childId })
		},
	})
	return box
}

export async function createBoxForChild(childId: string) {
	const box = await sanityWriteClient.create({
		_type: 'box',
		toys: [],
		child: {
			_type: 'reference',
			_ref: childId,
		},
	})
	return box
}

export async function addItemToBox(childId: string, toyId: string) {
	const box = await getBoxForChild(childId)
	invariantResponse(box, 'Box not found', { status: 404 })
	await sanityWriteClient
		.patch(box._id)
		.setIfMissing({ toys: [] })
		.append('toys', [{ _type: 'reference', _ref: toyId }])
		.commit()
		.catch((error) => {
			console.error('addItemToBox error', error)
		})
}

export async function removeItemFromBox(childId: string, toyId: string) {
	const box = await getBoxForChild(childId)
	invariantResponse(box, 'Box not found', { status: 404 })
	await sanityWriteClient
		.patch(box._id)
		.unset([`toys[_ref == "${toyId}"]`])
		.commit()
}
