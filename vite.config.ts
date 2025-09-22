import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import UnoCSS from "unocss/vite"

export default defineConfig({
	plugins: [solidPlugin(), UnoCSS()],
	server: {
		port: 3001,
		host: true,
		watch: {
			usePolling: true,
			interval: 1000,
		},
		hmr: {
			clientPort: 3001,
		},
	},
	build: {
		target: "esnext",
	},
})
