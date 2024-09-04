import { Application } from "express";
import authRouter from "../auth";
import categories from "../categories";
import globalErrorHandler from "../global-errors/global-error.handler";
import productsRouter from "../products";
import sections from "../sections";
import suppliersRouter from "../suppliers";
import usersRouter from "../users";
import orders from "../orders";

const handleRoutes = (app: Application) => {
	app.use("/api/v1/auth", authRouter);
	app.use("/api/v1/users", usersRouter);
	app.use("/api/v1/categories", categories.router);
	app.use("/api/v1/suppliers", suppliersRouter);
	app.use("/api/v1/sections", sections.router);
	app.use("/api/v1/products", productsRouter);
	app.use("/api/v1/orders", orders.router);
	app.use(globalErrorHandler);
};

export { handleRoutes };
