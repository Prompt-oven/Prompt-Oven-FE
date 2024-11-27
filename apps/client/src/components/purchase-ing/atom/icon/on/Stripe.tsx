import React from "react"

export default function Stripe({ color = "#131313" }: { color?: string }) {
	return (
		<svg
			width="27"
			height="22"
			viewBox="0 0 27 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M23.0625 9.35938C23.4844 9.35938 23.9062 9.6875 23.9062 10.4375H22.1719C22.1719 9.6875 22.6406 9.35938 23.0625 9.35938ZM17.5781 9.5C18.1406 9.5 18.5625 10.1562 18.5625 11.0469C18.5625 11.9375 18.1875 12.5938 17.5781 12.5938C17.1562 12.5938 16.9219 12.4531 16.7812 12.3125V9.82812C16.9219 9.64062 17.1562 9.5 17.5781 9.5ZM24.75 0.5C25.9688 0.5 27 1.53125 27 2.75V19.25C27 20.5156 25.9688 21.5 24.75 21.5H2.25C0.984375 21.5 0 20.5156 0 19.25V2.75C0 1.53125 0.984375 0.5 2.25 0.5H24.75ZM5.71875 12.2188C5.71875 10.2031 3.14062 10.5781 3.14062 9.82812C3.14062 9.54688 3.375 9.45312 3.75 9.45312C4.21875 9.45312 4.875 9.59375 5.39062 9.875V8.32812C4.82812 8.09375 4.26562 8 3.75 8C2.39062 8 1.5 8.70312 1.5 9.92188C1.5 11.75 4.03125 11.4219 4.03125 12.2188C4.03125 12.5469 3.75 12.6406 3.375 12.6406C2.8125 12.6406 2.10938 12.4062 1.54688 12.125V13.7188C2.15625 13.9531 2.8125 14.0938 3.375 14.0938C4.73438 14.0938 5.71875 13.3906 5.71875 12.2188ZM8.95312 9.54688V8.14062H7.6875V6.6875L6.04688 7.01562V12.3594C6.04688 13.3438 6.79688 14.0938 7.78125 14.0938C8.29688 14.0938 8.71875 14 8.95312 13.8594V12.5C8.71875 12.5938 7.6875 12.875 7.6875 11.8906V9.54688H8.95312ZM12.4219 9.64062V8.14062H12.375C12.1875 8.04688 11.3906 7.90625 11.0156 8.60938L10.9219 8.14062H9.46875V13.9531H11.1094V10.0156C11.5312 9.5 12.1875 9.59375 12.4219 9.64062ZM14.4844 13.9531V8.14062H12.7969V13.9531H14.4844ZM14.4844 7.25V5.89062L12.7969 6.26562V7.625L14.4844 7.25ZM17.9531 14.0938C19.125 14.0938 20.2031 13.1094 20.2031 11C20.2031 9.07812 19.125 8 17.9531 8C17.2969 8 16.875 8.32812 16.6406 8.51562L16.5469 8.14062H15.0938V15.875L16.7812 15.5469V13.6719C17.0156 13.8125 17.3438 14.0938 17.9531 14.0938ZM25.4531 11.6562C25.4531 11.5625 25.5 11.2344 25.5 11.0469C25.5 9.35938 24.6562 8 23.0625 8C21.4688 8 20.5312 9.35938 20.5312 11.0469C20.5312 13.0625 21.6562 14.0938 23.2969 14.0938C24.0938 14.0938 24.6562 13.9062 25.125 13.625V12.3125C24.6562 12.5469 24.1406 12.6875 23.4844 12.6875C22.8281 12.6875 22.2656 12.4531 22.2188 11.6562H25.4531Z"
				fill={color}
			/>
		</svg>
	)
}
