"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@repo/ui/badge"
import { Card } from "@repo/ui/card"
import StarAnimation from "@repo/ui/star-animation"
import { PromptCardDateFormatted, PromptIsNew } from "@/lib/utils"
import { getProductImage } from "@/lib/thumbnail"
import type { PromptItemType } from "@/types/prompts/promptsType"
import PromptLLMId from "../molecule/PromptLLMId"
import PromptName from "../molecule/PromptName"
import PromptPrice from "../molecule/PromptPrice"
import PromptHoverModal from "../molecule/PromptHoverModal"

interface PromptCardProps {
	productInfo: PromptItemType
	hoverItem: string
	setHoverItem: (item: string) => void
}

export default function PromptCard({
	productInfo,
	hoverItem,
	setHoverItem,
}: PromptCardProps) {
	const formattedDate = PromptCardDateFormatted(productInfo.createdAt)
	const isNew = PromptIsNew(productInfo.createdAt)
	const thumbnailImage = getProductImage(
		productInfo.productName,
		productInfo.thumbnailUrl,
	)

	let hoverTimeout: ReturnType<typeof setTimeout>
	const handleMouseEnter = async () => {
		hoverTimeout = setTimeout(() => {
			setHoverItem(productInfo.productUuid)
		}, 1500)
	}

	const handleMouseLeave = () => {
		clearTimeout(hoverTimeout) // 타이머 취소
		setHoverItem("")
	}

	return (
		<li
			className="relative flex justify-center hover:z-10 hover:scale-105 hover:duration-500 hover:ease-in-out"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<Link href={`/prompt-detail/${productInfo.productUuid}`}>
				<Card className="flex w-[130px] flex-col overflow-hidden rounded-md border-0 bg-[#111111] shadow-md xxs:w-[150px] xs:w-[180px] sm:w-[220px]">
					<div className="relative h-[160px] bg-white xxs:h-[190px] xs:h-[220px] sm:h-[260px]">
						<Image
							src={thumbnailImage}
							sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
							fill
							priority
							alt={productInfo.productUuid}
							unoptimized
						/>

						<Badge className="absolute left-4 top-4 border-0 bg-gradient-to-r from-[#A913F9] to-[#3F5EFB] font-bold hover:from-[#A913F9] hover:to-[#3F5EFB]">
							{isNew ? "NEW" : formattedDate}
						</Badge>
					</div>

					<div className="relative flex h-[90px] flex-col justify-between bg-gradient-filter px-3 pt-1 xxs:h-[100px] xs:h-[120px]">
						<div className="flex flex-col gap-2">
							<StarAnimation
								rateData={productInfo.avgStar}
								noAnimation={false}
							/>

							<PromptName name={productInfo.productName} />
						</div>

						<div className="mb-2 flex items-center justify-between">
							<PromptLLMId
								llmId={
									productInfo.llmName ? productInfo.llmName : productInfo.llmId
								}
							/>
							<PromptPrice price={productInfo.price} />
						</div>
					</div>
				</Card>
			</Link>

			{hoverItem === productInfo.productUuid ? (
				<PromptHoverModal
					productInfo={productInfo}
					defaultImage={thumbnailImage}
				/>
			) : null}
		</li>
	)
}
