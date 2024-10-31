import React, { type SVGProps } from "react"

interface AddPromptProps extends SVGProps<SVGSVGElement> {
	width?: string | number
	height?: string | number
}

function AddPromptSvg({
	width = "50",
	height = "50",
	...props
}: AddPromptProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 62 50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				d="M28.675 36.7188V30.4688H22.475C21.1866 30.4688 20.15 29.4238 20.15 28.125C20.15 26.8262 21.1866 25.7812 22.475 25.7812H28.675V19.5312C28.675 18.2324 29.7116 17.1875 31 17.1875C32.2884 17.1875 33.325 18.2324 33.325 19.5312V25.7812H39.525C40.8134 25.7812 41.85 26.8262 41.85 28.125C41.85 29.4238 40.8134 30.4688 39.525 30.4688H33.325V36.7188C33.325 38.0176 32.2884 39.0625 31 39.0625C29.7116 39.0625 28.675 38.0176 28.675 36.7188ZM13.95 46.875C6.24553 46.875 0 40.5762 0 32.8125C0 26.6895 3.88178 21.3965 9.3 19.5508V19.5312C9.3 10.4687 16.585 3.125 25.575 3.125C30.5059 3.125 34.9137 5.33203 37.9072 8.81934C39.3506 8.17187 40.9394 7.8125 42.625 7.8125C49.0478 7.8125 54.25 13.0566 54.25 19.5312C54.25 20.1758 54.2016 20.8008 54.1047 21.416C58.7547 23.4668 62 28.1543 62 33.5938C62 40.6641 56.5169 46.4453 49.6 46.8555V46.875H13.95ZM25.575 7.8125C19.1522 7.8125 13.95 13.0566 13.95 19.5312V22.8613L10.7628 23.9746C7.23075 25.2637 4.65 28.7402 4.65 32.8125C4.65 37.9883 8.81369 42.1875 13.95 42.1875H49.0769L49.3288 42.168C53.8044 41.9141 57.35 38.1641 57.35 33.5938C57.35 30.0781 55.2575 27.041 52.235 25.7129L48.9316 24.2578L49.5128 20.6738C49.5709 20.3027 49.6 19.9219 49.6 19.5312C49.6 15.6445 46.4806 12.5 42.625 12.5C41.6078 12.5 40.6487 12.7148 39.7962 13.1055L36.6381 14.5215L34.3809 11.8848C32.24 9.38281 29.0916 7.8125 25.4878 7.8125H25.575Z"
				fill="url(#paint0_linear_351_4560)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_351_4560"
					x1="-4.16807"
					y1="-15.25"
					x2="55.5592"
					y2="-2.60791"
					gradientUnits="userSpaceOnUse">
					<stop stopColor="#FCB808" />
					<stop offset="1" stopColor="#F9075E" />
				</linearGradient>
			</defs>
		</svg>
	)
}

export default AddPromptSvg
