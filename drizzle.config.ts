import { defineConfig } from "drizzle-kit";
export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema/**/*.ts",
	out: "./drizzle",
	dbCredentials: {
		url: "postgres://postgres:95123574@localhost:5433/express",
	},
});
