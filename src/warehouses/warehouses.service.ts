import createHttpError from "http-errors";
import logger from "../logging";
import warehousesRespository from "./warehouses.respository";
import { CreateWarehouse, UpdateWarehouse } from "./warehouses.types";

/**
 * Retrieves a list of all warehouses.
 *
 * @return {Array} A list of warehouses
 */
const findAllWarehouses = async () => {
	return await warehousesRespository.findAllWarehouses();
};

/**
 * Retrieves a warehouse by its ID.
 *
 * @param {number} id - The ID of the warehouse to retrieve
 * @return {object} The warehouse object with the matching ID
 */
const findWarehouseById = async (id: number) => {
	const warehouse = await warehousesRespository.findWarehouseById(id);

	if (!warehouse) {
		logger.errors.error(`Warehouse with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Warehouse with ID: ${id} not Found.`);
	}

	return await warehousesRespository.findWarehouseById(id);
};

/**
 * Inserts a new warehouse into the database.
 *
 * @param {CreateWarehouse} data - The data for the new warehouse to be inserted
 * @return {object} The newly inserted warehouse object
 */
const insertWarehouse = async (data: CreateWarehouse) => {
	const warehouse = await warehousesRespository.findWarehouseByName(data.name);

	if (warehouse) {
		logger.errors.error(`Warehouse with Name: ${data.name} already Exists.`);

		throw new createHttpError.BadRequest(
			` Warehouse with Name: ${data.name} already Exists.`
		);
	}

	return await warehousesRespository.insertWarehouse(data);
};

/**
 * Updates a warehouse by its ID.
 *
 * @param {number} id - The ID of the warehouse to update
 * @param {UpdateWarehouse} data - The updated warehouse data
 * @return {object} The updated warehouse object
 */
const updateWarehouse = async (id: number, data: UpdateWarehouse) => {
	const warehouse = await warehousesRespository.findWarehouseById(id);

	if (!warehouse) {
		logger.errors.error(`Warehouse with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Warehouse with ID: ${id} not Found.`);
	}

	return await warehousesRespository.updateWarehouse(id, data);
};

/**
 * Deletes a warehouse from the database by its ID.
 *
 * @param {number} id - The ID of the warehouse to delete
 * @return {void} No return value
 */
const deleteWarehouse = async (id: number) => {
	const warehouse = await warehousesRespository.findWarehouseById(id);

	if (!warehouse) {
		logger.errors.error(`Warehouse with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Warehouse with ID: ${id} not Found.`);
	}

	return await warehousesRespository.deleteWarehouse(id);
};

export default {
	findAllWarehouses,
	findWarehouseById,
	insertWarehouse,
	updateWarehouse,
	deleteWarehouse,
};
