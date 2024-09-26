import { eq } from "drizzle-orm";
import { db } from "../db";
import { orderItems } from "../db/schema/order-item.schema";
import { CreateOrderItem } from "./order-items.types";

/**
 * Inserts a new order item into the database.
 *
 * @param {CreateOrderItem} data - The order item data to be inserted.
 * @return {Promise} A promise that resolves with the inserted order item.
 */
const insertOrderItem = async (data: CreateOrderItem) => {
	const [createdOrderItem] = await db
		.insert(orderItems)
		.values(data)
		.returning();

	const orderItem = await db.query.orderItems.findFirst({
		where: eq(orderItems.id, createdOrderItem.id),

		with: {
			product: true,
			// order: true,
		},
	});

	return orderItem;
};
/**
 * Deletes an order item from the database.
 *
 * @param {number} id - The ID of the order item to be deleted.
 * @return {Promise} A promise that resolves with the result of the deletion operation.
 */
const deleteOrderItem = (id: number) => {
	return db.delete(orderItems).where(eq(orderItems.id, id)).execute();
};

export default {
	insertOrderItem,
	deleteOrderItem,
};
