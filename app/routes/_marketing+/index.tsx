import { json, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { sanityClient } from '#app/utils/sanity.server.ts'

export const meta: MetaFunction = () => [{ title: 'Santa Codes' }]

export async function loader() {
	const data = await sanityClient.fetch(`count(*[_type=="child"])`)
	return json(data)
}

export default function Index() {
	const data = useLoaderData<typeof loader>()
	return <main>{data}</main>
}
