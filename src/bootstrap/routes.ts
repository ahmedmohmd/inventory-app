import { Application } from "express";
import authRouter from "../auth";
import categories from "../categories";
import globalErrorHandler from "../global-errors/global-error.handler";
import productsRouter from "../products";
import sections from "../sections";
import usersRouter from "../users";
import orders from "../orders";
import suppliers from "../suppliers";

const handleRoutes = (app: Application) => {
	app.use("/api/v1/auth", authRouter);
	app.use("/api/v1/users", usersRouter);
	app.use("/api/v1/categories", categories.router);
	app.use("/api/v1/suppliers", suppliers.router);
	app.use("/api/v1/sections", sections.router);
	app.use("/api/v1/products", productsRouter);
	app.use("/api/v1/orders", orders.router);
	app.use(globalErrorHandler);
};

export { handleRoutes };
