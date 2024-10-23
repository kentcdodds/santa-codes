import { type LoaderFunctionArgs } from '@remix-run/node'
import { json, Outlet, redirect } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { SearchBar } from '#app/components/search-bar.tsx'

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const searchTerm = url.searchParams.get('search')

	if (searchTerm === '') {
		const newUrl = new URL(request.url)
		newUrl.searchParams.delete('search')
		return redirect(newUrl.pathname + newUrl.search)
	}
	return json({ searchTerm })
}

export default function Layout() {
	return (
		<div className="container mx-auto p-4">
			<div className="mx-auto max-w-sm">
				<SearchBar formAction="/children" autoSubmit status="idle" />
			</div>
			<div className="mt-12" />
			<Outlet />
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => {
					return <div>No toys found for {params.toyId}</div>
				},
			}}
		/>
	)
}
