import express from "express";
import { upload } from "../common/middleware/multer.middleware";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import * as productsController from "./products.controller";
import {
	createProductSchema,
	productIdSchema,
	updateProductSchema,
} from "./products.validation-schema";

const productsRouter = express.Router();

productsRouter.get("/", productsController.getAllProducts);

productsRouter.get(
	"/:id",
	validateRequestParams(productIdSchema),
	productsController.getSingleProduct
);

productsRouter.post(
	"/",

	upload.array("screenshots"),
	validateRequestBody(createProductSchema),
	productsController.createProduct
);

productsRouter.patch(
	"/:id",
	validateRequestParams(productIdSchema),
	validateRequestBody(updateProductSchema),
	productsController.updateProduct
);

productsRouter.delete(
	"/:id",
	validateRequestParams(productIdSchema),
	productsController.deleteProduct
);

export { productsRouter };
