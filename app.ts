import express from "express";
import "express-async-errors";
import { config } from "./config/config";
import { ENV } from "./config/env";
import bootstrap from "./src/bootstrap";
import { connectToDatabase } from "./src/db";
import logger from "./src/logging";
import elasticSearch from "./src/elastic-search";

export const app = express();
app.use(express.json());

// Handle Important Configs
bootstrap.handleCompression(app);
bootstrap.handleCors(app);
bootstrap.handleSecurity(app);
bootstrap.handleRateLimiting(app);
bootstrap.handleSwaggerDocs(app);

// All App Routes
bootstrap.handleRoutes(app);

// App Listening Configs
const port = Number(ENV.PORT) || config.defaults.port;

async function main() {
	await connectToDatabase();
	logger.info.info(`connected to database successfully.`);

	// handleelastic search
	await elasticSearch.service.createAllIndices();

	app.listen(port, () => {
		logger.info.info(`listening on ${config.apiEndPoint}.`);
	});
}
main();
