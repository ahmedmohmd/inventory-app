import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { stocks } from "../db/schema/stock.schema";
import { CreateStock, UpdateStock } from "./stocks.types";

const findAllStocks = async () => {
	return await db.select().from(stocks);
};

const findStockById = async (id: number) => {
	return await db.query.stocks.findFirst({
		where: eq(stocks.id, id),
	});
};

const findStockByAllParams = async (productId: number, warehouseId: number) => {
	return await db.query.stocks.findFirst({
		where: and(
			eq(stocks.productId, productId),
			eq(stocks.warehouseId, warehouseId)
		),
	});
};

const insertStock = async (data: CreateStock) => {
	return await db.insert(stocks).values(data).returning();
};

const updateStock = async (id: number, data: UpdateStock) => {
	return await db.update(stocks).set(data).where(eq(stocks.id, id)).returning();
};

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
