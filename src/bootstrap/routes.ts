import { Application } from "express";
import authRouter from "../auth";
import categoriesRouter from "../categories";
import globalErrorHandler from "../global-errors/global-error.handler";
import usersRouter from "../users";

const handleRoutes = (app: Application) => {
	app.use("/api/v1/auth", authRouter);
	app.use("/api/v1/users", usersRouter);
	app.use("/api/v1/categories", categoriesRouter);
	app.use(globalErrorHandler);
};

// `/api/${config.defaults.version}`,
export { handleRoutes };
