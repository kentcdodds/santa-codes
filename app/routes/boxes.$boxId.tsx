import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs, redirect } from '@remix-run/node'
import { getBoxById } from '#app/sanity/box.server.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const boxId = params.boxId
	invariantResponse(boxId, 'Box ID is required')
	const box = await getBoxById(boxId)
	invariantResponse(box, 'Box not found')

	if (!box.child || !box.child._id) {
		throw new Error('Box is not associated with a child')
	}

	return redirect(`/children/${box.child._id}`)
}
