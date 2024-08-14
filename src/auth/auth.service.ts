import createHttpError from "http-errors";
import logger from "../logging";
import { findUserByEmail, insertUser } from "../users/users.service";
import { CreateUser } from "../users/users.types";
import { createJwtToken } from "./utils/jwt.util";
import { checkPassword } from "./utils/password-hash.util";

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<{ token: string }>} - A promise that resolves to an object containing the JWT token.
 * @throws {NotFound} - If the user with the provided email is not found.
 * @throws {Unauthorized} - If the provided password is incorrect.
 */
const login = async (email: string, password: string) => {
	logger.general.info(`Calling for login() Method.`);

	const targetUser = await findUserByEmail(email);

	if (!targetUser) {
		logger.errors.error(`User with Email: ${email} not Found.`);
		throw new createHttpError.NotFound(`User with Email: ${email} not Found.`);
	}

	const isMatch = await checkPassword(password, targetUser.password);

	if (!isMatch) {
		logger.errors.error(`Wrong Password for User: ${email}.`);
		throw new createHttpError.Unauthorized(`Wrong Password.`);
	}

	const jwtToken = await createJwtToken({
		id: targetUser.id,
		role: targetUser.role,
	});

	return { token: jwtToken };
};

/**
 * Registers a new user with the provided data and returns a JSON Web Token.
 *
 * @param {CreateUser} userData - The data for the new user.
 * @return {Promise<{ token: string }>} A promise that resolves to an object containing the JWT token.
 */
const register = async (userData: CreateUser) => {
	const createdUser = await insertUser(userData);

	const jwtToken = await createJwtToken({
		id: createdUser.id,
		role: createdUser.role,
	});

	return {
		token: jwtToken,
	};
};

export { login, register };
