/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
	_type: 'sanity.imagePaletteSwatch'
	background?: string
	foreground?: string
	population?: number
	title?: string
}

export type SanityImagePalette = {
	_type: 'sanity.imagePalette'
	darkMuted?: SanityImagePaletteSwatch
	lightVibrant?: SanityImagePaletteSwatch
	darkVibrant?: SanityImagePaletteSwatch
	vibrant?: SanityImagePaletteSwatch
	dominant?: SanityImagePaletteSwatch
	lightMuted?: SanityImagePaletteSwatch
	muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
	_type: 'sanity.imageDimensions'
	height?: number
	width?: number
	aspectRatio?: number
}

export type SanityFileAsset = {
	_id: string
	_type: 'sanity.fileAsset'
	_createdAt: string
	_updatedAt: string
	_rev: string
	originalFilename?: string
	label?: string
	title?: string
	description?: string
	altText?: string
	sha1hash?: string
	extension?: string
	mimeType?: string
	size?: number
	assetId?: string
	uploadId?: string
	path?: string
	url?: string
	source?: SanityAssetSourceData
}

export type Geopoint = {
	_type: 'geopoint'
	lat?: number
	lng?: number
	alt?: number
}

export type Box = {
	_id: string
	_type: 'box'
	_createdAt: string
	_updatedAt: string
	_rev: string
	child?: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'child'
	}
	toys?: Array<{
		_ref: string
		_type: 'reference'
		_weak?: boolean
		_key: string
		[internalGroqTypeReferenceTo]?: 'toy'
	}>
	deliveryDate?: string
}

export type Event = {
	_id: string
	_type: 'event'
	_createdAt: string
	_updatedAt: string
	_rev: string
	eventName?: string
	description?: string
	date?: string
	location?: string
	attendees?: Array<string>
}

export type Post = {
	_id: string
	_type: 'post'
	_createdAt: string
	_updatedAt: string
	_rev: string
	title?: string
	content?: string
	published?: string
	updated?: string
	image?: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		_type: 'image'
	}
	author?:
		| {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'person'
		  }
		| {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'elf'
		  }
	tags?: Array<string>
}

export type Person = {
	_id: string
	_type: 'person'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	email?: string
	phone?: string
	address?: string
	image?: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		imagePrompt?: string
		_type: 'image'
	}
}

export type Page = {
	_id: string
	_type: 'page'
	_createdAt: string
	_updatedAt: string
	_rev: string
	title?: string
	slug?: Slug
	content?: string
}

export type Slug = {
	_type: 'slug'
	current?: string
	source?: string
}

export type Toy = {
	_id: string
	_type: 'toy'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	description?: string
	quantity?: number
	storageLocation?: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'warehouse'
	}
	manufactureDate?: string
	image?: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		_type: 'image'
	}
}

export type SanityImageCrop = {
	_type: 'sanity.imageCrop'
	top?: number
	bottom?: number
	left?: number
	right?: number
}

export type SanityImageHotspot = {
	_type: 'sanity.imageHotspot'
	x?: number
	y?: number
	height?: number
	width?: number
}

export type SanityImageAsset = {
	_id: string
	_type: 'sanity.imageAsset'
	_createdAt: string
	_updatedAt: string
	_rev: string
	originalFilename?: string
	label?: string
	title?: string
	description?: string
	altText?: string
	sha1hash?: string
	extension?: string
	mimeType?: string
	size?: number
	assetId?: string
	uploadId?: string
	path?: string
	url?: string
	metadata?: SanityImageMetadata
	source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
	_type: 'sanity.assetSourceData'
	name?: string
	id?: string
	url?: string
}

export type SanityImageMetadata = {
	_type: 'sanity.imageMetadata'
	location?: Geopoint
	dimensions?: SanityImageDimensions
	palette?: SanityImagePalette
	lqip?: string
	blurHash?: string
	hasAlpha?: boolean
	isOpaque?: boolean
}

export type Warehouse = {
	_id: string
	_type: 'warehouse'
	_createdAt: string
	_updatedAt: string
	_rev: string
	locationName?: string
	address?: string
	capacity?: number
}

export type Material = {
	_id: string
	_type: 'material'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	quantity?: number
	supplier?: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'supplier'
	}
	reorderThreshold?: number
}

export type Supplier = {
	_id: string
	_type: 'supplier'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	email?: string
	phone?: string
	address?: string
}

export type Gift = {
	_id: string
	_type: 'gift'
	_createdAt: string
	_updatedAt: string
	_rev: string
	child?: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'child'
	}
	wishListItems?: Array<string>
	requestDate?: string
	approvalStatus?: 'pending' | 'approved' | 'denied'
}

