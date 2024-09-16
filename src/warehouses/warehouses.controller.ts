import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import warehousesService from "./warehouses.service";

const findAllWarehouses: RequestHandler = async (__, res) => {
	const warehouses = await warehousesService.findAllWarehouses();

	return res.status(StatusCodes.OK).json(warehouses);
};

const findSingleWarehouse: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const warehouse = await warehousesService.findWarehouseById(Number(id));

	return res.status(StatusCodes.OK).json(warehouse);
};

const createWarehouse: RequestHandler = async ({ body }, res) => {
	const createdWarehouse = await warehousesService.insertWarehouse(body);

	return res.status(StatusCodes.CREATED).json(createdWarehouse);
};

const updateWarehouse: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const warehouseData = req.body;

	await warehousesService.updateWarehouse(Number(id), warehouseData);

	return res.status(StatusCodes.CREATED).send();
};

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
