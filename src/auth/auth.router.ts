import express from "express";
import { upload } from "../common/middleware/multer.middleware";
import { validateRequestBody } from "../common/middleware/validate-request-body.middleware";
import { validateRequestQuery } from "../common/middleware/validate-request-query.middleware";
import { createUserSchema } from "../users/users.validation-schema";
import {
	loginHandler,
	registerHandler,
	resetPasswordHandler,
	resetPasswordRequestHandler,
} from "./auth.controller";
import {
	resetPasswordQuerySchema,
	resetPasswordRequestSchema,
	resetPasswordSchema,
	signInSchema,
} from "./auth.validation-schema";

const router = express.Router();

router.post(
	"/register",
	upload.single("image"),
	validateRequestBody(createUserSchema),
	registerHandler
);

router.post("/login", validateRequestBody(signInSchema), loginHandler);

router.post(
	"/reset_password_request",
	validateRequestBody(resetPasswordRequestSchema),
	resetPasswordRequestHandler
);

router.post(
	"/reset_password",
	validateRequestBody(resetPasswordSchema),
	validateRequestQuery(resetPasswordQuerySchema),
	resetPasswordHandler
);

export default router;
