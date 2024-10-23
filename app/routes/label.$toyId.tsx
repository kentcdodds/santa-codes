import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import * as QRCode from 'qrcode'
import { urlFor } from '#app/sanity/client.server.ts'
import { getToyById } from '#app/sanity/toys.server.ts'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const { toyId } = params
	invariantResponse(toyId, 'toyId is required')
	const url = new URL(request.url)
	// Use the full URL for the QR code and link
	const toyUrl = `${url.origin}/toys/${toyId}`
	const toy = await getToyById(toyId)
	invariantResponse(toy, 'toy not found')

	const toyImageUrl = toy.image ? urlFor(toy.image).width(300).url() : null

	const qrCode = await QRCode.toDataURL(toyUrl)

	return json({ toy, toyUrl, toyPath: `/toys/${toyId}`, qrCode, toyImageUrl })
}

export default function LabelQRCode() {
	const { toy, toyUrl, toyPath, qrCode, toyImageUrl } =
		useLoaderData<typeof loader>()

	// Remove the protocol from the URL for display purposes only
	const displayUrl = toyUrl.replace(/^https?:\/\//, '')

	return (
		<div className="container mx-auto flex min-h-screen items-center justify-center bg-white">
			<div className="text-center">
				<h1 className="mb-4 text-2xl font-bold">{toy.name}</h1>
				{toyImageUrl ? (
					<img
						src={toyImageUrl}
						alt={toy.name}
						className="mx-auto"
						width={256}
						height={256}
					/>
				) : null}
				<img
					src={qrCode}
					alt="QR Code"
					className="mx-auto"
					width={256}
					height={256}
				/>
				<Link to={toyPath} className="mt-4 text-sm text-blue-600">
					{displayUrl}
				</Link>
			</div>
		</div>
	)
}
