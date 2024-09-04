import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { decodeJwtToken } from "../../auth/utils/jwt.util";
import logger from "../../logging";
import { findUserById } from "../../users/users.service";

/**
 * Authenticates incoming requests by verifying the presence of a valid JWT token in the Authorization header.
 *
 * @param {express.Request} req - The incoming request object.
 * @param {express.Response} res - The outgoing response object.
 * @param {express.NextFunction} next - The next middleware function in the stack.
 * @throws {createHttpError.Unauthorized} If no Authorization header is present or the token is invalid.
 * @throws {createHttpError.NotFound} If the user associated with the token is not found.
 */
const authenticate: RequestHandler = async (req, res, next) => {
	const authorizationHeader = req.headers?.authorization;

	if (!authorizationHeader) {
		logger.errors.error(`Failed authentication try.`);

		throw new createHttpError.Unauthorized(`Your are not Authorized.`);
	}

	const [, jwtToken] = authorizationHeader.split(" ");
	const payload = await decodeJwtToken(jwtToken);

	// eslint-disable-next-line
	const targetUser = await findUserById((payload as any).id);

	if (!targetUser) {
		throw new createHttpError.NotFound( // eslint-disable-next-line
			`User with Id: ${(payload as any).id} not Found.`
		);
	}

	Object.assign(req, {
		user: payload,
	});

	next();
};

export { authenticate };
