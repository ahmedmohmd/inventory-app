import { and, DBQueryConfig, eq, SQL } from "drizzle-orm";
import { db } from "../db";
import { orders } from "../db/schema/order.schema";
import { FindAllOrdersQuery, IOrder } from "./orders.types";
import { OrderStatus } from "./orders.enum";
import { config } from "../../config/config";
// import { QueryOrder } from "../common/enums/order.enum";

/**
 * Retrieves a list of orders based on the provided query parameters.
 *
 * @param {FindAllOrdersQuery} query - The query parameters to filter orders by.
 * @return {Promise<IOrder[]>} An array of orders that match the query parameters.
 */
const findAllOrders = async (query: FindAllOrdersQuery) => {
	const page = Number(query.page) || config.pagination.page;
	const limit = Number(query.limit) || config.pagination.limit;
	const supplierId = Number(query.supplierId);
	const { status } = query;

	const andConditions: SQL<unknown>[] = [];

	const queryOptions: DBQueryConfig = {
		with: {
			orderItems: true,
			supplier: true,
			warehouse: true,
		},

		limit: limit,
		offset: (page - 1) * limit,
	};

	if (supplierId) {
		andConditions.push(eq(orders.supplierId, supplierId));
	}

	// if (query.sortBy) {
	// 	if (query.sortBy && query.orderBy === QueryOrder.DESC) {
	// 		queryOptions.orderBy = [desc(orders[query.sortBy])];
	// 	} else {
	// 		queryOptions.orderBy = [asc(orders[query.sortBy])];
	// 	}
	// }

	if (status) {
		andConditions.push(eq(orders.status, status));
	}

	queryOptions.where = and(...andConditions);

	return await db.query.orders.findMany(queryOptions);
};

/**
 * Retrieves an order by its ID, including its associated order items and supplier.
 *
 * @param {number} id - The ID of the order to find.
 * @return {Promise<IOrder>} A promise that resolves to the found order.
 */
const findOrderById = async (id: number) => {
	return await db.query.orders.findFirst({
		where: eq(orders.id, id),
		with: {
			orderItems: true,
			supplier: true,
			warehouse: true,
		},
	});
};

/**
 * Inserts a new order into the database.
 *
 * @param {IOrder} data - The order data to be inserted.
 * @return {Promise} A promise that resolves with the inserted order.
 */
const insertOrder = async (data: IOrder) => {
	const [createdOrder] = await db.insert(orders).values(data).returning();

	return createdOrder;
};

/**
 * Updates the status of an order.
 *
 * @param {number} id - The ID of the order to be updated.
 * @param {OrderStatus} status - The new status of the order.
 * @return {Promise} A promise that resolves to the updated order.
 */
const changeOrderState = async (id: number, status: OrderStatus) => {
	return await db
		.update(orders)
		.set({
			status: status,
		})
		.where(eq(orders.id, id))
		.returning();
};

/**
 * Deletes an order by its ID.
 *
 * @param {number} id - The ID of the order to be deleted.
 * @return {Promise} A promise that resolves with the result of the deletion operation.
 */
const deleteOrder = async (id: number) => {
	const [deletedOrder] = await db
		.delete(orders)
		.where(eq(orders.id, id))
		.returning();

	return deletedOrder;
};

/**
 * Retrieves the total number of orders based on the provided query parameters.
 *
 * @param {FindAllOrdersQuery} query - The query parameters to filter orders by.
 * @return {Promise<number>} A promise that resolves with the total number of orders.
 */
const countAllOrders = async (query: FindAllOrdersQuery) => {
	const supplierId = Number(query.supplierId);
	const { status } = query;

	const andConditions: SQL<unknown>[] = [];

	if (supplierId) {
		andConditions.push(eq(orders.supplierId, supplierId));
	}

	if (status) {
		andConditions.push(eq(orders.status, status));
	}

	const queryOptions: DBQueryConfig = {
		where: and(...andConditions),
	};

	return (await db.query.orders.findMany(queryOptions)).length;
};

export default {
	findAllOrders,
	findOrderById,
	insertOrder,
	changeOrderState,
	deleteOrder,
	countAllOrders,
};
