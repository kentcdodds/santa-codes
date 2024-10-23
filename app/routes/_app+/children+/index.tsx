import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getNiceChildren } from '#app/sanity/child.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const searchTerm = url.searchParams.get('search') || ''
	const children = await getNiceChildren(searchTerm)
	return json({ children, searchTerm })
}

export default function ChildrenIndex() {
	const { children, searchTerm } = useLoaderData<typeof loader>()

	if (children.length === 0) {
		return (
			<div className="py-10 text-center">
				<h2 className="mb-4 text-2xl font-bold">Oops! No children found</h2>
				<p className="mb-4 text-xl">
					{searchTerm
						? `It seems like "${searchTerm}" is playing hide and seek!`
						: 'Looks like all the children went on an adventure!'}
				</p>
				<p className="text-lg">
					Try searching for something else or{' '}
					<Link to="/children" className="text-blue-500 hover:underline">
						check out all our children
					</Link>
					.
				</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{children.map((child) => (
				<div key={child._id} className="flex rounded-md border p-4">
					<div className="flex-1">
						<h2 className="text-xl font-semibold underline">
							<Link prefetch="intent" to={`/children/${child._id}`}>
								{child.name}
							</Link>
						</h2>
						{child.wishList && child.wishList.length > 0 ? (
							<div className="mt-2">
								<h3 className="text-lg font-semibold">Wish List:</h3>
								<ul className="list-inside list-disc">
									{child.wishList.map((item, index) => (
										<li key={index} className="text-gray-600">
											{item}
										</li>
									))}
								</ul>
							</div>
						) : (
							<p className="mt-2 text-gray-600">No items in wish list</p>
						)}
					</div>
				</div>
			))}
		</div>
	)
}
