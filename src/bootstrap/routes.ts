import { Application } from "express";
import authRouter from "../auth";
import categories from "../categories";
import globalErrorHandler from "../global-errors/global-error.handler";
import sections from "../sections";
import usersRouter from "../users";
import orders from "../orders";
import suppliers from "../suppliers";
import products from "../products";

const handleRoutes = (app: Application) => {
	app.use("/api/v1/auth", authRouter);
	app.use("/api/v1/users", usersRouter);
	app.use("/api/v1/categories", categories.router);
	app.use("/api/v1/suppliers", suppliers.router);
	app.use("/api/v1/sections", sections.router);
	app.use("/api/v1/products", products.router);
	app.use("/api/v1/orders", orders.router);
	app.use(globalErrorHandler);
};

export { handleRoutes };
