import createHttpError from "http-errors";
import { hashPassword } from "../auth/utils/password-hash.util";
import { removeImage, uploadImage } from "../common/utils/image-upload";
import logger from "../logging";
import usersRepository from "./users.repository";
import { CreateUser, FindAllUsersQuery, UpdateUser } from "./users.types";

/**
 * Retrieves a user by their unique identifier.
 *
 * @param {number} id - The unique identifier of the user to retrieve.
 * @return {object} The user object associated with the provided ID.
 */
const findUserById = async (id: number) => {
	const user = await usersRepository.findUserById(id);

	if (!user) {
		logger.errors.error(`User with Id: ${id} not Found Exception.`);
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
	return await usersRepository.findUserByEmail(email);
};

/**
 * Retrieves all users from the database based on the provided query parameters.
 *
 * @param {FindAllUsersQuery} query - An object containing query parameters to filter users.
 * @return {Promise<User[]>} A Promise that resolves to an array of user objects.
 */
const findAllUsers = async (query: FindAllUsersQuery) => {
	return await usersRepository.findAllUsers(query);
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
		logger.errors.error(`User with Id: ${user.id} already exists Exception.`);
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

	return createdUser;
};

const updateUser = async (
	id: number,
	userData: UpdateUser,
	profileImage?: Express.Multer.File
) => {
	const user = await usersRepository.findUserById(id);

	if (!user) {
		logger.errors.error(`User with Id: ${id} not Found Exception.`);

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

	await usersRepository.updateUser(id, userData);

	return;
};

const findUserByResetToken = async (resetToken: string) => {
	return await usersRepository.findUserByResetToken(resetToken);
};

const deleteUser = async (id: number) => {
	const user = await usersRepository.findUserById(id);

	if (!user) {
		logger.errors.error(`User with Id: ${id} not Found.`);

		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	await removeImage(user.profileImagePublicId);
	await usersRepository.deleteUser(id);

	return;
};

export default {
	deleteUser,
	findAllUsers,
	findUserByEmail,
	findUserById,
	findUserByResetToken,
	insertUser,
	updateUser,
};
