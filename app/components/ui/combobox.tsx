import * as React from 'react'

import { cn } from '#app/utils/misc.tsx'
import { Button } from './button.tsx'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from './command.tsx'
import { Icon } from './icon.tsx'
import { Popover, PopoverContent, PopoverTrigger } from './popover.tsx'

export function Combobox({
	placeholder,
	name,
	options,
}: {
	placeholder: string
	name: string
	options: Array<{ value: string; label: string }>
}) {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState('')

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<input type="hidden" name={name} value={value} />
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="justify-between"
				>
					{value
						? options.find((option) => option.value === value)?.label
						: placeholder}
					<Icon
						name={open ? 'arrow-left' : 'arrow-right'}
						className="ml-2 h-4 w-4 shrink-0 opacity-50"
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandList>
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? '' : currentValue)
										setOpen(false)
									}}
								>
									<Icon
										name="check"
										className={cn(
											'mr-2 h-4 w-4',
											value === option.value ? 'opacity-100' : 'opacity-0',
										)}
									/>
									{option.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
