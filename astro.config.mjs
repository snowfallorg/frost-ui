import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import markdown from "@astropub/md";

const FROST_BASE = process.env.FROST_BASE ?? "/";

// https://astro.build/config
export default defineConfig({
	base: FROST_BASE ?? "/",
	integrations: [react(), tailwind(), markdown()],
	markdown: {
		syntaxHighlight: "shiki",
		shikiConfig: {
			theme: "nord",
		},
	},
});
