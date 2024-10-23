import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import * as QRCode from 'qrcode'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { getBoxById } from '#app/sanity/box.server.ts'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	const { boxId } = params
	invariantResponse(boxId, 'boxId is required')
	const url = new URL(request.url)
	const boxUrl = `${url.origin}/boxes/${boxId}`
	const box = await getBoxById(boxId)
	invariantResponse(box, 'box not found')
	invariantResponse(box.child, 'child not found')
	const qrCode = await QRCode.toDataURL(boxUrl)

	return json({ box, boxUrl, boxPath: `/boxes/${boxId}`, qrCode })
}

export default function BoxLabelQRCode() {
	const { box, boxUrl, boxPath, qrCode } = useLoaderData<typeof loader>()

	// Remove the protocol from the URL for display purposes only
	const displayUrl = boxUrl.replace(/^https?:\/\//, '')

	return (
		<div className="container mx-auto flex min-h-screen items-center justify-center bg-white">
			<div className="text-center">
				<h1 className="mb-4 text-2xl font-bold">Box for {box.child?.name}</h1>
				<p className="mb-4 text-gray-600">
					Scan this QR code to view the box on your phone.
				</p>
				<img
					src={qrCode}
					alt="QR Code"
					className="mx-auto"
					width={256}
					height={256}
				/>
				<Link to={boxPath} className="mt-4 text-sm text-blue-600">
					{displayUrl}
				</Link>
				<div className="mt-4 flex flex-wrap gap-4">
					{box.toys?.map((toy) => (
						<div key={toy._id} className="mt-4">
							{toy.imageUrl ? (
								<img
									src={toy.imageUrl}
									alt={toy.name ?? ''}
									width={100}
									height={100}
								/>
							) : null}
							<div>{toy.name}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{ 404: () => <div>Box not found</div> }}
		/>
	)
}
