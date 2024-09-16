import express from "express";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import * as warehousesController from "./warehouses.controller";
import warehousesValidationSchema from "./warehouses.validation-schema";

const warehousesRouter = express.Router();

warehousesRouter.get("/", warehousesController.findAllWarehouses);

warehousesRouter.get(
	"/:id",
	validateRequestParams(warehousesValidationSchema.warehouseIdSchema),
	warehousesController.findSingleWarehouse
);

warehousesRouter.post(
	"/",
	validateRequestBody(warehousesValidationSchema.createWarehouseSchema),
	warehousesController.createWarehouse
);

warehousesRouter.patch(
	"/:id",
	validateRequestParams(warehousesValidationSchema.warehouseIdSchema),
	validateRequestBody(warehousesValidationSchema.updateWarehouseSchema),
	warehousesController.updateWarehouse
);

warehousesRouter.delete(
	"/:id",
	validateRequestParams(warehousesValidationSchema.warehouseIdSchema),
	warehousesController.deleteWarehouse
);

export { warehousesRouter };
