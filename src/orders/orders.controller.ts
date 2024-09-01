import { RequestHandler } from "express";
import HttpStatusCodes from "http-status-codes";

import * as ordersService from "./orders.service";

export const getAllOrders: RequestHandler = async ({ query }, res) => {
	return res
		.status(HttpStatusCodes.OK)
		.json(await ordersService.findAllOrders(query));
};

export const getSingleOrder: RequestHandler = async ({ params }, res) => {
	const { id } = params;

	return res
		.status(HttpStatusCodes.OK)
		.json(await ordersService.findOrderById(Number(id)));
};

export const createOrder: RequestHandler = async ({ body }, res) => {
	const createdOrder = await ordersService.insertOrder(body);

	return res.status(HttpStatusCodes.CREATED).json(createdOrder);
};

export const updateOrderStatus: RequestHandler = async (
	{ params, body },
	res
) => {
	return res
		.status(HttpStatusCodes.CREATED)
		.json(await ordersService.changeOrderState(Number(params.id), body));
};

export const deleteOrder: RequestHandler = async ({ params }, res) => {
	await ordersService.deleteOrder(Number(params.id));

	return res
		.status(HttpStatusCodes.NO_CONTENT)
		.json({ message: `"Order with ID: ${params.id} Deleted Successfully."` });
};
