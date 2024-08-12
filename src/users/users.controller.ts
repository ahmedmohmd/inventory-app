import { RequestHandler } from "express";
import { HttpStatusCode } from "../common/enums/http-status-code.tnum";
import * as usersService from "./users.service";
import { UpdateUser } from "./users.types";

/**
 * Retrieves a list of all users.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @return {Promise<User[]>} A promise that resolves when the response is sent.
 */
const getAllUsers: RequestHandler = async (req, res) => {
	const allUsers = await usersService.findAllUsers();

	res.json(allUsers);
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

	res.json(targetUser);
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
	const userData = req.body as UpdateUser;

	await usersService.updateUser(Number(id), userData);

	res.json(true);
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

export { deleteUser, getAllUsers, getSingleUser, updateUser };
