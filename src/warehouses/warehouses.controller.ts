import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import warehousesService from "./warehouses.service";

/**
 * Retrieves a list of all warehouses.
 *
 * @param {Request} __ - The Express request object (unused).
 * @param {Response} res - The Express response object.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const findAllWarehouses: RequestHandler = async (__, res) => {
	const warehouses = await warehousesService.findAllWarehouses();

	return res.status(StatusCodes.OK).json(warehouses);
};

/**
 * Retrieves a single warehouse by its ID.
 *
 * @param {Request} req - The Express request object containing the warehouse ID as a path parameter.
 * @param {Response} res - The Express response object used to send the warehouse data.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const findSingleWarehouse: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const warehouse = await warehousesService.findWarehouseById(Number(id));

	return res.status(StatusCodes.OK).json(warehouse);
};

/**
 * Creates a new warehouse by inserting it into the database.
 *
 * @param {object} body - The request body containing the new warehouse data.
 * @return {object} The newly created warehouse object.
 */
const createWarehouse: RequestHandler = async ({ body }, res) => {
	const createdWarehouse = await warehousesService.insertWarehouse(body);

	return res.status(StatusCodes.CREATED).json(createdWarehouse);
};

/**
 * Updates a warehouse by its ID.
 *
 * @param {Request} req - The Express request object containing the warehouse ID as a path parameter and the updated warehouse data in the request body.
 * @param {Response} res - The Express response object used to send the response.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const updateWarehouse: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const warehouseData = req.body;

	await warehousesService.updateWarehouse(Number(id), warehouseData);

	return res.status(StatusCodes.CREATED).send();
};

/**
 * Deletes a warehouse by its ID.
 *
 * @param {Request} req - The Express request object containing the warehouse ID as a path parameter.
 * @param {Response} res - The Express response object used to send the response.
 * @return {Promise<void>} A promise that resolves when the response is sent.
 */
const deleteWarehouse: RequestHandler = async (req, res) => {
	const { id } = req.params;

	await warehousesService.deleteWarehouse(Number(id));

	return res.status(StatusCodes.NO_CONTENT).send();
};

export {
	createWarehouse,
	deleteWarehouse,
	findAllWarehouses,
	findSingleWarehouse,
	updateWarehouse,
};
