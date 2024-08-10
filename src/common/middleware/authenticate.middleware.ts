import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { decodeJwtToken } from "../../auth/utils/jwt.util";
import logger from "../../logging";

const authenticate: RequestHandler = async (req, res, next) => {
	const authorizationHeader = req.headers?.authorization;

	if (!authorizationHeader) {
		logger.errors.error(`Failed authentication try.`);

		throw new createHttpError.Unauthorized(`Your are not Authorized.`);
	}

	const [, jwtToken] = authorizationHeader.split(" ");
	const payload = await decodeJwtToken(jwtToken);

	Object.assign(req, {
		user: payload,
	});

	next();
};

export { authenticate };
