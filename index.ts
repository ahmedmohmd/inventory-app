import express from "express";
import "express-async-errors";
import { config } from "./config/config";
import { ENV } from "./config/env";
import bootstrap from "./src/bootstrap";
import { connectToDatabase } from "./src/db";
import logger from "./src/logging";
import { findAllUsers, insertUser } from "./src/users/users.service";

const app = express();
app.use(express.json());

// Handle Important Configs
bootstrap.handleCompression(app);
bootstrap.handleCors(app);
bootstrap.handleSecurity(app);
bootstrap.handleRateLimiting(app);

app.get("/", async (req, res) => {
	const user = {
		name: "Ahmed",
		email: "ahmed@gmail.com",
		password: "12345",
	};

	await insertUser(user);

	const users = await findAllUsers();
	res.send(users);
});

// All App Routes
bootstrap.handleRoutes(app);

// App Listening Configs
const port = Number(ENV.PORT) || config.defaults.port;

async function main() {
	await connectToDatabase();
	logger.general.info(`connected to database successfully.`);

	app.listen(port, () => {
		logger.general.info(`listening on ${config.apiEndPoint}.`);
	});
}
main();
