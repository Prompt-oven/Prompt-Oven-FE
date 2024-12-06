export interface DropResult {
	draggableId: string
	type: string
	source: {
		droppableId: string
		index: number
	}
	destination: {
		droppableId: string
		index: number
	} | null
	reason: "DROP" | "CANCEL"
}
