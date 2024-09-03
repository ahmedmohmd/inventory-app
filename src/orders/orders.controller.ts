import { RequestHandler } from "express";
import HttpStatusCodes from "http-status-codes";
import ordersService from "./orders.service";

/**
 * Retrieves a list of all orders.
 *
 * @param {object} query - The query parameters to filter orders by.
 * @return {object} An object containing a list of orders.
 */
export const getAllOrders: RequestHandler = async ({ query }, res) => {
	return res
		.status(HttpStatusCodes.OK)
		.json(await ordersService.findAllOrders(query));
};

/**
 * Retrieves a single order by its ID.
 *
 * @param {object} params - The request parameters containing the order ID.
 * @return {object} An object containing the retrieved order.
 */
export const getSingleOrder: RequestHandler = async ({ params }, res) => {
	const { id } = params;

	return res
		.status(HttpStatusCodes.OK)
		.json(await ordersService.findOrderById(Number(id)));
};

/**
 * Creates a new order by inserting it into the database.
 *
 * @param {object} body - The order data to be inserted.
 * @return {object} The created order.
 */
export const createOrder: RequestHandler = async ({ body }, res) => {
	const createdOrder = await ordersService.insertOrder(body);

	return res.status(HttpStatusCodes.CREATED).json(createdOrder);
};

/**
 * Updates the status of an order.
 *
 * @param {object} params - The request parameters containing the order ID.
 * @param {object} body - The request body containing the new order status.
 * @return {object} The updated order.
 */
export const updateOrderStatus: RequestHandler = async (
	{ params, body },
	res
) => {
	return res
		.status(HttpStatusCodes.CREATED)
		.json(await ordersService.changeOrderState(Number(params.id), body.status));
};

/**
 * Deletes an order by its ID.
 *
 * @param {object} params - The request parameters containing the order ID.
 * @return {object} An object containing a success message.
 */
export const deleteOrder: RequestHandler = async ({ params }, res) => {
	await ordersService.deleteOrder(Number(params.id));

	return res
		.status(HttpStatusCodes.NO_CONTENT)
		.json({ message: `"Order with ID: ${params.id} Deleted Successfully."` });
};

export default {
	getAllOrders,
	getSingleOrder,
	createOrder,
	updateOrderStatus,
	deleteOrder,
};
