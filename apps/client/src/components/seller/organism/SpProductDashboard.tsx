"use client"

import React, { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus } from "@repo/ui/lucide"
import SpProductTable from "@/components/seller/molecule/SpProductTable"
import { SpProductFilter } from "@/components/seller/molecule/SpProductFilter.tsx"
import type {
	GetSellerProductListRequestType,
	GetSellerProductListResponseType,
} from "@/types/product/productUpsertType"
import SpPaginationControls from "@/components/seller/atom/SpPaginationControl.tsx"
import {
	extractProductStatusOption,
	extractProductStatusOptionReverse,
} from "@/lib/sellerProduct.ts"
import type { ProductStatusOption } from "@/types/seller/sellerProduct.ts"
import AccountTitleText from "@/components/common/atom/AccountTitleText.tsx"
import SpLink from "@/components/seller/atom/SpLink.tsx"

interface ProductDashboardProps {
	initialData: GetSellerProductListResponseType
	initialRequest: GetSellerProductListRequestType
}

export default function SpProductDashboard({
	initialData,
	initialRequest,
}: ProductDashboardProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const extractStatus = useCallback(
		(enable: boolean, temporary: boolean) => {
			return extractProductStatusOptionReverse({ enable, temporary })
		},
		[initialRequest.enable, initialRequest.temporary],
	)
	const status = extractStatus(
		initialRequest.enable ?? true,
		initialRequest.temporary ?? false,
	)

	const updateQueryParams = (
		params: Partial<GetSellerProductListRequestType>,
	) => {
		const newParams = new URLSearchParams(searchParams.toString())
		Object.entries(params).forEach(([key, value]) => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- we want to remove the key if value is undefined
			if (value === undefined) {
				newParams.delete(key)
			} else {
				newParams.set(key, value.toString())
			}
		})
		router.push(`/account?${newParams.toString()}`)
	}

	const handleSearch = (searchTerm: string) => {
		updateQueryParams({ searchBar: searchTerm, page: 0 })
	}

	const handleSort = (
		sortOption: "price" | "sells" | "createdAt",
		sortBy: "ASC" | "DESC",
	) => {
		updateQueryParams({ sortOption, sortBy, page: 0 })
	}

	const handleStatusChange = (_status: ProductStatusOption) => {
		const { enable, temporary } = extractProductStatusOption(_status)

		updateQueryParams({
			enable,
			temporary,
			page: 0,
		})
	}

	const handleNextPage = () => {
		// note:  현재 커서 위치를 알아야 이전 커서 위치를 저장할 수 있을 거 같음
		updateQueryParams({ page: initialData.number + 1 })
	}
	const handlePrevPage = () => {
		// note: 추가 정보가 있어야 구현 가능함
		updateQueryParams({ page: initialData.number - 1 })
	}

	return (
		<div className="mx-auto w-full max-w-[1070px] px-4 sm:px-6 lg:px-8">
			<div className="mb-4 flex flex-row items-center justify-between">
				<AccountTitleText>Product List</AccountTitleText>
				<SpLink
					className="flex items-center"
					href="/account?view=create-product&step=1">
					<Plus className="mr-2 h-6 w-6" />
					Create Product
				</SpLink>
			</div>

			<SpProductFilter
				onSearch={handleSearch}
				onSort={handleSort}
				onStatusChange={handleStatusChange}
				initSort={initialRequest.sortOption}
				initSortDirection={initialRequest.sortBy}
				initStatus={status as ProductStatusOption}
			/>
			<SpProductTable products={initialData.content} />

			<SpPaginationControls
				className="mt-4"
				hasNext={!initialData.last}
				onPrevPage={handlePrevPage}
				onNextPage={handleNextPage}
				isFirstPage={initialData.first}
			/>
		</div>
	)
}
