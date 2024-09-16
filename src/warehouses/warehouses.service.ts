import createHttpError from "http-errors";
import logger from "../logging";
import warehousesRespository from "./warehouses.respository";
import { CreateWarehouse, UpdateWarehouse } from "./warehouses.types";

const findAllWarehouses = async () => {
	return await warehousesRespository.findAllWarehouses();
};

const findWarehouseById = async (id: number) => {
	const warehouse = await warehousesRespository.findWarehouseById(id);

	if (!warehouse) {
		logger.errors.error(`Warehouse with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Warehouse with ID: ${id} not Found.`);
	}

	return await warehousesRespository.findWarehouseById(id);
};

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

const updateWarehouse = async (id: number, data: UpdateWarehouse) => {
	const warehouse = await warehousesRespository.findWarehouseById(id);

	if (!warehouse) {
		logger.errors.error(`Warehouse with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Warehouse with ID: ${id} not Found.`);
	}

	return await warehousesRespository.updateWarehouse(id, data);
};

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
