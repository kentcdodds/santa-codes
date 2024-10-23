import { invariantResponse } from '@epic-web/invariant'
import {
	json,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node'
import {
	useLoaderData,
	Form,
	useActionData,
	Link,
	useFetcher,
	useFetchers,
} from '@remix-run/react'
import { useState } from 'react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Combobox } from '#app/components/ui/combobox.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import {
	getBoxForChild,
	getChildById,
	createBoxForChild,
	addItemToBox,
	removeItemFromBox,
} from '#app/sanity/child.server.ts'
import { getToys } from '#app/sanity/toys.server.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { childId } = params
	invariantResponse(childId, 'childId is required')

	const child = await getChildById(childId)
	const toys = await getToys()
	invariantResponse(child, 'Child not found', { status: 404 })
	const box = await getBoxForChild(childId)
	return json({ child, toys, box })
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { childId } = params
	invariantResponse(childId, 'childId is required')

	const formData = await request.formData()
	const intent = formData.get('intent')

	switch (intent) {
		case 'create-box': {
			await createBoxForChild(childId)
			await getBoxForChild(childId, { forceFresh: true })
			return json({ success: true, error: null })
		}
		case 'add-item': {
			const itemToAdd = formData.get('item')
			invariantResponse(typeof itemToAdd === 'string', 'Item is required', {
				status: 400,
			})
			await addItemToBox(childId, itemToAdd)
			await getBoxForChild(childId, { forceFresh: true })
			return json({ success: true, error: null })
		}
		case 'remove-item': {
			const itemToRemove = formData.get('item')
			invariantResponse(typeof itemToRemove === 'string', 'Item is required', {
				status: 400,
			})
			await removeItemFromBox(childId, itemToRemove)
			await getBoxForChild(childId, { forceFresh: true })
			return json({ success: true, error: null })
		}
		default: {
			return json({ success: false, error: 'Invalid intent' }, { status: 400 })
		}
	}
}

export function RemoveItemFromBox({ itemId }: { itemId: string }) {
	const fetcher = useFetcher({ key: `remove-${itemId}` })
	return (
		<fetcher.Form method="post">
			<input type="hidden" name="item" value={itemId} />
			<button
				type="submit"
				name="intent"
				value="remove-item"
				className="text-red-500 hover:text-red-700"
			>
				<Icon name="trash" className="h-4 w-4">
					Remove
				</Icon>
			</button>
		</fetcher.Form>
	)
}

function AddItemToBox({
	allToys,
	boxToys,
}: {
	allToys: Array<{ _id: string; name: string | null }>
	boxToys: Array<{ _id: string; name: string | null }>
}) {
	const [selectedItem, setSelectedItem] = useState<string | null>(null)
	const fetcher = useFetcher({ key: `add-item-${selectedItem}` })
	return (
		<fetcher.Form method="post">
			<div className="flex gap-2 sm:flex-col">
				<Combobox
					placeholder="Find a toy"
					name="item"
					selectedItem={selectedItem}
					onChange={setSelectedItem}
					options={allToys
						.filter((t) => boxToys.every((bt) => bt._id !== t._id))
						.map((toy) => ({
							value: toy._id,
							label: toy.name ?? 'Unknown toy',
						}))}
				/>
				<Button type="submit" name="intent" value="add-item">
					Add Item
				</Button>
			</div>
		</fetcher.Form>
	)
}

export default function ChildDetails() {
	const { child, box, toys: allToys } = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()
	const fetchers = useFetchers()
	let boxToys: Array<{ _id: string; name: string | null }> = box?.toys ?? []

	for (const fetcher of fetchers) {
		if (fetcher.formData) {
			const intent = fetcher.formData.get('intent')
			const itemId = fetcher.formData.get('item')
			if (intent === 'remove-item') {
				boxToys = boxToys.filter((toy) => toy._id !== itemId)
			}
			if (intent === 'add-item') {
				boxToys = [
					...boxToys,
					{
						_id: itemId as string,
						name: allToys.find((toy) => toy._id === itemId)?.name ?? '',
					},
				]
			}
		}
	}

	return (
		<div className="mx-auto max-w-4xl p-6">
			<h1 className="mb-4 text-3xl font-bold">{child.name}</h1>
			<div className="flex flex-col gap-8 md:flex-row">
				<div className="md:w-1/2">
					<p className="mb-4 text-gray-700">Age: {child.age}</p>
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
				<div className="md:w-1/2">
					{box ? (
						<>
							<h2 className="mb-2 text-xl font-semibold">Box Contents:</h2>
							<ul className="mb-4">
								{boxToys.map((toy, index) => (
									<li key={index} className="flex items-center justify-between">
										<Link className="underline" to={`/toys/${toy._id}`}>
											{toy.name}
										</Link>
										<RemoveItemFromBox itemId={toy._id} />
									</li>
								))}
							</ul>
							<AddItemToBox allToys={allToys} boxToys={boxToys} />
							<div className="h-12" />
							<Link
								to={`/box-label/${box._id}`}
								className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
							>
								Print Box Label
							</Link>
						</>
					) : (
						<Form method="post">
							<Button type="submit" name="intent" value="create-box">
								Create Box
							</Button>
						</Form>
					)}
				</div>
			</div>
			{actionData?.error && (
				<p className="mt-4 text-red-500">{actionData.error}</p>
			)}
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{ 404: () => <div>Child not found</div> }}
		/>
	)
}
