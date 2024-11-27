import type { PaymentItemType } from "@/types/purchase.ts/purchase-ongoing"
import PaymentDetailLine from "../atom/PaymentDetailLine"
import PaymentDetailTotalItem from "../atom/PaymentDetailTotalItem"
import PaymentDivider from "../atom/PaymentDivider"
import PaymentTitle from "../atom/PaymentTitle"
import PromptDetailTotalPrice from "../atom/PromptDetailTotalPrice"
import PaymentList from "../molecule/PaymentList"

interface PaymentDetailProps {
	paymentList: PaymentItemType[]
}

export default function PaymentDetail({ paymentList }: PaymentDetailProps) {
	const totalPrice = paymentList.reduce((sum, item) => {
		return sum + parseInt(item.productPrice)
	}, 0)

	return (
		<div className="rounded-md bg-white font-semibold">
			<PaymentTitle title="Payment Details" option="p-4" />
			<PaymentDivider />

			<div className="flex flex-col gap-4 p-4 text-sm font-semibold">
				<p className="text-sm">Item List</p>
				<PaymentList paymentList={paymentList} />

				<PaymentDetailLine name="Shipping" price="0" />
				<PaymentDetailTotalItem count={paymentList.length} />
			</div>

			<div className="px-4">
				<PaymentDivider />
				<PromptDetailTotalPrice name="Total Payment" price={totalPrice} />
			</div>
		</div>
	)
}
