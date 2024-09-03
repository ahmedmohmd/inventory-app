import orderItemsRepository from "./order-items.repository";
import { CreateOrderItem } from "./order-items.types";

/**
 * Inserts a new order item into the database.
 *
 * @param {CreateOrderItem} data - The order item data to be inserted.
 * @return {Promise} A promise that resolves with the result of the insertion operation.
 */
const insertOrderItem = async (data: CreateOrderItem) => {
	return orderItemsRepository.insertOrderItem(data);
};

/**
 * Deletes an order item from the database.
 *
 * @param {number} id - The ID of the order item to be deleted.
 * @return {Promise} A promise that resolves with the result of the deletion operation.
 */
const deleteOrderItem = async (id: number) => {
	return orderItemsRepository.deleteOrderItem(id);
};

export default {
	insertOrderItem,
	deleteOrderItem,
};
