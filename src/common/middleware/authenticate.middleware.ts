import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { decodeJwtToken } from "../../auth/utils/jwt.util";
import logger from "../../logging";
import { findUserById } from "../../users/users.service";

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
