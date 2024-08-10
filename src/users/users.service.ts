import createHttpError from "http-errors";
import logger from "../logging";
import { User } from "./users.repository";
import { CreateUser, UpdateUser } from "./users.types";

const findUserById = async (id: number) => {
	logger.general.info(`Calling for findUserById() Method.`);
	const targetUser = await User.findUserById(id);

	if (!targetUser) {
		logger.errors.error(`User with Id: ${id} not Found Exception.`);
		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	return targetUser;
};

const findAllUsers = async () => {
	logger.general.info(`Calling for findAllUsers() Method from Users Service.`);
	return await User.findAllUsers();
};

const insertUser = async (userdata: CreateUser) => {
	logger.general.info(`Calling for insertUser() Method from Users Service.`);

	const targetUser = await User.findUserByEmail(userdata.email);

	if (targetUser) {
		logger.errors.error(
			`User with Id: ${targetUser.id} already exists Exception.`
		);
		throw new createHttpError.BadRequest(
			`User with Id: ${targetUser.id} is already exists Found.`
		);
	}

	const createdUser = await User.insertUser(userdata);

	return createdUser;
};

const updateUser = async (id: number, userData: UpdateUser) => {
	logger.general.info(`Calling for updateUser() Method.`);
	const targetUser = await User.findUserById(id);

	if (!targetUser) {
		logger.errors.error(`User with Id: ${id} not Found Exception.`);
		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	await User.updateUser(id, userData);

	return true;
};

const deleteUser = async (id: number) => {
	logger.general.info(`Calling for deleteUser() Method.`);
	const targetUser = await User.findUserById(id);

	if (!targetUser) {
		logger.errors.error(`User with Id: ${id} not Found Exception.`);
		throw new createHttpError.NotFound(`User with Id: ${id} not Found.`);
	}

	await User.deleteUser(id);

	return true;
};

export { deleteUser, findAllUsers, findUserById, insertUser, updateUser };
