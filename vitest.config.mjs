import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		watch: false,
		root: ".",
		reporters: ["html", "basic"],
		globalSetup: "./globalSetup.ts",
	},
});
