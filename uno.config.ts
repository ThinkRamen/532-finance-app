import {
	defineConfig,
	presetWind4,
	presetAttributify,
	presetIcons,
	transformerDirectives,
} from "unocss"

export default defineConfig({
	presets: [
		presetWind4({
			preflights: {
				reset: true,
			},
		}),
		presetAttributify(),
		presetIcons(),
	],
	transformers: [transformerDirectives()],
	theme: {
		colors: {
			financial: {
				green: "#10b981", // positive/growth
				red: "#ef4444", // negative/debt
				blue: "#3b82f6", // neutral/info
				dark: "#0f172a", // dark background
				light: "#f8fafc", // light text
			},
		},
	},
	shortcuts: {
		"section-base":
			"p-8 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center",
		"btn-primary":
			"px-4 py-2 bg-financial-green text-white rounded hover:bg-green-700 transition-colors",
		"btn-secondary":
			"px-4 py-2 bg-financial-blue text-white rounded hover:bg-blue-700 transition-colors",
		"card": "bg-gray-800 p-6 rounded-lg shadow-lg",
		"input-field":
			"w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-financial-green",
	},
})
