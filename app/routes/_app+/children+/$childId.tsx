import { invariantResponse } from '@epic-web/invariant'
import {
	json,
	type LoaderFunctionArgs,
	type ActionFunctionArgs,
} from '@remix-run/node'
import { useLoaderData, Form, useActionData, Link } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Combobox } from '#app/components/ui/combobox.tsx'
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

export default function ChildDetails() {
	const { child, box, toys: allToys } = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()

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
								{box.toys?.map((toy, index) => (
									<li key={index} className="flex items-center justify-between">
										{toy.name}
										<Form method="post">
											<input type="hidden" name="item" value={toy._id} />
											<button
												type="submit"
												name="intent"
												value="remove-item"
												className="ml-2 text-red-500 hover:text-red-700"
											>
												Remove
											</button>
										</Form>
									</li>
								))}
							</ul>
							<Form method="post" className="mb-4">
								<div className="flex gap-2 sm:flex-col">
									<Combobox
										placeholder="Find a toy"
										name="item"
										options={allToys.map((toy) => ({
											value: toy._id,
											label: toy.name ?? 'Unknown toy',
										}))}
									/>
									<Button type="submit" name="intent" value="add-item">
										Add Item
									</Button>
								</div>
							</Form>
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
