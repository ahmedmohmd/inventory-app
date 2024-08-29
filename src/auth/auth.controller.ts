import { RequestHandler } from "express";
import { HttpStatusCode } from "../common/enums/http-status-code.enum";
import {
	login,
	register,
	resetPassword,
	resetPasswordRequest,
} from "./auth.service";

/**
 * Handles user registration by validating credentials and returning a JSON Web Token.
 *
 * @param {object} body - Request body containing user registration data.
 * @param {object} res - Response object.
 * @return {Promise<void>} Resolves with a JSON response containing the JWT token.
 */
const registerHandler: RequestHandler = async ({ body, file }, res) => {
	const jwtToken = await register(body, file as Express.Multer.File);

	res.status(HttpStatusCode.CREATED).json(jwtToken);
};

/**
 * Handles user login by validating credentials and returning a JSON Web Token.
 *
 * @param {object} body - Request body containing user credentials.
 * @param {object} res - Response object.
 * @return {Promise<void>} Resolves with a JSON response containing the JWT token.
 */
const loginHandler: RequestHandler = async ({ body }, res) => {
	const jwtToken = await login(body.email, body.password);

	res.status(HttpStatusCode.OK).json(jwtToken);
};

const resetPasswordRequestHandler: RequestHandler = async ({ body }, res) => {
	const result = await resetPasswordRequest(body.email);

	res.status(HttpStatusCode.OK).send(result);
};

const resetPasswordHandler: RequestHandler = async ({ body, query }, res) => {
	const result = await resetPassword(
		(
			query as {
				resetToken: string;
			}
		).resetToken,
		body.password
	);

	res.status(HttpStatusCode.OK).send(result);
};

export {
	loginHandler,
	registerHandler,
	resetPasswordHandler,
	resetPasswordRequestHandler,
};
