import ChattingButton from "./ChattingButton.tsx"

interface SellerListTitleProps {
	initialRequest: { sellerUuid: string; sellerName: string; userName: string }
}

export default function SellerListTitle({
	initialRequest,
}: SellerListTitleProps) {
	const { sellerUuid, sellerName, userName } = initialRequest // sellerUuid 추출

	return (
		<div className="gradient-filter mx-6 flex h-[3.75rem] w-full items-center justify-between rounded-lg border border-white/20 p-4 xl:!w-[86%]">
			<span className="font-mulish text-xl font-bold text-white">
				판매자의 상품 리스트
			</span>
			<ChattingButton
				sellerUuid={sellerUuid}
				chatRoomName={`${sellerName}, ${userName}`}
			/>
		</div>
	)
}
