import createHttpError from "http-errors";
import logger from "../logging";
import { CreateStock, UpdateStock } from "./stocks.types";
import stocksRepository from "./stocks.repository";
import products from "../products";
import warehouses from "../warehouses";

const findAllStocks = async () => {
	return await stocksRepository.findAllStocks();
};

const findStockById = async (id: number) => {
	const stock = await stocksRepository.findStockById(id);

	if (!stock) {
		logger.errors.error(`Stock with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Stock with ID: ${id} not Found.`);
	}

	return await stocksRepository.findStockById(id);
};

const insertStock = async (data: CreateStock) => {
	const product = await products.service.findProductById(data.productId);
	if (!product) {
		logger.errors.error(`Product with ID: ${data.productId} Not Found.`);

		throw new createHttpError.BadRequest(
			`Product with ID: ${data.productId} Not Found.`
		);
	}

	const warehouse = await warehouses.service.findWarehouseById(
		data.warehouseId
	);
	if (!warehouse) {
		logger.errors.error(`Warehouse with ID: ${data.warehouseId} Not Found.`);

		throw new createHttpError.BadRequest(
			`Warehouse with ID: ${data.warehouseId} Not Found.`
		);
	}

	const stock = await stocksRepository.findStockByAllParams(
		data.productId,
		data.warehouseId
	);
	if (stock) {
		logger.errors.error(
			`Stock with Product ID: ${data.productId} and Warehouse ID: ${data.warehouseId} already Exists.`
		);

		throw new createHttpError.BadRequest(
			`Stock with Product ID: ${data.productId} and Warehouse ID: ${data.warehouseId} already Exists.`
		);
	}

	return await stocksRepository.insertStock(data);
};

const updateStock = async (id: number, data: UpdateStock) => {
	const stock = await stocksRepository.findStockById(id);

	if (!stock) {
		logger.errors.error(`Stock with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Stock with ID: ${id} not Found.`);
	}

	return await stocksRepository.updateStock(id, data);
};

const findStockByAllParams = async (productId: number, warehouseId: number) => {
	return await stocksRepository.findStockByAllParams(productId, warehouseId);
};

const deleteStock = async (id: number) => {
	const stock = await stocksRepository.findStockById(id);

	if (!stock) {
		logger.errors.error(`Stock with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Stock with ID: ${id} not Found.`);
	}

	return await stocksRepository.deleteStock(id);
};

export default {
	findAllStocks,
	findStockById,
	insertStock,
	updateStock,
	deleteStock,
	findStockByAllParams,
};
