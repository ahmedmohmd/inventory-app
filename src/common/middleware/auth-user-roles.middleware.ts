import { RequestHandler } from "express";
import createHttpError from "http-errors";
import logger from "../../logging";
import { Role } from "../enums/user-role.enum";

const authUserRoles =
	(...roles: Role[]): RequestHandler =>
	async (req, res, next) => {
		// eslint-disable-next-line
		const { user } = req as any;

		if (!user) {
			logger.errors.error(`Unauthorized Access Try.`);
			throw new createHttpError.Unauthorized("Unauthorized User.");
		}

		const isUserAllowed = roles.includes(user?.role);

		if (!isUserAllowed) {
			logger.errors.error(`Unauthorized Access Try.`);
			throw new createHttpError.Forbidden("Forbidden Resource.");
		}

		next();
	};
export { authUserRoles };
