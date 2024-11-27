"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const selectTriggerVariants = cva(
	"flex h-9 leading-[160%] tracking-[-0.02em] w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
	{
		variants: {
			variant: {
				default: "",
				black: "bg-black text-[#94A3B8] border-black",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
		VariantProps<typeof selectTriggerVariants>
>(({ className, children, variant, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(selectTriggerVariants({ variant, className }))}
		{...props}>
		{children}
		<SelectPrimitive.Icon asChild>
			<ChevronDown
				className={cn(
					"h-5 w-5 opacity-50 transition-transform duration-200 ease-in-out data-[state=open]:rotate-180",
					variant === "black" && "text-white",
				)}
			/>
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollUpButton
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}>
		<ChevronUp className="h-5 w-5" />
	</SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.ScrollDownButton
		ref={ref}
		className={cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		)}
		{...props}>
		<ChevronDown className="h-5 w-5" />
	</SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
	SelectPrimitive.ScrollDownButton.displayName

const selectContentVariants = cva(
	"relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
	{
		variants: {
			variant: {
				default: "",
				black: "bg-black text-[#94A3B8] border-black",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> &
		VariantProps<typeof selectContentVariants>
>(({ className, children, position = "popper", variant, ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn(
				selectContentVariants({ variant }),
				position === "popper" &&
					"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
				className,
			)}
			position={position}
			{...props}>
			<SelectScrollUpButton />
			<SelectPrimitive.Viewport
				className={cn(
					"p-1",
					position === "popper" &&
						"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
				)}>
				{children}
			</SelectPrimitive.Viewport>
			<SelectScrollDownButton />
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn("px-2 py-1.5 text-sm font-semibold", className)}
		{...props}
	/>
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const selectItemVariants = cva(
	"relative leading-[160%] tracking-[-0.02em] flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	{
		variants: {
			variant: {
				default: "",
				black: "justify-between focus:text-[#E2ADFF] focus:bg-black",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> &
		VariantProps<typeof selectItemVariants>
>(({ className, children, variant, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(selectItemVariants({ variant }), className)}
		{...props}>
		<span
			className={cn(
				"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
			)}>
			<SelectPrimitive.ItemIndicator>
				<Check className="h-5 w-5" />
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...props}
	/>
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpButton,
	SelectScrollDownButton,
}
