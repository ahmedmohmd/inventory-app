import express from "express";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import * as stocksController from "./stocks.controller";
import stocksValidationSchema from "./stocks.validation-schema";

const stocksRouter = express.Router();

stocksRouter.get("/", stocksController.findAllStocks);

stocksRouter.get(
	"/:id",
	validateRequestParams(stocksValidationSchema.stockIdSchema),
	stocksController.findSingleStock
);

stocksRouter.post(
	"/",
	validateRequestBody(stocksValidationSchema.createStockSchema),
	stocksController.createStock
);

stocksRouter.patch(
	"/:id",
	validateRequestParams(stocksValidationSchema.stockIdSchema),
	validateRequestBody(stocksValidationSchema.updateStockSchema),
	stocksController.updateStock
);

stocksRouter.delete(
	"/:id",
	validateRequestParams(stocksValidationSchema.stockIdSchema),
	stocksController.deleteStock
);

export { stocksRouter };
