import express from "express";
// import { Role } from "../common/enums/user-role.enum";
// import { authUserRoles } from "../common/middleware/auth-user-roles.middleware";
// import { authenticate } from "../common/middleware/authenticate.middleware";
import { upload } from "../common/middleware/multer.middleware";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestParams } from "../common/middleware/validate-request-params.middleware";
import usersController from "./users.controller";
import usersValidationSchema from "./users.validation-schema";
import { validateRequestQuery } from "../common/middleware/validate-request-query.middleware";

const router = express.Router();

router.get(
	"/",
	// authenticate,
	// authUserRoles(Role.ADMIN),
	validateRequestQuery(usersValidationSchema.findAllUsersQuerySchema),
	usersController.getAllUsers
);

router.get(
	"/:id",
	// authenticate,
	// authUserRoles(Role.ADMIN),
	validateRequestParams(usersValidationSchema.userIdSchema),
	usersController.getSingleUser
);

router.patch(
	"/:id",
	// authenticate,
	validateRequestParams(usersValidationSchema.userIdSchema),
	// authUserRoles(Role.ADMIN),
	validateRequestBody(usersValidationSchema.updateUserSchema),
	upload.single("image"),
	usersController.updateUser
);

router.delete(
	"/:id",
	// authenticate,
	// authUserRoles(Role.ADMIN),
	validateRequestParams(usersValidationSchema.userIdSchema),
	usersController.deleteUser
);

export default router;
