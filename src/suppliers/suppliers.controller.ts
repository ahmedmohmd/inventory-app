import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import suppliersService from "./suppliers.service";

/**
 * Retrieves a list of all suppliers and sends them as a JSON response.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object used to send the supplier data.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const findAllSuppliers: RequestHandler = async ({ query }, res) => {
	const allSuppliers = await suppliersService.findAllSuppliers(query);

	return res.status(StatusCodes.OK).json(allSuppliers);
};

/**
 * Retrieves a single supplier by their ID and sends them as a JSON response.
 *
 * @param {Request} req - The Express request object containing the supplier ID as a path parameter.
 * @param {Response} res - The Express response object used to send the supplier data.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const findSingleSupplier: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const supplier = await suppliersService.findSupplierById(Number(id));

	return res.status(StatusCodes.OK).json(supplier);
};

/**
 * Creates a new supplier by inserting it into the database.
 *
 * @param {Request} req - The Express request object containing the new supplier data in the request body.
 * @param {Response} res - The Express response object used to send the newly created supplier data.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const createSupplier: RequestHandler = async (req, res) => {
	const supplierData = req.body;
	const createdSupplier = await suppliersService.insertSupplier(supplierData);

	return res.status(StatusCodes.CREATED).json(createdSupplier);
};

/**
 * Updates a supplier by their ID with the given data.
 *
 * @param {Request} req - The Express request object containing the supplier ID in the path parameters and the updated supplier data in the request body.
 * @param {Response} res - The Express response object used to send the response.
 * @return {Promise<void>} A Promise that resolves when the response is sent.
 */
const updateSupplier: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const supplierData = req.body;

	await suppliersService.updateSupplier(Number(id), supplierData);

	return res.status(StatusCodes.CREATED).send();
};

/**
 * Deletes a supplier from the database.
 *
 * @param {Request} req - The Express request object containing the supplier ID as a path parameter.
 * @param {Response} res - The Express response object used to send the response.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const deleteSupplier: RequestHandler = async (req, res) => {
	const { id } = req.params;

	await suppliersService.deleteSupplier(Number(id));

	return res.status(StatusCodes.NO_CONTENT).send();
};

export default {
	createSupplier,
	deleteSupplier,
	findAllSuppliers,
	findSingleSupplier,
	updateSupplier,
};
