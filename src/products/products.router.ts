import express from "express";
import { upload } from "../common/middleware/multer.middleware";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import productsController from "./products.controller";
import productsValidationSchema from "./products.validation-schema";
import { validateRequestQuery } from "../common/middleware/validate-request-query.middleware";

const productsRouter = express.Router();

productsRouter.get(
	"/search",
	validateRequestQuery(productsValidationSchema.searchProductsQuerySchema),
	productsController.searchProducts
);

productsRouter.get(
	"/autocomplete",
	validateRequestQuery(productsValidationSchema.productsAutocompleteSchema),
	productsController.productsAutocomplete
);

productsRouter.get(
	"/",
	validateRequestQuery(productsValidationSchema.findAllProductsQuerySchema),
	productsController.getAllProducts
);

productsRouter.get(
	"/:id",
	validateRequestParams(productsValidationSchema.productIdSchema),
	productsController.getSingleProduct
);

productsRouter.post(
	"/",

	upload.array("screenshots"),
	validateRequestBody(productsValidationSchema.createProductSchema),
	productsController.createProduct
);

productsRouter.patch(
	"/:id",
	validateRequestParams(productsValidationSchema.productIdSchema),
	validateRequestBody(productsValidationSchema.updateProductSchema),
	productsController.updateProduct
);

productsRouter.delete(
	"/:id",
	validateRequestParams(productsValidationSchema.productIdSchema),
	productsController.deleteProduct
);

export { productsRouter };
