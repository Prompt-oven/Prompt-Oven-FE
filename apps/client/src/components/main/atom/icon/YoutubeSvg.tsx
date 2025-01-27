import React, { type SVGProps } from "react"

interface YoutubeSvgProps extends SVGProps<SVGSVGElement> {
	width?: number | string
	height?: number | string
	color?: string
}

function YoutubeSvg({
	width = "20",
	height = "18",
	color = "#111111",
	...props
}: YoutubeSvgProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 20 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				d="M19.0853 4.36229C18.8672 3.53085 18.2246 2.87603 17.4088 2.6538C15.93 2.25 10.0001 2.25 10.0001 2.25C10.0001 2.25 4.07019 2.25 2.59133 2.6538C1.77547 2.87606 1.1329 3.53085 0.914805 4.36229C0.518555 5.86934 0.518555 9.01364 0.518555 9.01364C0.518555 9.01364 0.518555 12.1579 0.914805 13.665C1.1329 14.4964 1.77547 15.124 2.59133 15.3462C4.07019 15.75 10.0001 15.75 10.0001 15.75C10.0001 15.75 15.9299 15.75 17.4088 15.3462C18.2246 15.124 18.8672 14.4964 19.0853 13.665C19.4816 12.1579 19.4816 9.01364 19.4816 9.01364C19.4816 9.01364 19.4816 5.86934 19.0853 4.36229ZM8.06064 11.8684V6.15885L13.0169 9.01371L8.06064 11.8684Z"
				fill={color}
			/>
		</svg>
	)
}

export default YoutubeSvg
