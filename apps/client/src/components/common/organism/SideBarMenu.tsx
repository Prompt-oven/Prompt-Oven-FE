"use client"

import { useState } from "react"
import { Menu } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@repo/ui/sheet"
import SideMenuToggleItem from "@/components/account/molecule/SideMenuToggleItem.tsx"
import SideMenuItem from "@/components/account/atom/SideMenuItem.tsx"
import { getUserAuthNavitems, type MenuNavItemType } from "@/lib/navigation.ts"
import type { UserAuthType } from "@/lib/userAuth.ts"

export interface SideBarMenuProps {
	userAuth: UserAuthType
}
export function SideBarMenu({ userAuth }: SideBarMenuProps) {
	const menuItems: MenuNavItemType[] = getUserAuthNavitems(userAuth)

	const [open, setOpen] = useState(false)

	// todo: 유저의 권한에 따라 다른 메뉴를 보여줘야함
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="!h-12 !w-12 rounded-full border-none p-0 hover:!bg-transparent focus-visible:!ring-0 lg:!hidden"
					onClick={() => setOpen(true)}>
					<Menu className="!h-7 !w-7 text-white" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				isClose={false}
				className="common-scrollbar-y z-[1000] flex w-[18.75rem] border-r-0 bg-po-black-200 !pr-2 sm:w-[22.5rem]">
				<SheetHeader className="hidden">
					<SheetTitle>SideBarMenu</SheetTitle>
					<SheetDescription>
						This is a sidebar menu for the users.
					</SheetDescription>
				</SheetHeader>
				<nav className="w-full space-y-4 overflow-y-auto">
					{menuItems.map((item, index) =>
						item.subMenu ? (
							<SideMenuToggleItem
								// eslint-disable-next-line react/no-array-index-key -- This is a static array
								key={index}
								href={item.href}
								query={item.query}
								label={item.label}
								Icon={item.icon}
								subMenu={item.subMenu}
								subMenuProps={{ onClick: () => setOpen(false) }}
								containerProps={{
									className:
										"w-[calc(18.75rem-3.25rem)] sm:w-[calc(22.5rem-3.25rem)]",
								}}
							/>
						) : (
							<SideMenuItem
								// eslint-disable-next-line react/no-array-index-key -- This is a static array
								key={index}
								href={{
									pathname: item.href,
									query: item.query,
								}}
								_href={item.href}
								query={item.query}
								className="w-[calc(18.75rem-3.25rem)] sm:w-[calc(22.5rem-3.25rem)]"
								label={item.label}
								Icon={item.icon}
								onClick={() => setOpen(false)}
							/>
						),
					)}
				</nav>
			</SheetContent>
		</Sheet>
	)
}
