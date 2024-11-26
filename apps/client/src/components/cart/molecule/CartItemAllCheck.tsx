import React from "react"
import { CheckBox } from "@repo/ui/checkbox"

function CartItemAllCheck() {
	return (
		<div className="flex items-center justify-between border-b border-gray-800 p-4">
			<div className="flex items-center space-x-2">
				<CheckBox />
				<span className="text-sm text-gray-200">Select All Items</span>
			</div>
			<button className="text-sm text-purple-400 hover:text-purple-300">
				REMOVE
			</button>
		</div>
	)
}

export default CartItemAllCheck
