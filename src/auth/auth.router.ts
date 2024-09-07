import express from "express";
import { upload } from "../common/middleware/multer.middleware";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestQuery } from "../common/middleware/validate-request-query.middleware";
import authController from "./auth.controller";
import authValidationSchema from "./auth.validation-schema";
import users from "../users";

const router = express.Router();

router.post(
	"/register",
	upload.single("image"),
	validateRequestBody(users.validationSchema.createUserSchema),
	authController.registerHandler
);

router.post(
	"/login",
	validateRequestBody(authValidationSchema.signInSchema),
	authController.loginHandler
);

router.post(
	"/reset_password_request",
	validateRequestBody(authValidationSchema.resetPasswordRequestSchema),
	authController.resetPasswordRequestHandler
);

router.post(
	"/reset_password",
	validateRequestBody(authValidationSchema.resetPasswordSchema),
	validateRequestQuery(authValidationSchema.resetPasswordQuerySchema),
	authController.resetPasswordHandler
);

export default router;
