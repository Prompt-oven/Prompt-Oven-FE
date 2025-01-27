import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getAccessToken } from "@/lib/api/sessionExtractor.ts"

export async function GET(request: NextRequest) {
	// query parameter로부터 userUuid을 추출합니다
	const userUuid = request.nextUrl.searchParams.get("userUuid")
	// accessToken을 가져옵니다
	const accessToken = (await getAccessToken()) ?? ""

	// encoder를 생성합니다
	const encoder = new TextEncoder()
	// ReadableStream을 생성합니다
	const stream = new ReadableStream({
		async start(controller) {
			const response = await fetch(
				`${process.env.API_BASE_URL}/v1/member/chat/chatRoomList/${userUuid}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "text/event-stream",
						Authorization: `Bearer ${accessToken}`,
						Connection: "keep-alive",
						"Accept-Encoding": "gzip, deflate, br",
					},
					cache: "no-cache",
				},
			)

			const reader = response.body?.getReader()
			if (!reader) {
				controller.close()
				return
			}

			const sendKeepAlive = () => {
				if (controller.desiredSize !== null && controller.desiredSize > 0) {
					controller.enqueue(encoder.encode("data: :keep-alive\n\n"))
				}
			}
			// 30초마다 keep-alive 메시지 전송
			const keepAliveInterval = setInterval(sendKeepAlive, 30000)

			// 연결이 끊겼을 때, 재연결 로직 필요
			try {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,no-constant-condition -- ok
				while (true) {
					// eslint-disable-next-line no-await-in-loop -- ok
					const { done, value } = await reader.read()
					// console.log("room route in room ---- value: ", value)
					if (done) break

					// 여기서 encoder를 사용하여 SSE 형식으로 데이터를 변환합니다
					const formattedData = formatSSERoom(value)
					controller.enqueue(encoder.encode(formattedData))
				}
			} catch (error) {
				// eslint-disable-next-line no-console -- This is a server-side only log
				console.error("Stream reading error in chat room list:", error)
				// 에러 메시지를 클라이언트에 전송
				controller.enqueue(
					encoder.encode(`event: error\ndata: ${JSON.stringify(error)}\n\n`),
				)
			} finally {
				clearInterval(keepAliveInterval)
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ok
				if (reader) reader.releaseLock()
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ok
				if (controller) controller.close()
			}
		},
	})

	return new NextResponse(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
			Accept: "*/*",
		},
	})
}

function formatSSERoom(data: Uint8Array): string {
	return new TextDecoder().decode(data)
}
