"use server"

import { profileListData } from "@/dummy/profile/infoAndListDatas"
import { getAuthHeaders } from "@/lib/api/headers"
import { isValidResponse } from "@/lib/api/validation"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import type { PromptItemType } from "@/types/prompts/promptsType"

export async function getProfileMemberInfo(
	id: string,
): Promise<ProfileMemberInfoType> {
	const headers = await getAuthHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/profile/nickname/${id}`,
		{
			method: "GET",
			headers,
			next: {
				revalidate: 3600,
				tags: ["profile"],
			},
		},
	)
	void fetch(
		`${process.env.API_BASE_URL}/v1/profile/viewership/nickname/${id}`,
		{
			method: "POST",
			headers,
		},
	)
	if (!res.ok) {
		throw new Error("Failed to fetch profile data")
	}

	const rawData: unknown = await res.json()

	if (!isValidResponse<ProfileMemberInfoType>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}

export async function getProfileMemberInfoByUuid(
	id: string,
): Promise<ProfileMemberInfoType> {
	const headers = await getAuthHeaders()
	const res = await fetch(`${process.env.API_BASE_URL}/v1/profile/uuid/${id}`, {
		method: "GET",
		headers,
		next: {
			revalidate: 3600,
			tags: ["profile"],
		},
	})
	void fetch(`${process.env.API_BASE_URL}/v1/profile/viewership/uuid/${id}`, {
		method: "POST",
		headers,
	})

	if (!res.ok) {
		throw new Error("Failed to fetch profile data")
	}

	const rawData: unknown = await res.json()

	if (!isValidResponse<ProfileMemberInfoType>(rawData)) {
		throw new Error("Invalid response format")
	}

	return rawData.result
}

// 프로필에서 보일 상품 목록 데이터 : product service에서 가져와야 함
export async function getProfileList(): Promise<PromptItemType[]> {
	const res: PromptItemType[] = await profileListData
	return res
}
