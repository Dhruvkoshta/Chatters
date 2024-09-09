import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			"valentine",
			"light",
			"dark",
			"synthwave",
			"halloween",
			"forest",
			"luxury",
			"cyberpunk",
			"lemonade",
		],
	},
};
