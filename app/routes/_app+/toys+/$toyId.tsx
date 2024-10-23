import { invariantResponse } from '@epic-web/invariant'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { urlFor } from '#app/utils/sanity.server.ts'
import { getToyById } from '#app/utils/toys.server.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { toyId } = params
	invariantResponse(toyId, 'toyId is required')

	const toy = await getToyById(toyId)
	invariantResponse(toy, 'Toy not found', { status: 404 })
	const toyImageUrl = toy.image ? urlFor(toy.image).width(300).url() : null

	return json({ toy, toyImageUrl })
}

export default function ToyDetails() {
	const { toy, toyImageUrl } = useLoaderData<typeof loader>()

	return (
		<div className="mx-auto max-w-4xl p-6">
			<h1 className="mb-4 text-3xl font-bold">{toy.name}</h1>
			<div className="flex flex-col gap-8 md:flex-row">
				<div className="md:w-1/2">
					{toyImageUrl ? (
						<img
							src={toyImageUrl}
							alt={toy.name}
							className="h-auto w-full rounded-lg shadow-md"
						/>
					) : null}
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
