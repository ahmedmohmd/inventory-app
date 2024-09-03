import express from "express";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import categoriesController from "./categories.controller";
import categoriesValidationSchema from "./categories.validation-schema";

const router = express.Router();

router.get(
	"/",
	// authenticate,
	// authUserRoles(Role.ADMIN)

	categoriesController.getAllCategories
);

router.get(
	"/:id",
	// authenticate,
	// authUserRoles(Role.ADMIN, Role.EMPLOYEE),
	validateRequestParams(categoriesValidationSchema.categoryIdSchema),
	categoriesController.getSingleCategory
);

router.post(
	"/",
	// authenticate,
	// authUserRoles(Role.ADMIN, Role.EMPLOYEE),
	validateRequestBody(categoriesValidationSchema.createCategorySchema),
	categoriesController.createCategory
);

router.patch(
	"/:id",
	// authenticate,
	validateRequestParams(categoriesValidationSchema.categoryIdSchema),
	// authUserRoles(Role.ADMIN, Role.EMPLOYEE),
	validateRequestBody(categoriesValidationSchema.updateCategorySchema),
	categoriesController.updateCategory
);

router.delete(
	"/:id",
	// authenticate,
	// authUserRoles(Role.ADMIN, Role.EMPLOYEE),
	validateRequestParams(categoriesValidationSchema.categoryIdSchema),
	categoriesController.deleteCategory
);

export default router;
