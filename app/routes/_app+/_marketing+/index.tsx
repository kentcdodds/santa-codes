import { type MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => [{ title: 'Santa Codes' }]

export default function Index() {
	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="mb-6 text-4xl font-bold">Welcome to Santa Codes</h1>
			<p className="mb-4 text-xl">
				Manage your toy collection with ease. Keep track of all your toys in one
				place!
			</p>
			<section className="mb-8">
				<h2 className="mb-4 text-2xl font-bold">Features:</h2>
				<ul className="list-inside list-disc">
					<li>Add and categorize your toys</li>
					<li>Track toy conditions and locations</li>
					<li>Set reminders for maintenance or playtime</li>
					<li>Generate reports on your collection</li>
				</ul>
			</section>
			<a
				href="/toys"
				className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
			>
				Get Started
			</a>
		</main>
	)
}
