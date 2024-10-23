import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getToys } from '#app/utils/toys.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const searchTerm = url.searchParams.get('search') || ''
	const toys = await getToys(searchTerm)
	return json({ toys, searchTerm })
}

export default function ToysIndex() {
	const { toys, searchTerm } = useLoaderData<typeof loader>()

	if (toys.length === 0) {
		return (
			<div className="py-10 text-center">
				<h2 className="mb-4 text-2xl font-bold">Oops! No toys found</h2>
				<p className="mb-4 text-xl">
					{searchTerm
						? `It seems like "${searchTerm}" is playing hide and seek!`
						: 'Looks like all the toys went on vacation!'}
				</p>
				<p className="text-lg">
					Try searching for something else or{' '}
					<Link to="/toys" className="text-blue-500 hover:underline">
						check out all our toys
					</Link>
					.
				</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{toys.map((toy) => (
				<div key={toy._id} className="flex rounded-md border p-4">
					<div className="flex-1">
						<h2 className="text-xl font-semibold underline">
							<Link prefetch="intent" to={`/toys/${toy._id}`}>
								{toy.name}
							</Link>
						</h2>
						<p className="text-gray-600">{toy.description}</p>
						<p className="mt-2 font-bold">${toy.quantity}</p>
						<Link to={`/label/${toy._id}`} className="mt-2 text-blue-500">
							Print Label
						</Link>
					</div>
					{toy.imageUrl && (
						<Link
							prefetch="intent"
							to={`/toys/${toy._id}`}
							className="ml-4 flex-shrink-0 underline"
						>
							<img
								src={toy.imageUrl}
								alt={toy.name ?? ''}
								className="h-24 w-24 object-cover"
							/>
						</Link>
					)}
				</div>
			))}
		</div>
	)
}
