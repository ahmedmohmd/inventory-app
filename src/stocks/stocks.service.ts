import createHttpError from "http-errors";
import logger from "../logging";
import { CreateStock, UpdateStock } from "./stocks.types";
import stocksRepository from "./stocks.repository";
import products from "../products";
import warehouses from "../warehouses";
import { updateProductsByRelatedEntity } from "../common/utils/updateproducts-by-related-entity.util";

/**
 * Retrieves all stock records from the database.
 *
 * @return {Promise} A promise that resolves to an array of stock records
 */
const findAllStocks = async () => {
	return await stocksRepository.findAllStocks();
};

/**
 * Retrieves a stock record from the database by its ID.
 *
 * @param {number} id - The ID of the stock record to retrieve
 * @return {object} The stock record object with the matching ID
 */
const findStockById = async (id: number) => {
	const stock = await stocksRepository.findStockById(id);

	if (!stock) {
		logger.error.error(`Stock with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Stock with ID: ${id} not Found.`);
	}

	return await stocksRepository.findStockById(id);
};

/**
 * Inserts a new stock record into the database, including its product and warehouse.
 *
 * @param {CreateStock} data - The data for the new stock record to be inserted
 * @return {Promise} A promise that resolves to the newly inserted stock record
 */
const insertStock = async (data: CreateStock) => {
	const product = await products.service.findProductById(data.productId);
	if (!product) {
		logger.error.error(`Product with ID: ${data.productId} Not Found.`);

		throw new createHttpError.BadRequest(
			`Product with ID: ${data.productId} Not Found.`
		);
	}

	const warehouse = await warehouses.service.findWarehouseById(
		data.warehouseId
	);
	if (!warehouse) {
		logger.error.error(`Warehouse with ID: ${data.warehouseId} Not Found.`);

		throw new createHttpError.BadRequest(
			`Warehouse with ID: ${data.warehouseId} Not Found.`
		);
	}

	const stock = await stocksRepository.findStockByAllParams(
		data.productId,
		data.warehouseId
	);
	if (stock) {
		logger.error.error(
			`Stock with Product ID: ${data.productId} and Warehouse ID: ${data.warehouseId} already Exists.`
		);

		throw new createHttpError.BadRequest(
			`Stock with Product ID: ${data.productId} and Warehouse ID: ${data.warehouseId} already Exists.`
		);
	}

	return await stocksRepository.insertStock(data);
};

/**
 * Updates a stock record in the database.
 *
 * @param {number} id - The ID of the stock record to update
 * @param {UpdateStock} data - The data to update the stock record with
 * @return {Promise} A promise that resolves to the updated stock record
 */
const updateStock = async (id: number, data: UpdateStock) => {
	const stock = await stocksRepository.findStockById(id);

	if (!stock) {
		logger.error.error(`Stock with ID: ${id} not Found.`);

		throw new createHttpError.NotFound(`Stock with ID: ${id} not Found.`);
	}

	const [updatedStock] = await stocksRepository.updateStock(id, data);

	await updateProductsByRelatedEntity(
		"null",
		0,
		null,
		String(id),
		updatedStock
	);

	return updatedStock;
};

/**
 * Retrieves a stock record from the database by its product ID and warehouse ID.
 *
 * @param {number} productId - The product ID of the stock record to retrieve
 * @param {number} warehouseId - The warehouse ID of the stock record to retrieve
 * @return {object} The stock record object with the matching product ID and warehouse ID, or null if not found
 */
const findStockByAllParams = async (productId: number, warehouseId: number) => {
	return await stocksRepository.findStockByAllParams(productId, warehouseId);
};

/**
 * Deletes a stock record from the database by its ID.
 *
 * @param {number} id - The ID of the stock record to delete.
 * @return {Promise<void>} A promise that resolves when the stock record is deleted.
 * @throws {createHttpError.NotFound} If the stock record with the given ID is not found.
 */
const deleteStock = async (id: number) => {
	const stock = await stocksRepository.findStockById(id);

	if (!stock) {
		logger.error.error(`Stock with ID: ${id} not Found.`);

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
