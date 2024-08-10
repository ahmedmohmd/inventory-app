import { Application } from "express";
import globalErrorHandler from "../global-errors/global-error.handler";

const handleRoutes = (app: Application) => {
	app.use(globalErrorHandler);
};

// `/api/${config.defaults.version}`,
export { handleRoutes };
