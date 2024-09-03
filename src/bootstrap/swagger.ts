import { Application } from "express";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

const swaggerFilePath = path.join(__dirname, "..", "..", "swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));

const handleSwaggerDocs = (app: Application) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export { handleSwaggerDocs };
