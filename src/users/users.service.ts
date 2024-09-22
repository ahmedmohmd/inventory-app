import createHttpError from "http-errors";
import { hashPassword } from "../auth/utils/password-hash.util";
import { removeImage, uploadImage } from "../common/utils/image-upload";
import logger from "../logging";
import usersRepository from "./users.repository";
import { CreateUser, FindAllUsersQuery, UpdateUser } from "./users.types";
import { Role } from "../common/enums/user-role.enum";
import handleCache from "../common/utils/handle-cache.util";
import mail from "../mail";
import { ENV } from "../../config/env";
import cache from "../cache";

/**
 * Retrieves a user by their unique identifier.
 *
 * @param {number} id - The unique identifier of the user to retrieve.
 * @return {object} The user object associated with the provided ID.
 */
const findUserById = async (id: number) => {
	const user = await handleCache(
		`user:${id}`,
		async () => await usersRepository.findUserById(id)
	);

	if (!user) {
		logger.error.error(`User with Id: ${id} not Found Exception.`);
		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	return user;
};

/**
 * Retrieves a user from the database by their email address.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @return {Promise<User>} The user object if found, or undefined if not found.
 */
const findUserByEmail = async (email: string) => {
	const user = await handleCache(
		`user:${email}`,
		async () => await usersRepository.findUserByEmail(email)
	);

	return user;
};

/**
 * Retrieves all users from the database based on the provided query parameters.
 *
 * @param {FindAllUsersQuery} query - An object containing query parameters to filter users.
 * @return {Promise<User[]>} A Promise that resolves to an array of user objects.
 */
const findAllUsers = async (query: FindAllUsersQuery) => {
	const users = await handleCache(
		`users:${JSON.stringify(query)}`,
		async () => await usersRepository.findAllUsers(query)
	);

	return users;
};

/**
 * Retrieves a list of users from the database based on their role.
 *
 * @param {Role} role - The role of the users to retrieve.
 * @return {Promise<User[]>} A Promise that resolves to an array of user objects.
 */
const findUsersByRole = async (role: Role) => {
	const user = await handleCache(
		`users:${role}`,
		async () => await usersRepository.findUsersByRole(role)
	);

	return user;
};

/**
 * Inserts a new user into the database after checking for existing users with the same email address.
 *
 * @param {CreateUser} userData - The data for the new user to be inserted.
 * @param {Express.Multer.File} profileImage - The profile image of the new user.
 * @return {Promise<User>} The newly inserted user object.
 */
const insertUser = async (
	userData: CreateUser,
	profileImage: Express.Multer.File | null
) => {
	const user = await usersRepository.findUserByEmail(userData.email);

	if (user) {
		logger.error.error(`User with Id: ${user.id} already exists Exception.`);
		throw new createHttpError.BadRequest(
			`User with Id: ${user.id} is already exists Found.`
		);
	}

	const uploadedImage = await uploadImage(profileImage, "users-images");

	Object.assign(userData, {
		password: await hashPassword(userData.password),
		profileImage: uploadedImage?.secure_url || "",
		profileImagePublicId: uploadedImage?.public_id || "",
	});

	const createdUser = await usersRepository.insertUser(userData);

	await mail.service.sendMail({
		from: ENV.SENDER_EMAIL,
		to: createdUser.email,
		subject: "Account Created.",
		text: `Hello, Your account has been created.`,
	});

	await cache.service.addToCache(
		`user:${createdUser.id}`,
		JSON.stringify(createdUser)
	);

	return createdUser;
};

/**
 * Updates a user in the database with the provided data.
 *
 * @param {number} id - The unique identifier of the user to update.
 * @param {UpdateUser} userData - The updated data for the user.
 * @param {Express.Multer.File} [profileImage] - The updated profile image of the user.
 * @return {Promise<User>} The updated user object.
 */
const updateUser = async (
	id: number,
	userData: UpdateUser,
	profileImage?: Express.Multer.File
) => {
	const user = await usersRepository.findUserById(id);

	if (!user) {
		logger.error.error(`User with Id: ${id} not Found Exception.`);

		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	if (profileImage) {
		await removeImage(user.profileImagePublicId);

		const uploadedImage = await uploadImage(profileImage, "users-images");

		Object.assign(userData, {
			profileImage: uploadedImage?.secure_url || "",
			profileImagePublicId: uploadedImage?.public_id || "",
		});
	}

	Object.assign(userData, {
		password: await hashPassword(userData.password as string),
	});

	const updatedUser = await usersRepository.updateUser(id, userData);

	await cache.service.removeFromCache(`user:${id}`);
	await cache.service.addToCache(`user:${id}`, JSON.stringify(updatedUser));

	return updatedUser;
};

/**
 * Retrieves a user from the database by their reset password token.
 *
 * @param {string} resetToken - The reset password token of the user.
 * @return {Promise<User | null>} A Promise that resolves to the user with the given reset password token, or null if not found.
 */
const findUserByResetToken = async (resetToken: string) => {
	const user = await handleCache(
		`user:${resetToken}`,
		async () => await usersRepository.findUserByResetToken(resetToken)
	);

	return user;
};

/**
 * Deletes a user from the database by their unique identifier.
 *
 * @param {number} id - The unique identifier of the user to delete.
 * @return {Promise<object>} The result of the deletion operation.
 */
const deleteUser = async (id: number) => {
	const user = await usersRepository.findUserById(id);

	if (!user) {
		logger.error.error(`User with Id: ${id} not Found.`);

		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	await removeImage(user.profileImagePublicId);
	const result = await usersRepository.deleteUser(id);

	await cache.service.removeFromCache(`user:${id}`);

	return result;
};

export default {
	deleteUser,
	findAllUsers,
	findUserByEmail,
	findUserById,
	findUserByResetToken,
	insertUser,
	updateUser,
	findUsersByRole,
};
