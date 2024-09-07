import { RequestHandler } from "express";
import { HttpStatusCode } from "../common/enums/http-status-code.enum";
import usersService from "./users.service";
import { UpdateUser } from "./users.types";

/**
 * Retrieves a list of all users.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @return {Promise<User[]>} A promise that resolves when the response is sent.
 */
const getAllUsers: RequestHandler = async ({ query }, res) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const allUsers = await usersService.findAllUsers(query as any);

	res.status(HttpStatusCode.OK).json(allUsers);
};

/**
 * Retrieves a user by their ID.
 *
 * @param {Request} req - The incoming HTTP request containing the user ID as a parameter.
 * @param {Response} res - The outgoing HTTP response containing the retrieved user data.
 * @return {Promise<User>} A promise that resolves when the response is sent.
 */
const getSingleUser: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const targetUser = await usersService.findUserById(Number(id));

	res.status(HttpStatusCode.OK).json(targetUser);
};

/**
 * Updates a user's data.
 *
 * @param {Request} req - The incoming HTTP request containing the user ID as a parameter and the updated user data in the request body.
 * @param {Response} res - The outgoing HTTP response containing a boolean indicating whether the update was successful.
 * @return {Promise<boolean>} A promise that resolves when the response is sent.
 */
const updateUser: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const { file } = req;

	const userData = req.body as UpdateUser;

	await usersService.updateUser(Number(id), userData, file);

	res.status(HttpStatusCode.CREATED).json(true);
};

/**
 * Deletes a user by their ID.
 *
 * @param {Request} req - The incoming HTTP request containing the user ID as a parameter.
 * @param {Response} res - The outgoing HTTP response containing a boolean indicating whether the deletion was successful.
 * @return {Promise<boolean>} A promise that resolves when the response is sent.
 */
const deleteUser: RequestHandler = async (req, res) => {
	const { id } = req.params;

	await usersService.deleteUser(Number(id));

	res.status(HttpStatusCode.NO_CONTENT).json(true);
};

export default { deleteUser, getAllUsers, getSingleUser, updateUser };
