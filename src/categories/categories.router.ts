import express from "express";
import { Role } from "../common/enums/user-role.enum";
import { authUserRoles } from "../common/middleware/auth-user-roles.middleware";
import { authenticate } from "../common/middleware/authenticate.middleware";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getSingleCategory,
	updateCategory,
} from "./categories.controller";
import {
	categoryIdSchema,
	createCategorySchema,
	updateCategorySchema,
} from "./categories.validation-schema";

const router = express.Router();

router.get(
	"/",
	authenticate,
	authUserRoles(Role.ADMIN, Role.ROOT, Role.MODERATOR),
	getAllCategories
);

router.get(
	"/:id",
	authenticate,
	authUserRoles(Role.ADMIN, Role.ROOT, Role.MODERATOR),
	validateRequestParams(categoryIdSchema),
	getSingleCategory
);

router.post(
	"/",
	authenticate,
	authUserRoles(Role.ROOT, Role.MODERATOR),
	validateRequestBody(createCategorySchema),
	createCategory
);

router.patch(
	"/:id",
	authenticate,
	validateRequestParams(categoryIdSchema),
	authUserRoles(Role.ROOT, Role.MODERATOR),
	validateRequestBody(updateCategorySchema),
	updateCategory
);

router.delete(
	"/:id",
	authenticate,
	authUserRoles(Role.ROOT, Role.MODERATOR),
	validateRequestParams(categoryIdSchema),
	deleteCategory
);

export default router;