export type Sleigh = {
	_id: string
	_type: 'sleigh'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	model?: string
	mileage?: number
	maintenanceHistory?: Array<{
		date?: string
		description?: string
		_type: 'maintenanceEvent'
		_key: string
	}>
}

export type Reindeer = {
	_id: string
	_type: 'reindeer'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	shinyNose?: boolean
	age?: number
	handler?: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'elf'
	}
	trainingStatus?: 'trained' | 'untrained'
	currentHealth?: 'healthy' | 'sick'
}

export type Elf = {
	_id: string
	_type: 'elf'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	role?: 'toy-maker' | 'sleigh-engineer' | 'reindeer-handler'
	availability?: 'full-time' | 'part-time' | 'seasonal'
}

export type Parent = {
	_id: string
	_type: 'parent'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	email?: string
	phone?: string
	address?: string
	children?: Array<{
		_ref: string
		_type: 'reference'
		_weak?: boolean
		_key: string
		[internalGroqTypeReferenceTo]?: 'child'
	}>
}

export type Child = {
	_id: string
	_type: 'child'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	age?: number
	address?: string
	status?: 'naughty' | 'nice'
	wishList?: Array<string>
}

export type SanityAssistInstructionTask = {
	_type: 'sanity.assist.instructionTask'
	path?: string
	instructionKey?: string
	started?: string
	updated?: string
	info?: string
}

export type SanityAssistTaskStatus = {
	_type: 'sanity.assist.task.status'
	tasks?: Array<
		{
			_key: string
		} & SanityAssistInstructionTask
	>
}

export type SanityAssistSchemaTypeAnnotations = {
	_type: 'sanity.assist.schemaType.annotations'
	title?: string
	fields?: Array<
		{
			_key: string
		} & SanityAssistSchemaTypeField
	>
}

export type SanityAssistOutputType = {
	_type: 'sanity.assist.output.type'
	type?: string
}

export type SanityAssistOutputField = {
	_type: 'sanity.assist.output.field'
	path?: string
}

export type SanityAssistInstructionContext = {
	_type: 'sanity.assist.instruction.context'
	reference?: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'assist.instruction.context'
	}
}

export type AssistInstructionContext = {
	_id: string
	_type: 'assist.instruction.context'
	_createdAt: string
	_updatedAt: string
	_rev: string
	title?: string
	context?: Array<{
		children?: Array<{
			marks?: Array<string>
			text?: string
			_type: 'span'
			_key: string
		}>
		style?: 'normal'
		listItem?: never
		markDefs?: null
		level?: number
		_type: 'block'
		_key: string
	}>
}

export type SanityAssistInstructionUserInput = {
	_type: 'sanity.assist.instruction.userInput'
	message?: string
	description?: string
}

export type SanityAssistInstructionPrompt = Array<{
	children?: Array<
		| {
				marks?: Array<string>
				text?: string
				_type: 'span'
				_key: string
		  }
		| ({
				_key: string
		  } & SanityAssistInstructionFieldRef)
		| ({
				_key: string
		  } & SanityAssistInstructionContext)
		| ({
				_key: string
		  } & SanityAssistInstructionUserInput)
	>
	style?: 'normal'
	listItem?: never
	markDefs?: null
	level?: number
	_type: 'block'
	_key: string
}>

export type SanityAssistInstructionFieldRef = {
	_type: 'sanity.assist.instruction.fieldRef'
	path?: string
}

export type SanityAssistInstruction = {
	_type: 'sanity.assist.instruction'
	prompt?: SanityAssistInstructionPrompt
	icon?: string
	title?: string
	userId?: string
	createdById?: string
	output?: Array<
		| ({
				_key: string
		  } & SanityAssistOutputField)
		| ({
				_key: string
		  } & SanityAssistOutputType)
	>
}

export type SanityAssistSchemaTypeField = {
	_type: 'sanity.assist.schemaType.field'
	path?: string
	instructions?: Array<
		{
			_key: string
		} & SanityAssistInstruction
	>
}

