import createHttpError from "http-errors";
import { config } from "../../config/config";
import { ENV } from "../../config/env";
import logger from "../logging";
import { sendMail } from "../mail/mail.service";
import {
	findUserByEmail,
	findUserById,
	findUserByResetToken,
	insertUser,
	updateUser,
} from "../users/users.service";
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

const register = async (
	userData: CreateUser,
	profileImage: Express.Multer.File | null
) => {
	const createdUser = await insertUser(userData, profileImage);

	const jwtToken = await createJwtToken({
		id: createdUser.id,
		role: createdUser.role,
	});

	return {
		token: jwtToken,
	};
};

const resetPasswordRequest = async (email: string) => {
	const targetUser = await findUserByEmail(email);

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

	await updateUser(targetUser.id, { resetPasswordToken: resetToken });

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

const validateResetToken = async (resetToken: string) => {
	const targetUser = await findUserByResetToken(resetToken);

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

	await updateUser(targetUser.id, { resetPasswordToken: "" });

	return {
		id: targetUser.id,
	};
};

const resetPassword = async (resetToken: string, password: string) => {
	const { id } = await validateResetToken(resetToken);

	const targetUser = await findUserById(id);

	if (!targetUser) {
		logger.errors.error(`User with Id: ${id} not Found.`);
		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	await updateUser(targetUser.id, { password: password });

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

export { login, register, resetPassword, resetPasswordRequest };
