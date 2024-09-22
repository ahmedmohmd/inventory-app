import createHttpError from "http-errors";
import logger from "../logging";
import warehousesRespository from "./warehouses.respository";
import { CreateWarehouse, UpdateWarehouse } from "./warehouses.types";
import handleCache from "../common/utils/handle-cache.util";
import cache from "../cache";

/**
 * Retrieves a list of all warehouses.
 *
 * @return {Array} A list of warehouses
 */
const findAllWarehouses = async () => {
	const warehouses = await handleCache(
		"warehouses",
		warehousesRespository.findAllWarehouses
	);

	return warehouses;
};

/**
 * Retrieves a warehouse by its ID.
 *
 * @param {number} id - The ID of the warehouse to retrieve
 * @return {object} The warehouse object with the matching ID
 */
const findWarehouseById = async (id: number) => {
	const fetchWarehouse = async () =>
		await warehousesRespository.findWarehouseById(id);

	const warehouse = await handleCache(`warehouse:${id}`, fetchWarehouse);

	if (!warehouse) {
		logger.error.error(`Warehouse with ID: ${id} not Found.`);

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
		logger.error.error(`Warehouse with Name: ${data.name} already Exists.`);

		throw new createHttpError.BadRequest(
			` Warehouse with Name: ${data.name} already Exists.`
		);
	}

	const result = await warehousesRespository.insertWarehouse(data)[0];

	await cache.service.addToCache(
		`warehouse:${result.id}`,
		JSON.stringify(result)
	);

	return result;
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
		logger.error.error(`Warehouse with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Warehouse with ID: ${id} not Found.`);
	}

	const result = await warehousesRespository.updateWarehouse(id, data);

	await cache.service.removeFromCache(`warehouse:${id}`);
	await cache.service.addToCache(`warehouse:${id}`, JSON.stringify(result));

	return result;
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
		logger.error.error(`Warehouse with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Warehouse with ID: ${id} not Found.`);
	}

	const result = await warehousesRespository.deleteWarehouse(id);

	await cache.service.removeFromCache(`warehouse:${id}`);

	return result;
};

export default {
	findAllWarehouses,
	findWarehouseById,
	insertWarehouse,
	updateWarehouse,
	deleteWarehouse,
};
