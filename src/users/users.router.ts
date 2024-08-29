import express from "express";
import { Role } from "../common/enums/user-role.enum";
import { authUserRoles } from "../common/middleware/auth-user-roles.middleware";
import { authenticate } from "../common/middleware/authenticate.middleware";
import { upload } from "../common/middleware/multer.middleware";
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

router.get("/", authenticate, authUserRoles(Role.ADMIN), getAllUsers);

router.get(
	"/:id",
	authenticate,
	authUserRoles(Role.ADMIN),
	validateRequestParams(userIdSchema),
	getSingleUser
);

router.patch(
	"/:id",
	authenticate,
	validateRequestParams(userIdSchema),
	authUserRoles(Role.ADMIN),
	validateRequestBody(updateUserSchema),
	upload.single("image"),
	updateUser
);

router.delete(
	"/:id",
	authenticate,
	authUserRoles(Role.ADMIN),
	validateRequestParams(userIdSchema),
	deleteUser
);

export default router;
