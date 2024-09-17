import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { stocks } from "../db/schema/stock.schema";
import { CreateStock, UpdateStock } from "./stocks.types";

/**
 * Retrieves all stock records from the database.
 *
 * @return {Promise} A promise that resolves to an array of stock records
 */
const findAllStocks = async () => {
	return await db.select().from(stocks);
};

/**
 * Retrieves a stock record from the database by its ID.
 *
 * @param {number} id - The ID of the stock record to retrieve
 * @return {object} The stock record object with the matching ID, or null if not found
 */
const findStockById = async (id: number) => {
	return await db.query.stocks.findFirst({
		where: eq(stocks.id, id),
	});
};

/**
 * Retrieves a stock record from the database by its product ID and warehouse ID.
 *
 * @param {number} productId - The product ID of the stock record to retrieve
 * @param {number} warehouseId - The warehouse ID of the stock record to retrieve
 * @return {object} The stock record object with the matching product ID and warehouse ID, or null if not found
 */
const findStockByAllParams = async (productId: number, warehouseId: number) => {
	return await db.query.stocks.findFirst({
		where: and(
			eq(stocks.productId, productId),
			eq(stocks.warehouseId, warehouseId)
		),
	});
};

/**
 * Inserts a new stock record into the database.
 *
 * @param {CreateStock} data - The data to insert into the database
 * @return {Promise} A promise that resolves to the newly inserted stock record
 */
const insertStock = async (data: CreateStock) => {
	return await db.insert(stocks).values(data).returning();
};

/**
 * Updates a stock record in the database.
 *
 * @param {number} id - The ID of the stock record to update
 * @param {UpdateStock} data - The data to update the stock record with
 * @return {Promise} A promise that resolves to the updated stock record
 */
const updateStock = async (id: number, data: UpdateStock) => {
	return await db.update(stocks).set(data).where(eq(stocks.id, id)).returning();
};

/**
 * Deletes a stock record from the database.
 *
 * @param {number} id - The ID of the stock record to delete
 * @return {Promise} A promise that resolves to the result of the deletion
 */
const deleteStock = async (id: number) => {
	return await db.delete(stocks).where(eq(stocks.id, id)).execute();
};

export default {
	findAllStocks,
	findStockById,
	insertStock,
	updateStock,
	deleteStock,
	findStockByAllParams,
};
