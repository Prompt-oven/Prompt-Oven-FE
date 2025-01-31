import { STATIC_DEFAULT_AVATAR, STATIC_DEFAULT_BANNER } from "@/app/static/data"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import ProfileAvatar from "../atoms/info/ProfileAvatar"
import ProfileBanner from "../atoms/info/ProfileBanner"
import ProfileInfoLeft from "../molecules/ProfileInfoLeft"
import ProfileInfoRight from "../molecules/ProfileInfoRight"

// todo: 공용 이미지 컴포넌트 파일로 따로 빼내기
const DEFAULT_BANNER = STATIC_DEFAULT_BANNER
const DEFAULT_AVATAR = STATIC_DEFAULT_AVATAR

interface MemberDataProps {
	memberData: ProfileMemberInfoType
	followState: boolean
}

export default function ProfileMemberInfo({
	memberData,
	followState,
}: MemberDataProps) {
	return (
		<div className="mx-2">
			<ProfileBanner
				memberBanner={
					!memberData.bannerImageUrl || memberData.bannerImageUrl === ""
						? DEFAULT_BANNER
						: memberData.bannerImageUrl
				}
			/>
			<div className="relative -top-[3.5rem] z-[5] mx-10 flex flex-col gap-4 md:-top-[5.5rem] md:h-40 md:!flex-row md:items-center md:justify-between xl:h-44">
				<ProfileAvatar
					memberAvatar={
						!memberData.avatarImageUrl || memberData.avatarImageUrl === ""
							? DEFAULT_AVATAR
							: memberData.avatarImageUrl
					}
				/>

				<div className="flex flex-grow justify-between gap-2 rounded-xl bg-gradient-to-r from-[#B514F1] to-[#0BA9FF] p-4 md:h-[90%] md:items-center">
					<ProfileInfoLeft memberData={memberData} followState={followState} />
					<ProfileInfoRight memberData={memberData} />
				</div>
			</div>
		</div>
	)
}