export type AllSanitySchemaTypes =
	| SanityImagePaletteSwatch
	| SanityImagePalette
	| SanityImageDimensions
	| SanityFileAsset
	| Geopoint
	| Box
	| Event
	| Post
	| Person
	| Page
	| Slug
	| Toy
	| SanityImageCrop
	| SanityImageHotspot
	| SanityImageAsset
	| SanityAssetSourceData
	| SanityImageMetadata
	| Warehouse
	| Material
	| Supplier
	| Gift
	| Sleigh
	| Reindeer
	| Elf
	| Parent
	| Child
	| SanityAssistInstructionTask
	| SanityAssistTaskStatus
	| SanityAssistSchemaTypeAnnotations
	| SanityAssistOutputType
	| SanityAssistOutputField
	| SanityAssistInstructionContext
	| AssistInstructionContext
	| SanityAssistInstructionUserInput
	| SanityAssistInstructionPrompt
	| SanityAssistInstructionFieldRef
	| SanityAssistInstruction
	| SanityAssistSchemaTypeField
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ../santa-codes/app/sanity/box.server.ts
// Variable: getBoxByIdQuery
// Query: *[_type == "box" && _id == $boxId][0]{		_id,		child->{			_id,			name,		},		toys[]->{			_id,			name,			image,		}	}
export type GetBoxByIdQueryResult = {
	_id: string
	child: {
		_id: string
		name: string | null
	} | null
	toys: Array<{
		_id: string
		name: string | null
		image: {
			asset?: {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
			}
			hotspot?: SanityImageHotspot
			crop?: SanityImageCrop
			_type: 'image'
		} | null
	}> | null
} | null

// Source: ../santa-codes/app/sanity/child.server.ts
// Variable: getChildrenQuery
// Query: *[_type=="child" && status == "nice" && name match $searchTerm] {		_id,		name,		wishList,		status	}
export type GetChildrenQueryResult = Array<{
	_id: string
	name: string | null
	wishList: Array<string> | null
	status: 'naughty' | 'nice' | null
}>
// Variable: getChildByIdQuery
// Query: *[_type == "child" && _id == $childId][0]
export type GetChildByIdQueryResult = {
	_id: string
	_type: 'child'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	age?: number
	address?: string
	status?: 'naughty' | 'nice'
	wishList?: Array<string>
} | null
// Variable: getBoxForChildQuery
// Query: *[_type == "box" && references($childId)][0] {			_id,			toys[]->{				_id,				name,				image			}		}
export type GetBoxForChildQueryResult = {
	_id: string
	toys: Array<{
		_id: string
		name: string | null
		image: {
			asset?: {
				_ref: string
				_type: 'reference'
				_weak?: boolean
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
			}
			hotspot?: SanityImageHotspot
			crop?: SanityImageCrop
			_type: 'image'
		} | null
	}> | null
} | null

// Source: ../santa-codes/app/sanity/toys.server.ts
// Variable: toysQuery
// Query: *[_type=="toy" && (name match $searchTerm + "*" || _id match $searchTerm + "*" || description match $searchTerm + "*")] {  _id,  name,  description,  quantity,	image}
export type ToysQueryResult = Array<{
	_id: string
	name: string | null
	description: string | null
	quantity: number | null
	image: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		_type: 'image'
	} | null
}>
// Variable: query
// Query: *[_type == "toy" && _id == $toyId][0]
export type QueryResult = {
	_id: string
	_type: 'toy'
	_createdAt: string
	_updatedAt: string
	_rev: string
	name?: string
	description?: string
	quantity?: number
	storageLocation?: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'warehouse'
	}
	manufactureDate?: string
	image?: {
		asset?: {
			_ref: string
			_type: 'reference'
			_weak?: boolean
			[internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
		}
		hotspot?: SanityImageHotspot
		crop?: SanityImageCrop
		_type: 'image'
	}
} | null

// Query TypeMap
import '@sanity/client'
declare module '@sanity/client' {
	interface SanityQueries {
		'*[_type == "box" && _id == $boxId][0]{\n\t\t_id,\n\t\tchild->{\n\t\t\t_id,\n\t\t\tname,\n\t\t},\n\t\ttoys[]->{\n\t\t\t_id,\n\t\t\tname,\n\t\t\timage,\n\t\t}\n\t}': GetBoxByIdQueryResult
		'*[_type=="child" && status == "nice" && name match $searchTerm] {\n\t\t_id,\n\t\tname,\n\t\twishList,\n\t\tstatus\n\t}': GetChildrenQueryResult
		'*[_type == "child" && _id == $childId][0]': GetChildByIdQueryResult
		'*[_type == "box" && references($childId)][0] {\n\t\t\t_id,\n\t\t\ttoys[]->{\n\t\t\t\t_id,\n\t\t\t\tname,\n\t\t\t\timage\n\t\t\t}\n\t\t}': GetBoxForChildQueryResult
		'*[_type=="toy" && (name match $searchTerm + "*" || _id match $searchTerm + "*" || description match $searchTerm + "*")] {\n  _id,\n  name,\n  description,\n  quantity,\n\timage\n}': ToysQueryResult
		'*[_type == "toy" && _id == $toyId][0]': QueryResult
	}
}
