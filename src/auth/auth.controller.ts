import { RequestHandler } from "express";
import { HttpStatusCode } from "../common/enums/http-status-code.enum";
import { login, register } from "./auth.service";

/**
 * Handles user registration by validating credentials and returning a JSON Web Token.
 *
 * @param {object} body - Request body containing user registration data.
 * @param {object} res - Response object.
 * @return {Promise<void>} Resolves with a JSON response containing the JWT token.
 */
const registerHandler: RequestHandler = async ({ body }, res) => {
	const jwtToken = await register(body);

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

export { loginHandler, registerHandler };
