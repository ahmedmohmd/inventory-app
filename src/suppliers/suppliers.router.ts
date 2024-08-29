import express from "express";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import * as suppliersController from "./suppliers.controller";
import {
	createSupplierSchema,
	supplierIdSchema,
	updateSupplierSchema,
} from "./suppliers.validation-schema";

const suppliersRouter = express.Router();

suppliersRouter.get("/", suppliersController.findAllSuppliers);

suppliersRouter.get(
	"/:id",
	validateRequestParams(supplierIdSchema),
	suppliersController.findSingleSupplier
);

suppliersRouter.post(
	"/",
	validateRequestBody(createSupplierSchema),
	suppliersController.createSupplier
);

suppliersRouter.patch(
	"/:id",
	validateRequestParams(supplierIdSchema),
	validateRequestBody(updateSupplierSchema),
	suppliersController.updateSupplier
);

suppliersRouter.delete(
	"/:id",
	validateRequestParams(supplierIdSchema),
	suppliersController.deleteSupplier
);

export { suppliersRouter };
