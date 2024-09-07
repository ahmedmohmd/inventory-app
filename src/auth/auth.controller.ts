import { RequestHandler } from "express";
import { HttpStatusCode } from "../common/enums/http-status-code.enum";
import authService from "./auth.service";

/**
 * Handles user registration by validating credentials and returning a JSON Web Token.
 *
 * @param {object} body - Request body containing user registration data.
 * @param {object} res - Response object.
 * @return {Promise<void>} Resolves with a JSON response containing the JWT token.
 */
const registerHandler: RequestHandler = async ({ body, file }, res) => {
	const jwtToken = await authService.register(
		body,
		file as Express.Multer.File
	);

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
	const jwtToken = await authService.login(body.email, body.password);

	res.status(HttpStatusCode.OK).json(jwtToken);
};

/**
 * Handles a password reset request by sending a reset link to the user's email.
 *
 * @param {object} body - Request body containing the user's email.
 * @return {Promise<void>} Resolves with a JSON response containing the result of the password reset request.
 */
const resetPasswordRequestHandler: RequestHandler = async ({ body }, res) => {
	const result = await authService.resetPasswordRequest(body.email);

	res.status(HttpStatusCode.OK).send(result);
};

/**
 * Handles the reset password request by calling the resetPassword method of the authService.
 *
 * @param {Object} req - The request object containing the query and body.
 * @param {Object} res - The response object.
 * @return {void}
 */
const resetPasswordHandler: RequestHandler = async ({ body, query }, res) => {
	const result = await authService.resetPassword(
		(
			query as {
				resetToken: string;
			}
		).resetToken,
		body.password
	);

	res.status(HttpStatusCode.OK).send(result);
};

export default {
	loginHandler,
	registerHandler,
	resetPasswordHandler,
	resetPasswordRequestHandler,
};
