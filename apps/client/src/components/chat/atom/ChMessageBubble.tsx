"use client"

import { cn } from "@/lib/utils.ts"

interface MessageBubbleProps {
	content: string
	timestamp: string
	isOwn?: boolean
	hasRead?: boolean
}

export function ChMessageBubble({
	content,
	timestamp,
	isOwn,
	hasRead,
}: MessageBubbleProps) {
	return (
		<div
			className={cn(
				`flex flex-col gap-2`,
				isOwn ? "!items-end" : "!items-start",
			)}>
			<div
				className={cn(
					`max-w-[340px] rounded-[20px] p-5`,
					isOwn
						? "!rounded-br-none !bg-[#E2ADFF] !text-white"
						: "!rounded-bl-none !bg-white !text-[#262626]",
				)}>
				<p className="text-sm leading-[22px]">{content}</p>
			</div>
			<div className="flex items-center gap-1.5 text-xs text-[#A3A3A3]">
				{timestamp}
				{isOwn && hasRead ? (
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M3.33331 10L8.33331 15L16.6666 5"
							stroke="#329993"
							strokeWidth="1.5"
						/>
					</svg>
				) : null}
			</div>
		</div>
	)
}
