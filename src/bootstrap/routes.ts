import { Application } from "express";
import auth from "../auth";
import categories from "../categories";
import globalErrorHandler from "../global-errors/global-error.handler";
import sections from "../sections";
import users from "../users";
import orders from "../orders";
import suppliers from "../suppliers";
import products from "../products";

const handleRoutes = (app: Application) => {
	app.use("/api/v1/auth", auth.router);
	app.use("/api/v1/users", users.router);
	app.use("/api/v1/categories", categories.router);
	app.use("/api/v1/suppliers", suppliers.router);
	app.use("/api/v1/sections", sections.router);
	app.use("/api/v1/products", products.router);
	app.use("/api/v1/orders", orders.router);
	app.use(globalErrorHandler);
};

export { handleRoutes };
