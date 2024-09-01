import { defineConfig } from "drizzle-kit";
import { ENV } from "./config/env";
export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema/**/*.ts",
	out: "./drizzle",
	dbCredentials: {
		url: ENV.DB_URL,
	},
});
