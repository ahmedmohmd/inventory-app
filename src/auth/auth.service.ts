import createHttpError from "http-errors";
import { config } from "../../config/config";
import { ENV } from "../../config/env";
import logger from "../logging";
import { sendMail } from "../mail/mail.service";
import users from "../users";

import { CreateUser } from "../users/users.types";
import { createJwtToken, decodeJwtToken } from "./utils/jwt.util";
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
	const targetUser = await users.service.findUserByEmail(email);

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
 * @param {CreateUser} userData - The data for the new user to be registered.
 * @param {Express.Multer.File | null} profileImage - The profile image of the new user.
 * @return {Promise<{ token: string }>} - A promise that resolves to an object containing the JWT token.
 */
const register = async (
	userData: CreateUser,
	profileImage: Express.Multer.File | null
) => {
	const createdUser = await users.service.insertUser(userData, profileImage);

	const jwtToken = await createJwtToken({
		id: createdUser.id,
		role: createdUser.role,
	});

	return {
		token: jwtToken,
	};
};

/**
 * Sends a password reset request to the user with the given email.
 *
 * @param {string} email - The email of the user to send the reset request to.
 * @return {Promise<string>} A promise that resolves to a string indicating that the password reset request has been sent.
 * @throws {NotFound} If the user with the given email is not found.
 */
const resetPasswordRequest = async (email: string) => {
	const targetUser = await users.service.findUserByEmail(email);

	if (!targetUser) {
		logger.errors.error(`User with Email: ${email} not Found.`);
		throw new createHttpError.NotFound(`User with Email: ${email} not Found.`);
	}

	const resetToken = await createJwtToken(
		{
			id: targetUser.id,
			role: targetUser.role,
		},
		"1h"
	);

	await users.service.updateUser(targetUser.id, {
		resetPasswordToken: resetToken,
	});

	const mailOptions = {
		from: ENV.SENDER_EMAIL,
		to: targetUser.email,
		subject: "Password Reset Request",
		text: `
		Hello ${targetUser.name}, please reset your password by clicking on the link below:
		${config.apiEndPoint}/${resetToken}
		`,
	};

	await sendMail(mailOptions);

	return "Password reset request sent, please check your email.";
};

/**
 * Validates a password reset token by checking if it corresponds to a valid user and if it is not expired.
 *
 * @param {string} resetToken - The password reset token to be validated.
 * @return {{id: number}} An object containing the id of the user who owns the reset token.
 */
const validateResetToken = async (resetToken: string) => {
	const targetUser = await users.service.findUserByResetToken(resetToken);

	if (!targetUser) {
		logger.errors.error(`User with Reset Token: ${resetToken} not Found.`);
		throw new createHttpError.NotFound(
			`User with Reset Token: ${resetToken} not Found.`
		);
	}

	try {
		await decodeJwtToken(resetToken);
	} catch (error) {
		logger.errors.error(`Invalid Reset Token: ${error}.`);
		throw new createHttpError.Unauthorized(`Invalid Reset Token.`);
	}

	await users.service.updateUser(targetUser.id, { resetPasswordToken: "" });

	return {
		id: targetUser.id,
	};
};

/**
 * Resets a user's password using a provided reset token and new password.
 *
 * @param {string} resetToken - The password reset token.
 * @param {string} password - The new password.
 * @return {string} A success message indicating that the password has been reset.
 */
const resetPassword = async (resetToken: string, password: string) => {
	const { id } = await validateResetToken(resetToken);

	const targetUser = await users.service.findUserById(id);

	if (!targetUser) {
		logger.errors.error(`User with Id: ${id} not Found.`);
		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	await users.service.updateUser(targetUser.id, { password: password });

	const mailOptions = {
		from: ENV.SENDER_EMAIL,
		to: targetUser.email,
		subject: "Password Reset Request",
		text: `
		Hello ${targetUser.name}, your password has been successfully reset.
		`,
	};

	await sendMail(mailOptions);

	return "Your password has been successfully reset.";
};

export default { login, register, resetPassword, resetPasswordRequest };
