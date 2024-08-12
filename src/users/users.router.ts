import express from "express";
import { Role } from "../common/enums/user-role.enum";
import { authUserRoles } from "../common/middleware/auth-user-roles.middleware";
import { authenticate } from "../common/middleware/authenticate.middleware";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import {
	deleteUser,
	getAllUsers,
	getSingleUser,
	updateUser,
} from "./users.controller";
import { updateUserSchema, userIdSchema } from "./users.validation-schema";

const router = express.Router();

router.get(
	"/",
	authenticate,
	authUserRoles(Role.ADMIN, Role.ROOT),
	getAllUsers
);

router.get("/:id", validateRequestParams(userIdSchema), getSingleUser);

router.patch(
	"/:id",
	authenticate,
	validateRequestParams(userIdSchema),
	validateRequestBody(updateUserSchema),
	updateUser
);

router.delete(
	"/:id",
	authenticate,
	validateRequestParams(userIdSchema),
	deleteUser
);

export default router;
