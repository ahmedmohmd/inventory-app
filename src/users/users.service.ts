import createHttpError from "http-errors";
import { hashPassword } from "../auth/utils/password-hash.util";
import logger from "../logging";
import usersRepository from "./users.repository";
import { CreateUser, UpdateUser } from "./users.types";

/**
 * Retrieves a user by their unique identifier.
 *
 * @param {number} id - The unique identifier of the user to retrieve.
 * @return {object} The user object associated with the provided ID.
 */
const findUserById = async (id: number) => {
	logger.general.info(`Calling for findUserById() Method.`);
	const targetUser = await usersRepository.findUserById(id);

	if (!targetUser) {
		logger.errors.error(`User with Id: ${id} not Found Exception.`);
		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	return targetUser;
};

/**
 * Retrieves a user from the database by their email address.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @return {Promise<User>} The user object if found, or undefined if not found.
 */
const findUserByEmail = async (email: string) => {
	logger.general.info(`Calling for findUserByEmail() Method.`);
	return await usersRepository.findUserByEmail(email);
};

/**
 * Retrieves all users.
 *
 * @return {array} An array of user objects.
 */
const findAllUsers = async () => {
	logger.general.info(`Calling for findAllUsers() Method from Users Service.`);
	return await usersRepository.findAllUsers();
};

/**
 * Inserts a new user into the database.
 *
 * @param {CreateUser} userData - The data for the new user to be inserted.
 * @return {object} The newly inserted user object.
 */
const insertUser = async (userData: CreateUser) => {
	logger.general.info(`Calling for insertUser() Method from Users Service.`);

	const targetUser = await usersRepository.findUserByEmail(userData.email);

	if (targetUser) {
		logger.errors.error(
			`User with Id: ${targetUser.id} already exists Exception.`
		);
		throw new createHttpError.BadRequest(
			`User with Id: ${targetUser.id} is already exists Found.`
		);
	}

	userData.password = await hashPassword(userData.password);

	const createdUser = await usersRepository.insertUser(userData);

	return createdUser;
};

/**
 * Updates an existing user in the database.
 *
 * @param {number} id - The unique identifier of the user to update.
 * @param {UpdateUser} userData - The updated data for the user.
 * @return {boolean} True if the update is successful.
 */
const updateUser = async (id: number, userData: UpdateUser) => {
	logger.general.info(`Calling for updateUser() Method.`);
	const targetUser = await usersRepository.findUserById(id);

	if (!targetUser) {
		logger.errors.error(`User with Id: ${id} not Found Exception.`);
		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	if (userData.password) {
		userData.password = await hashPassword(userData.password);
	}

	await usersRepository.updateUser(id, userData);

	return true;
};

/**
 * Deletes a user by their unique identifier.
 *
 * @param {number} id - The unique identifier of the user to delete.
 * @return {boolean} True if the deletion is successful.
 */
const deleteUser = async (id: number) => {
	logger.general.info(`Calling for deleteUser() Method.`);
	const targetUser = await usersRepository.findUserById(id);

	if (!targetUser) {
		logger.errors.error(`User with Id: ${id} not Found Exception.`);
		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	await usersRepository.deleteUser(id);

	return true;
};

export {
	deleteUser,
	findAllUsers,
	findUserByEmail,
	findUserById,
	insertUser,
	updateUser,
};
