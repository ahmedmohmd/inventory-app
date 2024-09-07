import express from "express";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import suppliersController from "./suppliers.controller";
import suppliersValidationSchema from "./suppliers.validation-schema";
import { validateRequestQuery } from "../common/middleware/validate-request-query.middleware";

const suppliersRouter = express.Router();

suppliersRouter.get(
	"/",
	validateRequestQuery(suppliersValidationSchema.findAllSuppliersQuerySchema),
	suppliersController.findAllSuppliers
);

suppliersRouter.get(
	"/:id",
	validateRequestParams(suppliersValidationSchema.supplierIdSchema),
	suppliersController.findSingleSupplier
);

suppliersRouter.post(
	"/",
	validateRequestBody(suppliersValidationSchema.createSupplierSchema),
	suppliersController.createSupplier
);

suppliersRouter.patch(
	"/:id",
	validateRequestParams(suppliersValidationSchema.supplierIdSchema),
	validateRequestBody(suppliersValidationSchema.updateSupplierSchema),
	suppliersController.updateSupplier
);

suppliersRouter.delete(
	"/:id",
	validateRequestParams(suppliersValidationSchema.supplierIdSchema),
	suppliersController.deleteSupplier
);

export { suppliersRouter };
