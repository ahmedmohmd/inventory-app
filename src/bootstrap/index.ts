import { migrateDatabase } from "../db/migrate";
import handleCompression from "./compression";
import handleCors from "./cors";
import handleAcessLogs from "./handle-access-logs";
import handleRateLimiting from "./rate-limiting";
import { handleRoutes } from "./routes";
import handleSecurity from "./security";
import { handleSwaggerDocs } from "./swagger";

export default {
	handleRoutes,
	handleCompression,
	handleCors,
	handleRateLimiting,
	handleSecurity,
	handleSwaggerDocs,
	migrateDatabase,
	handleAcessLogs,
};
