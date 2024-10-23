import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { defineQuery } from 'groq'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { cache, cachified } from '#app/utils/cache.server.ts'
import { sanityClient } from '#app/utils/sanity.server.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { toyId } = params

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
	invariantResponse(toy, 'Toy not found', { status: 404 })

	return json({ toy })
}

export default function ToyDetails() {
	const { toy } = useLoaderData<typeof loader>()

	return (
		<div className="mx-auto max-w-4xl p-6">
			<h1 className="mb-4 text-3xl font-bold">{toy.name}</h1>
			<div className="flex flex-col gap-8 md:flex-row">
				<div className="md:w-1/2">
					{/* TODO: add images */}
					{/* <img
						src={toy.imageUrl}
						alt={toy.name}
						className="h-auto w-full rounded-lg shadow-md"
					/> */}
				</div>
				<div className="md:w-1/2">
					<p className="mb-4 text-gray-700">{toy.description}</p>
					<Link
						to={`/label/${toy._id}`}
						className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
					>
						Print Label
					</Link>
				</div>
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{ 404: () => <div>Toy not found</div> }}
		/>
	)
}
